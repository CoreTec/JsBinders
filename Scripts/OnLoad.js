
function sum(a, b) { return +a + +b; }
sum.set = function (val, a, b) { return [val/2,val/2]; }

var x = new Binder(1);
var y = new Binder(1);
var z = sum.binder(x, y);

x.log('x');
y.log('y');
z.log('z');

window.onload = function () {
    document.body.add({
        type: 'div',
        items: [
            {
                type: 'input',
                text: x
            },
            ' + ',
            {
                type: 'input',
                text: y
            },
            ' = ',
            {
                type: 'input',
                text: z
            }
        ]
    });
}
