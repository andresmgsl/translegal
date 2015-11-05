(function () {
    'use strict';

    angular
        .module('hiraApp.data')
        .factory('repository.features', RepositoryFeatures);

    RepositoryFeatures.$inject = ['model','repository.abstract', 'common'];

    function RepositoryFeatures(model, AbstractRepository, common) {

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
                taskSend: taskSend,
                getFiltered: base.getFiltered,
                getSchema: base.getSchema
            };

            return repo;

            function getAll(){
            	return $http.get(model.list(repoName)).then(function(res){
            		if (res) return res.data;
	            });
            }

            function taskSend(project){
                return $http.put(model.getRoute(repoName,'taskSend',null) + project,{}).then(function(res){
                    if (res) return res.data;
                });
            }

        }
    }
})();