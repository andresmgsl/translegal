/*(function() {
	'use strict';

	angular
		.module('hiraApp.navbar')
		.animation('.navbar', navbar);

		navbar.$inject = ['$animate','$animateCss'];

		function navbar($animate, $animateCss) {
			var animation = {
				enter : enter,
				leave : leave
			}

			return animation

			function enter(element,done) {
				$animate.addClass(element,'animated');
				$animate.addClass(element,'slideInDown');
				done();
			} 

			function leave(element,done) {
				$animate.removeClass(element,'slideInDown');
				$animate.addClass(element,'animated');
				$animate.addClass(element,'slideOutUp');
				done();
			} 
		}

})();
*/