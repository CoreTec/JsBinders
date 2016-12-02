
window.onload = function () {

}
var count = new Binder(0);
var x = new Binder(2);
var y = new Binder(5);
var z = new FBinder(function (a, b) { count.value++; return a + b; },
                    x, y);

z.log('z changed to');
count.log('count ');