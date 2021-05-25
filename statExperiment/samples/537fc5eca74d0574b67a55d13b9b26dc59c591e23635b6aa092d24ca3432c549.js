/**
 * @file
 * Linkit dialog functions.
 */

(function ($) {

// Create the Linkit namespaces.
Drupal.linkit = Drupal.linkit || {};
Drupal.linkit.currentInstance = Drupal.linkit.currentInstance || {};
Drupal.linkit.dialogHelper = Drupal.linkit.dialogHelper || {};
Drupal.linkit.insertPlugins = Drupal.linkit.insertPlugins || {};

/**
 * Create the modal dialog.
 */
Drupal.linkit.createModal = function() {
  // Create the modal dialog element.
  Drupal.linkit.createModalElement()
  // Create jQuery UI Dialog.
  .dialog(Drupal.linkit.modalOptions())
  // Remove the title bar from the modal.
  .siblings(".ui-dialog-titlebar").hide();

  // Make the modal seem "fixed".
  $(window).bind("scroll resize", function() {
    $('#linkit-modal').dialog('option', 'position', ['center', 50]);
  });

  // Get modal content.
  Drupal.linkit.getDashboard();
};

/**
 * Create and append the modal element.
 */
Drupal.linkit.createModalElement = function() {
  // Create a new div and give it an ID of linkit-modal.
  // This is the dashboard container.
  var linkitModal = $('<div id="linkit-modal"></div>');

  // Create a modal div in the <body>.
  $('body').append(linkitModal);

  return linkitModal;
};

/**
 * Default jQuery dialog options used when creating the Linkit modal.
 */
Drupal.linkit.modalOptions = function() {
  return {
    dialogClass: 'linkit-wrapper',
    modal: true,
    draggable: false,
    resizable: false,
    width: 520,
    position: ['center', 50],
    minHeight: 0,
    zIndex: 210000,
    close: Drupal.linkit.modalClose,
    open: function (event, ui) {
      // Change the overlay style.
      $('.ui-widget-overlay').css({
        opacity: 0.5,
        filter: 'Alpha(Opacity=50)',
        backgroundColor: '#FFFFFF'
      });
    },
    title: 'Linkit'
  };
};

/**
 * Close the Linkit modal.
 */
Drupal.linkit.modalClose = function (e) {
  $('#linkit-modal').dialog('destroy').remove();
  // Make sure the current intstance settings are removed when the modal is
  // closed.
  Drupal.settings.linkit.currentInstance = {};

  // The event object does not have a preventDefault member in
  // Internet Explorer prior to version 9.
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  else {
    return false;
  }
};

/**
 *
 */
Drupal.linkit.getDashboard = function () {
  // Create the AJAX object.
  var ajax_settings = {};
  ajax_settings.event = 'LinkitDashboard';
  ajax_settings.url = Drupal.settings.linkit.dashboardPath +  Drupal.settings.linkit.currentInstance.profile;
  ajax_settings.progress = {
    type: 'throbber',
    message : Drupal.t('Loading Linkit dashboard...')
  };

  Drupal.ajax['linkit-modal'] = new Drupal.ajax('linkit-modal', $('#linkit-modal')[0], ajax_settings);

  // @TODO: Jquery 1.5 accept success setting to be an array of functions.
  // But we have to wait for jquery to get updated in Drupal core.
  // In the meantime we have to override it.
  Drupal.ajax['linkit-modal'].options.success = function (response, status) {
    if (typeof response == 'string') {
      response = $.parseJSON(response);
    }

    // Call the ajax success method.
    Drupal.ajax['linkit-modal'].success(response, status);
    // Run the afterInit function.
    var helper = Drupal.settings.linkit.currentInstance.helper;
    Drupal.linkit.getDialogHelper(helper).afterInit();

    // Set focus in the search field.
    $('#linkit-modal .linkit-search-element').focus();
  };

  // Update the autocomplete url.
  Drupal.settings.linkit.currentInstance.autocompletePathParsed =
    Drupal.settings.linkit.autocompletePath.replace('___profile___',  Drupal.settings.linkit.currentInstance.profile);

  // Trigger the ajax event.
  $('#linkit-modal').trigger('LinkitDashboard');
};

/**
 * Register new dialog helper.
 */
Drupal.linkit.registerDialogHelper = function(name, helper) {
  Drupal.linkit.dialogHelper[name] = helper;
};

/**
 * Get a dialog helper.
 */
Drupal.linkit.getDialogHelper = function(name) {
  return Drupal.linkit.dialogHelper[name];
};

/**
 * Register new insert plugins.
 */
Drupal.linkit.registerInsertPlugin = function(name, plugin) {
  Drupal.linkit.insertPlugins[name] = plugin;
};

/**
 * Get an insert plugin.
 */
Drupal.linkit.getInsertPlugin = function(name) {
  return Drupal.linkit.insertPlugins[name];
};

})(jQuery);
;
Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n>1)); }, 'strings': {"":{"If you have standard job searches that you repeat frequently, why not save them here? They\u0027ll be available with a single click.":"Si tienes b\u00fasquedas de empleo recurrentes, \u00bfpor qu\u00e9 no las guardas aqu\u00ed? Las tienes disponibles con un solo clic.","Save an unlimited number of jobs in your basket for easy, future reference.":"\u00a1Guarda todas las ofertas de empleo que te interesen!","A job alert is an email update about the latest jobs that match your search criteria, delivered straight to your inbox.":"La alerta de empleo es un email que te enviamos con los \u00faltimos empleos publicados que coinciden con tus criterios de b\u00fasqueda. Los recibes directamente en tu bandeja de entrada.","Keep track of the jobs you\u0027ve applied for.":"Haz seguimiento de tus solicitudes.","Close":"Cerrar","Delete your mypage account?":"\u00bfQuieres eliminar tu cuenta MyPage?","Are you sure you want to delete your mypage account? Any job information or stored CVs will be lost. After the account is deleted you will need to register again to access mypage functionality.":"\u00bfSeguro de quieres eliminar tu cuenta MyPage? Toda informaci\u00f3n relativa a un empleo o CV registrado ser\u00e1 perdida. Una vez tu cuenta haya sido borrada, tendr\u00e1s que inscribirte de nuevo para acceder a las funcionalidades de MyPage.","Delete account":"Eliminar cuenta","Cancel":"Cancelar","Show":"Ver","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"El documento %filename no se ha guardado correctamente. Solo los siguientes formatos son v\u00e1lidos:  %extensions.","Edit":"Editar","Enabled":"Activado","This job has been saved to your job basket.":"Este trabajo ha sido guardado en tus Ofertas Guardadas","This job has been removed from your job basket.":"Este trabajo ha sido quitado de la cesta de empleos.","Continue":"Continuar","Go to job basket":"Ir a ofertas guardadas","Save Job":"Guardar Empleo","Search results":"Resultados de b\u00fasqueda","Prev":"Anterior","Next":"Siguiente","January":"Enero","February":"Febrero","March":"Marzo","April":"Abril","May":"Mayo","June":"Junio","July":"Julio","August":"Agosto","September":"Septiembre","October":"Octubre","November":"Noviembre","December":"Diciembre","Jan":"Enero","Feb":"Febrero","Mar":"Marzo","Apr":"Abril","Jun":"Junio","Jul":"Julio","Aug":"Agosto","Sep":"Septiembre","Oct":"Octubre","Nov":"Noviembre","Dec":"Diciembre","Sunday":"Domingo","Monday":"Lunes","Tuesday":"Martes","Wednesday":"Mi\u00e9rcoles","Thursday":"Jueves","Friday":"Viernes","Saturday":"S\u00e1bado","Sun":"Dom","Mon":"Lun","Tue":"Mar","Thu":"Jue","Fri":"Vie","Su":"Dom","Mo":"Lun","Tu":"Mar","Th":"Jue","Fr":"Vie","Save your search":"Guardar tu b\u00fasqueda","Create Job Alert":"Crear Alerta de Empleo","Your search has been saved.":"Tu b\u00fasqueda se ha guardado.","A new job alert has been created.":"Una nueva alerta de empleo ha sido creada","Saved search":"B\u00fasquedas guardadas ","If you have standard job searches that you repeat frequently, you can save them with a mypage account. Please login or register for a mypage account to setup and manage saved searches.":"Si hay b\u00fasquedas est\u00e1ndar que se realizan con frecuencia, puedes guardarlas en una cuenta MyPage. Por favor, inicia sesi\u00f3n o reg\u00edstrate para obtener una cuenta mypage para poder configurar y administrar las b\u00fasquedas guardadas.","Login":"Iniciar Sesi\u00f3n","Register":"Inscribirse","A job alert is an email update about the latest jobs that match your search criteria, delivered straight to your inbox. Please login or register for a mypage account to setup, receive and manage job alerts.":"Una alerta de empleo es una actualizaci\u00f3n enviada a su correo electr\u00f3nico para informarte sobre las ofertas que coincidan con tus criterios de b\u00fasqueda. Con\u00e9ctate o reg\u00edstrate para establecer una cuenta en MyPage y poder configurar, recibir y administrar alertas de empleo.","All":"Todos","Yes":"Si","This field is required":"Este campo es obligatorio ","This field cannot contain numbers or special characters":"Este campo no puede contener n\u00fameros o caracteres especiales","Field is numeric":"El campo es num\u00e9rico","This field is required.":"Este campo es obligatorio ","Home":"Inicio","Upload":"Subir","Remove":"Eliminar","Confirm":"Confirmar","Save this search":"Guardar esta b\u00fasqueda","Create job alert":"Crear alerta de empleo","Your search already exists.":"Tu b\u00fasqueda ya existe.","Your job alert already exists.":"Tu alerta de empleo ya existe.","An error occured while saving this search.":"Se produjo un error al guardar esta b\u00fasqueda.","An error occured while saving this job alert.":"Se produjo un error al guardar esta alerta de empleo.","job alert":"alerta de empleo","Your e-mail address and confirmed e-mail address must match.":"Ambos correos deben coincidir.","View CV":"Ver CV","Create new search\u003C\/h3\u003E":"Crea una nueva b\u00fasqueda","The file upload field is required.":"Es necesario a\u00f1adir un archivo."}} };;
/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })
          .insertAfter(this.$element)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .offset(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
      self[self.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);;
/* ===========================================================
 * bootstrap-popover.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Modified 2012-02-28 by @danmillar to allow for maintained visibility
 * while the mouse is over the popover itself (rather than disappearing
 * when the mouse leaves the trigger). Note: Set a 'delay.hide' option.
 * https://gist.github.com/1930277
 * =========================================================== */


!function( $ ) {

 "use strict"

  var Popover = function ( element, options ) {
    this.init('popover', element, options);
  }

  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[ $.type(title) == 'object' ? 'append' : 'html' ](title)
      $tip.find('.popover-content > *')[ $.type(content) == 'object' ? 'append' : 'html' ](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      content = content.toString().replace(/(^\s*|\s*$)/, "")

      return content
    }

  , tip: function() {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
          .on('mouseenter', $.proxy(this.over, this))
          .on('mouseleave', $.proxy(this.out, this))
      }
    }
        
  , over: function( e ) {
      var self = $(this.$element)[this.type](this._options).data(this.type)

      self.hoverState = 'in'
    }

  , out: function( e ) {
      var self = $(this.$element)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.hide) {
        self.hide()
      } else {
        self.hoverState = 'out'
        setTimeout(function() {
          if (self.hoverState == 'out') {
            self.hide()
          }
        }, self.options.delay.hide)
      }
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}( window.jQuery );
;
/* ===========================================================
# bootstrap-tour - v0.8.0
# http://bootstraptour.com
# ==============================================================
# Copyright 2012-2013 Ulrich Sossou
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/
!function(a,b){var c,d;return d=b.document,c=function(){function c(c){this._options=a.extend({name:"tour",container:"body",keyboard:!0,storage:b.localStorage,debug:!1,backdrop:!1,redirect:!0,orphan:!1,duration:!1,basePath:"",template:"<div class='popover'>          <div class='arrow'></div>          <h3 class='popover-title'></h3>          <div class='popover-content'></div>          <div class='popover-navigation'>            <div class='btn-group'>              <button class='btn btn-sm btn-default' data-role='prev'>&laquo; Prev</button>              <button class='btn btn-sm btn-default' data-role='next'>Next &raquo;</button>              <button class='btn btn-sm btn-default' data-role='pause-resume'                data-pause-text='Pause'                data-resume-text='Resume'              >Pause</button>            </div>            <button class='btn btn-sm btn-default' data-role='end'>End tour</button>          </div>        </div>",afterSetState:function(){},afterGetState:function(){},afterRemoveState:function(){},onStart:function(){},onEnd:function(){},onShow:function(){},onShown:function(){},onHide:function(){},onHidden:function(){},onNext:function(){},onPrev:function(){},onPause:function(){},onResume:function(){}},c),this._force=!1,this._inited=!1,this._steps=[],this.backdrop={overlay:null,$element:null,$background:null,backgroundShown:!1,overlayElementShown:!1}}return c.prototype.setState=function(a,b){var c,d;if(this._options.storage){d=""+this._options.name+"_"+a;try{this._options.storage.setItem(d,b)}catch(e){c=e,c.code===DOMException.QUOTA_EXCEEDED_ERR&&this.debug("LocalStorage quota exceeded. setState failed.")}return this._options.afterSetState(d,b)}return null==this._state&&(this._state={}),this._state[a]=b},c.prototype.removeState=function(a){var b;return this._options.storage?(b=""+this._options.name+"_"+a,this._options.storage.removeItem(b),this._options.afterRemoveState(b)):null!=this._state?delete this._state[a]:void 0},c.prototype.getState=function(a){var b,c;return this._options.storage?(b=""+this._options.name+"_"+a,c=this._options.storage.getItem(b)):null!=this._state&&(c=this._state[a]),(void 0===c||"null"===c)&&(c=null),this._options.afterGetState(a,c),c},c.prototype.addSteps=function(a){var b,c,d,e;for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this.addStep(b));return e},c.prototype.addStep=function(a){return this._steps.push(a)},c.prototype.getStep=function(b){return null!=this._steps[b]?a.extend({id:"step-"+b,path:"",placement:"right",title:"",content:"<p></p>",next:b===this._steps.length-1?-1:b+1,prev:b-1,animation:!0,container:this._options.container,backdrop:this._options.backdrop,redirect:this._options.redirect,orphan:this._options.orphan,duration:this._options.duration,template:this._options.template,onShow:this._options.onShow,onShown:this._options.onShown,onHide:this._options.onHide,onHidden:this._options.onHidden,onNext:this._options.onNext,onPrev:this._options.onPrev,onPause:this._options.onPause,onResume:this._options.onResume},this._steps[b]):void 0},c.prototype.init=function(a){var b=this;return this._force=a,this.ended()?this._debug("Tour ended, init prevented."):(this.setCurrentStep(),this._setupMouseNavigation(),this._setupKeyboardNavigation(),this._onResize(function(){return b.showStep(b._current)}),null!==this._current&&this.showStep(this._current),this._inited=!0,this)},c.prototype.start=function(a){var b;return null==a&&(a=!1),this._inited||this.init(a),null===this._current?(b=this._makePromise(null!=this._options.onStart?this._options.onStart(this):void 0),this._callOnPromiseDone(b,this.showStep,0)):void 0},c.prototype.next=function(){var a;return this.ended()?this._debug("Tour ended, next prevented."):(a=this.hideStep(this._current),this._callOnPromiseDone(a,this._showNextStep))},c.prototype.prev=function(){var a;return this.ended()?this._debug("Tour ended, prev prevented."):(a=this.hideStep(this._current),this._callOnPromiseDone(a,this._showPrevStep))},c.prototype.goTo=function(a){var b;return this.ended()?this._debug("Tour ended, goTo prevented."):(b=this.hideStep(this._current),this._callOnPromiseDone(b,this.showStep,a))},c.prototype.end=function(){var c,e,f=this;return c=function(){return a(d).off("click.tour-"+f._options.name),a(d).off("keyup.tour-"+f._options.name),a(b).off("resize.tour-"+f._options.name),f.setState("end","yes"),f._inited=!1,f._force=!1,f._clearTimer(),null!=f._options.onEnd?f._options.onEnd(f):void 0},e=this.hideStep(this._current),this._callOnPromiseDone(e,c)},c.prototype.ended=function(){return!this._force&&!!this.getState("end")},c.prototype.restart=function(){return this.removeState("current_step"),this.removeState("end"),this.setCurrentStep(0),this.start()},c.prototype.pause=function(){var a;return a=this.getStep(this._current),a&&a.duration?(this._paused=!0,this._duration-=(new Date).getTime()-this._start,b.clearTimeout(this._timer),this._debug("Paused/Stopped step "+(this._current+1)+" timer ("+this._duration+" remaining)."),null!=a.onPause?a.onPause(this,this._duration):void 0):void 0},c.prototype.resume=function(){var a,c=this;return a=this.getStep(this._current),a&&a.duration?(this._paused=!1,this._start=(new Date).getTime(),this._duration=this._duration||a.duration,this._timer=b.setTimeout(function(){return c._isLast()?c.next():c.end()},this._duration),this._debug("Started step "+(this._current+1)+" timer with duration "+this._duration),null!=a.onResume&&this._duration!==a.duration?a.onResume(this,this._duration):void 0):void 0},c.prototype.hideStep=function(b){var c,d,e,f=this;return(e=this.getStep(b))?(this._clearTimer(),d=this._makePromise(null!=e.onHide?e.onHide(this,b):void 0),c=function(){var b;return b=a(e.element),b.data("bs.popover")||b.data("popover")||(b=a("body")),b.popover("destroy"),e.reflex&&b.css("cursor","").off("click.tour-"+f._options.name),e.backdrop&&f._hideBackdrop(),null!=e.onHidden?e.onHidden(f):void 0},this._callOnPromiseDone(d,c),d):void 0},c.prototype.showStep=function(b){var c,e,f,g,h=this;return(g=this.getStep(b))?(f=b<this._current,c=this._makePromise(null!=g.onShow?g.onShow(this,b):void 0),e=function(){var c,e;if(h.setCurrentStep(b),e=a.isFunction(g.path)?g.path.call():h._options.basePath+g.path,c=[d.location.pathname,d.location.hash].join(""),h._isRedirect(e,c))return h._redirect(g,e),void 0;if(h._isOrphan(g)){if(!g.orphan)return h._debug("Skip the orphan step "+(h._current+1)+". Orphan option is false and the element doesn't exist or is hidden."),f?h._showPrevStep():h._showNextStep(),void 0;h._debug("Show the orphan step "+(h._current+1)+". Orphans option is true.")}return g.backdrop&&h._showBackdrop(h._isOrphan(g)?void 0:g.element),h._scrollIntoView(g.element,function(){return null!=g.element&&g.backdrop&&h._showOverlayElement(g.element),h._showPopover(g,b),null!=g.onShown&&g.onShown(h),h._debug("Step "+(h._current+1)+" of "+h._steps.length)}),g.duration?h.resume():void 0},this._callOnPromiseDone(c,e),c):void 0},c.prototype.setCurrentStep=function(a){return null!=a?(this._current=a,this.setState("current_step",a)):(this._current=this.getState("current_step"),this._current=null===this._current?null:parseInt(this._current,10)),this},c.prototype._showNextStep=function(){var a,b,c,d=this;return c=this.getStep(this._current),b=function(){return d.showStep(c.next)},a=this._makePromise(null!=c.onNext?c.onNext(this):void 0),this._callOnPromiseDone(a,b)},c.prototype._showPrevStep=function(){var a,b,c,d=this;return c=this.getStep(this._current),b=function(){return d.showStep(c.prev)},a=this._makePromise(null!=c.onPrev?c.onPrev(this):void 0),this._callOnPromiseDone(a,b)},c.prototype._debug=function(a){return this._options.debug?b.console.log("Bootstrap Tour '"+this._options.name+"' | "+a):void 0},c.prototype._isRedirect=function(a,b){return null!=a&&""!==a&&a.replace(/\?.*$/,"").replace(/\/?$/,"")!==b.replace(/\/?$/,"")},c.prototype._redirect=function(b,c){return a.isFunction(b.redirect)?b.redirect.call(this,c):b.redirect===!0?(this._debug("Redirect to "+c),d.location.href=c):void 0},c.prototype._isOrphan=function(b){return null==b.element||!a(b.element).length||a(b.element).is(":hidden")&&"http://www.w3.org/2000/svg"!==a(b.element)[0].namespaceURI},c.prototype._isLast=function(){return this._current<this._steps.length-1},c.prototype._showPopover=function(b,c){var d,e,f,g,h,i,j=this;return i=a.extend({},this._options),f=a.isFunction(b.template)?a(b.template(c,b)):a(b.template),e=f.find(".popover-navigation"),h=this._isOrphan(b),h&&(b.element="body",b.placement="top",f=f.addClass("orphan")),d=a(b.element),f.addClass("tour-"+this._options.name),b.options&&a.extend(i,b.options),b.reflex&&d.css("cursor","pointer").on("click.tour-"+this._options.name,function(){return j._isLast()?j.next():j.end()}),b.prev<0&&e.find("*[data-role=prev]").addClass("disabled"),b.next<0&&e.find("*[data-role=next]").addClass("disabled"),b.duration||e.find("*[data-role='pause-resume']").remove(),b.template=f.clone().wrap("<div>").parent().html(),d.popover({placement:b.placement,trigger:"manual",title:b.title,content:b.content,html:!0,animation:b.animation,container:b.container,template:b.template,selector:b.element}).popover("show"),g=d.data("bs.popover")?d.data("bs.popover").tip():d.data("popover").tip(),g.attr("id",b.id),this._reposition(g,b),h?this._center(g):void 0},c.prototype._reposition=function(b,c){var e,f,g,h,i,j,k;if(h=b[0].offsetWidth,f=b[0].offsetHeight,k=b.offset(),i=k.left,j=k.top,e=a(d).outerHeight()-k.top-b.outerHeight(),0>e&&(k.top=k.top+e),g=a("html").outerWidth()-k.left-b.outerWidth(),0>g&&(k.left=k.left+g),k.top<0&&(k.top=0),k.left<0&&(k.left=0),b.offset(k),"bottom"===c.placement||"top"===c.placement){if(i!==k.left)return this._replaceArrow(b,2*(k.left-i),h,"left")}else if(j!==k.top)return this._replaceArrow(b,2*(k.top-j),f,"top")},c.prototype._center=function(c){return c.css("top",a(b).outerHeight()/2-c.outerHeight()/2)},c.prototype._replaceArrow=function(a,b,c,d){return a.find(".arrow").css(d,b?50*(1-b/c)+"%":"")},c.prototype._scrollIntoView=function(c,d){var e,f,g,h,i,j=this;return c?(e=a(c),f=a(b),g=e.offset().top,i=f.height(),h=Math.max(0,g-i/2),this._debug("Scroll into view. ScrollTop: "+h+". Element offset: "+g+". Window height: "+i+"."),a("body").stop().animate({scrollTop:Math.ceil(h)},function(){return d(),j._debug("Scroll into view. Animation end element offset: "+e.offset().top+". Window height: "+f.height()+".")})):d()},c.prototype._onResize=function(c,d){return a(b).on("resize.tour-"+this._options.name,function(){return clearTimeout(d),d=setTimeout(c,100)})},c.prototype._setupMouseNavigation=function(){var b=this;return b=this,a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=next]:not(.disabled)").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=next]:not(.disabled)",function(a){return a.preventDefault(),b.next()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=prev]:not(.disabled)").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=prev]:not(.disabled)",function(a){return a.preventDefault(),b.prev()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=end]").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=end]",function(a){return a.preventDefault(),b.end()}),a(d).off("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=pause-resume]").on("click.tour-"+this._options.name,".popover.tour-"+this._options.name+" *[data-role=pause-resume]",function(c){var d;return c.preventDefault(),d=a(this),d.text(b._paused?d.data("pause-text"):d.data("resume-text")),b._paused?b.resume():b.pause()})},c.prototype._setupKeyboardNavigation=function(){var b=this;if(this._options.keyboard)return a(d).on("keyup.tour-"+this._options.name,function(a){if(a.which)switch(a.which){case 39:return a.preventDefault(),b._isLast()?b.next():b.end();case 37:if(a.preventDefault(),b._current>0)return b.prev();break;case 27:return a.preventDefault(),b.end()}})},c.prototype._makePromise=function(b){return b&&a.isFunction(b.then)?b:null},c.prototype._callOnPromiseDone=function(a,b,c){var d=this;return a?a.then(function(){return b.call(d,c)}):b.call(this,c)},c.prototype._showBackdrop=function(){return this.backdrop.backgroundShown?void 0:(this.backdrop=a("<div/>",{"class":"tour-backdrop"}),this.backdrop.backgroundShown=!0,a("body").append(this.backdrop))},c.prototype._hideBackdrop=function(){return this._hideOverlayElement(),this._hideBackground()},c.prototype._hideBackground=function(){return this.backdrop.remove(),this.backdrop.overlay=null,this.backdrop.backgroundShown=!1},c.prototype._showOverlayElement=function(b){var c,d,e;if(!this.backdrop.overlayElementShown)return this.backdrop.overlayElementShown=!0,d=a(b),c=a("<div/>"),e=d.offset(),e.top=e.top,e.left=e.left,c.width(d.innerWidth()).height(d.innerHeight()).addClass("tour-step-background").offset(e),d.addClass("tour-step-backdrop"),a("body").append(c),this.backdrop.$element=d,this.backdrop.$background=c},c.prototype._hideOverlayElement=function(){return this.backdrop.overlayElementShown?(this.backdrop.$element.removeClass("tour-step-backdrop"),this.backdrop.$background.remove(),this.backdrop.$element=null,this.backdrop.$background=null,this.backdrop.overlayElementShown=!1):void 0},c.prototype._clearTimer=function(){return b.clearTimeout(this._timer),this._timer=null,this._duration=null},c}(),b.Tour=c}(jQuery,window);;
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
;
/*jslint nomen: true, plusplus: true, todo: true, white: true, browser: true, indent: 2 */

