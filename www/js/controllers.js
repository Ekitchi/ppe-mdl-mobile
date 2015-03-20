angular.module('mdl.controllers', ['mdl.service'])

.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', 'MdlService', function($scope, $ionicModal, $timeout, MdlService) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    MdlService.login($scope.loginData.username, $scope.loginData.password).then(function success(success){
      console.log(success);
      $scope.closeLogin();
    }, function error(err){
      console.log("error" + err);
    });
  };
}])

.controller('LiguesCtrl', ['$scope', 'MdlService', function($scope, MdlService) {

        MdlService.getLeagueList().then(function success(success) {
        console.log(success);
        $scope.ligues = success.leagues;
      }, function error(err){
        console.log(err);
      });
}])

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
