For those who are still not undestanding what is the purpose of the refactor and this whole story, please nagivate to the logs. the link to the recent log is [here](https://github.com/Code-Blender-7/Learning-JavaScript/blob/main/Mapty-geoworkout-website/development-logs/log_005%5BProject-Architecture%5D.md).

# START


I'll try to make it be sure.


This is the refactor or more like arranging the messed up portions of the original javascript file. I really don't want to mess up the log writing of this description, so I'll start with the the constructor names and their purpose.


The refactoring is simply the transfer of the codelines and put them into constructor functions of the main class. Let the main class is called App. Here, everthing of the following functions, features and all the behavior of the website is simply from this App. Let's begin.


The class App consists of 5 sub classes and a constructor. The classes include - 

1. _getPosition(). {*Used for the gettting location of the place where the user actually clicks on the tilemap of the leaflet API. IF you are thinking that it has something to do with geolocation, it's that the geolocation is used to make the tilemap actually load on the user's position. It has nothing to do with the fancy stuff.*} 
2. _loadMap(position) {*This is the second part of the getPosition. the getPosition only simply transfers the data of the user to the loadMap. You can say that the real magic occurs here.*}
3. _showForm() {*Used for the purpose of the showing the form. Simply that means to toggle the form if the user had clicked on a position.*}
4. _toggleElevationField() {*Used for changing the input fields between the running and cycling.*}
5. _newWorkout() {*After the user fills the creditials of the marker, the new workout is formed. it means that a list is created regarding of the user's details.*}


Some of the function uses the data of other classes internally. that's why, the this keyword is used. the global elements are moved to the class and they are assigned as private classes. 

Some of the features uses the data and they call the eventListerners but they get an error. For that, the bind method is used to create a new function that doesn't jeoprodize the function of the Event listener. In a nutshell, **The bind method is a good way to make the classes of the constructor inherit and work with each other's data. The bind is done with the this keyword.**


In the end, call the app by creating a new variable and assigning the value to the App class.
