$.Controller("GdMainSearchController",{
  load_aeroexpress: true,

  init:function(){
    this.check_aeroexpress_from_cache();
    if ($("form#aeroexpress_form").length === 0){
      this.create_form();
    }
  },

  "ul.menu_tabs li a -> click":function(ev){
    type = $(ev.target).data('type');
    if (type) {
        ev.preventDefault();
        $("ul.menu_tabs li").removeClass('active');
        $(ev.target).parent().addClass('active');

        $("div.tab_rail_menu-page").hide();
        $("#" + type).show();
        $(".hasDatepicker").datepicker("hide");

        $('.popular_direction_swicher .swich_type[data-search-type="' + type + '"]').click();
    }
  },

  set_loader: function(show){
    if(show){
      $("#form_loader").show();
    } else {
      $("#form_loader").hide();
    }
  },

  elements_init:function(){
    $("select").selectbox();
    $('#aeroexpress_form input[type="checkbox"]').iCheck({
      checkboxClass: 'icheckbox_minimal',
    });
    var date_picker = this.element.find('.date_input');
    date_picker.datepicker(
      {
        dateFormat: "dd.mm.yy",
        minDate: date_picker.data("min-date") || 0,
        maxDate: date_picker.data("max-date"),
        numberOfMonths: 2,
        dayNamesMin: I18n.days_short,
        monthNames: I18n.months
      }
    )
    $('#ui-datepicker-div').addClass('main_datepicker').attr('data-uil', 'datepicker');
  },

  check_aeroexpress_from_cache:function(){
    var self = this;
    if ($("form#aeroexpress_form").length) {
      $("#aeroexpress").attachGdSearchFormController({ctrl:self});
    }
  },

  create_form: function(){
    if($('#aeroexpress').length){
      var params = $.cookie("gd_search_params");
      var parsedParams = $.parseParams(params);
      var date = parsedParams.departure_date;
      var self = this;

      this.set_loader(true);
      $.ajax({
        url:  '/' + window.lang_prefix + 'aeroexpress/create_search_form',
        type: "POST",
        dataType:"json",
        data: {date: date},
        success: function(resp){
          self.set_loader(false);

          if(resp.success){
            $("#aeroexpress_block").after(resp.html);
            self.elements_init();
            self.destroySbox();
            $("#aeroexpress").attachGdSearchFormController({ctrl:self});
            $('.tab_rail_menu a[data-type="aeroexpress"]').click();
          } else {
            self.show_error(window.I18n.server_error);
          }
        },
      });
    }
  },

  show_error: function(msg){
    message('msg_title', msg, 'continue_button', function(){
      window.close_message();
    });
  },

  destroySbox:function() {
    $('#footer, .js-header, .corpo_footer').find('.ignore-selectbox').selectbox("detach").hide();
  }

});
