import React from "react";

export type DialogProps = {
  text: string;
  speed?: number; // ms per char
  onDone?: () => void;
  className?: string;
};

export function DialogBox({ text, speed = 20, onDone, className = "" }: DialogProps) {
  const [visibleCount, setVisibleCount] = React.useState(0);

  React.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisibleCount((c) => {
        const next = Math.min(text.length, c + 1);
        if (next === text.length) {
          clearInterval(id);
          onDone?.();
        }
        return next;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);

  return (
    <div className={`gb-dialog ${className}`}>
      <div>{text.slice(0, visibleCount)}</div>
    </div>
  );
}

