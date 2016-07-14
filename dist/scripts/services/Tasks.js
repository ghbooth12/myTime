(function() {
  angular
    .module('myTime')
    .factory('Tasks', ['$firebaseArray', Tasks]);

  function Tasks($firebaseArray) {
    var ref = new Firebase('https://my-time-8059d.firebaseio.com');
    var tasks = $firebaseArray(ref.child('tasks'));

    var tasksObj = {
      all: tasks,
      add: function(taskItem) {
        if (taskItem) {
          tasks.$add({
            item: taskItem,
            createdAt: new Date().getTime()
          });
          this.taskItem = null;
        }
      }
    };

    return tasksObj;
  }
})();
