import { useMemo } from "react";

type Props = {
  items: string[];
  scrollTop: number;
  itemHeight: number;
  containerHeight: number;
};

export function useVirtualization({
  items,
  scrollTop,
  itemHeight,
  containerHeight,
}: Props) {

  // ================= CALCULATIONS =================
  return useMemo(() => {

    const visibleCount = Math.ceil(containerHeight / itemHeight);

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + visibleCount;

    const visibleItems = items.slice(startIndex, endIndex);

    return {
      visibleItems,
      startIndex,
      totalHeight: items.length * itemHeight,
    };

  }, [items, scrollTop, itemHeight, containerHeight]);
}