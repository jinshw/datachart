;(function($,window,document,undefined){
	$(".dtm-tabh-h").delegate(".dtm-tabh-hi","click",function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".dtm-tabh-coni").children().hide();
		if($(this).attr("data-id")=="data-editor"){
			$(".dtm-tabh-coni").children(".handsontable").show();
		}else if($(this).attr("data-id")=="param-editor"){
			$(".dtm-tabh-coni").children(".dtm-adjustment-param").css({"display":"flex"});
		}
	});
	/*一级菜单切换*/
	$(".adjustment-param-menu").delegate(".adjustment-param-item","click",function(){
		$(".adjustment-param-container").removeClass("active").eq($('.adjustment-param-menu .adjustment-param-item').index(this)).addClass("active");
		$(this).addClass("active").siblings().removeClass("active");
	});
	
	/*二级菜单切换*/
	$(".adjustment-param-container .dtm-tab1").delegate(".dtm-tab1-hi","click",function(){
		$(this).parents(".dtm-tab1").siblings(".dtm-container").removeClass("active").eq($(this).parents(".dtm-tab1-inner").children(".dtm-tab1-hi").index(this)).addClass("active");
		$(this).addClass("dtm-tab1-hi-curr").siblings().removeClass("dtm-tab1-hi-curr");
	});
	/*选中某一设置更改样式*/
	$(".dtm-edtitm-mask").unbind("click").click(function(event){
		$(this).removeClass("dtm-edtitm-tooltip");
		$(this).siblings(".dtm-item-content").find(".fa-check").addClass("dtm-item-checked");
		$(this).parent(".dtm-item").removeClass("cpt-chkbtn-disabled");
		event.stopPropagation();
	});
	/*取消选中某一设置更改样式*/
	$(".dtm-edtitm-title-check").unbind("click").click(function(event){
		$(this).parents(".dtm-item-content").siblings(".dtm-edtitm-mask").addClass("dtm-edtitm-tooltip");
		$(this).find(".fa-check").removeClass("dtm-item-checked");
		$(this).parents(".dtm-item").addClass("cpt-chkbtn-disabled");
		event.stopPropagation();
	});
	function Color(node){
		$.fn.jPicker.defaults.images.clientPath='/static/css/img/colors/';
        $(node).jPicker({},function(color, context){
        	var all = color.val('all');
        	var temp = all && '#' + all.hex || 'transparent';
        	console.log(temp,"返回值");
        	$(node).siblings("input[name='color-select']").val(temp).change();
        });
        return Color;
	}
	//调用调色板
	$(".dtm-color").click(function(){
		if($(".jc").length>0){
			$(".jc").remove();
			if($(".jf").length>0){
				$(".jf").remove();
			}
		}
		new Color($(this).children("input[name='bind-plug']"));
	});
	//点击调色板以外的位置隐藏调色板
	$(document).bind("click", function(e) {
		if($(".jc").css("display") == "none")return;
		var target = $(e.target);
		if (target.is(".jc")||target.parents(".jc").length>0)return;
		$(".Ok").trigger("click");
	});
	/*线型切换*/
	$(".dtm-line").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	/*曲线类型切换*/
	$(".dtm-adjust").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	$(".dtm-align-position").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	var temp = 0;
	//固定大小||调整大小切换
	$(".align-position-change").click(function(){
		console.log(temp%2)
		$(this).siblings(".dtm-align-position").removeClass("title-active");
		if(temp%2==0){
			$(this).siblings(".random-position").addClass("title-active");
		}else{
			$(this).siblings(".fixed-position").addClass("title-active");
		}
		temp++;
	});
	$(".dtm-vertical-position").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	var temp2 = 0;
	//固定大小||调整大小切换
	$(".vertical-position-change").click(function(){
		console.log(temp%2)
		$(this).siblings(".dtm-vertical-position").removeClass("title-active");
		if(temp2%2==0){
			$(this).siblings(".random-position").addClass("title-active");
		}else{
			$(this).siblings(".fixed-position").addClass("title-active");
		}
		temp2++;
	});
	$(".dtm-text-align").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//主标题字体类型切换
	$(".dtm-main-title-style").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//主标题字体大小切换
	$(".dtm-main-title-font").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//主标题文字水平对齐方式切换
	$(".dtm-main-text-align").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//主标题文字垂直对齐方式切换
	$(".dtm-main-text-vertical").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});

	//副标题字体类型切换
	$(".dtm-sub-title-style").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//副标题字体大小切换
	$(".dtm-sub-title-font").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//副标题文字水平对齐方式切换
	$(".dtm-sub-text-align").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//副标题文字垂直对齐方式切换
	$(".dtm-sub-text-vertical").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//图例是否显示
	$(".legend").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//图例模式切换
	$(".legend-mode").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	var temp3 = 0;
	//图例 固定大小||调整大小切换
	$(".legend-mode-align-change").click(function(){
		console.log(temp3%2)
		$(this).siblings(".dtm-vertical-position").removeClass("title-active");
		if(temp3%2==0){
			$(this).siblings(".random-position").addClass("title-active");
		}else{
			$(this).siblings(".fixed-position").addClass("title-active");
		}
		temp3++;
	});
	var temp4 = 0;
	//图例 固定大小||调整大小切换
	$(".legend-mode-vertical-change").click(function(){
		console.log(temp4%2)
		$(this).siblings(".dtm-vertical-position").removeClass("title-active");
		if(temp4%2==0){
			$(this).siblings(".random-position").addClass("title-active");
		}else{
			$(this).siblings(".fixed-position").addClass("title-active");
		}
		temp4++;
	});
	//图例水平放置||垂直放置在
	$(".legend-align-or-vertical").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//图例 字体类型切换
	$(".mode-title-style").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	
	//图例 字体粗细切换
	$(".mode-title-font").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//图例 文本水平对齐方式
	$(".mode-text-align").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//图例 文本垂直对齐方式
	$(".mode-text-vertical").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});

	//提示 是否使用提示
	$(".tips-yes-or-no").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 字体样式
	$(".tips-title-style").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 字体粗细
	$(".tips-title-font").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 文本水平对齐方式
	$(".tips-text-align").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 文本垂直对齐方式
	$(".tips-text-vertical").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 提示器触发点
	$(".tips-item-or-axis").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 提示的提示器样式
	$(".tips-border-style").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 更多选项显示与隐藏
	$(".dtm-more-item").click(function(){
		if($(".cpt-chkbtn-display").css("display")=="block"){
			$(this).html('<i class="fa fa-caret-down fa-lg"></i>更多选项');
			$(".cpt-chkbtn-display").css("display","none");
		}else{
			$(this).html('<i class="fa fa-caret-up fa-lg"></i>折叠选项');
			$(".cpt-chkbtn-display").css("display","block")
		}
	});
	//提示 线条类型
	$(".tips-line-style").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//提示 区域是否填充默认颜色
	$(".tips-area-bg").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 是否显示工具箱
	$(".tool-yes-or-no").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 是否显示工具箱
	$(".tool-align-position").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 水平对齐位置
	$(".tool-text-align").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 绘制辅助线功能按钮
	$(".tool-draw").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 选区缩放功能按钮
	$(".tool-electoral").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 切换至数据视图按钮
	$(".tool-switch-data").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 折柱切换按钮
	$(".tool-line-switch-col").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 还原按钮
	$(".tool-restore").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 保存为图片按钮
	$(".tool-save-img").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 鼠标放上时是否显示文字提示
	$(".tool-hover-font").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 字体样式
	$(".tool-title-style").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//工具 字体粗细
	$(".tool-title-font").delegate(".shape","click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
	});
	//进度条相关设置
	var $box = $('.cpt-sld-bar');
	var $bg = $('.cpt-sld-background');
	var $bgcolor = $('.cpt-sld-highlight');
	var $btn = $('.ui-draggable section');
	var $input =$(".dtm-edtitm-editor input");
	$btn.mousedown(function(e) {
		uiDraggable(e,this);
	});
	$(document).mouseup(function() {
		status = false;
	});
	$box.mousemove(function(e) {
		determineSize(e,this);
	});
	$bg.click(function(e) {
		clickBg(e,this);
	});
	$input.keypress(function(e){
		  if(e.which == 13) {
		  	$(this).trigger("blur");
		  }
	});
	//输入框输入值来调整大小
	$input.blur(function(){
		maxWidth = barType(this);
		if(parseInt($(this).val())>maxWidth){
			$(this).val(maxWidth);
		}else if(parseInt($(this).val())<=0){
			$(this).val(0);
		}
		inputChangeSize(this,numDiv(barwidth*parseInt($(this).val()),maxWidth));
	});	
	//input框输入值来整大小
	function inputChangeSize(input,val){
		$(input).parents(".dtm-edtitm-height").find(".cpt-sld-highlight").css({"width":val});
		$(input).parents(".dtm-edtitm-height").find(".ui-draggable section").css({"left":val});
	}
	//判断类型
	function barType(box){
		if($(box).attr("data-val")=="chart-height"){//表格最大高度800px
			maxWidth = 800;
		}else if($(box).attr("data-val") == "mark-size"){//标志大小 最大值80px
			maxWidth = 80;
		}else if($(box).attr("data-val") == "title-position"){//标题水平位置最大值
			maxWidth = 2000;
		}else if($(box).attr("data-val") == "title-border"){//标题边框线最大值
			maxWidth = 30;
		}else if($(box).attr("data-val") == "title-padding"){//标题内边距最大值
			maxWidth = 10;
		}else if($(box).attr("data-val") == "title-sub-margin"){//主副标题纵向间隔最大值
			maxWidth = 100;
		}else if($(box).attr("data-val") == "title-font"||$(box).attr("data-val") == "sub-title-font"){//主副标题字体大小最大值
			maxWidth = 100;
		}else if($(box).attr("data-val") == "legend-align-position"||$(box).attr("data-val") == "legend-v-position"){//主副标题字体大小最大值
			maxWidth = 2000;
		}else if($(box).attr("data-val") == "mode-border-font"){//图例边框线粗细
			maxWidth = 30;
		}else if($(box).attr("data-val") == "mode-padding"){//图例内边距
			maxWidth = 10;
		}else if($(box).attr("data-val") == "mode-item-height"||$(box).attr("data-val") == "mode-item-width"){//图例项宽度高
			maxWidth = 100;
		}else if($(box).attr("data-val") == "mode-item-margin"){//图例项宽度高
			maxWidth = 100;
		}else if($(box).attr("data-val") == "mode-font"){//图例字体大小
			maxWidth = 100;
		}else if($(box).attr("data-val") == "tips-border"){//提示边框粗细
			maxWidth = 30;
		}else if($(box).attr("data-val") == "tips-border-radius"){//提示边框圆角
			maxWidth = 15;
		}else if($(box).attr("data-val") == "tips-padding"){//提示边框内边距
			maxWidth = 10;
		}else if($(box).attr("data-val") == "tips-font"){//提示字体大小
			maxWidth = 100;
		}else if($(box).attr("data-val") == "tips-border-width"){//提示 线条宽度
			maxWidth = 20;
		}else if($(box).attr("data-val") == "show-delay"){//提示 显示延时
			maxWidth = 1000;
		}else if($(box).attr("data-val") == "hide-delay"){//提示 隐藏延时
			maxWidth = 1000;
		}else if($(box).attr("data-val") == "animate-switch"){//提示 隐藏延时
			maxWidth = 1000;
		}else if($(box).attr("data-val") == "tool-align-position"){//工具 水平安放位置
			maxWidth = 2000;
		}else if($(box).attr("data-val") == "tool-vertical-position"){//工具 垂直安放位置
			maxWidth = 2000;
		}else if($(box).attr("data-val") == "tool-border"){//工具 工具箱边框线宽
			maxWidth = 30;
		}else if($(box).attr("data-val") == "tool-padding"){//工具 工具箱内边距
			maxWidth = 10;
		}else if($(box).attr("data-val") == "tool-item"){//工具 工具箱每项大小
			maxWidth = 100;
		}else if($(box).attr("data-val") == "tool-item-margin"){//工具 工具箱各项之间间隔
			maxWidth = 100;
		}else if($(box).attr("data-val") == "tool-title-font"){//工具 字体大小
			maxWidth = 100;
		}else if($(box).attr("data-val") == "page-width"){//页面 宽度
			maxWidth = 1600;
		}else if($(box).attr("data-val") == "page-left"){//页面 左边距
			maxWidth = 100;
		}else if($(box).attr("data-val") == "page-right"){//页面 右边距
			maxWidth = 100;
		}else if($(box).attr("data-val") == "page-top"){//页面 上边距
			maxWidth = 100;
		}else if($(box).attr("data-val") == "page-bottom"){//页面 底部边距
			maxWidth = 100;
		}
		
		return maxWidth;
	}
	//初始化进度条大小
	var status = false;
	var ox = 0;
	var lx = 0;
	var left = 0;
	var bgleft = 0;
	var maxWidth = 0;
	var barwidth = 182;
	//通过拖拽来调整大小
	function uiDraggable(e,btn){
		lx = $(btn).offset().left;
		ox = e.pageX - left;
		status = true;
	}
	//鼠标离开时大小确定
	function determineSize(e,box){
		maxWidth = barType(box);
		if (status) {
			left = e.pageX - ox;
			if (left < 0) {
				left = 0;
			}
			if (left > barwidth) {
				left = barwidth;
			}

			$(box).find(".ui-draggable section").css('left', left);
			$(box).find(".cpt-sld-highlight").width(left);
			var temp =  Math.round(numDiv(left,barwidth)*maxWidth);
			$(box).siblings(".dtm-edtitm-editor").find("input").val(temp).change();
		}
	}
	//点击背景框来调整大小
	function clickBg(e,bg){
		maxWidth = barType(bg);
		if (!status) {
			bgleft = $(bg).offset().left;
			left = e.pageX - bgleft;
			if (left < 0) {
				left = 0;
			}
			if (left > barwidth) {
				left = barwidth;
			}
			$(bg).siblings(".ui-draggable").find("section").css('left', left);
			$(bg).find(".cpt-sld-highlight").stop().animate({
				width: left
			}, barwidth);
			var temp =  Math.round(numDiv(left,barwidth)*maxWidth);
			$(bg).parents(".cpt-sld-bar").siblings(".dtm-edtitm-editor").find("input").val(temp).change();
		}
	}
	/**计算滚动条滚动位置占整个滚动条的比例
	 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
	 * 
	 * @param num1被除数 | num2除数
	 */
	function numDiv(num1, num2) {
		var baseNum1 = 0, baseNum2 = 0;
		var baseNum3, baseNum4;
		try {
			baseNum1 = num1.toString().split(".")[1].length;
		} catch (e) {
			baseNum1 = 0;
		}
		try {
			baseNum2 = num2.toString().split(".")[1].length;
		} catch (e) {
			baseNum2 = 0;
		}
		with (Math) {
			baseNum3 = Number(num1.toString().replace(".", ""));
			baseNum4 = Number(num2.toString().replace(".", ""));
			var result = (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
			return result;
		}
	}
	var addIndex = '<div class="addIndex">{0}'+
						'<i class="fa fa-remove remove-index"></i>'
				   '</div>';
	//添加索引
	$(".confirm-btn").click(function(){
		var val = $(this).siblings(".dtm-edtitm-input").children("input").val().trim();
		if(val==""){
			popUp.msg("你还没有输入内容");
			return;
		}
		$(".work-indexs").append(addIndex.replace("{0}",val));
		$(this).siblings(".dtm-edtitm-input").children("input").val("")
	});
	$(".work-indexs").delegate(".remove-index","click",function(){
		$(this).parents(".addIndex").remove();
	})
})(jQuery,window,document);