import { useEffect } from "react";

type Props = {
  loading: boolean;
  isFetchingMore: boolean;
  setPage: (fn: (prev: number) => number) => void;
};

export function useInfiniteScroll({
  loading,
  isFetchingMore,
  setPage,
}: Props) {

  useEffect(() => {

    function handleScroll(e: any) {
      const target = e.target;

      if (
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

  }, [loading, isFetchingMore, setPage]);
}