;var chartCommon = (function($,window,document,myArrayProcess,dtOption,undefined){
	var robj = {};
	var objMap = {};
	window.objMap = objMap;// 全局对象


	//添加数据图表编辑区
	robj.addChartDOM = function (id,dtOption){
	    var addChartHtml = "<div class='charts-edit-area-main'>																		"+
	        "	<div  class='charts-content'></div>                                                            "+
	        "	<div class='charts-tools-main' style='display: none;'>                                                                         "+
	        "		<div class='charts-tools-content' data-chart-id="+id+">                           "+
	        "			<div class='ctc-btn dt-drag' draggable='true'><i class='fa fa-arrows'></i> 拖拽</div>                                                                 "+
	        "			<div class='ctc-btn charts-tools-dedit' data-cpt='name:'jinshw',type:'button''>数据编辑</div>   "+
	        "			<div class='ctc-btn charts-tools-paramadjust'>参数调整</div>                                                             "+
	        // "			<div class='ctc-btn'>显示代码</div>                                                             "+
	        "			<div class='ctc-btn' data-op-type='remove'>删除</div>                                           "+
	        "		</div>                                                                                              "+
	        "	</div>                                                                                                  "+
	        "</div>                                                                                                     ";

	    $(".charts-edit-area").append(addChartHtml);

	    //数据编辑按钮事件绑定
	    this.dataEdit(dtOption);
	    this.parameterAdjustment(dtOption);
	    //删除图表click事件，重新绑定
	    $("div[data-op-type='remove']").click(function(){
	        $(this).parent().parent().parent(".charts-edit-area-main").remove();
	    });
	};

	//数据编辑按钮事件
	robj.dataEdit = function (dtOption){
	    var dedit = $(".charts-tools-dedit:last");

	    dedit[0].addEventListener("click",function(){
	        console.log("点击数据编辑.....");
	        var _chartsContent = $(this).parents(".charts-edit-area-main").children(".charts-content");
	        var _dataDtDatas = _chartsContent.attr("data-dt-datas");

	        var _id = $(this).parent().attr("data-chart-id");
	        var _objMap = JSON.parse(objMap[_id]);
	        var _arr = _objMap.arr;
	        var _optionHot = _objMap.optionHot;
	        var dtObj = document.getElementById("data-table");
	        var _hot = new Handsontable(dtObj,_optionHot);
	        _hot.loadData(_arr);
			var chartDivObj = $(this).parent().parent().prev()[0];

	        // Handson afterChange事件
	        _hot.addHook('afterChange',function(changs,source){
	        	var _maxIJ= myArrayProcess.getMaxIndex(_hot.getData());
	        	var _dataArr = _hot.getData(_maxIJ.maxI,_maxIJ.maxJ);

	        	var _option = dtOption.getOption({option:'',type:_objMap.type,subclass:_objMap.subclass,arrayData:_dataArr.slice(0)});
	        	
                var myChart = echarts.init(chartDivObj);
                // 为echarts对象加载数据
                myChart.setOption(_option);
                // 保存数据到objMap中
                _objMap.arr = _dataArr;
                _objMap.chartOption = _option;
                objMap[_id] = JSON.stringify(_objMap);
	        });

	        $(".edit-dc-area").css("margin-left","662px");
	        $(".dtm-adjustment-param").css("display","none");
	        $("#data-table").css("display","block");
	        $(".cpt-chtedt").css({"opacity":"1","z-index":"1010"});

	        objMap._selectedChartId = $(this).parent().attr('data-chart-id');
	        editMainVue.selectedChart = objMap[objMap._selectedChartId];
	    });
	};

	// 参数调整
	robj.parameterAdjustment = function(dtOption){
		var dedit = $(".charts-tools-paramadjust:last");

	    dedit[0].addEventListener("click",function(){
			$(".edit-main").css("margin-left","660px");
	        $(".edit-dc-area").css("margin-left","662px");
	        $(".dtm-adjustment-param").css("display","flex");
	        $("#data-table").css("display","none");
	        $(".cpt-chtedt").css({"opacity":"1","z-index":"1010"});

	        objMap._selectedChartId = $(this).parent().attr('data-chart-id');
	        editMainVue.selectedChart = objMap[objMap._selectedChartId];

	        robj.initParam();



	        // 初始化左侧表格
	        var _chartsContent = $(this).parents(".charts-edit-area-main").children(".charts-content");
	        var _dataDtDatas = _chartsContent.attr("data-dt-datas");

	        var _id = $(this).parent().attr("data-chart-id");
	        var _objMap = JSON.parse(objMap[_id]);
	        var _arr = _objMap.arr;
	        var _optionHot = _objMap.optionHot;
	        var dtObj = document.getElementById("data-table");
	        var _hot = new Handsontable(dtObj,_optionHot);
	        _hot.loadData(_arr);
			var chartDivObj = $(this).parent().parent().prev()[0];

	        // Handson afterChange事件
	        _hot.addHook('afterChange',function(changs,source){
	        	var _maxIJ= myArrayProcess.getMaxIndex(_hot.getData());
	        	var _dataArr = _hot.getData(_maxIJ.maxI,_maxIJ.maxJ);

	        	var _option = dtOption.getOption({option:'',type:_objMap.type,subclass:_objMap.subclass,arrayData:_dataArr.slice(0)});
	        	
                var myChart = echarts.init(chartDivObj);
                // 为echarts对象加载数据
                myChart.setOption(_option);
                // 保存数据到objMap中
                _objMap.arr = _dataArr;
                objMap[_id] = JSON.stringify(_objMap);
	        });



	    });
	};

	// 初始化图表参数
	robj.initParam = function(){
		var _selectedChartId = objMap._selectedChartId;
		var _selecteObj = objMap[_selectedChartId];

		// 设置选择对象
		editMainVue.selectedChart = _selecteObj;
	};

	/**
	 * [createHot 创建Hndson对象]
	 * @param  {[type]} dtObj data   [DOM节点对象，二维数组]
	 * @param  {[type]} option [参数]
	 * @return {[type]}        [返回Handson对象]
	 */
	robj.createHot = function (dtObj,data,option){
		var _data = data;
		var _optionHot = option;
		
		if(_data == null || _data =='undefined'){
			// console.log('createHot 参数data不能为空！');
			// return;
			_data = [['']];
		}else{
			_data = JSON.parse(data);
		}
		if(_optionHot == null || _optionHot == 'undefined' || _optionHot == ''){
			_optionHot = {
		        // data:dataArr,
		        minRows:50,
		        minCols:10,
		        width: 660,
		        height: 800,
		        colHeaders: true,
		        rowHeaders: true,
		        stretchH: 'all',
		        columnSorting: true,
		        contextMenu: true
		    };
		}

		_optionHot.data = _data;

		return _optionHot;

		// return new Handsontable(dtObj,_optionHot);
	};

	robj.drag = function(){
		//拖拽事件
	    var eleDrags = $(".charts-edit-area-main"), 
	    	lDrags = eleDrags.length,
	        eleDrag = null;
	    for (var i=0; i<lDrags; i+=1) {
	        eleDrags[i].onselectstart = function() {
	            return false;
	        };
	        eleDrags[i].ondragstart = function(ev) {
	            console.log("ondragstart.....");
	            var _dragImg = ev.target.parentNode.parentNode.parentNode;
	            ev.dataTransfer.effectAllowed = "move";
	            ev.dataTransfer.setData("text", _dragImg.innerHTML);

	            
	            var x = $(_dragImg).width();
	            ev.dataTransfer.setDragImage(_dragImg, x/2, 0);
	            eleDrag = _dragImg;
	            var cNode = document.importNode($(".chart-container-tmpl")[0],true);
	            $(cNode).attr('name','pHere');
	            $(cNode).css('display','block');
	            $(cNode).insertAfter($(_dragImg));
	            // var node = this;
	            setTimeout(function(){
	                $(_dragImg).insertAfter(cNode);
	                $(_dragImg).css('display','none');

	            },0);
	            return true;
	        };

	        eleDrags[i].ondrop = function(ev){

	        };
	        eleDrags[i].ondragend = function(ev) {
	            $(eleDrag).insertAfter($(".chart-container-tmpl"));
	            $(eleDrag).css('display','block');
	            $(".chart-container-tmpl").css('display','none');
	            ev.dataTransfer.clearData("text");
	            eleDrag = null;
	            return false;
	        };

	        eleDrags[i].ondragenter = function(ev) {
	            console.log("ondragenter.....");
	            return true;
	        };

	        eleDrags[i].ondragover = function(ev){
	            ev.preventDefault();

	            var _clientY = ev.clientY;
	            var _top = $(this).offset().top;
	            var width = $(this).height();
	            var tempH = _clientY - _top;
	            if(tempH > (width/2)){
	                if($(this).next().attr('name') != 'pHere'){
	                    var cNode = document.importNode($(".chart-container-tmpl")[0],true);
	                    $(cNode).css('display','block');
	                    $('.chart-container-tmpl').remove();
	                    $(cNode).insertAfter($(this));
	                }
	            }else{
	                var cNode = document.importNode($(".chart-container-tmpl")[0],true);
	                $(cNode).css('display','block');
	                $('.chart-container-tmpl').remove();
	                $(cNode).insertBefore($(this));
	            }
	        }

	    }
	};

	//操作工具栏显示操作
	robj.chartToolsDisplay = function(){
		$(".edit-dc-area").on("mouseover",".charts-edit-area-main",function(){
            $(this).children(".charts-tools-main").show();
	    });
	    $(".edit-dc-area").on("mouseout",".charts-edit-area-main",function(){
	            $(this).children(".charts-tools-main").hide();
	    });
	};

	/**
	 * [createUUID 创建ID (13位)]
	 * @param  {[type]} prefix [description]
	 * @param  {[type]} suffix [description]
	 * @return {[type]}        [description]
	 */
	robj.createUUID = function(prefix,suffix){
		var pre = "",suf = "";
		if(prefix != null && prefix != "" && typeof(prefix) != "undefined"){
			pre = prefix;	
		}
		if(suffix != null && suffix != "" && typeof(suffix) != "undefined"){
			suf = suffix;	
		}
		var randNum = Math.random()*1000;
		randNum = randNum.toFixed(0);
		var tm=new Date();
   		var timeStr=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12;
		
		console.log("createUUID =="+pre + timeStr+randNum + suf);
		return pre + timeStr+randNum + suf;
	}

	// objMap 对象
	robj.reviewObjMap = function(){
		var _objMap = this.deepCopy(objMap);
		var _chart = {};
		var _chartStr = "";
		for(var i in _objMap){
			_chartStr = _objMap[i];
			if(i != "workId" && i != "workName"){
				_objMap[i] = JSON.parse(_chartStr);
			}
			
		}
		return _objMap;
	}


	robj.deepCopy= function(source) { 
		var result={};
		for (var key in source) {
			result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
		} 
		return result; 
	}

	//获取url中的参数
    robj.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
	
	return robj;
})(jQuery,window,document,myArrayProcess,dtOption);