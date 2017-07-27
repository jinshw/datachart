;(function($,window,document,chartCommon,undefined){
	//初始页码
	var page = 1;
	var pageSize= 20;
	var status = true;//判断ajax是否返回
	//总页码
	var totalPage = 0;
	//分类id
	var groupId="";
	//搜索名称
	var title="";
	var classfyTemp = '<li class="item" data-id="{0}">'+
							'<div class="item-mode item-mode-display">'+
								'<span class="mode-left mode-name" title="{2}">{1}</span>'+
								'<span class="mode-right mode-btn-hide">'+
									'<i class="fa fa-pencil group-rename"></i>'+
									'<i class="fa fa-trash group-remove"></i>'+
								'</span>'+
							'</div>'+
							'<div class="item-mode item-mode-name item-mode-input">'+
								'<span class="mode-left">'+
									'<input class="mode-input" type="text" data-id="{3}"/>'+
								'</span>'+
								'<span class="mode-right">'+
									'<i class="fa fa-check group-submit"></i>'+
									'<i class="fa fa-remove group-cancel"></i>'+
								'</span>'+
							'</div>'+
						'</li>';
	var chartItem = '<li class="chart-item">'+
						'<div class="checkbox-select">'+
							'<input type="checkbox" name="checkbox" value="{0}"/>'+
							'<i class="fa fa-check-square"></i>'+
						'</div>'+
						'<div class="work-img">'+
							'<div class="work-no-publish-box">'+
								'<div class="work-no-publish"style="{9}">{8}</div>'+
							'</div>'+
							'<img class="fmImage" src="{1}"/>'+
							'<div class="code">'+
								'<div class="remove-one-work">'+
									'<i class="fa fa-times remove-work"></i>'+
								'</div>'+
								'<div class="code-img">'+
									'<a href="javascript:void(0)">'+
										'<img src="{3}"/>'+
									'</a>'+
								'</div>'+
								'<div class="work-operate-set">'+
									'<a href="javascript:void(0)" class="work-preview" title="预览作品">'+
										'<span>预览</span>'+
										'<i class="fa fa-eye"></i>'+
									'</a>'+
									'<a href="javascript:void(0)" class="work-editor" title="编辑作品">'+
										'<span>编辑</span>'+
										'<i class="fa fa fa-pencil"></i>'+
									'</a>'+
									'<a href="javascript:void(0)" class="work-copy" title="复制作品">'+
										'<span>复制</span>'+
										'<i class="fa fa-files-o"></i>'+
									'</a>'+
									'<a href="javascript:void(0)" class="work-info-setup" title="设置作品信息">'+
										'<span>设置</span>'+
										'<i class="fa fa-cog"></i>'+
									'</a>'+
									'<a href="javascript:void(0)" class="work-public" title="发布作品">'+
										'<span>发布</span>'+
										'<i class="fa fa-share-square fa-lg"></i>'+
									'</a>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div class="work-title">'+
							'<p title="{4}">{5}</p>'+
						'</div>'+
						'<div class="work-icon">'+
							'<div class="work-preview-num">'+
								'<i class="fa fa-eye fa-lg"></i>'+
								'<span>{6}</span>'+
							'</div>'+
							'<div class="control-share-btn">[share-btn]</div>'+
						'</div>'+
						'<input type="hidden" name="work-info" value=\'{7}\'/>'+
					'</li>';
	var shareBtn='<div class="work-share">'+
					'<i class="fa fa-share-alt fa-lg"></i>'+
					'</div>';
	$(function(){
		getPersonType();
		getChartByTpe();
	});
	function getPersonType(){
		ajaxRequest.getPersonChartType().then(function(res){
			console.log(JSON.parse(res),"加载分类数据");
			loadPersonData(JSON.parse(res));
		},function(res){
			popUp.msg(res);
		});
	}
	function loadPersonData(data){
		var result = "";
		$.each(data,function(key,value){
			var str=classfyTemp;
			result += str.replace("{0}",value.id).replace("{1}",value.name)
					 .replace("{2}",value.name).replace("{3}",value.id);
		});
		$(".list .all-charts").after(result); 
	}
	//分类切换
	$(".list").delegate(".mode-name","click",function(){
		// if(!status)return;
		$(this).parents(".item").addClass("item-select").siblings().removeClass("item-select");
		groupId=$(this).parents(".item").attr("data-id");
		$(".list-main").children("li:not(.chart-add)").remove();
		page=1;
		getChartByTpe();
		// status = false;
	});
	//修改删除分类按钮显示与隐藏
	$(".list").delegate(".item","mouseover",function(){
		$(this).children(".item-mode-display").children(".mode-right").removeClass("mode-btn-hide");
	});
	$(".list").delegate(".item","mouseout",function(){
		$(this).children(".item-mode-display").children(".mode-right").addClass("mode-btn-hide");
	});
	//重命名
	$(".list-classfy").delegate(".group-rename","click",function(){
		inputShow();
		$(this).parents(".item-mode-display").addClass("mode-input-hide");
		$(this).parents(".item-mode-display").siblings(".item-mode-input").addClass("mode-input-show").removeClass("item-mode-input");
		$(this).parents(".item").find(".mode-input").val($(this).parents(".item-mode").find(".mode-name").html().trim());
	});
	function inputShow(){
		$(".item-mode-name").each(function(){
			if($(this).is(".mode-input-show")){
				$(this).addClass("item-mode-input").removeClass("mode-input-show");
				$(this).siblings(".item-mode-display").removeClass("mode-input-hide");
			}
		});
	}
	//取消选择
	$(".list-classfy").delegate(".group-cancel","click",function(){
		$(this).parents(".mode-input-show").siblings(".item-mode-display").removeClass("mode-input-hide");
		$(this).parents(".mode-input-show").addClass("item-mode-input").removeClass("mode-input-show");
	});
	//提交修改内容
	$(".list-classfy").delegate(".group-submit","click",function(){
		var name = $(this).parents(".mode-input-show").find(".mode-input").val().trim();
		if(name==null||name == ""){
			popUp.alert("你还没有输入分类名称");
			return false;
		}
		var id = $(this).parents(".mode-input-show").find(".mode-input").attr("data-id");
		if(id == ""){
			type = 0;
		}else{
			type = 1;
		}
		addPersonChartType({"name":name,"id":id},type);
	});
	function addPersonChartType(obj,type){
		ajaxRequest.addPersonChartType(obj).then(function(res){
			$(".list").children("li:not(.all-charts)").remove();
			getPersonType();
			if(type == 0){
				hideAddClassfyInput();
			}
		},function(res){
			popUp.msg(res);
		});
	}
	$(".list-classfy").delegate(".group-remove","click",function(){
		ajaxRequest.delPersonChartType({id:$(this).parents(".item").attr("data-id")}).then(function(res){
			$(".list").children("li:not(.all-charts)").remove();
			getPersonType();
		},function(res){
			popUp.msg(res);
		})
	})
	//隐藏输入框
	function hideAddClassfyInput(){
		$(".add-input").removeClass("mode-input-show");
		$(".add-input .mode-input").val("");
		temp++;
	}
	var temp = 0;
	$(".list-add-btn").click(function(){
		console.log(temp,"temp")
		if(temp%2 == 0){
			inputShow();
			$(this).parents(".list-add-container").siblings(".item-mode").addClass("mode-input-show");
		}else{
			$(this).parents(".list-add-container").siblings(".item-mode").removeClass("mode-input-show");
		}
		temp++;	
	});
	//根据分类加载数据
	function getChartByTpe(){

	   //全部作品 默认
    	title=title;
		groupId=groupId;
		page =page;
		var Data={"title":title,"groupId":groupId,"pageNo":page,"pageSize":pageSize};
		console.info(Data,"加载列表数据")
		ajaxRequest.getChartList(Data).then(function(data){
			console.log(data)
			// if(data.data.length==0){
			// 	$(".list-container").find(".no-more-display").css({"display":"block"});
			// 	return;
			// }
			totalPage = data.total;
			setChartData(JSON.parse(data.data));
		},function(res){
			popUp.msg(res);
		});
	}
	function setChartData(data){
		var result = "";
		console.log(data);
		$.each(data,function(key,value){
			var str1 = "";
			var strTemp = chartItem;
			//bug 如果字符串中存在有单引号不能存到input框中
			str1 = strTemp.replace("{0}",value.workId).replace("{1}","../static/css/img/chartList/line1.png")
							.replace("{3}","../static/css/img/chartList/QRCode.png").replace("{4}",value.workName)
							.replace("{5}",value.workName).replace("{6}",0)
							.replace("{7}",JSON.stringify(value)).replace("[share-btn]",shareBtn);
			//是否发布，发布显示分享按钮，在编辑就不显示分享按钮
			if(value.issue=="yes"){
				btn=str1.replace("{8}","已发布").replace("{9}","background-color:#FF9A00;display:none");
			}else{
				btn=str1.replace("{8}","在编辑").replace("{9}","");
			}
			result += btn;
		});
		$(".list-main").append(result);
		page++;
		imgIsCompleteLoad();
	}
	 //判断图片是否加载完成
    function imgIsCompleteLoad(){
    	$(".chart-item .fmImage").each(function(i){
    		if(i>=(page-1-1)*pageSize){
    			this.onload = function(){
					if(this.complete){
						var imgObj = imgWidthOrHeightAuto(this.width,this.height);
			    		$(this).css({"width":imgObj.width,"height":imgObj.height});
					}
				}
    		}else{
    			this.onload = function(){
					if(this.complete){
						var imgObj = imgWidthOrHeightAuto(this.width,this.height);
			    		$(this).css({"width":imgObj.width,"height":imgObj.height});
					}
				}
    		}
    		
    	});
    }
    //图片自适应宽高
    function imgWidthOrHeightAuto(width,height){
    	var thisWith = width;//原始图片宽度
		var thisHeight = height;//原始图片高度
		var oWidth = 235;//设置图片宽度
		var oHeight = 235;//设置图片高度
		if(thisWith<=235){
			oWidth = thisWith;
			if(thisHeight<=235){
				oHeight = thisHeight;
    		}else{
    			oHeight = 235;
    			oWidth = (thisWith*oHeight)/thisHeight;
    		}
		}else{
			if(thisWith>thisHeight){
				oWidth = 235;
				oHeight = (thisHeight*oWidth)/thisWith;
			}else{
				oHeight = 235;
    			oWidth = (thisWith*oHeight)/thisHeight;
			}
		}
		return {"width":oWidth+"px","height":oHeight+"px"};
    }
    //鼠标滚动到页面底部或者顶部
	$(window).scroll(function(){
		if(arrviedAtBottom()){//滚动到底部加载更多
			if(page<=1){
				$(".list-container .returntop").css("opacity","0");
			}else if(page<=totalPage){
				getChartByTpe();
				$(".list-container .returntop").css("opacity","1");
			}else{
				$(".list-container .no-more-display").css({"display":"block"});
			}
		}else if(arrviedAtTop()){//滚动条滚动到顶部隐藏
			$(".list-container .returntop").css("opacity","0");
		}else if(scrollToPosition()){//滚动到一定距离显示回顶图标
			$(".list-container .returntop").css("opacity","1");
		}
	});
	//滚动到底部
	var arrviedAtBottom=function(){
		return $(document).scrollTop()+$(window).height()==$(document).height();
	}
	//滚动到顶部隐藏回顶按钮
	var arrviedAtTop=function(){
		return $(document).scrollTop()<=100;
	}
	//滚动到一定位置显示回顶按钮
	var scrollToPosition=function(){
		return $(document).scrollTop()>1190;
	}
	//显示操作按钮
	$(".btn-select").click(function(){
		$(this).css({"display":"none"}).siblings().css({"display":"inline-block"});
	});
	$(".cancel-select").click(function(){
		$(this).parents(".operator-btn").children(".btn-display").css({"display":"none"});
		$(this).parents(".operator-btn").children(".btn-select").css({"display":"inline-block"});
	});
	//点击回车进行搜索
	$(".search-btn input").keypress(function(e){
		  if(e.which == 13) {
		  	$(".search-btn .fa-search").trigger("click");
		  }
	});
	//搜索作品
	$(".search-btn").delegate(".fa-search","click",function(){
		title=$(this).parents(".search-btn").find(".input").val().trim();
		$(".list-main").children("li:not(.chart-add)").remove();
		page = 1;
		getChartByTpe();
	});
	//显示二维码
	$(".list-main").delegate(".work-img .code","mouseover",function(){
		$(this).parents(".work-img").find(".code").css({"opacity":"1"});
	});
	//隐藏二维码
	$(".list-main").delegate(".work-img .code","mouseout",function(){
		$(this).parents(".work-img").find(".code").css({"opacity":"0"});
	});
	//点击新建图表
	$(".chart-add").click(function(){
		addChart();
	});
	function addChart(){
		var obj = {"workName":"未命名"};

		obj.workId = chartCommon.createUUID();
		var mydate = new Date();
		obj.time="";
		obj.time+=mydate.getFullYear()+"-";
		obj.time+=mydate.getMonth()+1+"-";
		obj.time+=mydate.getDate()+" ";
		obj.time+=mydate.getHours()+":";
		obj.time+=mydate.getMinutes()+":";
		obj.time+=mydate.getSeconds();
		ajaxRequest.addChartItem(obj).then(function(data){
			console.log(data,"data")
			popUp.msg("新增成功，即将跳转到编辑页面");
			setTimeout(function(){
				setCookie();
				goToEdit(data);
			},2000);
		},function(data){
			popUp.msg("新增失败");
		})
		
	}
	//跳转到编辑界面
	var goToEdit = function(id){
		var _a = location.href.split('/');
		_a.pop();
		location.href=_a.join('/')+"/edit.html?"+"id="+id;
	};
	function setCookie(){
		document.cookie = "t=1;" 
	}
	//编辑--作品
	$(".list-main").delegate(".work-editor","click",function(){
		var id = $(this).parents(".chart-item").find(".checkbox-select input").val()
		goToEdit(id);
	});
	$(".list-main").delegate(".remove-work","click",function(){
		var id = $(this).parents(".chart-item").find("input[name='checkbox']").val();
		ajaxRequest.delChartItem({"id":id}).then(function(data){
			$(".list-main").children("li:not(.chart-add)").remove();
			popUp.msg("删除成功");
			getChartByTpe();
		},function(data){
			console.log("删除失败")
		})
	});
})(jQuery,window,document,chartCommon);