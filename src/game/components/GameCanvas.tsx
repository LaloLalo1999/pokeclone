import { useEffect, useRef, useState } from 'react';
import { Input } from '../engine/input';
import { TILE_SIZE } from '../engine/tilemap';
import { AREAS } from '../data/areas';
import { createWorld, tryStartMove, updateWorld } from '../state/gameState';
import { FIRST_GYM_LEADER, createGymBattle } from '../data/gym';
import { GymBattleUI } from './GymBattleUI';
import { Dialog, VictoryDialog } from './Dialog';
import { BattleState, ElementType } from '../types';

const SCALE = 3; // pixel scaling for retro feel

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const worldRef = useRef(createWorld(AREAS, 'town', 2, 2));
  const inputRef = useRef(new Input());
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const [battle, setBattle] = useState<BattleState | null>(null);
  const [dialog, setDialog] = useState<string | null>(null);
  const [victory, setVictory] = useState<boolean>(false);

  useEffect(() => {
    const input = inputRef.current;
    input.attach();

    const loop = (t: number) => {
      const dt = Math.min(0.1, (t - lastTimeRef.current) / 1000);
      lastTimeRef.current = t;

      const dir = input.getDirection();
      const world = worldRef.current;
      if (!battle) {
        if (dir && !world.player.moving) {
          tryStartMove(world, dir);
        }
        updateWorld(world, dt);

        // Trigger: if in gym and at center tile (7,7), start gym battle
        if (world.currentAreaId === 'gym' && world.player.x === 7 && world.player.y === 7) {
          // Build a quick player creature if none exists in localStorage
          const rawTeam = typeof localStorage !== 'undefined' ? localStorage.getItem('player.team') : null;
          let playerCreatures;
          if (rawTeam) {
            playerCreatures = JSON.parse(rawTeam);
          } else {
            playerCreatures = [
              {
                uid: 'p1', speciesId: 'aquabub', nickname: 'Aquabub', level: 8,
                experience: 0,
                stats: { hp: 44 + 8, attack: 48 + 4, defense: 65 + 4, spAttack: 50 + 4, spDefense: 64 + 4, speed: 43 + 4 },
                currentHP: 44 + 8,
                types: [ElementType.Water],
                moves: [ { moveId: 'tackle', currentPP: 35 }, { moveId: 'watergun', currentPP: 25 } ],
                status: 'none', isFainted: false,
              }
            ];
            try { localStorage.setItem('player.team', JSON.stringify(playerCreatures)); } catch {}
          }
          const playerSide = { trainerName: 'You', creatures: playerCreatures, activeIndex: 0 } as const;
          const bs = createGymBattle(playerSide as any, FIRST_GYM_LEADER);
          (setBattle as any)(bs);
          setDialog(`${FIRST_GYM_LEADER.name}: ${FIRST_GYM_LEADER.introText}`);
        }
      }

      render();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      input.detach();
    };
  }, []);

  const render = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const world = worldRef.current;
    const area = AREAS[world.currentAreaId];

    // Persist area name for HUD
    try { localStorage.setItem('currentAreaName', area.name); } catch {}

    const widthPx = area.width * TILE_SIZE * SCALE;
    const heightPx = area.height * TILE_SIZE * SCALE;
    if (canvas.width !== widthPx || canvas.height !== heightPx) {
      canvas.width = widthPx;
      canvas.height = heightPx;
    }

    // Clear
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#cbe0a8'; // gameboy screen
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw tiles
    for (let y = 0; y < area.height; y++) {
      for (let x = 0; x < area.width; x++) {
        const i = y * area.width + x;
        const tile = area.tiles[i];
        let color = '#9bbf6b'; // grass
        if (tile === 1) color = '#c2b280'; // path
        if (tile === 2) color = '#2a3b2e'; // wall
        if (tile === 3) color = '#88a8ff'; // door
        ctx.fillStyle = color;
        ctx.fillRect(
          x * TILE_SIZE * SCALE,
          y * TILE_SIZE * SCALE,
          TILE_SIZE * SCALE,
          TILE_SIZE * SCALE
        );

        // grid lines subtle
        ctx.strokeStyle = 'rgba(42,59,46,0.15)';
        ctx.strokeRect(
          x * TILE_SIZE * SCALE,
          y * TILE_SIZE * SCALE,
          TILE_SIZE * SCALE,
          TILE_SIZE * SCALE
        );
      }
    }

    // Draw player
    const px = world.player.pixelX * TILE_SIZE * SCALE;
    const py = world.player.pixelY * TILE_SIZE * SCALE;
    ctx.fillStyle = '#1f2937'; // dark square
    ctx.fillRect(
      px + 2 * SCALE,
      py + 2 * SCALE,
      TILE_SIZE * SCALE - 4 * SCALE,
      TILE_SIZE * SCALE - 4 * SCALE
    );
  };

  const areaName = AREAS[worldRef.current.currentAreaId].name;

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border-4 border-gameboy-dark rounded shadow-lg" />
      <div className="mt-2 text-sm text-gameboy-dark">Use Arrow Keys or WASD to move. Area: {areaName}</div>
      {battle && !dialog && (
        <GymBattleUI
          initial={battle as any}
          onEnd={({ winner }) => {
            (setBattle as any)(null);
            if (winner === 'player') {
              // award badge
              try {
                const raw = localStorage.getItem('player.badges');
                const badges = raw ? JSON.parse(raw) : [];
                if (!badges.includes(FIRST_GYM_LEADER.badgeId)) {
                  badges.push(FIRST_GYM_LEADER.badgeId);
                  localStorage.setItem('player.badges', JSON.stringify(badges));
                }
              } catch {}
              setVictory(true);
            } else {
              setDialog('You blacked out...');
            }
          }}
        />
      )}
      {dialog && (
        <Dialog text={dialog} onClose={() => setDialog(null)} />
      )}
      {victory && (
        <VictoryDialog leader={FIRST_GYM_LEADER} onClose={() => setVictory(false)} />
      )}
    </div>
  );
}
