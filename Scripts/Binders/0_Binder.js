function Binder(value,args) {
    if(value instanceof Function) 
    {
        if (args instanceof Binder)
        {
            //ToDo: create Dynamic Binder
            return null;
        }

        //Making sure args is new array
        args = Array.prototype.slice.call(args);

        var binderCount = 0;
        for (var q = args.length; q--;)
            if (args[q] instanceof Binder) 
                binderCount++;
            

        switch (binderCount) {
        //ToDo: create Promise Binder
            case 0: return null;
            case 1: return new SingleBinder(value, args);
            default: return new MultiBinder(value, args);
        }
    }
    if (arguments.length == 1) return new ValueBinder(value);
}