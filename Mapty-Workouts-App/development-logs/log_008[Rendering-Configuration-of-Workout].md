This log is progressed with the development of the progression of the Architecture.

# START

This development would be focused on the newWorkoutClass and the primary role is to get data, validate it and then to render it.


We need to use the .value to get the data from the event listerners and assign them to new variables. inputType is a variable that toggles but you can use the .value on it too.

The value of the eventListerners are usually string. add a + i =n front of the variable assignment to turn them into integers for calculation purposes.

To see if the type of the workout is running, we just create a new variable called cadence. The same goes for cadence too.

Input validiation is simply to check if the data value are numbers. Not alphabets or signs. we be using the !Number.isFinite to verify that. This would be called on both the duration, distance and the cadence. the code mustn't work if one of them is invalid.

we will be using the validInput function that uses the every statement of the JavaScript for the sake of maintaining the D.R.Y principle of the code. The code of the cadence, distance and the duration cannot be negative so that the code would make logical sense.

The marker code was packed into a new class called renderWorkerMarker that uses the workout instance to adjust the values.

_PLEASE NOTE THAT THIS PART OF THE PROGRAM TOOK ME ALMOST 2 HOURS TO DEBUG. THE FILE STRUCTURE PLAYS A VITAL ROLE HERE. PLEASE EXAMINE THIS WITH A CLEAR MIND._