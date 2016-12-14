window.onload = function () {
    var m = new Binder({ A:'qwe',B:'zxc' });
    m.fields('A', 'B');
    m.isequal=equal.binder(m.A,m.B);
    m.log('%o');

    document.body.add({
        margin: 50,
        width: 300,
        border:'1px solid lightgray',
        display: 'flex',
        flexFlow: 'column',
        defaults: {
            margin: '0 5px 5px 5px',
            textWidth: 100
        },
        items: [
            {
                cls: 'toolbar',
                margin:0,
                defaults: { type: 'button' },
                items: [
                    {
                        text: 'Equal',
                        pressed: m.isequal
                    },
                    {
                        type: 'div',
                        fontWeight:'bold',
                        text:'Test1',
                        margin:'auto'
                    },
                    {
                        text: 'Not Equal',
                        pressed: m.isequal.not()
                    }
                ]
            },
            {
                type: 'field',
                margin:5,
                text: 'A',
                value: m.A
            },
            {
                type: 'field',
                text: 'B',
                value: m.B
            },
           {
               type: 'field',
               text:'Is Equal',
               value: m.isequal.ifelse('yes','no')
           },
           {
               type: 'field',
               text: 'A as Int',
               value: int2str.binder(m.A)
           }
        ]       
    });
}

function int2str(val) {
    return ''+val;
}
int2str.set = function (val) {
    if (isNaN(val)) return Failed;
    return parseInt(val);
}