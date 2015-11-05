(function(){

'use strict';

angular.module('hiraApp.navbar')
	.controller('Navbar',Navbar);

	Navbar.$inject = ['common','resizeHandler','stateChangeHandler','navbarSwitch','$scope','Geolocation','datacontext','animateStateChange']

	function Navbar(common,resizeHandler,stateChangeHandler,navbarSwitch,$scope,Geolocation,datacontext,animateStateChange){
		
		var vm = this;
		var forbiddenStates = ['start','projects','admin'];

		vm.show = false;
		vm.width = "";
		vm.showMenu = showMenu;
		vm.goAndClose = goAndClose;
		vm.isDesktop = isDesktop;
		vm.showNavbar = showNavbar;
    vm.isActive = isActive;

    var geolocation = Geolocation.getLanguage();

    activate();

    function activate(){
      
      geolocation.then(function(language){
        vm.language = language;
        getInfo();
      });

      resizeHandler.sizeDevice(callBackResize);
      stateChangeHandler.onChangeStateSuccess(callBackStateChange);
      setWidth();
      initValue();
    }

    function getInfo(){
      datacontext.info.getFiltered({name:vm.language + "-menu-main"}).then(function(menu){
        vm.menu = menu[0];
      });
    }

    function callBackResize(res) {
      setWidth();
      $scope.$apply();
    }

    function setWidth() {
      vm.width = resizeHandler.getActualDevice();
    }

    function callBackStateChange(res) {
      isValidState(res);
    } 

    function isValidState(toState) {
      if (toState == "start.end") {
        navbarSwitch.enable();
        return;
      }

      var state = toState.split('.')[0];
      if (forbiddenStates.indexOf(state)>-1) navbarSwitch.disable()
      else navbarSwitch.enable();
    }

    function initValue() {
      if (forbiddenStates.indexOf(common.$rootScope.currentState)>-1) navbarSwitch.disable()
      else navbarSwitch.enable();
    }

    function isDesktop() {
      return vm.width ==  "desktop";
    }

    function showNavbar() {
      return navbarSwitch.get();
    }    

		function showMenu() {
			vm.show = !vm.show;
		}

		function goAndClose(target) {
      showMenu();

      if (common.$rootScope.currentState != target) {
        animateStateChange.getMainElement().removeClass("fadeIn");
        animateStateChange.getMainElement().addClass("fadeOut");
      }

      common.$timeout(function(){
        common.$state.go(target);
      },500);
    }

    function isActive(route) {
      return (route === common.$state.current.name.split('.')[0]);
    }


	}

})();

