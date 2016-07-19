# javascript性能优化
## 无阻赛加载脚本
通常大多数浏览器是可以并行下载组件的，但对于外部脚本并非如此。当浏览器开始下载外部脚本时，在脚本下载，解析并执行完毕之前，<br/>
不会开始下载任何其他内容.任何已经在进程中的下载都不会被阻塞。（主要原因是因为脚本中可能有代码会改变Dom树，或者存在脚本之间的依赖）</br>
## 避免因阻塞导致的减速
* XHR Eval
不会触发忙指示器
  https://github.com/starAnddream/javascript/blob/master/performance/script/XHR_eval.html
* XHR注入
不会触发忙指示器
  https://github.com/starAnddream/javascript/blob/master/performance/script/XHR.html
* Script in Iframe
```javascript
<iframe src="script.html"width=0 height=0 frameborder=0 id="frame"></iframe>
```
* Script Dom Element`(允许跨域获取脚本)`
```javascript
var scriptEle=document.createElement('script');
scriptEle.src='http://wwww.script.js';
document.getElementsByTagName('head')[0].appendChild(scriptEle);
```
* Script Defer`当浏览器不必立即加载脚本，脚本中不包含对document.write()的调用，当前页面中没有其他脚本依赖于他`
```javascript
<script defer src="a.js"></script>
```
* document.write Script tag`虽然多个脚本会并行下载（所有document.write都在一个script语句块中）但浏览器依然会阻碍其他类型的资源`
```javascript
document.write("<script src="a.js"type="text/javascript"></script>");
```
# 如何选择脚本加载方案？
* 考虑是否跨域 是否需要按顺序加载 忙指示器 支持并行下载的浏览器做出做适合最优的选择
对于执行顺序：对于IE，defer,document.write,script Tag能够保证按顺序执行无论是哪个先下载完。<br/>
              对于firefox Dom script能够保证脚本按顺序执行
* 脚本按照特定顺序执行也并非那么重要，当脚本没有依赖时，不按顺序执行加载会更快！
## 方案
* 不同域、无序：script Dom Element
* 不同域按顺序：IE中使用defer,firefox中使用Dom Element
* 同域、无序、无忙指示器：XHR注入
* 同域、无序、有忙指示器：iframe看似是最佳选择，但是开销较大，建议使用XHR注入，可以使用额外的javascript来激活忙指示器<br/>
                          管理XHR注入：当XHR发出时激活状态栏和光标，返回时恢复。
