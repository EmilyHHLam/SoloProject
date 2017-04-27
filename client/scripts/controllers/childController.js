myApp.controller('ChildController', ['$scope', '$http', '$location', '$routeParams', 'ChildService', function($scope, $http, $location, $routeParams, ChildService) {
    console.log('Child Control sourced :');
    console.log($routeParams.name);
    console.log($routeParams.child_id);
    $scope.name = $routeParams.name;
    var person = {};
    $scope.addDetail = function(person) {
    console.log('type=' + person.eventtype);
    person.id = $routeParams.child_id;
    ChildService.addDetail(person);
  };
  //get list of the events
  ChildService.getDetails();
  $scope.eventsList = ChildService.eventsList;
  //delete event
  $scope.removeEvent = ChildService.removeEvent;
  //update event
  $scope.editEvent = ChildService.editEvent;

}]);
