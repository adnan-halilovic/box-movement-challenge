window.onload = initialize;

// Define Canvas
let canvas, canvasContext;

// Animation state
let previousTimestamp = null;
let currentBoxPosition = 0;
let boxColorToApply = BOX_COLOR_MAPPING[BOX_STATUSES.DEFAULT];
let hasBoxStoppedMoving = false;

function initialize() {
    applyGlobalStyles();
    setupCanvas();
    renderBox(boxColorToApply, 0); // Initial box rendering

    // Start movement and fetch data after a 1-second delay
    setTimeout(() => {
        startBoxMovement();
        fetchBoxColorFromServer();
    }, 1000);
}

// Apply basic global styles to ensure consistent appearance
function applyGlobalStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body {
            padding: 0;
            margin: 0;
        }
    `;
    document.head.appendChild(styleElement);
}

// Create and configure the canvas
function setupCanvas() {
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasContext = canvas.getContext('2d');
}

// Draw the box at a specific position with the specified color
function renderBox(color, xPosition) {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    canvasContext.fillStyle = color;
    canvasContext.fillRect(
        xPosition,
        0,
        BOX_DIMENSIONS.width,
        BOX_DIMENSIONS.height
    );
}

// Animate the box movement
function animateBox(timestamp) {
    if (!previousTimestamp) previousTimestamp = timestamp; // Initialize timestamp
    const elapsedTimeInSeconds = (timestamp - previousTimestamp) / 1000; // Time elapsed in seconds
    previousTimestamp = timestamp;

    currentBoxPosition = Math.min(
        currentBoxPosition + BOX_SPEED * elapsedTimeInSeconds,
        BOX_TARGET_POSITION
    ); // Clamp position to target

    renderBox(boxColorToApply, currentBoxPosition);

    if (currentBoxPosition === BOX_TARGET_POSITION) {
        hasBoxStoppedMoving = true; // Mark the movement as completed
        applyPendingBoxColor(); // Apply the final color
    } else {
        requestAnimationFrame(animateBox);
    }
}

// Start the animation
function startBoxMovement() {
    requestAnimationFrame(animateBox);
}

// Apply the pending color to the box once the animation completes
function applyPendingBoxColor() {
    renderBox(boxColorToApply, currentBoxPosition);
}

// Fetch the box color from the server
async function fetchBoxColorFromServer() {
    const API_URL = 'https://slowpoke.keev.me/slowpoke.php';
    let serverResponse = BOX_STATUSES.RED; // Default to red if any error occurs

    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            serverResponse = await response.json();
        }
    } catch {
        // Retain the default serverResponse in case of error
    } finally {
        boxColorToApply =
            BOX_COLOR_MAPPING[serverResponse] ||
            BOX_COLOR_MAPPING[BOX_STATUSES.DEFAULT];

        // If the box has already stopped moving, apply the color immediately
        if (hasBoxStoppedMoving) {
            applyPendingBoxColor();
        }
    }
}
