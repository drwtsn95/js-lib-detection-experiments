(function ($) {

/**
 * Override Drupal's AJAX prototype beforeSend function so it can append the
 * throbber inside the pager links.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = v;
    }
  }

  var $element = $(this.element);

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $element.addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    if (!$element.closest('.file-widget,.form-item').length) {
      $element.before(this.progress.element);
    }
    else {
      $element.closest('.file-widget,.form-item').after(this.progress.element);
    }
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><i class="glyphicon glyphicon-refresh glyphicon-spin"></i></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }

    // If element is an input type, append after.
    if ($element.is('input')) {
      $element.after(this.progress.element);
    }
    else if ($element.is('select')) {
      var $inputGroup = $element.closest('.form-item').find('.input-group-addon, .input-group-btn');
      if (!$inputGroup.length) {
        $element.wrap('<div class="input-group">');
        $inputGroup = $('<span class="input-group-addon">');
        $element.after($inputGroup);
      }
      $inputGroup.append(this.progress.element);
    }
    // Otherwise append the throbber inside the element.
    else {
      $element.append(this.progress.element);
    }
  }
};

})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * @file
 *
 * Overrides for ctools modal.
 *
 */

(function ($) {
  /**
   * Override CTools modal show function so it can recognize the Bootstrap modal classes correctly
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice === 'string' && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    }
    else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: 'CToolsModalDialog',
      throbberTheme: 'CToolsModalThrobber',
      animation: 'show',
      animationSpeed: 'fast',
      modalSize: {
        type: 'scale',
        width: 0.8,
        height: 0.8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: 0.55,
        background: '#fff'
      },
      modalClass: 'default'
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings !== settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;
      var width = 0;
      var height = 0;

      //  Handle fixed navbars. Grab the body top offset in pixels.
      var topOffset = parseInt($('body').css("padding-top"), 10);

      if (Drupal.CTools.Modal.currentSettings.modalSize.type === 'scale') {
        width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        height = ($(window).height() - topOffset) * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Add padding for the offset.
      $('#modalContent').css('padding-top', topOffset + 'px');

      // Use the additionol pixels for creating the width and height.
      $('div.ctools-modal-dialog', context).css({
        'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px',
        'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
      });

      $('div.ctools-modal-dialog .modal-body', context).css({
        'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px',
        'max-height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
      });
    };

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type === 'scale') {
        $(window).bind('resize', resize);
      }
    }

    $('body').addClass('modal-open');

    resize();

    $('.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed, settings.modalClass);
    $('#modalContent .modal-body').html(Drupal.theme(settings.throbberTheme)).addClass('ctools-modal-loading');
  };

  /**
   * Remove modal class from body when closing modal.
   */
  $(document).on('CToolsDetachBehaviors', function() {
    $('body').removeClass('modal-open');
  });

  /**
   * Provide the HTML to create the modal dialog in the Bootstrap style.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = '';
    html += '<div id="ctools-modal">';
    html += '  <div class="ctools-modal-dialog modal-dialog">';
    html += '    <div class="modal-content">';
    html += '      <div class="modal-header">';
    html += '        <button type="button" class="close ctools-close-modal" aria-hidden="true">&times;</button>';
    html += '        <h4 id="modal-title" class="modal-title">&nbsp;</h4>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-body">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    return html;
  };

  /**
   * Provide the HTML to create a nice looking loading progress bar.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '<div class="loading-spinner" style="width: 200px; margin: -20px 0 0 -100px; position: absolute; top: 45%; left: 50%">';
    html += '  <div class="progress progress-striped active">';
    html += '    <div class="progress-bar" style="width: 100%;"></div>';
    html += '  </div>';
    html += '</div>';

    return html;
  };


})(jQuery);

;/*})'"*/
;/*})'"*/
/**
 * ezMark (Minified) - A Simple Checkbox and Radio button Styling plugin. This plugin allows you to use a custom Image for
 * Checkbox or Radio button. Its very simple, small and easy to use.
 *
 * Copyright (c) Abdullah Rubiyath <http://www.itsalif.info/>.
 * Released under MIT License
 *
 * @author Abdullah Rubiyath
 * @version 1.0
 * @date June 27, 2010
 */
(function($){$.fn.ezMark=function(options){options=options||{};var defaultOpt={checkboxCls:options.checkboxCls||'ez-checkbox',radioCls:options.radioCls||'ez-radio',checkedCls:options.checkedCls||'ez-checked',selectedCls:options.selectedCls||'ez-selected',hideCls:'ez-hide'};return this.each(function(){var $this=$(this);var wrapTag=$this.attr('type')=='checkbox'?'<div class="'+defaultOpt.checkboxCls+'">':'<div class="'+defaultOpt.radioCls+'">';if($this.attr('type')=='checkbox'){$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function(){if($(this).is(':checked')){$(this).parent().addClass(defaultOpt.checkedCls);}
else{$(this).parent().removeClass(defaultOpt.checkedCls);}});if($this.is(':checked')){$this.parent().addClass(defaultOpt.checkedCls);}}
else if($this.attr('type')=='radio'){$this.addClass(defaultOpt.hideCls).wrap(wrapTag).change(function(){$('input[name="'+$(this).attr('name')+'"]').each(function(){if($(this).is(':checked')){$(this).parent().addClass(defaultOpt.selectedCls);}else{$(this).parent().removeClass(defaultOpt.selectedCls);}});});if($this.is(':checked')){$this.parent().addClass(defaultOpt.selectedCls);}}});}})(jQuery);


var thermomix_tinymce_setup_callback = function(ed) {
    ed.onKeyUp.add(function(ed, e) {
        tinyMCE.triggerSave();
        jQuery('#' + ed.editorId).keyup();
    });
};

var uniformInputComponents = function() {
    jQuery('input.custom-checkbox, input.form-checkbox').ezMark();

    jQuery('input.custom-radio, input.form-radio').ezMark({
        radioCls: 'ez-checkbox checkbox-style'
    });
};

(function ($) {
    var bindThreadEvent = function() {
        var privatemsgList = $('.privatemsg-list');
        $('a.delete_thread, a.mark_read, a.mark_unread', privatemsgList).on('click', function(ev){
            ev.preventDefault();
            if ($.active) {
                return;
            }
            var threadid = $(this).data('threadid');
            $('input[type="checkbox"]', privatemsgList)
                .prop('checked', false)
                .change();
            $('input[name="list[' + threadid + ']"]', privatemsgList)
                .prop('checked', true)
                .change();

            if($(this).hasClass('delete_thread')){
                $('.delete-now').mousedown();
            }else if($(this).hasClass('mark_read')){
                $('#privatemsg-list-form .form-control.form-select')
                    .val('mark as read')
                    .change();
            }else if($(this).hasClass('mark_unread')){
                $('#privatemsg-list-form .form-control.form-select')
                    .val('mark as unread')
                    .change();
            }
        });
    };

    $(document).ajaxSuccess(function(evt, xhr, ajax, res) {
        // uniformInputComponents  ();
        bindThreadEvent();
    });

    Drupal.behaviors.faq = {
        isAttached: false,
        attach: function (context) {
            var _self = this;
            if(!_self.isAttached) {
                _self.isAttached = true;
                $('.faqheadline, .faqsubheadline, .forum_faq .forum_faqsubheadline').on('click', function (ev) {
                    _self.showHide($(this).data('childblock'), this);
                    ev.preventDefault();
                });
            }
        },
        showHide: function (childId, headlineElement) {
            $('#' + childId).toggle();
            $(headlineElement).toggleClass('active');
            var eventAction = $(headlineElement).hasClass('active') ? 'Open' : 'Close';
            eventAction += $(headlineElement).hasClass('faqsubheadline') ? ' 2nd Level' : ' 1st Level';
            if(typeof dataLayer !== 'undefined') {
                dataLayer.push({
                    'event': 'genericEvent',
                    'eventCategory': 'FAQ',
                    'eventAction': eventAction,
                    'eventLabel': $(headlineElement).text()
                });
            }
        }
    };
    
    $.fn.tmrc_callAllSubFunction = function (obj, ignore) {
        if (typeof obj !== 'object') {
            return;
        }
        if (typeof ignore === 'string') {
            ignore = [ignore];
        }
        for (var func in obj) {
            if (ignore.indexOf(func) >= 0) {
                continue;
            }
            if (typeof obj[func] === "function" && obj.hasOwnProperty(func)) {
                obj[func]();
            }
        }
    };
    function setSearchDropdownMultiSelect() {
        var searchCheckboxCounter = 0;
        function setupLabel(clicked){
            switch (searchCheckboxCounter) {
                case 0:
                    $('#searchDropdownLabel').text($('#selectAllRecipes').data('selectedText'));
                    break;
                case 1:
                    $('#searchDropdownLabel').text($('.dropdown-menu :checkbox:checked', searchBar).data('selectedText'));
                    break;
                default:
                    $('#searchDropdownLabel').text($('#selectAllRecipes').data('selectedTextCustom'));
            }
        }
        var searchBar = $('#searchBar');

        $('.dropdown-menu input, .dropdown-menu label', searchBar).click(function(e) {
            e.stopPropagation();
        });

        $('.dropdown-menu :checkbox', searchBar).click(function(e) {
            var clicked = this;
            //check if we click on 'all' button
            if($(clicked).prop('id') == 'selectAllRecipes'){
                //set all the other checkbox to false
                $('.dropdown-menu :checkbox', searchBar).each(function() {
                    if($(this).prop('id') != 'selectAllRecipes')
                        $(this).prop('checked', false).parent().removeClass('ez-checked');
                });
            } else {
                //check if we click on other checkbox, then set 'all' to false
                $('#selectAllRecipes', searchBar).prop('checked', false).parent().removeClass('ez-checked');
            }

            //counter for how many checkbox are checked
            searchCheckboxCounter = $('.dropdown-menu :checkbox:checked', searchBar).length;
            setupLabel(clicked);
        });
    };

    var hideToggleWysiwyg = function(){
        if($('.wysiwyg-toggle-wrapper').length) {
           $('.wysiwyg-toggle-wrapper').remove();
        }
    };

    var bind_gtm_events = function(){
        if(typeof dataLayer === 'undefined') {
            return;
        }
        jQuery('div.advanced-forum-topic-list-outer-view .pull-right .btn').on('click', function(ev){
            var targetUrl = jQuery(this).attr('href');
            setTimeout(function () { document.location = targetUrl }, 2000);
            dataLayer.push({
                'event': 'genericEvent',
                'eventCategory': 'Forum',
                'eventAction': 'Open thread',
                'eventLabel': jQuery('ol.breadcrumb a:last').text(),
                'eventCallback': function () {
                    document.location = targetUrl;
                }
            });
        });
        
        jQuery('form.node-forum-form button.form-submit').on('click', function(ev){
            var thisform = jQuery(this);
            setTimeout(function () { thisform.submit(); }, 2000);
            dataLayer.push({
                'event': 'genericEvent',
                'eventCategory': 'Forum',
                'eventAction': 'Publish thread',
                'eventLabel': jQuery('form.node-forum-form select#edit-taxonomy-forums-und :selected').text().replace(new RegExp('^-+'), '') + ' - ' + jQuery('form.node-forum-form input#edit-title').val(),
                'eventCallback': function () {
                    thisform.submit();
                }
            });
        });
        
        jQuery('form.comment-form button#edit-submit').on('click', function(ev){
            var thisform = jQuery(this);
            setTimeout(function () { thisform.submit(); }, 2000);
            dataLayer.push({
                'event': 'genericEvent',
                'eventCategory': 'Forum',
                'eventAction': 'Save Comment',
                'eventLabel': jQuery('ol.breadcrumb li:nth-last-child(2)').text() + ' - ' + jQuery('ol.breadcrumb a:last').text(),
                'eventCallback': function () {
                    thisform.submit();
                }
            });
        });
    }

    $(document).ready(function(){
        uniformInputComponents();
        bindThreadEvent();
        setSearchDropdownMultiSelect();
        hideToggleWysiwyg();
        bind_gtm_events();
        Drupal.behaviors.faq.attach();
    });
})(jQuery);

if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

function showNotice(msg){
    return Stoppage.createErrorMessage(msg);
}

function hideNotice(){
    jQuery('.tmrc-messages').hide();
}

;/*})'"*/
;/*})'"*/
