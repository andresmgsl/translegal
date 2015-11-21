 (function(){

'use strict';

angular.module('hiraApp.footer')
	.controller('Footer',Footer);

	Footer.$inject = ['common','resizeHandler','$scope']

	function Footer(common,resizeHandler,$scope){
		
	  var vm = this;
    vm.width = "";
    vm.isMobile = isMobile;
    vm.isBigMobile = isBigMobile;
    vm.isTablet = isTablet;
    vm.isDesktop = isDesktop;
  
    vm.menu = [ {   text : 'ABOUT',
                ref: '#cont1' },
            {   text : 'WHY US',
                ref: '#cont2' }, 
            {   text : 'SERVICES',
                ref: '#cont3' },
            {   text : 'LANGUAGES',
                ref: '#cont4' },
            {   text : 'CONTACT',
                ref: '#cont5' }];


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











    /*Toda esta porquería de abajo hay que entenderla 
                        mejor para luego refactorizarla en una directiva*/

    var element = angular.element(".footer");
    var handler = onVisibilityChange(element);

    function isElementInViewport (el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= ((window.innerHeight || document.documentElement.clientHeight) + 95) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

    function onVisibilityChange (el, callback) {
        return function () {
            /*your code here*/ console.log('visibility ' + isElementInViewport(el));
        }
    }

    $(window).on('DOMContentLoaded load resize scroll', handler); 

	}

})();