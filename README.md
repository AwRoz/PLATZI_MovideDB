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

Double chech with the API the type and availability of data before the design, this can save us a lot of time on fixing problems when coding the JS. i.e: my custom filters are not the same filters on the API

Still struggling with the scroll in carousel for pictures in movieDetails, some tomes it doesn't start back to 0

Nodes - Variables: name variables including the asociated section i.e: 
homeFeaturedTitle
homeFeaturedDescription
homeFeaturedTags
homeTrendingList
homeUpcomingList

It's FUNDAMENTAL to work on the workflow diagrams or user web flow in the design stage. (how the user navigates through pages and how the site behaves) all of this before start coding.

Include in the design process the loading skeleton, 

loading Skeleton: the skeleton must match the layout (same dimention, same positions and distribution in the flow of the application/web)

each element of the skeleton should be repleaced in real time. ritgh now the api is cleaning the whole container, making the skeleton disapear completely. Ref: class 3, Curso Profesional de Consumo de API REST con JavaScript