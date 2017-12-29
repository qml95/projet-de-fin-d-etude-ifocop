
$(function()
{Search.hideEmptyFacets();$('#facets input[type=radio]').click(function()
{$(this).parents('ul').find('input[type=radio]').attr('checked',false);$(this).attr('checked',true);Search.paramsReload();});$('#facets form input[type=checkbox]').click(function(){Search.paramsReload();});$('#facetsActiveFilters li').click(function()
{Search.removeFilters(this);});$('#facets .more-btn').click(function()
{Search.showMoreFilters(this);});$('#facets .uncheck-btn').click(function()
{Search.uncheckFilters(this);});$('#facetPrix input[type=radio]').click(function()
{Search.facetPrixSplitValid(this);});$('#facetPrix input[type=button]').click(function()
{Search.facetPrixValid();});$('#searchForm.formulaire_recherche').submit(function(event)
{Search.submitSearch(event);});Search.setupAutocompletion();});var Search={autocompleteHeader:null,autocompleteEnable:true,query:null,searchPage:null,hideEmptyFacets:function()
{$('#facets .facet').each(function()
{if($(this).find('input').length==0)
{$(this).hide();}})},setAutocompleteHeader:function(autocompleteHeader)
{this.autocompleteHeader=autocompleteHeader;},facetPrixSplitValid:function(el)
{$('#prix-max').val($(el).attr('data-prixmax'));$('#prix-min').val($(el).attr('data-prixmin'));Search.facetPrixValid();},facetPrixValid:function()
{var prixMinVal=intval($('#prix-min').val());var prixMaxVal=intval($('#prix-max').val());if(!prixMinVal&&!prixMaxVal)
{return;}
var prixMinRange=intval($('#prix-range-min').val());var prixMaxRange=intval($('#prix-range-max').val());if(prixMaxRange&&(!prixMaxVal||prixMaxVal>prixMaxRange))
{prixMaxVal=prixMaxRange+1;}
if(prixMinVal>prixMaxVal)
{return;}
var prixMinStr=Search.convertDecimalRange(prixMinVal);var prixMaxStr=Search.convertDecimalRange(prixMaxVal);if(prixMinStr=='*'&&prixMaxStr=='*')
{return;}
$('#prix-range').val('['+prixMinStr+' TO '+prixMaxStr+']');Search.paramsReload();},convertDecimalRange:function(val)
{if(intval(val)===false)
{return'*';}
var str=str_pad(intval(val),10,'0','STR_PAD_LEFT');if(str.length>10)
{return'*';}
return'>'+str;},sortList:function()
{$(function()
{var params={};var p=$('#pageNum').val();if(p!=1)
{params.p=1;}
Search.paramsReload();});},itemsPerPage:function()
{$(function()
{Search.paramsReload();});},paramsReload:function()
{window.location.href=Search.getUrl();},removeFilters:function(el)
{var facet=$(el).data('facet');var field=$(el).data('field');var filters=$('#facets form input').filter(function(){return $(this).data("facet")==facet&&$(this).data("field")==field;});$(filters).attr('checked',false);if(facet=='prix_vente')
{$('#prix-range').val('');}
Search.paramsReload();},getUrl:function(params)
{var urlSetted=false;var urlParams='';var sens=$('#sortList select').find('option:selected').data('orberby');var ordre=$('#sortList select').find('option:selected').val();var ppp=$('#itemsPerPage select').val();if(typeof params==='undefined')
{params={};}
if(typeof ppp!='undefined'&&ppp!=25)
{params.ppp=ppp;}
if(typeof sens!='undefined')
{params.sens=sens;}
if(typeof ordre!='undefined'&&ordre!='')
{params.ordre=ordre;}
if(Object.keys(params).length>0)
{urlParams+=$.param(params);urlSetted=true;}
var f=$('#facets form').serializeArray();var urlFilters=this.getFilters(f);f=this.excludeFilters(f);if($('#prix-range').val()!='')
{f.push({'name':'f[prix_vente][]','value':$('#prix-range').val()});}
if(Object.keys(f).length>0)
{if(urlSetted===true)
{urlParams=urlParams+'&';}
urlParams+=$.param(f);urlSetted=true;}
if(urlSetted===true)
{urlParams='?'+urlParams;}
url=this.buildUrl('achat',urlFilters,urlParams);if(this.searchPage==='offre')
{url=this.buildUrl('offre',urlFilters,urlParams);}
return url;},getFilters:function(f)
{var filters=[];for(var param in f)
{if(f[param]['name']==='f[catNom][]')
{filters.push('catNom-'+this.formatFilter(f[param]['value']));}
if(f[param]['name']==='f[marqueNom][]')
{filters.push('marqueNom-'+this.formatFilter(f[param]['value']));}}
return filters.join('--');},excludeFilters:function(f)
{var facets=[];for(var param in f)
{if(f[param]['name']!=='f[catNom][]'&&f[param]['name']!=='f[marqueNom][]')
{facets.push(f[param])}}
return facets;},buildUrl:function(page,urlFilters,urlParams)
{var url='';if(page.length==0||this.query.length==0)
{return url;}
url='/'+page+'/'+Search.formatQuery(this.query)+'/';if(urlFilters)
{url=url+urlFilters+'/'}
if(urlParams)
{url=url+urlParams;}
return url;},showMoreFilters:function(el)
{var moreBtVal='-'
var moreBtInfo=$(el).find('span');if($(moreBtInfo).html()=='-')
{moreBtVal='+';}
$(el).parent().find('.more').slideToggle();$(moreBtInfo).html(moreBtVal);},uncheckFilters:function(el)
{$(el).parent().find('li input[type=checkbox]').removeAttr('checked');Search.paramsReload();},submitSearch:function(event)
{event.preventDefault();var champ_texte_recherche=$('#searchInput');var mots_cles=$(champ_texte_recherche).val();mots_cles=$.trim(mots_cles);baseUrl=$(event.target).data('base-url');if(mots_cles!='')
{url_recherche=Search.formatQuery(mots_cles);var cookieSearchExpirationDate=new Date();cookieSearchExpirationDate.setTime(cookieSearchExpirationDate.getTime()+60000);setSearchCookie('search-manuelle','true',cookieSearchExpirationDate);setSearchCookie('search-form','menu',cookieSearchExpirationDate);if(window.currentUniverse!=undefined)
{setSearchCookie('search-univers',window.currentUniverse,cookieSearchExpirationDate);}
window.location.href=baseUrl+'achat/'+url_recherche+'/';}
else
{$(champ_texte_recherche).val('');}},setupAutocompletion:function(enable)
{if((navigator.appName==='Microsoft Internet Explorer')&&parseInt(navigator.appVersion)<8)
{return;}
if(enable==false||this.autocompleteEnable==false)
{this.autocompleteEnable=false;return;}
$("#searchInput").autocomplete({source:function(request,response){var recherche=$("#searchInput").val();if(recherche.length>2)
{var searchHeaders={};searchHeaders[Search.autocompleteHeader]='1';$.ajax({type:'GET',url:urlWsAutocomplete+encodeURIComponent(recherche),dataType:'json',headers:searchHeaders,success:function(data)
{if(data[0]=="")
{return;}
response(data);}});}},open:function(){$(this).data("autocomplete").menu.element.addClass("autocomplete-search");var position=$(".autocomplete-search").position();var left=position.left-43;$("ul.ui-autocomplete").css({left:left+"px"});},select:function(event,ui){$("#searchInput").val(ui.item.value);$("#searchForm").submit();}});},formatQuery:function(str)
{str=$.trim(str);str=str.toLowerCase();str=replaceSpec(str);str=str.replace(/[\'\/-]+/g,' ');str=str.replace(/[^a-zA-Z0-9\s\.\"]/gi,'');str=$.trim(str);str=str.replace(/(\s)+/g,'-');str=encodeURIComponent(str);return str;},formatFilter:function(str)
{str=$.trim(str);str=str.replace(/(\s)+/g,'+')
str=str.toLowerCase();return str;}};