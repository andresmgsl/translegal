(function() {
	'use strict';

	angular
		.module('hiraApp.widgets')
		.directive('scrollWheelSpeed', scrollWheelSpeed);

	scrollWheelSpeed.$inject = ['common'];

	function scrollWheelSpeed(common) {
		var directive = { 
			link: link,
			restrict: 'A',
			scope : {
				condition : "="
			}
		};

		return directive;

		function link(scope, element, attrs) { 

		}
	}
})();