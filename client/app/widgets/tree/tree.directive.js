(function() {
	'use strict';

	angular
		.module('hiraApp')
		.directive('treeWidget', treeWidget);

	treeWidget.$inject = ['common'];

	function treeWidget(common) {
		var directive = { 
			restrict: 'E',
			scope: {
				nodes : '='
			},
			controller:controller,
			controllerAs: 'vm',
			templateUrl: 'app/widgets/tree/tree.html'
		};

		return directive;

		function link(scope, element, attrs) { 

		}

		function controller($scope,$timeout){
			var vm = this;

			$timeout(function(){
				vm.nodes = $scope.nodes;
			},0);
		}
	}
})();