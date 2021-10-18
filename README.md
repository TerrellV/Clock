#Clock

### View a [live Demo](https://terrellv.github.io/Clock/#/stopwatch).

## Description

This project was inspired by the [Pomodoro Clock Project](http://www.freecodecamp.com/challenges/zipline-build-a-pomodoro-clock), introduced by FreeCodeCamp. The original goal was to simply reverse engineer their example. After watching numerous people produce very similar apps, I decided I'd do something slightly different. 

## Functionality + User Stories
 * User may set their own custom timer
 * Timer sounds when timer runs out and animations reset
 * User may switch to the Pomodoro Version of the timer in which it is automatically set to 25 minutes. This version of the timer also allows the user to add tasks that need to be completed before the 25 minutes is up.
 * User may switch over to the stopwatch tab where they can not only track elapsed time, but also the elapsed time in relation to a previous moment. In other words, I added a "lap" button that tracks the time since you last pressed it.
 * All clocks can be paused, resumed and reset.

##### View [Live Demo](http://mirprest.github.io/Clock/) hosted via Github Pages

## Animations
I'm a sucker for animation. In terms of User Experience, I know there are times when animation is complete overkill. However, I still wanted to "see what I could do" specifically during the stopwatch timer. View it [Here](http://mirprest.github.io/Clock/#/stopwatch) This animation was interesting because it needed to constantly be reinvoked (played over and over again), which isn't built it in to css. When I first thought about it, I hoped to simply define the animation in keyframes and then set the iteration count to infinite. I quickly learned things didn't work like I expected. Starting two animations, one after the other, won't allow you to simply use infinite for the animation-iteration-count property.
##### The two options I came across: 
1. Remove the class that has the animation defined, then after some delay (ex: 10 millisecond), add the class that defines the animation back on to the element.
2. Clone the elements when the animation is finished essentially re initiating the animations already defined via css.

If you are looking to do something similar, certainly **avoid the first method**. Removing a class and adding it back after a few milliseconds doesn't allways work as it should. Setting a longer delay helps, but ruins the animation.

#### To better explian the process, the "newton's cradle" animation went as followed:
1. Call animation for left and right ball at the same time. Each have an iteration count of one.
2. Second animation has a total delay equal to the duration of the first. In other words, when the first finishes, the second starts.
3. When both animations have completed, Clone and replace both elements. (Note: when cloning an element that has an animation attached to it via css, the element will animate as soon as it loads in the dom.)

In regards to other animations, I began using keyframes but later chose transitions as they better allow for the toggling of dom animation based on user input. In many cases I just added css directly to the elements or used classes to animate them with transition. In my next projects, I plan on better organizing the classes in css so I don't have to constantly add and remove css directly on an element.

## Feedback
 As this is my 3rd project, I am constantly looking to improve. I am open to and appreciate feedback. With that said, there are certain things, I have noted as "Will Improve Next Time" because the time spent refactoring the code may defeat the purpose. That is not to say I won't edit this project, its just something to consider. 
 
#### Thank You
If you read this far, Thank You for taking the time to view this project! It is very much appreciated. 

##### View [Live Demo](http://mirprest.github.io/Clock/) hosted via Github Pages
