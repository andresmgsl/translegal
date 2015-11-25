(function(){

  'use strict';

  angular.module('hiraApp.widgets')
  .controller('Tree', Tree);

  Tree.$inject = ['common','$scope','datacontext'];

  function Tree(common, $scope, datacontext) {

  		var vm = this;
  		var $q = common.$q;
  		var $stateParams = common.$stateParams;

  		vm.tree = [];
  		vm.project = $stateParams.project;

  		activate();

  		function activate(){
  			getViews();
  		}

  		function getViews(){
	      datacontext.views.getFiltered({project:vm.project/*,status:'onHold'*/}).then(function(views){
	        vm.views = views;
	        getExtras();
	      });
	    }

	    function getExtras(){
	      var promises = [];

	      for (var i = 0; i < vm.views.length; i++) {
	        vm.views[i].extras = [];
	        vm.views[i].childs = [];
	        promises.push(datacontext.extras.getFiltered({project:vm.project,view:vm.views[i]._id/*,status:'onHold'*/}));
	      };

	      $q.all(promises).then(function(extras){
	        for (var i = 0; i < extras.length; i++) {
	          for (var j = 0; j < extras[i].length; j++) {
	            vm.views[i].extras.push(extras[i][j]);
	          };
	        };
	        
	        loadTree(vm.views);
	      });
	    }

	    function loadTree(views){

	    	for (var i = 0; i < views.length; i++) {
	    		var node = {};
	    		node.name = views[i].name;
	    		node.extras = views[i].extras;
	    		node.parent = views[i].parent;
	    		node.nodes = [];

	    		add(node);
	    	};

	    }


	    $scope.delete = function(data) {
	        data.nodes = [];
	    };

	    function add(node) {
    		if (node.parent === "null"){
    			vm.tree.push(node);
    		} 
    		else {    	
    		}
		    	console.log(node);
	    };
	    $scope.tree = [{name: "Node", nodes: [{name:"test",nodes:[]}]},{name:"test2",nodes:[]}];
  }
  
})();