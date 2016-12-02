function FBinder(fn, args) {
    Binder.call(this, undefined);
    this.fn = fn;
    this.inCallStack = false;
    this.active = 0;
    if (!Array.isArray(args) || arguments.length > 2)
        args = Array.prototype.slice.call(arguments,1);
    this.initArguments(args);
    this.initReload();
}

FBinder.prototype = Object.create(Binder.prototype);
FBinder.prototype.callstack = new CallStack();
FBinder.prototype.constructor = FBinder;

FBinder.prototype.initReload = function () {
    var me = this;
    var reload = function () {
        me.set(me.fn.apply(me, me.arguments));
    }
    reload.priority = me.priority;
    this.reload = function () {
        me.callstack.add(reload);
    }
}
FBinder.prototype.initArguments = function (args) {
    this.argumentBinders = [];
    this.arguments = new Array(args.length);
    this.priority = 0;
    for (var q = args.length; q--;) {
        var arg = args[q];
        if (arg instanceof Binder) {
            if (this.priority < arg.priority)
                this.priority = arg.priority;
            this.argumentBinders.push({
                id:q,
                binder: arg,
                handler: this.getArgumentHandler(q)
            });
            arg = arg._value;
        }
        this.arguments[q] = arg;
    }
    this.priority++;
}
FBinder.prototype.getArgumentHandler = function (id) {
    var me = this;
    return function (value) {
        me.arguments[id] = value;
        me.reload();
    }
}
FBinder.prototype.attachArguments = function () {
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
}
FBinder.prototype.detachArguments = function () {
    for (var q = this.argumentBinders.length; q--;) {
        var arg = this.argumentBinders[q];
        arg.version = arg.binder.version;
        arg.binder.detach(arg.handler);
    };
}
FBinder.prototype.attach = function (fn) {
    if (!fn.passive) {
        if (this.active === 0)
            this.attachArguments();
        this.active++;
    }
    Binder.prototype.attach.call(this, fn);
}
FBinder.prototype.detach = function (fn) {
    if (!fn.passive) {
        this.active--;
        if (this.active === 0)
            this.detachArguments();
    }
    Binder.prototype.detach.call(this, fn);
}

FBinder.prototype.get = function (callback) {  
    if (this.active && this._value !== Loading) {
        if(callback)
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
        if (callback)
            callback(value);
        me.detach(fn);
    }
    me.attach(fn);
}