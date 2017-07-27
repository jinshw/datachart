;var preview = (function($,window,document,undefined){
	var robj = {};

	robj.getObjMapStr = function(){
		var _objMap = deepCopy(objMap);
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

	robj.getScript = function(){
		var _objMap = this.getObjMapStr();
		var _script = "<script> \n";

		_script = _script + 
		'var _objMap = \''+ JSON.stringify(_objMap) +'\' \n'+
		'var _charts=JSON.parse(_objMap); \n'+
		' var _chart = {}; \n'+
		' for(var i in _charts){  \n'+
		' 	_chart = _charts[i];  \n'+
		'   if(typeof(_chart) == "object"){ \n' +
			'	chartCommon.addChartDOM(_chart.id,dtOption);  \n'+
			'	var _option = _chart.chartOption;  \n'+
			'	var chartDivObj = $(".charts-edit-area").children().last().children()[0];  \n'+
			'	var myChart = echarts.init(chartDivObj);  \n'+
			' 	myChart.setOption(_option);  \n'+
		' } \n'+
		'} \n';

		_script = _script + "</script>\n";

		return _script;
	}

	robj.getPreviewHTML = function(){
		var html = "";
		var head = "";
		var body="";

		head = ''+
		'<head> \n' +
		'	<meta charset="utf-8"> \n' +
		'	<title>数据图表预览页面</title> \n'+
		'	<meta name="apple-mobile-web-app-capable" content="yes"> \n' +
		'	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> \n' +
		'	<meta name="author" content=""> \n' +
		'	<meta name="description" content=""> \n' +
		'	<meta name="keywords" content=""> \n' +
		'	<link rel="stylesheet" type="text/css" href="'+BASE_URL+'/static/css/preview.css"> \n' +
		'	<script type="text/javascript" src="'+ BASE_URL +'/static/js/datachart.js"></script> \n' +
		// '	<script> \n' +
		// '	    var BASE_URL="http://localhost:8333/"; \n' +
		// '	</script> \n' +
		'</head> \n' ;


		body = ''+
		'<body>  \n'+
		'	<section id="pre-main-id" class="edit-dc-container">  \n'+
		'	    <section class="edit-dc-area">  \n'+
		// '	        <h1 class="edit-dc-title" contenteditable="true">  \n'+
		// '	            未命名  \n'+
		// '	        </h1>  \n'+
		'	        <section class="edit-dc-charts" style="margin:10px auto; min-height:auto;">  \n'+
		'	            <section class="charts-edit-area">  \n'+
		'	            </section>  \n'+
		'	        </section>  \n'+
		'	    </section>  \n'+
		'	</section> \n '+
		this.getScript() +'\n' +
		'</body> \n' ;

		html = '<!DOCTYPE html> \n'+
		'<html> \n'+ 
		head + body +
		'<html>\n';

		return html;
	}

	var deepCopy= function(source) { 
		var result={};
		for (var key in source) {
			result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
		} 
		return result; 
	}

window.preview = preview;
	return robj;
})(jQuery,window,document);