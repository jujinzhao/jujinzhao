
// 导航展开
$(function(){
	let nav = $('.li1');

	nav.hover(function(){
		let pulldown = $(this).find('.pulldown');
		let puL = $(this).find('li');
		let puU = $(this).find('ul');
		let heights = puL.length*puL[0].offsetHeight+parseInt(getComputedStyle(puU[0],null).paddingTop);
		pulldown.css({
			height:`${heights}px`
		})
	},function(){
		let pulldown = $(this).find('.pulldown');
		pulldown.css({
			height:0
		})
	})
})

//轮播图
$(function(){
	let banner = $('.bannerPic');
	let images = $('.bannerPic>li');
	let btns = $('.yuan');
	let forward = $('.banright');
	console.log(forward)
	let back = $('.banleft');
	let flag = true;
	let next = now =0;
	let widths = banner[0].offsetWidth;

	forward.click(function(){
		move('r');
	})
	back.click(function(){
		move('l');
	})
	let t = setInterval(function(){
		move('r');
	},3000)
	banner.hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(function(){
			move('r')
		},3000)
	})
	btns.mouseenter(function(){
		let i= $(this).index('.yuan');
		next =i;
		if(next>now){
			if(flag){
				flag = false;
				if(next == images.length){
					next =0;
				}
				
				images.eq(next).css({left:`${-widths}px`});
				images.eq(now).animate({left:`${widths}px`},1000);
				btns.eq(now).removeClass('ciclepush');
				btns.eq(next).addClass('ciclepush');
				images.eq(next).animate({left:0},1000,function(){
					flag = true;
				});
				now = next;
			}
			

		}else if(next<now){
			if(flag){
				flag=false;
			
				if(next < 0){
					next =images.length-1;
				}
				images.eq(next).css({left:`${widths}px`});
				images.eq(now).animate({left:`${-widths}px`},1000);
				btns.eq(now).removeClass('ciclepush');
				btns.eq(next).addClass('ciclepush');
				images.eq(next).animate({left:0},1000,function(){
					flag = true;
				});
				now = next;
			}
		}else if(next == now){
			return;
		}
	})
	function move(dir){
		if(flag){
			flag = false;
			if(dir=='r'){
				next++;
				if(next == images.length){
					next =0;
				}
				
				images.eq(next).css({left:`${-widths}px`});
				images.eq(now).animate({left:`${widths}px`},1000);

			}else if(dir == 'l'){
				next--;
				if(next < 0){
					next =images.length-1;
				}
				images.eq(next).css({left:`${widths}px`});
				images.eq(now).animate({left:`${-widths}px`},1000);
				
			}
			btns.eq(now).removeClass('ciclepush');
			btns.eq(next).addClass('ciclepush');
			images.eq(next).animate({left:0},1000,function(){
				flag = true;
			});
			now = next;
		}
		
		
	}
})


// 购物车
$(function(){
	let carBox = $('.carBox');
	let car = $('.car');
	let carkl = $('.carkl');
	car.hover(function(){
		carBox.css({display:'block'});
		carkl.css({display:'block'});
	},function(){
		carBox.css({display:'none'});
		carkl.css({display:'none'});
	})
})
//按需加载
$(function(){
	let section = $('section');
	let ch=window.innerHeight;
	let arrS = [];
	section.each(function(){
		arrS.push(this.offsetTop);
	})
	$(window).scroll(function() {
		let sc = document.documentElement.scrollTop;
		arrS.forEach((value,index)=>{
			if(sc+ch>value+100){
				let imgs = section.eq(index).find('img');
				imgs.each(function(){
					this.src=this.getAttribute('imgpath');
				})
			}
		})
	});

})

//回顶部
$(function(){
	$('.xiazai').click(function(){
		$(document.documentElement).animate({scrollTop:0});
	})
})

