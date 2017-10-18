(function(){
    angular
        .module('myApp')
        .controller('tabController', tabController);

        function tabController(factory){
            var vm = this;

            this.switch = function( tab ) {
                factory.unBindEmphasis();
                factory.switchCount+= (factory.switchCount > 0)? 0: 1;
                if (tab === 'toStop') {
                    factory.awayFromTimer = true;
                    vm.tab = 2;
                } else {
                    factory.awayFromTimer = false;
                    vm.tab = 1;
                }
            }
        }
})()
