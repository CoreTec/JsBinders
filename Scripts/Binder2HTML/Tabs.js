DOMFactory.tabs = function (cfg) {
    var tab = cfg.cut('tab')||new Binder(0);
    var buttons = cfg.items.map(function (q, i) {
        return {
            type: 'button',
            text: q.cut('text'),
            pressed: tab.equal(i)
        }
    });
    var items = cfg.items.map(DOMFactory.get, DOMFactory);

    cfg.type = 'div';
    cfg.display = 'flex';
    cfg.flexFlow = 'column';
    cfg.items = [
        {
            cls: 'toolbar',
            defaults:{marginLeft:5},
            items: buttons
        },
        {
            flex: 1,
            padding: cfg.cut('padding'),
            overflow:'auto',
            items: field.binder(items, tab)
        }
    ];
}