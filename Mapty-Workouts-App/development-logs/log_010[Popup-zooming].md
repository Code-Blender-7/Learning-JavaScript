# START

The goal of this feature is simple. To zoom into the marker if it was clicked on the form popup.

The way it works is simple. a new function is created for moving the view to the form's coordinates. That means that we need to get the form data, get the coordinates and then find a way to relocate the view there.


For this to work, the first thing that had to be done is that we need the closest workout popup to the parent element called workout. Afterwards, we need to find the workout that matches the workout cloest form we had found earlier. Then we will use the leaflet's setView to configure the zoomlevel and the cooridnates.

After some modifications to the App workout, the code is done and the feature is implemented.

However, the tutorial is quite messy. I think that is just me. I will be conducting a new review on this feature and try to modify to my understanding. Expect an update to the log if that occurs.