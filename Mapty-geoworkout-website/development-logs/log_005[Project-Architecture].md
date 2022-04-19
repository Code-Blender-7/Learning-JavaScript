This is the project architecture of the Mapty project.



# START

Architecture is all about strcuture and a project is developed by assigning features to that Architecture. 
The first thing to do is to store data. Data is important for the project. Data is technically generated from the User story. 
The idea is that we be creating classes to handle the user story.

the class workout include like id, date, distance, duration, coords.
again the parent classes uses the child classes like Child Class Running and Child Class Cycling. it means that data is formated from the parent classes and the child classes inheriting the constructor fron the parent class. It's simply called *inheritance*. 

The work goes like this -

    1. Load Page
    2. Receieve Position
    3. Click on Map
    4. Change input
    5. Submit Form

Simply, these are the features of interaction in the Mapty project. The Load page is done by the first thing what the User sees. The pages are of course loaded in the defer style. The next step would be to recieve position. We would be needing the Geolocation API and the Leaflet API for this to work out. The click on Map is simply called in layman's term, to click on a tile. Tiles like this are managed by the Leafet API. Once the user clicks on the map, all the classes kick in. We be creating a new Class app that is used to acquire the user data from the interaction. 

Let, the workouts be the one that is holding the current workout. The Class App consists of a getPosition(), loadMap(), showForm, toggleElevationField and newWorkout that is used for the concept of Child Class Cycling and the Child Class Running.




*Expect more development logs related to this.*