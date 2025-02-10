import { useEffect, useRef, useState } from "react";
import { calculateColumns, positionElements } from "./helpers";

const useMasonryLayout = (masonryRef, gap, width, children) => {
  const resizeObserverRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const handleResize = () => {
    try {
      setIsReady(false);
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        const cols = calculateColumns(masonryRef, width);
        positionElements(cols, masonryRef, gap);
        requestAnimationFrame(() => setIsReady(true));
      }, 200);
    } catch (error) {
      console.error("Masonry resize error:", error);
    }
  };

  useEffect(() => {
    try {
      if (!gap) {
        return console.error(
          `Masonry: Invalid gap. Missing attribute gap. <Masonry gap={??}>{children}</Masonry>. Gap can be only be specified in px. For eg: gap={10}`
        );
      }

      if (!width) {
        return console.error(
          `Masonry: Invalid width. Missing attribute width. <Masonry width={''}>{children}</Masonry>. Width can be specified with a valid CSS value (e.g., px, rem, em, inch, etc.).`
        );
      }

      if (!children) {
        return console.error(
          `Masonry: Invalid children. Missing children. <Masonry>{children}</Masonry>. Children can be specified with a valid HTML Tag (e.g., div, p, section, img, etc.).`
        );
      }

      const cols = calculateColumns(masonryRef, width);
      positionElements(cols, masonryRef, gap);
      requestAnimationFrame(() => setIsReady(true));

      window.addEventListener("resize", handleResize);
      resizeObserverRef.current = new ResizeObserver(handleResize);

      if (masonryRef.current) {
        resizeObserverRef.current.observe(masonryRef.current);
      }

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeoutRef.current);
        resizeObserverRef.current?.disconnect();
      };
    } catch (error) {
      console.error("Masonry setup error:", error);
    }
  }, [masonryRef, gap, width, children]);

  return { isReady };
};

export default useMasonryLayout;
