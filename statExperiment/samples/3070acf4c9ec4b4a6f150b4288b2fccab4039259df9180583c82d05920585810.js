'use strict';

var wooscpSearchTimer = 0;

jQuery(document).ready(function($) {
  wooscpLoadColor();
  wooscpChangeCount('first');
  wooscpCheckButtons();

  if (wooscpVars.open_bar == 'yes') {
    wooscpLoadCompareBar('first');
  }

  // settings
  $('body').on('click touch', '.wooscp-bar-settings', function() {
    $('.wooscp-settings').toggleClass('open');
  });

  // search
  $('body').on('click touch', '.wooscp-bar-search', function() {
    $('.wooscp-search').toggleClass('open');
  });

  $('body').on('keyup', '#wooscp_search_input', function() {
    if ($('#wooscp_search_input').val() != '') {
      if (wooscpSearchTimer != null) {
        clearTimeout(wooscpSearchTimer);
      }
      wooscpSearchTimer = setTimeout(wooscpAjaxSearch, 300);
      return false;
    }
  });

  $('body').on('click touch', '.wooscp-item-add', function() {
    var product_id = $(this).attr('data-id');
    $('.wooscp-search').toggleClass('open');
    wooscpAddProduct(product_id);
    wooscpLoadCompareBar();
    wooscpLoadCompareTable();
    wooscpOpenCompareTable();
  });

  $('body').on('click touch', '.wooscp-popup-close', function() {
    var _this_popup = $(this).closest('.wooscp-popup');
    _this_popup.toggleClass('open');
  });

  // compare variation
  $(document).on('found_variation', function(e, t) {
    var variable_id = $(e['target']).attr('data-product_id');
    $('.wooscp-btn-' + variable_id).
        removeClass('wooscp-btn-added').
        html(wooscpVars.button_text).
        attr('data-id', t.variation_id);
  });

  $(document).on('reset_data', function(e) {
    var variable_id = $(e['target']).attr('data-product_id');
    $('.wooscp-btn-' + variable_id).removeClass('wooscp-btn-added').
        html(wooscpVars.button_text).attr('data-id', variable_id);
  });

  // remove all
  $('body').on('click touch', '.wooscp-bar-remove', function() {
    var r = confirm(wooscpVars.remove_all);
    if (r == true) {
      wooscpRemoveProduct('all');
      wooscpLoadCompareBar();
      wooscpLoadCompareTable();
    }
  });

  // rearrange
  $(document).on('wooscpDragEndEvent', function() {
    wooscpSaveProducts();
  });

  // add
  $('body').on('click touch', '.wooscp-btn', function(e) {
    var product_id = $(this).attr('data-id');
    if ($(this).hasClass('wooscp-btn-added')) {
      if (wooscpVars.click_again == 'yes') {
        // remove
        wooscpRemoveProduct(product_id);
        wooscpLoadCompareBar();
        wooscpLoadCompareTable();
      } else {
        if ($('.wooscp-bar-items').hasClass('wooscp-bar-items-loaded')) {
          wooscpOpenCompareBar();
        } else {
          wooscpLoadCompareBar();
        }
        if (!$('.wooscp-table-items').hasClass('wooscp-table-items-loaded')) {
          wooscpLoadCompareTable();
        }
      }
    } else {
      $(this).addClass('wooscp-btn-adding');
      wooscpAddProduct(product_id);
      wooscpLoadCompareBar();
      wooscpLoadCompareTable();
    }
    if (wooscpVars.open_table == 'yes') {
      wooscpToggleCompareTable();
    }
    e.preventDefault();
  });

  // remove
  $('body').
      on('click touch', '#wooscp-area .wooscp-bar-item-remove', function(e) {
        var product_id = $(this).attr('data-id');
        $(this).parent().addClass('removing');
        wooscpRemoveProduct(product_id);
        wooscpLoadCompareBar();
        wooscpLoadCompareTable();
        wooscpCheckButtons();
        e.preventDefault();
      });

  // compare bar button
  $('body').on('click touch', '.wooscp-bar-btn', function() {
    wooscpToggleCompareTable();
  });

  // close compare
  $('body').on('click touch', function(e) {
    if ((
        wooscpVars.click_outside == 'yes'
    ) && (
        $(e.target).closest('.wpc_compare_count').length == 0
    ) && (
        $(e.target).closest('.wooscp-popup').length == 0
    ) && (
        $(e.target).closest('.wooscp-btn').length == 0
    ) && (
        $(e.target).closest('.wooscp-table').length == 0
    ) && (
        $(e.target).closest('.wooscp-bar').length == 0
    ) && (
        $(e.target).closest('.wooscp-menu-item a').length == 0
    ) && (
        (
            wooscpVars.open_button == ''
        ) || (
            $(e.target).closest(wooscpVars.open_button).length == 0
        )
    )) {
      wooscpCloseCompare();
    }
  });

  // close
  $('body').on('click touch', '#wooscp-table-close', function() {
    wooscpCloseCompareTable();
  });

  // open button
  if (wooscpVars.open_button != '') {
    $('body').on('click touch', wooscpVars.open_button, function() {
      if ((wooscpVars.open_button_action == 'open_page') &&
          (wooscpVars.page_url != '')) {
        // open compare page
        window.location.href = wooscpVars.page_url;
      } else {
        // open compare popup
        wooscpToggleCompare();
      }
    });
  }

  // change settings
  $(document).on('change', '.wooscp-settings-field', function() {
    wooscpSaveSettings();
  });

  $('.wooscp-settings-field-li').arrangeable({
    dragSelector: '.label',
    dragEndEvent: 'wooscpDragSettings',
  });

  $(document).on('wooscpDragSettings', function() {
    wooscpSaveSettings();
  });

  // menu item
  $('body').on('click touch', '.wooscp-menu-item a', function(e) {
    if ((wooscpVars.menu_action == 'open_page') &&
        (wooscpVars.page_url != '')) {
      // open compare page
      window.location.href = wooscpVars.page_url;
    } else {
      // open compare popup
      if ($('.wooscp-bar-items').hasClass('wooscp-bar-items-loaded')) {
        wooscpOpenCompareBar();
      } else {
        wooscpLoadCompareBar();
      }
      if (!$('.wooscp-table-items').hasClass('wooscp-table-items-loaded')) {
        wooscpLoadCompareTable();
      }
      wooscpOpenCompareTable();
    }
    e.preventDefault();
  });
});

