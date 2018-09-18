window.addEventListener=window.addEventListener||function(e,f){window.attachEvent('on'+e,f);};if(!Date.now){Date.now=function now(){return new Date().getTime();};}
if(!Object.create){Object.create=function(proto,props){if(typeof props!=="undefined"){throw "The multiple-argument version of Object.create is not provided by this browser and cannot be shimmed.";}
function ctor(){}
ctor.prototype=proto;return new ctor();};}
if(!Array.prototype.filter){Array.prototype.filter=function(fun){'use strict';if(this===void 0||this===null){throw new TypeError();}
var t=Object(this);var len=t.length>>>0;if(typeof fun!=='function'){throw new TypeError();}
var res=[];var thisArg=arguments.length>=2?arguments[1]:void 0;for(var i=0;i<len;i++){if(i in t){var val=t[i];if(fun.call(thisArg,val,i,t)){res.push(val);}}}
return res;};}
if(!Array.prototype.map){Array.prototype.map=function(callback,thisArg){var T,A,k;if(this==null){throw new TypeError(' this is null or not defined');}
var O=Object(this);var len=O.length>>>0;if(typeof callback!=='function'){throw new TypeError(callback+' is not a function');}
if(arguments.length>1){T=thisArg;}
A=new Array(len);k=0;while(k<len){var kValue,mappedValue;if(k in O){kValue=O[k];mappedValue=callback.call(T,kValue,k,O);A[k]=mappedValue;}
k++;}
return A;};}