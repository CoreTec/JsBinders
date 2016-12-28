function CallStack2() {
    var blocks = [];
    var root = null;

    var handle = function () {
        var fn;
        //ToDo: optimize?
        while (root !== null) {
            var fn = root.pop();
            if (root.length === 0)
                removeBlock(root);
            fn();
        }      
    }

    var ensureLength = function (len) {
        for (var q = blocks.length; q <= len; q++)
            (blocks[q] = []).id=q;
    }

    var removeBlock = function (block) {
        if (block === root) 
            return root = root.next;

        //kinda rare case so whatever
        var x = root;
        while (x.next !== block) x = x.next;
        x.next = block.next;
    }

    this.add = function (fn) {
        //autoinvoke on add root
        if (root === null)
            window.setTimeout(handle, 1);

        var block = blocks[fn.priority];

        //if block was empty
        if (block.push(fn) !== 1) return;

        if (root === null || root.id > block.id) {
            block.next = root;
            root = block;
            return;
        }

        //searching position to insert
        var x = root;
        while (x.next !== null && x.next.id < block.id) x = x.next;
        block.next = x.next;
        x.next = block;
    }

    ensureLength(20000);
}