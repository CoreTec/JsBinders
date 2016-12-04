function ValueBinder(value) {
    this.handlers = [];
    this._value = value;
}
ValueBinder.prototype = 
Binder.prototype = Object.create({
        priority: 0,
        version: 0,
        fireUpdate: function (source, oldvalue) {
            //To increase speed
            if (!source)
                for (var q = this.handlers.length; q--;) 
                    this.handlers[q].call(this, this._value, oldvalue);                
            else 
                for (var q = this.handlers.length; q--;) {
                    var H = this.handlers[q];
                    if (H === source || H.scope === source) continue;
                    H.call(this, this._value, oldvalue);
                }
        },
        detach: function (fn) {
            this.handlers.remove(fn);
        },
        attach: function (fn) {
            this.handlers.push(fn);
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