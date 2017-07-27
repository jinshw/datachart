$.fn.qdata = function(){
	var res = {};

	var data = $(this).attr('data');
	if(data){
		var options = data.split(';');
		for(var i=0; i<options.length; i++){
			if(options[i]){
				var opt = options[i].split(':');
				res[opt[0]] = opt[1];
			}
		}
	}

	return res;
};

/**
 * \u5c01\u88c5\u4e00\u4e9b\u5e38\u7528\u65b9\u6cd5
 * 1.ajax
 * 2.on
 */
var qiao = {};

qiao.ajaxoptions = {
	url 	: '',
	data 	: {},
	type 	: 'post',
	dataType: 'json',
	async 	: false
};
qiao.ajaxopt = function(options){
	var opt = $.extend({}, qiao.ajaxoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}

	return opt;
};
qiao.ajax = function(options){
	if(!options){
		alert('need options');
	}else{
		var res;
		$.ajax(qiao.ajaxopt(options)).done(function(obj){res = obj;});

		return res;
	}
};
qiao.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

/**
 * \u5bf9bootstrap\u7684\u5c01\u88c5
 * 1.alert
 * 2.confirm
 * 3.dialog
 * 4.msg
 * 5.collectionStyle
 * 6.popover
 * 7.classfy
 * 8.bstro
 */
