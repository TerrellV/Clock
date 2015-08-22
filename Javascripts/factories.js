(function(){
    var app = angular.module('factories',[])
        .factory('multipliers', function(){
            var factory = {};

            var multipliers = {
                "hours": 3600000,
                "minutes": 60000,
                "seconds": 1000
            }

            factory.values = function () {
                console.log('Multipliers factory was refferenced');
                return multipliers;
            }
            return factory;
        })

        .factory('alert', function(){
            var factory = {};

            factory.timesTwo = function( n ) {
                return n * 2;
            }

            return factory;
        });
})()
