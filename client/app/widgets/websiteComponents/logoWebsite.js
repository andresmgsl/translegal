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
      var elem = angular.element(element[0].firstChild);

      if (scope.top != undefined) elem.css({"top" : scope.top + "em"});
      if (scope.left != undefined) elem.css({"left" : scope.left + "em"});
      if (scope.right != undefined) elem.css({"right" : scope.right + "em"});
      if (scope.bottom != undefined) elem.css({"bottom" : scope.bottom + "em"});
      if (scope.fontFamily != undefined) elem.css({"font-family" : scope.fontFamily});

    }
  }
})();

