function equal(A,B) {
    return A === B;
}
equal.set=function(val,A,B)
{
    if (!val) return Failed;
    if (this instanceof MultiBinder)
        return [B, NoChanges];
    return B;
}
function not(A) {
    return !A;
}
not.set = not;

function cases(A) {
    var len=arguments.length-1;
    for (var q = 1; q < len; q += 2)
        if (A === arguments[q])
            return arguments[q + 1];
    if (q == len)
        return arguments[q];
}

function ifelse(cond, A, B) {
    return cond ? A : B;
}
ifelse.set = function (val, cond, A, B) {
    var newcond;
    if (val === A) newcond = true;
    else if (val === B) newcond = false;
    else return Failed;

    if (this instanceof MultiBinder) 
        return [val === A, NoChanges, NoChanges];
    return val === A;
}