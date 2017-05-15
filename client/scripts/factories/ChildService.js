myApp.factory('ChildService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');
  var eventsList = {
    events: []
  };

  //--add the child data
  var addDetail = function(child, onEventComplete) {
    console.log('child event', child);
    if (child.weight !== undefined) {
      console.log('metrics');
      $http.post('/detail/metric', child).then(function(response) {
        getDetails(child.id, onEventComplete);
      });
    }
    else {
      console.log('not metrics');
      $http.post('/detail/activity', child).then(function(response) {
        getDetails(child.id, onEventComplete);
      });
    }

  };

  //get the event list of the child
  var getDetails = function(childid, onEventComplete) {
      $http.get('/detail/' + childid).then(function(response){
        eventsList.events = response.data;
        if(onEventComplete !== undefined) {
          onEventComplete();
        }
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
    // console.log('event', evt);
    if (evt.weight !== undefined) {
      $http.put('/detail/metric', evt).then(function(response) {
        getDetails(evt.child_id, onEventComplete);
      });

    } else{
      // console.log('metrics');
      $http.put('/detail/activity', evt).then(function(response) {
        getDetails(evt.child_id, onEventComplete);
      });
    }

  };

  return {
    editEvent: editEvent,
    removeEvent: removeEvent,
    getDetails: getDetails,
    eventsList: eventsList,
    addDetail: addDetail
  };
}]);
