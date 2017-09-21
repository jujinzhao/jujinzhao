/*
* @Author: 莫流风
* @Date:   2017-08-27 12:18:34
* @Last Modified by:   莫流风
* @Last Modified time: 2017-08-30 09:12:49
*/
window.onload = function(){
		let texta = document.querySelector('.liuyan>textarea');
		let tips = document.querySelector('.liuyan >.bottom >.tishi>span');
		let content = document.querySelector('.textBox');
		// console.log(content)
		let bon = document.querySelector('.liuyan>.bottom>button');

		const max = texta.maxLength;
		texta.addEventListener('keyup', ()=>{
			let str = texta.value;
			tips.innerText = `${max - str.length}`;

		})
		bon.onclick = texta.onkeydown = function(e){
			if (e.type == 'click') {
				fn.call(texta);
			}else if(e.type == 'keydown'){
				if (e.shiftKey && e.keyCode == 13) {
					fn.call(texta);
				}
			}
		}

		content.onmouseover = function(e){
			if (e.target.nodeName == 'LI') {
				e.target.style.background = 'white';
			}
			
		}
		content.onmouseout = function(e){
			if (e.target.nodeName == 'LI') {
				e.target.style.background = '#f9f9f9';
			}
		}

		function fn(){
			let str = texta.value;			
			let lis = document.createElement('div');
			let num = content.childElementCount+1;
			lis.classList.add('pinglun');

				texta.value = '';
				lis.innerHTML = `

					<a href="" class="pic pic3"></a>
					<div class="word">
						<a href="">偶遇法式浪漫</a>
						<div>MccsnivscnkvavMcc</div>
						<div>${str}</div>
						<div>
							<span class="time icon-shizhong"></span>
							<span class="num numfirst">2017.5.14</span>
							<span class="time icon-xiaolian"></span>
							<span class="num">26834</span>
						</div>
						
					</div>
					    <div class="lou"></div>
					    <span>${num}</span>
					    <span>楼</span>
				`;
				
				
				content.appendBefore(lis);


			}

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