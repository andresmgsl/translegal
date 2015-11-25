(function() {
    'use strict';

    angular
        .module('hiraApp.data')
        .factory('repository.abstract', AbstractRepository);

    AbstractRepository.$inject = ['common', 'model'];

    function AbstractRepository(common, model) {
        /* jshint validthis:true */
        var $q = common.$q;
        var $http = common.$http;

        function Ctor(entityName) {
            // instance members that are stateful
            this.entityName = entityName;
            this.getById = getById.bind(this);
            this.create = create.bind(this);
            this.update = update.bind(this);
            this.remove = remove.bind(this);
            this.getSchema = getSchema.bind(this);
            this.getFiltered = getFiltered.bind(this);
            this.queryFailed = queryFailed.bind(this); // Bind to self so we establish 'this' as the context
        }

        /* stateless methods that can be shared across all repos */
        Ctor.prototype = {
            constructor: Ctor,
            $q: $q,
            getAllLocal: getAllLocal
        };

        return Ctor;

        /* Implementation */

        function getAllLocal(resource, ordering, predicate) {
            
        }

        function getSchema(){
            //console.log(model.getRoute(this.entityName,'model'));
            return $http.get(model.getRoute(this.entityName,'schema')).then(function(res){
                if (res) return res.data;
            });
        }

        function getById(id, forceRemote) {
            return $http.get(model.show(this.entityName,id)).then(function(res){
                if (res) return res.data;
            });
        }        

        function create(data){
            return $http.post(model.create(this.entityName),data).then(function(res){
                return res.data
            });
        }

        function update(id,data){
            return $http.put(model.update(this.entityName,id),data).then(function(res){
                if (res) return res.data;
            });
        }

        function getFiltered(req){
            var route = model.filter(this.entityName,req);

            return $http.get(route).then(function(res){
                if (res) return res.data;
            });
        }

        function remove(id){
            return $http.delete(model.remove(this.entityName,id)).then(function(res){
                if (res) return res.data;
            });
        }

        function queryFailed(error) {
            var msg = 'Error retrieving data. ' + (error.message || '');
            return $q.reject(new Error(msg));
        }

    }
})();