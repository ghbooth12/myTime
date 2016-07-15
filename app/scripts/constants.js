(function() {
  angular
    .module('constants', [])
    .constant('FIXED_NUM', {
      'WORK_TIME': 25,
      'BREAK_TIME': 5,
      'LONG_BREAK': 30,
      'SESSION_CYCLE': 4
    })
    .constant('TIMER_MSG', {
      'SESSION_MSG': "Work",
      'BREAK_MSG': 'Break',
      'LONG_BREAK_MSG': 'Enjoy your long break!'
    });
})();