popUp 	= {};
popUp.modaloptions = {
	url 	: '',
	fade	: 'fade',
	close	: true,
	title	: 'title',
	head	: true,
	foot	: true,
	btn		: false,
	okbtn	: '\u786e\u5b9a',
	qubtn	: '\u53d6\u6d88',
	msg		: 'msg',
	big		: false,
	show	: false,
	remote	: false,
	backdrop: 'static',
	keyboard: true,
	style	: '',
	mstyle	: '',
    class   : ''
};
popUp.modalstr = function(opt){
	var start = '<div class="modal '+opt.fade+' '+opt.class+'" id="bsmodal" tabindex="-1" role="dialog" aria-labelledby="bsmodaltitle" aria-hidden="true" style="position:fixed;top:20px;'+opt.style+'">';
	if(opt.big){
		start += '<div class="modal-dialog modal-lg" style="'+opt.mstyle+'"><div class="modal-content">';
	}else{
		start += '<div class="modal-dialog" style="'+opt.mstyle+'"><div class="modal-content">';
	}
	var end = '</div></div></div>';

	var head = '';
	if(opt.head){
		head += '<div class="modal-header">';
		if(opt.close){
			head += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>';
		}
		head += '<h3 class="modal-title" id="bsmodaltitle"><p class="exclamation-circle">!</p>'+opt.title+'</h3></div>';
	}

	var body = '<div class="modal-body"><p><h4>'+opt.msg+'</h4></p></div>';

	var foot = '';
	if(opt.foot){
		foot += '<div class="modal-footer"><button type="button" class="btn btn-primary bsok">'+opt.okbtn+'</button>';
		if(opt.btn){
			foot += '<button type="button" class="btn btn-default bscancel">'+opt.qubtn+'</button>';
		}
		foot += '</div>';
	}

	return start + head + body + foot + end;
};
popUp.alert = function(options, func){
	// options
	var opt = $.extend({}, popUp.modaloptions);

	opt.title = '\u63d0\u793a';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}

	// add
	$('body').append(popUp.modalstr(opt));
	$(".modal-dialog").css({"width":"340px"});
	$(".modal-body").css({"padding":"30px 15px"});
	// init
	var $modal = $('#bsmodal');
	$modal.modal(opt);

	// bind
	qiao.on('button.bsok', 'click', function(){
		if(func) func();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	//拖拽
	popUp.dragDrop();
	// show
	$modal.modal('show');
};
popUp.confirm = function(options, ok, cancel){
	// options
	var opt = $.extend({}, popUp.modaloptions);

	opt.title = '\u786e\u8ba4\u64cd\u4f5c';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	opt.btn = true;

	// append
	$('body').append(popUp.modalstr(opt));
	$(".modal-dialog").css({"width":"340px"});

	// init
	var $modal = $('#bsmodal');
	$modal.modal(opt);

	// bind
	qiao.on('button.bsok', 'click', function(){
		if(ok) ok();
		$modal.modal('hide');
	});
	qiao.on('button.bscancel', 'click', function(){
		if(cancel) cancel();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	//拖拽
	popUp.dragDrop();
	// show
	$modal.modal('show');
};
popUp.dialog = function(options, func){
	// options
	var opt = $.extend({}, popUp.modaloptions, options);
	opt.big = true;

	// append
	$('body').append(popUp.modalstr(opt));

	// ajax page
	var html = qiao.ajax({url:options.url, dataType:'html'});
	$('#bsmodal div.modal-body').empty().append(html);

	// init
	var $modal = $('#bsmodal');
	$modal.modal(opt);

	// bind
	qiao.on('button.bsok', 'click', function(){
		var flag = true;
		if(func){
			flag = func();
		}

		if(flag){
			$modal.modal('hide');
		}
	});
    qiao.on('button.bscancel', 'click', function(){
        $modal.modal('hide');
    });
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	//拖拽
	popUp.dragDrop();
	// show
	$modal.modal('show');
};



popUp.msgoptions = {
	msg  : 'msg',
	type : 'translucent',
	time : 3000,
	position : 'top'
};
popUp.msgstr = function(msg, type, position){
	var left = ($(window).width() - 600)/2+"px";
	return '<div class="alert alert-'+type+' alert-dismissible" role="alert" style="display:none;position:fixed;' + position + ':0;left:'+left+';z-index:2001;margin:0;text-align:center;" id="bsalert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true" >&times;</span></button>'+msg+'</div>';
};
popUp.msg = function(options){
	var opt = $.extend({},popUp.msgoptions);

	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}

	$('body').prepend(popUp.msgstr(opt.msg, opt.type , opt.position));
	$('#bsalert').css({"z-index":"100000"});
	$('#bsalert').slideDown();
	setTimeout(function(){
		$('#bsalert').slideUp(function(){
			$('#bsalert').remove();
		});
	},opt.time);
};

popUp.popoptions = {
	animation 	: true,
	container 	: 'body',
	content		: 'content',
	html		: true,
	placement	: 'bottom',
	title		: '',
	trigger		: 'hover'//click | hover | focus | manual.
};
$.fn.bstip = function(options){
	var opt = $.extend({}, popUp.popoptions);
	if(typeof options == 'string'){
		opt.title = options;
	}else{
		$.extend(opt, options);
	}

	$(this).data(opt).tooltip();
};
$.fn.bspop = function(options){
	var opt = $.extend({}, popUp.popoptions);
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}

	$(this).popover(opt);
};
popUp.tree = {};
popUp.tree.options = {
	url 	: '/ucenter/menu',
	height 	: '600px',
	open	: true,
	edit	: false,
	checkbox: false,
	showurl	: true
};
$.fn.bstree = function(options){
	var opt = $.extend({}, popUp.tree.options);
	if(options){
		if(typeof options == 'string'){
			opt.url = options;
		}else{
			$.extend(opt, options);
		}
	}

	var res = '\u52a0\u8f7d\u5931\u8d25\uff01';
	var json = qiao.ajax(opt.url + '/tree');
	if(json && json.object){
		var tree = json.object;

		var start = '<div class="panel panel-info"><div class="panel-body" ';
		if(opt.height != 'auto')
			start += 'style="height:600px;overflow-y:auto;"';
			start += '><ul class="nav nav-list sidenav" id="treeul" data="url:' + opt.url +';">';
		var children = popUp.tree.sub(tree, opt);
		var end = '</ul></div></div>';
		res = start + children + end;
	}

	$(this).empty().append(res);
	popUp.tree.init();
};
popUp.tree.sub = function(tree, opt){
	var res = '';
	if(tree){
		var res =
			'<li>' +
				'<a href="javascript:void(0);" data="id:' + tree.id + ';url:' + tree.url + ';">' +
					'<span class="glyphicon glyphicon-minus"></span>';
		if(opt.checkbox){
			res += '<input type="checkbox" class="treecheckbox" ';
			if(tree.checked){
				res += 'checked';
			}
			res += '/>';
		}
			res += tree.text;
		if(opt.showurl){
			res += '(' + tree.url + ')';
		}
		if(opt.edit)
			res +=
				'&nbsp;&nbsp;<span class="label label-primary bstreeadd">\u6dfb\u52a0\u5b50\u83dc\u5355</span>' +
				'&nbsp;&nbsp;<span class="label label-primary bstreeedit">\u4fee\u6539</span>' +
				'&nbsp;&nbsp;<span class="label label-danger  bstreedel">\u5220\u9664</span>';
			res += '</a>';
		var children = tree.children;
		if(children && children.length > 0){
				res += '<ul style="padding-left:20px;" id="treeid_' + tree.id + '" class="nav collapse ';
			if(opt.open)
				res += 'in';
				res += '">';
			for(var i=0; i<children.length; i++){
				res += popUp.tree.sub(children[i], opt);
			}
				res += '</ul>';
		}
		res += '</li>';
	}

	return res;
};
popUp.tree.init = function(){
	qiao.on('#treeul .glyphicon-minus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('hide');
			$(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
		}
	});
	qiao.on('#treeul .glyphicon-plus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('show');
			$(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
		}
	});
	qiao.on('input.treecheckbox', 'change', function(){
		// \u68c0\u6d4b\u5b50\u7ea7\u7684
		var subFlag = $(this).prop('checked');
		$(this).parent().next().find('input.treecheckbox').each(function(){
			$(this).prop('checked', subFlag);
		});

		// \u68c0\u6d4b\u7236\u8f88\u7684
		var parentFlag = true;
		var $ul = $(this).parent().parent().parent();
		$ul.children().each(function(){
			var checked = $(this).children().children('input').prop('checked');
			if(!checked) parentFlag = false;
		});
		$ul.prev().children('input').prop('checked', parentFlag);
	});

	popUp.tree.url = $('#treeul').qdata().url;
	if(popUp.tree.url){
		qiao.on('.bstreeadd', 'click', popUp.tree.addp);
		qiao.on('.bstreedel', 'click', popUp.tree.del);
		qiao.on('.bstreeedit', 'click', popUp.tree.editp);
	}
};
popUp.tree.addp = function(){
	popUp.dialog({
		url 	: popUp.tree.url + '/add/' + $(this).parent().qdata().id,
		title 	: '\u6dfb\u52a0\u5b50\u83dc\u5355',
		okbtn 	: '\u4fdd\u5b58'
//	}, popUp.tree.add);
	}, function(){});
};
//popUp.tree.add = function(){
//	var res = qiao.ajax({url:popUp.tree.url + '/save',data:$('#bsmodal').find('form').qser()});
//	popUp.msg(res);
//
//	if(res && res.type == 'success'){
//		qiao.crud.url = popUp.tree.url;
//		qiao.crud.reset();
//		return true;
//	}else{
//		return false;
//	}
//};
popUp.tree.del = function(){
	var res = qiao.ajax({url:popUp.tree.url + '/del/' + $(this).parent().qdata().id});
	popUp.msg(res);

//	if(res && res.type == 'success'){
//		qiao.crud.url = popUp.tree.url;
//		qiao.crud.reset();
//	}
};
popUp.tree.editp = function(){
	popUp.dialog({
		url 	: popUp.tree.url + '/savep?id=' + $(this).parent().qdata().id,
		title 	: '\u4fee\u6539\u83dc\u5355',
		okbtn 	: '\u4fdd\u5b58'
//	}, popUp.tree.edit);
	}, function(){});
};
//popUp.tree.edit = function(){
//	qiao.crud.url = popUp.tree.url;
//	return qiao.crud.save();
//};
popUp.bstrooptions = {
	width 	: '500px',
	html 	: 'true',
	nbtext	: '\u4e0b\u4e00\u6b65',
	place 	: 'bottom',
	title 	: '\u7f51\u7ad9\u4f7f\u7528\u5f15\u5bfc',
	content : 'content'
};
popUp.bstroinit = function(selector, options, step){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, popUp.bstrooptions, options);
			if(typeof options == 'string'){
				opt.content = options;
			}else{
				$.extend(opt, options);
			}

			$element.each(function(){
				$(this).attr({
					'data-bootstro-width'			: opt.width,
					'data-bootstro-title' 			: opt.title,
					'data-bootstro-html'			: opt.html,
					'data-bootstro-content'			: opt.content,
					'data-bootstro-placement'		: opt.place,
					'data-bootstro-nextButtonText'	: opt.nbtext,
					'data-bootstro-step'			: step
				}).addClass('bootstro');
			});
		}
	}
};
popUp.bstroopts = {
	prevButtonText : '\u4e0a\u4e00\u6b65',
	finishButton : '<button class="btn btn-lg btn-success bootstro-finish-btn"><i class="icon-ok"></i>\u5b8c\u6210</button>',
	stopOnBackdropClick : false,
	stopOnEsc : false
};
popUp.bstro = function(bss, options){
	if(bss && bss.length > 0){
		for(var i=0; i<bss.length; i++){
			popUp.bstroinit(bss[i][0], bss[i][1], i);
		}

		var opt = $.extend({}, popUp.bstroopts);
		if(options){
			if(options.hasOwnProperty('pbtn')){
				opt.prevButtonText = options.pbtn;
			}
			if(options.hasOwnProperty('obtn')){
				if(options.obtn == ''){
					opt.finishButton = '';
				}else{
					opt.finishButton = '<button class="btn btn-mini btn-success bootstro-finish-btn"><i class="icon-ok"></i>'+options.obtn+'</button>';
				}
			}
			if(options.hasOwnProperty('stop')){
				opt.stopOnBackdropClick = options.stop;
				opt.stopOnEsc = options.stop;
			}
			if(options.hasOwnProperty('exit')){
				opt.onExit = options.exit;
			}
		}

		bootstro.start('.bootstro', opt);
	}
};
popUp.bsdateoptions = {
	autoclose: true,
	language : 'zh-CN',
	format: 'yyyy-mm-dd'
};
popUp.bsdate = function(selector, options){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, popUp.bsdateoptions, options);
			$element.each(function(){
				$(this).datepicker(opt);
			});
		}
	}
};
//拖拽弹出框
popUp.dragDrop = function (){
     $('.modal-header').mousedown(function (event) { 
        var isMove = true;  
        var abs_x = event.pageX - $('.modal-dialog').offset().left;  
        var abs_y = event.pageY - $('.modal-dialog').offset().top;  
        $(".modal").mousemove(function (event) {  
            var marginTop = 0;
            var marginLeft = 0;
            if (isMove) {  
                var obj = $('.modal-dialog');  
                marginTop = event.pageY - abs_y;
                marginLeft = event.pageX - abs_x;
                obj.css({'margin-left':marginLeft, 'margin-top':marginTop});  
            }  
            return false;
        }).mouseup(function () {  
            isMove = false;  
            return false;
        });  
        return false;
    });
}
