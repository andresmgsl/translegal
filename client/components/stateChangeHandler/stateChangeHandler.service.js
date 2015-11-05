(function () {
  'use strict';

  angular
    .module('stateChangeHandler')
    .factory('stateChangeHandler', StateChangeHandler);

  StateChangeHandler.$inject = ['common'];

  function StateChangeHandler(common) {

    var service = {
      onChangeStateSuccess : onChangeStateSuccess,
      onChangeStateStart : onChangeStateStart
    };

    return service;

    function onChangeStateStart(fn) {
       common.$rootScope.$on('$stateChangeStart', function(event,toState,toParams,fromState,fromParams){ 
        fn(toState.name);
      });
    }

    function onChangeStateSuccess(fn) {
      common.$rootScope.$on('$stateChangeSuccess', function(event,toState,toParams,fromState,fromParams){
        fn(toState.name);
      });
    }
  }
})();