myApp.controller('ResourceController', ['$scope', '$http', '$location', '$routeParams', 'ResourceService' , function($scope, $http, $location, $routeParams, ResourceService) {
    console.log('Resource Control sourced :');
    var resource = {};

    ResourceService.getResources();
    $scope.resourceList = ResourceService.resourceList;
    console.log('resource', ResourceService.resourceList);
    $scope.editResource = ResourceService.editResource;

    //delete event
    $scope.removeResource = function(resource) {
      swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Delete It!",
        closeOnConfirm: false
      },
      function(){
        swal("Deleted!", "Your resource has been deleted.", "success");
        ResourceService.removeResource(resource);
      });
    };

    $scope.addResource = function() {
      swal.withForm({
        title: 'Add a New Resource',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Add Data',
        closeOnConfirm: true,
        formFields: [
          { id: 'title', placeholder: 'title', required: true},
          { id: 'link', placeholder: 'link name'},
          { id: 'note', placeholder: 'Note'}
        ]
      },

      function (isConfirm) {
        if (isConfirm === true) {

        resource = this.swalForm;
         console.log('add data =', resource);
        ResourceService.addResource(resource);

      }
      }
    );
    };


}]);
