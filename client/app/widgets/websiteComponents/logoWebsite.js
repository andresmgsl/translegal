(function() {
  'use strict';

  angular
    .module('hiraApp.widgets')
    .directive('logo', logo);

  logo.$inject = ['common'];

  function logo(common) {
    var directive = { 
      link: link,
      restrict: "E",
      templateUrl: "app/widgets/websiteComponents/logoWebsite.html",
      scope: {
        top: "@",
        left: "@",
        right: "@",
        bottom: "@",
        fontFamily: "@"
      }
    };

    return directive;

    function link(scope, element) {
    }
  }
})();