(function ($) {
  'use strict';
  Drupal.behaviors.demoTour = {
    attach: function (context, settings) {

      var tourDelay = 1000;
      if (!!Drupal.settings.demoTour) {
        tourDelay = Drupal.settings.demoTour.delay;
      }

      setTimeout(function() {
        if (Drupal.settings.demoTour && window === window.parent) {

          $.cookie.json = true;

          var firstTour;
          var demoTours = [];
          var tours = Drupal.settings.demoTour.tours;

          var toursTaken = JSON.parse($.cookie('demoToursTaken')) || [];

          var availableTours = [];

          // Generate a bootstrap-tour for each tour
          for (var tid in tours) {
            var thisTour = tours[tid];

            // Check the cookies to see if the user has already taken this tour.
            var alreadyTaken = $.inArray(tid, toursTaken) > -1;

            // Check if the tour should play for this screen size.
            var mediaQuery = thisTour.mediaQuery;
            var mediaQueryMatches = true;
            if (!!mediaQuery) {
              mediaQueryMatches = matchMedia(mediaQuery).matches;
            }

            // Check if the tour's elements exist and are visible on the page.
            var elementsExist = true;
            for (var stepId in thisTour.steps) {
              
              var element = thisTour.steps[stepId].element;
              var $element = $(element);
              if ($element.length == 0 || !$element.is(":visible")) {
                elementsExist = false;
                break;
              }
            }

            if (!alreadyTaken && mediaQueryMatches && elementsExist) {

              availableTours[tid] = thisTour;

              availableTours[tid].template = function (i, step) {
                var that = tours[step.tid];
                var html;
                html = '<div class="popover tour-tour fade right in demo_tour_' + step.tid + '_step-' + i + '">';
                html += '  <div class="popover-arrow"></div>';
                html += '  <div class="popover-close" data-role="end"><span>[X]</span></div>';
                html += '  <h4><span class="popover-title">' + step.title + '</span></h4>';
                html += '  <div class="popover-content"><p></p></div>';
                html += '  <div class="popover-navigation">';

                var label, role;
                if (i == (that.steps.length - 1)) {
                  label = Drupal.t('Get started');
                  role = 'end';
                }
                else {
                  label = Drupal.t('Next');
                  role = 'next';
                }

                html += '    <button data-role="' + role + '" class="tour-next">' + label + '</button>';
                html += '    <div class="popover-footer"></div>';
                html += '  </div>';
                html += '</div>';
                return html;
              };

              availableTours[tid].run = function () {
                var that = this;

                this.tour = new Tour({
                  // TODO: Make some of these options configurable
                  backdrop: that.modal,
                  redirect: false,
                  orphan: true,
                  container: '#main-body', // Protect iframes
                  duration: false,
                  template: this.template,
                  onEnd: function (tour) {
                    var next = demoTours.shift();
                    if (next) {
                      next.run();
                    }
                  },
                  onShown: function (tour) {
                    // If we set margin-left directly on CSS, it won't work on Firefox
                    // FIXME: Argh, hard-coded
                    jQuery('.tour-step-background').css('margin-left', '-200px');

                    // Do not hide popovers on mouse over
                    jQuery('#' + this.id).off('mouseenter').off('mouseleave');

                    toursTaken.push(that.tid);

                    // Store a cookie so as not to show this tour again.
                    $.cookie('demoToursTaken', JSON.stringify(toursTaken), { expires: 7, path: '/' });
                  }
                });

                this.tour.addSteps(this.steps);
                this.tour.init();

                try {
                  this.tour.start(true);
                } catch (e) {
                  // Avoid errors with elements that were not completely loaded
                }
              };

              if (!firstTour) {
                firstTour = availableTours[tid];
              }
              else {
                demoTours.push(availableTours[tid]);
              }
            }
          }
        }

        // Run the tours, if any are relevant.
        if (!!firstTour) {
          firstTour.run();
        }
      }, tourDelay);

    }
  }


})(jQuery);
;
/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);
;
(function ($) {

Drupal.behaviors.formtips = {
  attach: function (context) {
    var settings = Drupal.settings.formtips,
        selectors = $.isArray(settings.selectors) ? settings.selectors.join(', ') : settings.selectors;

    $('.form-item .description')
      .not(selectors).not('.formtips-processed')
        .addClass('formtips-processed').each(function(index) {

          var description = $(this),
              item = $(this).closest('.form-item'),
              label = item.find('label:first');

          description.hide();
          item.css('position', 'relative');
          label.wrap('<div class="formtips-wrapper clear-block"/>');
          label.parent().append('<a class="formtip"></a>');

          if (settings.trigger_action == 'click') {
            item.find('.formtip').click(function(e) {
              description.toggle('fast');
              e.preventDefault();
            });
          }
          else {
            item.find('.formtip').hoverIntent({
              sensitivity: settings.sensitivity,
              interval: settings.interval,
              over: function () {
                description.show('fast');
              },
              timeout: settings.timeout,
              out: function () {
                description.hide('fast');
              }
            });
          };
    });
    $('.form-item .description.formtips-processed').css('max-width', settings.maxWidth);
  }
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Linkit ckeditor dialog helper.
 */
(function ($) {

// Abort if Drupal.linkit is not defined.
if (typeof Drupal.linkit === 'undefined') {
  return ;
}

Drupal.linkit.registerDialogHelper('ckeditor', {
  init : function() {},

  /**
   * Prepare the dialog after init.
   */
  afterInit : function () {
     var editor = Drupal.settings.linkit.currentInstance.editor;
     var element = CKEDITOR.plugins.link.getSelectedLink( editor );

    // If we have selected a link element, lets populate the fields in the
    // modal with the values from that link element.
    if (element) {
      link = {
        path: element.data('cke-saved-href') || element.getAttribute('href') || '',
        attributes: {}
      },
      // Get all attributes that have fields in the modal.
      additionalAttributes = Drupal.linkit.additionalAttributes();

      for (var i = 0; i < additionalAttributes.length; i++) {
        link.attributes[additionalAttributes[i]] = element.getAttribute(additionalAttributes[i]);
      }

      // Populate the fields.
      Drupal.linkit.populateFields(link);
    }
  },

  /**
   * Insert the link into the editor.
   *
   * @param {Object} link
   *   The link object.
   */
  insertLink : function(link) {
    var editor = Drupal.settings.linkit.currentInstance.editor;
    CKEDITOR.tools.callFunction(editor._.linkitFnNum, link, editor);
  }
});

})(jQuery);;
/**
 * @file
 *
 * Implement a modal form.
 *
 * @see modal.inc for documentation.
 *
 * This javascript relies on the CTools ajax responder.
 */

(function ($) {
  // Make sure our objects are defined.
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.Modal = Drupal.CTools.Modal || {};

  /**
   * Display the modal
   *
   * @todo -- document the settings.
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice == 'string' && Drupal.settings[choice]) {
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
        width: .8,
        height: .8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: .55,
        background: '#fff'
      },
      modalClass: 'default'
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings != settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == 'scale') {
        var width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = $(window).height() * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        var width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      $('div.ctools-modal-content', context).css({
        'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px',
        'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
      });
      $('div.ctools-modal-content .modal-content', context).css({
        'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px',
        'height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
      });
    }

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == 'scale') {
        $(window).bind('resize', resize);
      }
    }

    resize();

    $('span.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed, settings.modalClass);
    $('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme)).addClass('ctools-modal-loading');

    // Position autocomplete results based on the scroll position of the modal.
    $('#modalContent .modal-content').delegate('input.form-autocomplete', 'keyup', function() {
      $('#autocomplete').css('top', $(this).position().top + $(this).outerHeight() + $(this).offsetParent().filter('#modal-content').scrollTop());
    });
  };

  /**
   * Hide the modal
   */
  Drupal.CTools.Modal.dismiss = function() {
    if (Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal);
    }
  };

  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = ''
    html += '<div id="ctools-modal">'
    html += '  <div class="ctools-modal-content">' // panels-modal-content
    html += '    <div class="modal-header">';
    html += '      <a class="close" href="#">';
    html +=          Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '      </a>';
    html += '      <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '    </div>';
    html += '    <div id="modal-content" class="modal-content">';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    return html;
  }

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '<div id="modal-throbber">';
    html += '  <div class="modal-throbber-wrapper">';
    html +=      Drupal.CTools.Modal.currentSettings.throbber;
    html += '  </div>';
    html += '</div>';

    return html;
  };

  /**
   * Figure out what settings string to use to display a modal.
   */
  Drupal.CTools.Modal.getSettings = function (object) {
    var match = $(object).attr('class').match(/ctools-modal-(\S+)/);
    if (match) {
      return match[1];
    }
  }

  /**
   * Click function for modals that can be cached.
   */
  Drupal.CTools.Modal.clickAjaxCacheLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this);
  };

  /**
   * Handler to prepare the modal for the response
   */
  Drupal.CTools.Modal.clickAjaxLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return false;
  };

  /**
   * Submit responder to do an AJAX submit on all modal forms.
   */
  Drupal.CTools.Modal.submitAjaxForm = function(e) {
    var $form = $(this);
    var url = $form.attr('action');

    setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit($form, url); }, 1);
    return false;
  }

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.ZZCToolsModal = {
    attach: function(context) {
      // Bind links
      // Note that doing so in this order means that the two classes can be
      // used together safely.
      /*
       * @todo remimplement the warm caching feature
       $('a.ctools-use-modal-cache', context).once('ctools-use-modal', function() {
         $(this).click(Drupal.CTools.Modal.clickAjaxCacheLink);
         Drupal.CTools.AJAX.warmCache.apply(this);
       });
        */

      $('area.ctools-use-modal, a.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        // Create a drupal ajax object
        var element_settings = {};
        if ($this.attr('href')) {
          element_settings.url = $this.attr('href');
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
        }
        var base = $this.attr('href');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      // Bind buttons
      $('input.ctools-use-modal, button.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        var button = this;
        var element_settings = {};

        // AJAX submits specified in this manner automatically submit to the
        // normal form action.
        element_settings.url = Drupal.CTools.Modal.findURL(this);
        if (element_settings.url == '') {
          element_settings.url = $(this).closest('form').attr('action');
        }
        element_settings.event = 'click';
        element_settings.setClick = true;

        var base = $this.attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);

        // Make sure changes to settings are reflected in the URL.
        $('.' + $(button).attr('id') + '-url').change(function() {
          Drupal.ajax[base].options.url = Drupal.CTools.Modal.findURL(button);
        });
      });

      // Bind our custom event to the form submit
      $('#modal-content form', context).once('ctools-use-modal', function() {
        var $this = $(this);
        var element_settings = {};

        element_settings.url = $this.attr('action');
        element_settings.event = 'submit';
        element_settings.progress = { 'type': 'throbber' }
        var base = $this.attr('id');

        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        Drupal.ajax[base].form = $this;

        $('input[type=submit], button', this).click(function(event) {
          Drupal.ajax[base].element = this;
          this.form.clk = this;
          // Stop autocomplete from submitting.
          if (Drupal.autocompleteSubmit && !Drupal.autocompleteSubmit()) {
            return false;
          }
          // An empty event means we were triggered via .click() and
          // in jquery 1.4 this won't trigger a submit.
          // We also have to check jQuery version to prevent
          // IE8 + jQuery 1.4.4 to break on other events
          // bound to the submit button.
          if (jQuery.fn.jquery === '1.4' && typeof event.bubbles === "undefined") {
            $(this.form).trigger('submit');
            return false;
          }
        });
      });

      // Bind a click handler to allow elements with the 'ctools-close-modal'
      // class to close the modal.
      $('.ctools-close-modal', context).once('ctools-close-modal')
        .click(function() {
          Drupal.CTools.Modal.dismiss();
          return false;
        });
    }
  };

  // The following are implementations of AJAX responder commands.

  /**
   * AJAX responder command to place HTML within the modal.
   */
  Drupal.CTools.Modal.modal_display = function(ajax, response, status) {
    if ($('#modalContent').length == 0) {
      Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));
    }
    $('#modal-title').html(response.title);
    // Simulate an actual page load by scrolling to the top after adding the
    // content. This is helpful for allowing users to see error messages at the
    // top of a form, etc.
    $('#modal-content').html(response.output).scrollTop(0);

    // Attach behaviors within a modal dialog.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.attachBehaviors('#modalContent', settings);

    if ($('#modal-content').hasClass('ctools-modal-loading')) {
      $('#modal-content').removeClass('ctools-modal-loading');
    }
    else {
      // If the modal was already shown, and we are simply replacing its
      // content, then focus on the first focusable element in the modal.
      // (When first showing the modal, focus will be placed on the close
      // button by the show() function called above.)
      $('#modal-content :focusable:first').focus();
    }
  }

  /**
   * AJAX responder command to dismiss the modal.
   */
  Drupal.CTools.Modal.modal_dismiss = function(command) {
    Drupal.CTools.Modal.dismiss();
    $('link.ctools-temporary-css').remove();
  }

  /**
   * Display loading
   */
  //Drupal.CTools.AJAX.commands.modal_loading = function(command) {
  Drupal.CTools.Modal.modal_loading = function(command) {
    Drupal.CTools.Modal.modal_display({
      output: Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),
      title: Drupal.CTools.Modal.currentSettings.loadingText
    });
  }

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.Modal.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        var $this = $(this);
        if (url && $this.val()) {
          url += '/';
        }
        url += $this.val();
      });
    return url;
  };


  /**
   * modalContent
   * @param content string to display in the content box
   * @param css obj of css attributes
   * @param animation (fadeIn, slideDown, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   * @param modalClass class added to div#modalContent
   */
  Drupal.CTools.Modal.modalContent = function(content, css, animation, speed, modalClass) {
    // If our animation isn't set, make it just show/pop
    if (!animation) {
      animation = 'show';
    }
    else {
      // If our animation isn't "fadeIn" or "slideDown" then it always is show
      if (animation != 'fadeIn' && animation != 'slideDown') {
        animation = 'show';
      }
    }

    if (!speed) {
      speed = 'fast';
    }

    // Build our base attributes and allow them to be overriden
    css = jQuery.extend({
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.55'
    }, css);

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
    content.hide();

    // If we already have modalContent, remove it.
    if ($('#modalBackdrop').length) $('#modalBackdrop').remove();
    if ($('#modalContent').length) $('#modalContent').remove();

    // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
    if (self.pageYOffset) { // all except Explorer
    var wt = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }

    // Get our dimensions

    // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
    var docHeight = $(document).height() + 50;
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    if( docHeight < winHeight ) docHeight = winHeight;

    // Create our divs
    $('body').append('<div id="modalBackdrop" class="backdrop-' + modalClass + '" style="z-index: 1000; display: none;"></div><div id="modalContent" class="modal-' + modalClass + '" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

    // Get a list of the tabbable elements in the modal content.
    var getTabbableElements = function () {
      var tabbableElements = $('#modalContent :tabbable'),
          radioButtons = tabbableElements.filter('input[type="radio"]');

      // The list of tabbable elements from jQuery is *almost* right. The
      // exception is with groups of radio buttons. The list from jQuery will
      // include all radio buttons, when in fact, only the selected radio button
      // is tabbable, and if no radio buttons in a group are selected, then only
      // the first is tabbable.
      if (radioButtons.length > 0) {
        // First, build up an index of which groups have an item selected or not.
        var anySelected = {};
        radioButtons.each(function () {
          var name = this.name;

          if (typeof anySelected[name] === 'undefined') {
            anySelected[name] = radioButtons.filter('input[name="' + name + '"]:checked').length !== 0;
          }
        });

        // Next filter out the radio buttons that aren't really tabbable.
        var found = {};
        tabbableElements = tabbableElements.filter(function () {
          var keep = true;

          if (this.type == 'radio') {
            if (anySelected[this.name]) {
              // Only keep the selected one.
              keep = this.checked;
            }
            else {
              // Only keep the first one.
              if (found[this.name]) {
                keep = false;
              }
              found[this.name] = true;
            }
          }

          return keep;
        });
      }

      return tabbableElements.get();
    };

    // Keyboard and focus event handler ensures only modal elements gain focus.
    modalEventHandler = function( event ) {
      target = null;
      if ( event ) { //Mozilla
        target = event.target;
      } else { //IE
        event = window.event;
        target = event.srcElement;
      }

      var parents = $(target).parents().get();
      for (var i = 0; i < parents.length; ++i) {
        var position = $(parents[i]).css('position');
        if (position == 'absolute' || position == 'fixed') {
          return true;
        }
      }

      if ($(target).is('#modalContent, body') || $(target).filter('*:visible').parents('#modalContent').length) {
        // Allow the event only if target is a visible child node
        // of #modalContent.
        return true;
      }
      else {
        getTabbableElements()[0].focus();
      }

      event.preventDefault();
    };
    $('body').bind( 'focus', modalEventHandler );
    $('body').bind( 'keypress', modalEventHandler );

    // Keypress handler Ensures you can only TAB to elements within the modal.
    // Based on the psuedo-code from WAI-ARIA 1.0 Authoring Practices section
    // 3.3.1 "Trapping Focus".
    modalTabTrapHandler = function (evt) {
      // We only care about the TAB key.
      if (evt.which != 9) {
        return true;
      }

      var tabbableElements = getTabbableElements(),
          firstTabbableElement = tabbableElements[0],
          lastTabbableElement = tabbableElements[tabbableElements.length - 1],
          singleTabbableElement = firstTabbableElement == lastTabbableElement,
          node = evt.target;

      // If this is the first element and the user wants to go backwards, then
      // jump to the last element.
      if (node == firstTabbableElement && evt.shiftKey) {
        if (!singleTabbableElement) {
          lastTabbableElement.focus();
        }
        return false;
      }
      // If this is the last element and the user wants to go forwards, then
      // jump to the first element.
      else if (node == lastTabbableElement && !evt.shiftKey) {
        if (!singleTabbableElement) {
          firstTabbableElement.focus();
        }
        return false;
      }
      // If this element isn't in the dialog at all, then jump to the first
      // or last element to get the user into the game.
      else if ($.inArray(node, tabbableElements) == -1) {
        // Make sure the node isn't in another modal (ie. WYSIWYG modal).
        var parents = $(node).parents().get();
        for (var i = 0; i < parents.length; ++i) {
          var position = $(parents[i]).css('position');
          if (position == 'absolute' || position == 'fixed') {
            return true;
          }
        }

        if (evt.shiftKey) {
          lastTabbableElement.focus();
        }
        else {
          firstTabbableElement.focus();
        }
      }
    };
    $('body').bind('keydown', modalTabTrapHandler);

    // Create our content div, get the dimensions, and hide it
    var modalContent = $('#modalContent').css('top','-1000px');
    var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
    var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
    $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

    // Bind a click for closing the modalContent
    modalContentClose = function(){close(); return false;};
    $('.close').bind('click', modalContentClose);

    // Bind a keypress on escape for closing the modalContent
    modalEventEscapeCloseHandler = function(event) {
      if (event.keyCode == 27) {
        close();
        return false;
      }
    };

    $(document).bind('keydown', modalEventEscapeCloseHandler);

    // Per WAI-ARIA 1.0 Authoring Practices, initial focus should be on the
    // close button, but we should save the original focus to restore it after
    // the dialog is closed.
    var oldFocus = document.activeElement;
    $('.close').focus();

    // Close the open modal content and backdrop
    function close() {
      // Unbind the events
      $(window).unbind('resize',  modalContentResize);
      $('body').unbind( 'focus', modalEventHandler);
      $('body').unbind( 'keypress', modalEventHandler );
      $('body').unbind( 'keydown', modalTabTrapHandler );
      $('.close').unbind('click', modalContentClose);
      $('body').unbind('keypress', modalEventEscapeCloseHandler);
      $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

      // Set our animation parameters and use them
      if ( animation == 'fadeIn' ) animation = 'fadeOut';
      if ( animation == 'slideDown' ) animation = 'slideUp';
      if ( animation == 'show' ) animation = 'hide';

      // Close the content
      modalContent.hide()[animation](speed);

      // Remove the content
      $('#modalContent').remove();
      $('#modalBackdrop').remove();

      // Restore focus to where it was before opening the dialog
      $(oldFocus).focus();
    };

    // Move and resize the modalBackdrop and modalContent on window resize.
    modalContentResize = function(){

      // Reset the backdrop height/width to get accurate document size.
      $('#modalBackdrop').css('height', '').css('width', '');

      // Position code lifted from:
      // http://www.quirksmode.org/viewport/compatibility.html
      if (self.pageYOffset) { // all except Explorer
      var wt = self.pageYOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        var wt = document.documentElement.scrollTop;
      } else if (document.body) { // all other Explorers
        var wt = document.body.scrollTop;
      }

      // Get our heights
      var docHeight = $(document).height();
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Get where we should move content to
      var modalContent = $('#modalContent');
      var mdcTop = wt + ( winHeight / 2 ) - ( modalContent.outerHeight() / 2);
      var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);

      // Apply the changes
      $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css('top', mdcTop + 'px').css('left', mdcLeft + 'px').show();
    };
    $(window).bind('resize', modalContentResize);
  };

  /**
   * unmodalContent
   * @param content (The jQuery object to remove)
   * @param animation (fadeOut, slideUp, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.unmodalContent = function(content, animation, speed)
  {
    // If our animation isn't set, make it just show/pop
    if (!animation) { var animation = 'show'; } else {
      // If our animation isn't "fade" then it always is show
      if (( animation != 'fadeOut' ) && ( animation != 'slideUp')) animation = 'show';
    }
    // Set a speed if we dont have one
    if ( !speed ) var speed = 'fast';

    // Unbind the events we bound
    $(window).unbind('resize', modalContentResize);
    $('body').unbind('focus', modalEventHandler);
    $('body').unbind('keypress', modalEventHandler);
    $('body').unbind( 'keydown', modalTabTrapHandler );
    $('.close').unbind('click', modalContentClose);
    $('body').unbind('keypress', modalEventEscapeCloseHandler);
    $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

    // jQuery magic loop through the instances and run the animations or removal.
    content.each(function(){
      if ( animation == 'fade' ) {
        $('#modalContent').fadeOut(speed, function() {
          $('#modalBackdrop').fadeOut(speed, function() {
            $(this).remove();
          });
          $(this).remove();
        });
      } else {
        if ( animation == 'slide' ) {
          $('#modalContent').slideUp(speed,function() {
            $('#modalBackdrop').slideUp(speed, function() {
              $(this).remove();
            });
            $(this).remove();
          });
        } else {
          $('#modalContent').remove();
          $('#modalBackdrop').remove();
        }
      }
    });
  };

$(function() {
  Drupal.ajax.prototype.commands.modal_display = Drupal.CTools.Modal.modal_display;
  Drupal.ajax.prototype.commands.modal_dismiss = Drupal.CTools.Modal.modal_dismiss;
});

})(jQuery);
;
(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.mp_feature_prompts = {
    attach: function (context, settings) {
      // Act if a demo tour is present.
      if (Drupal.settings.demoTour) {
        // Close feature prompts when clicking anywhere else on the page.
        $(document).click(function (event) {
          if (!$(event.target).closest('.popover').length) {
            if ($('.popover').is(":visible")) {
              $('.tour-next').click();
            }
          }
        });

        // Close feature prompts when they become invisible due to scrolling.
        var scrollDebounce = false;

        /**
         * Prevent too-frequent scroll event checking.
         */
        $(window).scroll(function() {
          scrollDebounce = true;
        });

        /**
         * Check if a feature prompt is on the page, but not currently visible.
         * @returns {boolean}
         */
        function featurePromptNotVisible() {
          var $popover = $('.popover');
          if ($popover.length == 0) {
            return false;
          }

          var docViewTop = $(window).scrollTop();
          var docViewBottom = docViewTop + $(window).height();

          var elemTop = $popover.offset().top;
          var elemBottom = elemTop + $popover.height();

          var popoverVisible = (elemBottom <= docViewBottom) && (elemTop >= docViewTop);
          return !popoverVisible;
        }

        setInterval(function () {
          if (scrollDebounce) {
            scrollDebounce = false;

            if (featurePromptNotVisible()) {
              $('.tour-next').click();
            }
          }
        }, 100);
      }
    }
  };

})(jQuery, Drupal, this, this.document);
;
/**
 * @file
 * mp_linkedin.js
 */
