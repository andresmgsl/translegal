(function() {
  'use strict';

  angular
    .module('hiraApp.widgets')
    .directive('progresiveBar', progresiveBarGenerator);

  progresiveBarGenerator.$inject = ['common'];

  function progresiveBarGenerator(common) {
    var directive = { 
      link: link,
      restrict: "EA",
      templateUrl: "app/widgets/progresiveBarGenerator/progresiveBarGenerator.html",
      scope: {
        fill : "="
      }
    };

    return directive;

    function link(scope, element) {
      var elem = angular.element(element[0].children[0].children[0]);

      elem.css({
        'width' : scope.fill + '%'
      });      
    }
  }
})();

