#let和var关键字的异同
* 声明后未赋值，表现相同
```javascript
'use strict';

(function() {
  var varTest;
  let letTest;
  console.log(varTest); //输出undefined
  console.log(letTest); //输出undefined
}());
````
* 使用未声明的变量，表现不同:
```javascript
(function() {
  console.log(varTest); //输出undefined(注意要注释掉下面一行才能运行)
  console.log(letTest); //直接报错：ReferenceError: letTest is not defined

  var varTest = 'test var OK.';
  let letTest = 'test let OK.';
}());
````
* 重复声明同一个变量时，表现不同：
```javascript
'use strict';

(function() {
  var varTest = 'test var OK.';
  let letTest = 'test let OK.';

  var varTest = 'varTest changed.';
  let letTest = 'letTest changed.'; //直接报错：SyntaxError: Identifier 'letTest' has already been declared

  console.log(varTest); //输出varTest changed.(注意要注释掉上面letTest变量的重复声明才能运行)
  console.log(letTest);
}());
````
* 变量作用范围，表现不同
```javascript
'use strict';

(function() {
  var varTest = 'test var OK.';
  let letTest = 'test let OK.';

  {
    var varTest = 'varTest changed.';
    let letTest = 'letTest changed.';
  }

  console.log(varTest); //输出"varTest changed."，内部"{}"中声明的varTest变量覆盖外部的letTest声明
  console.log(letTest); //输出"test let OK."，内部"{}"中声明的letTest和外部的letTest不是同一个变量
}());
````
##let现在还不是ECMAScript的规范，谷歌的支持性不是很好。
* JavaScript1.7中let的出现解决了JavaScript中缺少块级作用域的短板，谷歌中引入let会报错可以引入版本号
```javascript
<script type="application/javascript version=1.7">
```
