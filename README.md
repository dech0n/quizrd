# [Quizrd](https://quizrd.herokuapp.com/)
https://quizrd.herokuapp.com/

## Quizrd at a Glance
Quizrd is a fullstack app that allows users to study flashcards in collections of decks. Logged in users can create decks and fill those decks with custom flashcards they make themselves. Unregistered users can study any deck they have a link to view.

## Application Architecture
Quizard is built using React on the frontend with Flask on the backend and PostgreSQL as a database.

## Frontend Overview
Quizrd currently handles all display and interaction logic on the frontend with only a couple technologies.

### Frontend Technologies Used
**React**

Quizrd uses React exclusively to handle the display logic.

**Redux**

All state is managed using Redux. Thunks make API calls to the backend server to retrieve app data.

## Backend Overview

Quizrd uses a Flask server with a PostgreSQL database.

**PostgreSQL**

PostgreSQL was chosen as the database for its ease of use and simplicity.

**Flask SQLAlchemy**

Fask SQLAlchemy was chosen for the ORM because it simplifies the integration of Flask with PostgreSQL. This helped ensure simple, easy table management and seeding.

## Conclusion and Next Steps

I am happy with Quizrd's base functionality but it is lacking features from its original design, namely the ability to upload audio and images related to a user's custom flashcards (who knows how to pronounce "écureuil"?) to create a more robust studying experience. To achieve this, I plan to implement AWS S3 which will accommadate uploading both images and audio files.

In addition to the creation of decks and flashcards, users need to be able to search for them. Currently the only way to find a deck is for it to be part of the user's list of created decks or to be provided the direct URL to someone else's deck. This will be accomplished with a search bar located in the navbar at the top of every page in the app.

To enrich the search feature, I will be adding a category feature that will be associated with decks on the backend. When creating or editing a deck, users will have the option to choose from a static set of categories that they can associate with their deck. This will allow users to include decks in their search without having to know the title or description.

As a follow-up to the search feature, I will be implementing a subscribe or "Learn" feature. This will allow users to create a list of decks they do not own but wish to have available for study. This will reduce the need to search for the same deck repeatedly, save a cumbersome URL or create many bookmarks for the same website.

While I enjoy the simplicity of Quizrd's UI and overall layout, I believe it could be improved to appear more interesting and streamlined. Function is currently prioritized over aesthetic. I aspire to gain more insight in the realm of design to elevate the overall look of my apps.
