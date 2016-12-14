Function.prototype.binder = function () {
    return Binder(this,arguments);
};
apply(Binder.prototype, {
    passive: function (fn) {
        fn.passive = true;
        this.attach(fn);
    },
    field: function (name) {
        var exist = this[name];
        if (exist) return exist;
        return this[name] = new SingleBinder(field, [this, name]);
    },
    fields : function () {
        for (var q = arguments.length; q--;)
            this.field(arguments[q]);
    },
    equal: function (val) {
        return Binder(equal, [this, val]);
    },
    not: function () {
        if (!this._not) this._not = new SingleBinder(not, [this]);
        return this._not;
    },
    cases: function () {
        var args = Array.prototype.slice.call(arguments);
        args.insert(0, this);
        return Binder(cases,args)
    },
    ifelse: function (A, B) {
        return Binder(ifelse, [this, A, B]);
    }
});