function wooscpAjaxSearch() {
  jQuery('.wooscp-search-result').html('').addClass('wooscp-loading');
  // ajax search product
  wooscpSearchTimer = null;
  var data = {
    action: 'wooscp_search',
    keyword: jQuery('#wooscp_search_input').val(),
    nonce: wooscpVars.nonce,
  };
  jQuery.post(wooscpVars.ajaxurl, data, function(response) {
    jQuery('.wooscp-search-result').
        html(response).
        removeClass('wooscp-loading');
  });
}

function wooscpSetCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (
      exdays * 24 * 60 * 60 * 1000
  ));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
}

function wooscpGetCookie(cname) {
  var name = cname + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return '';
}

function wooscpGetProducts() {
  var wooscpCookieProducts = 'wooscp_products';
  if (wooscpVars.user_id != '') {
    wooscpCookieProducts = 'wooscp_products_' + wooscpVars.user_id;
  }
  if (wooscpGetCookie(wooscpCookieProducts) != '') {
    return wooscpGetCookie(wooscpCookieProducts);
  } else {
    return '';
  }
}

function wooscpSaveProducts() {
  var wooscpCookieProducts = 'wooscp_products';
  if (wooscpVars.user_id != '') {
    wooscpCookieProducts = 'wooscp_products_' + wooscpVars.user_id;
  }
  var wooscpProducts = new Array();
  jQuery('.wooscp-bar-item').each(function() {
    var eID = jQuery(this).attr('data-id');
    if (eID != '') {
      wooscpProducts.push(eID);
    }
  });
  var wooscpProductsStr = wooscpProducts.join();
  wooscpSetCookie(wooscpCookieProducts, wooscpProductsStr, 7);
  wooscpLoadCompareTable();
}

