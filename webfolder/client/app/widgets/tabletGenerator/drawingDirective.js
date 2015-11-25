(function() {
	'use strict';

	angular
		.module('hiraApp.widgets')
		.directive('tabletDraw', tabletDraw);

	tabletDraw.$inject = ['common'];

	function tabletDraw(common) {
		var directive = { 
			link: link,
			restrict: "E",
			templateUrl: "app/widgets/tabletGenerator/design.html",
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

