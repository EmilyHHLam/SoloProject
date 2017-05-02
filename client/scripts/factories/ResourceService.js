myApp.factory('ResourceService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');
  var resourceList = {
    lists: []
  };
//add the resource
  var addResource = function(resource) {
    $http.post('/resource', resource).then(function(response) {
      console.log('get response', response);
      getResources();
    });
  };
  //get the resource
  var getResources = function() {
    $http.get('/resource').then(function(response){
      console.log('response', response);
      resourceList.lists = response.data;

    });
  };
  //remove the resource
  var removeResource = function(resource) {
    $http.delete('/resource/' + resource._id).then(function(response){
      getResources();
    });
  }

  //edit the resource
  var editResource = function(resource) {
    $http.put('/resource', evt).then(function(response) {
      getResources(resource);
    });
  };

  return {
    resourceList: resourceList,
    getResources:getResources,
    addResource:addResource,
    removeResource:removeResource
  };
}]);
