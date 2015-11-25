(function() {
	'use strict';

	angular
		.module('hiraApp.widgets')
		.directive('desktopDraw', desktopDraw);

	desktopDraw.$inject = ['common'];

	function desktopDraw(common) {
		var directive = { 
			link: link,
			restrict: "E",
			templateUrl: "app/widgets/desktopGenerator/design.html",
			controller: 'Desktop',
			controllerAs: 'vm',
			scope: {
				linkWithWebsite : "=",
				url: "@",
				screenName: "@"
			}
		};

		return directive;

		function link(scope, element) { 

		}
	}
})();

