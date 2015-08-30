(function() {
    angular.module('myApp')
        .controller('stopwatchController', function($scope, factory) {

            // for ng repeat list of lap times
            $scope.lapTimes = [];

            $scope.prevValue = {
                "hours" : 0,
                "minutes" :0 ,
                "seconds" : 0
            };

            $scope.startAnimation = factory.startAnimation;

            disableLapButton();

            var paused = false;

            $scope.hours = "0";
            $scope.minutes = "0";
            $scope.seconds = "0";
            $scope.showHours = true;
            $scope.showMinutes = true;
            $scope.showSeconds = true;

            $scope.addLapTime = function() {
              var totalTimeText;
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

              // keep track of laptime by subtrackting previous time from current
              // freez and store the time when pushed

              var lapTime = {
                      "hours" : $scope.hours - $scope.prevValue.hours,
                      "minutes" : $scope.minutes - $scope.prevValue.minutes,
                      "seconds" : $scope.seconds - $scope.prevValue.seconds
              };

              var letters = ['h','m','s'];
              var props = Object.getOwnPropertyNames(lapTime);
              var totalLapTime = '';

              props.map( function( prop, index ) {
                  if ( lapTime[ prop ]!== 0 ) {
                      totalLapTime += (lapTime[ prop ] + letters[ index ] + " ").toString();
                  }
              })

              $scope.lapTimes.push( {"number": lapNumber, "laptime":totalLapTime, "totalTimeText": totalTimeText} );

              if ( $scope.lapTimes.length >= 4  ) {
                disableLapButton();
              }

              $scope.prevValue = {
                  "hours" : $scope.hours,
                  "minutes" : $scope.minutes,
                  "seconds" : $scope.seconds
              };


            }
            // disable the laptime button
            function disableLapButton () {
              $("#btn-lap").attr('disabled','disabled');
              // remove clas
              $scope.btnLapClass = "btn-lap-disabled"
            }
            // enable laptime button
            function enableLapButton () {
              $("#btn-lap").removeAttr('disabled');
              // change class
              $scope.btnLapClass = "btn-lap-active";
            }
            $scope.start = function() {
                $scope.startTime( factory.newStopwatchVals() );
                factory.startAnimation();

                $scope.hidePause = false;
                $scope.hideStart = true;
                $scope.showResume = false;
                enableLapButton();
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

                disableLapButton();
                $scope.showResume = true;
                window.clearTimeout( factory.totalTimeout );
                var id = window.setTimeout(enableResume, 1000);
                function enableResume () {
                    document.getElementById('btn-resume').removeAttribute('disabled')
                }
            }
            $scope.resume = function() {
                paused = false;
                enableLapButton();
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
                }
                $scope.prevValue = {
                    "hours": 0,
                    "minutes": 0,
                    "seconds": 0
                }
                $scope.lapTimes = [];
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

                }

                function ticker() {
                    var timeoutID = window.setTimeout(onEachSecondDo, [1000]);
                }

                ticker();

            }
        });
})()
