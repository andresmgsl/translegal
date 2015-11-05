(function() {
	'use strict';

	angular
		.module('animateStateChange')
		.directive('irbAref', irbAref);

	irbAref.$inject = ['common','$animate','animateStateChange'];

	function irbAref(common,$animate,animateStateChange) {
		var directive = { 
			link: link,
			restrict: 'A',
			scope: {
				state: '@irbAref',
				leaveAnimation: '@',
				duration : "@"
			}
		};

		return directive;

		function link(scope, element, attrs) { 
				element.on('click',function(){
					if (common.$rootScope.currentState == scope.state) return "sameState";
					var parentContainer = animateStateChange.getMainElement();
					var leave = scope.leaveAnimation == undefined ? "fadeOut" : scope.leaveAnimation;
					var time = scope.duration == undefined ? 700 : Number(scope.duration);

					/* REFACTORIZAR LUEGO  */
					parentContainer.addClass(leave);
					$('.footer').addClass('fadeOut');
					common.$timeout(function(){
						common.$state.go(scope.state);
							common.$timeout(function(){
								$('.footer').removeClass('fadeOut');
							},600);						
					},time)

				})
		}

	}
})();