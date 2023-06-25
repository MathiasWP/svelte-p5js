<script>
	import { createEventDispatcher, onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';

	/**
	 * @readonly
	 * @type {import('p5')}
	 * @description The instance of p5 for this component. Is undefined
	 */
	export let instance = undefined;

	/**
	 * @description The setup() function is called once when the program starts. It's used to define initial environment properties such as screen size and background color and to load media such as images and fonts as the program starts. There can only be one setup() function for each program and it shouldn't be called again after its initial execution.
	 * @type {(instance: import('p5')) => void | Promise<void>}
	 */
	export let setup = undefined;

	/**
	 * @description Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called. Note if noLoop() is called in setup(), draw() will still be executed once before stopping. draw() is called automatically and should never be called explicitly.
	 * @type {(instance: import('p5')) => void | Promise<void>}
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

		new P5js((p5) => {
			instance = p5;

			p5.setup = async () => {
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

			p5.draw = async () => {
				/**
				 * Keyboard constants
				 */
				keyIsPressed = p5.keyIsPressed;
				key = p5.key;
				keyCode = p5.keyCode;

				/**
				 * Mouse constants
				 */
				movedX = p5.movedX;
				movedY = p5.movedY;
				mouseX = p5.mouseX;
				mouseY = p5.mouseY;
				pmouseX = p5.pmouseX;
				pmouseY = p5.pmouseY;
				winMouseX = p5.winMouseX;
				winMouseY = p5.winMouseY;
				pwinMouseX = p5.pwinMouseX;
				pwinMouseY = p5.pwinMouseY;
				mouseButton = p5.mouseButton;
				mouseIsPressed = p5.mouseIsPressed;

				if (typeof draw === 'function') await draw(p5);
				for (const fn of $drawStore.values()) {
					fn(p5);
				}
			};

			/**
			 * Acceleration events
			 */
			p5.setMoveThreshold = () => {
				dispatch('setMoveThreshold', { instance: p5 });
			};
			p5.setShakeThreshold = () => {
				dispatch('setShakeThreshold', { instance: p5 });
			};
			p5.deviceMoved = () => {
				dispatch('deviceMoved', { instance: p5 });
			};
			p5.deviceTurned = () => {
				dispatch('deviceTurned', { instance: p5 });
			};
			p5.deviceShaken = () => {
				dispatch('deviceShaken', { instance: p5 });
			};

			/**
			 * Keyboard events
			 */
			p5.keyPressed = () => {
				dispatch('keyPressed', { instance: p5 });
			};
			p5.keyReleased = () => {
				dispatch('keyReleased', { instance: p5 });
			};
			p5.keyTyped = () => {
				dispatch('keyTyped', { instance: p5 });
			};
			p5.keyIsDown = () => {
				dispatch('keyIsDown', { instance: p5 });
			};

			/**
			 * Mouse events
			 */
			p5.mousePressed = () => {
				dispatch('mousePressed', { instance: p5 });
			};
			p5.mouseMoved = () => {
				dispatch('mouseMoved', { instance: p5 });
			};
			p5.mouseDragged = () => {
				dispatch('mouseDragged', { instance: p5 });
			};
			p5.mousePressed = () => {
				dispatch('mousePressed', { instance: p5 });
			};
			p5.mouseReleased = () => {
				dispatch('mouseReleased', { instance: p5 });
			};
			p5.mouseClicked = () => {
				dispatch('mouseClicked', { instance: p5 });
			};
			p5.doubleClicked = () => {
				dispatch('doubleClicked', { instance: p5 });
			};
			p5.mouseWheel = () => {
				dispatch('mouseWheel', { instance: p5 });
			};
			p5.requestPointerLock = () => {
				dispatch('requestPointerLock', { instance: p5 });
			};
			p5.exitPointerLock = () => {
				dispatch('exitPointerLock', { instance: p5 });
			};

			/**
			 * Touch events
			 */
			p5.touchStarted = () => {
				dispatch('touchStarted', { instance: p5 });
			};
			p5.touchMoved = () => {
				dispatch('touchMoved', { instance: p5 });
			};
			p5.touchEnded = () => {
				dispatch('touchEnded', { instance: p5 });
			};
		});
	});
</script>

<slot />
