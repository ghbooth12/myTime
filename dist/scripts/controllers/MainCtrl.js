(function() {
  angular
    .module('myTime')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl() {
    this.onBreak = false;
  }
})();
