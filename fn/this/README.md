#this
* 和变量不同，关键字this没有作用域的限制，嵌套的函数不会从调用他的函数中继承this。
* 很多人错误的认为调用嵌套函数的this会指向调用外层函数的上下文。
* 如果你想访问这个外部函数this的值，可以将this的值保存在一个变量里，这个变量和内部函数都在一个作用域里。
```html

<html>
<script>
var o={
m:function(){                        //对象中的方法m()
var self=this;                //将this值保存在一个变量中
console.log(this ===o);       //true
f();                    //对象中的函数f();
function f(){
console.log(this ===o);   //false this指全局变量（非严格模式），undefined（strict）
console.log(self===o);      //self指外部函数this值
}
}
}
o.m();
</script>
</html>
```
