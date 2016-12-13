window.onload = function () {
    var m = new Binder({ val: 3, display: 'hhh' });
    m.fields('val', 'display');
    m.log('%o');

    document.body.add({
        width: '100%',
        height:'100%',
        display: 'flex',
        boxSizing: 'border-box',
        padding: 50,
        flexDirection: 'column',
        items:[           
            {
                type: 'textbox',
                value: m.display
            },
            {
                type: 'button',
                width: 100,
                marginTop:10,
                text:' Is Blank',
                toggle: (function (q) { return !q; }).binder(m.display)
            }
        ]       
    });
}
