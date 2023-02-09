# Project 2 - React application: Brewery Buddy 🍻️
by Jordan Bortner and Corey Loftus

## Screenshots
![Screenshot from 2023-02-09 00-18-41](https://user-images.githubusercontent.com/115664302/217724953-c8a51d76-f2bf-41c0-b3b4-61acee451eb4.png)
Home/landing page for our application.

![Screenshot from 2023-02-09 00-19-10](https://user-images.githubusercontent.com/115664302/217725032-913fc285-869e-4f66-bd8b-77abc1a639d9.png)
Choose your search method and query, and refine your search with sorting methods provided by the Open Brewery API.

![Screenshot from 2023-02-09 00-19-54](https://user-images.githubusercontent.com/115664302/217725092-fb0ff869-c5a5-42af-8177-f4bb7d6dc19b.png)
Browse search results with the brewery name and address at a glance, and hover over an item to see if a map is available (created with [React Leaflet](https://react-leaflet.js.org/ 'React Leaflet')), and what type of brewery it is. (See the [Open Brewery DB API documentation](https://www.openbrewerydb.org/documentation 'Open Brewery DB API documentation') for more information regarding brewery types)

![Screenshot from 2023-02-09 00-20-13](https://user-images.githubusercontent.com/115664302/217725147-4ec5712f-cfd4-4121-8d50-ce5b2136a23e.png)
See full details on each brewery's page, including the phone number, website, and location on a map (if available). 10-digit U.S. phone numbers have been formatted for readability, and some international address formats have been taken into consideration as well.

## Mobile screenshots

<img src="https://user-images.githubusercontent.com/115664302/217727037-a9b3a16f-c3cb-4167-90dd-d70684975cfb.PNG" alt="Brewery Buddy About page" width=24% />&nbsp;<img src="https://user-images.githubusercontent.com/115664302/217727046-066984e9-5ee6-4173-a308-b163344b27de.PNG" alt="Brewery Buddy search results" width=24% />&nbsp;<img src="https://user-images.githubusercontent.com/115664302/217728877-1af94d59-91c5-4c1e-8d4d-30b39d005dc8.PNG" alt="Brewery Buddy brewery page" width=24% />&nbsp;<img src="https://user-images.githubusercontent.com/115664302/217727063-fb93366c-6195-43f1-9672-cd73b54c9584.PNG" alt="Brewery Buddy random brewery" width=24% />

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
[Check out the live deployment here.](https://brewerybuddy.netlify.app/)

[View the GitHub page for the project here.](https://github.com/jordbort/project-2-brewery-app)


## Contribution Guidelines
Bugs?
Improvement suggestions?
Future proposals?

Open an GH issue or PR and we'd be happy to chat.

Thanks for checking out our project!

-- Corey + Jordan
