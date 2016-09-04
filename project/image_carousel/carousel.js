function carousel(time){
	var step=1;
	steps=document.querySelectorAll(".slider_child").length;
	time=time?time:1000;
	setInterval(function(){
		document.querySelector('.slider').setAttribute('data-animation-step',
		step=++step>steps?1:step);
		console.log(steps);
	},time);	
}
carousel(1000);