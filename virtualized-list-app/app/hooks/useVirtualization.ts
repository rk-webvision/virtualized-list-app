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

  // ================= CALCULATION =================
  // Memoized calculation for performance
  return useMemo(() => {

    const OVERSCAN = 5;

    // Number of visible items in viewport
    const visibleCount = Math.ceil(containerHeight / itemHeight);

    // Start index based on scroll
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - OVERSCAN
    );

    // End index with buffer
    const endIndex = startIndex + visibleCount + OVERSCAN * 2;

    // Slice visible items only
    const visibleItems = items.slice(startIndex, endIndex);

    return {
      visibleItems,
      startIndex,
      totalHeight: items.length * itemHeight,
    };

  }, [items, scrollTop, itemHeight, containerHeight]);
}