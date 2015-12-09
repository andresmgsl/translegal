(function(){

'use strict';

angular.module('hiraApp.navbar')
	.controller('Navbar',Navbar);

	Navbar.$inject = ['common', '$document']

	function Navbar(common,$document){
		
		var vm = this;
    vm.showMenu = showMenu;
    vm.goToSection = goToSection;
    vm.flag = false;

    vm.menu = [ {   text : 'ABOUT',
                    ref: 'cont2' },
                {   text : 'WHY US',
                    ref: 'cont3' }, 
                {   text : 'SERVICES',
                    ref: 'cont4' },
                {   text : 'LANGUAGES',
                    ref: 'cont4' },
                {   text : 'CONTACT',
                    ref: 'cont5' }];



    /*REFACTORIZAR ESTO DE ABAJO, VA EN UNA DIRECTIVA*/

    function goToSection(id) {
      var elem = angular.element(document.getElementById(id));
      $document.scrollToElement(elem,88.9,1500);
    }

    function showMenu(id) {
      var navbar = angular.element('.container.navbar');
      var menuElem = angular.element('.container.navbar .menuOptions');
      var list = angular.element('.listOptions');

      var height = common.$window.innerHeight - navbar[0].offsetHeight;

      if (!vm.flag) {
        menuElem.css({'height' : height + 'px'});
        common.$timeout(function(){
          list.removeClass('notShow');
        },500);
      }
      else {
        list.addClass('notShow');
        common.$timeout(function(){
          menuElem.css({'height' : '0px'});
          if (id) {
            common.$timeout(function(){
              goToSection(id);
            },600);
          }
        },600);
        
      }

      vm.flag = !vm.flag;
      $('body').toggleClass("movilMenuActive");
    }

	}

})();

