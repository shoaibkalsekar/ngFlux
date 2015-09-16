angular.module("ngFlux")
  .factory("eventEmitter", function($rootScope){
    var _callbacks = [];
    return {
      emit: function(event_name){
        $rootScope.$emit(event_name)
      },
      on: function(event_name, callback){
        var _callback = {
          fn: callback,
          removeFn: $rootScope.$on(event_name, callback)
        };
        _callbacks.push(_callback);
      },
      remove: function(fn){
        // yet to test remove
        var _arr = _callbacks;
        _callbacks.map(function(cb, i){
          if(cb.fn.toString() === fn.toString()){
            cb.removeFn();
            _arr.splice(i, 1);
          }
        })
      }
    }
  });