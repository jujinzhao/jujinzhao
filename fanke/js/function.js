

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
/*function animate(element,attrObj,speed,fn){
	let t = setInterval(function(){
		for(let i in attrObj){
			let start = parseInt(getComputedStyle(element,null)[i]);
			if(start >= attrObj[i]){
				clearInterval(t);
				if(fn){
//					fn.call(element) //这里的fn是window下的对象，用冒充将fn放在element下面					
					fn.apply(element) //这里的fn是window下的对象，用冒充将fn放在element下面
                                         //就可以用this
				}
			}
			element.style[i] = `${start+speed}px`
		}
		
	},60)
}*/

//获取样式
function get(element,property){
	return element[property];
}











