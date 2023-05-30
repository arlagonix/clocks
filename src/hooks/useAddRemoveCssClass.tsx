import { useEffect, useRef } from "react";

/** Adds and removes after some time a CSS class */
const useAddRemoveCssClass = (
  /** Value change of which will trigger adding and then removing of the class */
  useEffectTrigger: unknown,
  /** CSS class name being added and removed */
  className: string,
  /** After what time the class must be removed, in ms */
  removeCssClassTime: number
) => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const refCur = ref.current;
    if (refCur) {
      if (refCur.classList) refCur.classList.add(className);
      const timer = setTimeout(() => {
        refCur.classList.remove(className);
      }, removeCssClassTime);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [useEffectTrigger, className, removeCssClassTime]);

  return ref;
};

export default useAddRemoveCssClass;
