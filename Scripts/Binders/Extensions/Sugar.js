Binder.prototype.passive = function (fn) {
    fn.passive = true;
    this.attach(fn);
}