
var Cookie={cookieName:'cookieAccepted',init:function()
{$(function()
{$('#cookie .button').click(function()
{Cookie.accept();});Cookie.display();});},accept:function()
{if(getCookie(this.cookieName))
{return this;}
var expireIn=365*24;setCookie(this.cookieName,true,expireIn,true);this.hide();return this;},display:function()
{if(!getCookie(this.cookieName))
{this.show();}
return this;},show:function()
{$('#cookie').show();},hide:function()
{$('#cookie').slideUp();$('#banners').animate({top:0});}};Cookie.init();