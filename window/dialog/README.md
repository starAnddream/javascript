#对话框
* alert()
* confirm()要求用户单击确定或取消，并返回一个boolen值
* prompt()显示一条消息，等待用户输入
```javascript
var name=prompt("enter you name");
var correct=confirm("your name is"+name+"\n"+"click here");
if(correct){
alert("hi,"+name);
}
`````
##模态对话框showModalDialog()
* arg1:用于提供对话框HTML内容的URL
* arg2:数组或对象，由window。dialogArguments属性值访问
* arg3:设置对话框样式，dialogwidth,dialogheight,resizable=yes;
```javascript
showModalDialog("./multiprompt.html",["enter information","x","y","z"],"dialogwidth:400px;dialogheight:300px;resizable:yes");
```
###multiprompt.html
```html
<html>
<head>
</head>
<body>
<form>
<fieldset id="fields"></fieldset>
<div style="text-align:center">
<button onclick="okay()">Okay</button>
<button onclick="cancel()">Cancel</button>
</div>
<script>
function cancel(){
console.log(111);
window.close();
}
var text;
var args=dialogArguments;
console.log(args);
text="<legend>"+args[0]+"</legend>";
for(var i=1,len=args.length;i<len;i++){
 text +="<label>"+args[i]+": <input id='f"+i+"'></label><br/>";
 document.getElementById("fields").innerHTML=text;
}
//console.log(text);

function okay(){
var returnValues = [];
for(var i=1,len=args.length;i<len;i++){
returnValues[i-1]=document.getElementById("f"+i).value;
window.close();
}
}
</script>
</form>
</body>
</html>
```
