function SingleBinder(fn, args) {
    this.handlers = [];
    this.fn = fn;
    this.arguments = args;    
    this.initArguments();
    this.initReload();
}

apply(SingleBinder.prototype = Object.create(Binder.prototype),
    {
        active:0,
        constructor: SingleBinder,
        callstack: new CallStack(),
        initReload: function () {
            var me = this;
            var reload = function () {
               Binder.prototype.set.call(me, me.fn.apply(me, me.arguments));
            }
            reload.priority = me.priority;
            this.reload = function () {
                me.callstack.add(reload);
            }
        },
        initArguments: function () {
            var me = this;
            for (var q = me.arguments.length; q--;)
                if(me.arguments[q] instanceof Binder)
                {
                    me.argumentBinder = me.initArgumentBinder(me.arguments[q],q);
                    break;
                }
            me.priority++;
        },
        initArgumentBinder: function (binder, id) {
            var me = this;
            var version = null;
            me.arguments[id] = binder._value;
            if (me.priority < binder.priority)
                me.priority = binder.priority;
            var handler = function (value) {
                version = binder.version;
                me.arguments[id] = value;
                me.reload();
            };
            var scope = me.fn.simple?(handler.scope = scope = me.fn):handler;
            return {
                id: id,
                binder:binder,
                outdated:function(){
                    return version !== binder.version;
                },
                set: function (value) {
                    if (value === Reload)
                        return binder.fireUpdate(scope);
                    if (binder.set(value, scope) === NoChanges)
                        return;
                    me.arguments[id] = value;
                },
                attach: function () {
                    binder.attach(handler);
                    if (version === binder.version) return true;
                    me.arguments[id] = binder._value;
                },
                detach: function () {
                    binder.detach(handler);
                }
            };
        },
        attachArguments: function () {
            if (!this.argumentBinder.attach() || this.version === 0)
                this.reload();
        },
        detachArguments: function () {
            this.argumentBinder.detach();
        },
        attach: function (fn) {
            this.handlers.push(fn);
            if (fn.passive || this.active++ !== 0) return;
            this.attachArguments();
        },
        detach: function (fn) {
            this.handlers.remove(fn);
            if (fn.passive || --this.active !== 0) return
            this.detachArguments();
        },
        needUpdate: function () {
            return this.argumentBinder.outdated();
        },
        get: function (callback) {
            if (this.active /*&& this._value !== Loading*/) {
                if (callback)
                    return callback(this._value);
                return this._value;
            }

            if (!this.active) {
                if (!this.needUpdate()) {
                    if (callback)
                        return callback(this._value);
                    return this._value;
                }

                if (!callback)
                    return Outdated;
            }

            var me = this;
            var fn = function (value) {
                callback(value);
                me.detach(fn);
            }
            me.attach(fn);
        },
        set: function(value,source)
        {
            if (Binder.prototype.set.apply(this, arguments) === NoChanges) return NoChanges;
            if (!this.fn.set) return;
            var args = this.arguments.clone();
            args.insert(0,value);
            this.argumentBinder.set(this.fn.set.apply(this, args));
        }
    });