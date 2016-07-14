(function() {
  angular
    .module('myTime', ['ui.router', 'firebase'])
    .constant('INITIAL_MINUTES', {
      'WORK_TIME': 0.25,
      'BREAK_TIME': 0.05,
      'LONG_BREAK': 0.1
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
