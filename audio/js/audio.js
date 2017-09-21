window.onload = function(){
	let song = document.querySelector('.song');
	let singer = document.querySelector('.singer');
	let list = document.querySelector('.list');
	let pause = document.querySelector('.icon-bofangqi3');  //暂停
	let audio = document.querySelector('audio');
	let photo = document.querySelector('.pic>img');
	let current = document.querySelector('.current');
	let duration = document.querySelector('.duration');
	let dSong = document.querySelector('.dSong');
	let progress = document.querySelector('.progress');
	let progressB = document.querySelector('.progressB');
	
	let next = document.querySelector('.next');
	let pre = document.querySelector('.pre');
	
	let voiceC = document.querySelector('.voiceC');
	let voiceB = document.querySelector('.voiceB');
	
	let listS = document.querySelector('.listS');
	

	//列表歌曲
	for(let i=0;i<database.length;i++){
		listS.innerHTML +=`
			<li>						
				<div class="title">${database[i].songs} - ${database[i].name}</div>
				<div class="all">${database[i].alltime}</div>
			</li>
		`;
	}
	let li = document.querySelectorAll('.listS>li');
	let h = document.querySelector('.listS>h6');
	listS.addEventListener('click',function(e){
		let x = e.target;
		if(x.nodeName.toLocaleLowerCase() == 'div'){
			if(listS.offsetWidth > 0){
				listS.style.width = 0;
				li.forEach(element=>{
					element.style.display = 'none';
				})
				h.style.display = 'none';
				
			}else if(listS.offsetWidth == 0){
				listS.style.width = `300px`;
				li.forEach(element=>{
					element.style.display = 'block';
				})
				h.style.display = 'block';
			}
		}
	}) 
	
	
	
	//记录第几首歌曲
	let i = 0;
	//database[0]放到页面中
	render(database[i]);
	
	//切换歌曲
	next.onclick = function(){
		i++;		
		if(i == database.length){
			i=0;
		}
		render(database[i]);
		audio.play();
	}
	pre.onclick = function(){
		i--;
		if(i==-1){
			i=database.length - 1;
		}
		
		render(database[i]);
		audio.play();
	}
	
	//播放完成
	audio.onended = function(){
		i++;
		render(database[i]);
		audio.play();
	}
	
	//设置声音   audio.volume    值为0-1的小数
	voiceB.onmousedown = function(e){
		let x = voiceB.offsetLeft;
		let ox = e.clientX;
		document.onmousemove = function(e){
			let cx= e.clientX;
			let lefts = cx-ox+x;
			if(lefts < -3){
				lefts = -3;
			}else if(lefts > 97){
				lefts = 97;
			}
			voiceB.style.left = `${lefts}px`;
			voiceC.style.width = `${lefts+3}px`;
			audio.volume = (lefts+3)/100;
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
			
		}
	}
	
	
	audio.ontimeupdate = function(){
//		audio.currentTime 
		//进度条
		let bili = audio.currentTime / audio.duration;
		progressB.style.width = `${bili*100}%`;
		
		//时间转化
		let ct = time(audio.currentTime);
		current.innerText = ct;
		
		//歌词
		database[i].lyrics.forEach((element,index)=>{
			if(element.time == ct){
				list.innerHTML = '';
				
				let a = index;
				if(index<3){
					index = 0;
				}else{
					index -= 3;
				}
				for(let j=index;j<database[i].lyrics.length;j++){
					list.innerHTML += `<li class = "list${j}">${database[i].lyrics[j].lyric}</li>`;
			
				}
				let obj = document.querySelector(`.list${a}`);
				obj.style.color = 'pink';
				obj.style.fontSize = '20px';
				
			}
		})
		
	}
	
	
	pause.onclick = function(){
		if(audio.paused){
			
			audio.play();
			pause.classList.remove('icon-bofangqi3');
			pause.classList.add('icon-tushujiemianbofangqizanting');
		}else{			
			
			audio.pause();			
			pause.classList.remove('icon-tushujiemianbofangqizanting');
			pause.classList.add('icon-bofangqi3');
		}
		

	}
	function render(data){
		song.innerText = data.songs;
		singer.innerText = data.name;
		audio.src = data.src;
		
		photo.src = data.photo;
		dSong.innerText = `${data.songs} - ${data.name}`;
		current.innerText = '00:00';
		duration.innerText = data.alltime;
		
		list.innerText ='';
		for(let i=0;i<data.lyrics.length;i++){
			list.innerHTML += `
				<li class = "list${i}">${data.lyrics[i].lyric}</li>
			`;
		}
		
		
		
	}
	//格式化时间
	function time(data){
		let min = Math.floor(data / 60 ) >= 10 ? Math.floor(data / 60 ):`0${Math.floor(data / 60 )}`;
		let sec = Math.floor(data % 60) >=10 ?  Math.floor(data % 60) : `0${Math.floor(data % 60)}`;
		return `${min}:${sec}`;
	}
	
	
	
	
	
	
	
	
	
}
