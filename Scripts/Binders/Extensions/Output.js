Binder.prototype.toJson =
Binder.prototype.toString = function () {
    if (this.value == null) return 'null';
    return this.value.toString();
}

