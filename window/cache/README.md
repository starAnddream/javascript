#应用程序缓存
* 应用程序缓存和一般的浏览器缓存不同，他不会随着用户清楚浏览器缓存而被清除
* 缓存清单
```javascript
CACHE MANIFEST
CACHE:
index.html

FALLBACK:  //第一个URL是前缀，任何能匹配到该前缀的资源都不会被缓存，当网络获取失败的时候会用第二个指定的url缓存来代替
videos/  offline_help.html

NETWORK:      //从不缓存，总是通过网络获取，该区域中的资源的URL都只含url前缀，用来表示所有以此前缀开头的资源都要通过网络加载
cgi/
````

##缓存的更新<br/>
* 在线状态下，浏览器会异步检查清单文件是否有更新，如果修改了一个缓存文件，需要更新，则可以更新版本号
```javascript
CACHE MANIFEST
CACHE:
#Myapp version 1 //更改这个数字便让浏览器重新下载文件
index.html
````
* 如果需要从web应用从缓存中“卸载”<br/>
需要在服务器端删除清单文件，另外需要修改HTML，使得断开连接
* 更新缓存何时生效？<br/>
需要注意的是，浏览器检查清单文件以及更新缓存操作都是异步的，可能实在缓存载入应用之前，也可能是同时进行，所以在更新清单文件之后
用户必须载入应用两次才能保证最新的版本生效；<br/>
第一次是从缓存中载入老版本随后更新缓存<br/>
第二次是从缓存中载入最新版本<br/>

##浏览器的更新缓存会会触发一系列事件<br/>
* 有可用的更新<br/>
如果应用程序已经缓存了并且清单文件发生了改动<br/>
downloading(开始下载，缓存清单文件)->progress（间断性触发，每个文件下载完成时）->updateready（下载完成后触发，加载到应用中）
* 首次载入新的应用<br/>
downloading(开始下载，缓存清单文件)->progress（间断性触发，每个文件下载完成时）->cached（下载完成后触发）
* 没有可用的更新<br/>
如果应用程序已经缓存，并且清单文件没有改动，会触发noupdate事件
* 离线状态<br/>
无法检查清单文件，会触发error
* 清单文件不存在<br/>
返回404，触发obsolete
###example计算出下载完成比例，如果不是process事件，则统计调用次数<br/>
```javascript
window.progresscount=0;
window.applicationCache.onprocess=function(e){
var process="";
if(e && elengthComputable)
process=" "+Math.round(100* e.loaded/e.total)+"%";
else
process="("+ ++progresscount +")";
return false;
};
`````

