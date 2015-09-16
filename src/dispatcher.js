angular.module("ngFlux")
  .factory("dispatcher", function(){
    var _callbacks = [];
    return {
      register: function(fn){
        _callbacks.push(fn);
      },
      dispatch: function(action){
        _callbacks.map(function(cb){
          cb(action);
        })
      }
    }
  });