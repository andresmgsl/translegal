 (function(){

'use strict';

angular.module('hiraApp.footer')
	.controller('Footer',Footer);

	Footer.$inject = ['common','resizeHandler','stateChangeHandler','footerSwitch','$scope','Geolocation','datacontext']

	function Footer(common,resizeHandler,stateChangeHandler,footerSwitch,$scope,Geolocation,datacontext){
		
		var vm = this;
    var forbiddenStates = ['start','projects','admin'];
		
    vm.width = "";
    vm.isDesktop = isDesktop;
		vm.isMobile = isMobile;
    vm.showFooter = showFooter;
    vm.replaceText = replaceText;

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
      getInqueries();
      getCallToAction();
      getMiniSlogan();
      getRRSS();
      getRights();
    }

    function getInqueries(){
      datacontext.info.getFiltered({name:vm.language + "-inquiries"}).then(function(inqueries){
        vm.inqueries = inqueries[0];
      });
    }

    function getCallToAction(){
      datacontext.info.getFiltered({name:vm.language + "-CTA-footer"}).then(function(callToAction){
        vm.callToAction = callToAction[0];
      });
    }

    function getMiniSlogan(){
      datacontext.info.getFiltered({name:vm.language + "-miniSlogan"}).then(function(miniSlogan){
        vm.miniSlogan = miniSlogan[0];
      });
    }

    function getRRSS(){
      datacontext.info.getFiltered({name:"RRSS"}).then(function(RRSS){
        vm.RRSS = RRSS[0];
      });
    }

    function getRights(){
      datacontext.info.getFiltered({name:vm.language + "-rights"}).then(function(rights){
        vm.rights = rights[0];
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
      var state = toState.split('.')[0];
      if (forbiddenStates.indexOf(state)>-1) footerSwitch.disable()
      else footerSwitch.enable();
    }

    function initValue() {
      if (forbiddenStates.indexOf(common.$rootScope.currentState)>-1) footerSwitch.disable()
      else footerSwitch.enable();
    }

    function isMobile() {
      return vm.width ==  "mobile";
    }

    function isDesktop() {
      return vm.width ==  "desktop";
    }

    function showFooter() {
      return footerSwitch.get();
    }

    function replaceText() {
    }

	}

})();

/*
function 

*/