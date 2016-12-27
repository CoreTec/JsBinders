function CallStack2() {
    var blocks = [];// blocks with same priority
    var root = null;

    var handle = function () {
        var r;
        while ((r=root) !== null) {
            r.pop()();
            if (r.length === 0)
                removeBlock(r);
        }
    }
    var ensureLength = function (len) {
        if (blocks.length > len) return;
        for (var q = blocks.length; q <= len; q++) {
            var block = blocks[q] = [];
            block.id = q;
            block.next = null;
        }
    }
    var addBlock = function (block) {
        //if already active
        if (block.length !== 0) return;

        if (root === null) {
            root = block;
            //autoinvoke on add root
            window.setTimeout(handle, 1);
            return;
        }
        if (root.id > block.id) {
            block.next = root.id;
            root = block;
            return;
        }

        var x = root;
        while (true) {
            if (x.next === null) {
                x.next = block.id;
                return;
            }
            if (x.next > block.id) {
                block.next = x.next;
                x.next = block.id;
                return;
            }
            x = blocks[x.next];
        }
    }
    var removeBlock = function (block) {
        if (block === root) {
            if (root.next !== null)
                root = blocks[root.next];
            else root = null;
            block.next = null;
            return;
        }
        for(var q=root.id;;q++)
            if (blocks[q].next === block.id) {
                block[q].next = block.next;
                block.next = null;
            }
    }
    this.add = function (fn) {
       // ensureLength(fn.priority);
        var block = blocks[fn.priority];
        addBlock(block);
        block.push(fn);
    }
    ensureLength(20000);
}