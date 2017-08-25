var reg1 = /\d(\w)\d/;
var reg2 = /\d(\w)\d/g;
var str = '1a2b3c4d5e';
var ret = reg1.exec(str);
console.log(reg1.lastIndex + '\t' + ret.index + '\t' + ret.toString());
while(ret = reg2.exec(str)){

    console.log(reg2.lastIndex + '\t' + ret.index + '\t' + ret.toString());
}