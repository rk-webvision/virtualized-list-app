import { useEffect } from "react";

type Props = {
  loading: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  setPage: (fn: (prev: number) => number) => void;
};

export function useInfiniteScroll({
  loading,
  isFetchingMore,
  hasMore,
  setPage,
}: Props) {

  // ================= SCROLL LISTENER =================
  useEffect(() => {

    function handleScroll(e: any) {
      const target = e.target;

      // Load next page when near bottom
      if (
        hasMore &&
        !loading &&
        !isFetchingMore &&
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

  }, [loading, isFetchingMore, hasMore, setPage]);
}