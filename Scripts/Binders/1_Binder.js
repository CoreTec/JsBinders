function Binder(value) {
    this.version = 0;
    this.handlers = [];
    this._value = value; 
}
Binder.prototype = Object.create({
        fireUpdate: function (source,oldvalue) {
            for (var q = this.handlers.length; q--;) {
                var H = this.handlers[q];
                if (H === source) continue;
                H.call(this, this._value, oldvalue);
            }      
        },
        detach: function (fn) {
            this.handlers.splice(this.handlers.indexOf(fn),1);
        },
        attach: function (fn) {
            this.handlers.push(fn);
            //fn.call(this, this.value);
        },
        set: function (value,source) {
            if (this._value === value) return NoChanges;
            var old = this._value;
            this._value = value;
            this.version++;
            this.fireUpdate(source,old);
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