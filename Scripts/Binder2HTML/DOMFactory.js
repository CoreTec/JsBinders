var DOMFactory = {
    get: function (cfg) {
        if (!cfg || (cfg instanceof HTMLElement)) return cfg;
        if (typeof cfg == 'string') 
            return document.createTextNode(cfg);
        
        var fn = DOMFactory[cfg.type];
        if (fn) return this.get(fn(cfg));
        var el = document.createElement(cfg.type);
        el.setConfig(cfg);
        return el;
    }
};