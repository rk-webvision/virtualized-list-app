"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";

export default function Page() {

  // ================= STATE =================
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Tracks scroll position for virtualization
  const [scrollTop, setScrollTop] = useState(0);


  // ================= VIRTUALIZATION CONFIG =================
  const ITEM_HEIGHT = 50;
  const CONTAINER_HEIGHT = 400;


  // ================= DEBOUNCE =================
  const debouncedSearch = useDebounce(search, 300);


  // ================= RESET PAGE =================
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);


  // ================= FETCH DATA =================
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

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
    }

    fetchData();
  }, [debouncedSearch, page]);


  // ================= INFINITE SCROLL =================
  useEffect(() => {
    function handleScroll(e: any) {
      const target = e.target;

      if (
        target.scrollTop + target.clientHeight >= target.scrollHeight - 5
      ) {
        setPage((prev) => prev + 1);
      }
    }

    const container = document.querySelector(".list-container");

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);


  // ================= VIRTUALIZATION CALCULATIONS =================
  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = startIndex + visibleCount;

  const visibleItems = items.slice(startIndex, endIndex);


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
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Virtualized List */}
        <div
          className="list-container bg-white rounded-xl shadow flex-1 overflow-y-auto relative"
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
          <div
            style={{
              height: items.length * ITEM_HEIGHT,
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

          {loading && (
            <div className="text-center text-gray-500 py-2">
              Loading...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}