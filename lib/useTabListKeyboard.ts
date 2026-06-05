import { useCallback, type KeyboardEvent } from "react";

export function useTabListKeyboard(
  count: number,
  active: number,
  setActive: (index: number) => void,
) {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      let next: number | null = null;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = (active + 1) % count;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = (active - 1 + count) % count;
      } else if (event.key === "Home") {
        next = 0;
      } else if (event.key === "End") {
        next = count - 1;
      }

      if (next !== null) {
        event.preventDefault();
        setActive(next);
      }
    },
    [active, count, setActive],
  );
}
