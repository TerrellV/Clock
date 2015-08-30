(function(){
    angular.module("myApp", ['factories','ngRoute'])

        .config(function($routeProvider){
            // set up routes
            // fix routes so that they work with gihub pages
            $routeProvider
                .when('/', {
                    templateUrl: 'partial/timer.html', controller:'mainController'
                })
                .when('/stopwatch', {
                    templateUrl: 'partial/stopwatch.html', controller:'stopwatchController'
                })
        });
})()
