
var Banner=Banner||{};Banner=(function($)
{var Module=function(){};Module.prototype={init:function()
{Banner.Catalogue.init();}};return new Module();})(jQuery);Banner.Catalogue=(function($,window)
{var BannerCatalogue=function(){this.brandType="pagemarque";this.categoryType="catwide";};BannerCatalogue.prototype={init:function()
{if(typeof $.fn.Mnet_catBanner==="undefined"){return;}
this.initEvents();},initEvents:function()
{var self=this;$('[data-banner]').each(function(){var $container=$(this);var type=$container.data('banner');var identifier=$container.data('banner-id');$container.Mnet_catBanner(self.buildOptions(type,identifier));});},buildOptions:function(type,identifier){if(type===this.categoryType){return{id:type,path_genre:identifier};}
return{id:type,code_marque:identifier};}};return new BannerCatalogue();})(jQuery,window);