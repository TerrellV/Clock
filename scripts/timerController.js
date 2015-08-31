(function(){
    angular.module('myApp')
    .controller('mainController', timer);

    function timer($scope,factory){

        // Sets class of normal button to active / orange and pomo button to clear with border
        $scope.isActive = true;
        // list of tasks for ng-repeat
        $scope.taskList = [];
        $scope.given = {
            "hours": false,
            "minutes": false,
            "seconds": false
        }

        var paused = false;
        var enteredProps;

        var multipliers = factory.multipliers(); //from factory factory

        var notif = document.getElementById("chime");
        notif.load();// load sound.

        var hasBeenReset = false; // detect if app has been reset

        // ON CLICK OF START determine which to show
        $scope.start = function() {
          // if user is using traditional clock
          if ( $scope.isActive !== false ) {
            if ( $scope.time === undefined ) {
                alert("Please specify a time for your timer");
            } else {

                var props = ["hours","minutes","seconds"];
                var testOne = [];

                props.map(function(prop) {
                    var value = $scope.time[prop];
                    if (value === null || value === 0 || value === undefined) {
                        testOne.push(value);
                    };
                });
                if (testOne.length === 3) {alert('Please Specify a Time');}
                else {

                    // init values
                    paused = false;
                    hasBeenReset = false;
                    // reset what values to show
                    $scope.given.hours = false;
                    $scope.given.minutes = false;
                    $scope.given.seconds = false;
                    $scope.startLoad = 'startLoad';
                    $scope.dontShowClockOptions = true;
                    $scope.hideStart = true;
                    $scope.showInput = true;
                    $scope.running = true;
                    $scope.showTime = true;
                    $scope.showRunningScreen();
                    // animation for secdons hand
                    $("#clock-hand-sec").css("animation-play-state", "running");

                    $scope.startTime( $scope.time );

                }
              }
          } else {
              // if pomo is selected ignore checking from above and just start
              $scope.given.seconds = false; // for ng-hide. Show seconds
              $scope.hideStart = true;
              $scope.hideTaskInput = true;
              $scope.dontShowClockOptions = true;
              $scope.showPomoScreen();
              $scope.startTime( factory.pomoCLockValues() );
            }
        }

        // ON CLICK OF STOP BUTTON
        $scope.pauseApp = function() {
            paused = true;
            $scope.paused = true;
            $scope.playPauseAnimation = {
                "animation-play-state": "paused"
            }
            $("#clock-hand-min").css("animation-play-state", "paused");
            $scope.bigHandS = {
                "height": "60px",
                "width": "6px",
                "bottom": "95px",
                "transform-origin": "center 57px"
            }

            $("#btn-resume").attr('disabled','disabled');
            function delayResumeButton () {
                document.getElementById('btn-resume').removeAttribute('disabled');
            }
            var delayResumeButtonID = window.setTimeout(delayResumeButton, 750);
        }
        // ON CLICK OF RESUME BUTTON
        $scope.resume = function() {

            $scope.bigHandS = {
                "height": "60px",
                "width": "6px",
                "bottom": "95px",
                "transform-origin": "center 57px",
                "animation": "clockHandSpin 1s linear 100ms infinite both"
            }

            // build new object here to pass into timer function again with past values
            $scope.pausedValues = {
                'hours': $scope.displayHours,
                'minutes': $scope.displayMinutes,
                'seconds': $scope.displaySeconds
            }

            $scope.paused = false;
            paused = false;
            $scope.startTime( $scope.pausedValues );
            function delayResume () {
                $("#loading-inner").css("animation-play-state", "running");
                $("#clock-hand-min").css("animation-play-state", "running");
            }
            var delayResumeID = setTimeout(delayResume, 400);
        }
        $scope.reset = function() {
            if( $scope.isActive === false ) { // if user is using pomo clock
                $scope.playPauseAnimation = false;
                $scope.clockContainer = false;
                $scope.moveTimeContainer = {
                    "top": "270px"
                }
                $scope.moveTasksDown = false;
                $scope.displayMinutes = 25;
                $scope.taskList = [];
                $scope.taskInput = undefined;
                $scope.showTasks = true;
                $scope.showTime = true;
                $scope.showInput = true;
                $scope.given.hours = true;
                $scope.given.seconds = true;
            } else {
                $scope.paused = false;
                $scope.clockContainer = false;
                $scope.running = false;
                $scope.startLoad = false;
                $scope.playPauseAnimation = false;
                $scope.displayHours = 0;
                $scope.displayMinutes = 0;
                $scope.displaySeconds = 0;
                $scope.showInput = false;
                $scope.showTime = false;
                $scope.time.totalMs = 0;
                // clear all values
            }
            if ( paused === false ) {
                paused = true;
            }
            $scope.bigClock = false;
            $scope.bigHandM = false;
            $scope.dontShowClockOptions = false;
            $scope.hideStart = false;
            $scope.bigHandS = false;
            hasBeenReset = true;
        }
        // DEFINE : begin timmer
        $scope.startTime = function( timeValues ) {

            enteredProps = Object.getOwnPropertyNames( timeValues );
            var filteredProps = enteredProps.filter(function(prop) {
                return timeValues[prop] !== 0;
            });

            timeValues.totalMs = 0;

            filteredProps.map(function(prop) {
                timeValues.totalMs += (timeValues[prop] * multipliers[prop]);
            });


            $scope.displayHours = timeValues.hours || 0;
            $scope.displayMinutes = timeValues.minutes || 0;
            $scope.displaySeconds = timeValues.seconds || 0;

            if($scope.displayHours === 0 ) {
                $scope.given.hours = true;
            }
            // if hours and minutes === 0 only show seconds
            if( $scope.displayHours === 0 && $scope.displayMinutes === 0 ) {
                $scope.given.hours = true;
                $scope.given.minutes = true;
            }

            function onEachSecondDo() {

                if ( paused ) {
                    return 'done'
                }

                if ($scope.displayHours === 0 && $scope.displayMinutes ===0 && $scope.displaySeconds === 0) {
                    $(".clock-hand").css("animation-play-state", "paused");
                    finished = false;
                    if ( hasBeenReset === false ){ chime(); } // plaly sound
                    return '';
                }
                if ($scope.displayMinutes === 0 && $scope.displaySeconds === 0) {
                    $scope.displayMinutes = 60;
                    $scope.displayHours--;
                }

                if( $scope.displayHours === 0 ) {
                    $scope.given.hours = true;
                }

                if ($scope.displaySeconds === 0) {
                    $scope.displaySeconds = 60;
                    $scope.displayMinutes--;
                }
                $scope.displaySeconds--;
                $scope.$apply();
                ticker();
            }

            function ticker() {
                if (factory.awayFromTimer === true) {
                    console.log('whoops... resetting timer cause you changed screens');
                    $scope.reset();
                }
                var timeoutID = window.setTimeout(onEachSecondDo, [1000]);
            }

            ticker();

            if ( $scope.showTasks !== true ) {
                // give loading bar an animation duration
                $("#loading-inner").css("animation-duration", timeValues.totalMs +'ms');
            }
        }

        // DEFINE show stuff when traditional is clicked and timer is started. Adding css
        $scope.showRunningScreen = function(){
            // angular styles.
            $scope.clockContainer = {
                "top": "190px"
            };
            // adding a class of big clock
            $scope.bigClock = 'bigClocks';
            $scope.bigHandM = {
                "height": "60px",
                "width": "6px",
                "bottom": "95px",
                "transform-origin": "center 57px",
                "animation": "clockHandSpin 60s linear 100ms infinite both"
            };
            $scope.bigHandS = {
                "height": "60px",
                "width": "6px",
                "bottom": "95px",
                "transform-origin": "center 57px",
                "animation": "clockHandSpin 1s linear 50ms infinite both"
            };
        }
        // keypress event for enter on task input
        $scope.testKeyCode = function(taskInput){
            // event is a keyboard event object with various properties and values
            if ( event.keyCode=== 13) { // if user clicks enter update Task
                $scope.updateTasks( taskInput );
            }
        }
        $scope.updateTasks = function ( taskInput ) {
            if ( $scope.taskList.length >= 3) {
                $scope.taskInput = undefined;
                console.log('ERROR use only three tasks');
                alert('Lets just stick to three tasks for now');
            } else if ( taskInput !== undefined ) {
                $scope.taskList.push({'text': taskInput});
                $scope.taskInput = undefined;
            }  else {alert('Your task was Blank')}

        }
        $scope.delete = function ( index ) {
            $scope.taskList.splice( index, 1);
        }

        // functions for pomodoro clock specificically
        $scope.clockShow = function ( type ) {
            $scope.taskTitle = 'Add a Task Below';
            if ( type === 'pomodoro' ){
                $scope.clockContainer = {
                    "top": "130px"
                };
                $scope.moveTimeContainer = {
                    "top": "270px"
                }
                $scope.showTasks = true;
                $scope.showTime = true;
                $scope.showInput = true;
                $scope.given.hours = true;
                $scope.displayMinutes = 25;
                $scope.given.seconds = true;
                $scope.isActive = false;
            } else {
                $scope.showTasks = false;
                $scope.showInput = false;
                $scope.showTime = false;
                $scope.clockContainer = {
                    "top": "150px"
                };
                $scope.moveTimeContainer = {
                    "top": "475px"
                }
                $scope.isActive = true;
                $scope.traditional = true;
            }
        }

        // function to initiate actions when pomo timer is clicked
        // starts thigns like the clock animations, makes clocks larger, move things down
        $scope.showPomoScreen = function(){
            $scope.taskTitle = 'To-do List';
            $scope.bigClock = 'bigClocks';
            $scope.clockContainer = {
                "top": "150px"
            };
            $scope.moveTimeContainer = {
                "top": "370px"
            }
            $scope.bigHandM = {
                "height": "60px",
                "width": "6px",
                "bottom": "95px",
                "transform-origin": "center 57px",
                "animation": "clockHandSpin 60s linear 100ms infinite both"
            };
            $scope.bigHandS = {
                "height": "60px",
                "width": "6px",
                "bottom": "95px",
                "transform-origin": "center 57px",
                "animation": "clockHandSpin 1s linear 50ms infinite both"
            };
            $scope.moveTasksDown = {
                "bottom": "100px"
            }
        }
        // when timer hits zero .... this function should be called to make sound
        function chime () {
            notif.play();
        }
    };

})()
