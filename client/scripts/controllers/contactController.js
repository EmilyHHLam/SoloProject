myApp.controller('ContactController', ['$scope', '$http', '$location', '$routeParams', 'ContactService' , function($scope, $http, $location, $routeParams, ContactService) {
    console.log('Contact Control sourced :');
    var contact = {};

    ContactService.getContacts();
    $scope.contactList = ContactService.contactList;
    console.log('contact', ContactService.contactList);
    $scope.editContact = ContactService.editContact;

    //delete event
    $scope.removeContact = function(contact) {
      swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete It!",
        closeOnConfirm: false
      },
      function(){
        swal("Deleted!", "Your contact has been deleted.", "success");
        ContactService.removeContact(contact);
      });
    };

    $scope.addContact = function() {
      swal.withForm({
        title: 'Add a New Contact',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Add Data',
        closeOnConfirm: true,
        formFields: [
          { id: 'name', placeholder: 'Name of a Place', required: true},
          { id: 'address', placeholder: 'Address'},
          { id: 'phone', placeholder: 'Phone'},
          { id: 'note', placeholder: 'Note'}
        ]
      },

      function (isConfirm) {
        if (isConfirm === true) {

        contact = this.swalForm;
         console.log('add data =', contact);
        ContactService.addContact(contact);

      }
      }
    );
    };


}]);
