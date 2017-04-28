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
    getDetails();
    });
  };

//get the event list of the child
 var getDetails = function(childid) {
   console.log('id' + childid);
   var testid = '5900f07accf61604533a7233';
      //
      //  var config = {
      //   params: {
      //       child_id: id
      //   }
      // };
      // console.log('config', config);
      // console.log('test: ', testid);
      $http.get('/detail/' + testid).then(function(response){
      console.log('events', response);
      eventsList.events = response.data;
     });
 };

 //delete the event
  var removeEvent = function(evt) {
    $http.delete('/detail/' + evt._id).then(function(response) {
      console.log(response);
      getDetails();
    });
  };

  var editEvent = function(evt) {
    console.log('here is the factory',evt);
    // $http.put('/detail/' + evt._id).then(function(response) {
    //   console.log(response);
    //   getDetails();
    // });
  };


  return {
    editEvent: editEvent,
    removeEvent: removeEvent,
    getDetails: getDetails,
    eventsList: eventsList,
    addDetail: addDetail
  };
}]);
