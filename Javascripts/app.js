var app = angular.module("myApp", [] );

app.controller('timerController', function($scope){

    $
        var totalMinutes = 1;//parseInt($('h1').html());
        var totalSeconds = totalMinutes * 60;
        var totalMilliseconds =  totalSeconds * 1000;
        $scope.s = 60 || $scope.enteredSeconds;
        $scope.m = parseInt(totalMinutes.toString().slice(0)) - 1; // minus one if seconds === 0 because they were not entered;
        var finished = false;

        var timeoutID = window.setTimeout(complete, [totalMilliseconds]);

        function tick(){
            if ( finished ) {
                $scope.s = "DONE!";
                return false;
            }
            if ( $scope.s === 0 ) {
                $scope.s = 60;
                $scope.m--;
            }
            $scope.s--;
            $scope.$apply();
            show();
        }

        function show () {
            var timeoutS = window.setTimeout(tick, [1000] );
        }

        // when master timer runs out
        function complete() {
            finished = true;
        }

    show();

});

var max_chars = 2;

$('#minutes').keydown( function(e){
    if ($(this).val().length >= 2) {
        $(this).val($(this).val().substr(0, max_chars+1));
    }
});

$('#minutes').keyup( function(e){
    if ($(this).val().length >= 2) {
        $(this).val($(this).val().substr(0, max_chars+1));
    }
});
