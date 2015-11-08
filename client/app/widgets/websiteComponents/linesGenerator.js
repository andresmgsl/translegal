(function() {
  'use strict';

  angular
    .module('hiraApp.widgets')
    .directive('lineGenerator', lineGenerator);

  lineGenerator.$inject = ['common'];

  function lineGenerator(common) {
    var directive = { 
      link: link,
      restrict: "A",
      scope: {
      }
    };

    return directive;

    function link(scope, element) {
      var numberOfLines = Math.round(Math.floor(element[0].offsetHeight / 7.2) / 2);

      for (var i=0; i<numberOfLines; i++) {
        var line = angular.element('<div class="line ' + String(i) + '"></div>')
        element.append(line);
      }

    }
  }
})();

