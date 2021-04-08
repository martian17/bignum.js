//var repl = require('repl'),
//    msg = "Hello world!";
//var replContext = repl.start('> ').context;

//add function with sign indication
var addSigned = function(asign,a,bsign,b){
    if(a.length < b.length){
        [a,b] = [b,a];
    }//now a is bigger than b
    var n1 = [];
    var c = 0;
    for(var i = 0; i < b.length; i++){
        n1.push(asign*a[i]+bsign*b[i]);
    }
    for(var i = b.length; i < a.length; i++){
        n1.push(asign*a[i]);
    }
    var sign = 1;
    //reversing the sign iff the result is negative
    for(var i = n1.length-1; i >= 0; i--){
        if(n1[i] !== 0){
            if(n1[i] < 0){//then reverse the sign
                sign = -1;
                for(var j = i; j >= 0; j--){
                    n1[j] = -n1[j];
                }
            }
            break;
        }
    }
    //rectifying the result
    //console.log(n1);
    var c = 0;//carryover
    for(var i = 0; i < n1.length; i++){
        c += n1[i]+10;
        var r = c%10;
        //console.log(c,r)
        c = (c-10-r)/10;
        n1[i] = r;
    }
    n1[i] = c;
    //console.log(n1);
    //now n1 is ready
    var n2 = [];
    for(var i = n1.length-1; i >= 0; i--){
        if(n1[i] !== 0){
            for(var j = i; j >= 0; j--){
                n2[j] = n1[j];
            }
            break;
        }
    }
    return [sign,n2];
};

var mul = function(a,b){
    var result = [];
    var len = a.length;
    for(var i = 0; i < a.length; i++){
        for(var j = 0; j < b.length; j++){
            var c = a[i]*b[j];
            if(!result[i+j])result[i+j] = 0;
            result[i+j] += c;
        }
    }
    var c = 0;
    for(var i = 0; i < result.length; i++){
        c += result[i];
        var r = c%10;
        c = (c-r)/10;
        result[i] = r;
    }
    if(c > 0)result.push(c);
    if(result[result.length-1] === 0){
        return [0];
    }
    return result;
};

var muli = function(a,n){//a is immutable
    var b = [];
    for(var i = 0; i < a.length; i++){
        b[i] = a[i]*n;
    }
    var c = 0;
    for(var i = 0; i < b.length; i++){
        c += b[i];
        var r = c%10;
        c = (c-r)/10;
        b[i] = r;
    }
    if(c > 0)b.push(c);
    return b;
};

var intZeros = function(a,n){
    var result = [];
    for(var i = 0; i < n; i++){
        result[i] = 0;
    }
    result[n] = a;
    return result;
};

var copyInt = function(a){
    var result = [];
    for(var i = 0; i < a.length; i++){
        result[i] = a[i];
    }
    return result;
};

var remove0s = function(a){//remove 0s from the tail (higher order)
    var a1 = [];
    for(var i = a.length-1; i >= 0; i--){
        if(a[i] !== 0){
            for(var j = i; j >= 0; j--){
                a1[j] = a[j];
            }
            break;
        }
    }
    return a1;
};

var subtractFromCanvas = function(canvas,a,offset){//offset is from the beginning how many times a will be right shifted
    console.log(canvas,a,offset);
    //canvas: [0,1,2,3,4,5] //54321
    //a:          [1,1]
    //offset: 2
    var c = 0;
    var result = [];
    var flag = true;
    for(var i = a.length-1; i >= 0; i--){
        var n = canvas[i+offset]-a[i];
        result[i] = n;
        if(n !== 0 && flag){//negative number
            if(n < 0)return false;//failure, wrapper fuction will try another number
            flag = false;
        }
    }
    
    //condition met, rectifying the number
    //and writing to the canvas
    console.log(result);
    var c = 0;
    for(var i = 0; i < result.length; i++){
        c += result[i]+10;
        var r = c%10;
        //console.log(c,r)
        c = (c-10-r)/10;
        canvas[i+offset] = r;
    }
    console.log("subtraction success");
    console.log(canvas);
    return true;
};

var mod = function(a,b){
    console.log(a,b);
    var ahead = a.length-1;
    var bhead = b.length-1;
    if(ahead < bhead){
        return [[0],a];
    }
    var acanvas = copyInt(a);
    var quotient = [];
    var remainder = [];
    console.log(ahead,bhead);
    for(var i = ahead; i >= bhead; i--){
        //23/4 -> when i = ahead(1) idx = 1
        //when i = ahead-1(0) idx=0
        console.log("it's the "+i+"th");
        var aval = acanvas[i];
        if(acanvas[i+1])aval += acanvas[i+1]*10;
        var min = Math.floor(aval/(b[bhead]+1));
        var max = Math.floor(aval/b[bhead]);
        console.log("minmax",min,max)
        quotient[i-bhead] = 0;
        for(var j = max; j >= min; j--){//j is the speculated divisor
            //multiply b with j to get the val
            console.log("trying to divide by "+j);
            console.log(b,j);
            var c = muli(b,j);
            console.log(c);
            if(subtractFromCanvas(acanvas,c,i-bhead)){
                quotient[i-bhead] = j;
                break;
            }
        }
    }
    quotient = remove0s(quotient);
    remainder = remove0s(acanvas);
    return [quotient,remainder];
}


/*
var mod = function(a,b){//a divided by b
    var ahead = a.length-1;
    var bhead = b.length-1;
    if(ahead < bhead){
        return [[0],b];
    }
    //first copy a
    var acanvas = copyInt(a);//optimization, this will be the result
    var quotient = [];
    var remainder = [];
    for(var i = ahead; i >= bhead; i--){
        //make a reasonably guess as to what to divide it with
        console.log(b[bhead]);
        var aval = acanvas[i];
        if(acanvas[i+1])aval += acanvas[i+1]*10;
        console.log(aval)
        var min = Math.floor(aval/(b[bhead]+1));
        var max = Math.floor(aval/b[bhead]);
        quotient[i-bhead] = 0;
        for(var j = max; j >= min; j--){//j is the speculated divisor
            //multiply b with j to get the val
            console.log(b,j);
            var c = muli(b,j);
            console.log(c);
            if(subtractFromCanvas(acanvas,c,i)){
                quotient[i-bhead] = j;
                break;
            }
        }
    }
    quotient = remove0s(quotient);
    remainder = remove0s(acanvas);
    return [quotient,remainder];
};
*/

//now those are out of the way, we can now work on the fraction class and its client functions


/*
for(var key in global){
    replContext[key] = global[key];
}

console.log(Object.getOwnPropertyNames(global));
replContext["msg"] = this.msg;
*/

var result = mod([2,4,5,8,1],[1,3,8]);//18542/831   22,260
console.log("result",result);