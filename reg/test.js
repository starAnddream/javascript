var reg1 = /\w/;
var reg2 = /\w/g;
// reg1.test('ab')
// reg2.test('ab')
while(reg2.test('ab')){
	console.log(reg2.lastIndex)
}