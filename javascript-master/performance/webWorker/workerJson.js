self.onmessage=function(event){
	var jsonText=event.data;
	//var jsonData=JSON.parse(jsonText);
	//console.log(jsonText);
	self.postMessage("hello " + jsonText.type +"!");
};