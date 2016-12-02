Binder.prototype.toJson =
Binder.prototype.toString = function () {
    if (this.value == null) return 'null';
    return this.value.toString();
}


Function.prototype.binder = function () {
    return new FBinder(this, Array.prototype.slice.call(arguments));
};