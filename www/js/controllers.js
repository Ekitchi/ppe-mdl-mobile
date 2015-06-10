angular.module('mdl.controllers', ['mdl.service', 'ngCookies', 'ui.router'])
    .service('cookieService', function() 
    {
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

    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', 'MdlService', '$cookieStore', 'cookieService', '$location', '$state', '$window', function($scope, $ionicModal, $timeout, MdlService, $cookieStore, cookieService, $location, $state, $window)
    {

      $scope.loggedIn;
      $scope.profilId;

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

      $scope.logout = function()
      {
        $cookieStore.remove("Token");
        $cookieStore.remove("User");
        $cookieStore.remove("User_id");
        alert('Vous vous êtes bien déconnecté');
        $scope.loggedIn = false;
        $scope.logged = cookieService.setLoggedStatus(false);        
        $location.path('/');

        $window.location.reload(true);        

      }

        $scope.isLogged = function()
        {
          if(angular.isDefined($cookieStore.get("User")))
            { return true; }
          return false;
        }
      // Perform the login action when the user submits the login form
      $scope.doLogin = function()
      {
        MdlService.login($scope.loginData.username, $scope.loginData.password)
          .then
          (
            function success(requestResponse)
            {
              console.log(requestResponse);
              if (requestResponse.code == 200)
              {
                // Création des cookies
                $cookieStore.put("Token", requestResponse.token.token);
                $cookieStore.put("User", requestResponse.token.user);
                $cookieStore.put("User_id", requestResponse.token.user.id);
                $scope.logged = cookieService.setLoggedStatus(true);
                $scope.loggedIn = true;

                $scope.userCookie = $cookieStore.get("User");
                $scope.profilId = $scope.userCookie.id;


                console.log($cookieStore.get("Token"));
                console.log($cookieStore.get("User"));

                // On redirige vers l'accueil et on recharge pour prendre en compte les cookies fraichement créés.
                alert($scope.isLogged());
                $scope.closeLogin();
                $state.reload();
                $location.path('/');

              }
            },



            function error(err)
            {console.log(err);});
      };




    }
    ])  // .controller END

    .controller('LiguesCtrl', ['$scope', 'MdlService', function($scope, MdlService)
    {
      MdlService.getLeagueList().then(function success(requestResponse)
          {
            console.log(requestResponse);
            $scope.ligues = requestResponse.leagues;
          },

          function error(err)
          {console.log(err);});
    }]) // .controller END
    .controller('EventsCtrl', ['$scope', 'MdlService', function($scope, MdlService)
    {
      MdlService.getEventList().then(function success(requestResponse)
          {
            console.log(requestResponse);
            $scope.events = requestResponse.events;
          },

          function error(err)
          {console.log(err);});
    }])

    .controller('ProfilCtrl', ['$scope', '$stateParams', 'MdlService', '$cookieStore', function($scope, $stateParams, MdlService, $cookieStore)
    {
      //$scope.profil; 
      var idProfil = $scope.profilId;

      //var idProfil = $stateParams.profilId
      //console.log(idProfil);

        MdlService.getUser(idProfil)
        .then
        ( 
          function success(requestResponse)
          {
            console.log(requestResponse.user);
            $scope.profil = requestResponse.user;
            alert("succès affichage user")
          },
          function error(err)
            { console.log(err);
              alert(idProfil) }
        );

    }]) // .controller END

    .controller('HomeCtrl', ['$scope', 'MdlService','$window', '$state', function($scope, MdlService, $window, $state) 
    {
        MdlService.getHome().then(function success(requestResponse) 
        {
          $state.reload();          
          console.log(requestResponse);
          $scope.home = requestResponse.home;
        }, 

        function error(err){
        console.log(err);
      })}])



    .controller('EventCtrl', ['$scope', '$stateParams', 'MdlService', function($scope, $stateParams, MdlService)
    {
      $scope.chosenEvent;
      var idEvent = $stateParams.eventId;
      console.log($stateParams);

      MdlService.getEvent(idEvent).then( function success(requestResponse)
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

      MdlService.getLeague(idLeague).then( function success(requestResponse)
          {
            $scope.chosenLigue = success;

          }

          ,function error(err)
          {console.log(err);}
      ); //getLeague END
    }]);// .controller END
