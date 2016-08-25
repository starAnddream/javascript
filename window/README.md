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
