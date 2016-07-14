(function() {
  angular
    .module('myTime')
    .directive('myTimer', ['$interval', 'INITIAL_MINUTES', 'SoundPlayer', myTimer]);

  function myTimer($interval, INITIAL_MINUTES, SoundPlayer) {
    return {
      templateUrl: '/templates/directives/my_timer.html',
      replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {
        var timeoutId = null;
        var wholeSeconds = INITIAL_MINUTES.WORK_TIME * 60;
        var sessionCount = 1;

        scope.onBreak = false;
        scope.run = false;
        scope.init = true;
        scope.formatted = wholeSeconds;
        scope.msgForBreak = "Break";

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
            wholeSeconds = INITIAL_MINUTES.BREAK_TIME * 60;
          } else {
            wholeSeconds = INITIAL_MINUTES.WORK_TIME * 60;
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
                wholeSeconds = INITIAL_MINUTES.WORK_TIME * 60;
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
          if (sessionCount < 4) {
            scope.msgForBreak = "Break";
            time = INITIAL_MINUTES.BREAK_TIME;
            sessionCount++;
          } else {
            scope.msgForBreak = "Enjoy your long break!";
            time = INITIAL_MINUTES.LONG_BREAK;
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
