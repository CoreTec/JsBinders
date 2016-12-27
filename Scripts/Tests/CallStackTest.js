DOMFactory.CallStackTest = function () {
    var c1 = new Binder(0);
    var c2 = new Binder(0);

    var f1 = function (data) {
        var cs=new CallStack();
        for (var q = 0; q < data.length; q++)
            cs.add(data[q]);
    }
    var f2 = function (data) {
        var cs = new CallStack2();
        for (var q = 0; q < data.length; q++)
            cs.add(data[q]);
    }
    return {
        type: 'div',
        items: [
            {
                type: 'button',
                text: 'start',
                handler: function () {
                    var max = 1000;
                    var maxPriority = 100;
                    var count = 100;
                    var data = new Array(max);
                    var c = 1;
                    for (var q = 1; q < data.length; q++)
                        (data[q] = (function () { c++; })).priority = Math.floor(Math.random() * maxPriority);

                    var step = count;
                    var d;
                    var fn = function () {
                        if (c != max) {
                            c1.value = 'invalid';
                            return;
                        }
                        c = 1;
                        if (--step === 0) {
                            c1.value = new Date().getTime() - d.getTime();
                            data[0] = fn2;
                            d = new Date();
                            c = max;
                            step = count;
                            fn2();
                            c2.value = 'Loading...';
                        }
                        else f1(data);
                    }
                    fn.priority = maxPriority;
                    data[0] = fn;
                    d = new Date();
                    c = max;
                    fn();
                    c1.value = 'Loading...';

                    var fn2 = function () {
                        if (c != max) {
                            c2.value = 'invalid';
                            return;
                        }
                        c = 1;
                        if (--step === 0)
                            c2.value = new Date().getTime() - d.getTime();
                        else f2(data);
                    }
                    fn2.priority = maxPriority;
                }
            },
            {
                type:'div',
                text:c1
            },
            {
                type: 'div',
                text:c2
            }
        ]
    };
}