Object.prototype.cut = function (name) {
    var val = this[name];
    delete this[name];
    return val;
}