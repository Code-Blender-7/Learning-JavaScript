**GEOLOCATION API**


# START

The geolocation API is a normal API that uses worldwide map data to compile and create tilelayers of the globe.

To access the api, simply add this code.

```
navigator.geolocation.getCurrentPosition(Successfulfunction(), Errorfunction());
```

You can easily guess the meaning of the function that the API takes two arguments. The getCurrentPositon is used to get the current position of the user *assuming that the user had authorized to use the location*. The API's return function of *getCurrentPosition* returns the object consisting something like this~

```
coords: GeolocationCoordinates {latitude: ....., longitude: ......., altitude: null, accuracy: ....., altitudeAccuracy: null, …}
timestamp: ......
```
A couple of the features are only available for the mobile phones.
Using the API's feature of pinpointing the location is fairly easy. The API comes with additional features focused for software development. 

To understand this API, I will be making a couple of short programs inspired by this program.
