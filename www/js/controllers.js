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
    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', 'MdlService', '$cookieStore', 'cookieService', '$location',  function($scope, $ionicModal, $timeout, MdlService, $cookieStore, cookieService, $location)
    {
      // Form data for the login modal
      $scope.loginData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {scope: $scope})
          .then(function(modal)
          {$scope.modal = modal;});

      // Triggered in the login modal to close it
      $scope.closeLogin = function()
      {$scope.modal.hide();};

      // Open the login modal
      $scope.login = function()
      {$scope.modal.show();};

      $scope.logout = function(){
        $cookieStore.remove("Token");
        $cookieStore.remove("User");
      }

      $scope.isLogged = function(){
        if(angular.isDefined($cookieStore.get("User"))){
          return true;
        }
        else return false;
      }


      // Perform the login action when the user submits the login form
      $scope.doLogin = function()
      {
        MdlService.login($scope.loginData.username,
            $scope.loginData.password).then(function success(success)
            {
              console.log(success);
              if (success.code == 200)
              {
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

            function error(err)
            {console.log(err);});
      };
    }])  // .controller END

    .controller('LiguesCtrl', ['$scope', 'MdlService', function($scope, MdlService)
    {
      MdlService.getLeagueList().then(function success(success)
          {
            console.log(success);
            $scope.ligues = success.leagues;
          },

          function error(err)
          {console.log(err);});
    }]) // .controller END
    .controller('EventsCtrl', ['$scope', 'MdlService', function($scope, MdlService)
    {
      MdlService.getEventList().then(function success(success)
          {
            console.log(success);
            $scope.events = success.events;
          },

          function error(err)
          {console.log(err);});
    }])

    .controller('ProfilCtrl', ['$scope', '$stateParams', 'MdlService', '$cookieStore', function($scope, $stateParams, MdlService, $cookieStore)
    {
      var idProfil = $stateParams.profilId;

      console.log($stateParams);
      if(idProfil == "self")
      {$scope.profil = $cookieStore.get("User");}

      else
      {
        MdlService.getUser(idProfil).then( function success(success)
            {
              console.log(success);
              $scope.profil = success.token.user;
            },

            function error(err)
            {console.log(err);});}
    }]) // .controller END

    .controller('HomeCtrl', ['$scope', 'MdlService', function($scope, M2LService) 
    {
        M2LService.getHome().then(function success(success) 
        {
          console.log(success);
          $scope.home = success.home;
        }, 

        function error(err){
        console.log(err);
      })}])



    .controller('EventCtrl', ['$scope', '$stateParams', 'MdlService', function($scope, $stateParams, MdlService)
    {
      $scope.chosenEvent;
      var idEvent = $stateParams.eventId;
      console.log($stateParams);

      MdlService.getEvent(idEvent).then( function success(success)
          {
            $scope.chosenEvent = success;

          }

          ,function error(err)
          {console.log(err);}
      ); //getLeague END
    }])
    .controller('LigueCtrl', ['$scope', '$stateParams', 'MdlService', function($scope, $stateParams, MdlService)
    {
      $scope.chosenLigue;
      var idLeague = $stateParams.ligueId;
      console.log($stateParams);

      MdlService.getLeague(idLeague).then( function success(success)
          {
            $scope.chosenLigue = success;

          }

          ,function error(err)
          {console.log(err);}
      ); //getLeague END
    }]);// .controller END
