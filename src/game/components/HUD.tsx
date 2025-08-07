import { AREAS } from '../data/areas';
import { useEffect, useState } from 'react';
import { BadgeBar } from './BadgeBar';
import { getMoney, addMoney } from '../inventory';
import { InventoryUI } from './InventoryUI';
import { Shop } from './Shop';

export function HUD() {
  const [area, setArea] = useState(AREAS['town'].name);
  const [money, setMoney] = useState<number>(getMoney());
  const [showBag, setShowBag] = useState(false);
  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const current = localStorage.getItem('currentAreaName');
      if (current && current !== area) setArea(current);
      // also poll money for UI sync
      const m = getMoney();
      setMoney(m);
    }, 300);
    return () => clearInterval(id);
  }, [area]);

  // Ensure some starting money for demo
  useEffect(() => {
    if (money === 0) {
      addMoney(1000);
      setMoney(getMoney());
    }
  }, []);

  return (
    <div className="flex items-center gap-3 text-xs opacity-90">
      <div>{area}</div>
      <BadgeBar />
      <div className="ml-2">₵ {money}</div>
      <button className="px-2 py-1 border-2 border-gameboy-dark rounded" onClick={() => setShowBag(true)}>Bag</button>
      <button className="px-2 py-1 border-2 border-gameboy-dark rounded" onClick={() => setShowShop(true)}>Shop</button>
      {showBag && <InventoryUI onClose={() => setShowBag(false)} />}
      {showShop && <Shop onClose={() => setShowShop(false)} />}
    </div>
  );
}
