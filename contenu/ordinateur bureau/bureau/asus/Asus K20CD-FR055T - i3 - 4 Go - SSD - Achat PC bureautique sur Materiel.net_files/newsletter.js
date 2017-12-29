
$(document).ready(function()
{$(document).on('submit','.NLTForm',function(event)
{event.preventDefault();var self=event.target;var messageBox=$(self).find('.ntl-message');var formField=$(self).find('.formField');$.ajax({type:'POST',url:'/request/subscribeNewsletter.php',data:$(self).serializeArray(),success:function(data)
{messageBox.html(data.message);if(data.success===true)
{$(messageBox).addClass('confirm');$(formField).hide();}},error:function(data)
{$(messageBox).html('<strong class="error">D&eacute;sol&eacute;, nous n\'avons pas p&ucirc; confirmer votre inscription.</strong>');}});event.preventDefault();return false;});});