(function () {
    'use strict';

    angular
        .module('hiraApp.data')
        .factory('repository.tasks', RepositoryTask);

    RepositoryTask.$inject = ['model','repository.abstract', 'common'];

    function RepositoryTask(model, AbstractRepository, common) {

    	var $http = common.$http;

        return {
            create: createRepo // factory function to create the repository
        };

        /* Implementation */
        function createRepo(repoName) {
            
        	var base = new AbstractRepository(repoName);

            var repo = {
                getAll: getAll,
                getById: base.getById,
                create: base.create,
                update: base.update,
                remove: base.remove,
                generate: generate,
                getFiltered: base.getFiltered
            };

            return repo;

            function getAll(){
            	return $http.get(model.list(repoName)).then(function(res){
            		if (res) return res.data;
	            });
            }

            function generate(array){
                return $http.post(model.getRoute(repoName,'generate'),array).then(function(res){
                    if (res) return res.data;
                });
            }
        }
    }
})();