import React, { useRef } from "react";
import styles from "./css/masonry.module.css";
import useMasonryLayout from "./useMasonryLayout";

const Masonry = ({
  children,
  gap,
  width,
  loading,
  transition,
  defaultTransition,
}) => {
  const masonryRef = useRef(null);
  const { isReady } = useMasonryLayout(masonryRef, gap, width, children);

  return (
    <>
      {loading && !isReady && loading}
      <div
        ref={masonryRef}
        className={styles.Masonry}
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${width}, 1fr))`,
          gap: `${gap}px`,
          transition: isReady
            ? defaultTransition
              ? ".3s ease"
              : transition || ""
            : "none",
          opacity: isReady ? 1 : 0,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Masonry;
