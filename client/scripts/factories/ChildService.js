myApp.factory('ChildService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');
    var eventsList = {
      events: []
    };

  //--add the child data
  var addDetail = function(child) {
    $http.post('/detail', child).then(function(response) {
    getDetails(child.id);
    });
  };

//get the event list of the child
 var getDetails = function(childid) {
      $http.get('/detail/' + childid).then(function(response){
      eventsList.events = response.data;
     });
 };

 //delete the event
  var removeEvent = function(evt) {
    $http.delete('/detail/' + evt._id).then(function(response) {
      getDetails(evt.child_id);
    });
  };
  
  //edit the child
  var editEvent = function(evt) {
    $http.put('/detail', evt).then(function(response) {
      getDetails(evt.child_id);
    });
  };


  return {
    editEvent: editEvent,
    removeEvent: removeEvent,
    getDetails: getDetails,
    eventsList: eventsList,
    addDetail: addDetail
  };
}]);
