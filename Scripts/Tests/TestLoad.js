window.onload = function () {
    var tab = new Binder(0);
    var tests = [
                    {
                        text: 'Test1',
                        type: 'Test1'
                    },
                    {
                        text: 'Test2',
                        type: 'Test2'
                    },
                    {
                        text: 'Test3',
                        type: 'Test3'
                    },
                    {
                        text: 'Test4',
                        type: 'Test4'
                    }
    ];


    document.body.add({
        margin: 50,
        width: '50%',
        border: '1px solid lightgray',
        items: [
            {
                type: 'tabs',
                height: 600,
                tab: tab,
                padding:10,
                items: tests
            },
             {
                 cls: 'toolbar',
                 items: [
                     {
                         type: 'button',
                         cls: ['fa', 'fa-arrow-left'],
                         handler: function () {
                             tab.value = (tab.value - 1 + tests.length) % tests.length;
                         }
                     },
                     {
                         text: tab,
                         margin: 'auto'
                     },
                    {
                        type: 'button',
                        cls: ['fa', 'fa-arrow-right'],
                        handler: function () {
                            tab.value = (tab.value + 1) % tests.length;
                        }
                    }
                 ]
             }
        ]
    });

}