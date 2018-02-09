let http = require('http');
let fs = require("fs");
let buf = new Buffer(1024);
let readline = require('readline');
let os = require('os');

http.createServer(function(request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {
		'Content-Type': 'text/plain'
	});

	// 发送响应数据 "Hello World"
	// response.end('Hello World\n');
	console.log("准备打开文件！");
	const rl = readline.createInterface({
		input: fs.createReadStream('data.txt'),
		crlfDelay: Infinity
	});
	let lastTime = 0;
	let timeJson = 'data={';
	let index = 0;
	rl.on('line', (line) => {
		// console.log(`Line from file: ${line}`);
		let timeStr = line.slice(10, 26);
		let currentTime = converToMicroSecondes(timeStr);
		if (lastTime !== 0) {
			spendTime = currentTime - lastTime;
			lastTime = currentTime;
			timeJson += '"' + index + '":' + spendTime + ',';
		} else {
			lastTime = currentTime;
		}
		index++;

	}).on('close', () => {
		timeJson += "}"
		console.log(timeJson);
		fs.open('log.js', "w+", function(err, fd) {
			if (err) {
				return console.error(err);
			}
			fs.writeFile(fd, timeJson, function(err) {
				if (err) {
					return console.error(err);
				}
			});
		});
	})

	function converToMicroSecondes(str) {
		let hours = parseInt(str.slice(0, 3));
		let minutes = parseInt(str.slice(4, 6));
		let secondes = parseInt(str.slice(7, 9));
		let microSecondes = parseInt(str.slice(10, 17));
		let sumMicroSecondes = (hours * 3600 + minutes * 60 + secondes) * 1000000 + microSecondes;
		return sumMicroSecondes;
	}
	// fs.open('./data.txt', 'r+', function(err, fd) {
	// 	if (err) {
	// 		return console.error(err);
	// 	}
	// 	console.log("文件打开成功！");
	// 	console.log("截取10字节后的文件内容。");

	// 	// 截取文件
	// 	fs.ftruncate(fd, 10, function(err) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		console.log("文件截取成功。");
	// 		console.log("读取相同的文件");
	// 		fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
	// 			if (err) {
	// 				console.log(err);
	// 			}

	// 			// 仅输出读取的字节
	// 			console.log(buf);
	// 			console.log(bytes);
	// 			if (bytes > 0) {
	// 				console.log(buf.slice(0, bytes).toString());
	// 			}

	// 			// 关闭文件
	// 			fs.close(fd, function(err) {
	// 				if (err) {
	// 					console.log(err);
	// 				}
	// 				console.log("文件关闭成功！");
	// 			});
	// 		});
	// 	});
	// });
	response.end('end\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');