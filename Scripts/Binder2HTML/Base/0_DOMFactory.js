var DOMFactory = {
    get: function (cfg) {
        if (!cfg || (cfg instanceof HTMLElement)) return cfg;
        var fn = DOMFactory[cfg.type];
        if (fn) return this.get(fn(cfg));
        var el = document.createElement(cfg.type||'div');
        delete cfg.type;
        for (var q in cfg)
            el.set(q, cfg[q]);
        return el;
    }
};