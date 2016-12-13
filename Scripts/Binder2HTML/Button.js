DOMFactory.button = function(cfg)
{
    var toggle = cfg.toggle;
    delete cfg.toggle;

    var cls=cfg.cls||'';
    cls+=' button';

    cfg.type = 'div';
    if (!cfg.text)
        cfg.text = 'button';

    if (toggle instanceof Binder) {
        cfg.handler = function () {
            toggle.value = !toggle.value;
        }
        cfg.cls = (function (q) { return q ? cls + " pressed" : cls; }).binder(toggle);
    }
    else cfg.cls = cls;
    return cfg;
}

DOMFactory.checkbox = function (cfg) {
    cfg.cls = cfg.cls || '';
    cfg.cls += ' checkbox';
    cfg.type = 'button';
    if (cfg.value) cfg.toggle = cfg.value;
    return cfg;
}