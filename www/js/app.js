angular.module('memote', ['ionic', 'memote.controllers', 'memote.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('today', {
    url: '/today',
    abstract:true,
    templateUrl: "templates/today.html"
  })
  .state('today.mood', {
    url: '/mood',
    views: {
      'today-view': {
        templateUrl: 'templates/today-mood.html',
        controller: 'MoodCtrl'
      }
    }
  })
  .state('today.q', {
    url: '/q/:order',
    views: {
      'today-view': {
        templateUrl: 'templates/today-q.html',
        controller: 'QCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive
  .state('stats', {
    url: "/stats",
    abstract: true,
    templateUrl: "templates/stats.html"
  })

  // Each tab has its own nav history stack:
  .state('stats.day', {
    url: '/day',
    views: {
      'stats-day': {
        templateUrl: 'templates/stats-day.html',
        controller: 'DayCtrl'
      }
    }
  // })

  // .state('stats.week', {
  //     url: '/week',
  //     views: {
  //       'stats-week': {
  //         templateUrl: 'templates/stats-week.html',
  //         controller: 'WeekCtrl'
  //       }
  //     }
  //   })
  //   .state('stats.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'stats-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('stats.month', {
  //   url: '/month',
  //   views: {
  //     'stats-month': {
  //       templateUrl: 'templates/stats-month.html',
  //       controller: 'MonthCtrl'
  //     }
  //   }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/today/mood');

});
