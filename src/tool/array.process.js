;var myArrayProcess = (function($,window,document,undefined){
	var robj = {};

	/**
	 * 获取二维数组不为null最大I和J值
	 */
	robj.getMaxIndex = function(dataArr){
		var obj = new Object();
	    //获取最大下标
	    var tempArr;
	    obj.maxI = 0;
	    obj.maxJ = 0;
	    for(var i=0;i<dataArr.length;i++){
	        tempArr = dataArr[i];
	        for(var j=0;j<tempArr.length;j++){
	            if(dataArr[i][j] == null || dataArr[i][j] == ""){

	            }else{
	                if(i > obj.maxI){
	                    obj.maxI = i;
	                }
	                if(j > obj.maxJ){
	                    obj.maxJ = j;
	                }
	            }
	        }
	    }
	    return obj;
	}




	return robj;
})(jQuery,window,document);