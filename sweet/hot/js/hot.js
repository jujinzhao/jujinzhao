/*
* @Author: 莫流风
* @Date:   2017-08-28 09:00:57
* @Last Modified by:   莫流风
* @Last Modified time: 2017-09-03 14:08:29
*/

	
window.addEventListener('load',function(){
	// 导航栏出现
	let flagN = true;
	let searchs = document.querySelector('.searchs');
	let toTop = document.querySelector('.toTop');
	window.onscroll = function(){
		
		let sc = document.documentElement.scrollTop;
		if (sc >= 500) {
		if (flagN) {
			flagN = !flagN;
			animate(searchs,{top:0});
			toTop.style.display = 'block';
		}
		
	} else{
		if (!flagN) {
			animate(searchs,{top:-100});
			toTop.style.display = 'none';
			flagN = !flagN;
		}
		
	}
	}

	// 回顶部
	toTop.onclick = function(){
		animate(document.documentElement,{scrollTop:0});
	}





});