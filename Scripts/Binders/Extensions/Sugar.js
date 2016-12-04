Binder.prototype.passive = function (fn) {
    fn.passive = true;
    this.attach(fn);
}
Binder.prototype.field = function (name) {
    var exist = this[name];
    if (exist) return exist;
    return this[name] = new SingleBinder(field, [this, name]);
}
Binder.prototype.fields = function () {
    for (var q = arguments.length; q--;)
        this.field(arguments[q]);
}
Function.prototype.binder = function () {
    return Binder(this,arguments);
};