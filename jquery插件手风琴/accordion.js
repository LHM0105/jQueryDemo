(function($){
	//注册accordion插件
	$.fn.extend({
		accordion:function(){
//			console.log(this);//this是调用这个方法的jquery对象
			this.children('li').mouseenter(function(){
//				console.log(this);//this是触发事件的dom对象
				$(this).stop(true).animate({
					width:400
				},500).children('div').css('display','none');
				//其兄弟元素
				$(this).siblings().stop(true).animate({
					width:160
				},500);
			});
			this.children('li').mouseleave(function(){
				$(this).children('div').css('display','block');
			});
			//给ul添加鼠标离开效果
			this.mouseleave(function(){
//				console.log(this);//this是class='accordion'的ul的dom对象
				$(this).children().animate({
					width:200
				},300);
			});
		}
	});
})(jQuery);
