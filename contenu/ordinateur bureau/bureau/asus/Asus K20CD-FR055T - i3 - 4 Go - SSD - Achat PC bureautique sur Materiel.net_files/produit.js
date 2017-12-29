
var ProduitFront={init:function()
{ProduitFront.initDialogLivraisonOfferte();},initDialogLivraisonOfferte:function()
{$("#vignettes").on('click',function(){$('#livraisonOfferteInfos').dialog({width:910,heigh:480,modal:true,dialogClass:'dialog-simple',resizable:false});});$('.fermeture-popup').click(function()
{$(this).parents('.ui-dialog-content').dialog('close');});},};$(function()
{ProduitFront.init();$('.ProdPort, .livraison_offerte_infos').click(function(e)
{e.preventDefault();$('#ProdPortInfo').dialog({modal:true,title:'Livraison offerte',width:'400'});});$('#ajout-alerte').live('click',function(event)
{event.preventDefault();var formulaire=$('#form_ajout_alerte_prix');var parametres=formulaire.serialize();$.post($(formulaire).attr('action'),parametres,function(response)
{if(typeof dialog_alerte!=='undefined'){$(dialog_alerte).remove();}
$('#message_retour_alerte').html(response);formulaire=null;parametres=null;});});if($('#Button10X'))
{$('#Button10X').click(function()
{$('#Panel10X').toggle();});}
var premiere_miniature=$('.ProdThumbnails a[rel]').first();if(premiere_miniature.length)
{presentation_image=$('#PresImg img');presentation_image.css('cursor','pointer');presentation_image.click(function()
{$(premiere_miniature).click();});}
var $divHide=$('.dialogueCache');$divHide.hide();toggleAvis($('.boutonMore'));if($('#comments .wrapAvisClients').length>0)
{$('#comments').masonry({itemSelector:'.wrapAvisClients',gutterWidth:20,percentPosition:true});}
$('#detailAvis li[data-url]').click(function()
{var maClass=$(this).attr('class');if(typeof(maClass)=="undefined")
{window.location.href=$(this).attr('data-url');}});$('.ancreNote').click(function(e)
{$.smoothScroll({scrollTarget:'#ProdSectionTitleCom'});});$("#back-top").hide();$(window).scroll(function()
{if($(this).scrollTop()>1000)
{$('#back-top').fadeIn();}
else
{$('#back-top').fadeOut();}});$('#back-top').click(function()
{$('body,html').animate({scrollTop:0},800);return false;});});var $=jQuery.noConflict();$(document).ready(function(){$("#container-image").bind("click",function(e){if($(this).attr('src')){var ez=$("#container-image").data('ezPlus');var gallery=ez.getGalleryList();var $lg=$('#lightgallery');for(var i=0;i<gallery.length;i++){gallery[i].src=gallery[i].href;gallery[i].thumb=gallery[i].href;gallery[i].type='image',gallery[i].subHtml=gallery[i].title;}
$.swipebox(gallery,{hideBarsDelay:false,loopAtEnd:true});}});if(!$('body').hasClass('ie-9')){var mySwiper=$('#PresImg .swiper-container').swiper({mode:'horizontal',paginationClickable:true,animation:'slide',autoplay:3500,slidesPerView:5,slidesPerGroup:3,nextButton:'.swiper-button-next',prevButton:'.swiper-button-prev'});}
$('#PresImg .swiper-slide').bind("click",function(e){e.preventDefault();$("#container-image img").attr('src',$(this).children().attr('data-zoom-image'));if($('.zoomContainer').length===0){$("#container-image").ezPlus({zoomType:'inner',cursor:'crosshair',gallery:'gallery',responsive:true,galleryActiveClass:'active'});}});});