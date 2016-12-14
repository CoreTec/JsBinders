if (!Array.prototype.remove)
    Object.defineProperty(Array.prototype, 'remove', {
        value: function (el) {
            var id = this.indexOf(el);
            if (id === -1) return false;
            this.splice(id, 1);
            return true;
        },
        enumerable: false
    });

if (!Array.prototype.insert)
    Object.defineProperty(Array.prototype, 'insert', {
        value: function (id,el) {
            this.splice(id, 0, el)
        },
        enumerable: false
    });

if (!Array.prototype.contains)
    Object.defineProperty(Array.prototype, 'contains', {
        value: function (el) {
           return this.indexOf(el) !== -1;
        },
        enumerable: false
    });

if (!Array.prototype.clone)
    Object.defineProperty(Array.prototype, 'clone', {
        value: function () {
            return this.slice(0);
        },
        enumerable: false
    });