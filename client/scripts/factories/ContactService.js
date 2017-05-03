myApp.factory('ContactService', ['$http', '$location', '$route', function($http, $route, $location  ){
  console.log('User Service Loaded');
  var contactList = {
    lists: []
  };
//add the contact
  var addContact = function(contact) {
    $http.post('/contact', contact).then(function(response) {
      console.log('get response', response);
      getContacts();
    });
  };
  //get the contact
  var getContacts = function() {
    $http.get('/contact').then(function(response){
      console.log('response', response);
      contactList.lists = response.data;

    });
  };
  //remove the contact
  var removeContact = function(contact) {
    $http.delete('/contact/' + contact._id).then(function(response){
      getContacts();
    });
  }

  //edit the contact
  var editContact = function(contact) {
    $http.put('/detail', evt).then(function(response) {
      getDetails(contact);
    });
  };

  return {
    contactList: contactList,
    getContacts:getContacts,
    addContact:addContact,
    removeContact:removeContact
  };
}]);
