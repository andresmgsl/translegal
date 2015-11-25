(function() {
	'use strict';

	angular
		.module('resizeHandler')
		.directive('fullHeight', fullHeight);

	fullHeight.$inject = ['common','resizeHandler'];

	function fullHeight(common,resizeHandler) {
		var directive = { 
			link: link,
			restrict: 'A',
			scope: {
				disable : '='
			}
		};

		return directive;

		function link(scope, element, attrs) { 
			var win = common.$window;

			setHeights(element,win.innerHeight);

			// Service call
			resizeHandler.sizeDevice(callBackResize);
			
			function callBackResize(res) {
				setHeights(element,win.innerHeight);
			}

			function setHeights(elem,height) {
				if (!scope.disable) {
					elem.css({
						'height' : height + 'px'
					});
				} else {
					elem.removeAttr("style");
				}

				elem.addClass('boxFadeEnter');

			}

		}
	}
})();