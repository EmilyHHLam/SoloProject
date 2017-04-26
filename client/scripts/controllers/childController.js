myApp.controller('ChildController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log('child sourced :');


  $scope.learnMore = function(child) {
      console.log(child);


  };
}]);