function wooscpSaveSettings() {
  var wooscpFields = Array();
  var wooscpCookieFields = 'wooscp_fields';
  if (wooscpVars.user_id != '') {
    wooscpCookieFields = 'wooscp_fields_' + wooscpVars.user_id;
  }

  jQuery('.wooscp-settings-field').each(function() {
    var _val = jQuery(this).val();
    if (jQuery(this).prop('checked')) {
      wooscpFields.push(_val);
      jQuery('.wooscp_table .tr-' + _val).removeClass('tr-hide');
    } else {
      jQuery('.wooscp_table .tr-' + _val).addClass('tr-hide');
    }
  });

  wooscpSetCookie(wooscpCookieFields, wooscpFields.join(','), 7);
  wooscpLoadCompareTable();
}

function wooscpAddProduct(product_id) {
  var wooscpLimit = false;
  var wooscpLimitNotice = wooscpVars.limit_notice;
  var wooscpCookieProducts = 'wooscp_products';
  var wooscpCount = 0;
  if (wooscpVars.user_id != '') {
    wooscpCookieProducts = 'wooscp_products_' + wooscpVars.user_id;
  }
  if (wooscpGetCookie(wooscpCookieProducts) != '') {
    var wooscpProducts = wooscpGetCookie(wooscpCookieProducts).split(',');

    if (wooscpProducts.length < wooscpVars.limit) {
      wooscpProducts = jQuery.grep(wooscpProducts, function(value) {
        return value != product_id;
      });
      wooscpProducts.unshift(product_id);
      var wooscpProductsStr = wooscpProducts.join();
      wooscpSetCookie(wooscpCookieProducts, wooscpProductsStr, 7);
    } else {
      wooscpLimit = true;
      wooscpLimitNotice = wooscpLimitNotice.replace('{limit}',
          wooscpVars.limit);
    }

    wooscpCount = wooscpProducts.length;
  } else {
    wooscpSetCookie(wooscpCookieProducts, product_id, 7);
    wooscpCount = 1;
  }

  wooscpChangeCount(wooscpCount);
  jQuery(document.body).trigger('wooscp_added', [wooscpCount]);

  if (wooscpLimit) {
    jQuery('.wooscp-btn[data-id="' + product_id + '"]').
        removeClass('wooscp-btn-adding');
    alert(wooscpLimitNotice);
  } else {
    jQuery('.wooscp-btn[data-id="' + product_id + '"]').
        removeClass('wooscp-btn-adding').
        addClass('wooscp-btn-added').
        html(wooscpVars.button_text_added);
    jQuery(document.body).
        trigger('wooscp_change_button_text',
            [product_id, wooscpVars.button_text_added]);
  }
}

function wooscpRemoveProduct(product_id) {
  var wooscpCookieProducts = 'wooscp_products';
  var wooscpCount = 0;

  if (wooscpVars.user_id != '') {
    wooscpCookieProducts = 'wooscp_products_' + wooscpVars.user_id;
  }

  if (product_id != 'all') {
    // remove one
    if (wooscpGetCookie(wooscpCookieProducts) != '') {
      var wooscpProducts = wooscpGetCookie(wooscpCookieProducts).split(',');
      wooscpProducts = jQuery.grep(wooscpProducts, function(value) {
        return value != product_id;
      });
      var wooscpProductsStr = wooscpProducts.join();
      wooscpSetCookie(wooscpCookieProducts, wooscpProductsStr, 7);
      wooscpCount = wooscpProducts.length;
    }
    jQuery('.wooscp-btn[data-id="' + product_id + '"]').
        removeClass('wooscp-btn-added').
        html(wooscpVars.button_text);
    jQuery(document.body).
        trigger('wooscp_change_button_text',
            [product_id, wooscpVars.button_text]);
  } else {
    // remove all
    if (wooscpGetCookie(wooscpCookieProducts) != '') {
      wooscpSetCookie(wooscpCookieProducts, '', 7);
      wooscpCount = 0;
    }
    jQuery('.wooscp-btn').
        removeClass('wooscp-btn-added').
        html(wooscpVars.button_text);
    jQuery(document.body).
        trigger('wooscp_change_button_text',
            ['all', wooscpVars.button_text]);
  }
  wooscpChangeCount(wooscpCount);
  jQuery(document.body).trigger('wooscp_removed', [wooscpCount]);
}

