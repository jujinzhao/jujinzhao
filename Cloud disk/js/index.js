(function() {
		//---------------渲染各个区域-----------------
		//	准备数据
		var datas = data.files;
		//	1.菜单区域
		var treeMenu = document.querySelector(".cn_bottom_left");

		treeMenu.innerHTML = createTreeHtml(datas, -1);
		//	获取属性菜单下所有的标题
		//	获取指定id对应的树形菜单标题
		function getTreeById(id) {
			var treeTitle = treeMenu.querySelectorAll(".tree-title");
			for(var i = 0; i < treeTitle.length; i++) {
				if(treeTitle[i].dataset.id == id) {
					return treeTitle[i];
				}
			}
		}
		//	初始的时候多给id为0的树形菜单标题加class
		t.addClass(getTreeById(0), "tree-nav");
		//	2.导航区域
		var pathNav = document.querySelector(".nav");
		//	找到指定id的所有的父级
		//	渲染导航

		pathNav.innerHTML = createNavHtml(datas, 0);
		//	3.文件区域
		var fileList = document.querySelector(".files");
		fileList.innerHTML = createFileHtml(datas, 0);
		//	---------------渲染页面使用的公共方法-----------
		function render(fileId) {
			t.removeClass(getTreeById(currentId), "tree-nav");
			t.addClass(getTreeById(fileId), "tree-nav");
			//		渲染导航
			pathNav.innerHTML = createNavHtml(datas, fileId);
			//		渲染文件区域
			var childs = handle.getChildsById(datas, fileId);
			if(childs.length) {
				
				gEmpty.style.display = "none";
			} else {
				gEmpty.style.display = "block";
			}
			fileList.innerHTML = createFileHtml(datas, fileId);
			currentId = fileId;

			//		全选不被勾选
			t.removeClass(checkedAll, "checked");
		}
//---------------------提醒----------------------
	var fullTipBox = document.querySelector(".full-tip-box");
	var text = fullTipBox.querySelector(".text");
	function fullTip(className,message){

		//先拉倒-32 在过渡到0
		fullTipBox.style.transition = "none";
		fullTipBox.style.top = "-32px";
		fullTipBox.className = 'full-tip-box';

		setTimeout(function (){
			t.addClass(fullTipBox,className);
			fullTipBox.style.transition = ".3s";
			fullTipBox.style.top = "0";	
		},0)

		text.innerHTML = message;

		//延时上去的定时器只能有一个
		clearTimeout(fullTipBox.timer);
		fullTipBox.timer = setTimeout(function (){
			fullTipBox.style.top = "-32px";

		},2000)	
	}
 


		//	--------------添加各个区域的交互-----------------
		//	文件区域数据为空的提示
		var gEmpty = document.querySelector(".g-empty");
		
		//	1.树形菜单区域
		var currentId = 0; //存的就是当前操作的数据的id
		//	利用事件委托,给最外层的父级添加点击处理
		t.on(treeMenu, "click", function(ev) {
			//		先要获取点击的元素对应的id,目的是找到对应的数据
			var target = ev.target;
			if(target = t.parent(target, ".tree-title")) {
				var fileId = target.dataset.id;
				render(fileId)
			}
		});
		
		
		//	导航区域
		t.on(pathNav,"click",function(ev){
			var target = ev.target;
			if(target.nodeName === "A"){
				var fileId = target.dataset.id;
				render(fileId);
			}
		});
		
		//  文件区域
		//  做单选的
		t.on(fileList, "click", function(ev) {
				var target = ev.target;
//		如果判断出class为checkbox,那么就不能进去到下一级,而是单选
//		无论if是否成立,target都被赋值了
				if(t.parent(target, ".checkbox")) {
					target = t.parent(target, ".checkbox");
					t.toggleClass(target, "checked");
//			有一个单选没被选中,全选就不能被选中
					var bl = Array.from(checkboxs).every(function(item) {
						return t.hasClass(item, "checked")
					});
//					bl为true, 说明所有的单选都被选中
					if(bl) {
						t.addClass(checkedAll, "checked");
					} else {
						t.removeClass(checkedAll, "checked");
					}
				}
			})
			//	进入下级
		t.on(fileList, "click", function(ev) {
				var target = ev.target;
//	点击文件区域,如果点击在单选和编辑的input上,不能渲染			
				if(t.parent(target, ".checkbox") || t.parent(target,".edtor")) {
					return;
				}
				
				if(target = t.parent(target, ".file-item")) {
					var fileId = target.dataset.id;
					render(fileId);
				}
			})
			//	----------------全选---------------------
		var checkedAll = document.querySelector(".checked-all");
		
//		找到所有的checkbox;
		//利用获取元素的方法的动态特性，目的是再重新渲染一块元素后，变量存的是新渲染的元素

		var checkboxs = fileList.getElementsByClassName("checkbox");
		//找到所有的file-item
		var fileItems = fileList.getElementsByClassName("file-item");

		//全选

		t.on(checkedAll, "click", function(){

			//判断当前这个有没有子数据

			var childs = handle.getChildsById(datas, currentId);

			if(!childs.length) return;

			var bl = t.toggleClass(this, "checked");

			Array.from(checkboxs).forEach(function(item, index) {
			if(bl) {
				t.addClass(item, "checked");
				t.addClass(fileItems[index], "file-checked");
				} else {
					t.removeClass(item, "checked");
					t.removeClass(fileItems[index], "file-checked");
				}	
			})
		})	
			
			

			//------------鼠标移入到文件区域，每一文件的时候----------------	
			
			t.on(fileList, "mouseover", function(ev) {
				var target = ev.target;
				if(target = t.parent(target, ".file-item")) {
					t.addClass(target, "file-checked");
				}
			});
			t.on(fileList, "mouseout", function(ev) {

				//移开的时候 class为checbox的元素如果有class为checked，
				//file-item 的class就不应该remove

				var target = ev.target;
				if(target = t.parent(target, ".file-item")) {
					//移开的时候，从target中找到checkbox
					var checkbox = target.querySelector(".checkbox");
					if(!t.hasClass(checkbox, "checked")) {
						t.removeClass(target, "file-checked");
					}

				}
			})
//			组织冒泡
			t.on(fileList,"mousedown",function(ev){
				if(t.parent(ev.target,".edtor")){
					ev.stopPropagation();
				}
		})	

			

			//---------------------新建文件夹-----------------------

			var create = document.querySelector(".create");

			//新建文件夹
			t.on(create, "mouseup", function() {
		//1. 通过添加数据，在文件区域中重新渲染
		//2. 直接添加结构

					var firstElement = fileList.firstElementChild;
					var newFile = createFileElement(); //新文件
					if(firstElement) {
						fileList.insertBefore(newFile, firstElement);
					} else {
						fileList.appendChild(newFile);
					}
					gEmpty.style.display = "none";
					var fileTitle = newFile.querySelector(".file-title");
					var fileEdtor = newFile.querySelector(".file-edtor");
					var edtor = newFile.querySelector(".edtor");

					fileTitle.style.display = "none";
					fileEdtor.style.display = "block";

					edtor.focus();

					create.isCreate = true; //新建的状态

				})
				//给document绑定mousedown,目的是判断是否新建成功
				
			t.on(document, "keyup", function(ev) {
				if(ev.keyCode === 13){
					createFile();
				}
			})
			//为新建服务的
			t.on(document,"mousedown",createFile);
			function createFile(){
			//如果不是新建状态，不在继续执行
				if(!create.isCreate) return;

				//先要找到新建的第一个元素
				var firstElement = fileList.firstElementChild;
				var fileTitle = firstElement.querySelector(".file-title");
				var fileEdtor = firstElement.querySelector(".file-edtor");
				var edtor = firstElement.querySelector(".edtor");

				//通过value值判断是否要新建
				var value = edtor.value.trim();

				if(value) { //新建

					//不能有重名的项 提醒

					//在数据中添加新建文件的信息

					//新建成功提醒  树形菜单重新渲染
					var isExist = handle.isTitleExist(datas,value,currentId);
					//名字存在
					if(isExist){
						fileList.removeChild(firstElement);
						fullTip("warn","命名冲突，新建不成功");
					} else { //不存在，新建成功
//						添加信息
						
						fileTitle.style.display = "block";
						fileEdtor.style.display = "none";
						fileTitle.innerHTML = value;
						
						var id = Math.random();
						datas.unshift({
							id:id,
							pid:currentId,
							title:value,
							type:"file"
						});
						firstElement.setAttribute("data-id",id);
						treeMenu.innerHTML = createTreeHtml(datas,-1);
						fullTip("ok","新建成功");
//						把所有的checkboxs的class去掉
						var selectArr = whoSelect();
						selectArr.forEach(function(item){
							var checkbox = item.querySelector(".checkbox");
							t.removeClass(checkbox,"checked");
							t.removeClass(item,"file-checked");
						});
						t.removeClass(checkedAll,"checked");
					}
					//在数据中添加新建文件的信息

					//新建成功提醒  树形菜单重新渲染
				}else{//不新建
					fileList.removeChild(firstElement);
					var childs = handle.getChildsById(datas,currentId);
					if(!childs.length){
						gEmpty.style.display = "block";
				}
			}
			create.isCreate = false;
		}
			
			
//------------------------删除-----------------------

//那些文件被选中了
	function whoSelect(){
		//var arr = [];
		//找所有的checkboxs的class为checked
		return Array.from(checkboxs).filter(function (item){
			return t.hasClass(item,"checked");	
		}).map(function (item){
			return t.parent(item,".file-item");
		})
	}
	var delect = document.querySelector(".delect");
	t.on(delect,"click",function(){
		//点击删除，没有选择文件和选择文件两种情况
		var selectArr = whoSelect();
		if(selectArr.length){
//			使用弹框
			dialog({
				title:"删除文件",
				content:"<div style ='padding:10px;'>确定要删除这个文件夹吗？已删除的文件可以在回收站找到</div>",
				okFn:function(){
					//删除掉要删的文件的所有的子孙数据
					//1. 拿到要删除数据的id
					//1-1， 删除一个指定id的所有的子孙数据
					var id = selectArr[0].dataset.id;
					var idArr = [];
					for( var i = 0; i < selectArr.length; i++ ){
						idArr.push(selectArr[i].dataset.id);
					}
					handle.delectChildsAll(datas,idArr);
					treeMenu.innerHTML = createTreeHtml(datas,-1);
					render(currentId);
					fullTip("ok","删除文件成功")
				}
				
			})
		}else{
			fullTip("warn","请填写完必填项，才可以预览")
		}	
	});
	//------------------重命名---------------------
	
	var rename = document.querySelector(".rename");
	var re_obj = {};  //保存当前正在重名所需要的元素
	t.on(rename,"click",function (){
		var selectArr = whoSelect();

		if(  selectArr.length === 1){

			re_obj.element = selectArr[0];
			re_obj.fileTitle = re_obj.element.querySelector(".file-title");
			re_obj.fileEdtor = re_obj.element.querySelector(".file-edtor");
			re_obj.edtor = re_obj.element.querySelector(".edtor");

			re_obj.fileTitle.style.display = "none";
			re_obj.fileEdtor.style.display = "block";

			re_obj.edtor.value = re_obj.fileTitle.innerHTML.trim();

			re_obj.edtor.select();

			//正在重命名
			rename.isRename = true;

		}else if(selectArr.length > 1){
			fullTip("warn","只能对单个文件进行重命名")
		}else {
			fullTip("warn","请选择重命名的文件")
		}
		
	})
	

	t.on(document,"mousedown",function (){
		/*if( rename.isRename )  return
		else console.log(1);*/

		if( !rename.isRename ){
			return;
		}

		//重名

		/*
			判断input的值是否为空
			不为空：
				是否命名冲突
					冲突：
						提醒命名不成功，还原以前名字
					不冲突：
						提醒命名成功，改为更改后的名字
						找到数据，改title，重新渲染树形菜单

			为空：
				还原以前名字
		*/

		var value = re_obj.edtor.value.trim();

		if( value ){

			var isExist = handle.isTitleExist(datas,value,currentId);
			//名字存在
			if(value === re_obj.fileTitle.innerHTML.trim()){
			}else if(isExist){
				fullTip("warn","命名冲突，请重新命名");
			}else{

				fullTip("ok","命名成功");

				re_obj.fileTitle.innerHTML = value;

				//通过id找到对应的数据
				var self = handle.getSelfById(datas,re_obj.element.dataset.id);

				self.title = value;

				treeMenu.innerHTML = createTreeHtml(datas,-1);

				

			}
		}

		re_obj.fileTitle.style.display = "block";
		re_obj.fileEdtor.style.display = "none";

		t.removeClass(re_obj.element,"file-checked");
		t.removeClass(re_obj.element.querySelector(".checkbox"),"checked");
		rename.isRename = false;

		

	});
	
	
	
//----------------------------------移动到------------------------------------------		
	
			var move = document.querySelector(".move");
			t.on(move,"click",function(){
				var selectArr = whoSelect();//先获取选中的文件
//				1,有选中
//				2,没选中

				var moveStatus = true;//默认为true，没选任何一个目录，不能关闭弹窗
				var fileId = null;
				if(selectArr.length){
					//有选中的，出现弹框
					dialog({
						title:"移动到",
						content:"<div class='tree-menu-comm tree-move'>"+createTreeHtml(datas,-1)+"</div>",
						okfn:function (){
							//是否要关闭弹框
							if(moveStatus){
								return true;
							}else{
								//可以关闭弹窗，说明可以移动了
								//fileId 移动的目标目录
								//移动的数据
								var onOff = false;
								for(var i = 0;i<selectIdArr.length;i++){
									var self = handle.getSelfById(datas,selectIdArr[i]);
									var isExist = handle.isTitleExist(datas,self.title,fileId);
									if(!isExist){
										self.pid = fileId;
										files.removeChild(selectAr[i]);
									}else{
										onOff = true;
									}
								}
								if(onOff){
									fullTip("warn","部分文件移动失败,因为重名了");
								}
								treeMenu.innerHTML = createTreeHtml(datas,-1);
							}
						}
					});
					//给移动到的树形菜单添加点击处理
					var treeMove = document.querySelector(".tree-move");
					
				//通过选中的文件，找到对应的数据
			var selectIdArr = [];  //保存的是选中的id
			for( var i = 0; i < selectArr.length; i++ ){
				//selectData.push(handle.getSelfById(datas,selectArr[i].dataset.id))
				selectIdArr.push(selectArr[i].dataset.id);
			}
			//通过选中的所有的id，找到所有id的子孙数据

			var selectData = handle.getChildsAllByIdarr(datas,selectIdArr);

			//找到错误提醒的元素
			var error = document.querySelector(".full-pop .error");

			//初始的时候，移动到的树形菜单微云是有背景颜色的 tree-nav
			var weiyun = treeMove.querySelectorAll(".tree-title")[0];
			t.addClass(weiyun,"tree-nav");

			var currentElement = weiyun;  //记录当操作的元素（有class为tree-nav）

			t.on(treeMove,"click",function (ev){
				/*
					selectArr 选中的文件
				*/
				var target = ev.target;

				if( target = t.parent(target,".tree-title") ){

					//添加class
					t.removeClass(currentElement,"tree-nav");
					t.addClass(target,"tree-nav");

					currentElement = target;

					fileId = target.dataset.id;
					//通过fileId找到对应的数据
					var oneData = handle.getSelfById(datas,fileId);

					//如果点击的移动的属性菜单的数据oneData

					//selectIdArr[0]的pid如果为fileId，那么说明一件事fileId是选中的那些数据的父数据
					//通过选中的id，找到对应的数据，目的是找到pid
					var selfData = handle.getSelfById(datas,selectIdArr[0]);
					if( fileId == selfData.pid ){
						error.innerHTML = "该文件下已经存在";
						moveStatus = true;//不能关闭弹框
						return;
					}


					//判断一下oneData 是否存在selectData中
					/*[我的文档，我的音乐]
					我的文档*/
					var onOff = false;
					for( var i = 0; i < selectData.length; i++ ){
						if( oneData.id === selectData[i].id ){
							onOff = true;
							break;
						}
					}

					//等跟selectData中每一项比较完成之后，才能得到结果

					if( onOff ){
						error.innerHTML = "不能将文件移动到自身或其子文件夹下";
						moveStatus = true; //不能关闭弹框
					}else{
						error.innerHTML = "";
						moveStatus = false;//可以关闭弹框
					}

					/*
						怎么提醒
						什么时候提醒
							点击存在提醒

					*/

				}
			})


		}else{
			fullTip("warn","请选择要移动的文件");
		}


	});
			
	//------------------框选---------------------

	function getRect(obj){
		return obj.getBoundingClientRect();
	}
	/*
		obj1 拖拽的元素
		obj2 被碰撞的元素
	*/
	function pengzhuang(obj1,obj2){
		var obj1Rect = 	getRect(obj1);
		var obj2Rect = 	getRect(obj2);

		//如果obj1碰上了哦obj2返回true，否则放回false
		var obj1Left = obj1Rect.left;
		var obj1Right = obj1Rect.right;
		var obj1Top = obj1Rect.top;
		var obj1Bottom = obj1Rect.bottom;

		var obj2Left = obj2Rect.left;
		var obj2Right = obj2Rect.right;
		var obj2Top = obj2Rect.top;
		var obj2Bottom = obj2Rect.bottom;

		if( obj1Right < obj2Left || obj1Left > obj2Right || obj1Bottom < obj2Top || obj1Top > obj2Bottom ){
			return false;
		}else{
			return true;
		}


	}

	//画方块
	var div = null,
		disX = null,
		disY = null;
		t.on(document,"mousedown",function (ev){
			if(ev.which !== 1) return;
			ev.preventDefault();
			if( !t.parent(ev.target,".file-list") ){
				return;
			}

			//找到操作的file-item 判断下面checkbox是否有class为checked
			var isChecked = false;
			if( t.parent(ev.target,".file-item") ){
				isChecked = !!t.parent(ev.target,".file-item").querySelector(".checked");
			}

			

			disX = ev.clientX;  //摁下去的x位置
			disY = ev.clientY;  //摁下去的Y位置
			
			document.onmousemove = function (ev){

				if(isChecked){
					console.log("选中");
					return;
				}
				//在move的过程中，只生成一个div，只要生成了了一个div之后，就没必要再生成了
				

				//生成的div，要在一定的范围之后才append到body中
				//15像素

				//15个像素

				if( Math.abs( ev.clientX - disX ) > 15 || Math.abs( ev.clientY - disY ) > 15 ){

					if( !div ){
						div = document.createElement("div");
						div.className = "kuang";
						document.body.appendChild(div);
					}

					div.style.width = Math.abs( ev.clientX - disX ) + "px";
					div.style.height = Math.abs( ev.clientY - disY ) + "px";

					div.style.left = Math.min(ev.clientX,disX) + "px";
					div.style.top = Math.min(ev.clientY,disY) + "px";

					//检测碰撞
					for( var i = 0; i < fileItems.length; i++ ){
						if( pengzhuang(div,fileItems[i]) ){
							t.addClass(fileItems[i],"file-checked");
							t.addClass(checkboxs[i],"checked");

						}else{
							t.removeClass(fileItems[i],"file-checked");
							t.removeClass(checkboxs[i],"checked");
						}
					}
					//判断是否全选
					var selectArr = whoSelect();
					if( selectArr.length === checkboxs.length ){
						t.addClass(checkedAll,"checked")
					}else{
						t.removeClass(checkedAll,"checked")
					}
				}
			}

			document.onmouseup = function (ev){
				document.onmousemove = null;
				document.onmouseup = null;
				if( div ){
					document.body.removeChild(div);
					//把div变量设置为null，目的再次点击还要继续生成div
					div = null;
				}
			}
	});		
			
})()