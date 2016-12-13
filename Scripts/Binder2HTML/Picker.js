DOMFactory.picker = function (cfg) {
    return {
        type: 'div',
        items: [
            cfg.label,
            {
                type: 'input',
                text:cfg.display
            },
            {
                type: 'button',
                text:cfg.value,
                handler: function () {
                    cfg.value.set(123);
                    cfg.display.set('qwe')
                }
            }
        ]
    };
}