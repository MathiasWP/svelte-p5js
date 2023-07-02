# Changelog

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
