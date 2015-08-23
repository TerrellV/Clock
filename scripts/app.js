var app = angular.module("myApp", ['factories','ngRoute','stopwatch']);

app.config(function($routeProvider){
    // set up routes
    // fix routes so that they work with gihub pages
    $routeProvider
        .when('/', {
            templateUrl: 'partial/timer.html', controller:'mainController'
        })
        .when('/stopwatch', {
            templateUrl: 'partial/stopwatch.html', controller:'stopwatchController'
        })
})


app.controller('mainController', function($scope, factory ) {

    // load in hardcoded values from factory
    var multipliers = factory.multipliers();

    $scope.given = {
        "hours": false,
        "minutes": false,
        "seconds": false
    }

    var paused = false;
    var enteredProps;

    // Sets class of normal button to active / orange and pomo button to clear with border
    $scope.isActive = true;
    // ON CLICK OF START determine which to show
    $scope.start = function() {

        // init value
        paused = false;

        // if pomo is clicked
        if ( $scope.isActive === false ){
            $scope.given.seconds = false; // for ng-hide. Show seconds
            $scope.hideStart = true;
            $scope.hideTaskInput = true;
            $scope.dontShowClockOptions = true;
            $scope.showPomoScreen();
            // initiate start with static time values for 25 minutes

            // used factory values for new time
            // var newTime = ;

            $scope.startTime( factory.pomoCLockValues() );
        } else {
            // reset what values to show
            $scope.given.hours = false;
            $scope.given.minutes = false;
            $scope.given.seconds = false;
            console.log('run normal');
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
        if( $scope.isActive === false ) {
            console.log('pomo clock');
        } else {
            console.log('traditional clock');
            $scope.showInput = false;
            $scope.paused = false;
            $scope.showTime = false;
            $scope.dontShowClockOptions = false;
            $scope.bigClock = false;
            $scope.clockContainer = false;
            $scope.bigHandM = false;
            $scope.running = false;
            $scope.startLoad = false;
            $scope.hideStart = false;
            $scope.playPauseAnimation = false;
            // clear all values
            $scope.displayHours = 0;
            $scope.displayMinutes = 0;
            $scope.displaySeconds = 0;
            $scope.time.totalMs = 0;
            $scope.bigHandS = false;
            if ( paused === false ) {
                paused = true;
            }
        }
    }
    // DEFINE : begin timmer
    $scope.startTime = function( timeValues ) {

        console.log(timeValues);

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

    // functions and content specific for task list functionality
    $scope.taskList = [];

    $scope.updateTasks = function ( taskInput ) {
        console.log(taskInput);
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
            console.log('where I want to be');

            traditionalScreen();
            function traditionalScreen() {
                $scope.showTasks = false;
                $scope.showInput = false;
                $scope.showTime = false;
                $scope.clockContainer = {
                    "top": "150px"
                };
                $scope.moveTimeContainer = {
                    "top": "475px"
                }
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
});
