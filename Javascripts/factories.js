(function(){
    var app = angular.module('factories',[])
        // define simple multipliers factory used by timer function
        .factory('factory', function(){
            // OBJECT to work off of
            var factory = {};

            var multipliers = {
                "hours": 3600000,
                "minutes": 60000,
                "seconds": 1000
            }

            var newClockPomoVals = {
                "hours": 0,
                "minutes": 25,
                "seconds": 0
            }

            factory.multipliers = function () {
                console.log('Multipliers content was refferenced');
                return multipliers;
            }
            factory.pomoCLockValues = function () {
                console.log('new pomo clock values were set using factory info');
                return newClockPomoVals;
            }
            factory.testTimer = function( timeValues ) {

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
                    console.log(timeValues.totalMs);
                    // give loading bar an animation duration
                    $("#loading-inner").css("animation-duration", timeValues.totalMs +'ms');
                }
            }
            return factory;
        })


})()
