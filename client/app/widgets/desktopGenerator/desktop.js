(function(){

  'use strict';

  angular
    .module('hiraApp.widgets')
    .controller('Desktop',Desktop);

    Desktop.$inject = ['common','$scope','$sce']; 

  function Desktop(common,$scope,$sce) {

    var vm = this;

    vm.showWebsite = $scope.linkWithWebsite;
    vm.togglePower = togglePower;

    activate();

    function activate() {
      secureUrl($scope.url);
    }

    function secureUrl(url) {
      vm.url = $sce.trustAsResourceUrl(url); 
    }

    function togglePower(){
      vm.showWebsite = !vm.showWebsite;
    }
  }

})();