(function ($) {
  /**
  * Here we are extending Drupal Core ajaxs to reload a page.
  * We also overload the redirect and use replace instead so
  * early versions of IE will reload the page. Sometimes IE
  * wont reload if the page has an ('#') anchor.
  */
  Drupal.behaviors.createReload = {
    attach: function(context, settings) {
      if (typeof Drupal.ajax == 'function') {
        Drupal.ajax.prototype.commands['reload'] = function (ajax, response, status) {
          window.location.reload(true);
        }
        Drupal.ajax.prototype.commands['redirect'] = function(ajax, data, status) {
          location.replace(data.url);
        };
      }
    }
  };
  /**
   * Load the capture module.
   */
  Drupal.behaviors.linkedinAuth = {
    attach: function(context, settings) {
      if ($('#linkedin-associate.linkedin-processed').length > 0) {
        // We only want to attach once.
        return;
      }
      if (location.hash.indexOf('linkedin_associate') != -1) {
        $('#linkedin-associate').click();
        $('#linkedin-associate').addClass('linkedin-processed');
        // Lets delete the fragment from the URL if we can.
        if (history.pushState) {
          history.pushState({}, document.title, location.pathname);
        }
      }
    }
  };
})(jQuery);
;
/**
 * @file
 * MP Views show more supportive js file.
 *
 * File will support to load ajax loaded data till the pager user has navigate
 *  previously in same browser session.
 */

(function ($, Drupal, window, document, undefined) {
  // Remove page-index key from load more pager next URL.
  Drupal.behaviors.loadMoreAjax = {
    attach: function (context, settings) {
      // Load more pager link click event, Show the loading image when clicked.
      $('.pager-show-more-next a').click(function () {
        // Add loader gif to show more pager, while processing ajax request.
        $('ul.pager-show-more').addClass("loadergif");
      });

      // Calls after load more ajax complete.
      $(document).ajaxComplete(function (event, xhr, settings) {
        // Display the pager next link.
        var pager = $('ul.pager-show-more');
        if (!pager.hasClass("pager-show-more-empty")) {
          // Remove the gif from show more pager, when ajax request completed.
          pager.removeClass("loadergif");
        }

        var ajaxUrl = settings.url;
        var pagerNextUrl = $('.pager-show-more-next a').attr('href');

        // Here we are removing language which added twice in job search pager link url.
        // After implementing facetapi_pretty_path & query_parameters_to_url, in pager link language added twice for the multilingual site.
        // while doing load more in site's non-default language.
        if (Drupal.settings.pathPrefix != '' && (typeof pagerNextUrl != 'undefined')) {
          pagerNextUrl = pagerNextUrl.replace(Drupal.settings.pathPrefix + Drupal.settings.pathPrefix, Drupal.settings.pathPrefix);

          // Updating pager text.
          $('.pager-show-more-next a').text(Drupal.settings.mp_jobs_search_pager_next_settings.pager_text);
        }

        // If current ajax call is for load more search, Then remove page-index key from pager next url.
        if ((ajaxUrl.indexOf('/views/ajax') >= 0) && pagerNextUrl != null && pagerNextUrl.indexOf('page-index') >= 0) {
          // Remove page-index key from url.
          // Get key value from URL.
          var regExpn = new RegExp('[?&]page-index=([^&#]*)', 'i');
          var pagerEq = regExpn.exec(pagerNextUrl);

          if (pagerEq != null) {
            // Page-index key value.
            var pagerVal = pagerEq[1];

            // There are many keys in querystring.
            if (pagerNextUrl.indexOf('&page-index') !== -1) {
              pagerNextUrl = pagerNextUrl.replace('&page-index=' + pagerVal, '');
            }

            // There is page-index key on first pos in querystring.
            else {
              if (pagerNextUrl.indexOf('page-index=' + pagerVal + '&') >= 0) {
                pagerNextUrl = pagerNextUrl.replace('page-index=' + pagerVal + '&', '');
              }
              else {
                pagerNextUrl = pagerNextUrl.replace('?page-index=' + pagerVal, '');
              }
            }
          }
        }

        // Assign the new updated url to pager next.
        $('.pager-show-more-next a').attr('href', pagerNextUrl);

        $(".mp_candidate_relevancy-mp_cr_search_result:eq(1)").css("display", "block");
      });
    }
  };
})(jQuery, Drupal, this, this.document);

/**
 * Load ajax loaded data up to visited pager, when user comes back to page.
 *
 * @param string viewName
 *   view name for which want to load data.
 */
function viewShowMoreLoadAjaxLoadedData(viewName) {
  var pageQueryString = window.location.href;
  var regExpression = new RegExp('[?&]' + 'page-index' + '=([^&#]*)', 'i');
  var pageIndexQueryStringObj = regExpression.exec(pageQueryString);

  // If user comes back on page and had triggered page show more link on previous visit.
  // So hit show more link to show all already loaded data.
  if (pageIndexQueryStringObj != null && pageIndexQueryStringObj != '') {
    var triggerPageNum = pageIndexQueryStringObj[1];
    if (triggerPageNum != null && triggerPageNum > 0) {
      // Trigger Page Show more link.
      triggerShowLoadMoreLink();

      // This will load page's all ajax loaded data till the pager user has visited.
      jQuery(document).ajaxComplete(function (event, request, settings) {
        // Only fire when this view is loaded via AJAX.
        if (settings.url.indexOf('/views/ajax') != -1) {
          if (settings.data.indexOf("view_name=" + viewName) != -1) {
            triggerPageNum--;

            // If not loaded upto last visited pager, Hit again.
            if (triggerPageNum > 0) {
              triggerShowLoadMoreLink();
            }
            // If all pages loading done, then set focus to the last visited job.
            else if (triggerPageNum == 0) {
              mpTriggerFocusOnLastVisitedJob();
            }
          }
        }
      });
    }
  }
}

