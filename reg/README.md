#javascript正则
* javascript中的正则表达式有两种<br>
对象构造函数
```javascript
var reg1=new RegExp("[A-Z]","g");
```
直接量表达式
```javascript
var reg2=/[A-Z]/g
```
第二种可以直接使用，无须处理，是最快速的方法。所以尽量避免使用RegExp对象，除非要动态生成正则表达式
###replace还有一种鲜为人知的用法，就是第二个参数传函数
每出现一次匹配到的字符串，就执行一遍该函数<br>
demo:https://github.com/starAnddream/javascript/blob/master/reg/replace.html
##字符类
```javascript
\w        任何ASCII字符等价于【a-zA-Z0-9】
\W        非ASCII字符
\d        数字 [0-9]
\D        非数字
\s        空白
\S        非空白
.         除换行符与终止符的任意字符
[....]    括号内的任意字符
[^...]    不包含括号内的任意字符
```
eg:/[\s\d]/匹配任意空白符或者数字
