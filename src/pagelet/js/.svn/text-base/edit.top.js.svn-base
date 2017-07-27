;(function($,window,document,editMainJS,dtOption,chartCommon,undefined){

    // fileSystem.createFS(window.PERSISTENT,500*1024);//  window.TEMPORARY
    //新建作品弹出模板列表
    init();
    function init(){
        if(getCookie('t')==1){
            chartPopUp.addChartMenu("",addDT);
            setCookie();
        }
        
    }
    //获取session中的用信息
    function getCookie (key){
        var _a = {};
        var kvs = document.cookie.split('; ');//浏览器获取Cookie时，自动添加了空格
        kvs.forEach(function(kv){
            var _s = kv.split('=');
            _a[_s[0]] = _s[1];
        })
        if(key){
            return _a[key];
        }else{
            return _a;
        }
    }
    function setCookie(){
        document.cookie = "t=2;" 
    }
    var filer = new Filer();
    filer.init({persistent: true, size: 5*1024 * 1024}, function(fs) {
        filer.mkdir("list", false, function(dirEntry) {
        }, onError);
        filer.mkdir("preview", false, function(dirEntry) {
        }, onError);    

        initCharts();
    }, onError);




    var editTopVue = new Vue({
    	el:"#edit-top-id",
    	data:{},
    	methods:{
    		pageSet:function(event){
    			$(".edit-dc-area").css("margin-left","662px");
    			$(".edit-dc-container .cpt-chtedt").css("opacity","10");
    			$(".edit-dc-container .cpt-chtedt").css("z-index","2");
    		},
            addChart:function(event){
                chartPopUp.addChartMenu("",addDT);
            },
            previewDT:function(){
                saveJson('preview');
                /*var url = "filesystem:"+BASE_URL+"/persistent/preview/"+ GetRequest().id +".html";
                console.log(url,"地址url",filer)

                filer.create('preview/'+GetRequest().id +'.html', false, function(fileEntry) {  
                    console.log("创建文件")
                    filer.write('preview/'+GetRequest().id +'.html', {data: preview.getPreviewHTML(), type: 'text/html', append: false},
                    function(fileEntry, fileWriter) {
                       chartPopUp.editorPreviewChart(url);
                    },onError );
                }, onError);*/

            },
            getList:function(event){
                window.location.href = BASE_URL + "/staticpage/chart-list.html";
            },
            save:function(event){

                // 如果list.json 不存在、创建list.json
                filer.create('list/list.json', false, function(fileEntry) {
                    saveJson();
                }, onError);

            },
            returnListPage:function(event){
                window.location.href = BASE_URL + "/staticpage/chart-list.html";
            }
    	}
    });



    function saveJson(flag){
        

        filer.open('list/list.json', function(file) {     

            var reader = new FileReader();
            reader.onload = function(e) {
                console.log(reader.result);
                var _objMapStr = $.trim(reader.result);


                var reObj = {};
                var workId = chartCommon.getUrlParam('id');
                if(_objMapStr != ''){     
                    var reObj = JSON.parse(_objMapStr);
                    objMap['workId'] = workId;
                    objMap['workName'] = $.trim($(".edit-dc-title").text());
                    reObj[workId] = chartCommon.reviewObjMap();
                    


                }else{// list.json = 空
                    reObj = {};
                    objMap['workId'] = workId;
                    objMap['workName'] = $.trim($(".edit-dc-title").text());
                    reObj.workId = chartCommon.reviewObjMap;
                    
                }
                console.log(reObj,"reObj")
                filer.write('list/list.json', {data: JSON.stringify(reObj), type: 'text/plain', append: false},
                    function(fileEntry, fileWriter) {
                        if(flag!="preview"){
                            popUp.msg("保存成功!"); 

                        }else{
                            var url = "filesystem:"+BASE_URL+"/persistent/preview/"+ GetRequest().id +".html";
                            console.log(url,"地址url",filer)

                            filer.create('preview/'+GetRequest().id +'.html', false, function(fileEntry) {  
                                console.log("创建文件")
                                filer.write('preview/'+GetRequest().id +'.html', {data: preview.getPreviewHTML(), type: 'text/html', append: false},
                                function(fileEntry, fileWriter) {
                                   chartPopUp.editorPreviewChart(url);
                                },onError );
                            }, onError);
                        }
                       
                    },
                    onError
                );

            }
            reader.readAsText(file);
        }, function(e){
            console.log(e);
        });


    }


    function initCharts(){
        

        filer.open('list/list.json', function(file) {     

            var reader = new FileReader();
            reader.onload = function(e) {
                console.log(reader.result);
                var _objMapStr = $.trim(reader.result);


                var reObj = {};
                var workId = chartCommon.getUrlParam('id');
                if(_objMapStr != ''){     
                    var reObj = JSON.parse(_objMapStr);
                    //reObj[workId] = chartCommon.reviewObjMap();
                    var _chartsObj = reObj[workId];
                    $(".edit-dc-title").text(_chartsObj['workName']);
                    for(var i in _chartsObj){
                        if(typeof(_chartsObj[i]) == 'object'){
                            console.log(_chartsObj[i],"list json obj");
                            initChart(_chartsObj[i]);
                        }
                    }


                }else{// list.json = 空
                   /* reObj = {};
                    reObj.workId = chartCommon.reviewObjMap;*/
                }

               /* filer.write('list/list.json', {data: JSON.stringify(reObj), type: 'text/plain', append: false},
                    function(fileEntry, fileWriter) {
                        alert("保存成功!");
                    },
                    onError
                );*/

            }
            reader.readAsText(file);
        }, function(e){
            console.log(e);
        });


    }


    /**
     * [initChart 初始化单个图表]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    function initChart(obj){
        var _chartObj = new Object();
        var _id = obj.id;
        _chartObj.id = _id;
        _chartObj.arr = obj.arr;
        _chartObj.type = obj.type;
        _chartObj.subclass = obj.subclass;

        var _option = dtOption.getOption({option:'',type:obj.type,subclass:obj.subclass,arrayData:obj.arr});
        //添加数据图表DOM编辑区
        chartCommon.addChartDOM(_id,dtOption);
        var dtObj = document.getElementById("data-table");
        var dataArrStr = JSON.stringify(obj.arr);
        var optionHot = chartCommon.createHot(dtObj,dataArrStr);
        _chartObj.optionHot = optionHot;

        var chartDivObj = $(".charts-edit-area").children().last().children()[0];
        var myChart = echarts.init(chartDivObj);
        // 为echarts对象加载数据
        myChart.setOption(_option);

        _chartObj.chartOption = _option;

        // 拖拽事件绑定
        chartCommon.drag();
        // 报表操作栏显示设置
        chartCommon.chartToolsDisplay();

        objMap[_id] = JSON.stringify(_chartObj);

    }



    function onError(){
        function errorHandler(e) {  
          var msg = '';  
          
          switch (e.code) {  
            case FileError.QUOTA_EXCEEDED_ERR:  
              msg = 'QUOTA_EXCEEDED_ERR';  
              break;  
            case FileError.NOT_FOUND_ERR:  
              msg = 'NOT_FOUND_ERR';  
              break;  
            case FileError.SECURITY_ERR:  
              msg = 'SECURITY_ERR';  
              break;  
            case FileError.INVALID_MODIFICATION_ERR:  
              msg = 'INVALID_MODIFICATION_ERR';  
              break;  
            case FileError.INVALID_STATE_ERR:  
              msg = 'INVALID_STATE_ERR';  
              break;  
            default:  
              msg = 'Unknown Error';  
              break;  
          };  
          
          console.log('Error: ' + msg);  
        }  
    }


   
    function addDT(type,subclass){
        console.log(type,subclass);
        var obj = {"type":type,"subclass":subclass};
        ajaxRequest.getDTJsonDataByType(obj).then(function(data){
            console.log(data,"返回数据");

            var _chartObj = new Object();
            var _id = chartCommon.createUUID();
            _chartObj.id = _id;
            _chartObj.arr = data.list.arr;
            _chartObj.type = data.type;
            _chartObj.subclass = data.list.subclass;

            var _option = dtOption.getOption({option:'',type:data.type,subclass:data.list.subclass,arrayData:data.list.arr});
            //添加数据图表DOM编辑区
            chartCommon.addChartDOM(_id,dtOption);
            var dtObj = document.getElementById("data-table");
            var dataArrStr = JSON.stringify(data.list.arr);
            var optionHot = chartCommon.createHot(dtObj,dataArrStr);
            _chartObj.optionHot = optionHot;

            var chartDivObj = $(".charts-edit-area").children().last().children()[0];
            var myChart = echarts.init(chartDivObj);
            // 为echarts对象加载数据
            myChart.setOption(_option);

            _chartObj.chartOption = _option;

            // 拖拽事件绑定
            chartCommon.drag();
            // 报表操作栏显示设置
            chartCommon.chartToolsDisplay();

            objMap[_id] = JSON.stringify(_chartObj);


            

        },function(err){
            console.log(err);
        });
    }
    //获取地址栏参数
    function GetRequest() {  
        var url = location.search; //获取url中"?"符后的字串    
        var theRequest = new Object();  
        if (url.indexOf("?") != -1) {  
            var str = url.substr(1);  
            strs = str.split("&");  
            for (var i = 0; i < strs.length; i++) {  
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);  
            }  
        }  
        return theRequest;  
    }  

})(jQuery,window,document,editMainJS,dtOption,chartCommon);