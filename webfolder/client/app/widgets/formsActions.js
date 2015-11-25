(function() {
	'use strict';

	angular
		.module('hiraApp.widgets')
		.directive('formsActions', formsActions);

	formsActions.$inject = ['common'];

	function formsActions(common) {
		var directive = { 
			link: link,
			restrict: 'A',
			scope : {
				condition : "="
			}
		};

		return directive;

		function link(scope, element, attrs) { 
			var structFormButton = angular.element('.structButtom'); 
			var turnOnButtom = angular.element('.turnOnButtom');			

			scope.condition = false;
			structFormButton.click(openStructForm);

			function changeText(condition) {
				if (condition) {
					turnOnButtom.removeAttr('ng-click');
					turnOnButtom.attr('ng-click','vm.update()');
					
					turnOnButtom.html('<p>Prendela</p>');
					structFormButton.html('<p>Volver</p>');
				} else {
					turnOnButtom.removeAttr('ng-click');
					turnOnButtom.attr('ng-click','vm.createTasks()');
					
					turnOnButtom.html('<p>Prendela</p>');
					structFormButton.html('<p>Estructura</p>');
				}

			}

			function openStructForm() {
				scope.condition = !scope.condition;
				scope.$apply();

				changeText(scope.condition);
			}

		}
	}
})();