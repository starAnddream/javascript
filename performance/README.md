#javascript性能优化 
##jQuery性能优化
* 【使用最佳选择器】

使用JQuery时，你可以使用多种选择器，选择同一个元素，各种方法之间的性能是不一样的，有时候差异会特别大。 通常比较常用的选择器有以下几个：
ID选择器 $("#id")
标签选择器 $("td")
类选择器 $(".target")
属性选择器 $("td[target='target']")
伪类选择器 $("td:hidden")
根据经验，我们应该知道这5种选择器的性能是依次下降的，我们不妨来做个测试，看看他们的性能到底有多大差异：
测试html片段：
```javascript
 <table width="98%" cellspacing="1" cellpadding="0" border="0" style="table-layout:fixed" id="mytable"> 
```
```javascript 
 <tr>     <td bgcolor="#aaaaaa" align="center" class="target" target="target" style="display:none;" id="target-td">e</td>
```
```javascript 
 </tr> </table>
```
测试结果<br>
测试方案：对每个脚本执行1w次，统计3次运行结果的平均值<br>
方案	IE6	IE7	IE8	IE9	chrome	firefox	opera	safari<br>
$("#mytable td.target")	5150	5630	780	293	69	148	31	102<br>
$("#mytable .target")	5320	5780	940	297	61	141	32	101<br>
$("#mytable").find("td.target")	4840	5000	1250	387	95	205	73	157<br>
$("#mytable").find(".target")	5000	5150	1400	226	49	130	60	64<br>
$("#mytable td[target=target]")	16410	17660	940	406	89	166	35	120<br>
$("#mytable td:hidden")	25000	26720	23750	3638	632	1123	3434	569<br>
$("#target-td")	630	620	310	62	9	28	12	18<br>
$(".target")	10310	10790	940	207	36	181	47	44<br>
document.getElementById("target-td")	150	150	160	6	1	1	5	2<br>
结论
原生方法是最快的方法，如果可能，尽量选择用原生
性能顺序：ID选择器 > 标签选择器 > 类选择器 > 属性选择器 > 伪类选择器
ID(getElementById)、标签选择器(getElementsByTagName)都有原生的方法对应，所以很快；类选择器在除了IE5-IE8之外的主流浏览器几乎都有原生方法(getElementsByClassName)
为了兼顾IE6、7、8的性能，避免使用全局的类选择器；
属性和伪类选择器非常慢，如非必要，尽量少使用伪类选择器和属性选择器

最佳实践
为模块中操作最频繁的元素和根元素设置id，然后缓存；
对没有id的元素检索，尽量采用路径最短的祖先元素id作为默认的搜索范围，并采用纯类选择器或者标签选择器；
尽量避免复杂的选择器


* 【避免执行全局查找】
```javascript
 $("div.bizHelp");
=>
 $("#container").find(".bizHelp");
```
保证查询的路径最短，性能最优，参照第一条；

* 【避免对空结果进行操作】

对于数量为0的选择结果，JQuery会执行默认动作，并且不会报错，这会影响程序的性能。
```javascript
 var blank=$(".blank");//length=0
A :
 blank.slideUp();
B:
 blank.length && blank.slideUp();
```
测试结果<br>
测试说明：1w次执行耗时，单位毫秒/ms,统计三次运行的平均值<br>
方案	IE6	IE7	IE8	IE9	chrome	firefox	opera	safari<br>
A	6110	5610	1344	488	103	194	108	155<br>
B	0	0	0	0	0	0	0	0<br>
结论<br>
应该避免对空对象进行操作； <br>

* 【采用样式表，避免多次调整样式】

对一个对象应用多个样式，最好采用样式表的方式，避免多次应用。
```javascript
var obj=$("#obj");
A:
 obj.css("width",200); obj.css("height",200); obj.css("background":"#eee");
B:
 obj.attr("style","width:200px;height:200px;background:#eee;");
C:
 .css-operation{width:200px;height:200px;background:#eee;}  obj.addClass("css-operation")
```
测试结果<br>
测试说明：1w次执行耗时，单位毫秒/ms,统计三次运行的平均值<br>
方案	IE6	IE7	IE8	IE9	chrome	firefox	opera	safari<br>
A	2594	2486	1500	501	163	222	190	191<br>
B	1000	953	547	190	79	28	15	86<br>
C	843	672	407	111	21	17	16	31<br>
结论
性能排序：C>B>A
样式和JS分离的方案性能最佳，适用于要同时设置多个样式的场景；
如果只应用单个样式，简单起见可以考虑采用方案A
如果应多若干个样式，而且不愿意新建一个css class，可以采用B；


* 【避免使用匿名函数】

大量的使用匿名函数会对程序的调试、维护以及通过第三方软件来做性能测试增加难度，因此应该尽量避免大量的使用匿名函数
```javascript
 obj.click(function(){   //do something... })
=>>
 var clickHandler=function(){   //do something... } obj.click(clickHandler)
```
【大循环采用更高效的遍历方式】

