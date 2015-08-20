$scope.startTime = function( timeValues ) {

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
    $scope.displaySeconds = timeValues.seconds - 1 || 0;

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
