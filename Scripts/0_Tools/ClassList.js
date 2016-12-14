if (!('DOMTokenList' in window)) {
    var remove = Array.prototype.remove;
    var constructor = Array.prototype.constructor;
    window.DOMTokenList = function (el) {
        var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
        constructor.call(this, classes);
        this.el = el;
    };
    DOMTokenList.prototype = Object.create(Array.prototype, {
        'add':{
            value:function (token) {
                if (this.contains(token)) return;
                this.push(token);
                this.el.className = this.toString();
            },
            enumerable:false
        },
        'item':{
            value: function (index) {
                return this[index] || null;
            },
            enumerable:false
        },
        'remove':{
            value: function (token) {
                if(remove.call(this, token))
                    this.el.className = this.toString();            
            },
            enumerable:false
        },
        'toString':{
            value: function () {  
                return this.join(' ');
            },
            enumerable:false
        },
        'toggle':{
            value: function (token) {
                if (this.remove(token)) 
                    return false;
                this.push(token);
                this.el.className = this.toString();
                return true;
            },
            enumerable:false
        },
    });

    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function () {
            if (!this._classList) this._classList = new DOMTokenList(this);
            return this._classList;
        }
    });
}
