(function($,czrapp,_){czrapp.ready.then(function(){var _placeholder_wrapper_selector='.tc-placeholder-wrap',_defaults={remove_action:null,dismiss_action:null,remove_selector:'',nonce_handle:'',nonce_id:'',position:null,},_getData=function($_el){_defaults_keys=_.keys(_defaults);return _.object(_.chain(_defaults_keys).map(function(key){var _data=$_el.data(key);return _data?[key,_data]:'';}).compact().value());},_doAjax=function(_query_){var ajaxUrl=czrapp.localized.adminAjaxUrl,dfd=$.Deferred();$.post(ajaxUrl,_query_).done(function(_r){if('0'===_r||'-1'===_r)
czrapp.errorLog('placeHolder dismiss : ajax error for : ',_query_.action,_r);}).fail(function(_r){czrapp.errorLog('placeHolder dismiss : ajax error for : ',_query_.action,_r);}).always(function(){dfd.resolve();});return dfd.promise();},_ajaxActionDo=function(_what_,_params_){var _query={},dfd=$.Deferred();if(!_.isObject(_params_)){czrapp.errorLog('placeHolder dismiss : wrong params');return;}
_params_=_.extend(_defaults,_params_);_query.action=_params_.dismiss_action;if('remove'==_what_&&!_.isNull(_params_.remove_action))
_query.action=_params_.remove_action;if(!_.isNull(_params_.position))
_query.position=_params_.position;_query[_params_.nonce_id]=_params_.nonce_handle;_doAjax(_query).done(function(){dfd.resolve();});return dfd.promise();};czrapp.$_body.on('click','.tc-inline-remove',function(ev){ev.preventDefault();var $_wrapper=$(this).closest(_placeholder_wrapper_selector);if($_wrapper.length<1){return;}
var _data=_getData($_wrapper);_ajaxActionDo('remove',_data).done(function(){_data=_.extend(_defaults,_data);$(_data.remove_selector).fadeOut('slow');});}).on('click','.tc-dismiss-notice',function(ev){ev.preventDefault();var $_wrapper=$(this).closest(_placeholder_wrapper_selector);if($_wrapper.length<1){return;}
_ajaxActionDo('dismiss',_getData($_wrapper)).done(function(){$_wrapper.slideToggle('fast');});});});})(jQuery,czrapp,_);