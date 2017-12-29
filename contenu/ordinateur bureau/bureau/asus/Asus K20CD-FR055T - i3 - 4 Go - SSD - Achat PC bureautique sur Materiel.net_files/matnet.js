
$(document).ready(function()
{$('#showHideWizardComponents').click(function()
{$('tr.Wizard').toggle();$('#showHideWizardComponents').html(($('tr.Wizard').is(':visible'))?'Masquer les composants de votre PC [-]':'Voir les composants de votre PC [+]');});$('.CategoryIntroductionCache').hide();$('.CategoryIntroductionPlus').click(function()
{if($(this.parentNode).find('.CategoryIntroductionCache').is(':visible'))
{$(this.parentNode).find('.CategoryIntroductionPlus').html('[+] En savoir plus');$(this.parentNode).find('.CategoryIntroductionCache').slideUp();}
else
{$(this.parentNode).find('.CategoryIntroductionPlus').html('[-] Masquer');$(this.parentNode).find('.CategoryIntroductionCache').slideDown();}});$('.bt_multibox').click(function()
{var option={'selector':'#'+$(this).attr('rel'),'titre':$(this).attr('alt')}
$(this).Mnet_multibox(option);});$('.mb').click(function(event)
{event.preventDefault();var option={'texte':'<img src="'+$(this).attr('href')+'" />','width':$(this).width()*1.10,'titre':$(this).attr('title')}
$(this).Mnet_multibox(option);});ConnectedBasketInfos.init();$assetsHomeLinkSelector="div.box > span.asset > a.asset-link";$assetsHomeImgSelector=$assetsHomeLinkSelector+" > img";$($assetsHomeImgSelector).on('pub.view',pubEvents);$($assetsHomeImgSelector).on('pub.click',pubEvents);$($assetsHomeImgSelector).each(function(){$(this).trigger('pub.view');});$($assetsHomeLinkSelector).each(function(){$(this).on('mousedown',function()
{$(this).children().trigger('pub.click');}).on('click',function(event){window.location.href=$(this).parent().attr('href');});});});String.prototype.hashCode=function()
{var hash=0,i,chr,len;if(this.length===0)
{return hash;}
for(i=0,len=this.length;i<len;i++)
{chr=this.charCodeAt(i);hash=((hash<<5)-hash)+chr;hash|=0;}
return hash;};function pubEvents(event)
{event.stopImmediatePropagation();var value=null;var action=null;if(event.pubType!=undefined&&event.pubType==="skin"&&event.pubId!=undefined)
{value=String(event.pubId);action=event.pubType;}
else
{switch(event.target.nodeName){case'IMG':matches=$(event.target).attr('src').match(/\/assets\/(\d+)\./);break;case'DIV':matches=(event.target.style.backgroundImage).match(/\/assets\/(\d+)/);break;}
value=matches[1];action=$(event.target).data('type');}
if(typeof action==='undefined')
{action='unknown';}
Events.send('pub.'+event.namespace,action,value);}
function exists(obj){if($(obj).length>0)
{return true;}
return false;}
$.fn.Mnet_slider=function(option,callback)
{$('#FilterPrice').slider({range:true,min:option.price_min,max:option.price_max,values:[option.range_min,option.range_max],stop:function(event,ui)
{$('#FilterPriceValue').val(ui.values[0]+';'+
ui.values[1]+';'+
option.price_min+';'+
option.price_max);if(typeof callback==='function')
{callback();}},slide:function(event,ui)
{$('#FilterPriceDisplay').html('De '+ui.values[0]+' à '+ui.values[1]+' &euro;');$('#filtre-prix-min').html(ui.values[0]+' &euro;');$('#filtre-prix-max').html(ui.values[1]+' &euro;');}});$('#FilterPrice a').last().addClass("ui-slider-handle-right");}
$.fn.Mnet_multibox=function(option)
{if(!option.width)option.width=500;var box_dialog=document.createElement('div');$(box_dialog).attr('id','box_dialog');if(option.texte)
{$(box_dialog).html(option.texte);}
else if(option.selector)
{$(box_dialog).html($(option.selector).html());}
else if(option.link)
{$(box_dialog).load(option.link);}
else{return false;}
$(box_dialog).dialog({autoOpen:option.auto_open,title:option.titre,width:option.width,height:option.height,modal:option.modal,close:function(event,ui)
{$('#box_dialog').remove();}});}
var pwdstrength=-1;function PasswdStrength(elem,pwd_min_length,type)
{var option={};if(type==1)
{option['type']='full';option['selector_msg']='#PwdStrengthMessage';}
else
{option['type']='min';option['selector_msg']='#PassMessage';}
var pwd=$(elem).val();if(pwd&&pwd.length>=pwd_min_length)
{$.post('passmeter.nt.html',{'pwd':pwd},function(response)
{DisplayPwdStrength(parseInt(response),option);});}
else
{DisplayPwdStrength(0,option);}}
function pwdClass(level)
{var imgStrength=new Array('#InvalidPwd','#WeakPwd','#GoodPwd');$.each(imgStrength,function(index,value)
{if(index==level)
{$(value).removeClass('SwitchOff').addClass('SwitchOn');}
else
{$(value).removeClass('SwitchOn').addClass('SwitchOff');}});}
function DisplayPwdStrength(newstrength,option)
{if(newstrength!=pwdstrength)
{pwdstrength=newstrength;if(pwdstrength>=60)
{if(option['type']=='full')
{pwdClass(2);}
$(option['selector_msg']).html('Mot de passe conforme et s&eacute;curitaire');$(option['selector_msg']).css('color','#8DC500');}
else if(pwdstrength>0)
{if(option['type']='full')
{pwdClass(1);}
$(option['selector_msg']).html('Mot de passe conforme mais peu s&eacute;curitaire');$(option['selector_msg']).css('color','#FFAA00');}
else
{if(option['type']=='full')
{pwdClass(0);}
$(option['selector_msg']).html('Mot de passe trop court');$(option['selector_msg']).css('color','#FF0000');}}}
function CheckPwdSubmit()
{if(pwdstrength<=0)
{return false;}
return true;}