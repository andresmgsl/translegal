(function() {
	'use strict';

	angular
		.module('animateStateChange')
		.directive('irbEnterAnimation', irbAref);

	irbAref.$inject = ['common','$animate','animateStateChange'];

	function irbAref(common,$animate,animateStateChange) {
		var directive = { 
			link: link,
			restrict: 'A',
			scope:{
				animation: '@irbEnterAnimation'
			}
		};

		return directive;

		function link(scope, element, attrs) { 
			var child = angular.element(element[0].childNodes[0]);
			animateStateChange.setMainElement(child);

			if (child.length > 0) {
				$animate.addClass(child,"animated");
				$animate.addClass(child,scope.animation);
			}

		}

	}
})();