function triggerShowLoadMoreLink() {
  jQuery('.pager-show-more .pager-show-more-next a').trigger('click');
}

/**
 * Function will set the user focus on to the last visited job id.
 *
 * If user comes back on search page from any user journey or back to search button.
 */
function mpTriggerFocusOnLastVisitedJob() {
  if (typeof mpGetKeyValueFromUrl !== 'undefined') {
    // Job search page, Set the focus to the last visited job
    // when user comes back to search page from job detail or any user journey.
    var pageQueryString = window.location.href;
    var jobPositionQueryStringObj = mpGetKeyValueFromUrl(pageQueryString, 'pos');

    if (jobPositionQueryStringObj != null) {
      var jobPositionId = jobPositionQueryStringObj[1];

      if (jobPositionId != '' && jobPositionId != 0) {
        var triggerElementOffset = jQuery("#" + jobPositionId).offset();

        if (triggerElementOffset !== null && triggerElementOffset !== undefined) {
          jQuery("html, body").animate({ scrollTop: triggerElementOffset.top - 100}, 'fast');
        }
      }
    }
  }
}
;
/**
 * @file
 * Smart banner app related js.
 */

(function(root, factory) {
  if (typeof define == 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(root.jQuery);
  }
})(this, function($) {
  var UA = navigator.userAgent;
  var isEdge = /Edge/i.test(UA);

  var SmartBanner = function(options) {
    // Get the original margin-top of the HTML element so we can take that into account.
    this.origHtmlMargin = parseFloat($('html').css('margin-top'));
    this.options = $.extend({}, $.smartbanner.defaults, options);

    // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari).
    var standalone = navigator.standalone;

    // Detect banner type (iOS or Android).
    if (this.options.force) {
      this.type = this.options.force;
    }
    else if (UA.match(/Windows Phone/i) !== null && UA.match(/Edge|Touch/i) !== null) {
      this.type = 'windows';
    }
    else if (UA.match(/iPhone|iPod/i) !== null || (UA.match(/iPad/) && this.options.iOSUniversalApp)) {
      if (UA.match(/Safari/i) !== null &&
          (UA.match(/CriOS/i) !== null ||
           UA.match(/FxiOS/i) != null ||
            window.Number(UA.substr(UA.indexOf('OS ') + 3, 3).replace('_', '.')) < 6)) {
        // Check webview and native smart banner support (iOS 6+).
        this.type = 'ios';
      }
    }
    else if (UA.match(/\bSilk\/(.*\bMobile Safari\b)?/) || UA.match(/\bKF\w/) || UA.match('Kindle Fire')) {
      this.type = 'kindle';
    }
    else if (UA.match(/Android/i) !== null) {
      this.type = 'android';
    }
    // Don't show banner if device isn't iOS or Android, website is loaded in app or user dismissed banner.
    if (!this.type || standalone || this.getCookie('sb-closed') || this.getCookie('sb-installed')) {
      return;
    }
    // Calculate scale.
    this.scale = this.options.scale == 'auto' ? $(window).width() / window.screen.width : this.options.scale;
    if (this.scale < 1) {
      this.scale = 1;
    }
    // Get info from meta data.
    var meta = $(
      this.type == 'android'
        ? 'meta[name="google-play-app"]'
        : (this.type == 'ios'
            ? 'meta[name="apple-itunes-app"]'
            : (this.type == 'kindle'
                ? 'meta[name="kindle-fire-app"]'
                : 'meta[name="msApplication-ID"]'
              )
          )
    );

    if (!meta.length) {
      return;
    }
    // For Windows Store apps, get the PackageFamilyName for protocol launch.
    if (this.type == 'windows') {
      if (isEdge) {
        this.appId = $('meta[name="msApplication-PackageEdgeName"]').attr('content');
      }
      if (!this.appId) {
        this.appId = $('meta[name="msApplication-PackageFamilyName"]').attr('content');
      }
    }
    else {
      // Try to pull the appId out of the meta tag and store the result.
      var parsedMetaContent = /app-id=([^\s,]+)/.exec(meta.attr('content'));
      if (parsedMetaContent) {
        this.appId = parsedMetaContent[1];
      } else {
        return;
      }
    }
    this.title = this.options.title
      ? this.options.title
      : (meta.data('title') || $('title').text().replace(/\s*[|\-Â·].*$/, ''));

    this.author = this.options.author
      ? this.options.author
      : (meta.data('author') || ($('meta[name="author"]').length ? $('meta[name="author"]').attr('content') : window.location.hostname));

    this.iconUrl = meta.data('icon-url');
    this.price = meta.data('price');

    // Set default onInstall callback if not set in options.
    if (typeof this.options.onInstall == 'function') {
      this.options.onInstall = this.options.onInstall;
    } else {
      this.options.onInstall = function() {};
    }
    // Set default onClose callback if not set in options.
    if (typeof this.options.onClose == 'function') {
      this.options.onClose = this.options.onClose;
    } else {
      this.options.onClose = function() {};
    }
    // Create banner.
    this.create();
    this.show();
    this.listen();
  };

  SmartBanner.prototype = {

    constructor: SmartBanner,

    create: function() {
      var iconURL;
      var price = this.price || this.options.price;

      var link = this.options.url || (function() {
        switch (this.type) {
          case 'android':
            return 'market://details?id=';
          case 'kindle':
            return 'amzn://apps/android?asin=';
          case 'windows':
            return isEdge
              ? 'ms-windows-store://pdp/?productid='
              : 'ms-windows-store:navigate?appid=';
        }
        return 'https://itunes.apple.com/' + this.options.appStoreLanguage + '/app/id';
      }.call(this) + this.appId);

      var inStore = !price ? '' : (function() {
        var result = !this.options.inGooglePlay ? price : price + '-';
        switch (this.type) {
          case 'android':
            return result + this.options.inGooglePlay;
          case 'kindle':
            return result + this.options.inAmazonAppStore;
          case 'windows':
            return result + this.options.inWindowsStore;
        }
        return result + this.options.inAppStore
      }.call(this));

      var gloss = this.options.iconGloss == null
        ? (this.type=='ios')
        : this.options.iconGloss;

      if (this.type == 'android' && this.options.GooglePlayParams) {
        link += '&referrer=' + this.options.GooglePlayParams;
      }
      var banner = (
        '<div id="smartbanner" class="' + this.type + '">' +
          '<div class="sb-container">' +
            '<a href="#" class="sb-close">&times;</a>' +
            '<span class="sb-icon"></span>' +
            '<div class="sb-info">' +
              '<strong>' + this.title + '</strong>' +
              '<span>' + this.author + '</span>' +
              '<span>' + inStore + '</span>' +
            '</div>' +
            '<a href="' + link + '" class="sb-button">' +
              '<span>' + this.options.button + '</span>' +
            '</a>' +
          '</div>' +
        '</div>'
      );
      if (this.options.layer) {
        $(this.options.appendToSelector).append(banner);
      } else {
        $(this.options.appendToSelector).prepend(banner);
      }
      if (this.options.icon) {
        iconURL = this.options.icon;
      } else if(this.iconUrl) {
        iconURL = this.iconUrl;
      } else if ($('link[rel="apple-touch-icon-precomposed"]').length > 0) {
        iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href');
        if (this.options.iconGloss == null) {
          gloss = false;
        }
      } else if ($('link[rel="apple-touch-icon"]').length > 0) {
        iconURL = $('link[rel="apple-touch-icon"]').attr('href');
      } else if ($('meta[name="msApplication-TileImage"]').length > 0) {
        iconURL = $('meta[name="msApplication-TileImage"]').attr('content');
      } else if ($('meta[name="msapplication-TileImage"]').length > 0) {
        // Redundant because ms docs show two case usages.
        iconURL = $('meta[name="msapplication-TileImage"]').attr('content');
      }
      if (iconURL) {
        $('#smartbanner .sb-icon').css('background-image', 'url(' + iconURL + ')');
        if (gloss) {
          $('#smartbanner .sb-icon').addClass('gloss');
        }
      } else{
        $('#smartbanner').addClass('no-icon');
      }
      this.bannerHeight = $('#smartbanner').outerHeight() + 2;

      if (this.scale > 1) {
        $('#smartbanner')
          .css('top', parseFloat($('#smartbanner').css('top')) * this.scale)
          .css('height', parseFloat($('#smartbanner').css('height')) * this.scale)
          .hide();
        $('#smartbanner .sb-container')
          .css('-webkit-transform', 'scale(' + this.scale + ')')
          .css('-msie-transform', 'scale(' + this.scale + ')')
          .css('-moz-transform', 'scale(' + this.scale + ')')
          .css('width', $(window).width() / this.scale);
      }
      $('#smartbanner')
        .css('position', this.options.layer ? 'absolute' : 'static');
    },

    listen: function() {
      $('#smartbanner .sb-close').on('click', $.proxy(this.close, this));
      $('#smartbanner .sb-button').on('click', $.proxy(this.install, this));
    },

    show: function(callback) {
      var banner = $('#smartbanner');
      banner.stop();

      if (this.options.layer) {
        banner
          .animate({ top: 0, display: 'block' }, this.options.speedIn)
          .addClass('shown')
          .show();
        $(this.pushSelector)
          .animate({
            paddingTop: this.origHtmlMargin + (this.bannerHeight * this.scale)
          }, this.options.speedIn, 'swing', callback);
      }
      else {
        if ($.support.transition) {
          banner.animate({ top: 0 }, this.options.speedIn).addClass('shown');
          var transitionCallback = function() {
            $('html').removeClass('sb-animation');
            if (callback) {
              callback();
            }
          };
          $(this.pushSelector)
            .addClass('sb-animation')
            .one($.support.transition.end, transitionCallback)
            .emulateTransitionEnd(this.options.speedIn)
            .css('margin-top', this.origHtmlMargin + (this.bannerHeight * this.scale));
        }
        else {
          banner
            .slideDown(this.options.speedIn)
            .addClass('shown');
        }
      }
    },

    hide: function(callback) {
      var banner = $('#smartbanner');
      banner.stop();

      if (this.options.layer) {
        banner.animate({
          top: -1 * this.bannerHeight * this.scale,
          display: 'block'
        }, this.options.speedIn)
        .removeClass('shown');

        $(this.pushSelector)
          .animate({
            paddingTop: this.origHtmlMargin
          }, this.options.speedIn, 'swing', callback);
      }
      else {
        if ($.support.transition) {
          if (this.type !== 'android') {
            banner
              .css('top', -1 * this.bannerHeight * this.scale)
              .removeClass('shown');
          }
          else {
            banner
              .css({display:'none'})
              .removeClass('shown');
          }
          var transitionCallback = function() {
            $('html').removeClass('sb-animation');
            if (callback) {
              callback();
            }
          };
          $(this.pushSelector)
            .addClass('sb-animation')
            .one($.support.transition.end, transitionCallback)
            .emulateTransitionEnd(this.options.speedOut)
            .css('margin-top', this.origHtmlMargin);
        }
        else {
          banner.slideUp(this.options.speedOut).removeClass('shown');
        }
      }
    },

    close: function(e) {
      e.preventDefault();
      this.hide();
      this.setCookie('sb-closed', 'true', this.options.daysHidden);
      this.options.onClose(e);
    },

    install: function(e) {
      if (this.options.hideOnInstall) {
        this.hide();
      }
      this.setCookie('sb-installed', 'true', this.options.daysReminder);
      this.options.onInstall(e);
    },

    setCookie: function(name, value, exdays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + exdays);
      value = encodeURI(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString());
      document.cookie = name + '=' + value + '; path=/;';
    },

    getCookie: function(name) {
      var i, x, y, ARRcookies = document.cookie.split(';');
      for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, '');
        if (x == name) {
          return decodeURI(y);
        }
      }
      return null;
    },

    // Demo only.
    switchType: function() {
      var that = this;

      this.hide(function() {
        that.type = that.type == 'android' ? 'ios' : 'android';
        var meta = $(that.type == 'android' ? 'meta[name="google-play-app"]' : 'meta[name="apple-itunes-app"]').attr('content');
        that.appId = /app-id=([^\s,]+)/.exec(meta)[1];

        $('#smartbanner').detach();
        that.create();
        that.show();
      });
    }
  };

  $.smartbanner = function(option) {
    var $window = $(window);
    var data = $window.data('smartbanner');
    var options = typeof option == 'object' && option;
    if (!data) {
      $window.data('smartbanner', (data = new SmartBanner(options)));
    }
    if (typeof option == 'string') {
      data[option]();
    }
  };

  // override these globally if you like (they are all optional)
  $.smartbanner.defaults = {
    title: null, // What the title of the app should be in the banner (defaults to <title>)
    author: null, // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
    price: 'FREE', // Price of the app
    appStoreLanguage: 'us', // Language code for App Store
    inAppStore: 'On the App Store', // Text of price for iOS
    inGooglePlay: 'In Google Play', // Text of price for Android
    inAmazonAppStore: 'In the Amazon Appstore',
    inWindowsStore: 'In the Windows Store', //Text of price for Windows
    GooglePlayParams: null, // Aditional parameters for the market
    icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
    iconGloss: null, // Force gloss effect for iOS even for precomposed
    button: 'VIEW', // Text for the install button
    url: null, // The URL for the button. Keep null if you want the button to link to the app store.
    scale: 'auto', // Scale based on viewport size (set to 1 to disable)
    speedIn: 300, // Show animation speed of the banner
    speedOut: 400, // Close animation speed of the banner
    daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
    daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
    force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
    hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
    layer: false, // Display as overlay layer or slide down the page
    iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
    appendToSelector: 'body', //Append the banner to a specific selector
    pushSelector: 'html' // What element is going to push the site content down; this is where the banner append animation will start.
  };

  $.smartbanner.Constructor = SmartBanner;

  // ============================================================
  // Bootstrap transition
  // Copyright 2011-2014 Twitter, Inc.
  // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)

  function transitionEnd () {
    var el = document.createElement('smartbanner');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {end: transEndEventNames[name]};
      }
    }
    // Explicit for ie8.
    return false;
  }
  if ($.support.transition !== undefined) {
    // Prevent conflict with Twitter Bootstrap.
    return;
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function(duration) {
    var called = false, $el = this;
    $(this).one($.support.transition.end, function() {
      called = true;
    });
    var callback = function() {
      if (!called) {
        $($el).trigger($.support.transition.end);
      }
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function() {
    $.support.transition = transitionEnd();
  });
  // ============================================================
});
;
/**
 * @file
 * Smart Banner related fix.
 */

(function ($) {
  Drupal.behaviors.smartbanner = {
    attach: function (context, settings) {
      // Add Smart banner only for Andorid device.
      if (navigator.userAgent.indexOf('mp_cordova_app') === -1 && navigator.userAgent.match(/Android/i) != null) {
        // Adding smart banner class to page div.
        $('#page').addClass('smartbanner-app');

        // Add class to body to position share icon on new job detail page.
        if ($('#page').hasClass('new-job-detail-ui')) {
          $("body.new-job-detail-flow").addClass('at-share-with-smartbanner');
        }

        $.smartbanner({
          title: Drupal.settings.smartbanner.title,
          author:Drupal.settings.smartbanner.sub_title,
          button: Drupal.settings.smartbanner.download,
          icon: Drupal.settings.smartbanner.banner_icon,
          inGooglePlay: '',
          price: Drupal.settings.smartbanner.free_text,
          onInstall: function () {
            $('#page').removeClass('smartbanner-app');
            // Remove class from body when smartbanner install.
            $("body.new-job-detail-flow").removeClass('at-share-with-smartbanner');
          },
          onClose: function () {
            $('#page').removeClass('smartbanner-app');
            // Remove class from body when smartbanner closed.
            $("body.new-job-detail-flow").removeClass('at-share-with-smartbanner');
          }
        });

        // If banner close or install button already clicked.
        if (
            $.cookie('sb-installed') != undefined && $.cookie('sb-installed').length > 0
            || $.cookie('sb-closed') != undefined && $.cookie('sb-closed').length > 0
        ) {
          $('#page').removeClass('smartbanner-app');

          // Remove class from body when smartbanner closed.
          if ($('#page').hasClass('new-job-detail-ui')) {
            $("body.new-job-detail-flow").removeClass('at-share-with-smartbanner');
          }
        }
      }
    }
  };
})(jQuery);

jQuery(document).ready(function(){
  jQuery(window).scroll(function (event) {
    if (navigator.userAgent.indexOf('mp_cordova_app') === -1 && navigator.userAgent.match(/Android/i) != null) {
      var header = document.getElementById("header");
      var scroll = $(window).scrollTop();

      // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position.
      if (scroll >= 51) {
        header.classList.add("sticky");
      }
      else {
        header.classList.remove("sticky");
      }
    }
  });
});
;
/**
 * @file
 * Mobile App related fix.
 */

