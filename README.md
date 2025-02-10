# Masonry React Component

A lightweight, responsive, and customizable Masonry grid component for React.

## Features

- Auto-calculates columns based on container width.
- Resizes dynamically when the window size changes.
- Provides smooth transitions.
- Uses `ResizeObserver` for real-time adjustments.

---

## Installation

```js
npm install masonry-gridify
// or
npm install --save masonry-gridify
// or
yarn add masonry-gridify
```

## Usage

**If height is not defined**

It takes the clientHeight of each element even if height is defined or not. So no need to explicitly define the height.

**If height is defined**

```jsx
import Masonry from "masonry-gridify";

const Example = () => {
  return (
    <Masonry gap={10} width={"250px"}>
      <div style={{ height: "150px", background: "red" }}></div>
      <div style={{ height: "200px", background: "blue" }}></div>
      <div style={{ height: "250px", background: "green" }}></div>
      <div style={{ height: "180px", background: "yellow" }}></div>
    </Masonry>
  );
};

export default Example;
```

## Features

**Number of Columns**

```jsx
import Masonry, { columns } from "masonry-gridify";
```

Gets the number of columns displayed in screen.

**Default Transition**

```html
<Masonry gap={10} width={"250px"} defaultTransition={true}></Masonry>
```

Enables a default transition effect of `0.3s ease`.

**Custom Loading**

```html
<Masonry gap={10} width={"250px"} loading={<p>Loading...</p>}></Masonry>
```

Displays a custom loading indicator while the grid is being prepared.

**Custom transition**

```html
<Masonry gap={10} width={"250px"} transition={"1s ease-in-out"}></Masonry>
```

Applies a custom transition style.

---

## Props

| Prop Name           | Type          | Required | Description                                                   |
| ------------------- | ------------- | -------- | ------------------------------------------------------------- |
| `gap`               | `number`      | ✅       | The gap between the grid items (in pixels).                   |
| `width`             | `string`      | ✅       | Minimum column width (supports px, rem, em, etc.).            |
| `children`          | `JSX.Element` | ✅       | Content elements to arrange.                                  |
| `loading`           | `JSX.Element` | ❌       | A loading indicator while the masonry grid is being prepared. |
| `transition`        | `string`      | ❌       | Custom transition style.                                      |
| `defaultTransition` | `boolean`     | ❌       | Enables default transition of `0.3s ease`.                    |

---

## How It Works

1. **Dynamic Column Calculation**:

   - Calculates columns based on container width and column width.
   - Uses ResizeObserver and window resize events for responsiveness.

2. **Element Positioning**:

   - Uses CSS transforms to adjust element positions.
   - Maintains vertical gaps between items.
   - Handles overlapping elements through margin adjustments.

3. **Performance**:

   - Debounced resize handling (200ms delay).
   - RequestAnimationFrame for smooth transitions.
   - Cleanup of observers and event listeners.

---

## Debugging Guide

### Common Issues & Fixes

1. **No items appear**

   - Ensure `children` are passed correctly.
   - Check for missing `gap` or `width` props.

1. **Elements are overlapping or positioned incorrectly**

   - Try refreshing the page. If the issue persists, inspect the elements in DevTools.

1. **Layout Not Updating on Resize**

   - Check if the `ResizeObserver` is working in your browser’s dev tools.
   - Try forcing an update by changing the window size.

1. **Flickering During Transitions**

   Copy paste this code in your item. If the issue persists, you can always create a pull request.

   ```css
   // Add this to your masonry items' CSS:
   .masonryItem {
     will-change: transform;
     backface-visibility: hidden;
   }
   ```

---

## Contribution

If you find any issues or want to contribute, feel free to submit a pull request.

Happy Coding! 🚀
