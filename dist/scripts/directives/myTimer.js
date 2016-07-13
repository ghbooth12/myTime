(function() {
  angular
    .module('myTime')
    .directive('myTimer', ['$interval', myTimer]);

  function myTimer($interval) {
    return {
      scope: {},
      link: function(scope, element, attrs) {
        var initialMin = 25;
        var wholeSeconds = initialMin * 60;
        var timeoutId = null;

        attrs.$observe('run', function(str) {
          var bool = (str === "true");
          scope.run = bool;

          if (scope.run) {
            stopTimer();
            formatTimer(wholeSeconds);
          } else if (!scope.run && !scope.init) {
            runTimer();
          }
        });

        attrs.$observe('init', function(str) {
          var bool = (str === "true");
          scope.init = bool;

          if (scope.init) {
            wholeSeconds = initialMin * 60;
            stopTimer();
            formatTimer(wholeSeconds);
          } else if (!scope.run && !scope.init) {
            runTimer();
          }
        });

        function runTimer() {
          timeoutId = $interval(function() {
            if (wholeSeconds > 0) {
              wholeSeconds--;
            } else {
              stopTimer();
            }
            formatTimer(wholeSeconds);
          }, 1000);
        }

        function stopTimer() {
          $interval.cancel(timeoutId);
          timeoutId = undefined;
        }

        element.on('$destroy', function() {
          stopTimer();
        });

        function formatTimer(seconds) {
          var min = Math.floor(seconds / 60);
          var sec = seconds % 60;

          if (min < 10) { min = "0" + min; }
          if (sec < 10) { sec = "0" + sec; }

          element.text(min + ":" + sec);
        }
      }
    };
  }
})();
