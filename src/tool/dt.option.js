;var dtOption = (function($,window,document,arrayCoverseDT,undefined){
	var robj = {};

	/**
	 * [dtOption 图表属性配置]
	 * @param  {[type]} paramObj 
	 * [{option:'',type:'',subclass:'',arrayData:[]} 
	 * 如果option为空表示为新添加图表，否则为加载已有图表
	 * ]
	 * @return {[type]}          [description]
	 */
	robj.getOption = function(paramObj){
		var _option = paramObj.option;
		if(paramObj == null || paramObj == 'undefined'){
			console.log("dtOption--dtOption() 参数不能为空!");
			return false;
		}
		var lineParam = arrayCoverseDT.arrayCoverseDT(paramObj);
		switch(paramObj.type){
			case 'line':
			if(_option == "undefined" || _option == null || _option == ''){// 新增图表初始化配置
				
				_option = {
				 	    title:{
				 	    	text:"未来一周气温变化",
				 	    	backgroundColor: '#FFFFFF'
				 	    },
						
						tooltip: {
							show: true
						},
						grid:{
							show:true,
							height:'auto',
							width:'auto',
							top:50,
							bottom:50

						},
						legend: {
							data: lineParam.headData
						},
						toolbox: {
							show: true,
							feature: {
								mark: {show: true},
								dataView: {show: true, readOnly: false},
								magicType: {show: true, type: ['bar', 'line','stack','tiled']},
								restore: {show: true},
								saveAsImage: {show: true}
							}
						},
						xAxis: [
							{
								type: 'category',
								data: lineParam.convertArr[0]
							}
						],
						yAxis: [
							{
								type: 'value'
							}
						],
						series: lineParam.series
					  
					};
			}else if(paramObj.arrayData != null){
				_option.legend.data = lineParam.headData;
				_option.xAxis[0].data = lineParam.convertArr[0];
				_option.series = lineParam.series;
			}
			break;

			case 'bar':
			if(_option == "undefined" || _option == null || _option == ''){// 新增图表初始化配置
				
				_option = {
						title:{
				 	    	text:"未来一周气温变化",
				 	    	backgroundColor: '#FFFFFF'
				 	    },
						tooltip: {
							show: true
						},
						grid:{
							height:'auto',
							width:'auto'
						},
						legend: {
							data: lineParam.headData
						},
						toolbox: {
							show: true,
							feature: {
								mark: {show: true},
								dataView: {show: true, readOnly: false},
								magicType: {show: true, type: ['bar', 'line','stack','tiled']},
								restore: {show: true},
								saveAsImage: {show: true}
							}
						},
						xAxis: [
							{
								type: 'category',
								data: lineParam.convertArr[0]
							}
						],
						yAxis: [
							{
								type: 'value'
							}
						],
						series: lineParam.series
					  
					};
			}else if(paramObj.arrayData != null){
				_option.legend.data = lineParam.headData;
				_option.xAxis[0].data = lineParam.convertArr[0];
				_option.series = lineParam.seriesTemp;
			}
			break;


		}


		return _option;
	}



	return robj;
})(jQuery,window,document,arrayCoverseDT);