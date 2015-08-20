var app = angular.module("myApp", []);

app.controller('timerController', function($scope) {

    var multipliers = {
        "hours": 3600000,
        "minutes": 60000,
        "seconds": 1000
    }

    $scope.given = {
        "hours": false,
        "minutes": false,
        "seconds": false
    }

    var paused = false;
    var timeouts = [];
    var enteredProps;

    // ON CLICK OF START BUTTON
    $scope.start = function() {
        $scope.hideStart = true;
        $scope.running = true;
        $scope.showRunningScreen();
        // $scope.updateTime($scope.time);
        $scope.startTime( $scope.time );
    }

    // ON CLICK OF STOP BUTTON
    $scope.pauseApp = function() {
        paused = true;
        $scope.paused = true;
        console.log($scope.displaySeconds,$scope.displayMinutes,$scope.displayHours);
        $("#loading-inner").css("animation-play-state", "paused");
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
        var delayResumeID = setTimeout(delayResume, 700);
    }

    // DEFINE : begin timmer
    $scope.startTime = function( timeValues ) {

        $("#clock-hand-sec").css("animation-play-state", "running");

        enteredProps = Object.getOwnPropertyNames($scope.time);
        var filteredProps = enteredProps.filter(function(prop) {
            return $scope.time[prop] !== 0;
        });
        $scope.time.totalMs = 0;

        filteredProps.map(function(prop) {
            $scope.time.totalMs += $scope.time[prop] * multipliers[prop];
        });

        $scope.displayHours = timeValues.hours || 0;
        $scope.displayMinutes = timeValues.minutes || 0;
        $scope.displaySeconds = timeValues.seconds || 0;

        if($scope.displayHours === 0 ) {
            $scope.given.hours = true;
            console.log('only show minutes and seconds',$scope.given.hours);
        }
        // if hours and minutes === 0 only show seconds
        if( $scope.displayHours === 0 && $scope.displayMinutes === 0 ) {
            console.log('only show seconds');
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
                console.log('only show seconds');
                $scope.given.hours = true;
            }

            if ($scope.displaySeconds === 0) {
                $scope.displaySeconds = 60;
                $scope.displayMinutes--;
            }
            $scope.displaySeconds--;
            $scope.$apply();
            console.log('h', $scope.displayHours, 'min', $scope.displayMinutes, 'sec', $scope.displaySeconds);
            ticker();

        }

        function ticker() {



            var timeoutID = window.setTimeout(onEachSecondDo, [1000]);
            timeouts.push(timeoutID);
        }

        ticker();

        // give loading bar an animation duration
        $("#loading-inner").css("animation-duration", $scope.time.totalMs +'ms');

    }

    // DEFINE on click of start - set css -
    $scope.showRunningScreen = function(){
        // angular styles.
        $scope.clockContainer = {
            "top": "130px"
        };
        $scope.bigClock = {
            "height": "200px",
            "width": "200px"
        };
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

});

// limit input of text to two characters and only numbers
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}

function isNumeric(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
