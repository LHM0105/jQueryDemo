//以注册jquery插件的方式写
(function($){
	//插件的构造函数
	function Slider(jqueryObj){
		//传入的参数是调用这个插件的jquery对象
		this.el = jqueryObj;
		
		this.oImgList = this.el.children('.img-list');
		this.aImgList = this.el.children('.img-list').children('li');//图片集合
		//为实现无缝切换，向ul最后再添加一次第一张图片
		this.aImgList.eq(0).clone().appendTo(this.oImgList);
		this.aImgList = this.el.children('.img-list').children('li');//图片集合
		//获取图片宽度图片宽度就是盒子宽度
		this.iImgW = this.el.width();
		
		//获取图片数量
		this.iImgNum = this.aImgList.length;
		
		
		//设置ul宽度 和 图片显示
		this.oImgList.css({
			width:this.iImgW * this.iImgNum,
			left:this.iImgIndex * this.iImgW
		});
		//设置li宽度
		this.aImgList.css('width',this.iImgW);
		
		//添加小按钮
		var sBtnList = '';
		for(var i = 0;i<this.iImgNum-1;i++){
			sBtnList += '<li></li>';
		}
		
		this.el.children('.btn-list').append(sBtnList);
		//设置小按钮位置在正中央
		this.el.children('.btn-list').css('margin-left',-this.el.children('.btn-list').width()/2);
		//获取小按钮集合
		this.aBtnList = this.el.children('.btn-list').children('li');
		this.aBtnList.eq(0).addClass('active');
		
		this.aImgList.eq(0).addClass('active');
		//鼠标放上，显示切换按钮
		this.el.hover(function(){
			this.el.children('a').css('display','block');
			clearInterval(this.iTimer);//清除自动切换的定时器
		}.bind(this),function(){
			this.el.children('a').css('display','none');
			this.autoMove();//再次执行自动切换的方法
		}.bind(this));

		//点击向右切换按钮
		this.el.children('.slider-r').on('click',function(){
			
			//改变按钮显示
			var iBtnIndex = $(this).siblings('.btn-list').children('.active').index() + 1;
			if(iBtnIndex >= $(this).siblings('.btn-list').children().length){
				iBtnIndex=0;
			}
			//显示当前小按钮
			$(this).siblings('.btn-list').children('li').eq(iBtnIndex).addClass('active').siblings().removeClass('active');
			
			//改变图片显示
			var iImgIndex = $(this).siblings('.img-list').children('.active').index() + 1;
			if(iImgIndex > $(this).siblings('.btn-list').children().length){
				$(this).siblings('.img-list').css('left',0);
				iImgIndex=1;
			}
			$(this).siblings('.img-list').stop(true).animate({'left':-iImgIndex*$(this).parent().width()},500).children('li').eq(iImgIndex).addClass('active').siblings().removeClass('active');

		});
		
		
		//点击向左切换按钮
		this.el.children('.slider-l').on('click',function(){
			//改变按钮显示
			var iBtnIndex = $(this).siblings('.btn-list').children('.active').index() - 1;
			if(iBtnIndex < 0 ){
				iBtnIndex=$(this).siblings('.btn-list').children().length - 1;
			}
			//显示当前小按钮
			$(this).siblings('.btn-list').children('li').eq(iBtnIndex).addClass('active').siblings().removeClass('active');
			
			//改变图片显示
			var iImgIndex = $(this).siblings('.img-list').children('.active').index() - 1;
			
			if(iImgIndex < 0 ){
				$(this).siblings('.img-list').css('left',-$(this).siblings('.btn-list').children().length * $(this).parent().width());
				iImgIndex= $(this).siblings('.btn-list').children().length - 1;
			}
			$(this).siblings('.img-list').stop(true).animate({'left':-iImgIndex*$(this).parent().width()},500).children('li').eq(iImgIndex).addClass('active').siblings().removeClass('active');

		});
		
		
		//滑过小按钮切换
		this.el.children('.btn-list').on('mouseover','li',function(){
			//小按钮变色
			$(this).addClass('active').siblings().removeClass('active');
			
			//图片变化 
			$(this).parent().siblings('.img-list').stop(true).animate({'left':-$(this).index()*$(this).parent().parent().width()},500).children('li').eq($(this).index()).addClass('active').siblings().removeClass('active'); 
			
		});
		
		
		//自动切换的方法
		this.autoMove = function(){
			//定时器
			this.iTimer = setInterval(function(){
				//改变按钮显示
				var iBtnIndex = this.el.children('.btn-list').children('.active').index() + 1;
				if(iBtnIndex >= this.el.children('.btn-list').children().length){
					iBtnIndex=0;
				}
				//显示当前小按钮
				this.el.children('.btn-list').children('li').eq(iBtnIndex).addClass('active').siblings().removeClass('active');
				//改变图片显示
				var iImgIndex = this.el.children('.img-list').children('.active').index() + 1;
				if(iImgIndex > this.el.children('.btn-list').children().length){
					this.el.children('.img-list').css('left',0);
					iImgIndex=1;
				}
				this.el.children('.img-list').animate({'left':-iImgIndex*this.el.width()},500).children('li').eq(iImgIndex).addClass('active').siblings().removeClass('active');
			
			}.bind(this),3000);
		}
		//执行自动切换方法
		this.autoMove();
	}
	
	//注册插件
	$.fn.extend({
		slider:function(){
			this.each(function(k,v){
				//v是dom对象
				new Slider($(v));
			});
		}
	});
})(jQuery);
