(function(){

  'use strict';

  angular
    .module('hiraApp.home')
    .controller('Home',Home);

    Home.$inject = ['common']; 

  function Home(common) { 

    var vm = this;
  
    vm.values = [ {   name : 'QUALITY',
	                    value: '#cont1' },
	                {   name : 'EFFICIENCY',
	                    value: '#cont2' }, 
	                {   name : 'RATES',
	                    value: '#cont3' },
	                {   name : 'QUALITY FOR PRICE RATIO',
	                    value: '#cont4' },
	                {   name : 'EXPERIENCE',
	                    value: '#cont5' },
	                {   name : 'CONFIDENTIALITY',
	                    value: '#cont5' }];
  }

})();
