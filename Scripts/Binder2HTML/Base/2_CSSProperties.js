apply(HTMLExtProperties,
    {
        cls: function (val, old) {
            if (old)
                this.classList.remove(old);
            if(val)
                this.classList.add(val);
        },
        visible: function (val) {
            if (val) this.style.display = this._oldDisplay;
            else{
                this._oldDisplay = this.style.display;
                this.style.display = 'none';
            }
        }
    });