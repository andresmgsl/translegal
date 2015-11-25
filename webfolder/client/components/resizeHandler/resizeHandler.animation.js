(function() {
	'use strict';

	angular
		.module('resizeHandler')
		.animation('.boxFadeEnter', boxFadeEnter);

		boxFadeEnter.$inject = ['$animate','$animateCss'];

		function boxFadeEnter($animate, $animateCss) {
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


/*'use strict';

angular.module('hiraApp.home').animation('.fold-animation', ['$animate', function($animate) {
  return {
    enter: function(element, doneFn) {
    	$animate.addClass(element,'red');
    	doneFn()
    }
  }
}]);*/