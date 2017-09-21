/*
* @Author: 莫流风
* @Date:   2017-08-03 09:04:40
* @Last Modified by:   莫流风
* @Last Modified time: 2017-08-30 08:53:59
*/
window.onload = function(){

			// 回到顶部
			let toTop = document.querySelector('.toTop');
			let flagT = true;
			window.onscroll = function(){
				let st = document.documentElement.scrollTop;
				if(st>500){
					
					if(flagT){
						flagT = !flagT;
						toTop.style.display = 'block';
					}
				}else{
					if(!flagT){
						toTop.style.display = 'none';
						flagT=!flagT;
					}
				}
				
			}
			toTop.onclick = function(){
				animate(document.documentElement,{scrollTop:0});
			}
}