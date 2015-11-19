(function() {
  'use strict';

  angular
    .module('hiraApp.widgets')
    .directive('hamburguer', logo);

  logo.$inject = ['common'];

  function logo(common) {
    var directive = { 
      link: link,
      restrict: "E",
      templateUrl: "app/widgets/websiteComponents/hamburguer.html",
      scope: {
      }
    };

    return directive;

    function link(scope, element) {
    }
  }
})();

