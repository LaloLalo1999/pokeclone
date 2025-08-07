import { GameCanvas } from './game/components/GameCanvas';
import { HUD } from './game/components/HUD';

export default function App() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 p-2">
        <GameCanvas />
        <HUD />
      </div>
    </div>
  );
}
