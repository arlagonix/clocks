import { useEffect, useState } from "react";

/** Returns a delayed value */
const useDelayedValue = <T,>(
  /** Initial value */
  value: T,
  /** How old must be the delayed value, in ms */
  delayDuration: number
) => {
  const [delayedValue, setDelayedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedValue(value);
    }, delayDuration);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delayDuration]);

  return delayedValue;
};

export default useDelayedValue;
