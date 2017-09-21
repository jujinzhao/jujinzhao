/*
* @Author: 莫流风
* @Date:   2017-08-22 22:34:05
* @Last Modified by:   莫流风
* @Last Modified time: 2017-09-12 11:28:17
*/

//轮播图
$(function(){
	let banner = $('.bann');
	let images = $('.bann>li');
	let btns = $('.btns');
	let forward = $('.bann .forword');
	let back = $('.bann .back');
	let flag = true;
	let next = now =0;
	let widths = banner.innerWidth();

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
		let i= $(this).index('.btns');

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
//轮播图文字
$(function(){
    let spans = $('.bann>.word span');
    spans.each((idx,span) => {
        $(span).on('click', (e) => {
            e.target.classList.add('active');
        });
        $(span).on('animationend', (e) => {
            e.target.classList.remove('active');
        });

        // Initial animation
        setTimeout(() => {
            span.classList.add('active');
        }, 750 * (idx+1))
    });
})
//明星单品
$(function(){
	let section = $('.star');
	let zhanshi = $('.starBox');


		let num = 0;

		// 计算大盒子的宽度
		let childNum = zhanshi.children().length;
		let childW = zhanshi.children().eq(0).outerWidth(true);
		let boxW = childNum*childW;
		zhanshi.css('width',`${boxW}px`);

		// let maxN = boxW/1210;

		let rightL = section.find('.back');
		let rightR = section.find('.forword');

		rightR.click(function(){
			childW = zhanshi.children().eq(0).outerWidth(true);			
			moves('r')
			
		})
		rightL.click(function(){	
			childW = zhanshi.children().eq(0).outerWidth(true);		
			moves('l')
			
		})

		let flag = true;
		let t=setInterval(moveT,3000)
		section.hover(function(){
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
				if(num == childNum/2){
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
			zhanshi.css({marginLeft:`${-num*childW}px`});
		}
	
})
//限时秒杀
$(function(){
	let liX = $('.limBox>li');
	let after = new Date('2017/10/20 0:0:0');
	liX.each((index,value)=>{
		let t = setInterval(fT,1000);
		function fT(){
			let days = $(value).find('.time>li:first-of-type>span');
			let hour = $(value).find('.time>li:nth-of-type(2)>span');
			let minu = $(value).find('.time>li:nth-of-type(3)>span');
			let sec = $(value).find('.time>li:nth-of-type(4)>span');
			let now = new Date();

			let sub = Math.floor((after.getTime() - now.getTime())/1000);
			let date = Math.floor(sub/(60*60*24));
			sub = sub % (60*60*24);
			let hours = Math.floor(sub/(60*60));
			sub = sub % (60*60);
			let minut = Math.floor(sub/(60));
			sub = sub % (60);
			let second = sub;

			days.html(`${date}`);
			hour.html(`${hours}`);
			minu.html(`${minut}`);
			sec.html(`${second}`);
			if(after.getTime() == now.getTime()){
				clearInterval(tX);
			}

			
		}
	})
})
//导航栏出现
$(function(){
	let flag = true;
	let nav = $('.navScr');
	let toTop = $('.toTop');

	$(window).scroll(function(){
		let sc = $(document.documentElement).scrollTop();
		if(sc>800){
			if(flag){
				flag= !flag;
				nav.animate({top:0},1000);
				toTop.css({display:'block'});
			}
		}else{
			if(!flag){
				nav.animate({top:-100},1000);
				toTop.css({display:'none'});
				flag = !flag;
			}
		}
	})

	//回顶部
	toTop.click(function(){
		$(document.documentElement).animate({scrollTop:0});
	})
})

