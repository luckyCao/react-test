function decorate(handle, entryArgs) {
  return function () {
    return handle(...arguments, entryArgs);
  }
}
function handle(target, key, descriptor, msg) {
  return {
    ...descriptor,
    value: function maidianWrapper() {
      console.log(msg)
      return descriptor.value.apply(this, arguments);
    }
  };
}

export default function maidian(args) {
  return decorate(handle, args);
}