(function ($) {
  Drupal.behaviors.mobileUpdate = {
    attach: function (context, settings) {

      if (navigator.userAgent.indexOf('mp_cordova_app_ios') === -1 
        && navigator.userAgent.indexOf('mp_cordova_app_tempapp') === -1
        && navigator.userAgent.indexOf('mp_cordova_app') >= 0) {
        // Show update popup for Android apps.
        var android_app_url = Drupal.settings.android_app_url;
        var show_popup = Drupal.settings.mp_app_update_popup.android_update_popup;
        if (show_popup) {
          showUpdatePopup(android_app_url);
        }
      }

      // Check the mobile app user agent present.
      if (navigator.userAgent.indexOf('mp_cordova_app') >= 0) {
        // Add class to page div for mobile app.
        $('body').addClass('mp-mobile-app-body');
        $('#page').addClass('mp-mobile-app');

        //To fix footer on android devices for MAN-1052 ticket on forgot password page
        if (navigator.userAgent.indexOf('mp_cordova_app_android') >= 0 && $('body').hasClass('page-user-password')) {
          $('body').addClass('mp-mobile-app-fix-footer-body');
          $('#page').addClass('mp-mobile-app-fix-footer-page');
          $('#main').addClass('mp-mobile-app-fix-footer-main');
          $('#footer').addClass('mp-mobile-app-fix-footer-footer');
        }

        // Update the Login link for Mobile app.
        $('.user-links .sign-in a, .mypage-menu-item .anonymous').attr('href', '#native_login');

        // Update the change password link for Mobile app.
        // Remove this condition once the change password screen added in MP and PP UK app.
        if (navigator.userAgent.indexOf('mp_cordova_app_tempapp') === -1) {
          $('#mypage-account-setting').attr('href', '#native_change_password');
        }

        // For MAN-983 - New native homepage
        if (($.cookie('native_homepage_impl') != undefined && $.cookie('native_homepage_impl') == 'true')) {
          $('.logo #logo, .main-nav-list .first a, .ios-nav-bar .home-button').attr('href', '#homepage');
        }

        // If page content is less fix the footer to the bottom.
        _mp_mobile_app_footer_fix('true');

        $('.personal-details-non-editable .edit-link').click(function(e) {
          $('#footer').removeClass('fix-footer');
        });

        $('.editable-personal-details .prsnl-cancel').click(function(e) {
          _mp_mobile_app_footer_fix('true');
        });

        // Update the Register link for Mobile app.
        var hostname = window.location.hostname;
        if (hostname.indexOf("pagepersonnel.fr") >= 0) {
          $('#meganav-mega_menu_career_centre .panel-col-first .pane-node:eq(0) .menu-box-content li:eq(4) a').attr('href', '#native_register');
          $('#meganav-mega_menu_career_centre .panel-col-last .pane-node:eq(0) .menu-box-content li.last a').attr('href', '#native_register');
        }
        
        $(".not-logged-in #job-browse-search-page #job-search-page-buttons li.first a").attr('href', '#native_register');

        // Remove onclick attribute to avoid double click.
        $("#hybrid-mobile-app-settings a").click(function(e)  {
          $(this).removeAttr("onclick");
        });

        // For MAN-464 changes.
        if (($.cookie('handleNoNetwork') != undefined && $.cookie('handleNoNetwork') == 'true')) {
          $("a.mobile-app-setting").removeAttr("onclick").attr('href', '#mobileappsetting');
          $('.logout-link a').attr('href', "#logout");
        }

        // Add class for WKWebView.
        if ($.cookie('isWKWebViewAvailable') != undefined && $.cookie('isWKWebViewAvailable') == 'true') {
          $('body').addClass('wk-web-view');
        }

        // Add autocomplete=off to all inputs.
        $('input.form-text').attr('autocomplete', 'off');

        // Hide PDF links.
        $(".right-content .free-text a").each(function(){
          var link_href = $(this).attr('href');
          if (link_href.indexOf(".pdf") >= 0) {
            $(this).hide();
          }
        });
      }
      
      // Bottom nav bar only for Tempapp.
      if (navigator.userAgent.indexOf('mp_cordova_app_tempapp') >= 0) {
        $('#page').addClass('mp-mobile-tempapp');
        
        // Change the logout and setting page URL for mobile temp app.
        if ($('body').hasClass('site-name-PP_UK') || $('body').hasClass('site-name-PP_GB')) {
          $('.logout-link a').attr('href', "#logout");
          $('#mypage-account-setting').attr('href', '#native_change_password');
        }

        // Showing temp job main-menu item in tempapp and changing href for login user.
        var main_menu_tempitem = '.main-nav-list .main_menu_item_tempapp';
        $(main_menu_tempitem).parent().show();
        if ($("body").hasClass("logged-in")) {
          $(main_menu_tempitem).attr('href', '#tempapp_roles');  
        } else {
          $(main_menu_tempitem).attr('href', '#tempapp_login');  
        }
        // Adding disable class to fade back and forward button.  
        if (document.referrer.length < 1) {
          $('.back, .forward').prop('onclick',null).off('click').addClass('disabled');
        }
        
        // Set cookie for forward button to work.
        var back_link = $.cookie('back-link');
        if (back_link === 0 || back_link === null) {
          $('.forward').prop('onclick',null).off('click').addClass('disabled');
        }
        
        // Hide nav bar if the keypad in open state.
        $(document).on('focus', 'textarea, input.form-text, select', function() {
          if (!$('body').hasClass('hide-ios-footer')) {
            $('.mp-mobile-app-ios .ios-nav-bar').css('display', 'none');
          }

          $('.mypage-menu-wrapper').css('display', 'none');
          $('#header').css('position', 'absolute');
        }).on('blur', 'textarea, input.form-text, select', function() {
          if (!$('body').hasClass('hide-ios-footer')) {
            $('.mp-mobile-app-ios .ios-nav-bar').css('display', 'block');
          }

          $('.mypage-menu-wrapper').css('display', 'block');
          $('#header').css('position', 'fixed');
        }).on('touchend', 'input.form-submit', function(){
          if (!$('body').hasClass('hide-ios-footer')) {
            $('.mp-mobile-app-ios .ios-nav-bar').css('display', 'block');
          }

          $('.mypage-menu-wrapper').css('display', 'block');
          $('#header').css('position', 'fixed');
        });        
      }

      // Show back nav bar only for iPhone and iPad.
      if (navigator.userAgent.indexOf('mp_cordova_app_ios') >= 0) {
        // Show update popup for iOS apps.
        var ios_app_url = Drupal.settings.ios_app_url;
        var show_popup = Drupal.settings.mp_app_update_popup.ios_update_popup;
        if (show_popup) {
          showUpdatePopup(ios_app_url);
        }

        $('#page').addClass('mp-mobile-app-ios');

        if (document.referrer.length < 1) {
          $('.back, .forward').prop('onclick',null).off('click').addClass('disabled');
        }

        var back_link = $.cookie('back-link');
        if (back_link === 0 || back_link === null) {
          $('.forward').prop('onclick',null).off('click').addClass('disabled');
        }

        // Update the external links href.
        $(".mega-menu .panel-panel a").each(function() {
          var link_href = $(this).attr('href');
          if (link_href.indexOf(window.location.hostname) === -1  && ($.cookie('handleExternalLinkinApp') == undefined || $.cookie('handleExternalLinkinApp') != 'true')) {
            var link_text = $(this).html();

            if (link_text === "Michael Page") {
              $(this).attr('href', "#michaelpage");
            }
            else if (link_text.indexOf("Interim Management") >= 0) {
              $(this).attr('href', "#interim");
            }
            else if (link_text.indexOf("Page Executive") >= 0) {
              $(this).attr('href', "#pageexecutive");
            }
            else if (link_text.indexOf("Page Talent") >= 0) {
              $(this).attr('href', "#pageTalent");
            }
            else if (this.href.indexOf("pageonline.fr") >= 0) {
              $(this).attr('href', "#pageonline");
            }
            else if (this.href.indexOf("www.page.com") >= 0) {
              $(this).attr('href', "#pagegroup");
            }
            else if (link_text === "Timesheet portal") {
              $(this).attr('href', "#timesheet");
            }
          }
        });

        if (($.cookie('handleExternalLinkinApp') == undefined || $.cookie('handleExternalLinkinApp') != 'true')) {
          $('#block-menu-menu-about-michael-page li.pagegroup a').attr('href', '#pagegroup');
          $('#block-menu-menu-about-michael-page li.investisseurs a').attr('href', '#investisseurs');
          $('#block-menu-menu-about-michael-page li.investors-site a').attr('href', '#investisseurs');
          $('#block-menu-menu-about-michael-page li.page-personnel a').attr('href', '#michaelpage');
          $('#block-menu-menu-about-michael-page li.page-executive a').attr('href', '#pageexecutive');
          $('#block-menu-menu-about-michael-page li.page-talent a').attr('href', '#pageTalent');
          $('#block-menu-menu-about-michael-page li.pagegroup-corporate-site a').attr('href', '#pagegroup');
          $('#block-menu-menu-about-michael-page li.corporate-site a').attr('href', '#pagegroup');
          $('#meganav-mega_menu_career_centre .panel-col-last .pane-node:eq(1) .pane-content a').attr('href', '#cvcatcher');
          $('#meganav-conseils_blog_minipanel .panel-col-last .pane-node:eq(1) .pane-content a').attr('href', '#expertise');

          // Update Social icon links to open in Safari browser.
          $('.socialtools li a').each(function() {
            var alt_text = $('img', $(this)).attr('alt');
            var social = alt_text.split(' ');
            var count = social.length;

            var link_href = $(this).attr('href');
            if (link_href.indexOf(window.location.hostname) === -1) {
              $(this).removeAttr('target');
              $(this).attr('href', '#' + social[count - 1].toLowerCase());
            }
          });
        }

        var ratio = window.devicePixelRatio || 1;
        // Define the users device screen dimensions.
        var screen = {
          width : window.screen.width * ratio,
          height : window.screen.height * ratio
        };

        // iPhone X and above Detection.
        var width = [1125, 750, 1242];
        var height = [2436, 1624, 2688];

        if (jQuery.inArray(screen.width , width ) >= 0 && jQuery.inArray(screen.height , height ) >= 0) {
          $("meta[name='viewport']").attr('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover');
          $('#page').addClass('mp-mobile-iphonex');
          $('body').addClass('mp-mobile-iphonex-body');
        }

        // Hide nav bar if the keypad in open state.
        $(document).on('focus', 'textarea, input.form-text, select', function() {
          if (!$('body').hasClass('hide-ios-footer')) {
            $('.mp-mobile-app-ios .ios-nav-bar').css('display', 'none');
          }

          $('.mypage-menu-wrapper').css('display', 'none');
          $('#header').css('position', 'absolute');
        }).on('blur', 'textarea, input.form-text, select', function() {
          if (!$('body').hasClass('hide-ios-footer')) {
            $('.mp-mobile-app-ios .ios-nav-bar').css('display', 'block');
          }

          $('.mypage-menu-wrapper').css('display', 'block');
          $('#header').css('position', 'fixed');
        }).on('touchend', 'input.form-submit', function(){
          if (!$('body').hasClass('hide-ios-footer')) {
            $('.mp-mobile-app-ios .ios-nav-bar').css('display', 'block');
          }

          $('.mypage-menu-wrapper').css('display', 'block');
          $('#header').css('position', 'fixed');
        });
      }

      // Set cookie if the back button clicked.
      $(document).on('click', 'a', function() {
        if (((navigator.userAgent.indexOf('mp_cordova_app_ios') >= 0) || (navigator.userAgent.indexOf('mp_cordova_app_tempapp') >= 0)) && navigator.userAgent.indexOf('mp_cordova_app_android') === -1) {

          var $this = $(this);

          if ($this.parent().hasClass('ios-nav-bar') && $this.hasClass('back')) {
            $.cookie('back-link', 1, {path: '/' });
          }
          else {
            $.cookie('back-link', 0, {path: '/' });
          }
        }
        // Add loader for Android, tempapp and IOS apps.
        if (navigator.userAgent.indexOf('mp_cordova_app_android') >= 0 || navigator.userAgent.indexOf('mp_cordova_app_ios') >= 0 || navigator.userAgent.indexOf('mp_cordova_app_tempapp') >= 0) {
          var link_href = $(this).attr('href');

          // Check the link href has valid url. If valid add the loader.
          if (!$(this).hasClass('flag-processed')
            && !$(this).hasClass('apply-link')
            && !$(this).hasClass('set-as-default-cv')
            && link_href.indexOf('#browse') === -1
            && link_href.indexOf('#block-mp-jobs-structure-mp-job-summary-block') === -1
            && link_href.indexOf('#block-mp-similar-jobs-mp-similar-jobs-view') === -1
            && link_href.indexOf('#job-description') === -1
            && link_href.indexOf('#native') === -1
            && link_href !== "#"
            && link_href.indexOf('javascript:void') === -1) {
            $('div .native_mobile').addClass('native_mobile_loader');
          }
        }
      });

      // Set horizontal loader for span tags data-urls .
      $(document).on('click', 'span', function() {
        // Add loader for Android, tempapp and IOS apps.
        if (navigator.userAgent.indexOf('mp_cordova_app_android') >= 0 || navigator.userAgent.indexOf('mp_cordova_app_ios') >= 0 || navigator.userAgent.indexOf('mp_cordova_app_tempapp') >= 0) {
          var link_data_url = $(this).attr('data-url');

          // Check the link data-url has valid url. If valid add the loader.
          if (typeof link_data_url !== 'undefined'
            && link_data_url !== false
            && !$(this).hasClass('flag-processed')
            && !$(this).hasClass('apply-link')
            && !$(this).hasClass('set-as-default-cv')
            && link_data_url.indexOf('#browse') === -1
            && link_data_url.indexOf('#block-mp-jobs-structure-mp-job-summary-block') === -1
            && link_data_url.indexOf('#block-mp-similar-jobs-mp-similar-jobs-view') === -1
            && link_data_url.indexOf('#job-description') === -1
            && link_data_url.indexOf('#native') === -1
            && link_data_url !== "#"
            && link_data_url.indexOf('javascript:void') === -1){
            $('div .native_mobile').addClass('native_mobile_loader');
          }
        }
      });

      $(document).ajaxComplete(function (event, request, settings) {
        $('div .native_mobile').removeClass('native_mobile_loader');
      });

      $('a#add-cv').once().on('click', function(){
        mobileAppendCV($(this).attr('class'));
      });
    }
  };
})(jQuery);

// Fix the mobile app footer.
function  _mp_mobile_app_footer_fix(fix_footer) {
  var page_height = $('#page').height() + $('#footer').height();

  if (navigator.userAgent.indexOf('mp_cordova_app_ios') >= 0 || navigator.userAgent.indexOf('mp_cordova_app_tempapp') >= 0) {
    page_height = page_height + $('.ios-nav-bar').height();
  }

  if ($('body').hasClass('page-mypage-personal-details')) {
    page_height = page_height + 50;
  }

  if (navigator.userAgent.indexOf('mp_cordova_app') >= 0
    && page_height < $(window).innerHeight()
    && ($('body').hasClass('page-mypage') || $('body').hasClass('page-user-password'))
    && fix_footer === 'true') {
    $('#footer').addClass('fix-footer');
  }
  else {
    $('#footer').removeClass('fix-footer');
  }
}

// Show update popup.
function showUpdatePopup(appUrl) {
  if ($('body').hasClass('front') && ($.cookie('mp_show_update_popup') == undefined || $.cookie('mp_show_update_popup') != 'false')) {
    var title = Drupal.settings.mp_app_update_popup.title;
    var update_text = Drupal.settings.mp_app_update_popup.update_text;
    var cancel_text = Drupal.settings.mp_app_update_popup.cancel_text;

    var full_message = '<p>'+ Drupal.settings.mp_app_update_popup.message +'</p><p class="buttons">';
    full_message += '<button class="login" name="login" value="Update" onclick="window.open(\'' + appUrl + '\', \'_system\')">' + update_text + '</button>';
    full_message += '<button class="secondary" onclick="update_popup_close()">' + cancel_text + '</button>';
    full_message += '</p>';

    if (($.cookie('mp_show_update_popup_cancel') == undefined) || ($.cookie('mp_show_update_popup_cancel') === 'false')) {
      Drupal.mp_utilities.popup.open($('#popup'), title, full_message, '', '', 'updatepopup');
    }
  }
}

// Close the update popup
function update_popup_close() {
  document.cookie = "mp_show_update_popup_cancel=true; path=/";
  jQuery('.ui-dialog-content').dialog('close');
};

// Remove an uploaded CV.
function mobileRemoveCV(element, cv_file_path) {
  mpSocialDeleteInstantUploadCV(element);
}

// Remove an uploaded CV in webform.
function mobileRemoveWebformCV() {
  jQuery('.webform-file-list').empty();
  jQuery('input[name="submitted[file_choose_file_input][fid]"]').val('');
}

