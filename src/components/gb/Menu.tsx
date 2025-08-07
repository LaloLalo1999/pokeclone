import React from "react";
import { clamp } from "./utils";

type MenuItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

type MenuProps = {
  items: MenuItem[];
  onSelect: (id: string) => void;
  className?: string;
  columns?: number; // grid columns for menu layout
};

export function Menu({ items, onSelect, className = "", columns = 2 }: MenuProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex(i => clamp(i - columns, 0, items.length - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex(i => clamp(i + columns, 0, items.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex(i => clamp(i - 1, 0, items.length - 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex(i => clamp(i + 1, 0, items.length - 1));
      } else if (e.key === "Enter") {
        const it = items[index];
        if (it && !it.disabled) onSelect(it.id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [items, index, onSelect, columns]);

  return (
    <div className={`gb-panel ${className}`}>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` }}>
        {items.map((it, i) => (
          <button
            key={it.id}
            className={`gb-menu-item ${i === index ? "active" : ""} ${it.disabled ? "opacity-50" : ""}`}
            onClick={() => !it.disabled && onSelect(it.id)}
            disabled={!!it.disabled}
          >
            <span className="text-gb-darker">{i === index ? '▶' : ' '}</span>
            <span>{it.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

