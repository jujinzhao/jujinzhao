window.onload = function(){
//		1.渲染树形菜单
var datas = data.files;
var treeInitId = -1;

function createTreeHtml(id) {
	//				找到指定id的子元素
	//				if(!)
	var childs = handle.getChildsById(datas, id);
	var html = "<ul>";
	childs.forEach(function(value) {
		//					var i = allSpan.getElementsByTagName("i")[0];
		//					console.log(i);
		//					var className = childs2.length ? "fa fa-caret-down" : "z";
		//					根据数据的id找到所有的父级
		var parentsLength = handle.getParendtsAllById(datas, value.id).length;
		var childsLength = handle.getChildsById(datas, value.id).length;
		var className = childsLength == 0 ? '' : 'fa-angle-down';
		html += "<li><span  class='clear' data-id='" + value.id + "' style='padding-left: " + parentsLength * 20 + "px;'><i class='fa " + className + "'></i><i class='fa fa-folder-open-o'></i><strong>" + value.title + "</strong></span>";
		//					递归找到value的子数据
		html += createTreeHtml(value.id);
		html += "</li>"
	})
	html += "</ul>";
	return html;
}
//			2.渲染导航
//			生成指定id的html结构
function createNavHtml(id) {
	//				找到指定id的所有父级
	//				指定一个id,找到这个id对应的数据的所有的父数据
	var parents = handle.getParendtsAllById(datas, id).reverse();
	var html = "<div class=''></div>";
	parents.forEach(function(value) {
		html += "<span data-id='" + value.id + "'>" + value.title + "</span><i class='fa fa-angle-right'></i>";
	})
	return html;
}
//			3.渲染文件区域
//			渲染指定id下的所有子数据
function createFilesHtml(id) {
	var childs = handle.getChildsById(datas, id);
	var filesHtml = "";
	childs.forEach(function(value) {
		filesHtml += "<div class='file-item' ><i class='fa fa-folder'></i><div class='active'>" + value.title + "</div></div>";
	})
	return filesHtml;
}

var cnBottomLeft = document.getElementsByClassName("cn_bottom_left")[0];
var nav = document.getElementsByClassName("nav")[0];
var files = document.getElementsByClassName("files")[0];
nav.innerHTML = createNavHtml(0);
files.innerHTML = createFilesHtml(0);
cnBottomLeft.innerHTML = createTreeHtml(treeInitId);
var navInitId = 0;

//			console.log(createTreeHtml(treeInitId));


//			添加事件处理
//			1.先给属性菜单添加事件处理
//			找到所有的span
var allSpan = cnBottomLeft.getElementsByTagName("span");

//			给指定的菜单添加样式
var currentId = 0;

function positionSpanById(id) {
	for(var i = 0; i < allSpan.length; i++) {
		var fileId = allSpan[i].dataset.id;
		if(fileId == id) {
			return allSpan[i];
		}
	}
}
positionSpanById(currentId).style.background = "#e1e8ed";
for(var i = 0; i < allSpan.length; i++) {
	allSpan[i].onclick = function() {
		var fileId = this.dataset.id;
		nav.innerHTML = createNavHtml(fileId);
		files.innerHTML = createFilesHtml(fileId);
		positionSpanById(currentId).style.background = "";
		positionSpanById(fileId).style.background = "#e1e8ed";
		currentId = fileId;
	}
}
nav.onclick = function(ev) {
	var target = ev.target;
	if(target.nodeName.toLowerCase() === "span") {
		var fileId = target.dataset.id;
		//渲染导航
		nav.innerHTML = createNavHtml(fileId);
		//渲染文件区域
		files.innerHTML = createFilesHtml(fileId);

		positionSpanById(currentId).style.background = '';
		positionSpanById(fileId).style.background = '#e1e8ee';
		currentId = fileId;
	}
}
}