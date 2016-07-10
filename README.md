# javascript性能优化
## 无阻赛加载脚本
通常大多数浏览器是可以并行下载组件的，但对于外部脚本并非如此。当浏览器开始下载外部脚本时，在脚本下载，解析并执行完毕之前，不会开始<br/>下载任何其他内容.任何已经在进程中的下载都不会被阻塞。（主要原因是因为脚本中可能有代码会改变Dom树，或者存在脚本之间的依赖）
## 避免因阻塞导致的减速
* XHR Eval
* XHR注入
* Script in Iframe
* Script Dom Element
* Script Defer
* document.write Script tag
