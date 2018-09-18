(function($){var pluginName='addDropCap',defaults={wrapper:".entry-content",minwords:50,skipSelectors:{tags:['IMG','IFRAME','H1','H2','H3','H4','H5','H6','BLOCKQUOTE'],classes:[],ids:[]}};function Plugin(element,options){this.element=element;this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this.init();}
Plugin.prototype.init=function(){var $_target=this._get_dropcap_el();if($_target&&this.options.minwords<=this._countWords($_target.text()))
this._may_be_add_dc($_target);};Plugin.prototype._get_dropcap_el=function(_requested_el){var $_first_el=_requested_el||$(this.options.wrapper).find(this.element).first(),_first_el_text=this._get_real_text($_first_el.text());if(!this._is_authorized($_first_el)&&$_first_el.next().length)
return this._get_dropcap_el($_first_el.next());else if(this._is_authorized($_first_el)&&_first_el_text)
return $_first_el;else if($_first_el.next().length)
return this._get_dropcap_el($_first_el.next());return;};Plugin.prototype._get_real_text=function(_text){_text.replace(/&nbsp;/g,'').replace(/ /g,'');return this._removeSpecChars(_text);};Plugin.prototype._is_authorized=function($_el){if('function'!=typeof(_))
return true;if(!$_el[0]||!$_el[0].tagName)
return;if(!this._is_tag_allowed($_el))
return;if(!this._are_children_tag_allowed($_el))
return;if(!this._is_selector_allowed($_el,['ids','classes']))
return;return true;};Plugin.prototype._may_be_add_dc=function($_target){var
_first_word='',_split_text=$_target.text().replace(/ /g,'&nbsp;').split('&nbsp;');if(!_.isArray(_split_text))
return;if(_split_text.length)
_first_word=_split_text[0];_first_word=this._removeSpecChars(_first_word);if(!_first_word.charAt(0))
return;var _first_letter=_first_word.charAt(0),_rest_of_word=_first_word.substr(1),_drop_capped='',_html='';_first_letter=['<span class="tc-dropcap">',_first_letter,'</span>'].join('');_drop_capped=[_first_letter,_rest_of_word].join('');_html=$_target.html().replace(_first_word,_drop_capped);$_target.html(_html);};Plugin.prototype._is_selector_allowed=function($_el,sel_types){if('object'!=typeof(this.options.skipSelectors))
return true;var self=this,_filtered=sel_types.filter(function(sel_typ){return false===self._is_sel_type_allowed($_el,sel_typ);});return 0===_filtered.length;};Plugin.prototype._is_sel_type_allowed=function($_el,sel_typ){if(!this.options.skipSelectors[sel_typ]||!$.isArray(this.options.skipSelectors[sel_typ]))
return true;var _attr='ids'==sel_typ?'id':'class';if('object'!=typeof(this.options.skipSelectors)||!this.options.skipSelectors[sel_typ]||!$.isArray(this.options.skipSelectors[sel_typ]))
return true;var _elSels=!$_el.attr(_attr)?[]:$_el.attr(_attr).split(' '),_selsToSkip=this.options.skipSelectors[sel_typ],_current_filtered=_elSels.filter(function(name){return-1!=$.inArray(name,_selsToSkip);});var _pref='ids'==sel_typ?'#':'.',_children_filtered=_selsToSkip.filter(function(name){return 0!==$_el.find(_pref+name).length;});return 0===$.merge(_current_filtered,_children_filtered).length;};Plugin.prototype._is_tag_allowed=function($_el){if('object'!=typeof(this.options.skipSelectors)||!_.isArray(this.options.skipSelectors.tags))
return true;return-1==_.indexOf(_.map(this.options.skipSelectors.tags,function(_tag){return _tag.toUpperCase();}),$_el[0].tagName);};Plugin.prototype._are_children_tag_allowed=function($_el){if('object'!=typeof(this.options.skipSelectors)||!_.isArray(this.options.skipSelectors.tags))
return true;if(0===$_el.children().length)
return true;var
_tagToSkip=this.options.skipSelectors.tags,_filtered=_tagToSkip.filter(function(_tag){return 0!==$_el.find(_tag).length;});return 0===_filtered.length;};Plugin.prototype._countWords=function(_expr){if('string'!=typeof(_expr))
return 0;_expr=_expr.replace('&nbsp;',' ');return(_expr.split(' ')).length;};Plugin.prototype._removeSpecChars=function(_expr,_replaceBy){_replaceBy=_replaceBy||'';return 'string'==typeof(_expr)?_expr.replace(/[^\w-?!\u00bf-\u00ff]/g,_replaceBy):'';};Plugin.prototype._stripHtmlTags=function(expr){return(expr&&'string'==typeof(expr))?expr.replace(/(<([^>]+)>)/ig,""):false;};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new Plugin(this,options));}});};})(jQuery);