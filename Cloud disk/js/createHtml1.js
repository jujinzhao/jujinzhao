
//		1.生成树形菜单的方法

function createTreeHtml(datas,id) {
	//				找到指定id的子元素
	var childs = handle.getChildsById(datas, id);
	var html = "<ul>";
	childs.forEach(function(value) {

		var parentsLength = handle.getParendtsAllById(datas, value.id).length;
		var childsLength = handle.getChildsById(datas, value.id).length;
		var className = childsLength == 0 ? '' : 'fa-sort-down';
		html += "<li><span  class='tree-title clear' data-id='" + value.id + "' style='padding-left: " + parentsLength * 20 + "px;'><i class='fa " + className + "'></i><i class='fa fa-folder-open-o'></i><strong>" + value.title + "</strong></span>";
		//					递归找到value的子数据
		html += createTreeHtml(datas,value.id);
		html += "</li>"
	})
	html += "</ul>";
	return html;
}
//			2.渲染导航
//			生成指定id的html结构
function createNavHtml(datas,id) {
	//				找到指定id的所有父级
	//				指定一个id,找到这个id对应的数据的所有的父数据
	
	
	var parents = handle.getParendtsAllById(datas, id).reverse();
	var navHtml = "<div class='checked-all'></div>";
	parents.forEach(function(value) {
		navHtml += "<span class='current-path' data-id='" + value.id + "'>" + value.title + "</span><i class='fa fa-angle-right'></i>";
	})
	return navHtml;
}
//			3.渲染文件区域
//			渲染指定id下的所有子数据
function createFileHtml(datas,id) {
	var childs = handle.getChildsById(datas,id);
	var filesHtml = "";
	childs.forEach(function(value) {
		filesHtml += `<div class="file-item" data-id="${value.id}">${fileHtmlFn(value)}
		</div>`;
	})
	return filesHtml;
}
//文件结构
function fileHtmlFn(value){
	var str = `<div class="item">
					<lable class="checkbox"></lable>
					<i class="fa fa-folder"></i>
					<p class="file-title-box">
						<span class="file-title">${value.title}</span>
                     	<span class="file-edtor">
                         	<input class="edtor" type="text">
                     	</span>
					</p>
			</div>`
	return str;
}
//通过生成元素创建文件
function createFileElement(){
	var div = document.createElement("div");
	div.className = "file-item";
	div.innerHTML = fileHtmlFn({});
	return div;
}



