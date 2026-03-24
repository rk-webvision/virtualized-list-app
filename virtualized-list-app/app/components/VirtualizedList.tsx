import { useVirtualization } from "@/app/hooks/useVirtualization";

type Props = {
  items: string[];
  loading: boolean;
  isFetchingMore: boolean;
  scrollTop: number;
  setScrollTop: (value: number) => void;
};

export default function VirtualizedList({
  items,
  loading,
  isFetchingMore,
  scrollTop,
  setScrollTop,
}: Props) {

  // ================= CONFIG =================
  const ITEM_HEIGHT = 50;
  const CONTAINER_HEIGHT = 400;

  // ================= HOOK =================
  const { visibleItems, startIndex, totalHeight } = useVirtualization({
    items,
    scrollTop,
    itemHeight: ITEM_HEIGHT,
    containerHeight: CONTAINER_HEIGHT,
  });

  return (
    <div
      className="list-container bg-white rounded-xl shadow overflow-y-auto relative p-3 pb-10"
      style={{
        height: Math.min(items.length * ITEM_HEIGHT, CONTAINER_HEIGHT),
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      {loading && (
        <div className="text-center text-gray-500 py-4">
          Loading...
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No results found
        </div>
      )}

      <div
        style={{
          height: totalHeight,
          position: "relative",
        }}
      >
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;

          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute",
                top: actualIndex * ITEM_HEIGHT,
                height: ITEM_HEIGHT,
                left: 0,
                right: 0,
              }}
              className="p-3 border-b hover:bg-blue-50"
            >
              {item}
            </div>
          );
        })}
      </div>

      {isFetchingMore && (
        <div className="text-center text-gray-500 py-2">
          Loading more...
        </div>
      )}
    </div>
  );
}