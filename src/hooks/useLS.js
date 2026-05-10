import { useState } from "react";

export default function useLS(key, def) {
  const [val, setVal] = useState(() => { 
    try { 
        return JSON.parse(localStorage.getItem(key)) ?? def; 
    } catch { 
        return def; 
    } 
  });

  const set = v => { 
    const n = typeof v === "function" ? v(val) : v; 
    setVal(n); 
    localStorage.setItem(key, JSON.stringify(n)); 
  };
  
  return [val, set];
}
