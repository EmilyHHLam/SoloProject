myApp.controller('ChildController', ['$scope', '$http', '$location', '$routeParams', 'filterFilter', 'ChildService' , function($scope, $http, $location, $routeParams, filterFilter, ChildService) {
    console.log('Child Control sourced :');
    // console.log($routeParams.name);
    // console.log('id' + $routeParams.child_id);
    $scope.name = $routeParams.name;
    var childName = $routeParams.name;
    if ($routeParams.gender == "boy") {
      $scope.imgLoad = 'views/images/boy.png';
    }else {
      $scope.imgLoad = 'views/images/girl.png';
    }

    // $watch search to update pagination
    $scope.onEventComplete = function() {
      console.log('CALLBACK', $scope.eventsList.events.length);
      $scope.isArrowShow = function(){
        if ($scope.eventsList.events.length>$scope.entryLimit) {
          return true;
        }
        else {
          return false;
        }
      };
      $scope.$watch('search', function (newVal, oldVal) {
          $scope.totalItems =$scope.eventsList.events.length;
          $scope.filtered = filterFilter($scope.eventsList.events, newVal);
          $scope.totalItems = $scope.filtered.length;
          $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
          $scope.currentPage = 1;
      }, true);
    };
  //get list of the events
  ChildService.getDetails($routeParams.child_id, $scope.onEventComplete);

  //ChildService.getDetails($routeParams.child_id);
  $scope.eventsList = ChildService.eventsList;

  //update event
  $scope.editEvent = ChildService.editEvent;

  //delete event
  $scope.removeEvent = function(evt) {
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Delete It!",
      closeOnConfirm: false
    },
    function(){
      swal("Deleted!", "Your event has been deleted.", "success");
      ChildService.removeEvent(evt, $scope.onEventComplete);
    });
  };


  $scope.addDetail = function() {
    swal.withForm({
      title: 'Add an Event',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Add Data',
      closeOnConfirm: true,
      formFields: [
        { id: 'etype', type: 'select', required: true, options: [
            {value: '', text: 'Please select one'},
            {value: 'feeding', text: 'Feeding'},
            {value: 'diaper Change', text: 'Diaper Change'},
            {value: 'medical', text: 'Medical'},
            {value: 'dental', text: 'Dental'},
            {value: 'milestone', text: 'Milestone'},
            {value: 'metrics', text: 'Metrics'},
            {value: 'other', text: 'Other'}
        ]},
        { id: 'date', placeholder: 'Date', required: true},
        { id: 'time', placeholder: 'Time', required: true },
        { id: 'note', type: 'textarea', required: true }


      ]
    },

    function (isConfirm) {
      if (isConfirm === true) {
      var person = {};
      person = this.swalForm;
      if (person.etype !== 'empty') {
        person.id = $routeParams.child_id;
        ChildService.addDetail(person, $scope.onEventComplete) ;
      }
     }
    }
  );
  };
//==end of swal form==
//pagination
$scope.search = {};

  $scope.resetFilters = function () {
      // needs to be a function or it won't trigger a $watch
      $scope.search = {};
  };


$scope.entryLimit = 3;
$scope.currentPage = 0;
$scope.totalLeadItems = $scope.eventsList.events.length;

  $scope.range = function() {
    var rangeSize = 3;
    var ps = [];
    var start;

    start = $scope.currentPage;
    if ( start > $scope.pageCount()-rangeSize ) {
      start = $scope.pageCount()-rangeSize+1;
    }
    for (var i=start; i<start+rangeSize; i++) {
      ps.push(i);
    }
    return ps;
  };

  $scope.prevPage = function() {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };
    $scope.pageCount = function() {
      return Math.ceil($scope.totalItems / $scope.entryLimit)-1;
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.setPage = function(n) {
    $scope.currentPage = 0;
  };

//end of pagination

}]);
