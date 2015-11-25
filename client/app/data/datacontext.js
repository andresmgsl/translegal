(function() {
    'use strict';

    angular
        .module('hiraApp.data')
        .factory('datacontext', datacontext);

    datacontext.$inject = [
        '$injector', '$rootScope',
        'common', 'model'
    ];

    function datacontext(
        $injector, $rootScope, common, model) {


        //Repository names
        var repoNames = ['info','members','services','tasks','projects','views','features','extras'];
        var $q = common.$q;

        var service = {
           //Repositories will be here after init
        };

        init();

        return service;

        //Init function setting things up
        function init() {
            defineLazyLoadedRepos();
        }

        // Add ES5 property to datacontext for each named repo
        function defineLazyLoadedRepos() {
            repoNames.forEach(function(name) {
                Object.defineProperty(service, name, {
                    configurable: true, // will redefine this property once
                    get: function() {
                        // The 1st time the repo is request via this property,
                        // we ask the repositories for it (which will inject it).
                        var repo = getRepo(name);
                        // Rewrite this property to always return this repo;
                        // no longer redefinable
                        Object.defineProperty(service, name, {
                            value: repo,
                            configurable: false,
                            enumerable: true
                        });
                        return repo;
                    }
                });
            });
        }

        // Get named Repository Ctor (by injection), new it, and initialize it
        function getRepo(repoName) {
            var fullRepoName = 'repository.' + repoName.toLowerCase();
            var factory = $injector.get(fullRepoName);
            return factory.create(repoName);
        }

    }
})();