
var BrowserDetection=(function(){var u=navigator.userAgent;var c={ie:/msie/i.test(u),firefox:/firefox/i.test(u),opera:/opera/i.test(u),chrome:/chrome/i.test(u),safari:/safari/i.test(u)&&!/chrome/i.test(u)}
try{if(c.ie)
c.ie=/msie\s([^;]+)/i.exec(u)[1];else if(c.firefox)
c.firefox=/firefox\/([^\s]+)/i.exec(u)[1];else if(c.opera)
c.opera=/opera\/([^\s]+)/i.exec(u)[1];else if(c.chrome)
c.chrome=/chrome\/([^\s]+)/i.exec(u)[1];else if(c.safari)
c.safari=/version\/([^\s]+)/i.exec(u)[1];}catch(e){}
this.client=c;})();window.onDomReady=(function DomReady(fn){(function(i){var u=navigator.userAgent;var e=false;var st=setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
else if((/mozilla/i.test(u)&&!/(compati)/.test(u))||(/opera/i.test(u))){document.addEventListener("DOMContentLoaded",i,false);}else if(e){(function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})
(fn);})
function PlLineSwitch(Line,ImgID,ChangeClass)
{if(ChangeClass)
Line.className=Line.className.replace(/(BskLine(?:1|2))/,'BsklineHover');}
function PlLineBack(Line,Class)
{Line.className=Class;}
function ClassSwitch(Obj,ClassName)
{Obj.className=ClassName;}
function ImgSwitch(Obj,Url)
{Obj.src=Url;}
function ShowHideElem(Name,Show)
{Elem=document.getElementById(Name);if(Elem)
{if(typeof(Show)=='undefined')
Elem.style.display=(Elem.style.display=='none')?'':'none';else
Elem.style.display=(Show)?'':'none';}}
function ShowPanel(ID,container,refresh)
{if(document.getElementById(ID)==null||refresh)
{var containerElement=document.getElementById(container)||document.body;if(refresh&&document.getElementById(ID)){containerElement.removeChild(document.getElementById(ID));return;}
var XHR=GetHRObject();if(!XHR)
return;XHR.onreadystatechange=function()
{if(XHR.readyState==4&&XHR.status==200)
{var panel=document.createElement('div');panel.innerHTML=XHR.responseText;containerElement.appendChild(panel.firstChild);ShowHideElem(ID);}};XHR.open('GET','/request/Infos.php?op=get-'+ID);XHR.send(null);}
else
ShowHideElem(ID);}
function getElementsByClassName(className,tag,elm)
{var testClass=new RegExp("(^|\\s)"+className+"(\\s|$)");var tag=tag||"*";var elm=elm||document;var elements=(tag=="*"&&elm.all)?elm.all:elm.getElementsByTagName(tag);var returnElements=[];var current;var length=elements.length;for(var i=0;i<length;i++)
{current=elements[i];if(testClass.test(current.className))
returnElements.push(current);}
return returnElements;}
function ProdMediaCreate(UrlVideo,Url360,UrlVideoMk)
{ObjHolder=document.getElementById('MediaHolder');if(ObjHolder)
return;ObjHolder=document.createElement("div");ObjHolder.id='MediaHolder';ObjHolder.style.marginLeft='380px';ObjHolder.style.marginTop='50px';ObjHolder.style.position='absolute';ObjHolder.style.zIndex='20';ObjHolder.className='ProdMedia';Data='<div id="MediaContainer"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="416" height="332" id="playback"><param name="allowScriptAccess" value="sameDomain" /><param name="menu" value="false" /><param name="scale" value="exactfit" /><param name="movie" value="'+UrlVideo+'" /><param name="quality" value="high" /><embed menu="true" src="'+UrlVideo+'" quality="high" width="416" height="332" name="playback" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed></object></div>'
+'<a id="MediaClose" href="#" onclick="ProdMediaClose(); return false;"></a>'
+'<a id="MediaSwitchVideo" href="#" onclick="ProdMediaSwitch(1, \''+UrlVideo+'\', \''+Url360+'\', \''+UrlVideoMk+'\'); return false;"></a>';if(Url360)
Data+='<a id="MediaSwitch360" href="#" onclick="ProdMediaSwitch(2, \''+UrlVideo+'\', \''+Url360+'\', \''+UrlVideoMk+'\'); return false;"></a>';ObjHolder.innerHTML=Data;Parent=document.getElementById('ProdPicture').parentNode;Parent.insertBefore(ObjHolder,Parent.firstChild);}
function ProdMediaClose()
{ObjHolder=document.getElementById('MediaHolder');if(!ObjHolder)
return;ObjHolder.parentNode.removeChild(ObjHolder);}
function ProdMediaSwitch(Type,UrlVideo,Url360,UrlVideoMk)
{if(!document.getElementById('MediaHolder'))
ProdMediaCreate(UrlVideo,Url360,UrlVideoMk);Container=document.getElementById('MediaContainer');if(!Container)
return;switch(Type)
{case 1:Container.innerHTML='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="416" height="332" id="playback"><param name="allowScriptAccess" value="sameDomain" /><param name="menu" value="false" /><param name="movie" value="'+UrlVideo+'" /><param name="quality" value="high" /><embed menu="true" src="'+UrlVideo+'" quality="high" width="416" height="332" name="playback" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed></object>';break;case 2:Container.innerHTML='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="416" height="256" id="playback"><param name="allowScriptAccess" value="sameDomain" /><param name="menu" value="false" /><param name="movie" value="'+Url360+'" /><param name="quality" value="high" /><embed menu="true" src="'+Url360+'" quality="high" width="416" height="256" name="playback" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed></object>';break;case 3:Container.innerHTML='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="416" height="332" id="playback"><param name="allowScriptAccess" value="sameDomain" /><param name="menu" value="false" /><param name="movie" value="'+UrlVideoMk+'" /><param name="quality" value="high" /><embed menu="true" src="'+UrlVideoMk+'" quality="high" width="416" height="332" name="playback" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed></object>';break;}}
var AssetManager={Setup:function(url,params){if((params.width*params.height)==0){document.getElementById(params.target).parentNode.innerHTML="";}}};function getCookie(c_name)
{var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++)
{x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name)
{return unescape(y);}}}
function setCookie(c_name,value,exhours,isSecure)
{var exdate=new Date();exdate.setHours(exdate.getHours()+exhours);var c_value=escape(value)+((exhours==null)?"":"; expires="+exdate.toUTCString());var cookie=c_name+"="+c_value+"; path=/;";if(typeof isSecure==='boolean'&&isSecure){cookie+=" secure;";}
document.cookie=cookie;}
function getUrlVars()
{var vars={},hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');for(var i=0;i<hashes.length;i++)
{hash=hashes[i].split('=');vars[hash[0]]=hash[1];}
return vars;}
function str_pad(input,pad_length,pad_string,pad_type)
{var
half='',pad_to_go;var str_pad_repeater=function(s,len)
{var collect='';while(collect.length<len)
{collect+=s;}
return collect;};input+='';pad_string=pad_string!==undefined?pad_string:' ';if(pad_type!=='STR_PAD_LEFT'&&pad_type!=='STR_PAD_RIGHT'&&pad_type!=='STR_PAD_BOTH')
{pad_type='STR_PAD_RIGHT';}
if((pad_to_go=pad_length-input.length)>0)
{switch(pad_type)
{case'STR_PAD_LEFT':input=str_pad_repeater(pad_string,pad_to_go)+input;break;case'STR_PAD_RIGHT':input=input+str_pad_repeater(pad_string,pad_to_go);break;case'STR_PAD_BOTH':half=str_pad_repeater(pad_string,Math.ceil(pad_to_go/2));input=half+input+half;input=input.substr(0,pad_length);break;}}
return input;}
function intval(val)
{return parseInt(val)||0;}
function replaceSpec(Texte)
{var TabSpec={"à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","è":"e","é":"e","ê":"e","ë":"e","ç":"c","ì":"i","í":"i","î":"i","ï":"i","ù":"u","ú":"u","û":"u","ü":"u","ÿ":"y","ñ":"n","-":" ","_":" "};var reg=/[àáäâèéêëçìíîïòóôõöøùúûüÿñ_-]/gi;return Texte.replace(reg,function(){return TabSpec[arguments[0].toLowerCase()];}).toLowerCase();}