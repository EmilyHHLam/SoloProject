myApp.controller('ChildController', ['$scope', '$http', '$location', '$routeParams', 'ChildService', function($scope, $http, $location, $routeParams, ChildService) {
    console.log('Child Control sourced :');
    // console.log($routeParams.name);
    // console.log('id' + $routeParams.child_id);
    $scope.name = $routeParams.name;

  //   $scope.addDetail = function(person) {
  //   person.id = $routeParams.child_id;
  //   ChildService.addDetail(person);
  // };
  //get list of the events

  ChildService.getDetails($routeParams.child_id);

  $scope.eventsList = ChildService.eventsList;

  //update event
  $scope.editEvent = ChildService.editEvent;

  //delete event
  $scope.removeEvent = function(evt) {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      swal("Deleted!", "Your imaginary file has been deleted.", "success");
      ChildService.removeEvent(evt);
    });
  };

  $scope.addDetail = function() {
    swal.withForm({
      title: 'Add',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Get form data!',
      closeOnConfirm: true,
      formFields: [
        { id: 'etype', type: 'select', options: [
            {value: 'other', text: 'Please select one'},
            {value: 'feeding', text: 'Feeding'},
            {value: 'diaper Change', text: 'Diaper Change'},
            {value: 'medical', text: 'Medical'},
            {value: 'dental', text: 'Dental'},
            {value: 'milestone', text: 'Milestone'},
            {value: 'metrics', text: 'Metrics'},
            {value: 'other', text: 'Other'}
        ]},
        { id: 'date', placeholder: 'Date' },
        { id: 'time', placeholder: 'Time' },
        { id: 'note', type: 'textarea' }


      ]
    }, function (isConfirm) {
      // do whatever you want with the form data
      var person = {};
      person = this.swalForm;
      person.id = $routeParams.child_id;
      console.log('obj', person);
      console.log('edit id' + person.id);
      ChildService.addDetail(person);
    // { name: 'user name', nickname: 'what the user sends' }
    });
  };
//==end of swal form==
}]);
