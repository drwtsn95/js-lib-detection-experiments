jQuery(function($) {
  $(document).ready(function(){
    $('#insert-t20-media').click(open_media_window);
    $('#insert-t20-sc').click(insert_twenty20_shortcode);
  });

  function open_media_window() {
    if (this.window === undefined) {
      this.window = wp.media({
        title: 'Select Two images for Twenty20 Slider',
        library: {type: 'image'},
        multiple: 'add',
        button: {text: 'Insert'}
      });


      var self = this; // Needed to retrieve our variable in the anonymous function below
      this.window.on('select', function() {
        var first = self.window.state().get('selection').first().toJSON();
        var last = self.window.state().get('selection').last().toJSON();
        var im = self.window.state().get('selection').toJSON();

        if(im.length != 2){
          alert("Please select any two images");
          return false;
        }

        $('#t20_img1').val(first.id);
        //$('img.timg-before').attr("src", first.url);
        $('#t20_img2').val(last.id);
        tb_show("Twenty20 Shortcode", "#TB_inline?height=500&amp;width=600&amp;inlineId=twenty20_select");
        //wp.media.editor.insert('[twenty20 img1="' + first.url + '" img2="' + last.url + '" width="100%" direction="horizontal" offset="0.5"]');
      });
    }

    this.window.open();
    return false;
  }
  function insert_twenty20_shortcode() {
    var img1 = $('#t20_img1').val();
    var img2 = $('#t20_img2').val();
    var before = $('#t20_sc_before_caption').val();
    var after = $('#t20_sc_after_caption').val();
    var twidth = $('#t20_sc_width').val();
    var direction = $('#t20_sc_direction').val();
    var hover = $('#t20_sc_hover').val();
    var offset = $('#t20_sc_offset').val();
    var align = $('#t20_sc_align').val();


    if(before == null || before == ''){ before = ''; }else{ before = ' before="'+before+'"'; }
    if(after == null || after == ''){ after = ''; }else{ after = ' after="'+after+'"'; }
    if(align == null || align == ''){ align = ''; }else{ align = ' align="'+align+'"'; }
    if(direction == 'default'){ direction = ''; }else{ direction = ' direction="'+direction+'"'; }
    if(hover == 'false'){ hover = ''; }else{ hover = ' hover="'+hover+'"'; }
    if(twidth == '' || twidth == null){ twidth = ''; }else{ twidth = ' width="'+twidth+'"'; }

    wp.media.editor.insert('[twenty20 img1="' + img1 + '" img2="' + img2 + '"'+twidth+direction+' offset="'+offset+'"'+ align + before + after+hover+']');
    return false;
  }
});