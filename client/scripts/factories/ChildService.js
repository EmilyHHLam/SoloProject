myApp.factory('ChildService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');

    var eventsList = {
      events: []
    };


  //--add the child data
  var addDetail = function(child) {
    console.log('id', child.id);
    console.log('date', child.date);
    console.log('time', child.time);
    console.log('note', child.note);
    console.log('note', child.eventtype);
    console.log('child ' + child);
    $http.post('/detail', child).then(function(response) {
      console.log(response);
    getDetails(child.id);
    });
  };

//get the event list of the child
 var getDetails = function(id) {
     console.log('id = ' + id);
       var config = {
        params: {
            child_id: id
        }
      };
      console.log('config', config);
      $http.get('/detail', config).then(function(response){
      console.log('events', response);
      eventsList.events = response.data;
     });
 };

 //delete the event
  var removeEvent = function(evt) {
    console.log('here is the factory',evt);
    $http.delete('/detail/' + evt._id).then(function(response) {
      console.log(response);
      getDetails();
    });
  };



  return {
    removeEvent: removeEvent,
    getDetails: getDetails,
    eventsList: eventsList,
    addDetail: addDetail
  };
}]);
