apply(HTMLExtProperties,
    {
        cls: function (val) {
            this.className = val;
        },
        visible: function (val) {
            if (val) this.style.display = this._oldDisplay;
            else{
                this._oldDisplay = this.style.display;
                this.style.display = 'none';
            }
        }
    });