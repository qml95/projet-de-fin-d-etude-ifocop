
var Events={send:function(category,action,label)
{Events.ga.send(category,action,label,true);},ga:{send:function(category,action,label,noninteraction)
{try
{ga('send','event',category,action,label,{'nonInteraction':noninteraction});}
catch(err)
{}}}};