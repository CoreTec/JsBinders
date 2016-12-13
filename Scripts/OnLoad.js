window.onload = function () {
    var m = new Binder({ val: 3, display: 'hhh' });
    m.fields('val', 'display');
    m.log('%o');

    document.body.add({
        type: 'picker',
        label:'hello: ',
        value: m.val,
        display: m.display
    });
}
