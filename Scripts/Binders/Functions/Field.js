function field(obj, field) {
    return obj[field];
}
field.set = function (val,obj,field) {
    obj[field] = val;
    return { obj: obj };
}