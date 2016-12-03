HTMLElement.prototype.setters = {
    text: function (val) {
        if (this instanceof HTMLInputElement)
            this.value = val;
        else this.innerText = val;
    },
    items: function (val) {
        this.removeAll();
        this.add(val);
    },
    width: function (val) {
        this.width = val;
    },
    height: function (val) {
        this.height = val;
    },
    type: function () { },
    handler: function (fn) {
        this.addEventListener('click', fn);
    }
};

HTMLElement.prototype.listeners = {
    text:function(fn)
    {
        var me = this;
        this.addEventListener('input', function () {
            fn(me.value);
        })
    }
};