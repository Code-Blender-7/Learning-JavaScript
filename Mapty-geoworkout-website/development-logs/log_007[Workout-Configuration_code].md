To this date, I think I told earlier that I'll be working on learning or simply said revising the concepts of the namespace and the classes. Oops, I forgot. Least, this is something based on the classes that I was supposed to learn. So? Let's get to work.


# START

The new workout class is something like the App class. Hwever, the workout displays the data. While the app class gets the data. That is why, the workout and the app are not the same thing. The workout display form would be created beneath the mapty logo. it would have the details of the user story generated data. Therefore, the workout simply gets the data from the App class and then uses it for the display of the form. 

The description of the workout is given below - 

The purpose of this workout is to create forms based on the user's data. It simply meant that the data of the user is based on the Running and the Cycling class.

The workout begins with adding coords, distance and duration because they are the same data that exists in both the Running and the Cycling class. The next phase would be to create extension or more like inheritence classes of the workout class. The extends include the Running and the Cycling classes. 

the code goes more like 

```
class Running extends Workout{

}
```
and 
```
class Cycling extends Workout{

}
```


They all used the super syntax to prove that the distance, coords and the duration are the same thing from the main Workout class. the only difference between these 2 are that the cycling class contains the elevation gain while the running class contains the cadence class. Simply to solve this, introduce a new argument for the inheritence class that consists of the value of Cadence or ElevationGain of the Running and the Cycling class respectively.

The calculation of the unit of these two seperate classes are unique functions which are easy to call. 

This is the final structure of the Running Class for an example. 


```
class Running extends Workout{
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace()

    }

    calcPace() {
        this.pace = this.duration / this.distance // min/km
        return this.pace
    }

}
```

As that they are simple classes, call them for testing using console or whatever..