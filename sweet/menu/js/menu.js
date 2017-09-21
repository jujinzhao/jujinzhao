/*
* @Author: 莫流风
* @Date:   2017-08-26 23:02:49
* @Last Modified by:   莫流风
* @Last Modified time: 2017-09-12 12:00:11
*/
//火爆top榜
$(function(){
	let li = $('.hot>ul>li');
	let ul = $('.hot>ul');
	let n=1;
	
	let t = setInterval(fnT,5000);
	function fnT(){
		li.css({
			transform: `rotateY(${180*n}deg)`,
			'transform-origin': 'center top',

		})
		n++;
	}
	ul.hover(function(){
		clearInterval(t);
	},function(){
		t = setInterval(fnT,5000);
	})
	
})
//导航栏出现
$(function(){
	let flag = true;
	let search = $('.searchs');
	let toTop = $('.toTop');
	$(window).scroll(function(){
		let sc = $(document.documentElement).scrollTop();
		if(sc>=500){
			if(flag){
				flag = !flag;
				search.animate({top:0},500);
				toTop.show();
			}
		}else{
			if(!flag){
				search.animate({top:-100});
				toTop.hide();
				flag = !flag;
			}
		}
	})
	//回顶部
	toTop.click(function(){
		$(document.documentElement).animate({scrollTop:0},1000);
	})
})

	


