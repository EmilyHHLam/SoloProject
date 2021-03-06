myApp.controller('ChildrenController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
  console.log('child sourced :');
  var child = {};

  UserService.getChildren();
  $scope.childrenList = UserService.childrenList;
  $scope.logout = function(){
    console.log('Log out clicked!');
    UserService.logout();
  };

  $scope.editaChild = function(child) {
    // console.log('here is a child to edit', child);
    UserService.editaChild(child);
  };

  $scope.addChild = function() {
    swal.withForm({
      title: 'Congrats! Add Your Baby',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Add Data',
      closeOnConfirm: true,
      formFields: [
        { id: 'first', placeholder: 'first name', required: true},
        { id: 'last', placeholder: 'last name', required: true },
        { id: 'dob', placeholder: 'birthday', required: true },
        { name: 'gender', value: 'boy', type: 'radio' },
        { name: 'gender', value: 'girl', type: 'radio' }


      ]
    },

    function (isConfirm) {
      if (isConfirm === true) {

      child = this.swalForm;
      // console.log('add data =', child);
      UserService.addChild(child);

    }
    }
  );
  };

}]);
