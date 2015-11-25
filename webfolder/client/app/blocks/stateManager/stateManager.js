(function() {
    'use strict';

    angular
        .module('blocks.stateManager')
        .provider('statehelperConfig', statehelperConfig)
        .factory('statehelper', statehelper);

    // Must configure via the statehelperConfigProvider
    function statehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            //$urlstaterProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    statehelper.$inject = [
        /*'$location',*/ 'common',/*'$state',*/
        /*'logger',*/ 'statehelperConfig'
    ];

    function statehelper(
        /*$location,*/ common,/*$route,*/
        /*logger,*/ statehelperConfig) {
        var handlingRouteChangeError = false;
        var stateCounts = {
            errors: 0,
            changes: 0
        };
        var states = [];
        
        var $stateProvider = statehelperConfig.config.$stateProvider;

        var $rootScope = common.$rootScope;

        var $state = common.$state;

        var $location = common.$location;

        var service = {
            configureStates: configureStates,
            getStates: getStates,
            stateCounts: stateCounts
        };

        init();

        return service;
        ///////////////

        function configureStates(states) {
        
            states.forEach(function(state) {
                /*state.config.resolve =
                    angular.extend(state.config.resolve || {}, statehelperConfig.config.resolveAlways);*/
                $stateProvider.state(state.name, state.config);
            });
       
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    stateCounts.errors++;
                    handlingRouteChangeError = true;
                    /*var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);*/
                    $state.go('home');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function getStates() {

        	for (var i = 0; i < $state.get().length; i++) {
        		var state = $state.get()[i];
                if (state.name.length > 0 && !state.abstract) {
                    states.push($state.get()[i]);
                }
        	};

            return states;
            
        }

        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, current, previous) {
                    stateCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = statehelperConfig.config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title; // data bind to <title>
                }
            );
        }
	}
})();