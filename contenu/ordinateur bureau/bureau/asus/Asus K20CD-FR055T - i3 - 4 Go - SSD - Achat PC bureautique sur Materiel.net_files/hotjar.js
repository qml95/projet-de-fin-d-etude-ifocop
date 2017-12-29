
(function($)
{var Hotjar=function()
{this.id=null;};Hotjar.prototype={init:function()
{this.id=$('[data-hotjar-config]').data('hotjar-id');if(this.id)
{(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjsv:5};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'//static.hotjar.com/c/hotjar-'+this.id,'.js?sv=');}}};$(document).ready(function(){var hj=new Hotjar();hj.init();});})(jQuery);