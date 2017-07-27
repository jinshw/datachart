/**
 * ajax请求
 * 1.ajax
 * 2.on
 */
var ajaxOn = {};

ajaxOn.ajaxoptions = {
	url 	: '',
	data 	: {},
	type 	: 'post',
	dataType: 'json',
	async 	: false
};
ajaxOn.ajaxopt = function(options){
	var opt = $.extend({}, ajaxOn.ajaxoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}

	return opt;
};
ajaxOn.ajax = function(options){
	if(!options){
		alert('need options');
	}else{
		var res;
		$.ajax(ajaxOn.ajaxopt(options)).done(function(obj){res = obj;});

		return res;
	}
};
//查询表格分类
ajaxOn.getMainType = function(){
	var dtd = $.Deferred(); // 新建一个Deferred对象
    $.getJSON('json/chart-type.json', function(json, textStatus) {
        if(textStatus == 'success'){
          dtd.resolve(json);
        }

    });
    return dtd.promise(); // 返回promise对象 
}
//获取数据根据分类查询表格类型
ajaxOn.getSubType = function getSubType(type){
	var dtd = $.Deferred(); // 新建一个Deferred对象
    $.getJSON('json/chart-type-data.json', function(json, textStatus) {
        if(textStatus == 'success'){
          dtd.resolve(ajaxOn.filterData(type,json));
        }

    });
    return dtd.promise(); // 返回promise对象	
}
//过滤数据
ajaxOn.filterData =function (type,json){
	var temp = "";
    for (var i = 0; i < json.length; i++) {
      if(type == json[i].type){
        temp = json[i].list;
        break;
      }
    };
    return temp;  
}
//图标弹出框
chartPopUp 	= {};
chartPopUp.chartoptions = {
	url     : '',
	fade	: 'fade',
	close	: false,
	head	: false,
	foot	: false,
	btn		: false,
	okbtn	: '\u786e\u5b9a',
	qubtn	: '\u53d6\u6d88',
	msg		: 'msg',
	big		: false,
	mclose  : true,
	style	: '',
	mstyle	: '',
    class   : '',
    data    : ''
};
chartPopUp.chartstr = function(opt){
	var start = '<div class="chart '+opt.fade+' '+opt.class+' in" id="bschart" style="position:fixed;'+opt.style+'">';
	if(opt.big){
		start += '<div class="chart-dialog chart-lg" style="'+opt.mstyle+'"><div class="chart-content">';
	}else{
		start += '<div class="chart-dialog" style="'+opt.mstyle+'"><div class="chart-content">';
	}
	var end = '</div></div></div>';
	var head = '';
	if(opt.head){
		head += '<div class="chart-header">';
		if(opt.close){
			head += '<button type="button" class="close-chart" data-dismiss="chart"><span aria-hidden="true">&times;</span></button>';
		}
		head += '<h3 class="chart-title" id="bscharttitle">'+opt.title+'</h3></div>';
	}else{
		head += '<div class="close">&times;</div>';
	}
	var body = '<div class="chart-body"></div>';
	var foot = '';
	if(opt.foot){
		foot += '<div class="chart-footer"><button type="button" class="bsok">'+opt.okbtn+'</button>';
		if(opt.btn){
			foot += '<button type="button" class="bscancel">'+opt.qubtn+'</button>';
		}
		foot += '</div>';
	}else{
		foot = '';
	}
	return start + head + body + foot + end;
}
chartPopUp.chartMenustr = function(){
	var menu = '<div class="chart-menu-container"><ul class="menu-list"></ul></div>';
	menu+='<div class="chart-container"></div>';
	return menu;
}
//菜单
chartPopUp.chartMenuItem = function(){
	return '<li class="menu-item" data-dt-type="{0}">{1}</li>';
}
//列表
chartPopUp.chartItem = function(){
	return '<div class="dtm-con-item" data-parent-id="{4}" data-tab-key="{0}"><div class="chart-img-container"><img class="chart-img" src="{1}"></div><p class="chart-title">{2}</p><p class="chart-desc">{3}</p></div>';
}
//新建图表弹出框
chartPopUp.addChartMenu = function(options, fun){
	// options
	var opt = $.extend({}, chartPopUp.chartoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}
	$('body').append(chartPopUp.chartstr(opt));
	// init
	var $chart = $('#bschart');
	
	$chart.find(".chart-body").append(chartPopUp.chartMenustr());
	//获取分类数据
	ajaxOn.getMainType().then(function(res){
		addMenuItem(res);
	});
	
	//图表类别数据添加到页面中
	function addMenuItem(res){
		var resultTemp = "";
		for(var i=0;i<res.length;i++){
			var menuTemp = chartPopUp.chartMenuItem();
			resultTemp += menuTemp.replace("{0}",res[i].id).replace("{1}",res[i].title);
		}
		$chart.find(".menu-list").append(resultTemp);
		var firstLi = $chart.find(".menu-list li:eq(0)").addClass("cur");
		getDT($(firstLi).attr("data-dt-type"));
	}
	//图表类别切换
	$chart.find(".menu-list").delegate("li","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		$chart.find(".chart-container").html("");
		getDT($(this).attr("data-dt-type"));
	});
	function getDT(type){
		ajaxOn.getSubType(type).then(function(data){
			dtList(type,data);
		})
	}
	//根据类别加载图表
	function dtList(type,data){
		var base = '../static/css/img/chartImg/';
		var resultTemp = "";
		for(var i=0;i<data.length;i++){
			var dtTemp = chartPopUp.chartItem();
			resultTemp += dtTemp.replace("{0}",data[i].id).replace("{1}",base+data[i].url)
								.replace("{2}",data[i].title).replace("{3}",data[i].desc)
								.replace("{4}",type);
		}
		$chart.find(".chart-container").append(resultTemp);
	};
	
	$(".chart-container").delegate(".dtm-con-item","click",function(){
		if(fun)fun($(this).attr("data-parent-id"),$(this).attr("data-tab-key"));
		$chart.remove();
	});
	//设置模态框样式
	$chart.find(".chart-container").addClass("gray");
	$chart.find(".chart-body").addClass("gray");
	$chart.find(".close").addClass("gray");

	//移除模态框
	$chart.find(".close").click(function(){
		$chart.remove();
	});
	//点击内容以外的位置关闭模态框
	if(opt.mclose){
		$chart.click(function(e){
			var target = $(e.target); 
			if(target.closest(".chart-dialog").length == 0){ 
				$chart.remove();
			}
			return false;
		});
	}
	//显示模态框
	$chart.show();
};
//编辑区预览弹出框
chartPopUp.editorPreviewChart = function(options,fun){
	console.log(options,"options")
	// options
	var opt = $.extend({}, chartPopUp.chartoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}
	$('body').append(chartPopUp.chartstr(opt));
	// init
	var $chart = $('#bschart');
	var str = '<div class="editor-privew-code">'+
			'<div class="editor-privew-img"><img src="../static/css/img/chartList/QRCode.png"></div>'+
			'<div class="editor-privew-url">访问地址:<br/><a href="'+opt.url+'" target="_blank">'+opt.url+'</a></div>'+
			'<div class="editor-privew-btn"><a>返回编辑</a></div>'+
			'</div>';
	$chart.find(".chart-body").append('<iframe frameborder="0" class="editor-privew" src="'+opt.url+'"></iframe>'+str);
	//设置模态框样式
	
	$chart.find(".chart-dialog").css({"width":"1000px"});
	$chart.find(".chart-container").addClass("black");
	$chart.find(".chart-body").addClass("black");
	$chart.find(".close").addClass("black");

	//移除模态框
	$chart.find(".close").click(function(){
		$chart.remove();
	});
	//点击内容以外的位置关闭模态框
	if(opt.mclose){
		$chart.click(function(e){
			var target = $(e.target); 
			if(target.closest(".chart-dialog").length == 0){ 
				$chart.remove();
			}
			return false;
		});
	}
	//显示模态框
	$chart.show();
}
//预览内容字符串
chartPopUp.previewstr=function(url,src){
	//预览内容区
	var str = '<div class="previewp-area">'+
					'<div class="preview-content">'+
						'<iframe src="{0}" class="preview-iframe" frameborder="0"></iframe>'+
					'</div>'+
				'</div>';
	//预览二维码区
	var str1 = '<div class="qrcode-area">'+
					'<div class="preview-close">&times;</div>'+
					'<div class="qrcode-content">'+
						'<div class="qrcode-img-container">'+
							'<img class="qrcode-img" src="{1}"/>'+
						'</div>'+
						'<div class="qrcode-item phone-show">'+
							'<a href="javascript:void(0)">手机扫码访问</a>'+
						'</div>'+
						'<div class="qrcode-item back">'+
							'<a href="javascript:void(0)">返回编辑</a>'+
						'</div>'+
						'<div class="qrcode-item publish">'+
							'<a href="javascript:void(0)">发布</a>'+
						'</div>'+
					'</div>'+
				'</div>';
	return str.replace("{0}",url)+str1.replace("{1}",src);
}
//编辑区预览弹出框
chartPopUp.previewChart = function(options,publishfun,backfun){
	// options
	var opt = $.extend({}, chartPopUp.chartoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}
	$('body').append(chartPopUp.chartstr(opt));
	// init
	var $chart = $('#bschart');
	$chart.find(".close").remove();
	$chart.find(".chart-dialog").css({"width":"1055px","margin-top":"5px","padding":0});
	$chart.find(".chart-body").append(chartPopUp.previewstr(opt.url,opt.data));
	//点击内容以外的位置关闭模态框
	if(opt.mclose){
		$chart.click(function(e){
			var target = $(e.target); 
			if(target.closest(".chart-dialog").length == 0){ 
				$chart.remove();
			}
			return false;
		});
	}
	//返回编辑页
	$(".back").click(function(){
		if(backfun)backfun();
		$chart.remove();
	});
	//发布
	$(".publish").click(function(){
		if(publishfun)publishfun();
		$chart.remove();
	});
	//移除模态框
	$chart.find(".preview-close").click(function(){
		$chart.remove();
	});
	
	//显示模态框
	$chart.show();
};