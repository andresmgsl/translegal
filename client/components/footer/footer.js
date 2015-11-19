 (function(){

'use strict';

angular.module('hiraApp.footer')
	.controller('Footer',Footer);

	Footer.$inject = ['common']

	function Footer(common){
		
	  var vm = this;

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

    var element = angular.element(".footer");

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
    
    var handler = onVisibilityChange(element);
    $(window).on('DOMContentLoaded load resize scroll', handler); 

	}

})();

/*
function 

*/