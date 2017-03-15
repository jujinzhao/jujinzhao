var handle = {
//	从指定对象数组里通过id找指定对象
	getSelfById:function(data,id){
		return data.find(function(value){
			return value.id==id;
		})
	},
//	从指定对象数组中找到所有pid为当前id的所有子对象数组
	getChildsById:function(data,id){
		return data.filter(function(value){
			return value.pid==id;
		})
	},
//	从指定对象数组中找到指定id的所有祖先元素,包括自己
	getParendtsAllById:function(data,id){
		var arr = [];
		var self = handle.getSelfById(data,id);
		if(self ){
			arr.push(self);
			arr = arr.concat(handle.getParendtsAllById(data,self.pid) );
		}
		return arr;
	},
	//在指定id的所有的子数据中，是否存在某一个title
	// 存在 true
	// 不存在 false
	isTitleExist:function(data,value,id){
		var childs = handle.getChildsById(data,id);  //先找到指定id的所有子级
		return childs.findIndex(function(item){
			return item.title === value;
		}) !== -1;
	},
	//通过指定id，找到这个id的所有的子孙数据，放在数组中
	getChildsAll:function(data,id){
		var arr = [];

		var self = handle.getSelfById(data,id);
		arr.push(self);
		//在子数据
		var childs = handle.getChildsById(data,self.id);

		childs.forEach(function (value){
			arr = arr.concat(handle.getChildsAll(data,value.id));
		})

		return arr;
	},
	//指定多个id，找到这些多个id的每一个数据的子孙数据
	/*
		idArr:[1,2,3,4]
		1的子孙数据[{},{}]
		2的子孙数据[{},{}]

		[{},{},{},{}]
	*/
	getChildsAllByIdarr:function(data,idArr){
		var arr = [];
		idArr.forEach(function (value){
			//arr.push(handle.getChildsAll(data,value));	
			arr = arr.concat(handle.getChildsAll(data,value));
		})

		return arr;
	},

	//指定多个id，删除多个id下面的子孙数据

	delectChildsAll:function(data,idArr){
		//所有的子孙数据
		var childsAll = handle.getChildsAllByIdarr(data,idArr);
		//循环data，拿到data的每一项，跟childsAll每一项对比
		for( var i = 0; i < data.length; i++ ){
			for( var j = 0; j < childsAll.length; j++ ){
				if( data[i] === childsAll[j] ){
					data.splice(i,1);
					i--;
					break;
				}
			}
		}
	}
}
