(function () {
  'use strict';

  angular
    .module('hiraApp.navbar')
    .factory('navbarSwitch', NavbarSwitch);

  NavbarSwitch.$inject = ['common'];

  function NavbarSwitch(common) {

    var service = {
      enable : enable,
      disable: disable,
      get: get
    };

    return service;

    var navbarState;

    function enable() {
      navbarState = true;
    }

    function disable() {
      navbarState = false;
    }

    function get() {
      return navbarState;
    }

  }
})();