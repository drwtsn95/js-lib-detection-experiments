function addToCompare(o){var a,e,r=parseInt($(".bt_compare").next(".compare_product_count").val());a=-1===$.inArray(parseInt(o),comparedProductsIds)?"add":"remove",$.ajax({url:baseUri+"?controller=products-comparison&ajax=1&action="+a+"&id_product="+o,async:!0,cache:!1,success:function(t){"add"===a&&comparedProductsIds.length<comparator_max_item?(comparedProductsIds.push(parseInt(o)),compareButtonsStatusRefresh(),e=r+1,$(".bt_compare").next(".compare_product_count").val(e),totalValue(e)):"remove"===a?(comparedProductsIds.splice($.inArray(parseInt(o),comparedProductsIds),1),compareButtonsStatusRefresh(),e=r-1,$(".bt_compare").next(".compare_product_count").val(e),totalValue(e)):$.prototype.fancybox?$.fancybox.open([{type:"inline",autoScale:!0,minHeight:30,content:'<p class="fancybox-error">'+max_item+"</p>"}],{padding:0}):alert(max_item),totalCompareButtons()},error:function(){}})}function reloadProductComparison(){$(document).on("click","a.cmp_remove",function(t){t.preventDefault();var o=parseInt($(this).data("id-product"));$.ajax({url:baseUri+"?controller=products-comparison&ajax=1&action=remove&id_product="+o,async:!1,cache:!1}),$("td.product-"+o).fadeOut(600);var a=get("compare_product_list"),e=a,r=[];for(var c in a=decodeURIComponent(a).split("|"))parseInt(a[c])!=o&&r.push(a[c]);r.length&&(window.location.search=window.location.search.replace(e,r.join(encodeURIComponent("|"))))})}function compareButtonsStatusRefresh(){$(".add_to_compare").each(function(){-1!==$.inArray(parseInt($(this).data("id-product")),comparedProductsIds)?$(this).addClass("checked"):$(this).removeClass("checked")})}function totalCompareButtons(){var t=parseInt($(".bt_compare .total-compare-val").html());"number"!=typeof t||0===t?$(".bt_compare").attr("disabled",!0):$(".bt_compare").attr("disabled",!1)}function totalValue(t){$(".bt_compare").find(".total-compare-val").html(t)}function get(t){var o=new RegExp("[\\?&]"+t+"=([^&#]*)").exec(window.location.search);return null==o?"":o[1]}$(document).ready(function(){$(document).on("click",".add_to_compare",function(t){t.preventDefault(),void 0!==addToCompare&&addToCompare(parseInt($(this).data("id-product")))}),reloadProductComparison(),compareButtonsStatusRefresh(),totalCompareButtons()});