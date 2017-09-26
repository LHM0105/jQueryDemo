(function($){
	//构造函数
	function Waterfall(jquerybox){
		this.el = jquerybox;//要进行瀑布流操作的jquery对象
		//资源加载成功后，否则会出现排列出错
		$(window).load(function(){
			//排列图片的方法
			this.arrange = function(){
				//获取图片宽度
				this.iOutImgW = this.el.children('.center-box').children('img').outerWidth(true);
				//计算图片列数
				this.iCol = Math.floor(this.el.width() / this.iOutImgW); 
				//计算内部盒子center-box宽度(使其居中显示)
				this.el.children('.center-box').css('width',this.iCol * this.iOutImgW);
				this.aColH = [];//存储每列的高度
				//遍历每张图片
				this.el.children('.center-box').children('img').each(function(k,v){
					if(k < this.iCol){
						$(v).css({
							'left':k * this.iOutImgW,
							'top':10
						});
						
						//把每列高度存入数组
						this.aColH.push($(v).outerHeight(true));
						
					}else{
	//					//找出最小高度
						var iMinH = Math.min.apply(null,this.aColH);
//						var iMinH = Math.min(...this.aColH);
	//					找出最小高度的列
						var iMinCol = $.inArray(iMinH,this.aColH);
//						var iMinCol = this.aColH.indexOf(iMinH);
						console.log(iMinCol);
	//					//把图片放到高度最小的列
						$(v).css({
							left: iMinCol* this.iOutImgW,
							top: iMinH
						});
						
					}
					//更新列高度数组
					this.aColH[iMinCol] = iMinH + $(v).outerHeight(true);
					$(v).css('z-index',0);
					
				}.bind(this));//end each
			}//end arrange()
			
			//调用排列方法
			this.arrange();
			
		}.bind(this));
	}
	//注册jquery插件
	$.fn.extend({
		waterfall:function(){
			this.each(function(k,v){
				var waterfall = new Waterfall($(v));
				//窗口大小改变
				$(window).resize(function(){
					waterfall.arrange();
				});
			});
		}
	});
})(jQuery);
