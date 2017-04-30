myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');
    var userObject = {};
    var childrenList = {};

  //--add the child data
  var addChild = function(child) {
    console.log('child ' + child);
    $http.post('/child', child).then(function(response) {
      //console.log(response);
    getChildren();
    });
  };
//get the list of children
 var getChildren = function() {
  $http.get('/child').then(function(response){
    childrenList.children = response.data;
    console.log('get a child', childrenList );
   });
 };
//edit that child
 var editaChild = function(child) {
   console.log('child', child);
   $http.put('/child', child).then(function(response) {
     console.log(response);
     getChildren();
   });
};

  return {
    userObject : userObject,
    addChild: addChild,
    getChildren: getChildren,
    childrenList: childrenList,
    editaChild: editaChild,
    getuser : function(){
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
              console.log('User Data: ', userObject.userName);
          } else {
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      });
    },

    logout : function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path("/home");
        });
    }
  };
}]);
