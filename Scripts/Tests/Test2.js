DOMFactory.Test2 = function () {
    var items = [];
    var root=new Binder(0),b=root;
    function A1(q){
        return parseInt(q)+1;
    }
    A1.set=function(val,q){
        return parseInt(val)-1;
    }
    for (var q = 0; q < 5000; q++)
        items.push({
            type: 'input',
            width:100,
            value: b = A1.binder(b)
        });
    items.push({
        type: 'button',
        text: 'inc',
        handler: function () {
            root.value++;
        }
    });
    return {
        type: 'div',
        display: 'flex',
        flexWrap:'wrap',
        items:items
    };
}