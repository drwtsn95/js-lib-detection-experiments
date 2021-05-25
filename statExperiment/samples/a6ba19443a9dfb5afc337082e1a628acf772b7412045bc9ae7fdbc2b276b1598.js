var runningTimer = new Array();
var rated = false;

function favItem(item_id, action)
{
    jQuery('#favMsg_'+item_id).html("<a class='ts_waitfavorite_btn'>Please wait...</a>");

    jQuery.ajax({ type: "POST", url: "http://www.bestofjoomla.com/index2.php", data: "option=com_bestoftemplate&task=ajaxfav&id=" + item_id + "&action=" + action + "&no_html=1", dateType: "html", success: function(str)
    {
        if (str != 'NA')
        {
            var result = str.split('|');
            jQuery('#favMsg_'+item_id).html(result[0]);
            jQuery('#favCount_'+item_id).html(result[1]);

            if (action == 1)
            {
                jQuery('#cxfavcorner_'+item_id).fadeIn("slow");
            }
            else
            {
                jQuery('#cxfavcorner_'+item_id).fadeOut("slow");
            }
        }
    }});

    return false;
}