function wooscpCheckButtons() {
  var wooscpCookieProducts = 'wooscp_products';

  if (wooscpVars.user_id != '') {
    wooscpCookieProducts = 'wooscp_products_' + wooscpVars.user_id;
  }

  if (wooscpGetCookie(wooscpCookieProducts) != '') {
    var wooscpProducts = wooscpGetCookie(wooscpCookieProducts).split(',');
    jQuery('.wooscp-btn').removeClass('wooscp-btn-added').
        html(wooscpVars.button_text);
    jQuery(document.body).
        trigger('wooscp_change_button_text',
            ['all', wooscpVars.button_text]);
    wooscpProducts.forEach(function(entry) {
      jQuery('.wooscp-btn-' + entry).addClass('wooscp-btn-added').
          html(wooscpVars.button_text_added);
      jQuery(document.body).
          trigger('wooscp_change_button_text',
              [entry, wooscpVars.button_text_added]);
    });
  }
}

function wooscpLoadCompareBar(open) {
  var data = {
    action: 'wooscp_load_compare_bar',
    products: wooscpGetProducts(),
    nonce: wooscpVars.nonce,
  };
  jQuery.post(wooscpVars.ajaxurl, data, function(response) {
    if ((
        wooscpVars.hide_empty == 'yes'
    ) && (
        (
            response == ''
        ) || (
            response == 0
        )
    )) {
      jQuery('.wooscp-bar-items').removeClass('wooscp-bar-items-loaded');
      wooscpCloseCompareBar();
      wooscpCloseCompareTable();
    } else {
      if ((
          typeof open == 'undefined'
      ) || (
          (
              open == 'first'
          ) && (
              wooscpVars.open_bar == 'yes'
          )
      )) {
        jQuery('.wooscp-bar-items').
            html(response).
            addClass('wooscp-bar-items-loaded');
        wooscpOpenCompareBar();
      }
    }
  });
}

function wooscpOpenCompareBar() {
  jQuery('.wooscp-bar').addClass('wooscp-bar-open');
  jQuery('.wooscp-bar-item').arrangeable({
    dragSelector: 'img',
    dragEndEvent: 'wooscpDragEndEvent',
  });
  jQuery(document.body).trigger('wooscp_bar_open');
}

function wooscpCloseCompareBar() {
  jQuery('.wooscp-bar').removeClass('wooscp-bar-open');
  jQuery(document.body).trigger('wooscp_bar_close');
}

function wooscpLoadCompareTable() {
  jQuery('.wooscp-table-inner').addClass('wooscp-loading');
  var data = {
    action: 'wooscp_load_compare_table',
    products: wooscpGetProducts(),
    nonce: wooscpVars.nonce,
  };
  jQuery.post(wooscpVars.ajaxurl, data, function(response) {
    jQuery('.wooscp-table-items').
        html(response).
        addClass('wooscp-table-items-loaded');
    if (jQuery(window).width() >= 768) {
      if ((wooscpVars.freeze_column == 'yes') &&
          (wooscpVars.freeze_row == 'yes')) {
        // freeze row and column
        jQuery('#wooscp_table').tableHeadFixer({'head': true, left: 1});
      } else if (wooscpVars.freeze_column == 'yes') {
        // freeze column
        jQuery('#wooscp_table').tableHeadFixer({'head': false, left: 1});
      } else if (wooscpVars.freeze_row == 'yes') {
        // freeze row
        jQuery('#wooscp_table').tableHeadFixer({'head': true});
      }
    } else {
      if (wooscpVars.freeze_row == 'yes') {
        // freeze row
        jQuery('#wooscp_table').tableHeadFixer({'head': true});
      }
    }
    jQuery('.wooscp-table-items').perfectScrollbar({theme: 'wpc'});
    jQuery('.wooscp-table-inner').removeClass('wooscp-loading');
    wooscpHideEmptyRow();
  });
}

