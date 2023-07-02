# Changelog

## 0.0.4 (Jul 2, 2023)

### Improvements

- Provide two different ways of working with the p5.js API:
  - Using the `<P5 />` component that expects a sketch property (same api as https://github.com/tonyketcham/p5-svelte)
  - Via the `<Sketch />` component (previously named `<P5 />`)with a lot of props, methods and components for working with the API.

### Added following components:

- Sketch (previously named P5)

### Changed following components:

- P5 (expects only a sketch as property)

## 0.0.3 (Jul 2, 2023)

### Improvements

- Prevent memory leakage by running `P5js.remove()` on destroy

## 0.0.2 (Jul 2, 2023)

### General refactoring

- Created an internal `setupComponent` method
- Parameters `<Background />`, `<Fill />` and `<Stroke />` are resolved in the same way as the p5js documentation defines it

### Improvements

- The `<P5 />` component is now mounted in a container instead of being mounted to the body. This also fixed an annoying HMR bug during development.

### Added following components:

- Clear
- Erase
- Fill
- NoFill
- NoStroke
- Stroke

## 0.0.1 (Jun 26, 2023)

### Added following components:

- Background
- Canvas
- Circle
- Draw
- Ellipse
- Fill
- P5
- Setup
