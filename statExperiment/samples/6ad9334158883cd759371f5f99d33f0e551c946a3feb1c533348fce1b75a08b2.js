// https://codepen.io/martinAnsty/pen/BCotE
Math.easeIn = function (val, min, max, strength) {
	val /= max;

	return (max - 1) * Math.pow(val, strength) + min;
};

(function($) {
  var ocfilter = {
    timers: {},
    values: {},
    options: {},
    init: function(options) {
      this.options = $.extend({}, options);

      this.options.element = {};

      this.options.element.ocfilter = $('#ocfilter');

      this.options.element.fields = $('.option-values input, .option-values select option', this.options.element.ocfilter);

      this.options.element.target = $('.ocf-target', this.options.element.ocfilter);
      this.options.element.labels = $('label', this.options.element.ocfilter);
      this.options.element.values = $('label, select option', this.options.element.ocfilter);

      var $this = this;

      this.options.element.values.each(function() {
        $this.values[$(this).attr('id')] = $(this);
      });

      this.options.element.target.on('change', function(e) {
        e.preventDefault();

        if (this.value) {
          window.location = this.value;
        }
      });

      var hovered = false;

      $('#ocfilter').delegate('.popover', {
        'mouseenter': function() {
          hovered = true;
        },
        'mouseleave': function() {
          hovered = false;

          $('[aria-describedby=\'' + $(this).attr('id') + '\']').popover('toggle');
        }
      });

      if (this.options.php.manualPrice) {
        $('[data-toggle=\'popover-price\']').popover({
          content: function() {
            return '\
              <div class="form-inline"> \
                <div class="form-group"> \
                  <input name="price[min]" value="' + $('#price-from').text() + '" type="text" class="form-control input-sm" id="min-price-value" /> \
                </div> \
                <div class="form-group">-</div> \
                <div class="form-group"> \
                  <input name="price[max]" value="' + $('#price-to').text() + '" type="text" class="form-control input-sm" id="max-price-value" /> \
                </div> \
              </div> \
            ';
          },
          html: true,
          delay: { 'show': 400, 'hide': 500 },
          placement: 'top',
          container: '#ocfilter',
          title: 'Указать цену',
          trigger: 'hover'
        });

        $('[data-toggle=\'popover-price\']').on('hide.bs.popover', function() {
          return !hovered;
        });
      }

      this.options.element.ocfilter.find('.dropdown-menu a[data-toggle=\'collapse\']').on('click', function(e) {
        e.preventDefault();

        $($(this).attr('href')).collapse('toggle');

        return false;
      });

      // Set sliders
      $('#ocfilter .scale').each(function(i) {
        var _this = $(this), min = parseFloat(_this.attr('data-range-min')), max = parseFloat(_this.attr('data-range-max')), decimals = 0, elementMin, elementMax, controlMin, controlMax, _options = {
          behaviour: 'drag-tap',
          range: {
            'min': min,
            'max': max
          }
        };

        if (_this.attr('data-range-min') == _this.attr('data-range-max')) {
          $(this).closest('.ocfilter-option').addClass('hidden');

          return true;
        }

        // Logarithmic scale
        if ((max - min) > 10) {
          _options['pips'] = {
            mode: 'range',
        		density: 4
        	};

          var _i = 25, _strength = 3.5;

          if ((max - min) < 100) {
            _strength = 2;
          }

          for (; _i < 100; _i += 25) {
            _options['range'][_i + '%'] = Math.ceil(Math.easeIn(((max - min) / 100 * _i), min, max, _strength));
          }
        } else {
          _options['pips'] = {
            mode: 'count',
            values: 3,
        		density: 4
        	};
        }

        if (_this.attr('data-start-max') && _this.attr('data-start-max') != _this.attr('data-start-min')) {
          _options['start'] = [ parseFloat(_this.attr('data-start-min')), parseFloat(_this.attr('data-start-max')) ];
        } else {
          _options['start'] = parseFloat(_this.attr('data-start-min'));
        }

        // Decimal
        if (/\./.test(_this.attr('data-range-min'))) {
          decimals = _this.attr('data-range-min').replace(/^\d+?\./, '').length;
        }

        _options['format'] = {
      	  to: function (value) {
      		  return parseFloat(value).toFixed(decimals);
      	  },
      	  from: function (value) {
      		  return parseFloat(value).toFixed(decimals);
      	  }
      	};

        _options['connect'] = (typeof _options['start'][1] != 'undefined' && _options['start'][0] != _options['start'][1]);

      	noUiSlider.create(_this.get(0), _options);

        if (_this.attr('data-element-min') && $(_this.attr('data-element-min')).length) {
          elementMin = $(_this.attr('data-element-min'));
        }

        if (_this.attr('data-element-max') && $(_this.attr('data-element-max')).length) {
          elementMax = $(_this.attr('data-element-max'));
        }

        _this.get(0).noUiSlider.on('slide', function(values, handle, noformat) {
          if (typeof values[0] != 'undefined') {
            if (elementMin) {
              elementMin.html(values[0]);
            }

            if (_this.attr('data-control-min') && $(_this.attr('data-control-min')).length) {
              $(_this.attr('data-control-min')).val(noformat[0].toFixed(decimals));
            }
          }

          if (typeof values[1] != 'undefined') {
            if (elementMax) {
              elementMax.html(values[1]);
            }

            if (_this.attr('data-control-max') && $(_this.attr('data-control-max')).length) {
              $(_this.attr('data-control-max')).val(noformat[1].toFixed(decimals));
            }
          }
        });

        _this.get(0).noUiSlider.on('set', function(values, handle, noformat) {
          $this.params.remove.call($this, _this.attr('data-option-id'));
          $this.params.set.call($this, _this.attr('data-option-id'), noformat[0].toFixed(decimals) + '-' + noformat[1].toFixed(decimals));

          $this.update(_this);
        });

        if (_this.attr('data-control-min')) {
          $('#ocfilter').delegate(_this.attr('data-control-min'), 'change', function() {
            if (this.value == '') {
              return false;
            }

            if (this.value < min || this.value > max) {
              this.value = min;
            }

            _this.get(0).noUiSlider.set([this.value, null]);
          });
        }

        if (_this.attr('data-control-max')) {
          $('#ocfilter').delegate(_this.attr('data-control-max'), 'change', function() {
            if (this.value == '') {
              return false;
            }

            if (this.value < min || this.value > max) {
              this.value = max;
            }

            _this.get(0).noUiSlider.set([null, this.value]);
          });
        }
      });
    },

    update: function(scrollTarget) {
      var $this = this,
        data = {
          path: this.options.php.path
        };

      if (this.options.php.params) {
        data[this.options.php.index] = this.options.php.params;
      }

      this.preload();

      $.get('index.php?route=extension/module/ocfilter/callback', data, function(json) {
        /* Start update */
        for (var i in json.values) {
          var value = json.values[i],
            target = $this.values['v-' + i],
            total = value.t,
            selected = value.s,
            params = value.p;

          if (target !== undefined) {
            if (target.is('label')) {
              if (total === 0 && !selected) {
                target.addClass('disabled').removeClass('selected').find('input').attr('disabled', true).prop('checked', false);
              } else {
                target.removeClass('disabled').find('input').removeAttr('disabled');
              }
              $('input', target).val(params);

              if ($this.options.php.showCounter) $('small', target).text(total);
            } else {
              if (total === 0) {
                target.attr('disabled', true);
              } else {
                target.removeAttr('disabled');
              }

              target.val(params);
            }
          }
        }

        if (json.total === 0) {
          $('#ocfilter-button button').removeAttr('onclick').addClass('disabled').text($this.options.text.select);

          if (typeof scrollTarget != 'undefined' && scrollTarget.hasClass('scale')) {
            $('#ocfilter .scale').removeAttr('disabled');
          }
        } else {
          $('#ocfilter-button button').attr('onclick', 'location = \'' + json.href + '\'').removeClass('disabled').text(json.text_total);

          $('#ocfilter .scale').removeAttr('disabled');
        }

        $this.options.element.fields.filter('.enabled').removeAttr('disabled');

        if (typeof scrollTarget != 'undefined') {
          $this.scroll(scrollTarget);
        }
        /* End update */
      }, 'json');
    },

    params: {
      decode: function() {
        var params = {};
        if (this.options.php.params) {
          var matches = this.options.php.params.split(';');
          for (var i = 0; i < matches.length; i++) {
            var parts = matches[i].split(':');
            params[parts[0]] = typeof parts[1] != 'undefined' ? parts[1].split(',') : [];
          }
        }
        this.options.php.params = params;
      },

      encode: function() {
        var params = [];
        if (this.options.php.params) {
          for (i in this.options.php.params) {
            params.push(i + ':' + (typeof this.options.php.params[i] == 'object' ? this.options.php.params[i].join(',') : this.options.php.params[i]));
          }
        }
        this.options.php.params = params.join(';');
      },

      set: function(option_id, value_id) {
        this.params.decode.call(this);
        if (typeof this.options.php.params[option_id] != 'undefined') {
          this.options.php.params[option_id].push(value_id);
        } else {
          this.options.php.params[option_id] = [value_id];
        }
        this.params.encode.call(this);
      },

      remove: function(option_id, value_id) {
        this.params.decode.call(this);
        if (typeof this.options.php.params[option_id] != 'undefined') {
          if (this.options.php.params[option_id].length === 1 || !value_id) {
            delete this.options.php.params[option_id];
          } else {
            this.options.php.params[option_id].splice(ocfilter.options.php.params[option_id].indexOf(value_id), 1);
          }
        }
        this.params.encode.call(this);
      }
    },

    preload: function() {
      if ($('.ocfilter-option-popover').length) {
        $('.ocfilter-option-popover button').button('loading');
      }

      $('#ocfilter .scale').attr('disabled', true);
      this.options.element.fields.attr('disabled', true);
      this.options.element.labels.addClass('disabled').find('small').text('0');
    },

    scroll: function(target) {
      var $this = this;

      if (!target.attr('aria-describedby')) {
        if ($('.ocfilter-option-popover').length) {
          $('[aria-describedby=\'' + $('.ocfilter-option-popover').attr('id') + '\']').popover('hide');
        }

        target.popover({
          content: function() {
            return $('#ocfilter-button').html();
          },
          html: true,
          placement: $this.options['mobile'] ? 'bottom' : 'right',
          container: '#ocfilter',
          trigger: 'manual'
        });

        target.popover('show');

        $('#' + target.attr('aria-describedby')).addClass('ocfilter-option-popover');
      } else {
        $('#' + target.attr('aria-describedby') + ' button').replaceWith($('#ocfilter-button').html());
      }
    }
  };

  /* IE6+ */
  if (Object.create === undefined) {
    Object.create = function(object) {
      function f() {};
      f.prototype = object;
      return new f();
    };
  }
  $.fn.ocfilter = function(options) {
    return this.each(function() {
      var $this = $(this);
      if ($this.data('ocfilter')) {
        return $this.data('ocfilter');
      }
      $this.data('ocfilter', Object.create(ocfilter).init(options, $this));
    });
  };
})(jQuery);