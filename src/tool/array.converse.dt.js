;var arrayCoverseDT = (function($,window,document,undefined){
	var robj = {};

	/**
	 * [arrayCoverseDT 数组转化成DT数据]
	 * @param  {[type]} paramObj [{type:'line',subclass:'标准',arrayData:[]}]
	 * @return {[type]}          [description]
	 */
	robj.arrayCoverseDT = function(paramObj){
		if(paramObj == null || paramObj == 'undefined'){
			console.log("arrayCoverseDT--arrayCoverseDT() 参数不能为空!");
			return;
		}

		switch(paramObj.type){
			case 'line':
				if(paramObj.subclass == 'line1'){//标准折线图
					var headData = new Array();//获取第一行数据（排除[0][0]第一个空数据）
        			var convertArr = new Array();//转置数组

        			var tempArr;
        			if(paramObj.arrayData == null || paramObj.arrayData == 'undefined'){
			            console.log("arrayCoverseDT--arrayCoverseDT 参数数组不能为空!");
			        }else{
			            tempArr = paramObj.arrayData.slice(0);
			        }

					//获取第一行：排除第一个空值
			        for (var i = 1; i < tempArr[0].length; i++) {
			            headData.push(tempArr[0][i]);
			        }
			        //数组转置
			        for (var tempJ = 0; tempJ < tempArr[0].length; tempJ++) {
			            convertArr[tempJ] = [];
			        }
			        for (var tempJ = 1; tempJ < tempArr.length; tempJ++) {
			            for (var tempK = 0; tempK < tempArr[tempJ].length; tempK++) {
			                convertArr[tempK][tempJ - 1] = tempArr[tempJ][tempK];
			            }
			        }
			        //获取series数组
			        var seriesTemp = [];
			        var seriesObj;
			        for (var x in headData) {
			            seriesObj = new Object();
			            seriesObj.name = headData[x];
			            seriesObj.type = "line";
			            seriesObj.data = convertArr[parseInt(x) + 1];
			            seriesTemp[x] = seriesObj;
			        }

			        return {headData:headData,convertArr:convertArr,series:seriesTemp};
					

				}else if(paramObj.subclass == '1'){// 标准面积图

				}



				break;
			case 'bar':
				if(paramObj.subclass == 'bar1'){//标准柱图
					var headData = new Array();//获取第一行数据（排除[0][0]第一个空数据）
        			var convertArr = new Array();//转置数组

        			var tempArr;
        			if(paramObj.arrayData == null || paramObj.arrayData == 'undefined'){
			            console.log("arrayCoverseDT--arrayCoverseDT 参数数组不能为空!");
			        }else{
			            tempArr = paramObj.arrayData.slice(0);
			        }

					//获取第一行：排除第一个空值
			        for (var i = 1; i < tempArr[0].length; i++) {
			            headData.push(tempArr[0][i]);
			        }
			        //数组转置
			        for (var tempJ = 0; tempJ < tempArr[0].length; tempJ++) {
			            convertArr[tempJ] = [];
			        }
			        for (var tempJ = 1; tempJ < tempArr.length; tempJ++) {
			            for (var tempK = 0; tempK < tempArr[tempJ].length; tempK++) {
			                convertArr[tempK][tempJ - 1] = tempArr[tempJ][tempK];
			            }
			        }
			        //获取series数组
			        var seriesTemp = [];
			        var seriesObj;
			        for (var x in headData) {
			            seriesObj = new Object();
			            seriesObj.name = headData[x];
			            seriesObj.type = "bar";
			            seriesObj.data = convertArr[parseInt(x) + 1];
			            seriesTemp[x] = seriesObj;
			        }

			        return {headData:headData,convertArr:convertArr,series:seriesTemp};
					

				}else if(paramObj.subclass == '1'){// 

				}

			break;


			default:
				console.log("没有该类型图表，不能转化数组！");


		}
		
	}




	return robj;
})(jQuery,window,document);