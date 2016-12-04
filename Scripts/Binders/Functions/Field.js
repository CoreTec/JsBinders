function field(obj, field) {
    return obj[field];
}
field.simple = true;
field.set = function (val,obj,field) {
    obj[field] = val;
    return Reload;
}