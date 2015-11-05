(function () {
  'use strict';

  angular
    .module('resizeHandler')
    .factory('resizeHandler', ResizeHandler);

  ResizeHandler.$inject = ['common'];

  function ResizeHandler(common) {

    var service = {
      detectDevice: detectDevice,
      sizeDevice: sizeDevice,
      getActualWidth: getActualWidth,
      getActualHeight: getActualHeight,
      getActualDevice: getActualDevice
    };

    return service;

    var device
    
    function getActualWidth() {
      return common.$window.innerWidth
    }

    function getActualHeight() {
      return common.$window.innerHeight
    }

    function getActualDevice() {
      device = detectDevice();
      return device
    }

    function detectDevice() {
      var temp,actualWidth = getActualWidth();

      if (actualWidth < 500) temp = "mobile";
      if ((actualWidth >= 500) && (actualWidth <768)) temp = "bigMobile";
      if ((actualWidth >= 768) && (actualWidth <1024)) temp = "tablet";      
      if (actualWidth >= 1024) temp = "desktop";

      return temp;
    }  

    function sizeDevice(fn) {
      $(window).resize(fn)
    }

    
  }
})();