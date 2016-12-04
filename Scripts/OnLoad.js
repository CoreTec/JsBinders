function sum(a, b) { return +a + +b; }
//ToDo: find a nicer way to delect constant arguments
sum.set = function (val, a, b) {
    if (this instanceof MultiBinder)
        return [val / 2, val / 2];
    if (this.argumentBinder.id==0)
        return val - b;
    return val - a;
}

var m = Binder({x:0,y:0});
m.fields('x', 'y');
m.z = sum.binder(m.x, m.y);
m.z2 = sum.binder(4, m.y);
m.z3 = sum.binder(m.x, 7);

m.log('model changed from %o to %o');

window.onload = function () {
    document.body.add({
        type: 'div',
        items: [
            {
                type: 'input',
                text: m.x,
            },
            ' + ',
            {
                type: 'input',
                text: m.y
            },
            ' = ',
            {
                type: 'input',
                text: m.z
            }
        ]
    });
    document.body.add({ type: 'br' });
    document.body.add({
        type: 'div',
        items: [            
            '4 + ',
            {
                type: 'input',
                text: m.y
            },
            ' = ',
            {
                type: 'input',
                text: m.z2
            }
        ]
    });
    document.body.add({ type: 'br' });
    document.body.add({
        type: 'div',
        items: [
            {
                type: 'input',
                text: m.x
            },
            ' + 7 = ',
            {
                type: 'input',
                text: m.z3
            }
        ]
    });
}
