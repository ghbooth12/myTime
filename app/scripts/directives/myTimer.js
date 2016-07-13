(function() {
  angular
    .module('myTime')
    .directive('myTimer', ['$interval', 'INITIAL_MINUTES', myTimer]);

  function myTimer($interval, INITIAL_MINUTES) {
    var formatTimer = function(seconds) {
      var min = Math.floor(seconds / 60);
      var sec = seconds % 60;

      if (min < 10) { min = "0" + min; }
      if (sec < 10) { sec = "0" + sec; }

      return min + ":" + sec;
    };

    return {
      templateUrl: '/templates/directives/my_timer.html',
      replace: true,
      restrict: 'E',
      scope: {},
      link: function(scope, element, attrs) {
        var timeoutId = null;
        var wholeSeconds = INITIAL_MINUTES.WORK_TIME * 60;

        scope.onBreak = false;
        scope.run = false;
        scope.init = true;
        scope.formatted = formatTimer(wholeSeconds);

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
          scope.formatted = formatTimer(wholeSeconds);
          scope.run = false;
          scope.init = true;
        };


        function runTimer() {
          timeoutId = $interval(function() {
            if (wholeSeconds > 0) {
              wholeSeconds--;
              scope.formatted = formatTimer(wholeSeconds);
            } else {
              scope.onBreak = !scope.onBreak;
              scope.reset();
            }
          }, 1000);
        }

        function stopTimer() {
          $interval.cancel(timeoutId);
          timeoutId = undefined;
        }

        element.on('$destroy', function() {
          stopTimer();
        });
      } // end link
    }; // end return
  } // end myTimer
})();
