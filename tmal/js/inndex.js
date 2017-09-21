
// banner图
$(function(){
	let images = $('.bannerBot>li');
	let btns = $('.yuan');
	let banner = $('.bannerBot');
	let now =0;
	let flag = true;
	btns.mouseenter(function(){
		if(flag){
			let i=$(this).index();
			now =i;
			flag=false;
			move();
		}
		
	})

	let t= setInterval(function(){
		move('r');
   
	},3000);
	banner.hover(function(){
		clearInterval(t);
	},function(){
		t= setInterval(function(){
			move('r');	   
		},3000);
	})
	function move(dir){
		if(dir == 'r'){
			now++;
			if(now==images.length){
				now=0;
			}
		}
		images.fadeOut(800).css({zIndex:0}).eq(now).fadeIn(800,function(){
			flag=true;
		}).css({zIndex:1});
		btns.removeClass('yuanPush').eq(now).addClass('yuanPush');
	}
})
// 侧导航展开
$(function(){
	$('.liAside').hover(function(){
		let item = $(this).find('.item');
		item.css({display:'block'});
	},function(){
		let item = $(this).find('.item');
		item.css({display:'none'});
	})
})

// 头部展开
$(function(){
	let box = $('.Box');
	$('.taobao').hover(function(){
		let i = $(this).index('.taobao');
		box.eq(i).css({display:'block'});
	},function(){
		let i = $(this).index('.taobao');
		box.eq(i).css({display:'none'});
	})
})

// 右边导航展开
$(function(){
	let pop = $('.tanchu>div');
	$('.tanchu').hover(function(){
		let i=$(this).index('.tanchu');
		pop.eq(i).css({display:'block'});
		setTimeout(function(){
			pop.eq(i).css({left:'-100px'});
		},10)
	},function(){
		let i=$(this).index('.tanchu');
		pop.eq(i).css({left:'-120px'});
		setTimeout(function(){
			pop.eq(i).css({display:'none'});
		},10)
	})
})
// 楼层跳转   按需加载
$(function(){
	let floor = $('.floor');
	let arrF =[];
	let arrC =[];
	let colorS = $('.floor p');
	let ch = window.innerHeight;
	floor.each(function(){
		arrF.push(this.offsetTop);
	})
	colorS.each(function(){
		arrC.push(this.style.color);
	})

	let topLi =$('.dingwei>li:nth-of-type(10)');
	let tops = $('.slide>h6:last-child');
	let slid = $('.slide>li');
	let slidU = $('.slide');
	let cw = window.innerWidth;
	let leftsli = (cw-1230)/2-50;
	slidU.css({left:`${leftsli}px`});
	let serch = $('.serch');
	let flag = true;
	//按需加载    ch+scrollTop=offsetTop
	$(window).scroll(function() {
		let sc = document.documentElement.scrollTop;
		arrF.forEach((value,index)=>{
			if(ch+sc >= value+100){
				let imgs = floor.eq(index).find('img');
				imgs.each(function(){
					this.src=this.getAttribute('imgpath');
				})
			}
			if (sc+300>=value) {
	  			slid.css({background:'#626262'}).eq(index).css({background:`${arrC[index]}`});
	  		}
		})
		if(sc>=700){
			if(flag){
				flag=!flag;
				serch.animate({top:0});
				slidU.animate({width:'39px',height:'333px'});
				topLi.show();
			}
		}else{
			if(!flag){
				serch.animate({top:'-50px'});
				slidU.animate({width:0,height:0});
				topLi.hide();
				flag=!flag;
			}
		}
	});
	
	//楼层跳转
	slid.click(function(){
		let i=$(this).index('.slide>li');
		$(document.documentElement).animate({scrollTop:`${arrF[i]-100}px`});
	}).hover(function(){
		let i=$(this).index('.slide>li');
		$(this).css({background:`${arrC[i]}`});
	},function(){
		let i=$(this).index('.slide>li');
		$(this).css({background:'#626262'});
	})
	slid[6].onmouseenter = function(){
 			this.style.background = '#000';
 	}

	// 回顶部
    
    tops.click(function(){
    	$(document.documentElement).animate({scrollTop:0})
    })
    	
	
	//右边导航回顶部
	topLi.click(function(){
    	$(document.documentElement).animate({scrollTop:0})
    })

})



