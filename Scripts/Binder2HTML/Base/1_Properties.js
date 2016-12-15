window.HTMLExtProperties = {
    get: function (name) {
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

            if (name in document.documentElement.style)
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
    defaults: function (val) { this.defaults = val; },
    value: {
        set: function (val) {
            this.value = val;
        },
        onChange: function (fn) {
            this.addEventListener('input', function (e) {
                fn(this.value);
            })
        }
    },
    items: function (val) {
        this.removeAll();
        if (Array.isArray(val))
            val.forEach(this.add,this);
        else this.add(val);
    },
    handler: function (fn) {
        this.addEventListener('click', fn);
    }
};