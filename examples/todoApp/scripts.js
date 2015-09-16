var todoApp = angular.module("todoApp", ["ngFlux"]);

todoApp.constant("constants", {
  ADD_TODO: "ADD_TODO"
});

todoApp.factory("TodoStore", function(store, constants){
  return store.extend("TodoStore", {
    init: function(){
      this.bind(constants.ADD_TODO, this.add);
    },
    getRemaining: function(){
      return this.all().filter(function(todo){ return !todo.completed }).length;
    }
  });
})

todoApp.factory('todoActions', function(dispatcher, constants){
  return {
    addTodo: function(todo){
      dispatcher.dispatch({
        actionType: constants.ADD_TODO,
        data: todo
      });
    }
  }
});

todoApp.controller("todoController", function($scope, dispatcher, TodoStore, todoActions){
  var vm = $scope;
  vm.newTodo = "";
  vm.remainingCount = TodoStore.getRemaining();
  vm.todos = TodoStore.all();

  dispatcher.register(function(action){
    console.debug("DEBUG: ", action);
  });

  TodoStore.addChangeListener(function(){
    console.log("In listener")
    vm.todos = TodoStore.all();
    vm.remainingCount = TodoStore.getRemaining();
  });

  vm.addTodo = function(){
    todoActions.addTodo({
      todo: vm.newTodo,
      completed: false
    });
    vm.newTodo = "";
  }
});