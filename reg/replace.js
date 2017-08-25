'a1b'.replace('1', '2');
'a1b1c1'.replace('1', '2')
'a1b1c1'.replace(/1/g, '2')
'a1b1c1'.replace(/1/g, '2')
'a1b2c3d4'.replace(/\d/g, function(data){
	return data++;
})
/************8
***arg1:匹配字符串
***arg2:分组内容，没有分组则没有该分组
***arg3:匹配项在字符串中的位置
***arg4:原字符串
**************/