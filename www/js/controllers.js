angular.module('mdl.controllers', ['mdl.service', 'ngCookies'])

.service('cookieService', function(){
	var logged;
	return {
		getLoggedStatus: function(){
			return logged;
		},
		setLoggedStatus: function(status){
			logged = status;
		}
	}
})

.controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', 'MdlService', '$cookieStore', 'cookieService', '$location',  function($scope, $ionicModal, $timeout, MdlService, $cookieStore, cookieService, $location) {
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
  $scope.doLogin = function()
  {
  MdlService.login($scope.loginData.username, $scope.loginData.password)
  .then(function success(success){
    console.log(success);
    if (success.code == 200) {

    // Création des cookies
    $cookieStore.put("Token", success.token.token);
    $cookieStore.put("User", success.token.user);
    console.log($cookieStore.get("Token"));
    console.log($cookieStore.get("User"));
    $scope.logged = cookieService.setLoggedStatus(true);
    // On redirige vers l'accueil et on recharge pour prendre en compte les cookies fraichement créés.
    $location.path('/');
    location.reload();
    }
  },
  function error(error){
    console.log("ERROR \n");
    console.log(error);
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

.controller('LigueCtrl', ['$scope', '$stateParams', 'MdlService', function($scope, $stateParams, MdlService) {
          var idLeague = $stateParams.ligueId;

          console.log($stateParams);

          MdlService.getLeague(idLeague).then( function success(success) {
            console.log(success);
      			$scope.leagueName = success.league.name;
      			$scope.leaguePresident = success.league.president.name;
      			$scope.leagueEmail = success.league.email;
      			$scope.leaguePhoneNumber = success.league.phone_number;
      			$scope.leagueDescription = success.league.description;

      		},function error(err){
      			console.log(error);
      		});


}]);
