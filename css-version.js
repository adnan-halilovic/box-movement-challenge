window.onload = initialize;

// Animation state
let lastFrameTime = null;
let currentBoxPosition = 0;
let pendingBoxClass = BOX_COLOR_CLASSES[BOX_STATUSES.DEFAULT];
let hasReachedTarget = false;

function initialize() {
    createBoxElement();
    addBoxStyles();

    // Start box movement and data fetching after a delay
    setTimeout(() => {
        startBoxAnimation();
        fetchBoxColorFromServer();
    }, 1000);
}

// Create the box element and append it to the document body
function createBoxElement() {
    const boxElement = document.createElement('div');
    boxElement.id = 'box';
    boxElement.style.left = '0px'; // Initial position
    document.body.appendChild(boxElement);
    updateBoxColor(pendingBoxClass); // Apply initial color
}

// Define and apply styles for the box and its color classes
function addBoxStyles() {
    const styleElement = document.createElement('style');
    const BOX_COLOR = BOX_COLOR_MAPPING;
    styleElement.textContent = `
        #box {
            position: absolute;
            top: 0;
            left: 0;
            width: ${BOX_DIMENSIONS.width};
            height: ${BOX_DIMENSIONS.height};
        }
        .black-box { background-color: ${BOX_COLOR[BOX_STATUSES.DEFAULT]}; }
        .blue-box { background-color: ${BOX_COLOR[BOX_STATUSES.BLUE]}; }
        .green-box { background-color: ${BOX_COLOR[BOX_STATUSES.GREEN]}; }
        .red-box { background-color: ${BOX_COLOR[BOX_STATUSES.RED]}; }
    `;
    document.head.appendChild(styleElement);
}

// Animate the box movement
function animateBoxMovement(timestamp) {
    const boxElement = document.getElementById('box');
    if (!lastFrameTime) lastFrameTime = timestamp; // Initialize timestamp
    const timeElapsed = (timestamp - lastFrameTime) / 1000; // Time elapsed in seconds
    lastFrameTime = timestamp;

    currentBoxPosition = Math.min(
        currentBoxPosition + BOX_SPEED * timeElapsed,
        BOX_TARGET_POSITION
    ); // Clamp position to the target
    boxElement.style.left = `${currentBoxPosition}px`;

    if (currentBoxPosition < BOX_TARGET_POSITION) {
        requestAnimationFrame(animateBoxMovement);
    } else {
        hasReachedTarget = true; // Mark movement as complete
        updateBoxColor(pendingBoxClass); // Apply the final color
    }
}

// Start the animation for box movement
function startBoxAnimation() {
    requestAnimationFrame(animateBoxMovement);
}

// Update the box's color by setting the appropriate class
function updateBoxColor(colorClass) {
    const boxElement = document.getElementById('box');
    boxElement.className = colorClass;
}

// Fetch the color status from the server and handle the response
async function fetchBoxColorFromServer() {
    const API_URL = 'https://slowpoke.keev.me/slowpoke.php';
    let serverStatus = BOX_STATUSES.RED; // Default to red on error

    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            serverStatus = await response.json();
        }
    } catch {
        // Default serverStatus remains unchanged
    } finally {
        const boxClass =
            BOX_COLOR_CLASSES[serverStatus] ||
            BOX_COLOR_CLASSES[BOX_STATUSES.DEFAULT];

        // If movement is complete, apply the color immediately
        if (hasReachedTarget) {
            updateBoxColor(boxClass);
        } else {
            pendingBoxClass = boxClass;
        }
    }
}
