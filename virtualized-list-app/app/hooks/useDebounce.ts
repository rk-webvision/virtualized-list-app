import { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number) {

  // ================= STATE =================
  const [debounced, setDebounced] = useState(value);

  // ================= EFFECT =================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}