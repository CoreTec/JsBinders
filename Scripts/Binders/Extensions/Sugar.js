Binder.prototype.passive = function (fn) {
    fn.passive = true;
    this.attach(fn);
}
Binder.prototype.field = function (name) {
    return new FBinder(field, this, name);
}

Function.prototype.binder = function () {
    return new FBinder(this, Array.prototype.slice.call(arguments));
};