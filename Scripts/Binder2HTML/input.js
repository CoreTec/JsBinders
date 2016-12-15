DOMFactory.input = function(cfg)
{
    if (cfg.text)
    {
        cfg.type = 'label';
        cfg.display = 'flex';
        cfg.items = [{
            text: cfg.text,
            width: cfg.textWidth||50
        },
        {
            type: 'input',
            flex:1,
            value: cfg.value
        }];
        delete cfg.text;
        delete cfg.value;
        return cfg;
    }
    var el = document.createElement('input');
    el.apply(cfg);
    return el;
}