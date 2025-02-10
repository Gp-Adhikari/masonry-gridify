import { columns } from "./constants";

export const calculateColumns = (masonryRef, width) => {
  if (masonryRef.current) {
    const containerWidth = masonryRef.current.getBoundingClientRect().width;
    const computedStyles = window.getComputedStyle(masonryRef.current);
    const columnWidth = parseFloat(width) + parseFloat(computedStyles.gap);

    if (columnWidth > 0) {
      const cols = Math.floor(containerWidth / columnWidth);
      columns.current = cols;
      return cols;
    }
  }
  return 0;
};

// export const positionElements = (cols, masonryRef, gap) => {
//   if (masonryRef.current) {
//     const childrenArray = Array.from(masonryRef.current.children);

//     childrenArray.forEach((child) => {
//       child.style.transform = "";
//       child.style.marginTop = "";
//     });

//     let totalOffsetTopToFixForEachColumn = {};
//     let columnHeights = {};

//     for (let i = cols; i < childrenArray.length; i++) {
//       const currentElement = childrenArray[i];
//       const aboveElement = childrenArray[i - cols];
//       const col = i % cols;

//       currentElement.style.transform = "";
//       currentElement.style.marginTop = "";

//       if (aboveElement) {
//         if (i - cols <= cols) {
//           columnHeights[col] =
//             (columnHeights[col] || 0) + aboveElement.clientHeight + gap;
//         }

//         const offsetTopToFix =
//           currentElement.offsetTop -
//           (aboveElement.offsetTop + aboveElement.clientHeight);

//         totalOffsetTopToFixForEachColumn[col] =
//           (totalOffsetTopToFixForEachColumn[col] || 0) + offsetTopToFix;

//         columnHeights[col] =
//           (columnHeights[col] || 0) + currentElement.clientHeight + gap;

//         currentElement.style.transform = `translateY(-${totalOffsetTopToFixForEachColumn[col]}px)`;
//         currentElement.style.marginTop = `${gap}px`;
//       }
//     }
//     const largestColumnHeight = Math.max(...Object.values(columnHeights));
//     masonryRef.current.style.height = `${largestColumnHeight}px`;
//   }
// };

export const positionElements = (cols, masonryRef, gap) => {
  if (masonryRef.current) {
    const childrenArray = Array.from(masonryRef.current.children);

    childrenArray.forEach((child) => {
      child.style.transform = "";
      child.style.marginTop = "";
    });

    let totalOffsetTopToFixForEachColumn = {};
    let columnHeights = {};

    for (let i = cols; i < childrenArray.length; i++) {
      const currentElement = childrenArray[i];
      const aboveElement = childrenArray[i - cols];

      const col = i % cols;

      currentElement.style.transform = "";
      currentElement.style.marginTop = "";

      if (aboveElement) {
        if (i - cols <= cols) {
          columnHeights[col] = columnHeights[col]
            ? columnHeights[col]
            : 0 + aboveElement.clientHeight + gap;
        }

        const offsetTopToFix =
          currentElement.offsetTop -
          (aboveElement.offsetTop + aboveElement.clientHeight);

        totalOffsetTopToFixForEachColumn[col] =
          (totalOffsetTopToFixForEachColumn[col] != undefined
            ? totalOffsetTopToFixForEachColumn[col]
            : 0) + offsetTopToFix;

        columnHeights[col] =
          columnHeights[col] + currentElement.clientHeight + gap;

        currentElement.style.transform = `translateY(-${totalOffsetTopToFixForEachColumn[col]}px)`;
        currentElement.style.marginTop = `${gap}px`;
      }
    }
    const largestColumnHeight = Math.max(...Object.values(columnHeights));
    masonryRef.current.style.height = largestColumnHeight + "px ";
  }
};
