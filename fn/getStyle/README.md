#查询计算样式
* getComputedStyle(arg1,arg2)获得一个元素的计算样式
* arg1:必须，元素
* arg2:通常是null或者空字符串，或者是伪元素：before,:after,:first-line,:first-letter
```javascript
var size=parseInt(window.getComputedStyle(e,"").fontSize);
var color=window.getComputedStyle(e,"").backgroundColor;
````
