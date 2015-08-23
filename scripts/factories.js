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
            return factory;
        })


})()
