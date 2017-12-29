
var InfoProduit={numkeys:[],infoProduitHeader:null,url:null,context:null,setNumkeys:function(numkeys)
{this.numkeys=numkeys;},setInfoProduitHeader:function(infoProduitHeader)
{this.infoProduitHeader=infoProduitHeader;},setUrl:function(url)
{this.url=url;},setContext:function(context)
{this.context=context;},call:function()
{switch(this.context)
{case'liste':case'search':case'assistant':default:this.refreshListeProduits('table.ProdList tbody tr[data-numkey]');break;case'fiche':this.refreshListeProduits('div[data-numkey]');break;}},findNumkeysByElementSelector:function(numkeyElementSelector)
{var numkeys=new Array();$(numkeyElementSelector).each(function(){numkeys.push(String($(this).data('numkey')));});return numkeys;},refreshListeProduits:function(numkeyElementSelector)
{var numkeys=this.findNumkeysByElementSelector(numkeyElementSelector);this.setNumkeys(JSON.stringify(numkeys));this.fetchInfosProduits(function(infosProduits){InfoProduit.displayListe(infosProduits);});},refreshFicheProduit:function(numkey)
{numkey=numkey.toString()
var numkeys=this.findNumkeysByElementSelector('div[data-numkey]');numkeys.push(numkey);this.setNumkeys(JSON.stringify(numkeys));this.fetchInfosProduits(function(infosProduits){if(infosProduits.hasOwnProperty(numkey))
{InfoProduit.displayDispoFiche(infosProduits[numkey]);InfoProduit.displayPriceFiche(infosProduits[numkey]);}
InfoProduit.displayListe(infosProduits);});this.displayAgenciesStock();if($('#financezAchat').length>0||$('#ProdInfoSofinco').length>0)
{this.refreshFicheProduitPaiement(numkey);}},refreshFicheProduitPaiement:function(numkey)
{if(typeof this.url=='undefined')
{return;}
$.ajax({url:InfoProduit.url+'produits/'+numkey+'/paiement',dataType:"json",type:'GET',headers:InfoProduit.getInfoProduitHeaders()}).success(function(response){if(response.hasOwnProperty(numkey))
{InfoProduit.displayFichePaiement(response[numkey])}});},getInfoProduitHeaders:function()
{var infoProduitHeaders={};infoProduitHeaders[this.infoProduitHeader]='1';return infoProduitHeaders;},fetchInfosProduits:function(callback)
{if(typeof this.url=='undefined')
{return;}
if(JSON.parse(InfoProduit.numkeys).length===0)
{return;}
$.ajax({url:InfoProduit.url+'produits/',data:InfoProduit.numkeys,dataType:"json",type:'POST',headers:InfoProduit.getInfoProduitHeaders()}).success(callback);},displayListe:function(infosProduits)
{jQuery.each(infosProduits,function(numkey,data)
{if(data===null)
{return;}
InfoProduit.displayDispoListe(numkey,data);InfoProduit.displayPriceListe(numkey,data);InfoProduit.displayDispoalertListe(numkey,data);});},displayDispoListe:function(numkey,val)
{if(!val.hasOwnProperty('dispo')||!val.dispo.hasOwnProperty('conf'))
{return;}
var labelProd='<p style="color:'+val.dispo.conf.couleur+'" title="'+val.dispo.conf.title+'">'+val.dispo.conf.label.toUpperCase()+'</p>';var infoDispoAlert='<div class="infoDispoAlert" ><div class="fermeture-popup">X</div> <p style="color:'+val.dispo.conf.couleur+'">'+val.dispo.conf.alert.title+'</p><p>'+val.dispo.conf.alert.message+'</p></div>';var prodSimiDisponibilite=$('*[data-numkey="'+numkey+'"]').find('.prodSimi .Disponibilite .label');if(prodSimiDisponibilite.length>0)
{prodSimiDisponibilite.html(labelProd);return;}
$('*[data-numkey="'+numkey+'"]').find('.Disponibilite .label').html(labelProd+infoDispoAlert);},displayDispoalertListe:function(numkey,val)
{$('#section .ProdList .Disponibilite .label').click(function(){var alert=$(this).find('.infoDispoAlert');$('#infoDispoAlert').remove();var conteneurPopup=document.createElement("div");conteneurPopup.id='infoDispoAlert';conteneurPopup.innerHTML=alert.html();document.body.appendChild(conteneurPopup);$('#infoDispoAlert').dialog({width:480,heigh:480,modal:true,dialogClass:'dialog-simple',resizable:false});$('.fermeture-popup').click(function(){$('.ui-dialog-content').dialog('close');});});},displayDispoFiche:function(infosProduit)
{if(!infosProduit.hasOwnProperty('dispo'))
{return;}
var dispo=infosProduit.dispo;var dispoElement=$('#ProdInfoDispo');var produitDispoLabel=$('<span></span>').html(dispo.conf.label.toUpperCase()).css('color',dispo.conf.couleur).prop('title',dispo.conf.title);dispoElement.html('');dispoElement.append(produitDispoLabel);if(dispo.dispo==false)
{dispoElement.append('<a href="" id="alertEmail"><i class="fa fa-envelope-o"></i> M\'avertir dès que disponible !</a>');}},displayPriceListe:function(numkey,val)
{if(!val.hasOwnProperty('prix')||!val.prix.hasOwnProperty('prixVente'))
{return;}
var line=$('*[data-numkey="'+numkey+'"]');$(line).find('.Price .prix').html(val.prix.prixVente+'&euro;').show();if(!val.prix.hasOwnProperty('prixReduit'))
{return;}
$(line).find('.Price .prix-barre').remove();$(line).find('.Price .remise').remove();$(line).addClass("item-percent");$(line).find('.Price').prepend('<div class="prix-barre">'+val.prix.prixReduit.prixReference+'&euro;</div>');if(this.context=='fiche')
{return;}
if(!this.isSoldes())
{$(line).find('.Price').prepend('<div class="remise"><span>- '+val.prix.prixReduit.remisePourcentage+'</span></div>');}},displayPriceFiche:function(infosProduit)
{if(!infosProduit.hasOwnProperty('prix')||!infosProduit.prix.hasOwnProperty('prixVente'))
{return;}
var prix=infosProduit.prix;var priceElement=$('#ProdInfoPrice');priceElement.html('');var span=$('<span>'+prix.prixVente+'&euro; TTC</span>');if(prix.hasOwnProperty('prixReduit'))
{priceElement.append('<div class="prixReference">'+prix.prixReduit.prixReference+'&euro; TTC</div>');span.addClass("mNet-cut-price");}
priceElement.append(span);},displayAgenciesStock:function()
{$('#agenciesStock').click(function(){$('#agenciesStockAlert').dialog({width:700,heigh:480,modal:true,dialogClass:'dialog-simple',resizable:false});$('.fermeture-popup').click(function(){$('.ui-dialog-content').dialog('close');});});},displayFichePaiement:function(infosProduit)
{if(!infosProduit.hasOwnProperty('paiement'))
{return;}
var paiement=infosProduit.paiement;if(paiement.hasOwnProperty('credit3x'))
{InfoProduit.displayFichePaiementCredit3x(paiement.credit3x);}
if(paiement.hasOwnProperty('creditSofinco'))
{InfoProduit.displayFichePaiementSofinco(paiement.creditSofinco);}},displayFichePaiementCredit3x:function(credit3x)
{if(credit3x===null||!credit3x.hasOwnProperty('montantEcheance'))
{return;}
$('#Button3X').html('<span>'+credit3x.montantEcheance+' &euro;</span>').removeClass('hidden');},displayFichePaiementSofinco:function(paiementSofinco)
{if(paiementSofinco===null||paiementSofinco.length===0)
{return;}
$('#Sofinco-Box .MentionSanitaire').html(paiementSofinco.mentionsSanitaires);$('#Sofinco-Valabilite').html('<strong>'+paiementSofinco.titreOffre+'</strong>');$('#prod-sofinco1').html(paiementSofinco.montantAFinancer);$('#prod-sofinco2').html(paiementSofinco.montantApport);$('#prod-sofinco3').html(paiementSofinco.nbreEcheances);$('#prod-sofinco4').html(paiementSofinco.montantEcheanceAvecAssurance);$('#prod-sofinco5').html(paiementSofinco.tauxAnnuelEffectifGlobal);$('#prod-sofinco6').html(paiementSofinco.montantTotalAvecAssurance);$('#prod-sofinco7').html(paiementSofinco.coutTotalAchat);$('#prod-sofinco8').html(paiementSofinco.descriptif);$('#prod-sofinco9').html(paiementSofinco.montantEcheanceSansAssurance);$('#prod-sofinco10').html(paiementSofinco.montantTotalSansAssurance);$('#prod-sofinco11').html(paiementSofinco.coutTotalSansAssurance);$('.sofinco-legal').html('<br /><em>'+paiementSofinco.mentionsLegales+'</em>');$('#ProdInfoSofinco #Button10X').toggleClass('offreSofincoSansFrais',paiementSofinco.isOffreEnCours).removeClass('hidden');},isSoldes:function()
{return this.context==='soldes';}};