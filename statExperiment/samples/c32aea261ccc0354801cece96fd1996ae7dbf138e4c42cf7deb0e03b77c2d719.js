var SUGGESTER_PAGE_SIZE = 80;
var SUGGESTER_JOBS = 2;
var SUGGESTER_DELAY_MS = 1000;
var domainListToQuery = [];

function switchTextIndex(_textIndex)
{
	if(_textIndex == "More")
	{
		_textIndex = "Hide";
	}
	else
	{
		_textIndex = "More";
	}
	return _textIndex;
}

$(function () {
	$.fn.attachValidator = function(validator, delay)
	{
		$(this).data('validator', validator);

		if (delay == undefined)
		{
			delay = 1000;
		}

		var timer = null;

		$(this).on('input cut paste propertychange', function(event)
		{
			if (timer !== null)
			{
				clearTimeout(timer);
			}

			timer = setTimeout(function()
			{
				validator.call(event.target);
			}, delay);
		});
	};

	$.fn.validate = function()
	{
		var validator = $(this).data('validator');

		if (validator != undefined)
		{
			return validator.call(this);
		}

		return false;
	};

	function translationReady()
	{
		$(".table_slicer").children('td').children('p').text(i18n.translate("More").fetch());
		if($('div').is('.toggle-text'))
		{
			var textIndex = "More";

			$('.toggle-text').hide();
			$('.toggle-text').after('<div class="toggle-more">'+i18n.translate(textIndex).fetch()+'</div>');
			$('.toggle-more').click(function()
			{
				var action = ($('.toggle-text').css('display') == 'none')?'show':'hide';
				if(action == 'show') $('.toggle-text').velocity('slideDown', {duration: ANIMATION_SPEED});
				else $('.toggle-text').velocity('slideUp', {duration: ANIMATION_SPEED});

				textIndex = switchTextIndex(textIndex);

				$('.toggle-more').text(i18n.translate(textIndex).fetch());
			});
		}
	}

	function suggestDomains(input, suggestions, delay)
	{
		var base = $.trim(input.toLowerCase().split('.')[0]);
		var ignored = webpageIndex.blacklistedDomains.split(',');
		var first = (0 === domainListToQuery.length);

		for (var i = 0; i < suggestions.length; ++i)
		{
			var skip = false;

			if (suggestions[i] == '')
			{
				continue;
			}

			var domain = base + '.' + suggestions[i];

			if (input === domain)
			{

				$('.domain_suggester tr[data-domain="' + domain + '"]').remove();
				$('.domain_suggester > table td > div table').prepend(
					createDomainSuggestionRow(base, suggestions[i])
				);
				skip = true;
			}

			if (!skip)
			{
				if ($('.domain_suggester tr[data-domain="' + domain + '"]').length > 0 || (input !== domain && $.inArray(domain, ignored) >= 0))
				{
					continue;
				}

				$('.domain_suggester > table td > div table').append(
					createDomainSuggestionRow(base, suggestions[i])
				);
			}

			if (domain in domainCache && domainCache[domain] !== 'error')
			{
				updateDomain(domain);
			}
			else
			{
				domainListToQuery.push(domain);
			}
		}

		if (first)
		{
			for (var i = 0; i < SUGGESTER_JOBS; ++i)
			{
				setTimeout(function()
				{
					queryFirstDomainOnList();
				}, 10);
			}
		}
	}

	function selectDomain(domain, mode)
	{
		var extension = domain.substr(domain.split('.')[0].length + 1);

		if (extension == 'uk')
		{
			var domaincouk = domain.split('.')[0] + '.co.uk';

			if (!(domaincouk in domainCache))
			{
				return;
			}
		}

		if (domain == '' || (domain in domainCache && domainCache[domain] == 'unavailable'))
		{
			return;
		}

		if (mode == undefined)
		{
			mode = DOMAIN_MODE_AUTO;
		}

		location.href = '/panel/' + webpage.language + '/register/domain/' + domain + '/mode/' + ((mode == DOMAIN_MODE_TRANSFER) ? 'transfer/authinfo/' + $('#dialog_domain_transfer input[name="register_authinfo"]').val() + ($('#field_resetdns').prop('checked') ? '/resetdns/yes' : '') : ((mode == DOMAIN_MODE_ATTACH) ? 'attach' : 'register'));
	}

	function queryFirstDomainOnList()
	{
		if (0 === domainListToQuery.length)
		{
			return;
		}
		queryDomain(domainListToQuery.shift());
	}

	function queryDomain(domain)
	{
		$.ajax(
		{
			url:    "/panel/api/",
			type:   "POST",
			data:	{'check-domains': [domain]},
			timeout:    20000,
			success:    function(data, textStatus, jqXHR)
			{
				if ('' === data || 'invalid' === data || 'error' === data)
				{
					if (!(domain in domainCache))
					{
						domainCache[domain] = 'error';
						updateDomain(domain);
					}
					return;
				}

				data = $.parseJSON(data);
				var extension = domain.substr(domain.split('.')[0].length + 1);

				if ('uk' === extension)
				{
					var domaincouk = domain.split('.')[0] + '.co.uk';

					if (!(domaincouk in domainCache))
					{
						queryDomain(domaincouk);
					}
					if (domain in domainCache) return;
				}

				domainCache[domain] = data[domain];
				updateDomain(domain);

			}}).fail(function()
			{
                if (!(domain in domainCache))
                {
                        domainCache[domain] = 'error';

                        updateDomain(domain);
                }
			}
		);
	}

	function updateDomain(domain)
	{
		var state = domainCache[domain];
		var extension = domain.substr(domain.split('.')[0].length + 1);
		var element = $('.domain_suggester').find('[data-domain="' + domain + '"]');

		if (extension == 'co.uk')
		{
			var ukdomain = domain.split('.')[0] + '.uk';

			if (state != 'available')
			{
				domainCache[ukdomain] = state;
				updateDomain(ukdomain);
			}
		}

		if (0 === element.length)
		{
			setTimeout(function()
			{
				queryFirstDomainOnList();
			}, 10);

			return;
		}

		var message = '';

		element.attr('class', 'domain_' + state);

		if (continueTyping && domain.substr(0, 3) == 'ww.')
		{
			message = '<span title="' + i18n.translate('continue typing...').fetch() + '">' + i18n.translate('continue typing...').fetch() + '</span>';

			element.attr('class', 'domain_warning');
		}
		else if (state == 'registered' || state == 'transferable' || (state == 'available' && supportedDomains[extension][0] == -1))
		{
			message = ((state == 'registered' || state == 'transferable') ? i18n.translate('domain in use').fetch() : i18n.translate('without domain').fetch());

			element.attr('title', domain + ' - ' + i18n.translate('you must own this domain to host your website under this address').fetch());
		}
		else if (state == 'available' && supportedDomains[extension][0] == 0)
		{
			if (extension == 'j.pl')
			{
				message = i18n.translate('free registration for PRO and VIP').fetch();
			}
			else
			{
				message = i18n.translate('domain for free').fetch();
			}
		}
		else if (state == 'available' && supportedDomains[extension][0] > 0)
		{
			message = i18n.translate('domain for').fetch() + ' ' + parseFloat(supportedDomains[extension][0]).toFixed(2) + ' ' + webpage.currency;
		}
		else if (state == 'unavailable')
		{
			message = i18n.translate('domain unavailable').fetch();
		}
		else if (state == 'invalid')
		{
			message = i18n.translate('invalid domain').fetch();
		}
		else
		{
			message = i18n.translate('error').fetch();

			element.attr('class', 'domain_error');
		}

		element.find('td:last-child').html(message);

		setTimeout(function()
		{
			queryFirstDomainOnList();
		}, 10);
	}

	$.fn.attachValidator = function(validator, delay)
	{
		$(this).data('validator', validator);

		if (delay == undefined)
		{
			delay = 1000;
		}

		var timer = null;

		$(this).on('input cut paste propertychange', function(event)
		{
			if (timer !== null)
			{
				clearTimeout(timer);
			}

			timer = setTimeout(function()
			{
				validator.call(event.target);
			}, delay);
		});
	};

	$.fn.validate = function()
	{
		var validator = $(this).data('validator');

		if (validator != undefined)
		{
			return validator.call(this);
		}

		return false;
	};

	$.get('/panel/api/?login&locale=' + webpage.language, function(data)
	{
		if (data !== '')
		{
			$('#top form').replaceWith(data);
			$('#top .link_signin').remove();
			$('#top .link_register').remove();
		}
	}, 'text');

	function tryLogIn()
	{
		if ($('#top form > div').css('display') == 'none')
		{
			$('#top form > div').velocity("fadeIn", {duration: ANIMATION_SPEED, complete: function(){$('input[name="login_name"]').focus();}});
		}
		else if($('#top form input[type="text"]').val() == ''
			&& $('#top form input[type="password"]').val() == '')
		{
			$('#top form input[type="text"]').removeClass('error');
			$('#top form input[type="password"]').removeClass('error');
			if (isMobile)
			{
				handleGUI(ElementsGUI.LOGIN_FORM);
			}
		}
		else if ($('#top form input[type="text"]').val() == ''
			|| $('#top form input[type="password"]').val() == '')
		{
			if ($('#top form input[type="text"]').val() == '')
			{
				$('#top form input[type="text"]').addClass('error');
			}

			if ($('#top form input[type="password"]').val() == '')
			{
				$('#top form input[type="password"]').addClass('error');
			}
		}
		else
		{
			$('#top form input[type="text"]').removeClass('error');
			$('#top form input[type="password"]').removeClass('error');
			$('#top form').submit();
		}
	}

	$('#top').on("click", ".link_signin", function(event)
	{
		event.preventDefault();
		tryLogIn();
		if (isMobile)
		{
			handleGUI(ElementsGUI.LOGIN_FORM);
		}
	});

// on 'Enter' press in the password field:
	$('#top input[name="login_password"],#top input[name="login_name"]').on("keyup", function(e)
	{
		var enterKeyCode = 13;
		if(e.keyCode == enterKeyCode)
		{
			tryLogIn();
		}
	});

	var i18n = new Jed({});


	$.get('/locale/' + webpage.language + '/messages.json', function(data)
	{
		i18n = new Jed($.parseJSON(data));
		translationReady();
	}, 'text');

	if ($.inArray(webpage.page, ['index', 'promotion_migration']) !== -1)
	{
		var DOMAIN_MODE_AUTO = 0;
		var DOMAIN_MODE_ATTACH = 1;
		var DOMAIN_MODE_TRANSFER = 2;
		var continueTyping = false;
		var delayTimer = null;
		var supportedDomains = {};
		var domainCache = {};
		var domainQuery = [];
		var data = webpageIndex.supportedDomains.split(',');

		for (var i = 0; i < data.length; ++i)
		{
			supportedDomains[data[i]] = [-1, -1];
		}

		var data = $.parseJSON(webpageIndex.domainsPricing);

		for (var i = 0; i < data.length; ++i)
		{
			if (data[i].domains !== null && data[i].domains !== '')
			{
				var domains = data[i].domains.split(',');

				for (var j = 0; j < domains.length; ++j)
				{
					supportedDomains[domains[j]] = [data[i].priceRegister, data[i].priceTransfer];
				}
				if (data[i].type !== 'free' && data[i].type !== 'pl-regional' && data[i].type !== 'pl-functional')
				{
					webpageIndex.domainsSuggestionsMore += ',' + data[i].domains;
				}
			}
		}
		webpageIndex.domainsSuggestionsMoreArray = webpageIndex.domainsSuggestionsMore.split(',');
		webpageIndex.domainsSuggestionsMoreArray.sort();
		webpageIndex.domainSuggestionsMoreBegin = 0;

		$('#domain_submit').hide();

		$('input[name="register_domain"]').on('input cut paste propertychange keydown', function(e)
		{
			$(".domain_suggester .domain_arrow").css({'display':'none'});
			if (delayTimer)
			{
				clearTimeout(delayTimer);
			}

			var domain = $.trim($(this).val().toLowerCase());

			if (domain == '')
			{
				$('.domain_suggester > table td > div').hide();
				$(".domain_suggester .domain_arrow").css({'display':'block'});
				return;
			}

			continueTyping = false;

			if (e.which == 13) {
				if (supportedDomains[domain.substring(domain.indexOf('.')+1)])
				{
					selectDomain(domain);
				}
				e.preventDefault();
			}

			if (domain.substr(0, 3) == 'www')
			{
				if (domain.length < 4)
				{
					continueTyping = true;
					domain = 'ww';
				}
				else if (domain.substr(0, 4) == 'www.')
				{
					domain = domain.substr(4);

					if (domain == '')
					{
						return;
					}
				}
			}

			$('.domain_suggester > table td > div').remove();
			$('.domain_suggester > table td:last-child').append('<div><table></table></div>');

			var base = domain.split('.')[0];
			var extension = domain.substr(base.length + 1);
			var suggestions = webpageIndex.domainsSuggestionsBasic.split(',');

			if (domain.match(/.+\..+/) && suggestions.indexOf(extension) < 0 && extension in supportedDomains)
			{
				suggestions.unshift(extension);
			}

			delayTimer = setTimeout(function()
			{
				suggestDomains(domain, suggestions, true);

				if ('' !== webpageIndex.domainsSuggestionsMore)
				{
					$('.domain_suggester > table td > div table').append('<tr class="domain_more" title="' + i18n.translate('More domains...').fetch() + '"><td colspan="2">' + i18n.translate('More domains...').fetch() + '</td></tr>');
				}
				webpageIndex.domainSuggestionsMoreBegin = 0;

				$('.domain_suggester > table td > div').show();
			}, SUGGESTER_DELAY_MS);
		});

		$('.domain_suggester > table td').on('click', 'tr', function(event)
		{
			if ($(this).hasClass('domain_error'))
			{
				return false;
			}
			if ($(this).hasClass('domain_more'))
			{
				$(this).remove();
				$('.domain_suggester > table td > div, .domain_suggester > div').css('max-height', '470px');
				var arrayMore = webpageIndex.domainsSuggestionsMoreArray.slice(webpageIndex.domainSuggestionsMoreBegin,
				webpageIndex.domainSuggestionsMoreBegin + SUGGESTER_PAGE_SIZE);

				if (arrayMore.length > 0)
				{
					suggestDomains($('input[name="register_domain"]').val(), arrayMore, false);

					if (arrayMore.length === SUGGESTER_PAGE_SIZE)
					{
						$('.domain_suggester > table td > div table').append('<tr class="domain_more" title="' + i18n.translate('More domains...').fetch() + '"><td colspan="2">' + i18n.translate('More domains...').fetch() + '</td></tr>');
						webpageIndex.domainSuggestionsMoreBegin += SUGGESTER_PAGE_SIZE;
					}
				}

				return;
			}

			if($(this).hasClass('domain_invalid'))
			{
				return;
			}

			selectDomain($(this).data('domain'));
		});

		$('#domain_form').submit(function(event)
		{
			event.preventDefault();
		});

		$('#dialog_domain_transfer input[name="register_authinfo"]').attachValidator(function()
		{
			var result = ($('#dialog_domain_transfer input[name="register_transfer"]:checked').val() !== '1' || $('#dialog_domain_transfer input[name="register_authinfo"]').val().trim() !== '');

			if (result)
			{
				$(this).removeClass('error');
			}
			else
			{
				$(this).addClass('error');
			}

			return result;
		});
	}


	$('ul.faq > li').each(function(index, value)
	{
		var element = $(value);
		element.addClass('inactive');

		var children = [];

		element.children('*').each(function(index, value)
		{
			if ($(value).prop('tagName') !== 'H4')
			{
				children.push($(value));
			}
		});

		element.append('<div></div>');
		element.children('div').append(children);
	});

	$('#content').on("click", "ul.faq > li", function()
	{
		var element = $($(this));

		if (element.hasClass('active'))
		{
			element.addClass('inactive');
			element.removeClass('active');
			element.children('div').slideUp(250);
		}
		else
		{
			element.addClass('active');
			element.removeClass('inactive');
			element.children('div').slideDown(250);
		}
	});

	$("#topmovie").append('<video id="video" poster="/img/transparent.png" autoplay muted autostart><source src="/img/movie1.webm" type=\'video/webm; codecs="vp8, vorbis"\' /><source src="/img/movie1.mp4" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\' /><source src="/img/movie1.ogv" type=\'video/ogg; codecs="theora, vorbis"\' /></video>');
	var autoplay_limit = 0;
	$("#video").bind('ended', function(){
		if(autoplay_limit < 50)this.play();
		autoplay_limit++;
	});

	$("#footer form input[type='submit']").on('click', function(event)
	{
		elem = this;
		$.post("/panel/"+webpage.language+"/newsletter", { 'action': "subscribe", 'newsletter_email': $("#footer input[name='newsletter_email']").val()})
			.done(function( data ) {
				data = $.parseJSON(data);
				$("#footer form").append("<div style='position:absolute;width:100%;' class='message message_"+data['status']+"'>"+data['message']+"</div>");
				$("#footer .message").fadeOut(4500);
			});
		event.preventDefault();
		return false;
	});
	var contactOpened = false;
	$("#page_contact .content > div > .button:first-child").on("click", function()
	{
		if(contactOpened)
		{
			$(this).removeClass('button_active');
			$('.contactform').slideUp(600);
			contactOpened = false;
		}
		else
		{
			$(this).addClass('button_active');
			$('.contactform').slideDown(600);
			contactOpened = true;
		}
	});

	$(".kb_content > ul > li a").on("click", function(e)
	{
		e.preventDefault();
		$(".current_content").removeClass("active");
		$(".current_content").removeClass("hassubcategory");
		$(".kb_content > ul > li.active").removeClass("hassubcategory");
		$(".kb_content > ul > li.active").removeClass("active_blue_arrow");
		$(".kb_content > ul > li.active > .subcategory").remove();
		$(".kb_content > ul > li").removeClass('active');
		$(this).parent().addClass("active");
		$(".current_content").html($(this).parent().children("div:last-child").html());
		$(".kb_content > ul > li.active > div li.active").removeClass("active");
		return false;
	});
	$(".kb_content > ul > li div").on("click", function(e)
	{
		e.preventDefault();
		$(this).parent().addClass("active");
		$(".current_content").html($(this).parent().children("div:last-child").html());
		$(".current_content > ul > li.active > a").click();
		return false;
	});

	$(".kb_content").on("mouseenter",".current_content > ul > li:first-child > a", function()
	{
		if(!$(".kb_content > ul > li.active").hasClass("active_blue_arrow"))$(".kb_content > ul > li.active").addClass("hover_firstchild");
	});
	$(".kb_content").on("mouseleave",".current_content > ul > li:first-child > a", function()
	{
		$(".kb_content > ul > li.active").removeClass("hover_firstchild");
	});

	$(".kb_content").on("click",".current_content > ul > li.haschilds > a", function(e)
	{
		e.preventDefault();
		if($(this).hasClass("active"))
		{
			$(this).removeClass("active");
			if($(this).parent().is(":first-child"))
			{
				$(".current_content").removeClass("active");
				$(".kb_content > ul > li.active").removeClass("active_blue_arrow");
				$(".kb_content > ul > li.active").addClass("hover_firstchild");
			}
			$(this).parent().children("div").children("ul").slideUp("fast", function(){});
		}
		else
		{
			$(this).addClass("active");
			if($(this).parent().is(":first-child"))
			{
				$(".current_content").addClass("active");
				$(".kb_content > ul > li.active").addClass("active_blue_arrow");
				$(".kb_content > ul > li.active").removeClass("hover_firstchild");
			}
			$(this).parent().children("div").children("ul").slideDown("fast", function(){});
		}
		return false;
	});
	if ($(".current_content").html() == "")$(".current_content").html($(".kb_content > ul > li.active div").html());
	$(".plan_block .plan_block_foot span:first-child").on("click", function(){
		if($(this).parent().parent().children(".details").css('display') != 'block')
		{
			$(this).parent().parent().children(".details").velocity("slideDown", {duration: ANIMATION_SPEED});
			$(this).children('img').velocity({ rotateZ: "180deg"}, {duration: ANIMATION_SPEED});
		}
		else
		{
			$(this).parent().parent().children(".details").velocity("slideUp", {duration: ANIMATION_SPEED});
			$(this).parent().parent().children(".details").children(".more_details").velocity("slideUp", {duration: ANIMATION_SPEED});
			$(this).children('img').velocity({ rotateZ: "0deg"}, {duration: ANIMATION_SPEED});
			$(this).parent().parent().children(".details").children('.more_details_button').css({"display":"block"});
		}

	});
	$(".plan_block .more_details_button").on("click", function(){
		var element = this;
		$(element).parent().parent().children(".details").children(".more_details").velocity("slideDown", {duration: ANIMATION_SPEED,
			complete: function(){
				$(element).css({"display":"none"});
			}});
	});

	/*
		Spoilers for Hosting table
	*/
	$("table.plans_footer div").on("click", function()
	{
		if($('.plans_table_container').css('display') == 'none')
		{
			$('.plans_table_container').velocity("slideDown", {duration: ANIMATION_SPEED});
			$("table.plans_footer div").text(i18n.translate('Hide').fetch());
			$('.plans_middle_container').first().css('display','block');
		}
		else
		{
			$('.plans_table_container').velocity("slideUp", {duration: ANIMATION_SPEED});
			$("table.plans_footer div").text(i18n.translate('More').fetch());
		}
	});

	$(".table_container .table_header_block").on("click", function()
	{
		if($(this).next('.plans_middle_container').css('display') == 'none')
		{
			$(this).next('.plans_middle_container').velocity("slideDown", {duration: ANIMATION_SPEED});
		}
		else
		{
			$(this).next('.plans_middle_container').velocity("slideUp", {duration: ANIMATION_SPEED});
		}
	});

	$(".table_slicer").on("click", function()
	{
		if($(this).parent().parent().prev('.in_slicer').css('display') == 'none')
		{
			$(this).parent().parent().prev('.in_slicer').velocity("slideDown", {duration: ANIMATION_SPEED, display: 'block'});
			$(this).children('td').children('p').text(i18n.translate("Hide").fetch());
		}
		else
		{
			$(this).parent().parent().prev('.in_slicer').velocity("slideUp", {duration: ANIMATION_SPEED});
			$(this).children('td').children('p').text(i18n.translate("More").fetch());
		}
	});

	if(typeof $('body').attr('id') !== 'undefined' && $('body').attr('id').match(/page_offer_domains_.*domains.*/) != null)
	{
		$('body').addClass('domain_offer_template');
	}
	$("#page_index #offer_promoted > div > div.item > .background").css({"height":$("#page_index #offer_promoted > div > div.item").height()});
	$(window).resize(function(){
		$("#page_index #offer_promoted > div > div.item > .background").css({"height":$("#page_index #offer_promoted > div > div.item").height()});
	});

	var aboutUsTemplateTimeline = function ()
	{
		$('section#aboutUsTemplate > .clear').before('<div class="aboutUsTemplate_highliter_static"></div>');
		$('section#aboutUsTemplate > .clear').before('<div class="aboutUsTemplate_highliter"></div>');

		this.fillTimeline = function()
		{
			var highliter = $('.aboutUsTemplate_highliter');
			var winPos = $(window).scrollTop();
			var distance = $(window).height() / 4;
			var timelineTop = $('.aboutUsTemplate_timeline').offset().top;
			var endpointHeaderSelector = $('.aboutUsTemplate_endpoint_header');
			var endpointTop = endpointHeaderSelector.offset().top + endpointHeaderSelector.height();
			$('.aboutUsTemplate_highliter_static').height(endpointTop - $('.aboutUsTemplate_highliter_static').offset().top -5);
			if(winPos + distance > timelineTop &&
				winPos + $(highliter).offset().top - timelineTop
				< endpointTop - distance)
			{
				$(highliter).height(winPos + distance - $('.aboutUsTemplate_timeline').offset().top);
			}
			else if (winPos + distance < timelineTop)
			{
				$(highliter).height(0);
			}
			else
			{
				$(highliter).height(endpointTop - $(highliter).offset().top);
			}
		};

		this.makeSvgTooltip = function () {
			var svgdom = $(document.getElementById('svgmap').contentDocument);

			$('.area', svgdom).each(function(i, parent){
				$("body").append("<div class='tooltipMap' id='tooltipMap"+i+"'><p>"+$(this).prev().text()+"</p></div>");
				var my_tooltip = $("#tooltipMap" + i);

				$(this).mouseover(function()
				{
					my_tooltip.css({opacity:0.8, display:"none"}).fadeIn(400);
				}).mousemove(function(e)
				{
					var svgOffset = $('#svgmap').offset();
					my_tooltip.css({ left: svgOffset.left + e.pageX + 15, top: svgOffset.top +  e.pageY + 15 });
				}).mouseout(function()
				{
					my_tooltip.fadeOut(400);
				});
			});
		};
	};

	aboutUsTemplateTimeline.prototype.start = function ()
	{
		$(window).scroll(this.fillTimeline).resize(this.fillTimeline).load(this.makeSvgTooltip);
	};

	if($('body#page_aboutus').length !== 0)
	{
		var timeLine = new aboutUsTemplateTimeline();
		timeLine.start();
	}
});

