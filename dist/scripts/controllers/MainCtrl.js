(function() {
  angular
    .module('myTime')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl() {
    this.run = false;
    this.init = true;
  }
})();
