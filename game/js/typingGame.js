/*
* @Author: 莫流风
* @Date:   2017-08-23 09:05:17
* @Last Modified by:   莫流风
* @Last Modified time: 2017-08-25 14:19:02
*/
/*
*   属性  
*     个数   this.length    this.elements[] 保存页面中数组
*     速度   speed
*     哪些字符   charSheet[]
*     分值     score
*     过关分值   lever
*     生命值  
*     当前页面中的元素      elements[] 
*     当前页面中元素的left    position[]
*     
*   方法
*   	开始   start()
*   	消除字符   key()
*   	产生字符  getChars()   getChar() 去重checkEle() 去重叠checkPos()   下落drop()
*   	下一关
*   	结束
*   	重新开始
*
*	下一关开始：
*	next()  清除时间函数（时间函数应该用属性）
*	         清除数组 
*
* 
 */

// document.body.style.height = `${innerHeight}px`;
function Game(){
	
	this.charSheet = [
	['Q','img/Q.png'],
	['W','img/W.png'],
	['E','img/E.png'],
	['R','img/R.png'],
	['T','img/T.png'],
	['Y','img/Y.png'],
	['U','img/U.png'],
	['I','img/I.png'],
	['O','img/O.png'],
	['P','img/P.png'],
	['A','img/A.png'],
	['S','img/S.png'],
	['D','img/D.png'],
	['F','img/F.png'],
	['G','img/G.png'],
	['H','img/H.png'],
	['J','img/J.png'],
	['K','img/K.png'],
	['L','img/L.png'],
	['Z','img/Z.png'],
	['X','img/X.png'],
	['C','img/C.png'],
	['V','img/V.png'],
	['N','img/N.png'],
	['B','img/B.png'],
	['M','img/M.png']];
	this.length =5;
	this.speed = 10;	
	this.elements = [];
	this.position = [];
	this.score = document.querySelector('.score>span');
	this.HP = document.querySelector('.HP>span');
	this.passStartBox = document.querySelector('.lever');
	this.passStart = document.querySelector('.lever>span');
	this.lever = 10;
}
Game.prototype = {
	start:function(){
		setTimeout(()=>{
			this.passStartBox.style.display = 'none';
		}, 3000)
		this.getChars(this.length);
		this.drop();
		this.key();
	},
	getChars:function(length){
		for(let i=0;i<length;i++){
			this.getChar();
		}
	},
	checkEle:function(num){
		return this.elements.some(value => this.charSheet[num][0] == value.innerText);
	},
	checkPos:function(lefts){
		return this.position.some(value => Math.abs(value-lefts)<60);
	},
	getChar:function(){
		let num;
		let lefts;
		let tops = Math.random()*100;
		// 去重
		do{
			num = Math.floor(Math.random()*this.charSheet.length);
		}while(this.checkEle(num))
		// 去重复
		do{
			lefts = (innerWidth-400)*Math.random()+200;
		}while(this.checkPos(lefts))

		let ele = this.charSheet[num][0];
		let divs = document.createElement('div');
		divs.classList.add('char');
		divs.style.cssText = `
			top:${tops}px;left:${lefts}px;
			background-image:url(${this.charSheet[num][1]});
			background-size: 120px 120px;
			background-position:center center;
		`;
		divs.innerText = ele;
		document.body.appendChild(divs);
		this.elements.push(divs);
		this.position.push(lefts);
	},
	drop:function(){
		let that = this;
		this.t = setInterval(function(){
			that.elements.forEach((value,index)=>{
				let tops = value.offsetTop;
				value.style.top = `${tops+that.speed}px`;
				if(tops>=500){
					document.body.removeChild(value);
					that.elements.splice(index,1);
					that.position.splice(index,1);
					that.HP.innerText--;
					if (that.HP.innerText < 0) {
						if(confirm('您确定重新挑战吗')){
							that.Rstart();
						}else{
							close();
						}

					}	
					
				}
			})
			if(that.elements.length<that.length){
				that.getChar();
			}
			

		},300)
	},
	key:function(){
		let that = this;
		document.onkeydown = function(e){
			let char = String.fromCharCode(e.keyCode);
			that.elements.forEach((value,index)=>{
				if (char == value.innerText) {
					document.body.removeChild(value);
					that.elements.splice(index,1);
					that.position.splice(index,1);
					that.score.innerText++;
					
				}

			})

			if (that.score.innerText == that.lever) {
						that.next();
			}
			

		}
	},
	next:function(){
		//清除时间函数
		clearInterval(this.t);

		//清空数组
		this.elements.forEach((value)=>{
			document.body.removeChild(value);
		})
		this.elements = [];
		this.position = [];

		//还原生命值
		this.HP.innerText = 10;

		//关卡加1
		this.passStart.innerText++;
		this.passStartBox.style.display = 'block';
		setTimeout(()=>{
			this.passStartBox.style.display = 'none';
		}, 3000)
		//增大难度  增加数量
		this.length++;
		//关卡分数提升
		this.lever += 10;
		if (this.length > 10) {
			// 长度不变
		 	this.length = 10;
			//速度变快
			this.speed+=2;

			if (this.speed == 30) {
				alert('sucsses！');
				return ;
			}
		}
		this.start();
	},
	Rstart:function(){
		//清除时间函数
		clearInterval(this.t);
		//清空数组
		this.elements.forEach((value)=>{
			document.body.removeChild(value);

		})
		this.elements = [];
		this.position = [];


		//还原默认值
		this.length = 5;
		this.speed = 10;
		this.lever = 10;
		this.score.innerText = 0;
		this.HP.innerText = 10;
		this.passStart.innerText = 1;

		this.start();

	},
	stop:function(){
		//清除时间函数
		clearInterval(this.t);
	},
	continue:function(){
		that = this;
		this.t = setInterval(function(){
			that.elements.forEach((value,index)=>{
				let tops = value.offsetTop;
				value.style.top = `${tops+that.speed}px`;
				if(tops>=500){
					document.body.removeChild(value);
					that.elements.splice(index,1);
					that.position.splice(index,1);
					that.HP.innerText--;
					
				}
			})
			if(that.elements.length<that.length){
				that.getChar();
			}
			if (that.HP.innerText <= 0) {
				if(confirm('您确定重新挑战吗')){
					that.Rstart();
				}else{
					close();
				}

			}

		},300)
	},



}














