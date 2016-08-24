#浏览器嗅探方法jQuery1.4.1
* navigator有四个属性<br/>
appName:web浏览器全称<br/>
appVersion:包含浏览器厂商和版本信息<br/>
userAgent:USER-AGENT-HTTP头部中发送的字符串<br/>
platform:操作系统<br/>
```javascript
var browser=(function(){var s=window.navigator.userAgent.toLowerCase();
console.log(s);
var match=/(webkit)[\/]([\w.]+)/.exec(s)||
           /(opera)(?:.*version)?[\/]([\w.]+)/.exec(s)||
		   /(mise)([\w.]+)/.exec(s)||
           !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s)||[];
		   return {name:match[1] || "",version:match[2] || "0"};
})()
console.log(browser);
```
###此外，navigator还包含一些非标准化的属性<br/>
onLine：是否连接到网络<br/>
geolocation:确定用户地理位置的接口<br/>
javaEnabled():当浏览器可以运行java小程序时返回true<br/>
cookieEnabled():如果浏览器可以保存永久的cookie时，返回true<br/>
