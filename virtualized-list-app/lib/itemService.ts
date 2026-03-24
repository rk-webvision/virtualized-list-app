// 👉 Function to get items based on search + pagination
export function getItems({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) {

  // 👉 Create 10,000 dummy items
  const allItems = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

  // 👉 Filter items based on search (case-insensitive)
  const filtered = allItems.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  // 👉 Calculate start index for pagination
  const start = (page - 1) * limit;

  // 👉 Slice only required items
  const paginated = filtered.slice(start, start + limit);

  // 👉 Return result
  return {
    data: paginated,
    total: filtered.length,
  };
}