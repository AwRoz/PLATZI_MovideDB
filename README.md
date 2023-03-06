PLATZI_MovieDB

Curso práctico de consumo de API con JS.

Things to improve:

The movies scroll section doesn't have fully controlled behavior.
When reloading the page, sometimes the scroll starts at a random position.
On some devices, there's no clue that there's a scroll due to the pictures fitting perfectly on the screen.
It's made with flex, but apparently, it would be better to control it with grid and JS.

Design:

The design should be tested for UI and UX before starting to code. I noticed that I had to increase the size of certain elements because when tested on a phone, those elements were too small. So, it's better to test the design from Figma on a mobile device before starting to code.
I'm struggling with some styles when I want to achieve an overlap style, like the background on the movie details section, in combination with the title, description, etc. Apparently, there's an option to use CSS grid to achieve the same effect instead of using positioning: relative/absolute.
Overflow: scroll -> I'm not completely sure how to fix this behavior. In some cases, when the text description for movies is too long, this could help the design not fall apart, but it's almost not clear that there's a scrollbar or any indication that you can continue scrolling to read. It also happens with the pictures scroll. Sometimes it can look like there's no more text or pictures.
Principles for responsive layouts:

Try to avoid fixed sizes like width: 200px or 200rem. Try to use min-width/max-width instead. This will allow the design to be controlled on different screen sizes.
Accessibility: Be careful when setting elements up with fixed sizes, like the movie tags categories. If someone scales the text in the browser, the tags won't scale due to their fixed size either in their container or in the text itself.

When working with views (enabling and disabling in JS) each main view must be contained in a section container with an ID(id='view-name') and an empty class, and only using this class to toggle 'disable-view' and not use this container for styling.