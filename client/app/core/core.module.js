(function(){
'use strict';

angular.module('hiraApp.core', [

	// Angular dependencies
	'ngCookies',
	'ngResource',
	'ngSanitize',

	// hiraApp blocks maid by us
	'blocks.stateManager',

	// 3rd party dependencies
	'btford.socket-io',
	'ui.router',
	'ngAnimate',
	'resizeHandler',
	'stateChangeHandler',
	'scroll-animate-directive',
	'animateStateChange',
	'duScroll'
]);

})();