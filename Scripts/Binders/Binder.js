function Binder(value) {
    this.version = 0;
    this.handlers = [];
    this._value = value; 
}
Binder.prototype = Object.create({
        fireUpdate: function () {
            for (var q = this.handlers.length; q--;) 
                this.handlers[q].call(this, this._value);        
        },
        detach: function (fn) {
            this.handlers.splice(this.handlers.indexOf(fn),1);
        },
        attach: function (fn) {
            this.handlers.push(fn);
            //fn.call(this, this.value);
        },
        set: function (value) {
            if (this._value === value) return NoChanges;
            this._value = value;
            this.version++;
            this.fireUpdate();
        },
        get: function (callback) {
            if (callback)
                callback(this._value);
            else return this._value;
        }
    },
    {
        value: {
            get: function () { return this.get(); },
            set: function (value) { this.set(value); }
        }
    });