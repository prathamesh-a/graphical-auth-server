import fetch from "node-fetch";
import { createApi } from "unsplash-js";

function checkArray(arr1, arr2, sequence) {
    if (arr1.length != arr2.length) return false;
    var gflag = false;
    if (sequence){
        for(let i=0; i<arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                gflag = false;
                break;
            }
            else gflag = true;
        }
    } 
    else {    
        for(let i=0; i<arr1.length; i++) {
        var flag = false;
        for(let j=0; j<arr2.length; j++) {
            if (arr1[i] === arr2[j]) {flag = true;}
        }
        gflag = flag;
        }
    }
    return gflag;
}

const unsplash = createApi({
    accessKey: '4ZbDrA6rYXxDrle-QX4iwf9TNmbqrwlL3GY272X_T5I',
    fetch: fetch,
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export {checkArray, unsplash, shuffleArray}