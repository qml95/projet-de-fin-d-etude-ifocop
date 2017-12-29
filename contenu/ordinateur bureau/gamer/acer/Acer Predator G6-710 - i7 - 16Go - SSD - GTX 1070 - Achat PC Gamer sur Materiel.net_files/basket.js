
Number.prototype.format=function(precision){dec='.';thou=',';for(var i=0;i<arguments.length;i++){if(i==0)precision=arguments[i];if(i==1)dec=arguments[i];if(i==2)thou=arguments[i];}
o=this.toFixed(precision);o=o.toString();parts=o.split('.');var cnum=parts[0],parr=[],j=cnum.length,m=Math.floor(j/3),n=cnum.length%3||3;for(var i=0;i<j;i+=n){if(i!=0){n=3;}
parr[parr.length]=cnum.substr(i,n);m-=1;}
fnum=parr.join(thou);o=(precision==0?fnum:fnum+dec+parts[1]);return o;}
function number_format(number,precision){dec_sep=".";th_sep=",";for(var i=0;i<arguments.length;i++){if(i==0)number=arguments[i];if(i==1)precision=arguments[i];if(i==2)dec_sep=arguments[i];if(i==3)th_sep=arguments[i];}
return new Number(number).format(precision,dec_sep,th_sep);}
function GetHRObject()
{var HttpReq;if(typeof(XMLHttpRequest)!='undefined')
{HttpReq=new XMLHttpRequest();}
else
{try
{HttpReq=new ActiveXObject('Microsoft.XMLHTTP');}
catch(e)
{HttpReq=null;}}
return HttpReq;}
function UpdateBasket()
{$.ajax({url:'/request/BasketUpdate.php',headers:{'X-LEVEL':'1'}}).success(function(data){Data=data.split(';');var basket=$('#basket');$('#BasketProdCount').html(number_format(Data[0],0,',',' '));$('#BasketProdCount').addClass('cartFull');$('#BasketAmount').html(number_format(Data[1],2,',',' ')+' &euro;');ConnectedBasketInfos.updateCache();});}
function ChangeAmount(ItemID,Qte)
{var HttpReq=GetHRObject();if(Qte>99)
{Qte=99;}
if(!HttpReq)
{document.location.href='/panier.nt.html?op=prodmod&prod='+ItemID+'&qte='+Qte;return;}
var loading=$('<div id="loading-ajout-panier">');var htmLoading='<div class="image-loading"><img src="'+SERVEUR_STATIC+'/images/gui/main/ajax-loader.gif" border="0" alt="Ajout en cours"/></div>';$(loading).html(htmLoading);$(loading).dialog({width:400,modal:true,dialogClass:'dialog-simple',resizable:false});$.ajax({url:'/request/ItemAmount.php?product='+ItemID+'&qte='+Qte,headers:{'X-LEVEL':'1'},dataType:"json"}).complete(function(jqXHR){var data=$.parseJSON(jqXHR.responseText);$(loading).dialog('destroy');$(loading).remove();if(data.message=='OK')
{if($('#ProdBasketAlert').length)
{$('#infoProduit').html(data.infoProduit);}
else
{var conteneurPopup=document.createElement("div");conteneurPopup.id='ProdBasketAlert';conteneurPopup.innerHTML=data.contenuPopup;document.body.appendChild(conteneurPopup);}
$('#ProdBasketAlert').dialog({width:910,heigh:480,modal:true,dialogClass:'dialog-simple',resizable:false});$('.fermeture-popup').click(function()
{$(this).parents('.ui-dialog-content').dialog('close');$('#ProdBasketAlert').remove();});UpdateBasket();$('.btnAjtPanier').each(function(){$(this).hide();});$('.prodSimiComp').each(function(){$(this).mouseenter(function(){$(this).find('.btnAjtPanier').show();})
$(this).mouseleave(function(){$(this).find('.btnAjtPanier').hide();})});}});}
function ProdAlertValidate(Stay,basketUrl)
{$('.ui-dialog-content').dialog('close');$('#ProdBasketAlert').remove();if(!Stay)
document.location.href=basketUrl;}
function goToFicheProduit(url)
{document.location.href='https://'+window.location.hostname+url;}
function ProdFiltresUpdate(Cat)
{$('input[name="filtre_offre"]').parent().removeClass('active');$('input[name="filtre_offre"]:checked').parent().addClass('active')
ProdListUpdate(Cat,undefined,undefined,1);}
function productPerPageUpdate(Cat,productPerPage,serviceUrl)
{$('#productPerPage').val(productPerPage);ProdListUpdate(Cat,undefined,undefined,1,undefined,undefined,serviceUrl);}
function ProdListUpdate(Cat,Sort,SortOrder,Page,Lien,filtreMarque,serviceUrl)
{if(Lien&&Lien.getAttribute('href'))
{Lien.setAttribute('href','#prods');}
var productPerPage=$('#productPerPage').val();viewType=$('#CatDisplayType').val();if(typeof Sort==='undefined')
{Sort=$('#sortBy').val();}
else
{$('#sortBy').val(Sort);}
if(typeof SortOrder==='undefined')
{SortOrder=$('#sortType').val();}
else
{$('#sortType').val(SortOrder);}
if(typeof Page==='undefined')
{Page=$('#productPage').val();}
else
{$('#productPage').val(Page);}
PlcElem=document.getElementById('Plc');PlcElem.innerHTML='<img src="'+SERVEUR_STATIC+'/images/gui/main/Reload.gif" width="16" height="16" align="top" alt="" /> En cours de chargement ...';var HttpReq=GetHRObject();Url=document.location.pathname+'?';if(HttpReq)
{if(typeof serviceUrl==="undefined")
{Url='/request/ProdList.php?categ='+Cat;}
else
{Url=serviceUrl;}}
Filters=document.getElementsByName('Filter');filters_length=Filters.length;for(i=0;i<filters_length;i++)
{F=Filters[i];if(F.type=='checkbox')
{if(F.checked)
Url+='&f['+F.id.substr(6)+']='+F.value;}
else
{Url+='&f['+F.id.substr(6)+']='+F.value;}}
var filtresOffre=$('input[name="filtre_offre"]:checked');var fo=new Array();$(filtresOffre).each(function(i){fo[i]=$(this).val();Url+='&fo['+i+']='+$(this).val();});filters_lie=document.getElementsByName('Filter-lie');filters_lie_length=filters_lie.length;for(i=0;i<filters_lie_length;i++)
{F=filters_lie[i];Url+='&g['+F.id.substr(6)+']='+F.value;}
Brands=document.getElementById('FilterBrand');if(Brands)
{Url+='&fb='+Brands.value;}
Price=document.getElementById('FilterPriceValue');if(Price)
{Url+='&fp='+Price.value;}
SfObj=document.getElementById('FilterSF');if(SfObj)
{Url+='&sf='+SfObj.value;}
Url+='&sort='+Sort+'&so='+SortOrder;Url+='&p='+Page;Url+='&n='+productPerPage;Url+='&v='+viewType;ProdList=document.getElementsByName('comp');for(var i=0;i<ProdList.length;i++)
{if(ProdList[i].checked==true)
{Url+='&prodlist[]='+ProdList[i].value;}}
if(filtreMarque!=undefined&&filtreMarque)
{Url+=('&marque='+filtreMarque);}
if(!HttpReq)
{document.location.href=Url;return;}
HttpReq.onreadystatechange=function()
{if(HttpReq.readyState==4&&HttpReq.status==200)
{if(HttpReq.responseText)
{ProdSpace=document.getElementById('ProdListArea');ProdSpace.innerHTML=HttpReq.responseText;if(typeof InfoProduit!='undefined')
{InfoProduit.call();}
if(typeof SeoFront!='undefined')
{SeoFront.init();}}}}
HttpReq.open('GET',Url,true);HttpReq.setRequestHeader('X-Requested-With','XmlHttpRequest');HttpReq.send(null);}
$(function(){if($('#cat').data('cat-is-migrated')===undefined)
{var category=$('#category').val();var page=$('#productPage').val();if(typeof category!='undefined'&&category!=''&&areFiltersSelected()===true)
{ProdListUpdate(category,undefined,undefined,page);}}});function areFiltersSelected()
{var isTrue=false;if($('#FilterBrand').val()!=''&&$('#FilterBrand').val()!=undefined)
{isTrue=true;}
$('#filtre_caracteristiques_contenu select').each(function(){if($(this).val()!='')
{isTrue=true;}});$('#filtre_caracteristiques_contenu input').each(function(){if($(this).is(':checked'))
{isTrue=true;}});$('#filtres_offres_contenu input.old').each(function(){if($(this).is(':checked'))
{isTrue=true;}});return isTrue;}
function ProdListView(Cat,ViewType)
{$('#CatDisplayType').val(ViewType);ProdListUpdate(Cat,0,0,$('#productPage').val());}
function FilterBrand(Ev,Cat,BrandID)
{var checkbox_cochees=$('.ProdFilterBrOn').length>0;var Multi=Ev.ctrlKey||checkbox_cochees;var SrcElement=(window.event?Ev.srcElement:Ev.target);var BrandFilter=document.getElementById('FilterBrand');var BrandList=BrandFilter.value.split(',');BrandState=false;BrandIndex=0;if(BrandList.length)
{for(i=0;i<BrandList.length;i++)
{if(BrandList[i]==BrandID)
{BrandState=true;BrandIndex=i;break;}}}
if(Multi)
{SelBrand=document.getElementById('Brand'+BrandID);if(BrandState)
{BrandList.splice(BrandIndex,1);SelBrand.className='ProdFilterBrOff';if(SelBrand.parentNode.className.match(/^Brand/i))
{SelBrandLabel=document.getElementById('BrandLabel'+BrandID);SelBrandLabel.className='ProdFilterBrLabelOff';}}
else
{BrandList.push(BrandID);SelBrand.className='ProdFilterBrOn';if(SrcElement.parentNode.className.match(/^Brand/i))
{SelBrandLabel=document.getElementById('BrandLabel'+BrandID);SelBrandLabel.className='ProdFilterBrLabelOn';}}}
else
{if(BrandList.length)
{for(i=0;i<BrandList.length;i++)
{if(!BrandList[i])
continue;SelBrand=document.getElementById('Brand'+BrandList[i]);if(SelBrand==null)
continue;SelBrand.className='ProdFilterBrOff';if(SelBrand.parentNode.className.match(/^Brand/i))
{SelBrandLabel=document.getElementById('BrandLabel'+BrandList[i]);SelBrandLabel.className='ProdFilterBrLabelOff';}}}
SelBrand=document.getElementById('Brand'+BrandID);if(BrandState)
{SelBrand.className='ProdFilterBrOff';BrandList=[];if(SrcElement.parentNode.className.match(/^Brand/i))
{SelBrandLabel=document.getElementById('BrandLabel'+BrandID);SelBrandLabel.className='ProdFilterBrLabelOff';}}
else
{SelBrand.className='ProdFilterBrOn';BrandList=[BrandID];if(SrcElement.parentNode.className.match(/^Brand/i))
{SelBrandLabel=document.getElementById('BrandLabel'+BrandID);SelBrandLabel.className='ProdFilterBrLabelOn';}}}
if(BrandState)
{$(SelBrand).prev().prop('checked',false);}
else
{$(SelBrand).prev().prop('checked',true);}
$('.liste_marques input[type=checkbox]').each(function(index,element)
{if(!$(element).next().hasClass('ProdFilterBrOn'))
{$(element).prop('checked',false);}});BrandFilter.value=BrandList.toString();ProdListUpdate(Cat,undefined,undefined,1);}
function filtreProduitsMarques()
{$('.filtre-marque').click(function(event)
{event.preventDefault();var code_marque=$(this).data('codemarque');var code_cat=$(this).data('codecat');FilterBrand(event,code_cat,code_marque);});}
function reinitialiserMarques(categorie)
{$('.liste_marques input[type=checkbox]').prop('checked',false);$('#FilterBrand').val('');$('div[class^="ProdFilterBr"]').removeClass('ProdFilterBrOn').addClass('ProdFilterBrOff');ProdListUpdate(categorie,undefined,undefined,1);}
function SfSwitch(Obj,CodeSf,Field,Val,Cat)
{var SfHidden=document.getElementById('FilterSF');if(Obj.className=='SfHL')
{Obj.className='Sf';SfHidden.value=null;}
else
{SfPh=document.getElementById('SfPH');SfList=SfPh.childNodes;for(i=0;i<SfList.length;i++)
{if(SfList[i].nodeType==1)
SfList[i].className='Sf';}
Obj.className='SfHL';SfHidden.value=CodeSf+';'+Field+';'+Val;}
ProdListUpdate(Cat,undefined,undefined,1);}
function ProdComp(ProdList,SortField,SortOrder)
{var HttpReq=GetHRObject();if(!HttpReq)
return false;Url='/request/Compare.html?sf='+SortField+'&'+'so='+SortOrder;if(!ProdList)
{ProdList=document.getElementsByName('comp');if(ProdList.length<2)
return false;ProdCount=0;for(i=0;i<ProdList.length;i++)
{if(ProdList[i].checked)
{ProdCount++;Url=Url+'&'+'p[]='+ProdList[i].value;}}
if(ProdCount<=1)
{alert('Vous devez sélectionner au moins 2 produits');return;}}
else
{for(i=0;i<ProdList.length;i++)
{if(ProdList[i])
{ProdCount++;Url=Url+'&'+'p[]='+ProdList[i];}}}
Exists=document.getElementById('CompArea');if(Exists)
Exists.parentNode.removeChild(Exists);if(!ProdCount)
return;var CompArea=document.createElement("div");CompArea.id='CompArea';var alertPanel=document.getElementById('AlertPanel');var alertPanelContent=document.getElementById('AlertPanelMessageContent');CompArea.innerHTML='<div style="margin:auto; width:100%; padding:20% 0; text-align:center;"><img src="'+SERVEUR_STATIC+'/images/gui/main/Reload.gif" width="16" height="16" align="top" alt="" /><span style="font-weight:bold;font-size:14px;padding:5px 5px 15px 5px;color:#515151;text-align:left;height:34px;">En cours de chargement ...</span></div>';alertPanelContent.appendChild(CompArea);alertPanel.style.visibility='visible';HttpReq.onreadystatechange=function()
{if(HttpReq.readyState==4&&HttpReq.status==200)
{if(HttpReq.responseText)
{Space=document.getElementById('CompArea');Space.innerHTML=HttpReq.responseText;}}}
HttpReq.open('GET',Url,true);HttpReq.send(null);}
function ProdCompClose()
{if(navigator.appVersion.match(/MSIE/))
{SelList=document.getElementsByTagName('select');for(i=0;i<SelList.length;i++)
SelList[i].style.display='';SelList=document.getElementsByTagName('object');for(i=0;i<SelList.length;i++)
SelList[i].style.display='';}
CompAreaElem=document.getElementById('CompArea');if(CompAreaElem)
CompAreaElem.parentNode.removeChild(CompAreaElem);}
function ProdCompHide(Cell)
{Table=document.getElementById('ProdCmpTable');ElemList=getElementsByClassName(Cell,'',Table);for(i=0;i<ElemList.length;i++)
ElemList[i].parentNode.removeChild(ElemList[i]);TrList=Table.getElementsByTagName('tr');document.getElementById('ProdCounter').innerHTML=TrList[1].cells.length-1;if(TrList[1].cells.length==2)
document.getElementById('ProdCounterLabel').innerHTML='produit';if(TrList[1].cells.length==1)
ProdCompClose();}
function ProdCompSort(Field,Order)
{Table=document.getElementById('ProdCmpTable');if(!Table)
return;TrList=Table.getElementsByTagName('tr');if(TrList.length==0)
return;ProdList=Array();for(i=0;i<TrList[1].cells.length;i++)
{Dt=TrList[1].cells[i].className.match(/CmpCell(.*)/);if(!Dt)
continue;ProdList.push(Dt[1]);}
if(ProdList.length==0)
return;ProdComp(ProdList,Field,Order);}
function cleanInput(object)
{object.value="";}