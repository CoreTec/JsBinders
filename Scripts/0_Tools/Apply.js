function apply(A, B) {
    if (!B) return A;
    for (var q in B)
        A[q] = B[q];
    return A;
}
function applyIf(A, B) {
    if (!B) return A;
    for (var q in B)
        if(A[q]===undefined)
            A[q] = B[q];
    return A;
}