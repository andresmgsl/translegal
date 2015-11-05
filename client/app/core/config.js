(function() {
    'use strict';

    var core = angular.module('hiraApp.core');

//    core.config(toastrConfig);
//
//    /* @ngInject */
//    toastrConfig.$inject = ['toastr'];
//    function toastrConfig(toastr) {
//        toastr.options.timeOut = 4000;
//        toastr.options.positionClass = 'toast-bottom-right';
//    }
//
//    var keyCodes = {
//        backspace: 8,
//        tab: 9,
//        enter: 13,
//        esc: 27,
//        space: 32,
//        pageup: 33,
//        pagedown: 34,
//        end: 35,
//        home: 36,
//        left: 37,
//        up: 38,
//        right: 39,
//        down: 40,
//        insert: 45,
//        del: 46
//    };
//
//    var imageSettings = {
//        imageBasePath: '../content/images/photos/',
//        unknownPersonImageSource: 'unknown_person.jpg'
//    };
//
//    var events = {
//        controllerActivateSuccess: 'controller.activateSuccess',
//        entitiesChanged: 'datacontext.entitiesChanged',
//        entitiesImported: 'datacontext.entitiesImported',
//        hasChangesChanged: 'datacontext.hasChangesChanged',
//        storage: {
//            error: 'store.error',
//            storeChanged: 'store.changed',
//            wipChanged: 'wip.changed'
//        }
//    };
//
//    var config = {
//        appErrorPrefix: '[CC Error] ', //Configure the exceptionHandler decorator
//        events: events,
//        imageSettings: imageSettings,
//        keyCodes: keyCodes,
//        version: '1.1.0'
//    };
//
//    core.constant('config', config);

    core.config(configure);

    configure.$inject = [
        /*'$logProvider',*/ '$stateProvider', '$urlRouterProvider',
        '$locationProvider', '$httpProvider',
        /*'exceptionConfigProvider',*/ 'statehelperConfigProvider'/*, 'toastr'*/
    ];

    /* @ngInject */
    function configure(
        /*$logProvider,*/ $stateProvider, $urlRouterProvider,
        $locationProvider, $httpProvider,
        /*exceptionConfigProvider,*/ statehelperConfigProvider/*, toastr*/) {

        configureRouting();
        /*configureToastr();
        configureLogging();
        configureExceptions();

        function configureToastr() {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
        }

        function configureLogging() {
            // turn debugging off/on (no info or warn)
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }

        function configureExceptions() {
            exceptionConfigProvider.config.appErrorPrefix = config.appErrorPrefix;
        }
*/
        function configureRouting() {

        	//HTML5 Mode and interceptors, CROSS Domain
        	$locationProvider.html5Mode(true);
			$httpProvider.interceptors.push('authInterceptor');

			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];


			// Default states and otherwise
			$urlRouterProvider.otherwise('/');
            
            $urlRouterProvider.when('/sales','/sales/projects/');
            $urlRouterProvider.when('/sales/','/sales/projects/');
            
            $urlRouterProvider.when('/start','/start/queEres/');
            $urlRouterProvider.when('/start/','/start/queEres/');

			// State Configuration
            var stateCfg = statehelperConfigProvider;
            stateCfg.config.$stateProvider = $stateProvider;
            stateCfg.config.docTitle = 'Proyecto Hira: ';
   
        }
    }
})();