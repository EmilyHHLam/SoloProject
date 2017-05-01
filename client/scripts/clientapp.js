var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);
//pagination
myApp.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'ChildrenController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'ChildController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/info/:child_id/:name/:gender', {
      templateUrl: '/views/templates/info.html',
      controller: 'ChildController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/events', {
      templateUrl: '/views/templates/events.html',
      controller: 'InfoController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/milestones', {
      templateUrl: '/views/templates/milestones.html',
      controller: 'InfoController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/medicalinfo', {
      templateUrl: '/views/templates/medicalinfo.html',
      controller: 'InfoController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/resources', {
      templateUrl: '/views/templates/resources.html',
      controller: 'InfoController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/contact', {
      templateUrl: '/views/templates/contact.html',
      controller: 'InfoController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
