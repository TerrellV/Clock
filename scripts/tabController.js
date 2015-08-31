(function(){
    angular
        .module('myApp')
        .controller('tabController', tabController);

        function tabController(factory){
            var vm = this;

            this.switch = function( tab ) {
                if (tab === 'toPomo') {
                    factory.awayFromTimer = true;
                    vm.tab = 2;
                } else {
                    factory.awayFromTimer = false;
                    vm.tab = 1;
                }
                console.log( tab );
            }
        }
})()
