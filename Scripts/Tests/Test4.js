DOMFactory.Test4 = function () {
    var sum=function (q, w) { return parseInt(q) + parseInt(w); };
    sum.set = function (val, q, w) {
        val = parseInt(val);
        if ((val % 2) != 0) return Failed;
        return [val / 2, val / 2];
    }

    var a = new Binder(0);
    var b = new Binder(0);
    var c = sum.binder(a, b);

    return {
        type: 'div',
        defaults:{ type:'input'},
        items: [
            {
                value:a
            },
            {
                value:b
            },
            {
                value:c
            }
        ]
    };
}