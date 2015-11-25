(function () {
    'use strict';

    angular
        .module('hiraApp')
        .factory('Geolocation', Geolocation);

    Geolocation.$inject = ["$http"];

    /* @ngInject */
    function Geolocation($http) {
        //var throttles = {};

        var service = {
            // common angular dependencies
          	getLanguage: getLanguage
        };

        return service;

        function getLanguage(){
    	    return $http.get("http://ipinfo.io").then(function (response) {
	          var geo = response.data;

	          if ((geo.country === 'ES') || (geo.country === 'CO') || 
                 (geo.country === 'AR') || (geo.country === 'PE') || 
                 (geo.country === 'VE') || (geo.country === 'CL') || 
                 (geo.country === 'EC') || (geo.country === 'UY')) {
	            return "ES";
	          }
	          else {
	            return "EN";
	          };
	      });
        }
    }
})();