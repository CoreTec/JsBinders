DOMFactory.Test1 = function () {
    var x = new Binder(0);
    return {
        type: 'div',
        defaults:{textWidth:100},
        items: [
            {
                type: 'input',
                text:'LAbel qwe',
                value:x
            },
            {
                type: 'input',
                text: 'fw asdasd',
                value: x
            }
        ]
    };
}