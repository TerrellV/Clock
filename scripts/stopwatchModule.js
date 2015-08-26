(function() {
    var app = angular.module('stopwatch', ['factories'])
        .controller('stopwatchController', function($scope, factory) {

            $scope.lapTimes = [
                {
                    "number" : "01",
                    "laptime" : "22s",
                    "totalTimeText" : "24m 42s"
                },
            ];

            $scope.startAnimation = factory.startAnimation;
            // remove class to stop animation and use factory to start it again
            var paused = false;

            $scope.hours = "0";
            $scope.minutes = "0";
            $scope.seconds = "0";
            $scope.showHours = true;
            $scope.showMinutes = true;
            $scope.showSeconds = true;

            /* add tracking ability of below items */
            var prevTime;

            $scope.addLapTime = function() {
                var totalTimeText,
                    lapTime;
                var lapNumber = $scope.lapTimes.length + 1;

                if (lapNumber < 10 ) {
                    lapNumber  = "0" + lapNumber;
                }
                if ( $scope.minutes === 0 && $scope.hours === 0) {
                    totalTimeText = $scope.seconds + "s";
                }
                if ( $scope.minutes !== 0 ) {
                    totalTimeText = $scope.minutes + "m " + $scope.seconds + "s " ;
                }
                if ( $scope.hours !== 0 ) {
                    totalTimeText =  $scope.hours + "h " + $scope.minutes + "m " + $scope.seconds + "s " ;
                }

                // keep track of laptime by subtrackting date objects

                var lapTime = $scope.seconds - prevTime;

                $scope.lapTimes.push( {"number": lapNumber, "laptime":lapTime, "totalTimeText": totalTimeText} );
                prevTime = $scope.seconds;
            }
            $scope.start = function() {
                $scope.startTime( factory.newStopwatchVals() );
                factory.startAnimation();

                $scope.hidePause = false;
                $scope.hideStart = true;
                $scope.showResume = false;

                var id = window.setTimeout(enablePause, 2000);
                function enablePause () {
                    document.getElementById('btn-pause').removeAttribute('disabled')
                }
            }
            $scope.pause = function() {
                document.getElementById('btn-resume').setAttribute("disabled","disabled");
                paused = true;

                // remove classes of animated balls
                $('#ball-container-l').removeClass('animated-left');
                $('#ball-container-r').removeClass('animated-right');

                $scope.showResume = true;
                window.clearTimeout( factory.totalTimeout );
                var id = window.setTimeout(enableResume, 1000);
                function enableResume () {
                    document.getElementById('btn-resume').removeAttribute('disabled')
                }
            }
            $scope.resume = function() {
                paused = false;

                // initiate animation
                factory.startAnimation();

                $scope.hidePause = false;
                $scope.showResume = false;
                // create new object to pass in with previous values
                var preValues = {
                    "hours": $scope.hours,
                    "minutes": $scope.minutes,
                    "seconds": $scope.seconds
                }
                $scope.startTime( preValues );

            }
            $scope.reset = function() {
                if ( paused === false ) {
                    $scope.pause();
                } else {

                }
                $scope.hours =  0;
                $scope.minutes = 0;
                $scope.seconds = 0;
                $scope.hideStart = false;
                // clear lap times array;
            }
            $scope.startTime = function( given ) {

                paused = false;

                $scope.hours =  given.hours;
                $scope.minutes = given.minutes;
                $scope.seconds = given.seconds;

                // if timer is just starting out
                $scope.showHours = false;
                $scope.showMinutes = false;
                $scope.showSeconds = true;


                function onEachSecondDo(  ) {

                    if ( paused ) {
                        return 'done'
                    }

                    if ($scope.seconds === 59 && $scope.minutes !== 59 ) {
                        $scope.seconds = 0;
                        $scope.minutes++;
                        $scope.showMinutes = true;
                    }

                    if ( $scope.seconds === 59 && $scope.minutes === 59 ) {
                        $scope.minutes = 0;
                        $scope.seconds = 0;
                        $scope.hours++;
                        $scope.showMinutes = true;
                    }

                    $scope.seconds++;
                    $scope.$apply();
                    ticker();

                    console.log( $scope.seconds );
                }

                function ticker() {
                    var timeoutID = window.setTimeout(onEachSecondDo, [1000]);
                }

                ticker();

            }
        });
})()
