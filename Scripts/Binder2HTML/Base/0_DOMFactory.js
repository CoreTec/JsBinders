var DOMFactory = {
    get: function (cfg) {
        if (!cfg || (cfg instanceof HTMLElement)) return cfg;
        var fn = DOMFactory[cfg.type];
        if (fn) return this.get(fn(cfg)||cfg);
        var el = document.createElement(cfg.type||'div');
        el.apply(cfg);
        return el;
    }
};