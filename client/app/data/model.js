(function() {
    'use strict';

    angular
        .module('hiraApp.data')
        .factory('model', model);

    model.$inject = [];

    function model() {

        var route = "api/";

        var filters = {
            extras : ["project","status","view","content_type","serviceId"],
            views : ["project","status","level","parent"],
            features : ["project","status","serviceId"],
            info : ["name"],
            services : ["type"],
            projects : ["name"]
        };

        var service = {
            getRoute : getRoute,
            create: create,
            list: list,
            show: show,
            update: update,
            remove: remove,
            filter: filter
        };

        return service;

        //Give an entityName, req type and id if required and 
        //returns needed route
        function getRoute(entityName,req) {
            if (req)
                return route + entityName + '/' + req + '/';
            else 
                return route + entityName;
        }

        function create(entityName){
            return route + entityName + '/create/';
        }

        function list(entityName){
            return route + entityName;
        }

        function filter(entityName,req){
            var attr = filters[entityName];
            var query = {};

            for (var i = 0; i < attr.length; i++) {
                if (req[attr[i]]){
                    query[attr[i]] = req[attr[i]];
                }
                else {
                    query[attr[i]] = 'null';
                };
            };

            var res = route + entityName + '/filter'

            for (var filt in query){
                res += '/' + query[filt];
            }

            return res;
        }

        function update(entityName,id){
            return route + entityName + '/update/' + id;
        }

        function show(entityName,id){
            return route + entityName + '/show/' + id;
        }

        function remove(entityName,id){
            return route + entityName + '/' + id;
        }        
    }
})();