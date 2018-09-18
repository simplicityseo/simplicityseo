var CZRHSParams=CZRHSParams||{};var HS_Search;jQuery(function($){HS_Search=$.extend(CZRHSParams,{searching:false,cancelled:false,has_searched:false,count:0,query:'',timeout:null,wrap:$('.frm_form_fields .helpscout-docs'),form:$('.frm_form_fields .helpscout-docs').closest('.frm-show-form'),field:$('.frm_form_fields .helpscout-docs').find('input[type="text"]'),onclick:'',keypress:'',results:{},performed_search:0,performed_search_list:[],visited_doc_articles:[],has_searched_enough:(function(){return $.Deferred(function(){var dfd=this,_resolveAfterDelay=function(){_.delay(function(){if(HS_Search.performed_search>0){dfd.resolve();}else{_resolveAfterDelay();}},20000);};_resolveAfterDelay();return dfd.promise();});})(),init:function(){HS_Search.form.find('.go-next-step').hide();HS_Search.has_searched_enough.done(function(){HS_Search.form.find('.go-next-step').show();});HS_Search.form.on('keypress',function(e){var code=e.which||e.keyCode;if(!HS_Search.field.is(':focus')){return;}
if(code==13&&!$(e.target).is('textarea,input[type="submit"],input[type="button"]')){e.preventDefault();return false;}});HS_Search.wrap.append('<div class="'+CZRHSParams.template.wrap_class+'" style="display:none;" />');HS_Search.field.attr('autocomplete','off').on('keydown keyup change',HS_Search.search_changed);HS_Search.wrap.find('.docs-search-wrap').on('click','.docs-search-results .article',function(ev){var _docLinkEl=$(this).find('.article--open-original'),_docTitleEl=$(this).find('a[data-beacon-article]').first();if(1==_docLinkEl.length&&1==_docTitleEl.length&&!_.isEmpty(_docLinkEl.attr('href'))&&!_.isEmpty(_docTitleEl.html())){HS_Search.visited_doc_articles.push({title:_docTitleEl.html(),url:_docLinkEl.attr('href')});var _cleanCollection=[];_cleanCollection=_.uniq(HS_Search.visited_doc_articles,function(_link_){return _link_.url;});HS_Search.wrap.trigger('new_doc_visited',{doc_links:_cleanCollection});}});},search_changed:function(e){if(_.isUndefined(e.which)&&!_.isEmpty(HS_Search.results))
return;var ignored_key_codes=[9,13,16,17,18,20,32,33,34,37,38,91,93];if(ignored_key_codes.indexOf(e.which)>-1){HS_Search.log('Ignored key press',e.which);return;}
HS_Search.log('Starting search countdown in %d ms',parseInt(CZRHSParams.searchDelay,10));var $el=$(this);clearTimeout(HS_Search.timeout);HS_Search.timeout=setTimeout(function(){HS_Search.log('Performing search',e.which);HS_Search.query=$el.val();if(HS_Search.query.length<CZRHSParams.minLength||(8===e.which||46===e.which)&&HS_Search.query.length===0){HS_Search.cancelled=true;HS_Search.set_results({});return;}
if(!HS_Search.searching){HS_Search.perform_search();}},parseInt(CZRHSParams.searchDelay,10));},perform_search:function(){HS_Search.results={};HS_Search.cancelled=false;HS_Search.fetch_results();HS_Search.performed_search++;var _lastSearch=_.isEmpty(HS_Search.performed_search_list)?'':_.last(HS_Search.performed_search_list),_isLastEntryUpdate=false;if(!_.isEmpty(_lastSearch)){if(_lastSearch.length<HS_Search.query.length){_isLastEntryUpdate=HS_Search.query.substr(0,_lastSearch.length)==_lastSearch;}
else{_isLastEntryUpdate=_lastSearch.substr(0,HS_Search.query.length)==HS_Search.query;}}
if(_isLastEntryUpdate){HS_Search.performed_search_list.pop();}
HS_Search.performed_search_list.push(HS_Search.query);HS_Search.wrap.trigger('new_search_performed',{searches:HS_Search.performed_search_list});},log:function(item,item2){if(HS_Search.debug&&console&&console.log){console.log(item,item2);}},get_results_html:function(){var output='',count=0;if('undefined'!==typeof(HS_Search.results.articles)&&HS_Search.results.articles.results.length){HS_Search.form.find('.go-next-step').show();output=CZRHSParams.template.before;$.each(HS_Search.results.articles.results,function(key,article){var keep=true;if(CZRHSParams.collections.length>0){keep=false;$.each(CZRHSParams.collections,function(collection_key,value){var regex=new RegExp("^/docs/"+value);if(regex.exec(article.docsUrl)){keep=true;}});}
if(count<HS_Search.limit&&keep){count++;output+=HS_Search.get_article_html(article);}});output+=CZRHSParams.template.after;}else{if(4<=HS_Search.performed_search||'resolved'==HS_Search.has_searched_enough.state()){HS_Search.form.find('.go-next-step').show();}else{HS_Search.form.find('.go-next-step').hide();}}
return HS_Search.get_results_found(count)+output;},get_article_html:function(article){var output=CZRHSParams.template.item;for(var key in article){if(article.hasOwnProperty(key)){output=output.replace(RegExp('{'+key+'}',"g"),article[key]);}}
return output;},get_results_found:function(count){var found_text='';var css_class='results-found';if(HS_Search.query.length===0){found_text=CZRHSParams.text.enter_search;css_class+=' message-enter_search';}else if(HS_Search.query.length<HS_Search.minLength){found_text=CZRHSParams.text.not_long_enough.replace('{minLength}',HS_Search.minLength);css_class+=' message-minlength';}else if(0===count){found_text=CZRHSParams.text.no_results_found;css_class+=' message-no_results';}else{found_text=(count===1)?CZRHSParams.text.result_found:CZRHSParams.text.results_found;css_class+=' message-results';}
return CZRHSParams.template.results_found.replace('{css_class}',css_class).replace('{text}',found_text).replace('{count}',count);},set_results:function(results){HS_Search.log('Adding results:',results);HS_Search.results=results;HS_Search.wrap.find('.docs-search-wrap').html(HS_Search.get_results_html()).not(':visible').slideDown();},sanitize_query:function(query){query=query.replace(/[\{\}\[\]]/g,' ');HS_Search.log('Searching for %s',query);return query;},fetch_results:function(){query=HS_Search.sanitize_query(HS_Search.query);$search_wrap=HS_Search.wrap.find('.docs-search-wrap');$.ajax({url:'https://'+CZRHSParams._subdomain+'.helpscoutdocs.com/search/ajax?ref=support&query='+encodeURIComponent(query),async:true,dataType:'json',beforeSend:function(){HS_Search.searching=true;$search_wrap.addClass('docs-searching');HS_Search.wrap.find('.docs-search-wrap').show().html('<span class="gf-hs-spinner"></span>');$('body').trigger('gf_hs_search_started');},success:function(results){if(!HS_Search.cancelled){HS_Search.set_results(results);$('body').trigger('gf_hs_search_results_found');HS_Search.has_searched=true;}},error:function(e){HS_Search.log('Error: %s',e);$('body').trigger('gf_hs_search_error');}}).always(function(){HS_Search.searching=false;$search_wrap.removeClass('docs-searching');});}});});jQuery(function($){_.delay(function(){HS_Search.init();},300);});