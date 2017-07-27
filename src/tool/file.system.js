;(function($,window,document,undefined){
	var robj = {};

	// type=window.TEMPORARY,
	robj.createFS = function(type,size){
		var _type = type || window.TEMPORARY;// PERSISTENT
		var _size = size || 5*1024*1024;
		window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(_type, 5*1024*1024, function(fs){
        	window.fs = fs;
        }, this.errorHandler);
	}

	robj.createFile = function(fileName,content,callback){
		if(fileName == null || typeof(fileName) == 'undefined'){
			console.log("文件名称不能为空!");
			return ;
		}

		fs.root.getFile(fileName, {create: true}, function(fileEntry) {

			
			
            fileEntry.createWriter(function(fileWriter) {

                fileWriter.onwriteend = function(e) {
                    console.log('Write completed.');
                    if(typeof(callback) != 'undefined'){
						callback();
					}
                };

                fileWriter.onerror = function(e) {
                    console.log('Write failed: ' + e.toString());
                };

                var saveContentArr = [];
                saveContentArr.push(content);
                var blob = new Blob(saveContentArr,{ "type" : "text/plain;charset=utf-8" });
                fileWriter.write(blob);

            }, this.errorHandler);

        }, this.errorHandler);
	}

	robj.deleteFile = function(fileName,callback){
		fs.root.getFile(fileName, {create: false}, function(fileEntry) {  
			fileEntry.remove(function() {  
				console.log('File removed.');  
				if(typeof(callback) != 'undefined'){
					callback();
				}
			}, this.errorHandler);  
		}, this.errorHandler); 

	}

	robj.createDirectory = function(folderName,callback){
		fs.root.getDirectory(folderName, {create: true}, function(dirEntry) {  
			if(typeof(callback) != 'undefined'){
				callback();
			}
		}, this.errorHandler); 
	}




	robj.errorHandler = function(){
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

	window.fileSystem = robj;

	// return robj;
})(jQuery,window,document,undefined);