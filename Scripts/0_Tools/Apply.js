function apply(A,B) {
    for (var q in B)
        A[q] = B[q];
    return A;
}
function applyIf(A, B) {
    for (var q in B)
        if(A[q]===undefined)
            A[q] = B[q];
    return A;
}