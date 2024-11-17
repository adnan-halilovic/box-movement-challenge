// Box statuses and corresponding class mapping
const BOX_STATUSES = {
    GREEN: 1,
    BLUE: 0,
    RED: 2,
    DEFAULT: 3,
};

const BOX_COLOR_CLASSES = {
    0: 'blue-box',
    1: 'green-box',
    2: 'red-box',
    3: 'black-box',
};

// Mapping of box status to colors
const BOX_COLOR_MAPPING = {
    0: 'blue',
    1: 'green',
    2: 'red',
    3: 'black',
};

// Animation settings
const BOX_SPEED = 100; // Pixels per second
const BOX_TARGET_POSITION = 100; // Movement stops at 100px

// Canvas and box properties
const BOX_DIMENSIONS = { width: 100, height: 100 };
