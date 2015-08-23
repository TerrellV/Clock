(function(){
    var app = angular.module('stopwatch',['factories'])
        .controller('stopwatchController', function($scope, factory){
            // console.log('controller setup');

        })
        .controller('newtonAnimation', function($scope){
            // console.log("animation has its own controller");

            function cloneBoth () {
                console.log('cloned');
                clone( 'ball-containerpurple' );
                clone( 'ball-containerblue' );
                // continue the loop every 4 seconds
                var totalTimeout = window.setTimeout(cloneBoth, 4000);
            }
            function clone ( id ) {
                var item = document.getElementById( id );
                var newone = item.cloneNode(true);
                item.parentNode.replaceChild(newone, item);
            }

            // after 4000 milliseconds clone purple and blue to start second time
            var newtonTimeout = window.setTimeout(cloneBoth, 4000);





        })
})()
