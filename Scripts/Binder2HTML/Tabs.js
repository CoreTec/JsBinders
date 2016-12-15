DOMFactory.tabs = function (cfg) {
    var tab = new Binder(0);
    var buttons = cfg.items.map(function (q, i) {
        return {
            type: 'button',
            text: q.cut('text'),
            pressed: tab.equal(i)
        }
    });
    var items = cfg.items.map(DOMFactory.get, DOMFactory);

    cfg.type = 'div';
    cfg.items = [
        {
            cls: 'toolbar',
            items: buttons
        },
        {
            flex: 1,
            items:field.binder(items, tab)
        }
    ];
}