function MultiBinder(fn, args) {
    SingleBinder.apply(this, arguments);
}

apply(MultiBinder.prototype = Object.create(SingleBinder.prototype),
    {
        constructor: MultiBinder,
        initArguments: function () {
            this.argumentBinders = [];
            for (var q = this.arguments.length; q--;) {
                var arg = this.arguments[q];
                if (!(arg instanceof Binder)) continue;
                this.argumentBinders.push(this.initArgumentBinder(arg,q));
            }
            this.priority++;
        },
        attachArguments: function () {
            var needUpdate = this.version === 0;
            for (var q = this.argumentBinders.length; q--;)
                needUpdate = !this.argumentBinders[q].attach() || needUpdate;
            if (needUpdate)
                this.reload();
        },
        detachArguments: function () {
            for (var q = this.argumentBinders.length; q--;) 
                this.argumentBinders[q].detach();            
        },
        needUpdate:function()
        {
            if (this.version === 0) return true;
            return this.argumentBinders.some(function (b) { return b.outdated(); });
        },
        set: function(value,source)
        {
            if (this._value === value) return NoChanges;
            if (this.fn.set) {
                var args = this.arguments.clone();
                args.insert(0, value);
                var res = this.fn.set.apply(this, args);
                if (res === Failed) return Failed;
                for (var q = this.argumentBinders.length; q--;) {
                    var arg = this.argumentBinders[q];
                    if (arg.set(res[arg.id]) === Failed)
                        //ToDo: undo prev argument value
                        return Failed;
                }
            }
            Binder.prototype.set.apply(this, arguments);
        }
    });