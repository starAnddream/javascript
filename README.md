# javascript性能优化
## 无阻赛加载脚本
    通常大多数浏览器是可以并行下载组件的，但对于外部脚本并非如此。当浏览器开始下载外部脚本时，在脚本下载，解析并执行完毕之前，不会开始     下载任何其他内容.任何已经在进程中的下载都不会被阻塞。（主要原因是因为脚本中可能有代码会改变Dom树，或者存在脚本之间的依赖）
## 避免因阻塞导致的减速
* XHR Eval
* XHR注入
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
* document.write Script tag
```javascript
document.write("<script src="a.js"type="text/javascript"></script>");
```
