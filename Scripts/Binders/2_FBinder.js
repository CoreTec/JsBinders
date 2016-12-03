function FBinder(fn, args) {
    Binder.call(this, undefined);
    this.fn = fn;
    this.active = 0;
    if (!Array.isArray(args) || arguments.length > 2)
        args = Array.prototype.slice.call(arguments,1);
    this.initArguments(args);
    this.initReload();
}

apply(FBinder.prototype = Object.create(Binder.prototype),
    {
        constructor: FBinder,
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
        initArguments: function (args) {
            this.argumentBinders = [];
            this.arguments = new Array(args.length);
            this.priority = 0;
            for (var q = args.length; q--;) {
                var arg = args[q];
                if (arg instanceof Binder) {
                    if (this.priority < arg.priority)
                        this.priority = arg.priority;
                    this.argumentBinders.push({
                        id: q,
                        binder: arg,
                        handler: this.getArgumentHandler(q)
                    });
                    arg = arg._value;
                }
                this.arguments[q] = arg;
            }
            this.priority++;
        },
        getArgumentHandler: function (id) {
            var me = this;
            return function (value) {
                me.arguments[id] = value;
                me.reload();
            }
        },
        attachArguments: function () {
            var needUpdate = false;
            for (var q = this.argumentBinders.length; q--;) {
                var arg = this.argumentBinders[q];
                if (arg.version !== arg.binder.version) {
                    needUpdate = true;
                    this.arguments[arg.id] = arg.binder._value;
                }
                arg.binder.attach(arg.handler);
            };
            if (needUpdate || this.version === 0)
                this.reload();
        },
        detachArguments: function () {
            for (var q = this.argumentBinders.length; q--;) {
                var arg = this.argumentBinders[q];
                arg.version = arg.binder.version;
                arg.binder.detach(arg.handler);
            };
        },
        attach: function (fn) {
            if (!fn.passive) {
                if (this.active === 0)
                    this.attachArguments();
                this.active++;
            }
            Binder.prototype.attach.call(this, fn);
        },
        detach: function (fn) {
            if (!fn.passive) {
                this.active--;
                if (this.active === 0)
                    this.detachArguments();
            }
            Binder.prototype.detach.call(this, fn);
        },
        get: function (callback) {
            if (this.active && this._value !== Loading) {
                if (callback)
                    return callback(this._value);
                return this._value;
            }

            if (!this.active) {
                var needUpdate = false;
                for (var q = this.argumentBinders.length; q--;) {
                    var arg = this.argumentBinders[q];
                    if (arg.version !== arg.binder.version) {
                        needUpdate = true;
                        break;
                    }
                }
                if (!needUpdate) {
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
            Binder.prototype.set.apply(this, arguments);
            if (!this.fn.set) return;

            var args = this.arguments.slice(0);
            args.splice(0,0,value);
            var res = this.fn.set.apply(this, args);
            
            for (var q = this.argumentBinders.length; q--;) {
                var arg = this.argumentBinders[q];
                var update = res[arg.id];
                this.arguments[arg.id] = update;

                if (update === Reload) arg.binder.fireUpdate(arg.handler);
                else arg.binder.set(update, arg.handler);
            }
        }
    });