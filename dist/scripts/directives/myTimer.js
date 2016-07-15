(function() {
  angular
    .module('myTime')
    .directive('myTimer', ['$interval', 'FIXED_NUM', 'TIMER_MSG', 'SoundPlayer', myTimer]);

  function myTimer($interval, FIXED_NUM, TIMER_MSG, SoundPlayer) {
    return {
      templateUrl: '/templates/directives/my_timer.html',
      replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {
        var timeoutId = null;
        var wholeSeconds = FIXED_NUM.WORK_TIME * 60;
        var sessionCount = 1;

        scope.onBreak       = false;
        scope.run           = false;
        scope.init          = true;
        scope.msgForSession = TIMER_MSG.SESSION_MSG;
        scope.msgForBreak   = TIMER_MSG.BREAK_MSG;
        scope.formatted     = wholeSeconds;

        scope.start = function() {
          runTimer();
          scope.run = true;
          scope.init = false;
        };

        scope.pause = function() {
          stopTimer();
          scope.run = false;
        };

        scope.resume = function() {
          runTimer();
          scope.run = true;
        };

        scope.reset = function() {
          if (scope.onBreak) {
            wholeSeconds = FIXED_NUM.BREAK_TIME * 60;
          } else {
            wholeSeconds = FIXED_NUM.WORK_TIME * 60;
          }
          stopTimer();
          scope.formatted = wholeSeconds;
          scope.run = false;
          scope.init = true;
        };

        scope.$watch('formatted', function(newVal) {
          if (newVal === 0) {
            SoundPlayer.play();
          }
        });

        function runTimer() {
          timeoutId = $interval(function() {
            if (wholeSeconds > 0) {
              wholeSeconds--;
            } else {
              scope.onBreak = !scope.onBreak;
              if (scope.onBreak) {
                wholeSeconds = getBreakTime() * 60;
              } else {
                wholeSeconds = FIXED_NUM.WORK_TIME * 60;
              }
              stopTimer();
              scope.run = false;
              scope.init = true;
            }
            scope.formatted = wholeSeconds;
          }, 1000);
        }

        function stopTimer() {
          $interval.cancel(timeoutId);
          timeoutId = undefined;
        }

        function getBreakTime() {
          var time;
          if (sessionCount < FIXED_NUM.SESSION_CYCLE) {
            scope.msgForBreak = TIMER_MSG.BREAK_MSG;
            time = FIXED_NUM.BREAK_TIME;
            sessionCount++;
          } else {
            scope.msgForBreak = TIMER_MSG.LONG_BREAK_MSG;
            time = FIXED_NUM.LONG_BREAK;
            sessionCount = 1;
          }
          return time;
        }

        element.on('$destroy', function() {
          stopTimer();
        });
      } // end link
    }; // end return
  } // end myTimer
})();
