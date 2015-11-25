(function () {
    'use strict';

    angular
        .module('hiraApp.data')
        .factory('repository.members', RepositoryMember);

    RepositoryMember.$inject = ['model','repository.abstract', 'common'];

    function RepositoryMember(model, AbstractRepository, common) {

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
                remove: base.remove
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