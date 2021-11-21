## Introduction

This is a very short and a simple program created in pure JavaScript. I simply created it as a content for my twitter content. 

This program uses the Intl.DateTimeFormat module which you can find in the [MDN Docs here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

Additional Info by [FreeCodeCamp here](https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/)

## How does it work?

The script uses a setTimeOut function of JavaScript to create a new variable called "now" every 1 second. This variable is like a complete custer of all the date and timeline information. Most of them are irrevelent but if you try to inspect it, you will get a result like this - 

*assuming that you are typing in your inspection browser mode*
```
> const now = new Date()
< undefined
> console.log(now)
< Sun Nov 21 2021 14:09:00 "your timezone" ("your national standard time")
``` 

The script changes the value of the class everytime it is called. And the cycle repeats itself again and again.

### Preview it live [here](https://htmlpreview.github.io/?https://github.com/Code-Blender-7/Learning-JavaScript/blob/main/Clock%20made%20in%20JavaScript/index.html)

Script done by - [Black_2_white](https://twitter.com/Black_2_white)