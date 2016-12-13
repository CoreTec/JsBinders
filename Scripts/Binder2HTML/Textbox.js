DOMFactory.textbox = function(cfg)
{
    var value = cfg.value;
    delete cfg.value;

    cfg.type = 'div';
    cfg.width = 200;
    cfg.items = [{ type: 'input', value: value }];
    if (value instanceof Binder) 
        cfg.items.push({
            type: 'button',
            text: 'X',
            visible: (function(q){return !!q;}).binder(value),
            handler: function () {
                value.set('');
            }
        });
    
    return cfg;
}