## A1解构赋值
```javascript
var [a,b,c]=[1,2,3]
解构赋值不仅适用于数组，还适用于对象
let {objA,objB,objC}={
	objA:'aaa',
	objB:{
	property1:'111',
	property2:'222'
	}
};
```
<p>在数组的解构赋值中，变量的取值由位置决定</p>
<p>在对象的解构赋值中，变量的取值与位置无关</p>

```javascript
可以在函数中使用解构函数
function getFullName(persion){
	return persion.giveNmae+'.'+persion.familyName;
}
function getFullName({giveName,familyName}){
	return giveNmae+'.'+familyName;
}
```
## A2箭头函数
<p>不需要函数名，代码简短的函数</p>
```javascript
var function1 =para1=>para1;   //只有一个参数
var function2 =(para1,para2)=>para1+para2;   //多于一个参数，使用括号
var function3 =()=>'I don't need para';   //无参数时
//等价于下面的函数

var fn1=function(para1){
	return para1;
}
var fn2=function(para1,para2){
	return para1+para2;
}
var fn1=function(){
	return 'I don't need para';
}
//如果箭头函数返回的是一个对象，则必须在对象外面加上括号
//这是因为大括号会被解释成代码块
var getObj=id=>(
	if(id===undefined)return{
		id:0,
		name:"tempName"
	}else return{
		id:id,
		name:"tempName"
	}
)
```

## A3 for in语句
```javascript
var aArray=new Array();
aArray[0]="香蕉";
aArray[1]="苹果";
for(var i=0;i<aArray.length;i++){
	console.log(aArray[i])    //打印出苹果，香蕉
}
for(var key in aArray){				//key拿到的是下标（将普通数组视为关联数组）
	console.log(key);			//打印出0，1
	console.log(aArray[key]);	//打印出苹果，香蕉
}
//建立关联数组
var aArray=new Array();
aArray['first']="苹果";
aArray['second']="香蕉";
for(var i=0;i<aArray.length;i++){
	console.log(aArray[i])    //普通for循环无法取到
}
for(var key in aArray){				//key拿到的是下标（将普通数组视为关联数组）
	console.log(key);			//打印出first,second
	console.log(aArray[key]);	//打印出苹果，香蕉
}
```

## JSX的延展属性
```javascript
var props={}
props.propA=x;
props.propB=y;
var component=<Component {...props}>
现在component这个JSX元素有了JSX变量所有的属性
```

## Promise机制
<p>核心是Promise代表一个事件结果，任务有可能成功，也可能失败。Promise唯一需要的一个接口就是then()方法，用来注册当promise成功或失败是的回调函数</p>

```javascript
this.anAsyncFunction(para).then(
	(para)=>{
		//处理操作成功事件
	}
).catch((error)=>{
	//处理操作失败事件
})
//Promise可以实现多重链接
fetch(url).then((response)=>response.json())
.then((responseData)=>{
	this.setState({
		movies:responsiveData.movies
	})
}).done()
```








