function checkArray(arr1, arr2) {

    if (arr1.length != arr2.length) return false;

    var gflag = false;

    for(let i=0; i<arr1.length; i++) {
        var flag = false;
        for(let j=0; j<arr2.length; j++) {
            if (arr1[i] === arr2[j]) {flag = true;}
        }
        gflag = flag;
        
    }

    return gflag;
}

export {checkArray}