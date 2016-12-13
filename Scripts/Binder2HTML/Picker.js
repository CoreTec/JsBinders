DOMFactory.picker = function (cfg) {
    var label = new Binder(cfg.label);
    var toggle = new Binder(false);
    toggle.log();
    return {
        type: 'div',
        items: [
            {
                type: 'span',
                color:'red',
                text: label
            },
            {
                type: 'input',
                value:cfg.display
            },
            {
                type: 'checkbox',
                width:50,
                text: 'test',
                toggle: toggle
            }
        ]
    };
}