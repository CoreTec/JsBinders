HTMLBodyElement.prototype.visible = true;
Text.prototype.onHide = function () { };

apply(HTMLElement.prototype, {
    setConfig: function (cfg) {
        for (var q in cfg) 
            this.set(q, cfg[q]);        
    },
    set:function(name,value){
        if(value instanceof Binder)
            return this.addBinder(name,value);
        var setter = this.setters[name];
        if (!setter) 
           return console.warn('setter %s not found',name);
        setter.call(this,value);
    },
    addBinder:function(name,binder){
        if (this.binders === undefined) this.binders = [];
        var setter = this.setters[name];
        if (!setter)
            return console.warn('setter %s not found', name);
        var me = this;
        var listener = this.listeners[name];
        var cfg = {
            setter: function (val) { setter.call(me, val); },
            binder: binder,
            listener: function (val) { listener.call(me, val); }
        };
        if (cfg.listener)
            cfg.listener(function (val) {
                cfg.binder.set(val,cfg.setter);
            });
        this.binders.push(cfg);
    },
    removeAll:function(){
        while (this.firstChild)
            this.remove(this.firstChild);
    },
    attachBinders: function () {
        if (!this.binders) return;
        for(var q=this.binders.length;q--;)
        {
            var cfg = this.binders[q];
            var val = cfg.binder.value;
            if (cfg.version !== cfg.binder.version &&
                    val !== Outdated &&
                    val !== Loading)
                cfg.setter(val);
            cfg.binder.attach(cfg.setter);
        }
    },
    detachBinders: function () {
        if (!this.binders) return;
        for (var q = this.binders.length; q--;) {
            var cfg = this.binders[q];
            cfg.version = cfg.binder.version;
            cfg.binder.detach(cfg.setter);
        }
    },
    onShow:function()
    {
        this.visible = true;
        this.attachBinders();
        for (var q = this.children.length; q--;)
            this.children[q].onShow();
    },
    onHide:function(){
        this.visible = false;
        this.detachBinders();
        for (var q = this.children.length; q--;)
            this.children[q].onHide();
    },
    add:function(cfg)
    {
        if (Array.isArray(cfg))
            for (var q = 0; q < cfg.length; q++)
                this.add(cfg[q]);
        else {
            var el = DOMFactory.get(cfg);
            this.appendChild(el);
            if (this.visible)
                el.onShow();
        }
    },
    remove:function(el)
    {
        this.removeChild(el);
        el.onHide();
    }
});