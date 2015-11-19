(function(){

'use strict';

angular.module('hiraApp.navbar')
	.controller('Navbar',Navbar);

	Navbar.$inject = ['common']

	function Navbar(common){
		
		var vm = this;

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

	}

})();

