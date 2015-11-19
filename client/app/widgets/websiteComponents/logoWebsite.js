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
        bigger:"="
      }
    };

    return directive;

    function link(scope, element) {

      if (scope.bigger) {
        console.log(element[0].childNodes[0].offsetHeight);
        console.log(element[0].childNodes[0].offsetWidth);
        
      }


    }
  }
})();

