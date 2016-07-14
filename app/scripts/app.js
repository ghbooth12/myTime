(function() {
  angular
    .module('myTime', ['ui.router', 'firebase'])
    .constant('INITIAL_MINUTES', {
      'WORK_TIME': 25,
      'BREAK_TIME': 5,
      'LONG_BREAK': 30
    })
    .config(config);

  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainCtrl as main',
        templateUrl: '/templates/main.html'
      });
  }
})();
