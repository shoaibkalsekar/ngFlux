// (function(){

  var ngFlux = angular.module("ngFlux", []);

  ngFlux.factory("eventEmitter", function($rootScope){
    var _callbacks = [];
    return {
      emit: function(event_name){
        $rootScope.$emit(name)
      },
      on: function(event_name, callback){
        var _callback = {
          fn: callback,
          removeFn: $rootScope.$on(event_name, callback)
        };
        _callbacks.push(_callback);
      },
      remove: function(fn){
        var _arr = _callbacks;
        _callbacks.map(function(cb, i){
          if(cb.fn.toString() === fn.toString()){
            cb.removeFn();
            _arr.splice(i, 1);
          }
        })
      }
    }
  })

  ngFlux.factory("dispatcher", function(){
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

  ngFlux.factory("store", function(dispatcher, eventEmitter){
    var Store = {};
    var CHANGE_EVENT = "CHANGE_EVENT";
    var storeMethods = {
      // Generic methods that all stores should have
      // TODO: Have only 3 generic methods snapshot(), restore(), clear()
      init: function(){},
      set: function(data){
        var arr = data.data;
        this._data = arr;
      },
      add: function(item){
        this._data.push(item);
      },
      all: function(){
        return this._data;
      },
      get: function(id){
        return this._data.filter(function(item){
          return item.id === id
        })[0]
      },
      addChangeListener: function(fn){
        this.on(CHANGE_EVENT, fn);
      },
      removeChangeListener: function(fn){
        this.remove(CHANGE_EVENT, fn);
      },
      emitChange: function(){
        this.emit(CHANGE_EVENT);
      },
      bind: function(actionType, actionFn){
        if(this.actions[actionType])
          this.actions[actionType].push(actionFn);
        else
          this.actions[actionType] = [actionFn];
      }
    };

    Store.extend = function(name, methods){
      // Constructor function
      // This extend method will allow
      // other stores that are created
      // to use the pub-sub pattern

      store = {
        _name: name,
        _data: [],
        actions: {}
      }

      // Assign simply copies one object's properties onto another
      // here EventEmitterProto, storeMethods and methods(custom) are copied into store
      // assign(store, EventEmitterProto, storeMethods, methods);
      angular.extend(store, eventEmitter, storeMethods, methods);

      store.init();

      dispatcher.register(function(action){
        console.log("In Dispatcher:", action);
        if(store.actions[action.actionType]){
          store.actions[action.actionType].forEach(function(fn){
            fn.call(store, action.data);
            store.emitChange();
          })
        }
      });

      return store;

    }

    return Store;

  });

// })