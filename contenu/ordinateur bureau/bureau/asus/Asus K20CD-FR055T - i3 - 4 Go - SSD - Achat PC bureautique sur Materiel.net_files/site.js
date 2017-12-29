
var Skin;var SkinManager={skins:new Array(),active:-1,initialize:function()
{$('#page').css({'z-index':1000,'position':'relative'});return this;},register:function(object)
{var f=-1;if(this.skins.length>0)
{$(this.skins).each(function(idx,skin)
{if(skin.background==object.background&&skin.color==object.color)
{f=idx;}});}
if(f>=0)
{return f;}
if(!jQuery.type(object.background)&&!jQuery.type(object.color))
{return-1;}
var id=this.skins.length;this.skins.push(object);var clone=document.createElement('div');$(clone).prop('id','skin-'+id).css({'position':'absolute','background-position':'50% 0px','background-repeat':'no-repeat','z-index':id+1,'visibility':'hidden'});$('body').append($(clone));if(object.background)
{$(clone).css('background-image',(object.background=='none'?'none':'url('+SERVEUR_STATIC+object.background+')'));}
if(object.color)
{$(clone).css('background-color',object.color);}
$(clone).fadeIn(400);this.skins[id].skin=$(clone);$(clone).css({'width':$('body').css('width'),'height':$('body').css('height'),'top':'0px','left':'0px'});return id;},set:function(object)
{id=this.register(object);if(id==-1)
{return;}
if(this.active==-1)
{$('#skin-'+id).css({'opacity':1,'visibility':'visible'});this.active=id;return;}
old=this.active;var c=this.skins.length;$(this.skins).each(function(i,s)
{$(s.skin).css((i==old?{'z-index':c}:(i==id?{'z-index':c-1}:{'z-index':0,'opacity':0})));});$('#skin-'+id).css('visibility','visible').animate({'opacity':1},400);$('#skin-'+old).css('visibility','hidden').animate({'opacity':0},400);this.active=id;return;}};$(document).ready(function()
{if(navigator.appCodeName==='Mozilla')
{$('body').addClass('gecko');}
if(navigator.appName==='Microsoft Internet Explorer')
{switch(navigator.appVersion)
{case'6.0':$('body').addClass('ie-6');break;case'7.0':$('body').addClass('ie-7');break;case'8.0':$('body').addClass('ie-8');break;case'9.0':$('body').addClass('ie-9');break;case'10.0':$('body').addClass('ie-10');break;}}
if(navigator.appCodeName==='Opera')
{$('body').addClass('presto');}
if((navigator.appCodeName==='Mozilla')&&!!navigator.userAgent.match(/Trident/))
{$('body').addClass('gte-ie-11');}
if(navigator.userAgent.match(/Linux/i))
{$('body').addClass('linux');}
else if(navigator.userAgent.match(/Mac OS/i))
{$('body').addClass('mac-os');}
Skin=SkinManager.initialize();if(!((navigator.appName==='Microsoft Internet Explorer')&&navigator.appVersion=='6.0'))
{var aPanel=$('#account .panel');$('#account .panel input').bind('blur',function()
{aPanel.css('display','');});$('#account .panel input').bind('focus',function()
{aPanel.css('display','block');});if(navigator.appCodeName==='Safari')
{$('#account .panel input').attr('autocomplete','off');}}
$('#prod li.facebook a').click(function(event)
{event.preventDefault();var fb=window.open($(this).attr('href'),'facebook','menubar=no,status=no,toolbar=no,resizable=yes,width=1000,height=625');fb.focus();});if(typeof(is_custom_theme)!='undefined')
{if(is_custom_theme)
{$("div#page").on("pub.click",pubEvents);$('div#page').on('mousedown',function(e)
{if(isSkinArea(e))
{$("div#page").trigger({type:"pub.click",pubType:"skin",pubId:custom_theme_skinId});}}).click(function(e)
{if(isSkinArea(e))
{window.location='/'+custom_theme_url;}});}}
function isSkinArea(e)
{var tg=e.target?e.target:e.srcElement;var hauteurClic=e.clientY+Math.max(document.documentElement.scrollTop,document.body.scrollTop);if(tg.parentNode.tagName=='BODY'&&hauteurClic<=800)
{return true;}
return false;}
$('.asset-link').each(function(index,link)
{var link_id=$(link).prop('id');if(link_id&&link_id.indexOf('-')!=-1)
{var asset_id=link_id.substring(link_id.indexOf('-')+1);$(link).prop('href','/assets/'+asset_id);}});var topBar=$("#topBarConseil");var infoContact='<i class="fa fa-phone"></i> <span class="bold">Conseil</span> : 02 40 92 91 91 <span class="headerSmall">(Non surtax&eacute;)</span>';if(isServiceClientOpen()===true)
{topBar.html(infoContact);}
topBar.show();function isServiceClientOpen()
{var currentDate=new Date();var samedi=6;var dimanche=0;var heureOuverture=9;var heureFermeture=18;var juin=5;if(currentDate.getDay()==dimanche)
{return false;}
if(currentDate.getDay()==samedi)
{return false;}
if(currentDate.toDateString()===new Date(2017,juin,28).toDateString())
{heureFermeture=19;}
if(currentDate.getHours()>=heureOuverture&&currentDate.getHours()<heureFermeture)
{return true;}
return false;}});function isHomePage()
{var location=document.location.href;var tempArray=location.split('/');var dernier_element=tempArray[tempArray.length-1];if((tempArray.length==4)&&(dernier_element=='index.php'||dernier_element==''))
{return true;}
return false;}
function highlightItemMenu(currentCategoryUrl,universeUrl)
{$(document).ready(function()
{var link;if($('#nav li.'+currentCategoryUrl).length>0)
{link=$('#nav li.'+currentCategoryUrl+' a');}
else
{link=$('#nav li.'+universeUrl+' a');}
$(link).addClass('active');});}
function setSearchCookie(key,value,cookieSearchExpirationDate)
{value=escape(value)+("; expires="+cookieSearchExpirationDate.toUTCString()+'; path=/');document.cookie=key+"="+value;}
function toggleAvis(boutonToggle)
{boutonToggle.unbind('click');boutonToggle.click(function()
{var $cibleHtml=$(this).parent().children(".dialogueCache");$cibleHtml.toggle();if($cibleHtml.is(':visible'))
{$(this).parent().children('.boutonMore').html('<span>-</span> Masquer les commentaires');}
else
{$(this).parent().children('.boutonMore').html('<span>+</span> Afficher tous les commentaires');}
$('#comments').masonry();});}