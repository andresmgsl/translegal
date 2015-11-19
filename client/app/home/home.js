(function(){

  'use strict';

  angular
    .module('hiraApp.home')
    .controller('Home',Home);

    Home.$inject = ['common','resizeHandler','$scope']; 

  function Home(common,resizeHandler,$scope) { 

    var vm = this;
    vm.width = "";
    vm.isMobile = isMobile;
    vm.isBigMobile = isBigMobile;
    vm.isTablet = isTablet;
    vm.isDesktop = isDesktop;
  
    resizeHandler.sizeDevice(callBackResize);
    activate();

    function activate() {
      setWidth();
    }

    function callBackResize(res) {
      setWidth();
      $scope.$apply();
    }

    function setWidth() {
      vm.width = resizeHandler.getActualDevice();
    }

    function isMobile() {
      return vm.width == "mobile";
    }

    function isBigMobile() {
      return vm.width ==  "bigMobile";
    }

    function isTablet() {
      return vm.width ==  "tablet";
    }

    function isDesktop() {
      return vm.width ==  "desktop";
    }

    vm.values = [ {   name : 'QUALITY',
	                    value: '#cont1' },
	                {   name : 'EFFICIENCY',
	                    value: '#cont2' }, 
	                {   name : 'RATES',
	                    value: '#cont3' },
	                {   name : 'QUALITY FOR PRICE RATIO',
	                    value: '#cont4' },
	                {   name : 'EXPERIENCE',
	                    value: '#cont5' },
	                {   name : 'CONFIDENTIALITY',
	                    value: '#cont5' }];
  }

})();
