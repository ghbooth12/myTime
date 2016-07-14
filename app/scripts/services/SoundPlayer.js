(function() {
  angular
    .module('myTime')
    .factory('SoundPlayer', SoundPlayer);

  function SoundPlayer() {
    var soundPlayerObj = {};
    var soundFile = null;
    var soundUrl = '/assets/music/ding';

    var setSong = function() {
      soundFile = new buzz.sound(soundUrl, {
        formats: ['mp3'],
        preload: true
      });
    };

    soundPlayerObj.play = function() {
      setSong();
      soundFile.play();
    };

    return soundPlayerObj;
  }
})();
