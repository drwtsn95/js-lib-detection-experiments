(function($){
	var opts;

	function validate(url) {
		//var pattern = /^(?:([a-z\u00A1-\uFFFF]+):(?:([a-z\u00A1-\uFFFF]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z\u00A1-\uFFFF0-9_-]+\.)+[a-z\u00A1-\uFFFF]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
        //var pattern = /^(?:([a-z\u00A1-\uFFFF]+):(?:([a-z\u00A1-\uFFFF]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z\u00A1-\uFFFF0-9_-]+\.)+[a-z\u00A1-\uFFFF]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
        //var pattern = /^(?:([a-z\u00A1-\uFFFF]+):(?:([a-z\u00A1-\uFFFF]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z\u00A1-\uFFFF0-9_-]+\.)+[a-z\u00A1-\uFFFF]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^\?]+))?(?:([^\s]+))?$/i;
        var pattern = /^(?:([a-z\u00A1-\uFFFF]+):(?:([a-z\u00A1-\uFFFF]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z\u00A1-\uFFFF0-9_-]+\.)+[a-z\u00A1-\uFFFF]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d\d?|2[0-4]\d|25[0-5]))(?::(\d+))?(?:([^\?]+))?(?:(.+))?$/i;
		var sUrl = removeProtocol(opts.siteUrl) + "/";
		var xUrl = removeProtocol(url.split('?')[0]) + "/";
		//console.log(xUrl.indexOf(sUrl));
		//console.log("Long url: " + xUrl);
		//console.log("Site url: " + sUrl);
		return pattern.test(url) && xUrl.toLowerCase().indexOf(sUrl) != 0;
    }

	function request() {
		$.ajax({
			type: "POST",
			data: $(opts.form).serialize(),
			url: opts.ajax,
			beforeSend:beforeSend,
			dataType:"JSON",
			success:response,
			error:function (xhr, ajaxOptions, thrownError, request, error){
				alert(xhr.status + ' : ' + xhr.responseText);
				dom.removeLoading();
			}
		});
	}

	function beforeSend() {
		dom.loading();
		$(opts.url).removeClass('error');
	}

	function response(json) {
		if(typeof(json.error) != "undefined") { dom.removeLoading(); return true; }//window.location.reload(); }

		cache.set(json.url, json.shortlink);
		cache.prev = json.url;
		dom.removeLoading();
		insertQR(json.shortlink);
		$(opts.share).attr("data-url", json.shortlink);
		$(opts.share).share({});
		displayShortlink(json.shortlink);
	}

	function displayShortlink(shortlink) {
		$(opts.shortarea).show();
		$(opts.shortlink).val(shortlink);
	}

	function insertQR(url) {
		//var src = opts.siteUrl + '/qrcode.php?l='+encodeURIComponent(url)+'&rnd='+Math.random();
		var src = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + encodeURIComponent(url);
		$(opts.qr).attr("src", src);
	}

	function removeProtocol(url) {
		return url.replace(/^[\w]+:\/\//i, "");
	}

	var dom = {
		url: function() { return $(opts.url).val(); },
		short: function() { return $(opts.shortlink).val(); },
		loading: function() {
			$(opts.create).attr("disabled", true);
			$(opts.create).addClass("loading");
		},
		removeLoading: function() {
			$(opts.create).attr("disabled", false);
			$(opts.create).removeClass("loading");
		}
	};

	var cache = {
		c: [],
		prev: null,
		get: function(long) {
			return this.c[long] || false;
		},
		set: function(long, short) {
			this.c[long] = short;
		}
	};

	$.fn.shortlink = function(options){
		opts = options;

        var clipboard = new Clipboard('#d_clip_button');

        clipboard.on('success', function(e) {
            $(opts.notice).hide().css({visibility: "visible"}).fadeIn("slow");
            setTimeout(function(){
                $(opts.notice).fadeOut("slow", function() {
                    $(this).show().css({visibility: "hidden"});
                });
            }, 3000);
        });

		$(opts.url).keyup(function(e){
			validate(dom.url()) ? $(opts.url).removeClass('error') : $(opts.url).addClass('error');
		});

		$(opts.create).click(function(){
			var url = dom.url();
			if(validate(url)) {
				var short = cache.get(url);
				if(short == false)
					request();
				else {
					if(cache.prev != url)
						insertQR(url);
					$(opts.share).attr("data-url", short);
					$(opts.share).share({});
					displayShortlink(short);
				}
			}
			else
				$(opts.url).addClass('error');
			return false;
		});
	};

})(jQuery);
function clearText(obj) {
	if(obj.defaultValue == obj.value)
		obj.value = "";
}