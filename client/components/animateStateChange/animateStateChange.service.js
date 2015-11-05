(function () {
  'use strict';

  angular
    .module('animateStateChange')
    .factory('animateStateChange', AnimateStateChange);

  AnimateStateChange.$inject = ['common'];

  function AnimateStateChange(common) {

    var service = {
      setMainElement: setMainElement,
      getMainElement: getMainElement
    };

    return service;

    var elementToAnimate

    function setMainElement(data) {
      elementToAnimate = data
    }

    function getMainElement() {
      return elementToAnimate;
    }

  }
})();