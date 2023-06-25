# svelte-p5js (still under early development)

A svelte wrapper for the [p5.js](https://p5js.org/) library.

All props and variables are an exact copy of the original library.

## Run locally

1. `npm install`
2. `npm run dev`
3. Use the `src/routes/+page.svelte` as a playground

## Currently spported components

Components used to simplify the p5.js API.

### Rendering

- `<Canvas w={number} h={number}/>` (createCanvas)

### Structure

- `<Draw />`
- `<Setup />`
- `<P5 />`

### Color

- `<Background />`
- `<Fill />`

### Shape

- `<Circle />`
- `<Ellipse />`

## Currently supported events (available on the `<P5 />` component)

All events provide the current instance via `event.detail.instance`.

### Acceleration events

- `on:setMoveThreshold`
- `on:setShakeThreshold`
- `on:deviceMoved`
- `on:deviceTurned`
- `on:deviceShaken`

### Keyboard events

- `on:keyPressed`
- `on:keyReleased`
- `on:keyTyped`
- `on:keyIsDown`

### Mouse events

- `on:mousePressed`
- `on:mouseMoved`
- `on:mouseDragged`
- `on:mousePressed`
- `on:mouseReleased`
- `on:mouseClicked`
- `on:doubleClicked`
- `on:mouseWheel`
- `on:requestPointerLock`
- `on:exitPointerLock`

### Touch events

- `on:touchStarted`
- `on:touchMoved`
- `on:touchEnded`

## Currently supported constants (available on the `<P5 />` component)

### Keyboard constants

- `keyIsPressed`
- `key`
- `keyCode`

### Mouse constants

- `movedX`
- `movedY`
- `mouseX`
- `mouseY`
- `pmouseX`
- `pmouseY`
- `winMouseX`
- `winMouseY`
- `pwinMouseX`
- `pwinMouseY`
- `mouseButton`
- `mouseIsPressed`

## Example usage

The P5 component is the only required component. It sets up a p5 instance and must be the parent of all other components.

```svelte
<script>
	import { P5, Setup, Canvas, Draw, Background, Fill, Circle, Ellipse } from 'svelte-p5js';

	let x = 0;
	let y = 0;
	let d = 10;

	let mouseIsPressed;
	$: console.log('Mouse is pressed?', mouseIsPressed);

	// Bind the current instance of the P5 component to a variable
	// and get access to the whole API
	let instance;
</script>

<P5
	bind:instance
	setup={() => console.log('I was fired during setup')}
	draw={(instance) => {
		x++;
		y++;
		d += 0.3;
		// Get access to the whole p5js api via the first
		// and only "instance" parameter
		instance.mousePressed = () => {
			instance.noLoop();
		};
	}}
	bind:mouseIsPressed
	on:mouseReleased={(event) => {
		// Get access to the current instance via the event
		const instance = event.detail.instance;
		instance.loop();
	}}
>
	<Setup>
		<Canvas w={500} h={500} />
	</Setup>

	<Draw>
		<Background v1={105} v2={140} v3={99} />
		<Fill v1={205} v2={140} v3={99} />
		<Circle {x} {y} {d} />
		<Fill v1={205} v2={40} v3={99} />
		<Ellipse {x} {y} w={20} h={20} />
	</Draw>
</P5>
```
