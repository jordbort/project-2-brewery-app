# Project 2 - React application: Brewery Buddy 🍻️
by Jordan Bortner and Corey Loftus

## Screenshots
![Screenshot from 2022-12-12 18-18-54](https://user-images.githubusercontent.com/115664302/207182380-f1f72002-f4ab-4516-86c0-0b60e470908c.png)
Home/landing page for our application.

![Screenshot from 2022-12-12 18-19-43](https://user-images.githubusercontent.com/115664302/207182492-793aa4bd-d8b3-418b-a02c-4cba28f181fc.png)
Choose your search method and query, and refine your search with sorting methods provided by the Open Brewery API.

![Screenshot from 2022-12-12 18-21-41](https://user-images.githubusercontent.com/115664302/207182645-92e220f8-c0b8-4dd4-9a89-88b8416d58c6.png)
Browse search results with the brewery name and address at a glance, and hover over an item to see if a map is available (created with [React Leaflet](https://react-leaflet.js.org/ 'React Leaflet')), and what type of brewery it is. (See the [Open Brewery DB API documentation](https://www.openbrewerydb.org/documentation 'Open Brewery DB API documentation') for more information regarding brewery types)

![Screenshot from 2022-12-12 18-22-00](https://user-images.githubusercontent.com/115664302/207183617-1c2049a6-dbd5-4304-81c8-a6a17c386d17.png)
See full details on each brewery's page, including the phone number, website, and location on a map (if available). 10-digit U.S. phone numbers have been formatted for readability, and some international address formats have been taken into consideration as well.

## Description
What does it do?
    Our Brewery App utilizes the [Open Brewery DB](http://openbrewerydb.org 'Open Brewery DB') to create a search engine that populates detailed results, and displays a map of where the brewery is.

## Motivation for it?
    We thought it would be fun! And a good challenge to apply our learnings about React.
    We're completing this as part of General Assembly's Software Engineering Intensive 10-31-22.

    Corey's brother initially suggested a project like this as part of his strategy for interviewing software engineer candidates. Jordan and Corey thought it would be fun to solve this challenge as part of a project for their Software Engineering Intensive through General Assembly.
    

### What problems does it solve?
    - Presents JSON data at a glance for users to locate closest/nearest brewery to them.
    - Allows user to search by the following data: 
        - Brewery Name
        - Brewery City
        - Brewery State
        - Brewery Postal code
        - Brewery Country
    - Presents detailed contact information for brewery upon selection.
    - Displays a map using API's logitude/latitude data (courtesy of Leaflet and OpenStreetMap).
    - Displays how recently the data has been updated for each brewery.
    - "I'm feeling drunky" - populates info for a random brewery from the database.

[View Wireframes here.](https://www.figma.com/file/e6enmnOm2qxQZ9M8Jpu6UA/SEI-10-31-Jordan-Corey-Project-2?node-id=13%3A175&t=KfdDK5iFTTBwkvj3-1)


## Technologies Used
HTML/CSS, JavaScript, React.js, JSX, Node.js, Leaflet.js, React Leaflet, OpenStreetMap API

### Getting Started / Installation Instructions
[Check out the live deployment at.](https://dreamy-bienenstitch-fd35ba.netlify.app/)

[View the GitHub page for the project here.](https://github.com/jordbort/project-2-brewery-app)


## Contribution Guidelines
Bugs?
Improvement suggestions?
Future proposals?

Open an GH issue or PR and we'd be happy to chat.

Thanks for checking out our project!

-- Corey + Jordan
