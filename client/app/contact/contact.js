(function(){

  'use strict';

  angular
    .module('hiraApp.contact')
    .controller('Contact',Contact);

    Contact.$inject = ['language','datacontext','$http']; 

  function Contact(language,datacontext, $http) {

    var vm = this;

    vm.language = language;
    vm.form = {};

    vm.askForBudget = askForBudget;
      
    activate();

    function activate(){
    	getInfo();
    }

    function getInfo(){
    	getContactForm();
    	getContactFormCTA();
    	getContactInfo();
    }

    function getContactForm(){
    	datacontext.info.getFiltered({name:vm.language + "-contactForm"}).then(function(contactForm){
    		vm.contactForm = contactForm[0];
    	});
    }

    function getContactFormCTA(){
    	datacontext.info.getFiltered({name:vm.language + "-CTA-contactForm"}).then(function(contactFormCTA){
    		vm.contactFormCTA = contactFormCTA[0];
    	});
    }

    function getContactInfo(){
    	datacontext.info.getFiltered({name:vm.language + "-contactInfo"}).then(function(contactInfo){
    		vm.contactInfo = contactInfo[0];
    	});
    }

    function askForBudget(){
        $http.post('api/projects/mail/askingForBudget',vm.form);
    }
  }

})();
