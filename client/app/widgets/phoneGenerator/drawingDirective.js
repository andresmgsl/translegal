(function() {
	'use strict';

	angular
		.module('hiraApp.widgets')
		.directive('phoneDraw', phoneDraw);

	phoneDraw.$inject = ['common'];

	function phoneDraw(common) {
		var directive = { 
			link: link,
			restrict: "E",
			templateUrl: "app/widgets/phoneGenerator/design.html",
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

