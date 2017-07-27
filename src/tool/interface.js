;(function($) {
  var ajaxRequest = {};
  var tips = "操作失败";

  var filer = new Filer();
  filer.init({
      persistent: true,
      size: 5 * 1024 * 1024
    }, function(fs) {
      filer.mkdir("list", false, function(dirEntry) {}, onError);
      filer.mkdir("preview", false, function(dirEntry) {}, onError);
    }, onError);

  // 获取图表列表数据
  ajaxRequest.getDTJsonTest = function() {
    var dtd = $.Deferred(); // 新建一个Deferred对象
    $.getJSON('json/dt-list.json', function(json, textStatus) {

      console.log("interface--GetDTListTest exe ...");
      console.log(json);
      console.log(textStatus);

      if (textStatus == 'success') {
        dtd.resolve(json);
      }

    });

    return dtd.promise(); // 返回promise对象
  }
  // 根据图表类型获取图表数据
  ajaxRequest.getDTJsonDataByType = function(obj) {
    console.log(obj, "接收参数");
    var dtd = $.Deferred(); // 新建一个Deferred对象
    $.getJSON('json/chart-data.json', function(json, textStatus) {
      if (textStatus == 'success') {
        dtd.resolve(dataByType(obj, json));
      }

    });
    return dtd.promise(); // 返回promise对象
  }
  //筛选数据
  function dataByType(obj, json) {
    var temp = {
      "type": obj.type
    };
    for (var i = 0; i < json.length; i++) {
      if (obj.type == json[i].type) {
        for (var j = 0; j < json[i].list.length; j++) {
          if (obj.subclass == json[i].list[j].subclass) {
            temp.list = json[i].list[j];
            break;
          }
        }
      }
    };
    return temp;
  }
  // 加载个人图表分类
  ajaxRequest.getPersonChartType = function() {
    var dtd = $.Deferred(); // 新建一个Deferred对象
    filer.init({
      persistent: true,
      size: 5 * 1024 * 1024
    }, function(fs) {
      filer.mkdir("list", false, function(dirEntry) {}, onError);
      filer.mkdir("preview", false, function(dirEntry) {}, onError);
      filer.mkdir("persontype", false, function(dirEntry) {
        getList();
      }, onError);
    }, onError);
    function getList(event) {
      filer.open('persontype/person-chart-type.json', function(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          dtd.resolve(reader.result);
        }
        reader.readAsText(file);
      }, onError);
    }
    return dtd.promise(); // 返回promise对象
  }
  // 新增个人图表分类
  ajaxRequest.addPersonChartType = function(obj) {
    console.log(obj);
    var dtd = $.Deferred(); // 新建一个Deferred对象
    filer.create('persontype/person-chart-type.json', false, function(fileEntry) {
      fileEntry.name = "person-chart-type.json";
      // fileEntry.name == 'myFile.txt'
    }, onError);

    filer.open('persontype/person-chart-type.json', function(file) {

      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(reader.result);
        var _objMapStr = $.trim(reader.result);
        if(obj.id == ""){
          obj.id = chartCommon.createUUID();
        }else{
          obj.id = obj.id;
        }
        var reObj = {};
        var id = obj.id;
        if (_objMapStr != '') {
          reObj = JSON.parse(_objMapStr);
          reObj[id] = obj;


        } else { // person-chart-type.json = 空
          reObj = {};
          reObj[id] = obj;
        }

        filer.write('persontype/person-chart-type.json', {
          data: JSON.stringify(reObj),
          type: 'text/plain',
          append: false
        }, function(fileEntry, fileWriter) {
          dtd.resolve(id);
        }, onError);

      }
      reader.readAsText(file);
    }, function(e) {
      console.log(e);
    });
    return dtd.promise(); // 返回promise对象
  }
  //删除分类
  ajaxRequest.delPersonChartType = function(obj){
    var dtd = $.Deferred();
    filer.open('persontype/person-chart-type.json', function(file) {

      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(reader.result);
        var _objMapStr = $.trim(reader.result);

        var reObj = {};
        var id = obj.id;
        if (_objMapStr != '') {
          reObj = JSON.parse(_objMapStr);
          console.log(reObj[id])
          if(reObj[id]){
            delete reObj[id];
          }
        }

        filer.write('persontype/person-chart-type.json', {
          data: JSON.stringify(reObj),
          type: 'text/plain',
          append: false
        }, function(fileEntry, fileWriter) {
          dtd.resolve(id);
        }, onError);

      }
      reader.readAsText(file);
    }, function(e) {
      console.log(e);
    });
    return dtd.promise();
  }
  //新增图表
  ajaxRequest.addChartItem = function(obj) {
    var dtd = $.Deferred();
    filer.create('list/list.json', false, function(fileEntry) {
      fileEntry.name = "list.json";
      // fileEntry.name == 'myFile.txt'
    }, onError);

    filer.open('list/list.json', function(file) {

      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(reader.result);
        var _objMapStr = $.trim(reader.result);


        var reObj = {};
        var workId = obj.workId;
        if (_objMapStr != '') {
          reObj = JSON.parse(_objMapStr);
          reObj[workId] = obj;


        } else { // list.json = 空
          reObj = {};
          reObj[workId] = obj;
        }

        filer.write('list/list.json', {
          data: JSON.stringify(reObj),
          type: 'text/plain',
          append: false
        }, function(fileEntry, fileWriter) {
          dtd.resolve(workId);
        }, onError);

      }
      reader.readAsText(file);
    }, function(e) {
      console.log(e);
    });
    return dtd.promise();
  }

  //根据分类查询图表列表
  ajaxRequest.getChartList = function(obj) {
    var dtd = $.Deferred();
    filer.init({
      persistent: true,
      size: 5 * 1024 * 1024
    }, function(fs) {
      filer.mkdir("list", false, function(dirEntry) {
        getList();
      }, onError);
      filer.mkdir("preview", false, function(dirEntry) {}, onError);
    }, onError);
    // getList();

    function getList(event) {
      filer.open('list/list.json', function(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          dtd.resolve({
            "data": reader.result
          });
        }
        reader.readAsText(file);
      }, onError);
    }
    return dtd.promise();
  }
  ajaxRequest.delChartItem = function(obj) {
    var dtd = $.Deferred();
    filer.open('list/list.json', function(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(reader.result);
        var _objMapStr = $.trim(reader.result);

        var reObj = {};
        var id = obj.id;
        if (_objMapStr != '') {
          reObj = JSON.parse(_objMapStr);
          console.log(reObj[id])
          if(reObj[id]){
            delete reObj[id];
          }
        }

        filer.write('list/list.json', {
          data: JSON.stringify(reObj),
          type: 'text/plain',
          append: false
        }, function(fileEntry, fileWriter) {
          dtd.resolve(id);
        }, onError);

      }
      reader.readAsText(file);
    }, function(e) {
      console.log(e);
    });
    return dtd.promise();
  }

  function onError() {
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

  window.ajaxRequest = ajaxRequest;

})($)