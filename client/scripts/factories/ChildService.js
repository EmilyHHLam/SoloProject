myApp.factory('ChildService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');
  var eventsList = {
    events: []
  };

  //--add the child data
  //var addDetail = function(child, done) {
  var addDetail = function(child, onEventComplete) {
    $http.post('/detail', child).then(function(response) {
      getDetails(child.id, onEventComplete);
      // if(done !== undefined) {
      //   done();
      // }
    });
  };

  //get the event list of the child
  var getDetails = function(childid, onEventComplete) {
  //  var getDetails = function(childid) {
      $http.get('/detail/' + childid).then(function(response){
        eventsList.events = response.data;
        if(onEventComplete !== undefined) {
          onEventComplete();
        }
    //  });
    });
  };

  //delete the event
  var removeEvent = function(evt, onEventComplete) {
    $http.delete('/detail/' + evt._id).then(function(response) {
      getDetails(evt.child_id, onEventComplete);
    });
  };

  //edit the child
  var editEvent = function(evt, onEventComplete) {
    $http.put('/detail', evt).then(function(response) {
      getDetails(evt.child_id, onEventComplete);
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
