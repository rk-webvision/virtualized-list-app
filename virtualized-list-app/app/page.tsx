"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/hooks/useInfiniteScroll";

import SearchBar from "@/app/components/SearchBar";
import VirtualizedList from "@/app/components/VirtualizedList";

export default function Page() {

  // ================= STATE =================
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);

  // Scroll position (used by virtualization)
  const [scrollTop, setScrollTop] = useState(0);


  // ================= DEBOUNCE =================
  const debouncedSearch = useDebounce(search, 300);


  // ================= RESET PAGE =================
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);


  // ================= FETCH DATA =================
  useEffect(() => {
    async function fetchData() {

      if (page === 1) setLoading(true);
      else setIsFetchingMore(true);

      const res = await fetch(
        `/api/items?search=${debouncedSearch}&page=${page}&limit=20`
      );

      const data = await res.json();

      if (page === 1) {
        setItems(data.data);
      } else {
        setItems((prev) => [...prev, ...data.data]);
      }

      setLoading(false);
      setIsFetchingMore(false);
    }

    fetchData();
  }, [debouncedSearch, page]);


  // ================= INFINITE SCROLL =================
  useInfiniteScroll({
    loading,
    isFetchingMore,
    setPage,
  });


  // ================= UI =================
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">

      <div className="w-full max-w-3xl mx-auto flex flex-col flex-1 p-6 overflow-hidden">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold">
            Virtualized List
          </h1>
          <p className="text-gray-500">
            Efficient rendering of large datasets
          </p>
        </div>

        {/* Search */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* Virtualized List */}
        <VirtualizedList
          items={items}
          loading={loading}
          isFetchingMore={isFetchingMore}
          scrollTop={scrollTop}
          setScrollTop={setScrollTop}
        />

      </div>
    </div>
  );
}