JQuery提供了$.fn.each()和$.each()两个方法来实现对集合的遍历，除此之外，还可以采用JS原生的for循环、while等来实现迭代，应该了解一下他们之间的性能差异：
```javascript
 var list=ul.find("li"),e;
A:
 var i=list.length; while(i--){     e=$(list[i]) }
B:
 list.each(function(){   e=$(this); });
C:
 $.each(list,function(){   e=$(this); });
```
测试结果<br>
测试说明：1w次执行耗时，单位毫秒/ms,统计三次运行的平均值<br>
方案	IE6	IE7	IE8	IE9	chrome	firefox	opera	safari<br>
A	172	219	157	30	3	5	4	6<br>
B	219	234	203	41	4	6	5	8<br>
C	219	234	187	52	3	4	5	7<br>
结论
总体上来说A>C>B
方案A有大约25%的性能提升，但是不稳定；
在IE浏览器下B方案和C方案性能相当，A方案有比较绝对的优势；
Chrome、firefox下A方案的性能不稳定；
最佳实践
追求极致性能，用方案A；
循环数量少的话，建议使用方案C，比较稳定；

* 【优先使用原生属性】

很多常用的属性，比如id、name等都被浏览器原生实现，在JQuery中我们有时会用$(this).attr("id")的方式来获取id，这种方法的效率相比原生属性的获取效率而言，非常慢。
 $.each(list,function(){   //A   var id=$(this).attr("id");
   //B   var id=this.id; })
测试结果<br>
测试说明：10w次执行耗时，单位毫秒/ms,统计三次运行的平均值<br>
方案	IE6	IE7	IE8	IE9	chrome	firefox	opera	safari<br>
A	6880	7030	4220	1188	157	244	133	135<br>
B	310	310	150	27	4	5	17	3<br>
结论
使用原生的API，可以极大的提高性能
最佳实践
对于id等常用的属性，用原生的属性，不要通过attr去获取；

* 【使用事件委托】

经常会遇到给一个列表中所有元素添加点击事件的业务场景，传统的做法是得到这个列表的JQuery对象:$("li"),然后添加click事件：
```javascript
 $("li").click(function(){})
```
这种方法的在列表数量比较大的时候会有严重的性能问题，应该值得关注。JQuery在很早的版本中已经引入了事件委托机制，可以很大程度的降低添加事件监听的消耗和内存的消耗。
对1w条记录的列表进行测试：
```javascript
A:
 var list=$("li");//length>1   list.click(function(){ })
B:
 $("ul").delegate("li","click",function(){})
```
测试结果<br>
测试说明：对1w个<li>标签进行click事件添加的耗时，单位毫秒/ms,统计三次运行的平均值<br>
方案	IE6	IE7	IE8	IE9	chrome	firefox	opera	safari<br>
A	2156	2172	1922	312	103	173	141	117<br>
B	0	0	0	0	0	0	0	0<br>
结论
委托的性能优势是非常绝对的；
最佳实践
对于需要同时给两个以上的同类型元素添加事件时，用方案B来代替A

* 【缓存查找的中间结果】
```javascript
 $(".list-item").show(); $(".list-item").hide();
=>
 var listItem=$(".list-item"); listItem.show(); listItem.hide();
```
* 【减少DOM操作，尽量批量更新】

Dom操作是浏览器操作中最为耗时的操作之一，JQuery中提供了append、appendTo、prepend、prependTo、after、before、insertAfter、wrap等操作dom的实用方法，频繁使用这些方法可能会引起性能问题，一个提高性能的实践原则就是“尽可能少的使用它们”。 如果一定要用到，也尽可能的采用合并、批量操作来减少dom的操作消耗。
* 【使用$.data 而不是$.fn.data】
```javascript
 $(elem).data(key,value); $.data(elem,key,value);
```
后者比前者快近10倍

* 【可能的话，使用最新版本的JQuery】

新版本总会对性能进行改进，还会提供一些非常好用的工具，如果可以的话，应该尽量选用最新的版本；

* 【jQuery html性能大坑】

jQuery的html方法的作用是为dom元素设置innerHTML，分析html的源代码（1.8.3）
if ( elem.nodeType === 1 ) {    jQuery.cleanData( elem.getElementsByTagName( "*" ) );    elem.innerHTML = value;}
在设置dom的innerHTML之前，会执行jQuery.cleanData，这个方法会对dom元素做一些clean的处理，如removeEvent，删除缓存等。
以两百行的列表为例，在ff浏览器中，该方法会执行大约5ms到8ms。即当dom元素为空时和dom元素中有两百行数据时，执行html方法，后者会比前者多运行5ms到8ms。
坑点
cleanData方法在jQueryUI中也会定义，且会重写$.cleanData，增加一些额外的操作，性能会受到影响。
还是以两百行的列表为例，在ff浏览器中，该方法会执行大约60ms到70ms。即当dom元素为空时和dom元素中有两百行数据时，执行html方法，后者会比前者多运行60ms到70ms。
解决方案
1. 采用原生的dom.innerHTML
2.在执行html()方法之前，先执行remove()方法

jQuery性能优化出自 “安大叔性能测试” 博客，请务必保留此出处http://andashu.blog.51cto.com/8673810/1375329
