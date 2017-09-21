window.onload = function(){
	let label = document.querySelectorAll('.shapes>label');
	let color = document.querySelectorAll('.color');
	let tool = document.querySelectorAll('.tool>label');
	let operate = document.querySelectorAll('.operate');
	let images = document.querySelectorAll('.images');
	let fonts = document.querySelectorAll('.fonts');
	let canvas = document.querySelector('canvas');
	let mask = document.querySelector('.mask');
	
	
	let line = document.querySelector('.icon-line');
	let dash = document.querySelector('.icon-xiantiao');
	let rect = document.querySelector('.icon-juxing');
	let cicle = document.querySelector('.icon-circle');
	let pencil = document.querySelector('.icon-pan_icon');
	let polyJ = document.querySelector('.icon-wujiaoxing1');
	let poly = document.querySelector('.icon-iconfontwubianxing');
	
	//颜色
	let stroke = document.querySelector('input[id = stroke]');
	let fill = document.querySelector('input[id = fill]');
	
	//橡皮擦
	let eraser = document.querySelector('.eraser');
	let eraserBut = document.querySelector('.icon-xiangpica_s');
	
	//线宽
	let lineW = document.querySelector('.icon-cuxixiantiao');
	
	//撤销
	let cancle = document.querySelector('.icon-cancel');
	
	//文字
	let font = document.querySelector('.icon-wenzi2');
	//保存
	let serve = document.querySelector('.icon-baocun3');
	//反向
	let reverse = document.querySelector('.icon-xianfanxiang');
	//裁切
	let crop = document.querySelector('.icon-caijian');
	let cropObj = document.querySelector('.crop');
	
	

	canvas.width = `${window.innerWidth - 132}`;
	canvas.height = `${window.innerHeight - 132}`;
	let  aa = new Palette(canvas,mask);
	
	label.forEach((value)=>{
		value.addEventListener('click',fn);
		function fn(){
			cancle.classList.remove('hot');        /*加撤销*/
			for(let i=0;i <label.length;i++){
				label[i].classList.remove('hot');
			}
			value.classList.add('hot');
			if(value.getAttribute('action') == 'pencil'){
				aa.pencil();
			}else if(value.getAttribute('action') == 'poly'){
				aa.polyEdge = prompt('请输入你的边数',5);
				aa.drow(value.getAttribute('action'));
			}else if(value.getAttribute('action') == 'polyJ'){
				aa.polyAngle = prompt('请输入你的角数',5);
				aa.drow(value.getAttribute('action'));
			}else{
				aa.drow(value.getAttribute('action'));
			}
		}
	})
	//颜色
	color.forEach((element,index)=>{
		element.addEventListener('click',function(){
			let active = document.querySelector(".color[active =true]");
			active.setAttribute('active','false');
			this.setAttribute('active','true');
			if(index == 1){
				aa.fill();
			}else if(index == 0){
				aa.stroke();
			}
		});
		
	})
	stroke.onchange = function(){
		aa.strokeStyle = this.value;
	}
	fill.onchange = function(){
		aa.fillStyle = this.value;
	}
	//橡皮擦
	eraserBut.onclick = function(){
		
		
		
		let ew = aa.lineWidth;
		
		if(ew<10){
			ew = ew+10;
		}
		eraser.style.width = `${ew}px`;
		eraser.style.height = `${ew}px`;
		aa.eraser(eraser,ew,ew);
	}
	
	//线宽
	lineW.onclick = function(){
		let Width = prompt('请输入线宽：',10);
		aa.lineWidth = Width;
	}
	
	//撤销
	document.onkeydown = function(e){
		if(e.ctrlKey && e.keyCode == 90){
			aa.cancle();
		}
	}
	cancle.onclick = function(){
		if(aa.history.length == 1){
			this.classList.add('hot');
		}else{
			this.classList.remove('hot');
		}
		aa.cancle();
	}
	
	//文字
	font.addEventListener('click',function(){
		aa.font();
	})
	
	//保存
	serve.addEventListener('click',function(){
		serve.href = canvas.toDataURL('image/png');
		serve.download = 'a.png';
	})
	//反向
	reverse.addEventListener('click',function(){
		aa.reverse();
	})
	
	//裁切
	crop.addEventListener('click',function(){
		aa.crop(cropObj);
	})
		
	//工具选项按钮变化
	tool.forEach((element)=>{
		element.addEventListener('click',function(){
			cancle.classList.remove('hot');     /*加撤销*/
			for(let i=0;i<tool.length;i++){
				tool[i].classList.remove('hot');
			}
			this.classList.add('hot');
		})
	})
	//操作选项按钮变化
	operate.forEach((element)=>{
		element.addEventListener('click',function(){
			for(let i=0;i<operate.length;i++){
				operate[i].classList.remove('hot');
			}
			this.classList.add('hot');
		})
	})
	//图片选项按钮变化
	images.forEach((element)=>{
		element.addEventListener('click',function(){
			for(let i=0;i<images.length;i++){
				images[i].classList.remove('hot');
			}
			this.classList.add('hot');
		})
	})
	//文字
	fonts.forEach((element)=>{
		element.addEventListener('click',function(){
			for(let i=0;i<fonts.length;i++){
				fonts[i].classList.remove('hot');
			}
			this.classList.add('hot');
	})
		
	})
	let family = document.querySelector('.family>select');
	family.onchange = function(){
		aa.fontFamily = this.value;
	}
	let size = document.querySelector('.size>select');
	size.onchange = function(){
		aa.fontSize = this.value;
	}
	
	
	
	
}
