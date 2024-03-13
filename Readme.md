# Big Trip

A travel planner app helps to plan in detail the route of the trip, calculate the cost of the trip and get information about the sights.

<p align="center"><img width="869" alt="Browser Mockup." src="/preview/big-trip-preview.png"></p>

## Overview

The journey is based on individual route points. A route point is a separate event in the journey. The route point can be a stop at some place (**Check-in**, **Sightseeing**, **Restaurant**) or a trip by vehicle (**Taxi**, **Bus**, **Train**, **Ship**, **Drive** and **Flight**). 

The 'Favorite' button (displayed as an asterisk) adds a route point to favorites.

<p align="center"><img width="869" alt="Browser Mockup." src="/preview/point-editor-preview.png"></p>

The 'New Event' button is used to create a new route point.

<p align="center"><img width="869" alt="Browser Mockup." src="/preview/flatpickr-preview.png"></p>

The time and date are selected using the library flatpickr.js.

Additional options are displayed in the offers block. The set of additional options that the user can select when creating a route point depends on the type of route point. The choice of additional options affects the total cost of the trip. 

The total cost of the trip is recalculated when creating/changing/deleting any point on the route.

<p align="center"><img width="869" alt="Browser Mockup." src="/preview/toolbar-preview.png"></p>

There are several filters provided in the application: **Everything** is a complete list of route points, **Future** is a list of planned route points, **Present** is a list of current route points, **Past** is a list of passed route points.

The user can sort the route points by the cost (click on the column heading **Price**) and duration (click on the column heading **Time**). To cancel the sorting and return to the original date sorting, the user clicks on the column heading **Day**.

### Technologies

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

- Architecture Pattern: MVP
- OOP: Vanilla JavaScript using ES6 Classes
- All JavaScript files are separate ES6 Modules

### Directory structure

    ├── src
    │   ├── model                      
    │   │   ├── filter-model.js          
    │   │   └── point-model.js                
    │   ├── presenter                                     
    │   │   ├── filter-presenter.js                
    │   │   ├── headline-presenter.js                   
    │   │   ├── main-presenter.js  
    │   │   ├── new-point-presenter.js                 
    │   │   └── point-presenter.js 
    │   ├── view                     
    │   │   ├── content
    │   │   │   ├── headline-view.js   
    │   │   │   ├── list-view.js  
    │   │   │   ├── point-editor-view.js
    │   │   │   └── point-view.js   
    │   │   ├── stubs
    │   │   │   ├── alert-view.js
    │   │   │   └── loader-view.js                
    │   │   └── toolbar                 
    │   │       ├── cta-button-view.js
    │   │       ├── filter-view.js
    │   │       └── sort-view.js
    │   ├── server                               
    │   │   └── points-api-service.js          
    │   ├── utils
    │   │   ├── common.js
    │   │   ├── const.js
    │   │   ├── date.js
    │   │   ├── enum.js
    │   │   └── filter.js
    │   └── main.js
    └── public
        ├── css
        ├── fonts
        ├── img
        └── index.html
