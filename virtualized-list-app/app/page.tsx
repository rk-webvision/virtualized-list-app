"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";

import SearchBar from "@/app/components/SearchBar";
import VirtualizedList from "@/app/components/VirtualizedList";

export default function Page() {

  // ================= STATE =================
  // Search input from user
  const [search, setSearch] = useState("");

  // Items fetched from API
  const [items, setItems] = useState<string[]>([]);

  // Initial loading state
  const [loading, setLoading] = useState(false);

  // Loading for pagination (infinite scroll)
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Current page for API pagination
  const [page, setPage] = useState(1);

  // Indicates if more data is available
  const [hasMore, setHasMore] = useState(true);

  // Scroll position used for virtualization
  const [scrollTop, setScrollTop] = useState(0);


  // ================= DEBOUNCE =================
  // Delays API calls until user stops typing
  const debouncedSearch = useDebounce(search, 300);


  // ================= RESET =================
  // Reset pagination when search changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [debouncedSearch]);


  // ================= FETCH DATA =================
  // Fetch data whenever search or page changes
  useEffect(() => {
    async function fetchData() {
      try {
        if (page === 1) setLoading(true);
        else setIsFetchingMore(true);

        const res = await fetch(
          `/api/items?search=${debouncedSearch}&page=${page}&limit=20`
        );

        const data = await res.json();

        // Stop pagination if no more data
        if (data.data.length === 0) {
          setHasMore(false);
        }

        // Replace or append items
        if (page === 1) {
          setItems(data.data);
        } else {
          setItems((prev) => [...prev, ...data.data]);
        }

      } catch (err) {
        console.error("API error", err);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    }

    fetchData();
  }, [debouncedSearch, page]);


  // ================= INFINITE SCROLL =================
  // Detects bottom scroll and loads next page
  useInfiniteScroll({
    loading,
    isFetchingMore,
    hasMore,
    setPage,
  });


  // ================= UI =================
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 p-6 overflow-hidden">

        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Virtualized List</h1>
          <p className="text-gray-500">Efficient large dataset rendering</p>
        </div>

        {/* Search Component */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* Virtualized List Component */}
        <VirtualizedList
          items={items}
          loading={loading}
          isFetchingMore={isFetchingMore}
          hasMore={hasMore}
          scrollTop={scrollTop}
          setScrollTop={setScrollTop}
        />

      </div>
    </div>
  );
}