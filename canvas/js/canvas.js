/*
 *
 * 属性：
 * 	canvas
 * 	画布的宽高  cw  ch
 * 	画图环境   ctx
 *  线宽   颜色  端点样式   颜色    
 * 	边数    角数    
 * 	橡皮大小
 * 	历史记录   history[]
 * 	
 * 	
 * 
 * 
 * 方法：
 * 画线   画虚线   铅笔  多边形  圆形  矩形  多角型
 * 
 * 橡皮  裁剪   文字   图片
 * 
 * 保存    新建  撤销
 * 
 * 初始化init()
 * 
 * */

function Palette(canvas,mask){
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
	this.mask = mask;
	
	this.cw = canvas.width;
	this.ch = canvas.height;
	
	this.lineWidth = 1;
	this.fillStyle = '#000';
	this.strokeStyle = '#000';
	this.lineCap = 'butt';
	
	this.history = [];
	
	this.style = 'stroke';
	
	//角  边
	this.polyEdge = 5;
	this.polyAngle = 5;
	
	//字体样式
	this.fontSize = '20px';
	this.fontFamily = '微软雅黑';
	this.fontWeight = '100';
	this.fontStyle = 'normal';
	
	//裁切
	this.temp = null;
}
Palette.prototype = {
	//初始化
	init:function(){
		this.ctx.lineWidth = this.lineWidth;
		this.ctx.fillStyle = this.fillStyle;
		this.ctx.strokeStyle = this.strokeStyle;
		this.ctx.lineCap = this.lineCap;
	},
	line:function(ox,oy,cx,cy){		
		this.ctx.beginPath();
		this.ctx.moveTo(ox,oy);
		this.ctx.lineTo(cx,cy);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	dash:function(ox,oy,cx,cy){
		this.ctx.setLineDash([2,10]);  //虚线
		this.ctx.beginPath();
		this.ctx.moveTo(ox,oy);
		this.ctx.lineTo(cx,cy);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	pencil:function(){
		let that = this;
		this.mask.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.ctx.beginPath();
			that.ctx.moveTo(ox,oy);
			that.mask.onmousemove = function(e){
				let cx = e.offsetX, cy = e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);  //清空
				if(that.history.length){                   //历史记录
					that.ctx.putImageData(that.history[that.history.length-1],0,0);
				}
				that.init();
				that.ctx.setLineDash([]);  //虚线
				that.ctx.lineTo(cx,cy);
				that.ctx[that.style]();
				
				
			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup = null;
			}
		}
	},
	poly:function(ox,oy,cx,cy){
		
		let r = Math.sqrt(Math.pow((ox-cx),2)+Math.pow((oy-cy),2));
		let rad = 360 / this.polyEdge /180 * Math.PI;
		
		this.ctx.beginPath();
		this.ctx.moveTo(ox+r,oy);
		for(let i=1;i<this.polyEdge;i++){
			this.ctx.lineTo(ox+r*Math.cos(rad*i),oy+r*Math.sin(rad*i));
		}
		this.ctx.closePath();
		this.ctx[this.style]();
			
	},
	polyJ:function(ox,oy,cx,cy){
		
		let r = Math.sqrt(Math.pow((ox-cx),2)+Math.pow((oy-cy),2));
		let r1 = r/2;
		let rad = 360 / (this.polyAngle*2) / 180 * Math.PI;
		
		this.ctx.beginPath();
		this.ctx.moveTo(ox+r,oy);
		for(let i=1;i<this.polyAngle*2;i++){
			if(i%2){
				this.ctx.lineTo(ox+r1*Math.cos(rad*i),oy+r1*Math.sin(rad*i));
			}else{
				this.ctx.lineTo(ox+r*Math.cos(rad*i),oy+r*Math.sin(rad*i));
			}
			
		}
		this.ctx.closePath();
		this.ctx[this.style]();
	},		
	rect:function(ox,oy,cx,cy){
		this.ctx.beginPath();
		this.ctx.rect(ox,oy,(cx-ox),(cy-oy));
		this.ctx.closePath();
		this.ctx[this.style]();			
	},
	cicle:function(ox,oy,cx,cy){
		this.ctx.beginPath();
		this.ctx.arc(ox,oy,Math.abs(ox-cx),0,2*Math.PI);
		this.ctx.closePath();
		this.ctx[this.style]();
	},
	fill:function(){
		this.style = 'fill';		
	},
	stroke:function(){
		this.style = 'stroke';
	},
	drow:function(type){
		
		this.mask.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			this.mask.onmousemove = function(e){
				let cx = e.offsetX,cy = e.offsetY;
				this.ctx.clearRect(0,0,this.cw,this.ch);    //清空
				if(this.history.length){                   //历史记录
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				this.init();
				this.ctx.setLineDash([]);  //虚线
				this[type](ox,oy,cx,cy);
			}.bind(this)
			this.mask.onmouseup = function(){
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
			}.bind(this)
		}.bind(this)
	},
	eraser:function(obj,w,h){
		let that = this;
		this.mask.onmousedown = function(e){				
			obj.style.display = 'block';
			e.preventDefault();
			that.ctx.clearRect(0,0,this.cw,this.ch);    //清空
			if(that.history.length){                   //历史记录
				that.ctx.putImageData(that.history[that.history.length-1],0,0);
			}
			that.mask.onmousemove = function(e){
				 ox = e.offsetX,oy = e.offsetY;
				 //设置边界
				 let lefts = ox-w/2;
				 let tops = oy-h/2;
				 if(lefts < 0){	
				 	lefts = 0;
				 }else if(lefts > that.cw - w){
				 	lefts = that.cw - w;
				 }
				 
				 if(tops < 0){
				 	tops = 0;
				 }else if(tops > that.cy - h){
				 	tops = that.cy - h;
				 }
				 obj.style.left = `${lefts}px`;
				 obj.style.top = `${tops}px`;
				 //擦除
				 that.ctx.clearRect(lefts,tops,w,h);

			}
			that.mask.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove = null;
				that.mask.onmouseup  = null;				
				obj.style.display = 'none';
			}
		}
	},
	cancle:function(){
		this.history.pop();
		if(this.history.length){
			this.ctx.putImageData(this.history[this.history.length-1],0,0); 
		}else{
			this.ctx.clearRect(0,0,this.cw,this.ch);
		}
	},
	font:function(){		
		this.mask.onmousedown = function(e){			
			let that = this;
			let ox = e.offsetX,oy = e.offsetY;
			this.ctx.clearRect(0,0,this.cw,this.ch);    //清空
			if(this.history.length){                   //历史记录
				this.ctx.putImageData(this.history[this.history.length-1],0,0);
			}
			let divs = document.createElement('div');
			divs.classList.add('divs');
			divs.style.left = `${ox}px`;
			divs.style.top = `${oy}px`;
			divs.contentEditable = 'true';
			this.mask.appendChild(divs);
			that.mask.onmousedown=null;
			let lefts, tops;
			divs.onmousedown = function(e){	
				let ox = e.offsetX,oy = e.offsetY;
				let leftw = e.clientX - ox - this.offsetLeft;
				let toph = e.clientY - oy - this.offsetTop;
				let w = divs.offsetWidth;
				let h = divs.offsetHeight;
				that.mask.onmousemove = function(e){
					//浏览器  - letfw - ox
					lefts = e.clientX - leftw - ox;
					tops = e.clientY - toph - oy;
					if(lefts <= 0){
						lefts = 0;
					}else if(lefts >= that.cw - w){
				 		lefts = that.cw - w;
				 	}
					if(tops <= 0){
						tops =0;
					}else if(tops >= that.ch - h){
				 		tops = that.ch - h;
				 	}
					divs.style.left = `${lefts}px`;
					divs.style.top = `${tops}px`;
				}
				divs.onmouseup = function(){
					that.mask.onmousemove = null;
					divs.onmouseup = null;
				}
			}
			divs.onblur = function(){
				let value = this.innerText;
				that.mask.removeChild(divs);
				divs = null;
				that.ctx.textAlign = 'center';
				that.ctx.textBaseline = 'middle';
				that.ctx.font = `
					${that.fontSize} ${that.fontFamily} 
				`;
				that.ctx.fillText(value,lefts,tops);				
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
			}
		}.bind(this)
		
	},
	reverse:function(){
		let image = this.ctx.getImageData(0,0,this.cw,this.ch);
		let data = image.data;
		for(let i=0;i<data.length;i+=4){
			data[i] = 255-data[i];
			data[i+1] = 255 - data[i+1];
			data[i+2] = 255 - data[i+2];
		}
		this.ctx.putImageData(image,0,0);
		this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
	},
	crop:function(cropObj){
		this.mask.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			let minX,minY,w,h;
			this.mask.onmousemove = function(e){
				let cx = e.offsetX,cy = e.offsetY;
				//拖动方向不同坐标不同
				w = Math.abs(cx-ox);
				h = Math.abs(cy-oy);
				minX = cx>ox ? ox : cx;
				minY = cy>oy ? oy : cy;
				cropObj.style.cssText = `
				display:block;
				left:${minX}px;
				top:${minY}px;
				width:${w}px;
				height:${h}px;
				`;
			}.bind(this)
			this.mask.onmouseup = function(){
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
				//存下裁切区域信息
				this.temp = this.ctx.getImageData(minX,minY,w,h);
				//清空裁切区域
				this.ctx.clearRect(minX,minY,w,h);
				//保存历史记录
				this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));	
				//将裁切部分放进去
				this.ctx.putImageData(this.temp,minX,minY);
				//拖拽
				this.drag(minX,minY,w,h,cropObj);
			}.bind(this)
		}.bind(this)		
	},
	drag:function(minX,minY,w,h,cropObj){
		this.mask.onmousemove = function(e){
			let ox = e.offsetX, oy = e.offsetY;
			if(ox>minX && ox<minX+w && oy>minY && oy<minY+h){
				this.mask.style.cursor = 'move';
			}else{
				this.mask.style.cursor = 'default';
			}
		}.bind(this)
		this.mask.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			this.mask.onmousemove = function(e){
				let cx = e.offsetX,cy = e.offsetY;
				let lefts = minX + cx - ox;
				let tops = minY + cy - oy;
				if(lefts <= 0){
					lefts = 0;
				}else if(lefts>=this.cw-w){
					lefts = this.cw-w;
				}
				if(tops <= 0){
					tops = 0;
				}else if(tops>=this.ch-h){
					tops = this.ch-h;
				}
				cropObj.style.left = `${lefts}px`;
				cropObj.style.top = `${tops}px`;
				
				
				//清空画板
				this.ctx.clearRect(0,0,this.cw,this.ch);    //清空
				//每次移动历史记录都要存一次
				if(this.history.length){                   //历史记录
					this.ctx.putImageData(this.history[this.history.length-1],0,0);
				}
				if(!this.temp){
					return;
				}
				this.ctx.putImageData(this.temp,lefts,tops);
				
			}.bind(this)
			this.mask.onmouseup = function(){
				this.mask.onmousemove = null;
				this.mask.onmouseup = null;
				this.temp = null;				
				cropObj.style.display = 'none';
				this.mask.style.cursor = 'default';
			}.bind(this)
		}.bind(this)
	}
	
	
	
	
}















