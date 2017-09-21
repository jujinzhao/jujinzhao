

/*
 *  获取元素函数
 *  添加window.onload事件
 *  $(select[,range])   //方括号表示可以传可以不传
 *  
 *  参数：select(记得去空)   字符串 ->选择器  .box    div   #box
 *                          函数 -> 添加事件
 *       range   范围
 *  实现：1.str[0]是什么  
         #     getElementsById()
         .     getElementsByClassName()
         符合标签        getElementsByTagName()
         判断标签标准     正则 ：/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.text(selector)  
         声明正则对象 ：   /^ &/
                    开头必须是a-z或者A-Z，第二位是a-z或A-Z或1-6，并且第二位可以出现最少0次，最多8次
                  第一位[]第二位[]{最少出现次数，最多出现次数}
        
        2.返回值  
 * 
 * */


//当函数的参数的类型或者个数不一样的时候执行不同的功能，是函数重载

//获取元素封装函数
function $(select,range){
	range = range ? range :document;
	if (typeof(select) == 'string') {
		let selector = select.trim();   //去空
		let firstChar = selector.charAt(0);
		if(firstChar == '#') {
			return document.getElementById(selector.substring(1));
		}else if(firstChar == '.'){
			return range.getElementsByClassName(selector.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
			return range.getElementsByTagName(selector);
		}
	} else if(typeof(select) == 'function'){    //函数的typeof是function
		window.onload = function(){
			select();  //调用一下他自己
		}
	}
}

//获取和设置对象内容
/*
 *  如果只有一个参数obj获取    两个参数obj 和 content设置
 * */
function html(obj,content){
	if (arguments.length == 2) {
		obj.innerHTML = content;
	} else if(arguments.length == 1){
		return obj.innerHTML;
	}
}

function text(obj,content){
	if (arguments.length == 2) {
		obj.innerText = content;
	} else if(arguments.length == 1){
		return obj.innerText;
	}
}


//操作样式
function css(element,attrObj){
	for (let i in attrObj) {
		element.style[i] = attrObj[i];
	}
}

//添加事件
function on(collection,type,fn){
	for(let i=0;i<collection.length;i++) {
		collection[i][type] = fn;
	}
	
}

//移除事件
function off(collection,type){
	for (let i=0;i<collection.length;i++) {
		collection[i][type] = null;
	}
	
}

//动画
//function animate(element,attrObj,speed,fn){
//	let t = setInterval(function(){
//		for(let i in attrObj){
//			let start = parseInt(getComputedStyle(element,null)[i]);
//			if(start >= attrObj[i]){
//				clearInterval(t);
//				if(fn){
////				fn.call(element) //这里的fn是window下的对象，用冒充将fn放在element下面					
//					fn.apply(element) //这里的fn是window下的对象，用冒充将fn放在element下面
//                                       //就可以用this
//				}
//			}
//			element.style[i] = `${start+speed}px`
//		}
//		
//	},60)
//}

//获取样式
/*
 *    element：元素
 *    property：要获取的样式
 * 
 * 
 * */
function get(element,property){
	return element[property];
}

//在DOM元素后面添加一个元素
/*
 *   index:插入的元素
 *   position:位置：哪个元素的后面
 * 
 *   实质：index  插入到 position的下一个元素前面
 *   if   next = null     appendChild
 *        next != null    inserBefore
 * 
 * */
function insertAfter(index,positions){
	let parent = positions.parentNode;
	let next = positions.nextSibling;
	if (next) {
		parent.insertBefore(index,next);
	} else{
		parent.appendChild(index);
	}
}

//封装成方法   加在构造函数的原型对象上
HTMLElement.prototype.insertAfter = function(positions){
	let parent = positions.parentNode;
	let next = positions.nextSibling;
	if (next) {
		parent.insertBefore(this,next);
	} else{
		parent.appendChild(this);
	}
}


//在DOM元素的最前面添加一个子元素
/*
 *  index   插入的元素(不加引号)
 * 
 *  第一个元素   first
 *  
 *  if  first == null    appendChild
 *      first != null    insertBefore    first
 * 
 * */
function appendBefore(parent,index){
	
	let first = parent.firstElementChild;
	if (first) {
		parent.insertBefore(index,first);
	} else{
		parent.appendChild(index);
	}
}

//封装方法
HTMLElement.prototype.appendBefore = function(index){
	let first = this.firstElementChild;
	if (first) {
		this.insertBefore(index,first);
	} else{
		// console.log(this)
		this.appendChild(index);
	}
}

//子元素方法，将自己插入到另一个元素中  (不加引号)
HTMLElement.prototype.insertTo = function(parent){
	parent.appendBefore(this);
}

//清空节点本身（删除自己里面的所有子节点）
/*
 * 方法1.从后往前删除     如果从前往后，每删一次就更新一次坐标，只能删除奇数位的
 * 方法2.内容为空
 * 
 * */
HTMLElement.prototype.empty = function(){
//	let children = this.childNodes;
//	console.log(children);
//	for(let i=children.length-1;i>=0;i--){
//		this.removeChild(children[i]);
//	}
	if (this == 'null') {
		this.innerHTML = '';
	} else{
		this.innerHTML = '';
	}
	
	
}

//清除节点本身      （自己将自己删除）
/*
 *  找到父节点   removeChild()
 * 
 * */
HTMLElement.prototype.remove = function(){
	let parent = this.parentNode;
	parent.removeChild(this);
}

//next()     获取下一个元素节点
HTMLElement.prototype.next =function(){
	let nexte =  this.nextElementSibling;
	if (neste) {
		return nexte;
	} else{
		return false;
	}
	
	
}
//nextAll()   获取下面所有元素节点   传参：获取指定的所有的节点    不传参：不指定，所有的
/*	
 *  nodename  类型     传参：获取所有指定类型的元素    默认获取所有参数
 *  不断的找元素的下一个，下一个的下一个
 *  加到一个数组里面
 *  next为null时   返回数组
 * 
 * */
HTMLElement.prototype.nextAll = function(nodename){
	let newArr = [];
	let neste = this.next();
	if (neste){
		newArr.push(neste);
//		console.log(neste);
	}else{
		return false;
	}
	while(neste){
		neste = neste.next();
		newArr.push(neste);
	}
	newArr.pop();
	if (nodename) {
//		console.log(nodename);
		return newArr.filter(function(element){
//			console.log(element.nodeName.toLowerCase());
			return element.nodeName.toLowerCase() == nodename;
		})
	} else{
		return newArr;
	}
}

//nextUntil()      获取某一个范围
/*
 * lengt:获取的长度
 * nodename:指定元素类型
 * 
 * */
HTMLElement.prototype.nextUntil = function(length,nodename){
	let arr = this.nextAll(nodename);
	let arrn = [];
	if (length<=arr.length) {
		for (let i = 0;i<length;i++) {
		arrn.push(arr[i]);
		}
		return arrn;
	} else{
		return false;
	}
	
	
}
//previous()		上一个
HTMLElement.prototype.previous =function(){
	
	let previouse =  this.previousElementSibling;
	if (previouse) {
		return previouse;
	} else{
		return false;
	}
	
}
//previousAll()   前面所有元素
/*
 * nodename  元素类型
 * 
 * */
HTMLElement.prototype.previousAll = function(nodename){
	let newArr = [];
	let previouse = this.previous();
	if (previouse){
		newArr.push(previouse);
//		console.log(neste);
	}else{
		return false;
	}
	while(previouse){
		previouse = previouse.previous();
		newArr.push(previouse);
	}
	newArr.pop();
	if (nodename) {
//		console.log(nodename);
		return newArr.filter(function(element){
//			console.log(element.nodeName.toLowerCase());
			return element.nodeName.toLowerCase() == nodename;
		})
	} else{
		return newArr;
	}
}
//previousUntil()    获取指定长度的前面元素
/*
 *  length  长度
 *  nodename  指定元素
 * */
HTMLElement.prototype.previousUntil = function(length,nodename){
	let arr = this.previousAll(nodename);
	let arrn = [];
	if (length<=arr.length) {
		for (let i = 0;i<length;i++) {
		arrn.push(arr[i]);
		}
		return arrn;
	} else{
		return false;
	}
	
	
}

//cloest()     最近的元素

//parent()      父元素
HTMLElement.prototype.parent = function(){
	let par = this.parentElement;
	par.empty();
	if (par) {
		return par;
	} else{
		return false;
	}
}

//parents()     所有父元素
/*
 *  nodename:指定元素类型
 * 
 *  判断条件     是body的时候停止
 * 
 * */
HTMLElement.prototype.parents = function(nodename){
	let newArr = [];
	let par = this.parent();
	if (par.nodeName.toLowerCase() != 'body'){
		newArr.push(par);
//		console.log(neste);
	}else{
		return false;
	}
	while(par.nodeName.toLowerCase() != 'body'){
		par = par.parent();
		newArr.push(par);
	}
	newArr.pop();
	if (nodename) {
//		console.log(nodename);
		return newArr.filter(function(element){
//			console.log(element.nodeName.toLowerCase());
			return element.nodeName.toLowerCase() == nodename;
		})
	} else{
		return newArr;
	}
}
//parentUntil()   指定范围的元素

HTMLElement.prototype.parentUntil = function(length,nodename){
	let arr = this.parents(nodename);
	let arrn = [];
	if (length<=arr.length) {
		for (let i = 0;i<length;i++) {
		arrn.push(arr[i]);
		}
		return arrn;
	} else{
		return false;
	}
	
	
}

//按需加载    楼层跳转
function needGet(floor,slid){
	let ch = window.innerHeight;
	let arrNew = [];
	let now = 0;
	let flag = true;
	floor.forEach((element)=>{
		let tops = element.offsetTop;
		arrNew.push(tops);
	})
	
	window.onscroll = function(){
	let sc = document.documentElement.scrollTop;
 	arrNew.forEach(function(value,index){
 		if(ch + sc >= value+100){
 			
 			let imgs = floor[index].getElementsByTagName('img');
 			sli[now].classList.remove('active');
 			sli[index].classList.add('active');
 			now = index;
 			for(let i=0;i<imgs.length;i++){
 				imgs[i].src = imgs[i].getAttribute('imgpath');
 			}
 		}
 		
 	})
 	//选项卡
	sli.forEach((element,index)=>{
		element.onclick = function(){
			animate(document.documentElement,{scrollTop:arrNew[index]});
		}
	})
}
}

// 颜色随机
function randomRgb(){
   	let r = Math.round(Math.random()*255);
   	let g = Math.round(Math.random()*255);
   	let b = Math.round(Math.random()*255);
   	return `rgb(${r},${g},${b})`;
   }




