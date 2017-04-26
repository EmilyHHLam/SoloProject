myApp.controller('ChildrenController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log('child sourced :');
//$scope.children = UserService.children;
var child = {};
  $scope.addChild = function(child) {
    console.log('come here');
    console.log('child first' + child.first);
    console.log('child last' + child.last);
    console.log('dob' + child.dob);
    console.log('gender' + child.gender);
    UserService.addChild(child);
  };
  UserService.getChildren();
  $scope.childrenList = UserService.childrenList;
  console.log('childrenlist from fac', UserService.childrenList);

  
}]);
