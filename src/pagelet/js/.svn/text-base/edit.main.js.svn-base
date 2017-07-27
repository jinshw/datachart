;var editMainJS = (function($,window,document,dtOption,undefined){
	var robj = {};

	//删除图表
    $("section[data-op-type='remove']").click(function(){
        $(this).parent().parent().parent(".charts-edit-area-main").remove();
    });

    // 绑定数据
	var editMainVue = new Vue({
		el:"#edit-main-id",
		data:{
			// objMap:objMap,
			selectedChart:"",
			chartHeightVal:300,
			symbolSize:0,
			backgroundColor:'FFFFFF'
		},
		computed:{
			option:{
				get:function(){
					var _chartObj={};
					var _option = {};
					if(this.selectedChart != ''){
						_chartObj = JSON.parse(this.selectedChart);
						_option = _chartObj.chartOption
					}
					return _option;
				}
			},
			seriesType:{
				get:function(){
					var _chartObj={};
					var _seriesType = "bar";
					if(this.selectedChart != ''){
						_chartObj = JSON.parse(this.selectedChart);
						_seriesType = _chartObj.chartOption.series[0].type;
					}
					if(_seriesType == "line"){
						return {"line":true,"bar":false};
					}else if(_seriesType == "bar"){
						return {"line":false,"bar":true};
					}
				}
			}

		},
		methods:{
			closeLeft:function(event){
				$(".edit-dc-area").css("margin-left","0px");
				$(".edit-dc-container .cpt-chtedt").css("opacity","0");
    			$(".edit-dc-container .cpt-chtedt").css("z-index","-1");
			},
			chartTypeSelect:function(event){
				
				var chartType = event.target.textContent;
				refreshChart('chartType',chartType);
			},
			seriesSmooth:function(event){
				var _seriesSmooth = event.target.textContent;
				refreshChart('seriesSmooth',_seriesSmooth);
			},
			backgroundColorChange:function(event){
				console.log("backgroundColorChange--\n"+event);
			},
			titleTextChage:function(event){
				console.log(event.target);
				refreshChart('titleText',event.target.value);
			},
			titleLinkChage:function(event){
				refreshChart('titleLink',event.target.value);
			},
			titleSubtextChage:function(event){
				refreshChart('titleSubtext',event.target.value);
			},
			titleSublinkChage:function(event){
				refreshChart('titleSublink',event.target.value);
			},
			titleHP:function(event){// 标题水平安放位置
				var _titleHP = event.target.textContent;
				refreshChart('titleHP',_titleHP);
			},
			titleVP:function(event){// 标题垂直安放位置
				var _titleVP = event.target.textContent;
				refreshChart('titleVP',_titleVP);
			}
		}
	});

// 设置为全部变量 方便改变数据
window.editMainVue = editMainVue;


	function refreshChart(type,value){

		var _selectedChartId = objMap._selectedChartId;
		var _chartObj = JSON.parse(objMap[_selectedChartId]);
		var _option = _chartObj.chartOption;

		var chartDivObj = $("[data-chart-id="+ _selectedChartId +"]").parent().prev();
	    
		if(type == 'h'){//高度
			_option.grid.height = value;
			chartDivObj.css('height',parseInt(value)+100);
		}
		if(type=="chartType"){// 图表类型
			var _chartType = "line";
			console.log("属性设置："+value);
			switch(value){
				case "折线":
					_chartType = "line";
					$(".line-unique").css('display','block');
					break;
				case "柱":
					_chartType = "bar";
					$(".line-unique").css('display','none');
					break;
			}

			var _series	= _option.series;
			for(var i=0;i<_series.length;i++){
				_series[i].type = _chartType;
			}

		}else if(type == "seriesSmooth"){// 是否为平滑曲线
			var _smooth = "否";
			console.log("属性设置："+value);
			switch(value){
				case "否":
					_smooth = false;
					break;
				case "是":
					_smooth = true;
					break;
			}

			var _series	= _option.series;
			for(var i=0;i<_series.length;i++){
				_series[i].smooth = _smooth;
			}

		}else if(type == "symbolSize"){// 标志大小
			var _series	= _option.series;
			for(var i=0;i<_series.length;i++){
				_series[i].symbolSize = parseInt(value);
			}
		}else if(type == "backgroundColor"){
			_option.title.backgroundColor = value;
			_option.backgroundColor = value;
		}else if(type == "titleText"){
			_option.title.text = value;
		}else if(type == "titleSubtext"){
			_option.title.subtext = value;
		}else if(type == "titleLink"){
			var _link = "";
			if(value.length >4){
				var _http = value.substring(0,4);
				if(_http == 'http'){
					_link = value;
				}else{
					_link = "http://"+value;
				}

			}else{
				_link = "http://"+value;
			}
			_option.title.link = _link;
		}else if(type == "titleSublink"){
			var _link = "";
			if(value.length >4){
				var _http = value.substring(0,4);
				if(_http == 'http'){
					_link = value;
				}else{
					_link = "http://"+value;
				}

			}else{
				_link = "http://"+value;
			}
			_option.title.sublink = _link;
		}else if(type =="titleHP"){
			var _hp = "left"
			switch(value){
				case "居左":
					_hp = 'left';
					break;
				case "居中":
					_hp = 'center';
					break;
				case "居右":
					_hp = 'right';
					break;
			}

			_option.title.left = _hp;
		}else if(type =="titleVP"){
			var _vp = "top"
			switch(value){
				case "居上":
					_vp = 'top';
					break;
				case "居中":
					_vp = 'middle';
					break;
				case "居下":
					_vp = 'bottom';
					break;
			}

			_option.title.top = _vp;
		}

		objMap[_selectedChartId] = JSON.stringify(_chartObj);
		// 设置选择对象
		editMainVue.selectedChart = JSON.stringify(_chartObj);
		
        var myChart = echarts.init(chartDivObj[0]);
        // 为echarts对象加载数据
        myChart.setOption(_option);

	}


	//设置刷新图表函数为全部
	window.refreshChart = refreshChart;


	return robj;
})(jQuery,window,document,dtOption);