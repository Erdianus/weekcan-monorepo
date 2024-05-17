import { useEffect, useState } from "react";

export function useLocalStorage<T extends string>(
  key: string,
  initValue: string,
) {
  const [data, setData] = useState(initValue);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem(key) as T;
    setData(v);
    setInit(true);
  }, [key]);

  useEffect(() => {
    if (init) {
      localStorage.setItem(key, `${data}`);
    }
  }, [data, key]);

  return [data, setData] as const;
}
