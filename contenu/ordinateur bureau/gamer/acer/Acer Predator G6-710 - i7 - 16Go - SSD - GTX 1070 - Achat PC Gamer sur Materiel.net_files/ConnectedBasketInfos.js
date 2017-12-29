
var ConnectedBasketInfos={init:function()
{if(!this.isCookieDefined())
{return;}
this.display();},display:function()
{var connectedAreaInfos='';if(this.isCacheAvailable())
{connectedAreaInfos=localStorage.getItem('connectedAreaInfos');if(this.isCacheMustBeRefreshed())
{connectedAreaInfos=this.updateCache();}}
else
{connectedAreaInfos=this.getConnectedInfosAndBasketData();}
if(connectedAreaInfos!=''&&connectedAreaInfos!=null)
{setCookie('connectedAreaHash',connectedAreaInfos.hashCode(),null,true);$('#connectCart').replaceWith(connectedAreaInfos);}},updateCache:function()
{if(this.isCacheAvailable())
{connectedAreaInfos=this.getConnectedInfosAndBasketData();localStorage.setItem('connectedAreaInfos',connectedAreaInfos);setCookie('connectedAreaHash',connectedAreaInfos.hashCode(),1,true);return connectedAreaInfos;}},isCacheMustBeRefreshed:function()
{return this.computeConnectedBasketInfosHashFromLocalStorage()!=this.getConnectedBasketInfosHashFromCache();},computeConnectedBasketInfosHashFromLocalStorage:function()
{var connectedAreaInfos=localStorage.getItem('connectedAreaInfos');if(connectedAreaInfos==''||connectedAreaInfos==null)
{return'';}
return connectedAreaInfos.hashCode();},getConnectedBasketInfosHashFromCache:function()
{return getCookie('connectedAreaHash');},getConnectedInfosAndBasketData:function()
{var connectedAreaInfos='';$.ajax({url:'/request/GetBasket.php',async:false,headers:{'X-LEVEL':'1'}}).success(function(data){connectedAreaInfos=data;});return connectedAreaInfos;},isCookieDefined:function()
{var session_cookie=getCookie('PHPSESSID');return session_cookie!==undefined;},isCacheAvailable:function()
{var currentHostname='//'+location.hostname;return typeof localStorage!='undefined'&&location.protocol=='http:'&&SERVEUR_STATIC==currentHostname;}};