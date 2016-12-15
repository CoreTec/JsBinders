HTMLBodyElement.prototype.rendered = true;
Text.prototype.onRemove = function () { };

apply(HTMLElement.prototype, {
    apply: function (cfg) {
        delete cfg.type;
        if (cfg.cls instanceof Array) {
            for (var q = cfg.cls.length; q--;)
                this.set('cls', cfg.cls[q]);
            delete cfg.cls;
        }
        for (var q in cfg)
            this.set(q, cfg[q]);
    },
    set: function (name, value) {
        if (value === undefined) return;
        var property = HTMLExtProperties.get(name);
        if (!property) return;
        if (!(value instanceof Binder)) 
            return property.set.call(this, value);

        if (this.binders === undefined) this.binders = [];      
        var me = this,
            version,
            binder=value,
            setter = function (val,old) { property.set.call(me, val,old); };

        if (property.onChange)
            property.onChange.call(this, function (val) {
                if (binder.set(val, setter) === Failed)
                    setter(binder.value);
            });
        this.binders.push({
            attach: function () {
                var val = binder.value;
                if (version !== binder.version &&
                        val !== Outdated &&
                        val !== Loading)
                    setter(val);
                binder.attach(setter);
            },
            detach: function () {
                version = binder.version;
                binder.detach(setter);
            }
        });
    },
    attachBinders: function () {
        if (this.binders === undefined) return;
        for(var q = this.binders.length;q--;)
            this.binders[q].attach();
    },
    detachBinders: function () {
        if (this.binders === undefined) return;
        for (var q = this.binders.length; q--;) 
            this.binders[q].detach();        
    },
    onRender: function ()
    {
        this.rendered = true;
        this.attachBinders();
        for (var q = this.children.length; q--;)
            this.children[q].onRender();
    },
    onRemove:function(){
        this.rendered = false;
        this.detachBinders();
        for (var q = this.children.length; q--;)
            this.children[q].onRemove();
    },
    add: function (cfg) {
        var el = DOMFactory.get(applyIf(cfg, this.defaults));
        this.appendChild(el);
        if (this.rendered)
            el.onRender();
    },
    replace: function (old,el) {
        this.insertBefore(el, old);
        this.removeChild(old);
        if (this.rendered) {
            el.onRender();
            old.onRemove();
        }
    },
    remove: function (el) {
        this.removeChild(el);
        if (this.rendered)
            el.onRemove();
    },
    removeAll:function(){
        while (this.firstChild)
            this.remove(this.firstChild);
    }
});