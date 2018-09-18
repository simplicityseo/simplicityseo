(function($){var pluginName='extLinks',defaults={addIcon:true,iconClassName:'tc-external',newTab:true,skipSelectors:{classes:[],ids:[]},skipChildTags:['IMG']};function Plugin(element,options){this.$_el=$(element);this.options=$.extend({},defaults,options);this._href=$.trim(this.$_el.attr('href'));this.init();}
Plugin.prototype.init=function(){var self=this,$_external_icon=this.$_el.next('.'+self.options.iconClassName);if(!this._is_eligible()){if($_external_icon.length)
$_external_icon.remove();return;}
if(this.options.addIcon&&0===$_external_icon.length){this.$_el.after('<span class="'+self.options.iconClassName+'">');}
if(this.options.newTab&&'_blank'!=this.$_el.attr('target'))
this.$_el.attr('target','_blank');};Plugin.prototype._is_eligible=function(){var self=this;if(!this._is_external(this._href))
return;if(!this._is_first_child_tag_allowed())
return;if(2!=(['ids','classes'].filter(function(sel_type){return self._is_selector_allowed(sel_type);})).length)
return;var _is_eligible=true;$.each(this.$_el.parents(),function(){if('underline'==$(this).css('textDecoration')){_is_eligible=false;return false;}});return true&&_is_eligible;};Plugin.prototype._is_selector_allowed=function(requested_sel_type){if(czrapp&&czrapp.userXP&&czrapp.userXP.isSelectorAllowed)
return czrapp.userXP.isSelectorAllowed(this.$_el,this.options.skipSelectors,requested_sel_type);var sel_type='ids'==requested_sel_type?'id':'class',_selsToSkip=this.options.skipSelectors[requested_sel_type];if('object'!=typeof(this.options.skipSelectors)||!this.options.skipSelectors[requested_sel_type]||!$.isArray(this.options.skipSelectors[requested_sel_type])||0===this.options.skipSelectors[requested_sel_type].length)
return true;if(this.$_el.parents(_selsToSkip.map(function(_sel){return 'id'==sel_type?'#'+_sel:'.'+_sel;}).join(',')).length>0)
return false;if(!this.$_el.attr(sel_type))
return true;var _elSels=this.$_el.attr(sel_type).split(' '),_filtered=_elSels.filter(function(classe){return-1!=$.inArray(classe,_selsToSkip);});return 0===_filtered.length;};Plugin.prototype._is_first_child_tag_allowed=function(){if(0===this.$_el.children().length)
return true;var tagName=this.$_el.children().first()[0].tagName,_tagToSkip=this.options.skipChildTags;if(!$.isArray(_tagToSkip))
return true;_tagToSkip=_tagToSkip.map(function(_tag){return _tag.toUpperCase();});return-1==$.inArray(tagName,_tagToSkip);};Plugin.prototype._is_external=function(_href){var _main_domain=(location.host).split('.').slice(-2).join('.'),_reg=new RegExp(_main_domain);_href=$.trim(_href);if(_href!==''&&_href!='#'&&this._isValidURL(_href))
return!_reg.test(_href);return;};Plugin.prototype._isValidURL=function(_url){var _pattern=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return _pattern.test(_url);};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new Plugin(this,options));}});};})(jQuery);