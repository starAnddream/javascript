;(function($){
	var Dialog=function(config){  //config为传递的配置对象
		var _this_=this;
		//默认参数配置
		this.config={
			//按钮组
			buttons:null,
			//弹框类型
			type:"ok",
			//多久关闭
			delay:null,
			//描述文字
			message:null,
			//尺寸
			width:"auto",
			//对话框遮罩层透明度
			maskOpacity:null,
			//动画
			animate:null,
			delayCallback:null,
		};
		if(config && $.isPlainObject(config)){
		$.extend(this.config,config);	
	}else{
		this.isConfig=true;
	};
	//创建Dom
	this.body=$("body");
	//创建遮罩层
	this.mask=$('<div class="g-dialog-container">');
	this.win=$('<div class="dialog-window">');
	this.winHeader=$('<div class="dialog-header"></div>');
	this.winContent=$('<div class="dialog-content"></div>');
	this.winFooter=$('<div class="dialog-footer">');
	this.create();
	};
	//默认参数扩展
	Dialog.zIndex=10000;
	Dialog.prototype={
		animate:function(){
			var _this_=this;
			this.win.css("-webkit-transform","scale(0,0)");
			setTimeout(function(){_this_.win.css("-webkit-transform","scale(1,1)")},100);
		},
		create:function(){
			
			var _this_=this,
			    config=this.config,
				win=this.win,
				mask=this.mask,
				header=this.winHeader,
				content=this.winContent,
				footer=this.winFooter,
				body=this.body;
		Dialog.zIndex++;
		this.mask.css("z-index",Dialog.zIndex);
		//如果没有传递参数，就弹出一个图标
		if(this.isConfig){
			//弹框类型
			win.append(header.addClass("warning"));
			this.animate();
			mask.append(win);
			body.append(mask);
		}
		else{
			//弹框类型
		header.addClass(config.type);
		win.append(header);
		//添加文本信息
		if(config.message)
        win.append(content.html(config.message));
	    //插入按钮
	    if(config.buttons){
			_this_.createButtons(footer,config.buttons);
			win.append(footer);
		}
		//宽度
		if(config.width!="auto"){
			win.width(config.width);
		}
		//透明度
		if(config.maskOpacity){
			mask.css("backgroundColor","rgba(0,0,0,"+config.maskOpacity+")");
		}
		//设置弹出框弹出多久关闭
		if(config.delay&&config.delay!=0){
			setTimeout(function(e){
				_this_.close();
				if(config.delayCallback){
					config.delayCallback();
				}
				   
					
			},config.delay);
		}
		if(config.animate){
			_this_.animate();
		}
        mask.append(win);
        body.append(mask);		
		}
		mask.tap(function(e){
			e.preventDefault();
			e.stopPropagation();
			_this_.close()});
		},
		close:function(){
			this.mask.remove();
		},
		
		createButtons:function(footer,buttons){
			var _this_=this;
			/*buttons:[
			{type:"red",
			 text:"确定",
			 callback:function(){alert(1)}
			},
			{type:"green",
			 text:"取消",
			 callback:function(){}
			}
			],*/
			$(buttons).each(function(){
				var type=this.type?" class='"+this.type+"'":"";
				
				var btnText=this.text;
				var button=$("<button"+type+">"+btnText+"</button>");
			
				var callback=this.callback?this.callback:null;
				if(callback){
					button.tap(function(){
					var isClose=callback();
					if(isClose)
					_this_.close();
					});
				}
				footer.append(button);
				
			});
		},
		
		
	};
	window.Dialog=Dialog;
	$.dialog=function(config){
		return new Dialog(config);
	}
})(Zepto);