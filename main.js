var IntCalc = function(){//inferior, less general
    var longToShort = function(a,b){
        if(a.length > b.length){
            return [a,b];
        }
        return [b,a];
    };



    var fill0 = function(a,b){
        if(a.length < b.length){
            [a,b] = [b,a];
        }
        //now a > b
        for(var i = b.length; i < a.length; i++){
            b[i] = 0;
        }
        return [a,b];
    }

    var add = function(a,b){//a b are on reverse notation
        [a,b] = longToShort(a,b);
        var n1 = [];
        var c = 0;
        for(var i = 0; i < b.length; i++){
            c += a[i]+b[i];
            var r = c%10;
            c = (c-r)/10;
            n1.push(r);
        }
        for(var i = b.length; i < a.length; i++){
            c += a[i];
            var r = c%10;
            c = (c-r)/10;
            n1.push(r);
        }
        if(c !== 0){
            n1.push(c);
        }
        return n1;
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

    var reverse = function(a){
        for(var i = 0; i < a.length/2; i++){
            var c = a[i];
            a[i] = a[a.length-1-i];
            a[a.length-1-i] = c;
        }
        return a;
    };

    var format = function(a){
        return reverse(a.split("").map(b=>parseInt(b)));
    };

    var unformat = function(a){
        return reverse(a).join("");
    };

    var addnum = function(a,b){
        var c = add(format(a),format(b));
        return unformat(c);
    };


    var formatAndExecute = function(func){
        var arr = [];
        for(var i = 1; i < arguments.length; i++){
            arr.push(format(arguments[i]));
        }
        return unformat(func.apply(null,arr));
    };
    this.formatAndExecute = formatAndExecute;
    this.add = add;
    this.mul = mul;
};

var divisionTable = [];
for(var i = 0; i < 10; i++){//divided
    divisionTable[i] = [];
    for(var j = 1; j < 10; j++){//divisor
        var max = Math.floor(i/j);
        var min = Math.floor(i/(j+1));
        divisionTable[i][j] = [,]
    }
}

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

var modBigint = function(a,b){
    var quotient = [];
    var remainder = [];
    var ahead = a.length-1;
    var bhead = b.length-1;
    while(true){
        for(var i = ahead; i >= bhead; i--){
            //make a reasonably guess as to what to divide it with
            var min = Math.floor(a[i]/(b[bhead]+1));
            var max = Math.floor(i/b[bhead]);
            for(var j = max; j >= min; j--){
                //multiply b with j to get the val
                var c = muli(b,j);
            }
        }
    }
}

var gcdBigint = function(a,b){
    
};


var Frac = function(str){//6123/9421 for example
    var f = decodeFrac(str);
    var num = f.num;
    var den = f.den;//num/den
    this.add = function(frac){//same class
        
    }
};

