# Requirements

Please write a function in pure JavaScript that takes a URL as input and meets the following requirements:

-   You can use all the features of the language that work in the latest version of Google Chrome.
-   The function is called once on an empty browser page (empty body tag).
-   At the time the function is invoked, a black square with a side of 100px is drawn in the top-left corner of the window.
-   One second after the function is called, the square begins a smooth, uniform linear movement to the right at a constant speed of 100px per second.
-   Simultaneously with the start of the square's movement, a GET request is sent to the URL provided to the function.
-   One second after starting its movement, the square should stop, having traveled a total of 100px.
-   If the result of the request is known by the time the square stops, then the color of the square should change at the moment of stopping (but not before).
-   If the request is not yet complete by the time the square stops, the square should still stop, and its color should change as soon as the result of the request is known.
-   The new color depends on the result of the request. If the server responded with "1", then the color is green; if "0" — blue. If the request was unsuccessful (status is not 200) or did not complete at all (network error), then red.

URL for debugging: https://slowpoke.keev.me/slowpoke.php
