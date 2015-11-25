(function () {
    'use strict';

    angular
        .module('hiraApp.data')
        .factory('repository.info', RepositoryInfo);

    RepositoryInfo.$inject = ['model','repository.abstract', 'common'];

    function RepositoryInfo(model, AbstractRepository, common) {

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
                getFiltered: base.getFiltered,
                getSchema: base.getSchema
            };

            return repo;

            function getAll(){
            	return $http.get(model.list(repoName)).then(function(res){
            		if (res) return res.data;
	            });
            }

        }
    }
})();