//universal add function for positive and negative integers
var add = function(a,b){
    if(a.length < b.length){
        [a,b] = [b,a];
    }//now a is bigger than b
    var n1 = [];
    var c = 0;
    for(var i = 1; i < b.length; i++){
        n1.push(a[0]*a[i]+b[0]*b[i]);
    }
    for(var i = b.length; i < a.length; i++){
        n1.push(a[0]*a[i]);
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
    var n2 = [sign];
    for(var i = n1.length-1; i >= 0; i--){
        if(n1[i] !== 0){
            for(var j = i; j >= 0; j--){
                n2[j+1] = n1[j];
            }
            break;
        }
    }
    
    return n2;
};

//universal multiplication function
var mul = function(a,b){
    var result = [1];
    var len = a.length;
    for(var i = 1; i < a.length; i++){
        for(var j = 1; j < b.length; j++){
            var c = a[i]*b[j];
            if(!result[i+j-1])result[i+j-1] = 0;
            result[i+j-1] += c;
        }
    }
    var c = 0;
    for(var i = 1; i < result.length; i++){
        c += result[i];
        var r = c%10;
        c = (c-r)/10;
        result[i] = r;
    }
    if(c > 0)result.push(c);
    if(result[result.length-1] === 0){
        return [0];
    }
    result[0] = a[0]*b[0];
    return result;
};

//now those are out of the way, we can now work on the fraction class and its client functions
