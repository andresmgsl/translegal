(function () {
  'use strict';

  angular
    .module('hiraApp.footer')
    .factory('footerSwitch', FooterSwitch);

  FooterSwitch.$inject = ['common'];

  function FooterSwitch(common) {

    var service = {
        enable : enable,
        disable: disable,
        get: get,
    };

    return service;

    var footerState;

    function enable() {
      footerState = true;
    }

    function disable() {
      footerState = false;
    }

    function get() {
      return footerState;
    }

  }
})();