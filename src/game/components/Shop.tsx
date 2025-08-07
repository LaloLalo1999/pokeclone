import { useMemo, useState } from "react";
import { SHOP_STOCK, ITEMS } from "../data/items";
import { buyItem, getMoney } from "../inventory";

export function Shop({ onClose }: { onClose: () => void }) {
  const [money, setMoney] = useState(getMoney());
  const [message, setMessage] = useState<string | null>(null);
  const stock = useMemo(() => SHOP_STOCK.map(s => ({ ...s, item: ITEMS[s.itemId] })), []);

  function purchase(itemId: string, price: number) {
    const res = buyItem(itemId, price);
    setMessage(res.message);
    setMoney(getMoney());
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
      <div className="w-full max-w-lg bg-gameboy-light border-4 border-gameboy-dark rounded p-3">
        <div className="flex items-center justify-between">
          <div className="font-bold">Shop</div>
          <button className="px-2 py-1 border-2 border-gameboy-dark rounded" onClick={onClose}>Close</button>
        </div>
        <div className="mt-2 text-sm">Money: {money}₵</div>
        <div className="mt-3 grid gap-2">
          {stock.map(s => (
            <div key={s.itemId} className="flex items-center justify-between border-2 border-gameboy-dark rounded px-2 py-1">
              <div>
                <div className="font-semibold">{s.item.name}</div>
                <div className="text-xs opacity-70">{s.item.description}</div>
              </div>
              <button className="px-2 py-1 border-2 border-gameboy-dark rounded" onClick={()=>purchase(s.itemId, s.price)}>Buy {s.price}₵</button>
            </div>
          ))}
        </div>
        {message && <div className="mt-2 text-sm">{message}</div>}
      </div>
    </div>
  );
}
