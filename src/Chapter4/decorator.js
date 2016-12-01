function decorate(handle, entryArgs) {
  return function () {
    return handle.apply(undefined, Array.prototype.slice.call(arguments).concat([entryArgs]));
  }
}
function handle(target, key, descriptor, msg) {
  return Object.assign({}, descriptor, {
    value: function wrapper(){
      console.log('wrapper'+msg)
      return descriptor.value.apply(this, arguments)
    }
  })
}

function maidian(args) {
  return decorate(handle, args);
}

var test = {
  a: function(){
    console.log(111)
  }
}

function applyDecoratedDescriptor(target, property, decorators, descriptor) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);
  Object.defineProperty(target, property, desc);
}

applyDecoratedDescriptor(test, 'a', [maidian('maidian')], Object.getOwnPropertyDescriptor(test, 'a'))

test.a()

function decorate(handle, entryArgs) {
  return function () {
    return handle.apply(undefined, Array.prototype.slice.call(arguments).concat([entryArgs]));
  }
}
function handle(target, key, descriptor, msg) {
  return Object.assign({}, descriptor, {
    value: function wrapper(){
      console.log('wrapper'+msg)
      return descriptor.value.apply(this, arguments)
    }
  })
}

function maidian(args) {
  return decorate(handle, args);
}

var test = {
  a: function(){
    console.log(111)
  }
}

function applyDecoratedDescriptor(target, property, decorators, descriptor) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);
  Object.defineProperty(target, property, desc);
  return desc
}

applyDecoratedDescriptor(test, 'a', [maidian('maidian')], Object.getOwnPropertyDescriptor(test, 'a'))

test.a()

