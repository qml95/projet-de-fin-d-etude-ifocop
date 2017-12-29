
var SeoFront={init:function()
{SeoFront.initSeoLinks();},initSeoLinks:function()
{$('[data-links-seo]').find('[data-href]').each(function()
{var title=$(this).data('title');var href=$(this).data('href');var classElement='';if($(this).data('class')!=undefined)
{classElement=' class="'+$(this).data('class')+'"';}
$(this).wrap('<a href="'+href+'" title="'+title+'" '+classElement+'></a>');})}};$(function()
{SeoFront.init();});