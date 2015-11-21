(function(){

'use strict';

angular.module('hiraApp.navbar')
	.controller('Navbar',Navbar);

	Navbar.$inject = ['common']

	function Navbar(common){
		
		var vm = this;
    vm.showMenu = showMenu;
    vm.flag = false;

    vm.menu = [ {   text : 'ABOUT',
                    ref: '#cont2' },
                {   text : 'WHY US',
                    ref: '#cont3' }, 
                {   text : 'SERVICES',
                    ref: '#cont4' },
                {   text : 'LANGUAGES',
                    ref: '#cont4' },
                {   text : 'CONTACT',
                    ref: '#cont5' }];



    /*REFACTORIZAR ESTO DE ABAJO, VA EN UNA DIRECTIVA*/

    function showMenu() {
      var navbar = angular.element('.container.navbar');
      var menuElem = angular.element('.container.navbar .menuOptions');
      var height = common.$window.innerHeight - navbar[0].offsetHeight;

      if (!vm.flag) menuElem.css({'height' : height + 'px'});
      else menuElem.css({'height' : '0px'});;

      vm.flag = !vm.flag;
      $('body').toggleClass("movilMenuActive");
    }

	}

})();

