/*
* @Author: 莫流风
* @Date:   2017-08-27 14:07:35
* @Last Modified by:   莫流风
* @Last Modified time: 2017-09-12 11:19:15
*/
$(function(){
	let banner = $('.banner-box');
	let images = $('.banner-box>li');
	let btns = $('.btns');
	let forward = $('.forword');
	let back = $('.back');
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
	btns.click(function(){
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
				images.eq(now).animate({left:`${widths}px`},1000,);

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

/*window.onload = function(){
	let banner = document.querySelector('.banner-box');
	bannerPush(banner);
	function bannerPush(banner){
 		let imgage = banner.querySelectorAll('.banner-box>li');
		let btn = banner.getElementsByClassName('btns');
		let widths = get(banner,'offsetWidth')
		let now = next =0;
		let flag = true;

	for(let i=0;i<btn.length;i++){
		
		btn[i].onmouseenter =function(){
			if (!flag) {
			return ;
			}	
			flag = false;
				
			if (i==now) {
				return ;
			}
			if (i>now) {
				btn[now].classList.remove('ciclepush');		
				imgage[i].style.left = `${-widths}px`;
				animate(imgage[now],{left:widths});
				animate(imgage[i],{left:0},function(){
					flag = true;
				});
				btn[i].classList.add('ciclepush');
	    		now = next = i;
			} else if(i<now){
				btn[now].classList.remove('ciclepush');		
				imgage[i].style.left = `${widths}px`;
				animate(imgage[now],{left:-widths});
				animate(imgage[i],{left:0},function(){
					flag = true;
				});
				btn[i].classList.add('ciclepush');
	    		now = next = i;
			}
		}
	}

	//自动轮播
	let t = setInterval(move,3000);
	function move(){
		next++;
		if (next == imgage.length) {
			next=0;
		}
		btn[now].classList.remove('ciclepush');		
		imgage[next].style.left = `${widths}px`;
		animate(imgage[now],{left:-widths});
		animate(imgage[next],{left:0},function(){
			flag = true;
		});
		btn[next].classList.add('ciclepush');
	    now = next;
	}
	
	//停止轮播
	banner.onmouseenter = function(){
		clearInterval(t);
	}
	banner.onmouseleave = function(){
		t = setInterval(move,3000);
	}
	
	//左右轮播
	let back = banner.getElementsByClassName('back')[0];
	back.onclick = function(){
		
		if (!flag) {
			return;
		}	
		flag = false;	
		move();
		
	}

	let forword = banner.getElementsByClassName('forword')[0];
	forword.onclick = function(){
		
		if (!flag) {
			return;
			
		}	
		flag = false;	
			move1();
	}
	function move1(){
		next--;
		if (next == -1) {
			next=imgage.length-1;
		}
		btn[now].classList.remove('ciclepush');		
		imgage[next].style.left = `${-widths}px`;
		animate(imgage[now],{left:widths});
		animate(imgage[next],{left:0},function(){
			flag = true;
		});
		btn[next].classList.add('ciclepush');
	    now = next;
	}
	
 }
}*/