function wooscpOpenCompareTable() {
  jQuery('.wooscp-table').addClass('wooscp-table-open');
  jQuery('.wooscp-bar-btn').addClass('wooscp-bar-btn-open');
  if (!jQuery.trim(jQuery('.wooscp-table-items').html()).length) {
    wooscpLoadCompareTable();
  }
  jQuery(document.body).trigger('wooscp_table_open');
}

function wooscpCloseCompareTable() {
  jQuery('#wooscp-area').removeClass('wooscp-area-open');
  jQuery('.wooscp-table').removeClass('wooscp-table-open');
  jQuery('.wooscp-bar-btn').removeClass('wooscp-bar-btn-open');
  jQuery(document.body).trigger('wooscp_table_close');
}

function wooscpToggleCompareTable() {
  if (jQuery('.wooscp-table').hasClass('wooscp-table-open')) {
    wooscpCloseCompareTable();
  } else {
    wooscpOpenCompareTable();
  }
}

function wooscpOpenCompare() {
  jQuery('#wooscp-area').addClass('wooscp-area-open');
  wooscpLoadCompareBar();
  wooscpLoadCompareTable();
  wooscpOpenCompareBar();
  wooscpOpenCompareTable();
  jQuery(document.body).trigger('wooscp_open');
}

function wooscpCloseCompare() {
  jQuery('#wooscp-area').removeClass('wooscp-area-open');
  wooscpCloseCompareBar();
  wooscpCloseCompareTable();
  jQuery(document.body).trigger('wooscp_close');
}

function wooscpToggleCompare() {
  if (jQuery('#wooscp-area').hasClass('wooscp-area-open')) {
    wooscpCloseCompare();
  } else {
    wooscpOpenCompare();
  }
  jQuery(document.body).trigger('wooscp_toggle');
}

function wooscpLoadColor() {
  var bg_color = jQuery('#wooscp-area').attr('data-bg-color');
  var btn_color = jQuery('#wooscp-area').attr('data-btn-color');
  jQuery('.wooscp-table').css('background-color', bg_color);
  jQuery('.wooscp-bar').css('background-color', bg_color);
  jQuery('.wooscp-bar-btn').css('background-color', btn_color);
}

function wooscpChangeCount(count) {
  if (count == 'first') {
    var products = wooscpGetProducts();
    if (products != '') {
      var products_arr = products.split(',');
      count = products_arr.length;
    } else {
      count = 0;
    }
  }
  jQuery('.wooscp-menu-item').each(function() {
    if (jQuery(this).hasClass('menu-item-type-wooscp')) {
      jQuery(this).find('.wooscp-menu-item-inner').attr('data-count', count);
    } else {
      jQuery(this).
          addClass('menu-item-type-wooscp').
          find('a').
          wrapInner(
              '<span class="wooscp-menu-item-inner" data-count="' + count +
              '"></span>');
    }
  });
  jQuery('.wooscp-bar').attr('data-count', count);
  jQuery(document.body).trigger('wooscp_change_count', [count]);
}

function wooscpHideEmptyRow() {
  jQuery('#wooscp_table > tbody > tr').each(function() {
    var _td = 0;
    var _td_empty = 0;
    jQuery(this).children('td').each(function() {
      if ((
          _td > 0
      ) && (
          jQuery(this).html().length > 0
      )) {
        _td_empty = 1;
      }
      _td++;
    });
    if (_td_empty == 0) {
      jQuery(this).hide();
    }
  });
}