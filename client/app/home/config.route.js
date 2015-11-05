(function () {
    'use strict';

    angular
        .module('hiraApp.home')
        .run(stateConfig);

    stateConfig.$inject = ['statehelper'];
    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
            	name: 'home',
                config: {
                	url: '/',    
	                templateUrl: 'app/home/home.html',
	                controller: 'Home',
	                controllerAs: 'vm',
                    resolve: {
                        language: ['Geolocation', function(Geolocation){
                            //console.log(Geolocation.getLanguage());
                            return Geolocation.getLanguage();
                        }]
                    }
                }

            }
        ];
    }
})();
