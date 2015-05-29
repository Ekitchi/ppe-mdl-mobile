// Ionic mdl App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mdl' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'mdl.controllers' is found in controllers.js
angular.module('mdl', ['ionic', 'mdl.controllers', 'mdl.service'])

    .run(function($ionicPlatform)
    {
      $ionicPlatform.ready(function()
      {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard)
        {cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);}

        if (window.StatusBar)
        {// org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })

    .config(function($stateProvider, $urlRouterProvider)
    {
      $stateProvider

          .state('app',
          {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
          })

          .state('app.search',
          {
            url: "/search",
            views:
            {'menuContent':
            {templateUrl: "templates/search.html"}
            }
          })

          .state('app.home',
          {
            url: "/home",
            views:
            {'menuContent':
            {templateUrl: "templates/home.html"}
            }
          })

          .state('app.browse',
          {
            url: "/browse",
            views:
            {'menuContent':
            {templateUrl: "templates/browse.html"}
            }
          })

          .state('app.ligues',
          {
            url: "/ligues",
            views:
            {'menuContent':
            {
              templateUrl: "templates/ligues.html",
              controller: 'LiguesCtrl'
            }
            }
          })

          .state('app.ligue',
          {
            url: "/ligue/:ligueId",
            views: {
              'menuContent': {
                templateUrl: "templates/ligue.html",
                controller: 'LigueCtrl'
              }
            }
          })

          .state('app.profil',
          {
            url: "/profil/:profilId",
            views:
            {'menuContent':
            {
              templateUrl: "templates/profil.html",
              controller: 'ProfilCtrl'
            }
            }
          })


          .state('app.single',
          {
            url: "/ligue/:ligueId",
            views:
            {'menuContent':
            {
              templateUrl: "templates/ligue.html",
              controller: 'LigueCtrl'
            }
            }
          });
      // if none of the above states are matched, use this as the fallback

      $urlRouterProvider.otherwise('/app/home');
    });
