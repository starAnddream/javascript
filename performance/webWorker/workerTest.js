var workerPool=google.gears.workerPool;
workerPool.onmessage=function(ignore1,ignore2,e){
	var value=e.body;
	workerPool.sendMessage(value,e.sender)
}