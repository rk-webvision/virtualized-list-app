import { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number) {

  // ================= STATE =================
  // Stores delayed value
  const [debounced, setDebounced] = useState(value);


  // ================= EFFECT =================
  // Runs whenever value changes
  useEffect(() => {

    // Set timer to update debounced value after delay
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // Cleanup: clear previous timer if value changes quickly
    return () => {
      clearTimeout(timer);
    };

  }, [value, delay]);


  // ================= RETURN =================
  return debounced;
}