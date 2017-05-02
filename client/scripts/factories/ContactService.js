myApp.factory('ContactService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');
  var contactList = {
    lists: []
  };

  var addContact = function(contact) {
    $http.post('/contact', contact).then(function(response) {
      console.log('get response', response);
      getContacts();
    });
  };

  var getContacts = function() {
    $http.get('/contact').then(function(response){
      console.log('response', response);
      contactList.lists = response.data;

    });
  };

  return {
    contactList: contactList,
    getContacts:getContacts,
    addContact:addContact
  };
}]);
