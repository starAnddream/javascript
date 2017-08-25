# javascript正则
* javascript中的正则表达式有两种<br>
对象构造函数
``` javascript
var reg1=new RegExp("[A-Z]","g");
```
直接量表达式
``` javascript
var reg2=/[A-Z]/g
```
第二种可以直接使用，无须处理，是最快速的方法。所以尽量避免使用RegExp对象，除非要动态生成正则表达式
### replace还有一种鲜为人知的用法，就是第二个参数传函数
每出现一次匹配到的字符串，就执行一遍该函数<br>
demo:https://github.com/starAnddream/javascript/blob/master/reg/replace.html
## 字符类
``` javascript
\w        任何ASCII字符等价于[a-zA-Z0-9]
\W        非ASCII字符
\d        数字 [0-9]
\D        非数字
\s        空白
\S        非空白
.         除换行符与终止符的任意字符   eg:用c.t匹配cot,cat,如果模式里包含一个点，需要在点前加“\”特殊转义字符，如.a..\.jpg,
          以此类似，匹配斜杠也需要转义  \\
[....]    括号内的任意字符
[^...]    不包含括号内的任意字符  ^的效果将作用于字符集里的所有字符或字符区间，而不是后面紧跟的字符或字符区间
-         这个字符在[]内表示范围，在[]外事普通字符，所以不需要被反斜杠转义
```
eg:/[\s\d]/匹配任意空白符或者数字
## 重复
``` javascript
{m,n}      前一项至少m次，不超过n次
{m,}             至少m次
{m}                  m次
?          匹配前一项0次或1次，也就是说前一项可选
+                    至少1次  如果匹配+本身需要转义
*                   0次或多次
```
* eg:/\w{3}\d?/ 匹配3个单词和一个可选数字
*  /[^(]*/      匹配不包含左括号的0个或多个字符
* 非贪婪的重复
在使用 * 和？时，由于这些字符可能匹配0个字符，因此，无论是什么都能匹配。如"/a* /"能匹配“bbb”<br/>
解决办法：在待匹配的字符后跟随一个问号？ “??”,"*?"{1,5}?

## 选择，分组，引用
``` javascript
|       选择左边或右边
(...)    组合
(?:....)  只组合
\n
```
## 制定匹配位置
``` javascript
$    结尾
^    开头
\b   边界
\B   非边界
(?=p)    零宽正向先行断言，接下来的字符与P匹配
(?!p)     零宽正向先行断言，接下来的字符不与P匹配
(?m)    分行匹配，必须放在行首    eg:(?m)^\s*//.*$  匹配所有注释
```
## 修饰符
``` javascript
i      不区分大小写
g     全局
m      多行
````
* 使用POSIX字符类
``` javascript
[:xdigit:]      十六进制数，等价于[a-fA-F0-9]
[:lower:]       任何一个小写字母
[:upper:]       大写字母
[:blank:]       空白符
```
* 回溯引用：前后一致匹配
eg:<[Hh][1-5]>.*?</[Hh][1-5]><br/>
``` html
<h1>welcome to you come</h1>
<h2>welcome to you come</h2>
<h3>welcome to you come</h3>
<h5>welcome to you come</h5>
```
分析：如果<[Hh][1-5]>.*</[Hh][1-5]>没有问号,则进入贪婪模式，从第一个h1匹配到/h5</br>
<p>接下来我们看看这个例子</p>
``` html
<h1>welcome to you come</h3>
```
这种情况也会匹配到</br>
eg:<[Hh]([1-5])>.*?</[Hh]\1><br/>
<span>可以把回溯引用看成一个变量</span>
##### 回溯引用在替换中的应用
```html
313-555-1234
312-559-0000
323-553-1234
313-553-1234
```
reg:(\d{3})(-)(\d{3})(-)(\d{4})<br/>
replace:($1) $3-$5<br/>
result:
``` html
(313) 555-1234
(312) 559-0000
(323) 553-1234
(313) 553-1234
```
#### 向前匹配与向后匹配
```js
// 向后匹配
// (?=)  匹配
// (?!)  不匹配
var str = "abcx1 abcy2 abcz3";

// 匹配后边是y的abc
a = preg_replace('/abc(?=y)/', '0', str);// abcx1 0y2 abcz3

// 匹配后边不是y的abc
b = preg_replace('/abc(?!y)/', '1', str);// 1x1 abcy2 1z3
```
// ===================================
```js
// 向前匹配 注意有小于号
// (?<=)  匹配
// (?<!)  不匹配

var str = "1xabc 2abc 3zabc";

// 匹配前一个字符是数字的abc
var a = replace('/(?<=\d)abc/', '0', str);// 1xabc 20 3zabc

// 匹配前一个字符不是数字的abc
var b = replace('/(?<!\d)abc/', '1', str);// 1x1 2abc 3z1
```
#### 正则对象方法
1. test()
* arg1:被检测字符串
* return: true/false
2. exec()
* arg1:被检测字符串
* return:null/array
##### array:
* index:声明匹配文本的第一个文本位置
* input:存放被检索的字符串
##### 非全局调用，返回的数组res
* 第一个元素是与正则表达式匹配的文本
* 第二个元素是正则对象与第一个子表达式相匹配的文本(如果有分组)
###### res.index匹配结果的第一个字符
#### 字符串对象方法
1. search()
* arg1:regexp
* return:如果没有找到任何匹配的子串，则返回 -1。
2. match()
* arg1:regexp
* return:match() 将返回 null。否则，它将返回一个数组,与exec非全局调用下一致
###### 全局调用没有index，没有分组信息，没有lastIndex
3. split()
4. replace()
* 可以加回调函数

