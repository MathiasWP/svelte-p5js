<script>
	import { createEventDispatcher, onDestroy, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * @readonly
	 * @type {import('p5')}
	 * @description The instance of p5 for this component. Is undefined
	 */
	export let p5 = undefined;

	/**
	 * @description The setup() function is called once when the program starts. It's used to define initial environment properties such as screen size and background color and to load media such as images and fonts as the program starts. There can only be one setup() function for each program and it shouldn't be called again after its initial execution.
	 * @type {(p5: import('p5')) => void | Promise<void>}
	 */
	export let setup = undefined;

	/**
	 * @description Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called. Note if noLoop() is called in setup(), draw() will still be executed once before stopping. draw() is called automatically and should never be called explicitly.
	 * @type {(p5: import('p5')) => void | Promise<void>}
	 */
	export let draw = undefined;

	/**
	 * @readonly
	 * @description The boolean system variable keyIsPressed is true if any key is pressed and false if no keys are pressed.
	 * @type {boolean}
	 */
	export let keyIsPressed = false;

	/**
	 * @readonly
	 * @description The system variable key always contains the value of the most recent key on the keyboard that was typed. To get the proper capitalization, it is best to use it within keyTyped(). For non-ASCII keys, use the keyCode variable.
	 * @type {string}
	 */
	export let key = '';

	/**
	 * @readonly
	 * @description The system variable key always contains the value of the most recent key on the keyboard that was typed. To get the proper capitalization, it is best to use it within keyTyped(). For non-ASCII keys, use the keyCode variable.
	 * @type {number}
	 */
	export let keyCode = 0;

	/**
	 * @readonly
	 * @description The variable movedX contains the horizontal movement of the mouse since the last frame
	 * @type {number}
	 */
	export let movedX = 0;

	/**
	 * @readonly
	 * @description The variable movedY contains the vertical movement of the mouse since the last frame
	 * @type {number}
	 */
	export let movedY = 0;

	/**
	 * @readonly
	 * @description The system variable mouseX always contains the current horizontal position of the mouse, relative to (0, 0) of the canvas. The value at the top-left corner is (0, 0) for 2-D and (-width/2, -height/2) for WebGL. If touch is used instead of mouse input, mouseX will hold the x value of the most recent touch point.
	 * @type {number}
	 */
	export let mouseX = 0;

	/**
	 * @readonly
	 * @description The system variable mouseY always contains the current vertical position of the mouse, relative to (0, 0) of the canvas. The value at the top-left corner is (0, 0) for 2-D and (-width/2, -height/2) for WebGL. If touch is used instead of mouse input, mouseY will hold the y value of the most recent touch point.
	 * @type {number}
	 */
	export let mouseY = 0;

	/**
	 * @readonly
	 * @description The system variable pmouseX always contains the horizontal position of the mouse or finger in the frame previous to the current frame, relative to (0, 0) of the canvas. The value at the top-left corner is (0, 0) for 2-D and (-width/2, -height/2) for WebGL. Note: pmouseX will be reset to the current mouseX value at the start of each touch event.
	 * @type {number}
	 */
	export let pmouseX = 0;

	/**
	 * @readonly
	 * @description The system variable pmouseY always contains the vertical position of the mouse or finger in the frame previous to the current frame, relative to (0, 0) of the canvas. The value at the top-left corner is (0, 0) for 2-D and (-width/2, -height/2) for WebGL. Note: pmouseY will be reset to the current mouseY value at the start of each touch event.
	 * @type {number}
	 */
	export let pmouseY = 0;

	/**
	 * @readonly
	 * @description The system variable winMouseX always contains the current horizontal position of the mouse, relative to (0, 0) of the window.
	 * @type {number}
	 */
	export let winMouseX = 0;

	/**
	 * @readonly
	 * @description The system variable winMouseY always contains the current vertical position of the mouse, relative to (0, 0) of the window.
	 * @type {number}
	 */
	export let winMouseY = 0;

	/**
	 * @readonly
	 * @description The system variable pwinMouseX always contains the horizontal position of the mouse in the frame previous to the current frame, relative to (0, 0) of the window. Note: pwinMouseX will be reset to the current winMouseX value at the start of each touch event.
	 * @type {number}
	 */
	export let pwinMouseX = 0;

	/**
	 * @readonly
	 * @description The system variable pwinMouseY always contains the vertical position of the mouse in the frame previous to the current frame, relative to (0, 0) of the window. Note: pwinMouseY will be reset to the current winMouseY value at the start of each touch event.
	 * @type {number}
	 */
	export let pwinMouseY = 0;

	/**
	 * @readonly
	 * @description p5 automatically tracks if the mouse button is pressed and which button is pressed. The value of the system variable mouseButton is either LEFT, RIGHT, or CENTER depending on which button was pressed last. Warning: different browsers may track mouseButton differently.
	 * @type {"LEFT" | "RIGHT" | "CENTER" | undefined}
	 */
	export let mouseButton = undefined;

	/**
	 * @readonly
	 * @description The boolean system variable mouseIsPressed is true if the mouse is pressed and false if not.
	 * @type {boolean}
	 */
	export let mouseIsPressed = false;

	/**
	 * @type {HTMLDivElement | null}
	 */
	let containerEl = null;

	/**
	 * @type {import('p5') | undefined}
	 */
	let p5Class;

	/**
	 * These stores by the children to set values that are used
	 * during setup/draw in the p5 instance below
	 */
	const setupStore = writable(new Map());
	setContext('setup', setupStore);

	const drawStore = writable(new Map());
	setContext('draw', drawStore);

	const dispatch = createEventDispatcher();

	onMount(async () => {
		/**
		 * We have to load the p5 library client-side because it crashes Svelte-kit during SSR.
		 */
		const P5js = (await import('p5')).default;

		/**
		 * @param {import('p5')} instance
		 */
		function sketch(instance) {
			p5 = instance;

			instance.setup = async () => {
				/**
				 * Waiting a tick so that any of the components mounted
				 * within the <Setup /> component are added to the setupStore.
				 *
				 * We do this because setup only runs once, so if it is fired before
				 * the setupStore is filled via components then nothing will happen.
				 */
				await tick();
				if (typeof setup === 'function') await setup(p5);
				for (const fn of $setupStore.values()) {
					fn(p5);
				}
			};

			instance.draw = async () => {
				/**
				 * Keyboard constants
				 */
				keyIsPressed = instance.keyIsPressed;
				key = instance.key;
				keyCode = instance.keyCode;

				/**
				 * Mouse constants
				 */
				movedX = instance.movedX;
				movedY = instance.movedY;
				mouseX = instance.mouseX;
				mouseY = instance.mouseY;
				pmouseX = instance.pmouseX;
				pmouseY = instance.pmouseY;
				winMouseX = instance.winMouseX;
				winMouseY = instance.winMouseY;
				pwinMouseX = instance.pwinMouseX;
				pwinMouseY = instance.pwinMouseY;
				mouseButton = instance.mouseButton;
				mouseIsPressed = instance.mouseIsPressed;

				if (typeof draw === 'function') await draw(p5);
				for (const fn of $drawStore.values()) {
					fn(p5);
				}
			};

			/**
			 * Acceleration events
			 */
			instance.setMoveThreshold = () => {
				dispatch('setMoveThreshold', { p5: instance });
			};
			instance.setShakeThreshold = () => {
				dispatch('setShakeThreshold', { p5: instance });
			};
			instance.deviceMoved = () => {
				dispatch('deviceMoved', { p5: instance });
			};
			instance.deviceTurned = () => {
				dispatch('deviceTurned', { p5: instance });
			};
			instance.deviceShaken = () => {
				dispatch('deviceShaken', { p5: instance });
			};

			/**
			 * Keyboard events
			 */
			instance.keyPressed = () => {
				dispatch('keyPressed', { p5: instance });
			};
			instance.keyReleased = () => {
				dispatch('keyReleased', { p5: instance });
			};
			instance.keyTyped = () => {
				dispatch('keyTyped', { p5: instance });
			};
			instance.keyIsDown = () => {
				dispatch('keyIsDown', { p5: instance });
			};

			/**
			 * Mouse events
			 */
			instance.mousePressed = () => {
				dispatch('mousePressed', { p5: instance });
			};
			instance.mouseMoved = () => {
				dispatch('mouseMoved', { p5: instance });
			};
			instance.mouseDragged = () => {
				dispatch('mouseDragged', { p5: instance });
			};
			instance.mousePressed = () => {
				dispatch('mousePressed', { p5: instance });
			};
			instance.mouseReleased = () => {
				dispatch('mouseReleased', { p5: instance });
			};
			instance.mouseClicked = () => {
				dispatch('mouseClicked', { p5: instance });
			};
			instance.doubleClicked = () => {
				dispatch('doubleClicked', { p5: instance });
			};
			instance.mouseWheel = () => {
				dispatch('mouseWheel', { p5: instance });
			};
			instance.requestPointerLock = () => {
				dispatch('requestPointerLock', { p5: instance });
			};
			instance.exitPointerLock = () => {
				dispatch('exitPointerLock', { p5: instance });
			};

			/**
			 * Touch events
			 */
			instance.touchStarted = () => {
				dispatch('touchStarted', { p5: instance });
			};
			instance.touchMoved = () => {
				dispatch('touchMoved', { p5: instance });
			};
			instance.touchEnded = () => {
				dispatch('touchEnded', { p5: instance });
			};
		}

		p5Class = new P5js(sketch, containerEl);
	});

	onDestroy(() => {
		/**
		 * Prevent memory leak
		 */
		if (p5Class) {
			p5Class.remove();
		}
		p5Class = undefined;
	});
</script>

<div bind:this={containerEl}>
	<slot />
</div>
