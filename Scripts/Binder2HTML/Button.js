DOMFactory.button = function(cfg)
{
    var pressed = cfg.pressed;
    delete cfg.pressed;

    if (!(cfg.cls instanceof Array)) cfg.cls = cfg.cls?[cfg.cls]:[];
    cfg.cls.push('button');

    if (pressed instanceof Binder) {
        cfg.handler = function () {
            pressed.value = !pressed.value;
        }
        cfg.cls.push('toggle', pressed.ifelse('pressed'));
    }

    var el = document.createElement('button');
    el.apply(cfg);
    return el;
}