// Append the value to form.
function mobileAppendCV(classname) {
  var file_fid = $.cookie('file_id');
  var file_name = $.cookie('file_name');
  var file_url = $.cookie('file_url');

  var cvRow = '';

  if (classname.indexOf('webform-browse') >=0) {
    cvRow = '<li class="uploaded-cv pdf"><span class="uploaded-file file-view-link">' + file_name + '</span>\n\
      <span class="upload-component"><a class="remove-link webform-file managed-file" href="javascript:void(0);" onclick="mobileRemoveWebformCV()">' + Drupal.t('Remove') + '</a></span></li>';

    if (jQuery('.webform-file-list').children().length == 0) {
      jQuery('.webform-file-list').append(cvRow);
    }

    jQuery('input[name="submitted[file_choose_file_input][fid]"]').val(file_fid);
  }

  else {
    // Remove if any error message related to CV upload.
    $(".cv-upload-messages").remove();

    var removeFunction = "mobileRemoveCV(this,\'" + file_url + "\')";
    var cvRow = '<li class="uploaded-cv pdf" index="' + file_fid + '"><span class="uploaded-file file-view-link">' + file_name + '</span>\n\
      <span class="upload-component"><a class="remove-link" href="javascript:void(0);" onclick="' + removeFunction + '" index="' + file_fid + '">' + Drupal.t('Remove') + '</a></span></li>';                

    var maxAllowedCvs = jQuery('#cv-instant-upload-fieldset input[name="max_allowed_cv"]').val();
    var uploadedVals = jQuery('input[name="instant_upload_cvs"]').val();

    jQuery('#cv-instant-upload').append(cvRow);
    var countFiles = $('#cv-instant-upload li').length;

    if (uploadedVals != '') {
      uploadedVals += ',';
    }

    if (countFiles > maxAllowedCvs) {
      $('#cv-instant-upload li').eq(0).remove();
      uploadedVals = uploadedVals.split(/,(.+)/)[1];
    }

    if (maxAllowedCvs == 1) {
      jQuery('input[name="instant_upload_cvs"]').val(file_fid);
    }
    else {
      jQuery('input[name="instant_upload_cvs"]').val(uploadedVals + file_fid);
    }

    _mp_mobile_app_footer_fix('false');
  }

  jQuery(".cv-upload-options").removeClass('show');
  jQuery("#cv-upload-submit").removeAttr("disabled").removeClass('form-button-disabled');
  jQuery('#mobile-app-browse .cv-browse').addClass('ui-state-disabled');
  jQuery(".upload-list a").removeClass('active');
  jQuery(".cv-upload-options #mobile-app-browse .cv-browse").removeClass("ui-state-disabled");
}
;
<!-- SmartSource shared (external file) -->
//<![CDATA[
function A(N,V){
	return "&"+N+"="+escape(V);
}
function dcsCreateImage(dcsSrc){
	if (false){
		document.writeln('SmartSource:\n'+ dcsSrc);
	} else if (document.images){
		gImages[gIndex]=new Image;
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}else{
		document.write('<img border="0" name="DCSIMG" width="1" height="1" src="'+dcsSrc+'" />');
	}
}
function dcsMeta(){
	var myDocumentElements;
	if (document.all){
		myDocumentElements=document.all.tags("meta");
	}else if (document.documentElement){
		myDocumentElements=document.getElementsByTagName("meta");
	}
	if (typeof(myDocumentElements)!="undefined"){
		for (var i=1;i<=myDocumentElements.length;i++){
			myMeta=myDocumentElements.item(i-1);
			if (myMeta.name){
				if (myMeta.name.indexOf('WT.')==0){
					WT[myMeta.name.substring(3)]=myMeta.content;
				}else if (myMeta.name.indexOf('DCSext.')==0){
					DCSext[myMeta.name.substring(7)]=myMeta.content;
				}else if (myMeta.name.indexOf('DCS.')==0){
					DCS[myMeta.name.substring(4)]=myMeta.content;
				}
			}
		}
	}
}
function dcsTag(TagImage){
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+TagImage+"/dcs.gif?";
	for (N in DCS){
		if (DCS[N]) {
			P+=A(N,DCS[N]);
		}
	}
	for (N in WT){
		if (WT[N]) {
			P+=A("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]) {
			P+=A(N,DCSext[N]);
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImage(P);
}

function getFlashVersion() {
  var hasFlash = 0;
  if (navigator.plugins && navigator.plugins.length) {
    plgFlash = navigator.plugins["Shockwave Flash"];
    if (plgFlash) {
      if (plgFlash.description) {
        plgDesc = plgFlash.description;
        hasFlash = plgDesc.charAt(plgDesc.indexOf('.')-1);
      }
    } else {
      hasFlash = -1;
    }
    if (navigator.plugins["Shockwave Flash 2.0"]) {
      hasFlash = 2;
    }
  } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
    mimeFlash = navigator.mimeTypes['application/x-shockwave-flash'];
    if (mimeFlash && mimeFlash.enabledPlugin) {
      hasFlash = 2;
    } else {
      hasFlash = -1;
    }
  } else if ( navigator.userAgent.toLowerCase().indexOf("msie 2") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 3") != -1 || navigator.userAgent.toLowerCase().indexOf("msie 4") != -1 ) {
    hasFlash = 0; // not detecting on IE < 5
  } else if ( navigator.userAgent.toLowerCase().indexOf("msie") != -1 && parseInt(navigator.appVersion) >= 4 && navigator.userAgent.toLowerCase().indexOf("win")!=-1 ) {
    for(var vLoop=9; vLoop>1; vLoop--){
      try {
        var objFlash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + vLoop);
        hasFlash = vLoop;
        break;
      } catch(e) { }
    }
  }
  return hasFlash;
}
//]]>

;
/**
 * @file
 */

(function ($) {
  Drupal.mp_utilities = {};
  Drupal.mp_utilities.popup = {};
  Drupal.mp_utilities.popup.open = function (popup, title, message, popupwidth, video, popupclass) {
    var $body = $('body');
    var $popupwidth = popupwidth;

    // Set the minwidth of popup
    if(popupwidth) {
      $popupwidth = popupwidth;
    }
    else {
      $popupwidth = Drupal.settings.mp_utilities_popup.minWidth;
    }

    popup.dialog({
      modal: Drupal.settings.mp_utilities_popup.modal,
      draggable: Drupal.settings.mp_utilities_popup.draggable,
      resizable: Drupal.settings.mp_utilities_popup.resizable,
      minWidth: $popupwidth,
      title: title,
      autoOpen: Drupal.settings.mp_utilities_popup.autoOpen,
      dialogClass: popupclass,
      open: function (event, ui) {
        if (video != undefined && video == true) {
          $(event.target).parent().css('position', 'absolute');
          $(event.target).parent().css('width', 'auto');
          $(event.target).parent().css('top', '20%');
          window.scrollTo(0, 0);
        }
        else {
          $(event.target).parent().css('top', '15%');
          $(event.target).parent().css('position', 'fixed');
        }
        $(event.target).parent().focus();
        $body.css('overflow', 'hidden');
        // Fix background on popup open in iOS.
        if ($body.hasClass('iOS')) {
          $body.addClass('fix-ios-body');
        }
      },
      close: function (event, ui) {
        $(".ui-widget-overlay").remove();
        $body.css('overflow', 'auto');
        // Unfix background on popup open in iOS.
        if ($body.hasClass('iOS')) {
          $body.removeClass('fix-ios-body');
        }
      }
    });

    if (message) {
      // As the theming hide the title in the modal, we need to reset it here:
      popup.html('<p><strong>' + title + '</strong></p>' + message);
      popup.dialog("open");
    }
  }

  // Popup close declaration.
  Drupal.mp_utilities.popup.close = function () {
    $(".ui-widget-overlay, .ui-dialog").remove();

    var $body = $('body');
    $body.css('overflow', 'auto');

    if ($body.hasClass('iOS')) {
      $body.removeClass('fix-ios-body');
    }
  }
})(jQuery);
;
/**
 * @file
 * The javascript file for mypage: saved search page.
 */

(function ($) {
  // Saved search callback for authenticated user.
  $.fn.saved_search_callback = function (status, type, html_id) {
    if (html_id != '' && html_id != undefined) {
      $(html_id).addClass('disable-submit');
      $(html_id).attr('disabled', 'disabled');
    }
  }

  // Signup successful callback.
  $.fn.mp_new_user_signup_callback = function (status, message) {
    title = '';
    popup_width = 920;
    if (status == 'success') {
      Drupal.mp_utilities.popup.open($('#popup'), title, message, popup_width);
    }
  }

  $(document).ready(function () {
    // When user clicks on any job title, add that div id in url as fragment.
    // It will do focus again when user comes back from job detail page.
    $('.view-job-basket .views-field-field-job-summary-title a, .view-job-basket a.view-job, .view-app-manager .views-field-field-job-summary-title a, .view-app-manager a.view-job').once().click(function (event) {
      // If the clicked job title has node_id as id in html.
      if (event.currentTarget.id != null && event.currentTarget.id != '') {
        var currentPageUrl = window.location.href;
        var newUrl = currentPageUrl;
        var NodeId = event.currentTarget.id;

        // If current page url already has 'pos' key in querystring.
        if (currentPageUrl.indexOf('pos=') !== -1) {
          var regExpression = new RegExp("[\\?&]pos=([^&#]*)");
          var delimeter = regExpression.exec(currentPageUrl)[0].charAt(0);
          newUrl = currentPageUrl.replace(regExpression, delimeter + 'pos=' + NodeId);
        }
        else {
          // If url already has query string params in url.
          if (currentPageUrl.indexOf('?') !== -1) {
            newUrl = currentPageUrl + '&pos=' + NodeId;
          }
          else {
            newUrl = currentPageUrl + '?pos=' + NodeId;
          }
        }

        // Set the cookie to redirect back from job details page.
        $.cookie("backSearchUrl", newUrl, { path: '/'});
        window.history.replaceState('', '', newUrl);
      }

      // Redirect window to clicked title link.
      window.location.href = event.currentTarget.href;
    });

    // Get Job Position param in URL.
    var pageQueryString = window.location.href;
    var regExpn = new RegExp('[?&]pos=([^&#]*)', 'i');
    jobPositionQueryStringObj = regExpn.exec(pageQueryString);

    if (jobPositionQueryStringObj != null && jobPositionQueryStringObj[1] != '' && jobPositionQueryStringObj[1] != 0) {
      var triggerPosition = jobPositionQueryStringObj[1];
      var triggerElementOffset = jQuery("#" + triggerPosition).offset();

      if (triggerElementOffset !== null && triggerElementOffset !== undefined) {
        jQuery("html, body").animate({ scrollTop: triggerElementOffset.top - 100}, 'fast');
      }
    }
  });

})(jQuery);

// Close the success message popup when continue button clicked after register or login.
function closePopUp() {
  Drupal.mp_utilities.popup.close();
}

// Create popup for anonymous user for saved job count.
function anonymous_user_saved_job_count() {
  var title = Drupal.settings.mp_anonymous_upload_stored_cv_settings.popup_title;
  var message = Drupal.settings.mp_anonymous_upload_stored_cv_settings.popup_desc;
  var full_message = '<p>' + message + '</p><p class="buttons">';
  var register_page = Drupal.settings.mp_anonymous_upload_stored_cv_settings.register_url;
  var login_url = '/mypage';

  var destinationUrl = '/mypage';

  // Force login redirection URLs.
  if (Drupal.settings.mp_anonymous_force_login_destination != undefined) {
    destinationUrl = Drupal.settings.mp_anonymous_force_login_destination.destination_login_path;
    register_page = Drupal.settings.mp_anonymous_force_login_destination.register_url;
  }

  if (navigator.userAgent.indexOf('mp_cordova_app') >= 0) {
    login_url = '#native_login';
    register_page = '#native_register';
  }

  full_message += '<button class="login" name="login" value="login" onclick="window.location.href=\'' + login_url + '?destination=' + destinationUrl + '\'">' + Drupal.t('Login') + '</button>';
  full_message += '<button class="register secondary" name="register" value="register" onclick="window.location.href=\'' + register_page + '\'">' + Drupal.t('Register') + '</button>';
  full_message += '</p>';

  Drupal.mp_utilities.popup.open(jQuery('#popup'), title, full_message);
}

// Remove an alert item confirmation popup.
function mp_saved_search_remove_confirm(removeReqUrl) {
  var title = Drupal.settings.mp_mypage_remove_alert.popup_title;
  var message = Drupal.settings.mp_mypage_remove_alert.popup_message;

  var full_message = '<p>' + message + '</p><p class="buttons">';

  full_message += '<button class="primary search-remove-confirm">' + Drupal.t('Confirm') + '</button>';
  full_message += '<button class="secondary" onclick="jQuery(\'#popup-delete-account\').html(\'\');jQuery(\'.ui-dialog-content\').dialog(\'close\')">' + Drupal.t('Cancel') + '</button>';
  full_message += '</p>';

  Drupal.mp_utilities.popup.open(jQuery('#popup'), title, full_message);

  // AJAX call to remove an alert.
  $('.search-remove-confirm').click(function () {
    if (removeReqUrl != '') {
      jQuery.ajax({
        url: removeReqUrl,
        success : function (response) {
          jQuery('.ui-dialog-content').dialog('close');

          if (response != '' && response != null) {
            var jsonData = jQuery.parseJSON(response);
            var $jobAlertScrollbar = $('#job_alerts .viewport');

            // If the existing viewport has a scrollbar remove it (this will be
            // re-applied as part of the attachBehaviors below).
            if ($jobAlertScrollbar.hasClass('ps-container')) {
              $jobAlertScrollbar.perfectScrollbar('destroy');
            }

            jQuery(jsonData.selector).html(jsonData.html);

            Drupal.attachBehaviors();
          }
        }
      });
    }
  });
}

// Remove a save job confirmation popup.
function mp_save_job_remove_confirm(removeReqUrl, id) {
  var title = Drupal.settings.mp_save_job_settings.popup_title;
  var message = Drupal.settings.mp_save_job_settings.popup_desc;

  var full_message = '<p>' + message + '</p><p class="buttons">';

  full_message += '<button class="primary job-remove-confirm">' + Drupal.t('Confirm') + '</button>';
  full_message += '<button class="secondary" onclick="jQuery(\'#popup-delete-account\').html(\'\');jQuery(\'.ui-dialog-content\').dialog(\'close\')">' + Drupal.t('Cancel') + '</button>';
  full_message += '</p>';

  Drupal.mp_utilities.popup.open(jQuery('#popup'), title, full_message);

  // AJAX call to remove a saved job.
  $('.job-remove-confirm').click(function () {
    if (removeReqUrl != '') {
      jQuery.ajax({
        url: removeReqUrl,
        success : function (response) {
          jQuery('.view-job-basket li.' + id).remove();
          jQuery('.ui-dialog-content').dialog('close');

          if (response != '' && response != null) {
            var jsonData = jQuery.parseJSON(response);

            jQuery(jsonData.selector).html(jsonData.html);

            var job_count = parseInt($(".mypage-saved-jobs span").html());
            jQuery('.block-mp-mypage-save-jobs-block a span, .mypage-saved-jobs span').html(jsonData.count);

            var page_title = $('h1.title').html();

            if ($(".view-job-basket .views-row").length < 1 && jsonData.count > 0) {
              window.location.reload();
            }

            if (job_count > 0) {
              $('h1.title').html(page_title.replace(job_count, jsonData.count));
            }
            else {
              $('h1.title').html(jsonData.count + " " + page_title);
            }
        
            if (jsonData.count == 0) {

              // If 0 remove job_present class from top save jobs link.
              jQuery('.block-mp-mypage-save-jobs-block a').removeClass("save_job_present");

              // If 0 display saved jobs empty text.
              $('.page-mypage-saved-jobs h1.title').hide();
              $(".page-mypage-saved-jobs #content-area").html('<div class="saved-jobs-empty">' + Drupal.settings.mp_mypage_saved_jobs_empty.text + "</div>");
            }
            Drupal.attachBehaviors();
          }
        }
      });
    }
  });
}

/**
 * Remove a non searchable/position filled saved job.
 */
function mp_saved_job_hide_confirm(removeReqUrl, id) {
  $.ajax({
    type: "POST",
    url: removeReqUrl,
    success:function (response) {
      if (response != '' && response != null) {
        var jsonData = jQuery.parseJSON(response);
        jQuery('#' + id).parents('li.views-row').remove();
        var rowCount = jQuery('.view-display-id-saved_jobs').find('li.views-row').length;

        if (rowCount == 0) {
          jQuery('.view-display-id-saved_jobs').children('.view-header').remove();
        }
        jQuery('#save_jobs_navigation_region_link span, .mypage-saved-jobs span').html(jsonData.count);
        jQuery('.page-mypage-saved-jobs h1.title').html(jsonData.count + ' ' + Drupal.t('Saved jobs'));
      }
      Drupal.attachBehaviors();
    }
  });
}

/**
 * Hide a non searchable/position filled applied job.
 */
function mp_applied_job_hide_confirm(removeReqUrl) {
  $.ajax({
    type: "POST",
    url: removeReqUrl,
    success:function (response) {
      if (response != '' && response != null) {
        var jsonData = jQuery.parseJSON(response);
        jQuery(jsonData.selector).html(jsonData.html);
        jQuery('#mypage-applied-jobs span').html(jsonData.count);
        jQuery('.page-mypage-applied-jobs h1.title').html(jsonData.count + ' ' + Drupal.t('Applied jobs'));
      }
      Drupal.attachBehaviors();
    }
  });
}

;
(function ($) {

/**
 * Attaches the autocomplete behavior to all required fields.
 */
Drupal.behaviors.autocomplete = {
  attach: function (context, settings) {
    var acdb = [];
    $('input.autocomplete', context).once('autocomplete', function () {
      var uri = this.value;
      if (!acdb[uri]) {
        acdb[uri] = new Drupal.ACDB(uri);
      }
      var $input = $('#' + this.id.substr(0, this.id.length - 13))
        .attr('autocomplete', 'OFF')
        .attr('aria-autocomplete', 'list');
      $($input[0].form).submit(Drupal.autocompleteSubmit);
      $input.parent()
        .attr('role', 'application')
        .append($('<span class="element-invisible" aria-live="assertive"></span>')
          .attr('id', $input.attr('id') + '-autocomplete-aria-live')
        );
      new Drupal.jsAC($input, acdb[uri]);
    });
  }
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).length == 0;
};

/**
 * An AutoComplete object.
 */
Drupal.jsAC = function ($input, db) {
  var ac = this;
  this.input = $input[0];
  this.ariaLive = $('#' + this.input.id + '-autocomplete-aria-live');
  this.db = db;

  $input
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event.
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow.
      this.selectDown();
      return false;
    case 38: // up arrow.
      this.selectUp();
      return false;
    default: // All other keys.
      return true;
  }
};

/**
 * Handler for the "keyup" event.
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // Shift.
    case 17: // Ctrl.
    case 18: // Alt.
    case 20: // Caps lock.
    case 33: // Page up.
    case 34: // Page down.
    case 35: // End.
    case 36: // Home.
    case 37: // Left arrow.
    case 38: // Up arrow.
    case 39: // Right arrow.
    case 40: // Down arrow.
      return true;

    case 9:  // Tab.
    case 13: // Enter.
    case 27: // Esc.
      this.hidePopup(e.keyCode);
      return true;

    default: // All other keys.
      if (input.value.length > 0 && !input.readOnly) {
        this.populatePopup();
      }
      else {
        this.hidePopup(e.keyCode);
      }
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field.
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = $(node).data('autocompleteValue');
  $(this.input).trigger('autocompleteSelect', [node]);
};

/**
 * Highlights the next suggestion.
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else if (this.popup) {
    var lis = $('li', this.popup);
    if (lis.length > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion.
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion.
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
  $(this.ariaLive).html($(this.selected).html());
};

/**
 * Unhighlights a suggestion.
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Hides the autocomplete suggestions.
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed.
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.select(this.selected);
  }
  // Hide popup.
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function () { $(popup).remove(); });
  }
  this.selected = false;
  $(this.ariaLive).empty();
};

/**
 * Positions the suggestions popup and starts a search.
 */
Drupal.jsAC.prototype.populatePopup = function () {
  var $input = $(this.input);
  var position = $input.position();
  // Show popup.
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = $('<div id="autocomplete"></div>')[0];
  this.popup.owner = this;
  $(this.popup).css({
    top: parseInt(position.top + this.input.offsetHeight, 10) + 'px',
    left: parseInt(position.left, 10) + 'px',
    width: $input.innerWidth() + 'px',
    display: 'none'
  });
  $input.before(this.popup);

  // Do search.
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received.
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches.
  var ul = $('<ul></ul>');
  var ac = this;
  for (key in matches) {
    $('<li></li>')
      .html($('<div></div>').html(matches[key]))
      .mousedown(function () { ac.hidePopup(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); })
      .data('autocompleteValue', key)
      .appendTo(ul);
  }

  // Show popup with matches, if any.
  if (this.popup) {
    if (ul.children().length) {
      $(this.popup).empty().append(ul).show();
      $(this.ariaLive).html(Drupal.t('Autocomplete popup'));
    }
    else {
      $(this.popup).css({ visibility: 'hidden' });
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      $(this.ariaLive).html(Drupal.t('Searching for matches...'));
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object.
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search.
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway. The pattern ../ is
  // stripped since it may be misinterpreted by the browser.
  searchString = searchString.replace(/^\s+|\.{2,}\/|\s+$/g, '');
  // Skip empty search strings, or search strings ending with a comma, since
  // that is the separator between search terms.
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before.
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search.
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function () {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion. We use Drupal.encodePath instead of
    // encodeURIComponent to allow autocomplete search terms to contain slashes.
    $.ajax({
      type: 'GET',
      url: Drupal.sanitizeAjaxUrl(db.uri + '/' + Drupal.encodePath(searchString)),
      dataType: 'json',
      jsonp: false,
      success: function (matches) {
        if (typeof matches.status == 'undefined' || matches.status != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see.
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        Drupal.displayAjaxError(Drupal.ajaxError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request.
 */
Drupal.ACDB.prototype.cancel = function () {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};

})(jQuery);
;
/*! jQuery Placeholder Plugin - v0.7.0 - 2013-02-18
* http://andrew-jones.com/jquery-placeholder-plugin
* Copyright (c) 2013 Andrew Jones; Licensed MIT */
(function(a){"use strict",a.extend({placeholder:{settings:{focusClass:"placeholderFocus",activeClass:"placeholder",overrideSupport:!1,preventRefreshIssues:!0}}}),a.support.placeholder="placeholder"in document.createElement("input"),a.fn.plVal=a.fn.val,a.fn.val=function(b){if(typeof b=="undefined")return a.fn.plVal.call(this);var c=a(this[0]),d=c.plVal(),e=a(this).plVal(b);return c.hasClass(a.placeholder.settings.activeClass)&&d===c.attr("placeholder")?(c.removeClass(a.placeholder.settings.activeClass),e):c.hasClass(a.placeholder.settings.activeClass)&&c.plVal()===c.attr("placeholder")?"":a.fn.plVal.call(this,b)},a(window).bind("beforeunload.placeholder",function(){var b=a("input."+a.placeholder.settings.activeClass);b.length>0&&b.val("").attr("autocomplete","off")}),a.fn.placeholder=function(b){return b=a.extend({},a.placeholder.settings,b),!b.overrideSupport&&a.support.placeholder?this:this.each(function(){var c=a(this);if(!c.is("[placeholder]"))return;if(c.is(":password"))return;b.preventRefreshIssues&&c.attr("autocomplete","off"),c.bind("focus.placeholder",function(){var c=a(this);this.value===c.attr("placeholder")&&c.hasClass(b.activeClass)&&c.val("").removeClass(b.activeClass).addClass(b.focusClass)}),c.bind("blur.placeholder",function(){var c=a(this);c.removeClass(b.focusClass),this.value===""&&c.val(c.attr("placeholder")).addClass(b.activeClass)}),c.triggerHandler("blur"),c.parents("form").submit(function(){c.triggerHandler("focus.placeholder")})})}})(jQuery);;
/**
 * jQuery Validation Plugin 1.11.0pre
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2012 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			if (options && options.debug && window.console) {
				console.warn( "nothing selected, can't validate, returning nothing" );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr('novalidate', 'novalidate');

		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator);

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function(ev) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = ev.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $(ev.target).hasClass('cancel') ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden;
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
		if ( $(this[0]).is('form')) {
			return this.validate().form();
		} else {
			var valid = true;
			var validator = $(this[0].form).validate();
			this.each(function() {
				valid &= validator.element(this);
			});
			return valid;
		}
	},
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];

		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages) {
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				}
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.dataRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function(element, event) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element, event) {
			if ( event.which === 9 && this.elementValue(element) === '' ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element, event) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element(element);
			}
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted) {
				this.element(element.parentNode);
			}
		},
		highlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				if (typeof value === "string") {
					value = value.split(/\s/);
				}
				$.each(value, function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				if (validator.settings[eventType]) {
          validator.settings['name_event'] = eventType;
					validator.settings[eventType].call(validator, this[0], event);
				}
			}
			$(this.currentForm)
				.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'] ",
					"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if (this.settings.invalidHandler) {
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid()) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element ) !== false;
			if (result) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			if (this.settings.showErrors) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this);
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
					return false;
				}

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[0];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.replace(' ', '.');
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		elementValue: function( element ) {
			var type = $(element).attr('type'),
				val = $(element).val();

			if ( type === 'radio' || type === 'checkbox' ) {
				return $('input[name="' + $(element).attr('name') + '"]:checked').val();
			}

			if ( typeof val === 'string' ) {
				return val.replace(/\r/g, "");
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			var val = this.elementValue(element);
			var result;

			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {

					result = $.validator.methods[method].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					if ( this.settings.debug && window.console ) {
						console.log("exception occured when checking element " + element.id + ", check the '" + rule.method + "' method", e);
					}
					throw e;
				}
			}
			if (dependencyMismatch) {
				return;
			}
			if ( this.objectLength(rules) ) {
				this.successList.push(element);
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		customDataMessage: function(element, method) {
			return $(element).data('msg-' + method.toLowerCase()) || (element.attributes && $(element).attr('data-msg-' + method.toLowerCase()));
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor === String ? m : m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined) {
					return arguments[i];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = $.validator.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function(toToggle) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements;
			for ( i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// check if we have a generated label, replace the message then
				if ( label.attr("generated") ) {
					label.html(message);
				}
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length ) {
					if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement(label, $(element) );
					} else {
						label.insertAfter(element);
					}
				}
			}
			if ( !message && this.settings.success ) {
				label.text("");
				if ( typeof this.settings.success === "string" ) {
					label.addClass( this.settings.success );
				} else {
					this.settings.success( label, element );
				}
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function(element) {
			var name = this.idOrName(element);
			return this.errors().filter(function() {
				return $(this).attr('for') === name;
			});
		},

		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function(element) {
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return (/radio|checkbox/i).test(element.type);
		},

		findByName: function( name ) {
			return $(this.currentForm).find('[name="' + name + '"]');
		},

		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) ) {
					return this.findByName(element.name).filter(':checked').length;
				}
			}
			return value.length;
		},

		depend: function(param, element) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
		},

		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},

		optional: function(element) {
			var val = this.elementValue(element);
			return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
		},

		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0) {
				this.pendingRequest = 0;
			}
			delete this.pending[element.name];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		number: {number: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function(className, rules) {
		if ( className.constructor === String ) {
			this.classRuleSettings[className] = rules;
		} else {
			$.extend(this.classRuleSettings, className);
		}
	},

	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		if ( classes ) {
			$.each(classes.split(' '), function() {
				if (this in $.validator.classRuleSettings) {
					$.extend(rules, $.validator.classRuleSettings[this]);
				}
			});
		}
		return rules;
	},

	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value;

			// support for <input required> in both html5 and older browsers
			if (method === 'required') {
				value = $element.get(0).getAttribute(method);
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if (value === "") {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr(method);
			}

			if (value) {
				rules[method] = value;
			} else if ($element[0].getAttribute("type") === method) {
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function(element) {
		var method, value,
			rules = {}, $element = $(element);
		for (method in $.validator.methods) {
			value = $element.data('rule-' + method.toLowerCase());
			if (value !== undefined) {
				rules[method] = value;
			}
		}
		return rules;
	},

	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
				case "string":
					keepRule = !!$(val.depends, element.form).length;
					break;
				case "function":
					keepRule = val.depends.call(element, element);
					break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			var parts;
			if (rules[this]) {
				if ($.isArray(rules[this])) {
					rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				} else if (typeof rules[this] === 'string') {
					parts = rules[this].split(/[\s,]+/);
					rules[this] = [Number(parts[0]), Number(parts[1])];
				}
			}
		});

		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data === "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			}
			if ( this.checkable(element) ) {
				return this.getLength(value, element) > 0;
			}
			return $.trim(value).length > 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] ) {
				this.settings.messages[element.name] = {};
			}
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param === "string" && {url:param} || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true || response === "true";
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						delete validator.invalid[element.name];
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.invalid[element.name] = true;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if (/[^0-9 \-]+/.test(value)) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) === 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param);
			if (this.settings.onfocusout) {
				target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
					$(element).valid();
				});
			}
			return value === target.val();
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
}(jQuery));
;
/*
 * Drupal.behaviors.ajaxHijackErrors
 * HiJack the ajax error reporting in D7. Avoiding the alert box for users
 * http://drupal.org/node/1232416 - comments: #93, #97, #98
 */

(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.ajaxHijackErrors = {
    attach:function(context, settings){
      if (typeof context !== 'undefined') { //run only if there is a context var
        window.console = window.console || {};
        var methods = ['log', 'warn', 'error'];
        for (var i = 0; i < methods.length; i++) {
          window.console[methods[i]] = window.console[methods[i]] || function() {};
        } //end for

        $.ajaxSetup({
          beforeSend: function(jqXHR, settings) {
            settings.error = function(jqXHR, textStatus, errorThrown) {
              //end user doesn't need to see debugging info
              {console.log('ajax error: ' + textStatus);};
            }; //end settings.error
          }, //end beforeSend
          error: function(xhr,status,error) {
            if (xhr.status == 0) {
              window.alert = function() {}; // Remove the drupal alert when request is terminated by the user.
            }
          }
        }); //end $.ajaxSetup
      } // end if (typeof context !== 'undefined')
    } // end attach:function(context, settings)
  } //end Drupal.behaviors.ajaxHijackErrors
})(jQuery, Drupal, this, this.document);
;
/*
 HTML5 Shiv v3.7.0 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
(function(l,f){function m(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function i(a){var b=n[a[o]];b||(b={},h++,a[o]=h,n[h]=b);return b}function p(a,b,c){b||(b=f);if(g)return b.createElement(a);c||(c=i(b));b=c.cache[a]?c.cache[a].cloneNode():r.test(a)?(c.cache[a]=c.createElem(a)).cloneNode():c.createElem(a);return b.canHaveChildren&&!s.test(a)?c.frag.appendChild(b):b}function t(a,b){if(!b.cache)b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag();
a.createElement=function(c){return!e.shivMethods?b.createElem(c):p(c,a,b)};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){b.createElem(a);b.frag.createElement(a);return'c("'+a+'")'})+");return n}")(e,b.frag)}function q(a){a||(a=f);var b=i(a);if(e.shivCSS&&!j&&!b.hasCSS){var c,d=a;c=d.createElement("p");d=d.getElementsByTagName("head")[0]||d.documentElement;c.innerHTML="x<style>article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}</style>";
c=d.insertBefore(c.lastChild,d.firstChild);b.hasCSS=!!c}g||t(a,b);return a}var k=l.html5||{},s=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,r=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,j,o="_html5shiv",h=0,n={},g;(function(){try{var a=f.createElement("a");a.innerHTML="<xyz></xyz>";j="hidden"in a;var b;if(!(b=1==a.childNodes.length)){f.createElement("a");var c=f.createDocumentFragment();b="undefined"==typeof c.cloneNode||
"undefined"==typeof c.createDocumentFragment||"undefined"==typeof c.createElement}g=b}catch(d){g=j=!0}})();var e={elements:k.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:"3.7.0",shivCSS:!1!==k.shivCSS,supportsUnknownElements:g,shivMethods:!1!==k.shivMethods,type:"default",shivDocument:q,createElement:p,createDocumentFragment:function(a,b){a||(a=f);
if(g)return a.createDocumentFragment();for(var b=b||i(a),c=b.frag.cloneNode(),d=0,e=m(),h=e.length;d<h;d++)c.createElement(e[d]);return c}};l.html5=e;q(f)})(this,document);
;
/*
 *
 * Copyright (c) 2006-2011 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 1.3
 * Demo: http://www.texotela.co.uk/code/jquery/numeric/
 *
 */
(function($) {
/*
 * Allows only valid characters to be entered into input boxes.
 * Note: fixes value when pasting via Ctrl+V, but not when using the mouse to paste
  *      side-effect: Ctrl+A does not work, though you can still use the mouse to select (or double-click to select all)
 *
 * @name     numeric
 * @param    config      { decimal : "." , negative : true }
 * @param    callback     A function that runs if the number is not valid (fires onblur)
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $(".numeric").numeric();
 * @example  $(".numeric").numeric(","); // use , as separater
 * @example  $(".numeric").numeric({ decimal : "," }); // use , as separator
 * @example  $(".numeric").numeric({ negative : false }); // do not allow negative values
 * @example  $(".numeric").numeric(null, callback); // use default values, pass on the 'callback' function
 *
 */
$.fn.numeric = function(config, callback)
{
	if(typeof config === 'boolean')
	{
		config = { decimal: config };
	}
	config = config || {};
	// if config.negative undefined, set to true (default is to allow negative numbers)
	if(typeof config.negative == "undefined") config.negative = true;
	// set decimal point
	var decimal = (config.decimal === false) ? "" : config.decimal || ".";
	// allow negatives
	var negative = (config.negative === true) ? true : false;
	// callback function
	var callback = typeof callback == "function" ? callback : function(){};
	// set data and methods
	return this.data("numeric.decimal", decimal).data("numeric.negative", negative).data("numeric.callback", callback).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur);
}

$.fn.numeric.keypress = function(e)
{
	// get decimal character and determine if negatives are allowed
	var decimal = $.data(this, "numeric.decimal");
	var negative = $.data(this, "numeric.negative");
	// get the key that was pressed
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	// allow enter/return key (only when in an input box)
	if(key == 13 && this.nodeName.toLowerCase() == "input")
	{
		return true;
	}
	else if(key == 13)
	{
		return false;
	}
	var allow = false;
	// allow Ctrl+A
	if((e.ctrlKey && key == 97 /* firefox */) || (e.ctrlKey && key == 65) /* opera */) return true;
	// allow Ctrl+X (cut)
	if((e.ctrlKey && key == 120 /* firefox */) || (e.ctrlKey && key == 88) /* opera */) return true;
	// allow Ctrl+C (copy)
	if((e.ctrlKey && key == 99 /* firefox */) || (e.ctrlKey && key == 67) /* opera */) return true;
	// allow Ctrl+Z (undo)
	if((e.ctrlKey && key == 122 /* firefox */) || (e.ctrlKey && key == 90) /* opera */) return true;
	// allow or deny Ctrl+V (paste), Shift+Ins
	if((e.ctrlKey && key == 118 /* firefox */) || (e.ctrlKey && key == 86) /* opera */
	|| (e.shiftKey && key == 45)) return true;
	// if a number was not pressed
	if(key < 48 || key > 57)
	{
		/* '-' only allowed at start and if negative numbers allowed */
		if(this.value.indexOf("-") != 0 && negative && key == 45 && (this.value.length == 0 || ($.fn.getSelectionStart(this)) == 0)) return true;
		/* only one decimal separator allowed */
		if(decimal && key == decimal.charCodeAt(0) && this.value.indexOf(decimal) != -1)
		{
			allow = false;
		}
		// check for other keys that have special purposes
		if(
			key != 8 /* backspace */ &&
			key != 9 /* tab */ &&
			key != 13 /* enter */ &&
			key != 35 /* end */ &&
			key != 36 /* home */ &&
			key != 37 /* left */ &&
			key != 39 /* right */ &&
			key != 46 /* del */
		)
		{
			allow = false;
		}
		else
		{
			// for detecting special keys (listed above)
			// IE does not support 'charCode' and ignores them in keypress anyway
			if(typeof e.charCode != "undefined")
			{
				// special keys have 'keyCode' and 'which' the same (e.g. backspace)
				if(e.keyCode == e.which && e.which != 0)
				{
					allow = true;
					// . and delete share the same code, don't allow . (will be set to true later if it is the decimal point)
					if(e.which == 46) allow = false;
				}
				// or keyCode != 0 and 'charCode'/'which' = 0
				else if(e.keyCode != 0 && e.charCode == 0 && e.which == 0)
				{
					allow = true;
				}
			}
		}
		// if key pressed is the decimal and it is not already in the field
		if(decimal && key == decimal.charCodeAt(0))
		{
			if(this.value.indexOf(decimal) == -1)
			{
				allow = true;
			}
			else
			{
				allow = false;
			}
		}
	}
	else
	{
		allow = true;
	}
	return allow;
}

$.fn.numeric.keyup = function(e)
{
	var val = this.value;
	if(val.length > 0)
	{
		// get carat (cursor) position
		var carat = $.fn.getSelectionStart(this);
		// get decimal character and determine if negatives are allowed
		var decimal = $.data(this, "numeric.decimal");
		var negative = $.data(this, "numeric.negative");
		
		// prepend a 0 if necessary
		if(decimal != "")
		{
			// find decimal point
			var dot = val.indexOf(decimal);
			// if dot at start, add 0 before
			if(dot == 0)
			{
				this.value = "0" + val;
			}
			// if dot at position 1, check if there is a - symbol before it
			if(dot == 1 && val.charAt(0) == "-")
			{
				this.value = "-0" + val.substring(1);
			}
			val = this.value;
		}
		
		// if pasted in, only allow the following characters
		var validChars = [0,1,2,3,4,5,6,7,8,9,'-',decimal];
		// get length of the value (to loop through)
		var length = val.length;
		// loop backwards (to prevent going out of bounds)
		for(var i = length - 1; i >= 0; i--)
		{
			var ch = val.charAt(i);
			// remove '-' if it is in the wrong place
			if(i != 0 && ch == "-")
			{
				val = val.substring(0, i) + val.substring(i + 1);
			}
			// remove character if it is at the start, a '-' and negatives aren't allowed
			else if(i == 0 && !negative && ch == "-")
			{
				val = val.substring(1);
			}
			var validChar = false;
			// loop through validChars
			for(var j = 0; j < validChars.length; j++)
			{
				// if it is valid, break out the loop
				if(ch == validChars[j])
				{
					validChar = true;
					break;
				}
			}
			// if not a valid character, or a space, remove
			if(!validChar || ch == " ")
			{
				val = val.substring(0, i) + val.substring(i + 1);
			}
		}
		// remove extra decimal characters
		var firstDecimal = val.indexOf(decimal);
		if(firstDecimal > 0)
		{
			for(var i = length - 1; i > firstDecimal; i--)
			{
				var ch = val.charAt(i);
				// remove decimal character
				if(ch == decimal)
				{
					val = val.substring(0, i) + val.substring(i + 1);
				}
			}
		}
		// set the value and prevent the cursor moving to the end
		this.value = val;
		$.fn.setSelection(this, carat);
	}
}

$.fn.numeric.blur = function()
{
	var decimal = $.data(this, "numeric.decimal");
	var callback = $.data(this, "numeric.callback");
	var val = this.value;
	if(val != "")
	{
		var re = new RegExp("^\\d+$|\\d*" + decimal + "\\d+");
		if(!re.exec(val))
		{
			callback.apply(this);
		}
	}
}

$.fn.removeNumeric = function()
{
	return this.data("numeric.decimal", null).data("numeric.negative", null).data("numeric.callback", null).unbind("keypress", $.fn.numeric.keypress).unbind("blur", $.fn.numeric.blur);
}

// Based on code from http://javascript.nwbox.com/cursor_position/ (Diego Perini <dperini@nwbox.com>)
$.fn.getSelectionStart = function(o)
{
	if (o.createTextRange)
	{
		var r = document.selection.createRange().duplicate();
		r.moveEnd('character', o.value.length);
		if (r.text == '') return o.value.length;
		return o.value.lastIndexOf(r.text);
	} else return o.selectionStart;
}

// set the selection, o is the object (input), p is the position ([start, end] or just start)
$.fn.setSelection = function(o, p)
{
	// if p is number, start and end are the same
	if(typeof p == "number") p = [p, p];
	// only set if p is an array of length 2
	if(p && p.constructor == Array && p.length == 2)
	{
		if (o.createTextRange)
		{
			var r = o.createTextRange();
			r.collapse(true);
			r.moveStart('character', p[0]);
			r.moveEnd('character', p[1]);
			r.select();
		}
		else if(o.setSelectionRange)
		{
			o.focus();
			o.setSelectionRange(p[0], p[1]);
		}
	}
}

})(jQuery);;
/**
 * @file Mp_utilities.search.inc
 *
 *  Utilities for search features (browse included).
 */

/**
 * Set Maximum salary value.
 *
 * @param object eleMax
 *   The Max salary form element.
 * @param int salaryBaseMin
 *   The default min salary.
 * @param int salaryBaseMax
 *   The default max salary.
 * @param array salaryMinOpt
 *   The min salary.
 * @param array salaryMaxOpt
 *   The max salary.
 * @param object eleMin
 *   The Min salary form element.
 *
 * @return bool
 *   FALSE when invalid selection.
 */
function selectMaxSal(eleMax, salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt, eleMin) {

  var selectedMax = eleMax.val();

  if (salaryBaseMin && (selectedMax < salaryBaseMin)) {
    eleMax.val(salaryBaseMin);
  }
  else if (salaryBaseMax && (eleMax.val() > salaryBaseMax)) {
    eleMax.val(salaryBaseMax);
  }

  var to = parseInt(selectedMax);
  to = isNaN(to) ? salaryBaseMin : to;

  if (selectedMax == 'max') {
    to = salaryBaseMax;
  }
  var from = parseInt(eleMin.val());
  from = isNaN(from) ? salaryBaseMax : from;
  if (eleMin.val() == 'min') {
    from = salaryBaseMin;
  }

  if (to <= from) {
    var found = false;
    for (i = 0; i < salaryMaxOpt.length; i++) {
      if (from == parseInt(salaryMaxOpt[i]) && i + 1 < salaryMaxOpt.length) {
        eleMax.val(salaryMaxOpt[i + 1]);
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
}

/**
 * Set Minimum salary value.
 *
 * @param object eleMin
 *   The Min salary form element.
 * @param int salaryBaseMin
 *   The default min salary.
 * @param int salaryBaseMax
 *   The default max salary.
 * @param array salaryMinOpt
 *   The min salary.
 * @param array salaryMaxOpt
 *   The max salary.
 * @param object eleMax
 *   The Max salary form element.
 *
 * @return bool
 *   FALSE when invalid selection.
 */
function selectMinSal(eleMin, salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt, eleMax) {
  var selectedMin = eleMin.val();

  if (salaryBaseMin && (selectedMin < salaryBaseMin)) {
    eleMin.val(salaryBaseMin);
  }
  else if (salaryBaseMax && (selectedMin > salaryBaseMax)) {
    eleMin.val(salaryBaseMax);
  }

  var from = parseInt(selectedMin);
  from = isNaN(from) ? salaryBaseMin : from;

  var to = parseInt(eleMax.val());
  to = isNaN(to) ? salaryBaseMax : to;

  if (from >= to) {
    var found = false;
    for (i = 0; i < salaryMinOpt.length; i++) {
      if (to == parseInt(salaryMinOpt[i]) && i > 0) {
        eleMin.val(salaryMinOpt[i - 1]);
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
}
;
/**
 * @file
 */

var $ = jQuery;

$(function () {
  // Get the site default salary range.
  var salaryBaseMin = Drupal.settings.mp_jobs_search.salaryMin;
  var salaryBaseMax = Drupal.settings.mp_jobs_search.salaryMax;
  var salaryMinOpt = $.parseJSON(Drupal.settings.mp_jobs_search.salaryMinOpt);
  var salaryMaxOpt = $.parseJSON(Drupal.settings.mp_jobs_search.salaryMaxOpt);
  var salaryRange = Drupal.settings.mp_jobs_search.salaryRange;
  var MulticurrencySalaryRangeInfo = Drupal.settings.mp_jobs_search.MulticurrencySalaryRangeInfo;

  // Get the slider values from cookie.
  var keywords = '';
  var location = '';
  var symbol = '';
  var searchCookie = getSearchCookieValues(symbol, salaryBaseMin, salaryBaseMax, $.cookie('Drupal.visitor.mpsearch'));

  // Set the keyword/location from the processed keyword/location value.
  if (Drupal.settings.mp_jobs_search_user_searches != undefined && Drupal.settings.mp_jobs_search_user_searches.keyword !== 'Job Match') {
    $('input.job-search-keyword').val(Drupal.settings.mp_jobs_search_user_searches.keyword);
    $('input.job-search-location').val(Drupal.settings.mp_jobs_search_user_searches.location);
  }
  // Set the keyword/location input value from the cookie if set.
  else {
    $('input.job-search-keyword').val($.cookie('search_keyword'));
    $('input.job-search-location').val($.cookie('search_location'));
  }

  if (searchCookie.symbol) {
    // Parse SalaryRange object.
    obj = JSON.parse(MulticurrencySalaryRangeInfo);
    var salary_min_option = obj[searchCookie.symbol].min;

    // Update salary min range option based on currency symbol.
    salaryMinOpt = Object.keys(salary_min_option);
    salaryBaseMin = parseInt(salaryMinOpt[0]);
    var selectbox = $('#block-views-exp-job-search-job-search #edit-field-job-salary-min, #views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-min');
    selectbox.empty();

    $.each(salary_min_option, function (key, value) {
      selectbox.append($("<option></option>").attr("value", parseInt(key)).text(value));
    });

    // Update salary max range option based on currency symbol.
    var salary_max_option = obj[searchCookie.symbol].max;
    salaryMaxOpt = Object.keys(salary_max_option);
    var maxSelectBox = $('#block-views-exp-job-search-job-search #edit-field-job-salary-max, #views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-max');
    maxSelectBox.empty();

    $.each(salary_max_option, function (key, value) {
      maxSelectBox.append($("<option></option>").attr("value", parseInt(key)).text(value));
    });
    // Show last option selected always.
    maxSelectBox.find("option:last").attr("selected","selected");
    salaryBaseMax = parseInt(maxSelectBox.find("option:last").attr('value'));

    $('#block-views-exp-job-search-job-search #edit-field-currency').val(searchCookie.symbol);
  }

  if (searchCookie.salaryMin) {
    var  maxSal = checkMinMaxSal(salaryBaseMin, salaryMinOpt, searchCookie.salaryMin);
    if (maxSal == false && searchCookie.salaryMin != '-1') {
      searchCookie.salaryMin = salaryBaseMin;
    }

    // For PP site 0 result reset salary filter to base value.
    var myElem = document.getElementById('empty_view');
    if (Drupal.settings.mp_jobs_search.currentTheme === 'pp' && myElem !== null) {
      searchCookie.salaryMin = salaryBaseMin;
    }

    $('.form-item-field-job-salary-min, .form-item-field-job-salary-min select').val(searchCookie.salaryMin);

    // In Facet filter section, show salary min text as selected.
    if (searchCookie.salaryMin == '-1') {
      $('#block-panels-mini-job-search-facets .form-item-field-job-salary-min select, #mp-google-cts-salary-filter-form .form-item-field-job-salary-min select').val(salaryBaseMin);
    }
  }

  if (searchCookie.salaryMax) {
    var maxSal = checkMinMaxSal(salaryBaseMax, salaryMaxOpt, searchCookie.salaryMax);
    if (maxSal == false && searchCookie.salaryMax != '-1') {
      searchCookie.salaryMax = salaryBaseMax;
    }
    // For PP site 0 result reset salary filter to base value.
    var myElem = document.getElementById('empty_view');
    if (Drupal.settings.mp_jobs_search.currentTheme === 'pp' && myElem !== null) {
      searchCookie.salaryMax = salaryBaseMax;
    }

    $('.form-item-field-job-salary-max, .form-item-field-job-salary-max select').val(searchCookie.salaryMax);

    // // In Facet filter section, show salary max text as selected.
    if (searchCookie.salaryMax == '-1') {
      $('#block-panels-mini-job-search-facets .form-item-field-job-salary-max select, #mp-google-cts-salary-filter-form .form-item-field-job-salary-max select').val(salaryBaseMax);
    }
  }

  // Get user recent searches on click the keyword field.
  $(".form-item-search .job-search-keyword").click(function() {
    var $parent = $(this).parent();
    $.ajax({
      url: '/autocomplete/search/byclick',
      success: function (data) {
        $('.recent-searches-autocomplete').remove();
        if ($("#autocomplete").length < 1) {
          $parent.append(data);
        }
      }
    });
  });

  $(".form-item-search .job-search-keyword").blur(function() {
    $('.recent-searches-autocomplete', $(this).parent()).fadeOut("slow", function(){
      $('.recent-searches-autocomplete', $(this).parent()).remove();
    });
  });

  $(".form-item-search .job-search-keyword, .form-item-location .job-search-location").keydown(function () {
    $(".form-item-search .recent-searches-autocomplete").remove();
  });

  // Change Salary Min/Max value based on selected symbol.
  var $multiCurrencyForm = $('.multi-currency .views-exposed-form');
  $multiCurrencyForm.find("[name='field_currency']").change(function () {
    var selected_currency = $(this).val();

    // Parse SalaryRange object.
    obj = JSON.parse(MulticurrencySalaryRangeInfo);
    var salary_min_option = obj[selected_currency].min;

    // Update salary min dropdown field based on currency field.
    salaryMinOpt = Object.keys(salary_min_option);
    salaryBaseMin = parseInt(salaryMinOpt[0]);
    var $selectboxMin = $multiCurrencyForm.find('#edit-field-job-salary-min');
    $selectboxMin.empty();
    $.each(salary_min_option, function (key, value) {
      $selectboxMin.append($("<option></option>").attr("value", parseInt(key)).text(value));
    });

    // Update salary max dropdown field based on currency field.
    var salary_max_option = obj[selected_currency].max;
    salaryMaxOpt = Object.keys(salary_max_option);
    var $selectboxMax = $multiCurrencyForm.find('#edit-field-job-salary-max');
    $selectboxMax.empty();
    $.each(salary_max_option, function (key, value) {
      $selectboxMax.append($("<option></option>").attr("value", parseInt(key)).text(value));
    });
    // Show last option selected always.
    $multiCurrencyForm.find("#edit-field-job-salary-max option:last").attr("selected","selected");
    salaryBaseMax = parseInt($("#edit-field-job-salary-max option:last").attr('value'));
  });

  /**
   * Homepage Search form :-  Salary select field change and blur event.
   */
  var $bannerSearchSalMin = $('#block-views-exp-job-search-job-search #edit-field-job-salary-min');
  $bannerSearchSalMin.numeric();
  $bannerSearchSalMin.bind("change blur", function () {
    selectMinSal($('#block-views-exp-job-search-job-search #edit-field-job-salary-min'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#block-views-exp-job-search-job-search #edit-field-job-salary-max'));
  });

  var $bannerSearchSalMax = $('#block-views-exp-job-search-job-search #edit-field-job-salary-max');
  $bannerSearchSalMax.numeric();
  $bannerSearchSalMax.bind("change blur", function () {
    selectMaxSal($('#block-views-exp-job-search-job-search #edit-field-job-salary-max'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#block-views-exp-job-search-job-search #edit-field-job-salary-min'));
  });

  /**
   * Meganav Search form :-  Salary select field change and blur event.
   */
  var $meganavSalMin = $("#views-exposed-form-job-search-meganav #edit-field-job-salary-min");
  $meganavSalMin.numeric();
  $meganavSalMin.bind("change blur", function () {
    selectMinSal($('#views-exposed-form-job-search-meganav #edit-field-job-salary-min'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#views-exposed-form-job-search-meganav #edit-field-job-salary-max'));
  });

  var $megaNavSalMax = $("#views-exposed-form-job-search-meganav #edit-field-job-salary-max");
  $megaNavSalMax.numeric();
  $megaNavSalMax.bind("change blur", function () {
    selectMaxSal($('#views-exposed-form-job-search-meganav #edit-field-job-salary-max'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#views-exposed-form-job-search-meganav #edit-field-job-salary-min'));
  });

  /**
   * Search Result page :-  Salary select field change and blur event.
   */
  var $resultsSalMin = $("#views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-min");
  $resultsSalMin.numeric();
  $resultsSalMin.bind("change blur", function () {
    selectMinSal($('#views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-min'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-max'));
  });

  var $resultsSalMax = $("#views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-max");
  $resultsSalMax.numeric();
  $resultsSalMax.bind("change blur", function () {
    selectMaxSal($('#views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-max'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#views-exposed-form-job-search-jobsearch-facet-filter #edit-field-job-salary-min'));
  });

  var $resultsSalMin = $("#views-exposed-form-candidate-relevancy-search-candidate-relevancy-facet-filter .form-item-field-job-salary-min select");
  $resultsSalMin.numeric();
  $resultsSalMin.bind("change blur", function () {
    selectMinSal($('#views-exposed-form-candidate-relevancy-search-candidate-relevancy-facet-filter .form-item-field-job-salary-min select'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#views-exposed-form-candidate-relevancy-search-candidate-relevancy-facet-filter .form-item-field-job-salary-max select'));
  });

  var $resultsSalMax = $("#views-exposed-form-candidate-relevancy-search-candidate-relevancy-facet-filter .form-item-field-job-salary-max select");
  $resultsSalMax.numeric();
  $resultsSalMax.bind("change blur", function () {
    selectMaxSal($('#views-exposed-form-candidate-relevancy-search-candidate-relevancy-facet-filter .form-item-field-job-salary-max select'),
      salaryBaseMin, salaryBaseMax, salaryMinOpt, salaryMaxOpt,
      $('#views-exposed-form-candidate-relevancy-search-candidate-relevancy-facet-filter .form-item-field-job-salary-min select'));
  });
});

/**
 * Check Minimum & Maximum salary in cookie.
 *
 * @param int salaryOption
 *   The default min salary.
 * @param array salaryOptionArr
 *   The min salary.
 * @param int searchCookieSal
 *   The salary cookie value.
 *
 * @return
 *   Boolean
 */
function checkMinMaxSal(salaryOption, salaryOptionArr, searchCookieSal) {
  var salaryFound = false;
  $.each(salaryOptionArr, function (key, value) {
    if (searchCookieSal == value) {
      salaryFound = true;
    }
  });
  return salaryFound;
}

/**
 * Gets search values from a given cookie of the last search.
 *
 * @param int salaryBaseMin
 *   The default min salary.
 * @param int salaryBaseMax
 *   The default max salary.
 * @param string cookie_mpsearch
 *   The cookie to where to look for the data.
 *
 * @return
 *   An object which has the following attributes: symbol, salaryMin and
 *    salaryMax. All of them from the cookie if found.
 */
function getSearchCookieValues(symbol, salaryBaseMin, salaryBaseMax, cookie_mpsearch) {
  if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp */) {
      if (this === null) {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun !== "function") {
        throw new TypeError();
      }

      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // In case fun mutates this.
          if (fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }
      return res;
    };
  }

  var $ = jQuery;
  cookieValues = new Object();
  cookieValues.symbol = symbol;
  cookieValues.salaryMin = '-1';
  cookieValues.salaryMax = '-1';

  if (cookie_mpsearch != undefined || cookie_mpsearch != null) {
    var cookie_decoded = decodeURIComponent(cookie_mpsearch).replace(/ùù/g, '&').replace(/µµ/g, '=');

    if (cookie_decoded.indexOf('search_url=') > 0) {
      var remain_string = cookie_decoded.substring(cookie_decoded.indexOf('?') + 1);
      var remain_string_split = remain_string.split("&");
      var params = [];
      // We have to do it this way because ie8 doesn't support map.
      for (var i = 0; i < remain_string_split.length; i++) {
        var tmp_array2 = [remain_string_split[i]];
        var tmp_map = $.map(tmp_array2, function (kv) {
        return kv.split("=", 2);
      });
        params[i] = tmp_map;
      }

      match = params.filter(function (v) { return v[0] === 'field_currency'; });
      if (typeof match[0] !== 'undefined') {
        cookieValues.symbol = match[0][1];
      }
      match = params.filter(function (v) { return v[0] === 'field_job_salary_min'; });
      if (typeof match[0] !== 'undefined') {
        cookieValues.salaryMin = match[0][1];
      }
      match = params.filter(function (v) { return v[0] === 'field_job_salary_max'; });
      if (typeof match[0] !== 'undefined') {
        cookieValues.salaryMax = match[0][1];
      }
    }
  }

  return cookieValues;
}
;
/*! Respond.js v1.4.2: min/max-width media query polyfill * Copyright 2013 Scott Jehl
 * Licensed under https://github.com/scottjehl/Respond/blob/master/LICENSE-MIT
 *  */

!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){u(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))};if(c.ajax=f,c.queue=d,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,maxw:/\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var g,h,i,j=a.document,k=j.documentElement,l=[],m=[],n=[],o={},p=30,q=j.getElementsByTagName("head")[0]||k,r=j.getElementsByTagName("base")[0],s=q.getElementsByTagName("link"),t=function(){var a,b=j.createElement("div"),c=j.body,d=k.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=j.createElement("body"),c.style.background="none"),k.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&k.insertBefore(c,k.firstChild),a=b.offsetWidth,f?k.removeChild(c):c.removeChild(b),k.style.fontSize=d,e&&(c.style.fontSize=e),a=i=parseFloat(a)},u=function(b){var c="clientWidth",d=k[c],e="CSS1Compat"===j.compatMode&&d||j.body[c]||d,f={},o=s[s.length-1],r=(new Date).getTime();if(b&&g&&p>r-g)return a.clearTimeout(h),h=a.setTimeout(u,p),void 0;g=r;for(var v in l)if(l.hasOwnProperty(v)){var w=l[v],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?i||t():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?i||t():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(m[w.rules]))}for(var C in n)n.hasOwnProperty(C)&&n[C]&&n[C].parentNode===q&&q.removeChild(n[C]);n.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=j.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,q.insertBefore(E,o.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(j.createTextNode(F)),n.push(E)}},v=function(a,b,d){var e=a.replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var g=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},h=!f&&d;b.length&&(b+="/"),h&&(f=1);for(var i=0;f>i;i++){var j,k,n,o;h?(j=d,m.push(g(a))):(j=e[i].match(c.regex.findStyles)&&RegExp.$1,m.push(RegExp.$2&&g(RegExp.$2))),n=j.split(","),o=n.length;for(var p=0;o>p;p++)k=n[p],l.push({media:k.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:m.length-1,hasquery:k.indexOf("(")>-1,minw:k.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:k.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}u()},w=function(){if(d.length){var b=d.shift();f(b.href,function(c){v(c,b.href,b.media),o[b.href]=!0,a.setTimeout(function(){w()},0)})}},x=function(){for(var b=0;b<s.length;b++){var c=s[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!o[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(v(c.styleSheet.rawCssText,e,f),o[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!r||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}w()};x(),c.update=x,c.getEmValue=t,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);
;
