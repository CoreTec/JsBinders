HTMLBodyElement.prototype.rendered = true;
Text.prototype.onRemove = function () { };

apply(HTMLElement.prototype, { 
    set: function (name, value) {
        var property = HTMLExtProperties.get(name);
        if (!property) return;
        if (!(value instanceof Binder)) 
            return property.set.call(this, value);

        if (this.binders === undefined) this.binders = [];      
        var me = this,
            version,
            binder=value,
            setter = function (val) { property.set.call(me, val); };

        if (property.onChange)
            property.onChange.call(this, function (val) {
                binder.set(val, setter);
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
        var el = DOMFactory.get(cfg);
        this.appendChild(el);
        if (this.rendered)
            el.onRender();
    },
    remove:function(el)
    {
        this.removeChild(el);
        el.onRemove();
    },
    removeAll:function(){
        while (this.firstChild)
            this.remove(this.firstChild);
    }
});