Binder.prototype.log = function (text) {
    if (!text) text = 'Value changed from %s to %s';
    this.passive(function (value,old) {
        console.log(text, value, old);
    });
}