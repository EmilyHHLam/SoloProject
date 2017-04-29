myApp.factory('ChildService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');

    var eventsList = {
      events: []
    };

  //--add the child data
  var addDetail = function(child) {
    $http.post('/detail', child).then(function(response) {
      console.log('add response', child);
    getDetails(child.id);
    });
  };

//get the event list of the child
 var getDetails = function(childid) {
      console.log('childid=' + childid);
      $http.get('/detail/' + childid).then(function(response){
      console.log('events', response);
      eventsList.events = response.data;
     });
 };

 //delete the event
  var removeEvent = function(evt) {

    $http.delete('/detail/' + evt._id).then(function(response) {
      console.log(response);
      console.log('removeevent', evt._id);
      getDetails(evt.child_id);
    });
  };

  var editEvent = function(evt) {
    console.log('editevent', evt);
    $http.put('/detail', evt).then(function(response) {
      console.log('edit', response);
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
