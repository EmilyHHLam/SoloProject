myApp.controller('ChildrenController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log('child sourced :');
//$scope.children = UserService.children;
var child = {};
  // $scope.addChild = function(child) {
  //   console.log('come here');
  //   console.log('child first' + child.first);
  //   console.log('child last' + child.last);
  //   console.log('dob' + child.dob);
  //   console.log('gender' + child.gender);
  //   UserService.addChild(child);
  //   $scope.model = {};
  // };
  UserService.getChildren();
  $scope.childrenList = UserService.childrenList;
  //console.log('childrenlist from fac', UserService.childrenList);

  $scope.editaChild = function(child) {
    console.log('here is a child to edit', child);
    UserService.editaChild(child);
  };

  $scope.addChild = function() {
    swal.withForm({
      title: 'Add an Event',
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
      console.log('add data =', child);
      UserService.addChild(child);

    }
    }
  );
  };

}]);
