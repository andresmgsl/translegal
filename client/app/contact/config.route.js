(function () {
    'use strict';

    angular
        .module('hiraApp.contact')
        .run(stateConfig);

    stateConfig.$inject = ['statehelper'];
    /* @ngInject */
    function stateConfig(statehelper) {
        statehelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
            	name: 'contact',
                config: {
                	url: '/contacto',    
	                templateUrl: 'app/contact/contact.html',
	                controller: 'Contact',
	                controllerAs: 'vm',
                    resolve: {
                        language: ['Geolocation', function(Geolocation){
                            return Geolocation.getLanguage();
                        }]
                    }
                }

            }
        ];
    }
})();
