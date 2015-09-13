(function(){
    angular.module('factories',[])
        // define simple multipliers factory used by timer function
        .factory('factory', make);

            function make(){

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
            var newStopwatchVals = {
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            }
            var lapTimeObject = {
                "hours": 0,
                "minutes": 0,
                "seconds": 0
            }
            factory.awayFromTimer = false;
            factory.stopclone = false;
            factory.multipliers = function () {
                return multipliers;
            }
            factory.pomoCLockValues = function () {
                return newClockPomoVals;
            }
            // values for new stopwatch from scratch
            factory.newStopwatchVals = function () {
                return newStopwatchVals;
            }
            // new values for starting lap time
            factory.newLapTimes = function () {
                return lapTimeObject;
            }
            // animation for stopwatch
            // after ( total animation duration ) milliseconds clone purple and blue to start second time
            factory.cloneBoth = function () {
                factory.clone( 'ball-container-l' );
                factory.clone( 'ball-container-r' );
                // continue the loop every 2.8 seconds
                factory.totalTimeout = window.setTimeout(factory.cloneBoth, 2000);
            }
            factory.clone = function ( id ) {
                var item = document.getElementById( id );
                var newone = item.cloneNode(true);
                item.parentNode.replaceChild(newone, item);
            }
            factory.startAnimation = function () {
                $('#ball-container-l').addClass('animated-left');
                $('#ball-container-r').addClass('animated-right');
                var newtonTimeout = window.setTimeout(factory.cloneBoth, 2000);
            }
            factory.bindEmphasis = function(){
                // animation for start button on initial load
                $("#app").bind("mouseenter", function(){
                    var s = $("#start-text");
                    s.addClass("emphasize");
                    var id = window.setTimeout(function(){
                        s.removeClass("emphasize")
                    }, 4000);
                    factory.unBindEmphasis();
                });
            }
            factory.unBindEmphasis = function(){
                $("#app").unbind("mouseenter");
            }
            factory.switchCount = 0;
            return factory;
        };

})()
