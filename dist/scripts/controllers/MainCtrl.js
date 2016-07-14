(function() {
  angular
    .module('myTime')
    .controller('MainCtrl', ['Tasks', MainCtrl]);

  function MainCtrl(Tasks) {
    this.tasks = Tasks;
    this.addTask = Tasks.add;
  }
})();
