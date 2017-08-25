var reg1 = /\d(\w)\d/;
var reg2 = /\d(\w)\d/g;
var str = '$1a2b3c4d5e';
ret = str.match(reg1)
    console.log(ret)
    console.log(reg2.lastIndex + '\t' + ret.index + '\t' + ret.toString());