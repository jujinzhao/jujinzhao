
$(function(){
	let btn = $('.yuan');
	let image = $('.banner-right>li');
	let banner = $('.banner-right');
	let rightB = $('.jiantou-right');
	let leftB = $('.jiantou-left');
	let now = 0;

	let t = setInterval(function(){
		move('r')
	},3000);
	banner.hover(function() {
		clearInterval(t);
	}, function() {
		t = setInterval(function(){
			move('r')
		},3000);
	});
	rightB.click(function() {
		move('r');
	});
	leftB.click(function(){
		move('l');
	})
	btn.click(function(){
		let i=$(this).index('.yuan');
		now =i;
		move()
	})
	function move(der){
		if(der=='r'){
			now++;
			if(now == image.length){
				now =0;
			}
		}else if(der =='l'){
			now--;
			if(now<0){
				now = image.length-1;
			}
		}		
		image.css({
			opacity:0.1,
			zIndex:0
		}).eq(now).css({
			opacity:1,
			zIndex:1
		})
		btn.removeClass('hot').eq(now).addClass('hot');

	}
})




// 侧导航
$(function(){
	$('.ce>li').mouseenter(function() {
		$(this).find('.item').css('display','flex');
	}).mouseleave(function(){
		$(this).find('.item').hide();
	})
})


// 购物车效果
$(function(){
	$('.car').mouseenter(function(){
		$('.carbox').css('height','95px');
	}).mouseleave(function(){
		$('.carbox').css('height',0)
	})
})
// 文本框效果
$(function(){
	$('.tex').focus(function(){
		$('.souan').css({borderColor:'#FF6700'});
		$(this).css({borderColor:'#FF6700'});
		$('.texBox').css({borderColor:'#FF6700',display:'block'});
		$('.MIX').css({display:'none'});
		$('.TV').css({display:'none'});
	}).blur(function(){
		$('.souan').css({borderColor:'#E0E0E0'});
		$(this).css({borderColor:'#E0E0E0'});
		$('.texBox').css({borderColor:'#E0E0E0',display:'none'});
		$('.MIX').css({display:'block'});
		$('.TV').css({display:'block'});
	})
})
// 导航移入效果
$(function(){
	$('.liNav').hover(function(){
		let i = $(this).index('.liNav')
		$('.navBox').eq(i).css({height:'299px',zIndex:999,borderTopColor:'#E0E0E0'})

	},function(){
		let i = $(this).index('.liNav')
		$('.navBox').eq(i).css({height:'0px',zIndex:0,borderTopColor:'#fff'})
	})
})

// 商品更换
$(function(){
	let boxB = $('.zhanshi4');
	let title = $('.wenzi4');
	for(let j=0;j<boxB.length;j++){
		let word = title.eq(j).find('.project');
		let box = boxB.eq(j).find('.box4');
		let aa = title.eq(j).find('a');
		word.mouseenter(function(){
			let i = $(this).index();
			box.css('display','none').eq(i).css('display','block');
			aa.css({color:'#424242',borderBottomColor:'#f5f5f5'}).eq(i).css({color:'#ff6700',borderBottomColor:'#ff6700'});

		})
	}
		
})

// 小米明星单品
$(function(){
	let section = $('.pai2');
	let zhanshi = $('.zhanshi1');

	for(let i=0;i<zhanshi.length;i++){
		let num = 0;

		// 计算大盒子的宽度
		let childNum = zhanshi.eq(i).children().length;
		let childW = zhanshi.eq(i).children().eq(0).outerWidth(true);
		let boxW = childNum*childW;
		zhanshi.eq(i).css('width',`${boxW}px`);

		let maxN = boxW/1240;

		let rightL = section.eq(i).find('.right1');
		let rightR = section.eq(i).find('.right2');

		rightR.click(function(){			
			moves('r')
			
		})
		rightL.click(function(){			
			moves('l')
			
		})

		let flag = true;
		let t=setInterval(moveT,3000)
		section.eq(i).hover(function(){
			clearInterval(t);
		},function(){
			t=setInterval(moveT,3000)
		})
		function moveT(){
			if(flag){
				moves('r')
			}else{
				moves('l')
			}
		}
		function moves(dir){
			if(dir == 'r'){
				if(num == maxN-1){
					flag = false;
					return;
				}
				num++;
			}else if(dir == 'l'){
				if(num == 0){
					flag = true;
					return;
				}
				num--;
			}
			zhanshi.eq(i).css({marginLeft:`${-num*1240}px`});
		}
	}
})
	

// 小框轮播
$(function(){
	let box = $('.box10');
	let boxLit = $('.box10>li');
	for(let i=0;i<boxLit.length;i++){
		let content = boxLit.eq(i).find('.content');
		let widths = content[0].offsetWidth;
		let bnt = boxLit.eq(i).find('.cicle');
		let forward = boxLit.eq(i).find('.right-10');
		let back = boxLit.eq(i).find('.left-10');
		let now=0;
		let next=0;
		let flag = true;

		forward.click(forw);
		function forw(){
			if(next == content.length-1){
				return;
			}
			if(!flag){
				return;
			}
			flag=false;
			next++;

			content.eq(next).css({left:`${-widths}px`});
			content.eq(now).animate({left:`${widths}px`});
			content.eq(next).animate({left:0},function(){
				flag=true;
			});
			bnt.eq(now).removeClass('ciclepush');
			bnt.eq(next).addClass('ciclepush');
			now=next;

		}
		back.click(bac)
		function bac(){
			if(next == 0){
				return;
			}
			if(!flag){
				return;
			}
			flag=false;
			next--;
			content.eq(next).css({left:`${widths}px`});
			content.eq(now).animate({left:`${-widths}px`});
			content.eq(next).animate({left:0},function(){
				flag=true;
			});
			bnt.eq(now).removeClass('ciclepush');
			bnt.eq(next).addClass('ciclepush');
			now=next;
		}
		bnt.click(function(){
			let index = $(this).index();
			if(index<now){
				if(!flag){
					return;
				}
				flag=false;
				content.eq(index).css({left:`${widths}px`});
				content.eq(now).animate({left:`${-widths}px`});
				content.eq(index).animate({left:0},function(){
					flag=true;
				});
				bnt.eq(now).removeClass('ciclepush');
				bnt.eq(index).addClass('ciclepush');
				now=next=index;
			}else if(index>now){
				if(!flag){
					return;
				}
				flag=false;
				content.eq(index).css({left:`${-widths}px`});
				content.eq(now).animate({left:`${widths}px`});
				content.eq(index).animate({left:0},function(){
					flag=true;
				});
				bnt.eq(now).removeClass('ciclepush');
				bnt.eq(index).addClass('ciclepush');
				now=next=index;
				}else if(index==now){
					return;
				}
		})


	}
})

	






















