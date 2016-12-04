
//ToDo: Optimize 
//too many array operations
function CallStack() {
    //assuming single thread JS
    var handlers = [];
    var timer = null;

    var handle = function () {
        var H = null;
        while (H = handlers.pop()) H();
        timer = null;
    }
    this.add = function (fn) {
        //autoinvoke on add
        if (timer === null) timer = window.setTimeout(handle, 1);

        if (fn.priority === undefined) return handlers.splice(0, 0, fn);

        //searching for duplicates and position to insert
        var q = handlers.length;
        while (q--) {
            var H = handlers[q];
            //skip duplicates
            if (H === fn) return;
            if (H.priority > fn.priority)
                return handlers.splice(q + 1, 0, fn);
        }
        //if priority is maximum
        handlers.splice(0, 0, fn);
    }
    this.remove = function (fn) {
        var id = handlers.indexOf(fn);
        if (id < 0) return;
        handlers.splice(id, 1);
    }
}