

_To create a new function that will save the data of the user's story and their history in the local storage_


# START


According to the tutorial, the local storage is used to store *small* data. So that the user can view their data from the machine without downloading the data at the first place. This is quite helpful if you were to say.

3 modules are used for supporting the feature of saving, getting and removing the data of the user interaction with the website. They are as follows-

1. localStorage.setItem => Used for saving the data of the user interaction offline.
2. localStorage.getItem => Used for getting the data from the saved localStorage
3. localStorage.removeItem => Used for removing the data from the saved localStorage


There is a bit of a way to use them all indivitually. The first thing is that the localStorage.setItem is used by specifying a key and a value. the key is the name of the data while the value is the object of the data.

To save the data. do like this - 
```
localStorage.setItem('workouts', JSON.stringify(this.#workouts))
```

If you are wondering what the JSOn.stringify is about, well no idea. All i need to know is that it turns the data into something that the browser would understand.

To get the data, do like this -
```
const data = JSON.parse(localStorage.getItem('workouts'))
```

the json parse turns the data back to a sense where you can work with it.

to remove the data, do like this-
```
localStorage.removeItem('workouts')
```



Please note that the localStorage is used for the small based data savings. Otherwise, the UI is severely degraded in loading time. the data loading is async where the data is loaded first. Be sure to call the feature when the map is fully loaded.

