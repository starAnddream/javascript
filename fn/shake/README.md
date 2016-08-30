#CSS动画
* 使用setTimeout和setInterval重复调用函数来修改元素的内联样式！
* shake:抖动，通过修改e.style.left的值
* fadeOut:淡出，通过修改透明度来实现
```html
<button onclick="shake(this,fadeOut)">Shake and Fade</button>
<script>
function shake(e,oncomplete,distance,time){
if(typeof e === "string")e=document.getElementById(e);
if(!distance)distance=5;
if(!time)time=500;
var originStyle=e.style.cssText;

e.style.position="relative";
var start=(new Date()).getTime();
animate();
function animate(){
var now=(new Date()).getTime();
var elapsed=now-start;
var fraction=elapsed/time;
if(fraction<1){             //如果动画未完成
var x=distance * Math.sin(fraction * 4 * Math.PI);
e.style.left=x+"px";
//25ms后在总时间的最后尝试运行函数
//为了产生每秒40帧的动画
setTimeout(animate,Math.min(25,time-elapsed));
}else{
e.style.cssText=originStyle;//恢复原始样式
if(oncomplete)oncomplete(e);
}
}
}
function fadeOut(e,oncomplete,time){
if(typeof e === "string")e=document.getElementById(e);
if(!time)time=500;
var start=(new Date()).getTime();
//精巧的非线性，一开始淡出得比较快，后面越来越慢
var ease=Math.sqrt;
animate();
function animate(){
var now=(new Date()).getTime();
var elapsed=now -start;
var fraction=elapsed/time;
if(fraction<1){
var opacity=1-ease(fraction);
e.style.opacity=String(opacity);
setTimeout(animate,Math.min(25,time-elapsed));
}else{
console.log(e.style.cssText);
e.style.opacity="0";

if(oncomplete)oncomplete(e);
}

}
}

</script>
```
##使用css3过渡属性transition代替fadeOut()
```css
.fadeable{
transition:opacity 0.5s ease-in
}
```
