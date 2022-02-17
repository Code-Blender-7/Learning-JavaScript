This is the starting of the log dedicated to the Mapty Flowchart and the Table form Rendering code discussion.

# START

Assuming that we have successfully figured out the code of adding a marker on the map whenver we click it. Now, we need to find out a method of displaying the form evertime the user clicks on the map. It isn't about creating a new form. It is about displaying a hidden form by removing it's hidden class.

This is a code that requires to work with HTMl.

The actual form is hidden in the ul class called workouts.

Jonas added a code called inputDistance.focus() This codeline adds a focus on the textline and you be seeing the cursor from there. It is recommended for user experience.


Here is a thing that Jonas explained that is that you don't really add an eventListerner inside of an eventlisterner.

To fix the code, we had to remove the dependecies and then relocate the code. To do that, it was required to make sure that the elements were all global variables. 

Next up is to clear the values as well. Simply by just changing their content value to ' '
Modifications are done as well. Use SetPopupContent("txt") to add value to the marker. You can also use bindPopup but that will hinder the opportunity to use the options to design the popup.

the inputType is a pretty tricky 2-line code event listener. All the input fields are located on the .form__row class. After that, use the closest and the toggle to change the input fields.

It is paramount that the concept of the change and the submit of the addEventListerner holds a lot of values. Also, mentioned toogle and the closest can save a lot of time and lines of code.