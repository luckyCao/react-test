function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}
function extend(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  var source, prop;
  for (var i = 1, length = arguments.length; i < length; i++) {
    source = arguments[i];
    for (prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        obj[prop] = source[prop];
      }
    }
  }
  return obj;
}

function isFunction( obj ) {
  return typeof obj === "function";
}

function Identity( v ) {
  return v;
}
function Callbacks(options) {
  var list = [],
    queue = [],
    firingIndex = -1,
    memory,
    fired,
    firing,
    locked,
    fire = function() {
      locked = options.once;
      fired = firing = true;
      for (;queue.length; firingIndex = -1) {
        memory = queue.shift()
        while( ++firingIndex < list.length) {
          list[firingIndex].apply(memory[0], memory[1])
        }
      }
      if ( !options.memory ) {
        memory = false;
      }
      firing = false;
    },
    self = {
      add: function() {
        if (list) {
          if ( memory && !firing ) {
            firingIndex = list.length - 1;
            queue.push( memory );
          }
          let length = arguments.length
          for (let i = 0; i < length; i++){
            list.push(arguments[i])
          }
        }
        if (memory && !firing) {
          fire()
        }
        return this
      },
      fire: function(){
        self.fireWith(this, arguments)
        return this
      },
      fireWith: function(context, args){
        if ( !locked ) {
          args = args || [];
          args = [context, args.slice ? args.slice() : args];
          queue.push(args);
          if (!firing) {
            fire();
          }
        }
        return this
      },
      disable: function() {
        locked = queue = [];
        list = memory = "";
        return this;
      },
      lock: function() {
        locked = queue = [];
        if ( !memory && !firing ) {
          list = memory = "";
        }
        return this;
      }
    }

  return self
}
function Deferred(func) {
  var tuples = [
      // action, add listener, callbacks,
      // ... .then handlers, argument index, [final state]
      [ "resolve", "done", Callbacks( "once memory" ),
        Callbacks( "once memory" ), 0, "resolved" ],
      [ "reject", "fail", Callbacks( "once memory" ),
        Callbacks( "once memory" ), 1, "rejected" ]
    ],
    state = "pending",
    deferred = {},
    promise = {
      then: function(onFulfilled, onRejected){
        function resolve(depth, deferred, handler) {
          return function() {

          }
        }
        return new Deferred(function(newDefer){
          tuples[ 0 ][ 3 ].add(
            resolve(
              0,
              newDefer,
              isFunction( onFulfilled ) ?
                onFulfilled :
                Identity
            )
          );
        }).promise()
      },
      promise: function( obj ) {
        return obj != null ? extend( obj, promise ) : promise;
      }
    };
  tuples.forEach(function(tuple, i){
    var list = tuple[ 2 ],
      stateString = tuple[ 5 ];
    deferred[tuple[1]] = list.add;
    if ( stateString ) {
      list.add(function() {
        state = stateString;
      })
      list.add(
        // rejected_callbacks.disable
        // fulfilled_callbacks.disable
        tuples[ 1 - i ][ 2 ].disable
      );
    }
    deferred[ tuple[ 0 ] ] = function() {
      deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
      return this;
    };

    // deferred.resolveWith = list.fireWith
    // deferred.rejectWith = list.fireWith
    deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
  })
  return deferred
}


$(function() {
  var deferred = $.Deferred()
  deferred.resolve(2)
  deferred.done(function(value){
    console.log(value)
  })
  setTimeout(function(){
    deferred.resolve(1)
  }, 1000)
})
