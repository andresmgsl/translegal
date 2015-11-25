(function() {
	'use strict';

	angular
		.module('hiraApp.footer')
		.animation('.writingEffect', writingEffect);

		writingEffect.$inject = ['$animate','$animateCss'];

		function writingEffect($animate, $animateCss) {
			var animation = {
				enter : enter,
				leave : leave
			}

			return animation

			function enter(element,done) {
				done();
			} 

			function leave(element,done) {
				done();
			} 

		}

})();

