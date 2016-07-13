(function() {
  angular
    .module('myTime')
    .filter('timecode', timecode);

  function timecode() {
    return function(seconds) {
      var min = Math.floor(seconds / 60);
      var sec = seconds % 60;

      if (sec < 10) { sec = "0" + sec; }

      return min + ":" + sec;
    }
  }
})();
