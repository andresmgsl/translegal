(function(){
'use strict';

angular.module('hiraApp', [
  //hiraApp reusable features
  'hiraApp.core',

  //hiraApp data module
  'hiraApp.data',

  //hiraApp DOM structure
  'hiraApp.layout',
  
  //hiraApp states
  'hiraApp.home',
  'hiraApp.widgets',
  'hiraApp.footer',
  'hiraApp.navbar'
])

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  /*.run(['$state', function($state){

    }])*/

  .run(function ($rootScope, $location, Auth, $log, $http) {
    $log.info("Made with ♥ by IRB.IO\n\n-You want to work with us? Write a message to job@irb.io-");
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeSuccess',function (event,toState){
      $rootScope.currentState = toState.name;
    });


    $rootScope.$on('$stateChangeStart', function (event, next,toState) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });

})();

