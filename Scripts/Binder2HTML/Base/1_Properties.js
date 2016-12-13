window.HTMLExtProperties = {
    get:function(name){
        var s = this[name];
        if (s instanceof Function)
            s = this[name] = { set: s };
        if (!s) {
            if (name in HTMLElement.prototype)
                return this[name] =
                    {
                        set: function (val) {
                            this[name] = val;
                        }
                    };
            //ToDo: check compatibility
            if (name in document.body.style)
                return this[name] =
                    {
                        set: function (val) {
                            this.style[name] = val;
                        }
                    };
            console.warn('property %s not found', name);
        }
        return s;
    },
    text: function (val) {
        this.innerText = val;
    },
    value: {
        set: function (val) {
            this.value = val;
        },
        onChange: function (fn) {
            var me = this;
            this.addEventListener('input', function () {
                fn(me.value);
            })
        }
    },
    items:function (val) {
            this.removeAll();
            if (Array.isArray(val))
                for (var q = 0; q < val.length; q++)
                    this.add(val[q]);
            else this.add(val);        
    },
    handler: function (fn) {
        this.addEventListener('click', fn);
    }
};