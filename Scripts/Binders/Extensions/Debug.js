Binder.prototype.log = function (text) {
    if (!text) text = 'Binder value changed to ';
    this.passive(function (value) {
        console.log(text, value);
    });
}