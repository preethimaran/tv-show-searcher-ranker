# TV Searcher and Ranker

## Overview
This is a front end project built using HTML, CSS, and JavaScript.  
A backend will be added later to make it a full-stack application.

## Tech Stack
- HTML
- CSS
- JavaScript

## Features
- Search for TV shows dynamically using the TVMaze API
- Displays the images pertaining to the show, which can then be ranked into 5 categories
- Any show that has been added by mistake, can be deleted by double clicking on the image
- Light and Dark Mode Available
- Future backend will allow saving favorite shows and the ranking list

## Live Demo
![Demo of TV Searcher](frontend/images/demo/demo.gif)

## Project Structure

tv-show-searcher-ranker/
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       ├── dark.jpg           
│       ├── light.jpg          
│       └── demo/
│           └── demo.gif       # GIF demo of interactions (search + ranking)
├── backend/                   # Placeholder for future backend
│   └── .gitkeep               # Empty file to track the folder in Git
├── .gitignore                 # Git ignore file
└── README.md                  # Project documentation and demo info

## How to Run

1. Navigate to the `frontend` folder.
2. Open `index.html` in your browser.

## Future Improvements
- Add backend (Node.js / Flask / etc.)
- Add database
- Deploy to cloud

## Author
Preethi Maran
