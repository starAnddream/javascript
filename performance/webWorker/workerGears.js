self.onmessage=function(event){
	self.postMessage("hello " + event.data +"!");
};