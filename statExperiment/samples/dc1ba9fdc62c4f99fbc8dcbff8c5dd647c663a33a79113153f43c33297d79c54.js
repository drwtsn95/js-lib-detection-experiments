console.log("index.js: start load")

window.DigitainOpenCashbox = function () {
	window.OpenCashboxDeposit("bet")
};

function removePopup() {
	$.each($('div.popup'), function (idx, item) {
		item.remove();
	});
	$('body').removeClass('page_shadow');
};

function unsubscribe() {
	var unsub_data = {
		"email": "",
		"tag": ""
	};
	unsub_data.email = pinup.getCookie("pinupBet-unsubscribe_hash") || "";
	unsub_data.tag = pinup.getCookie("pinupBet-tag") || "*";
	if (unsub_data.email != "") {
		initPopup("popupSubCancel");
		$("#popup_subcancel_accept_btn").forceClick(function () {
			removePopup()
			hash = pinup.getCookie("pinupBet-unsubscribe_hash");
			tag = pinup.getCookie("pinupBet-tag") || "*";
			$.removeCookie("pinupBet-unsubscribe_hash", {
				path: '/'
			});
			$.removeCookie("pinupBet-tag", {
				path: '/'
			});
			$.ajax({
				url: '/ajax/players/unsubscribe',
				type: 'POST',
				data: {
					"hash": hash,
					"tag": tag,
				},
				timeout: 15000,
				success: function (result) {
					if (result.error == null) {
						initNotice(getLoc("popup_mainJS_successful_unsubscribe"))
					} else {
						initNotice(result.error.message1 + ' ' + result.error.message2);
					}
				}
			});
		});
		$("#popup_subcancel_close_btn").forceClick(function () {
			removePopup()
			$.removeCookie("pinupBet-unsubscribe_hash", {
				path: '/'
			});
			$.removeCookie("pinupBet-tag", {
				path: '/'
			});
		});
		$(".js--popup__close").forceClick(function () {
			removePopup()
			$.removeCookie("pinupBet-unsubscribe_hash", {
				path: '/'
			});
			$.removeCookie("pinupBet-tag", {
				path: '/'
			});
		});
	}
};

function checkUnsubCookie() {
	var email = pinup.getCookie("pinupBet-unsubscribe_hash") || "";
	if (email != "") {
		unsubscribe();
	};
};

$(document).ready(function () {
	checkUnsubCookie()

	function digitainIframeLoaded() {
		listenMessage = function (e) {
			switch (e.data.command) {
				case 'loaded':
					if ($("#preloader") != undefined) {
						$("#preloader").css("display", "none");
					};
					break;
			}
		};
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
		var eventer = window[eventMethod];

		if (typeof (window.postMessage) !== 'undefined') {
			eventer(eventMethod === "attachEvent" ? "onmessage" : "message", listenMessage, false);
		}
	};


	var $popup = $('#popup');
	var filter = {
		page: $('#iframe_page').data('page') || "",
		match: $('#iframe_page').data('match') || "",
		id: $('#iframe_page').data('id') || ""
	};

	function getUrlVars() {
		var vars = [],
			hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}

	// window.onload = function() {
	setTimeout(function () {
		console.log("index.js: start check hash")
		var anc = window.location.hash.replace("#", "");
		if (anc !== "") {
			var res = anc.split("_");
			switch (res[0]) {
				case "cashboxdeposit":
					window.location.hash = "";
					setTimeout(function () {
						window.defaultSum = 0;
						window.OpenCashboxDeposit("bet");
						setTimeout(function () {
							if (!$('.cashbox__item--active')[0]) {
								handleCashItemOur($('.cashbox__item')[0], 'popup')
							}
						}, 100);
					}, 5000);
					break;
				case "register":
					window.location.hash = "";
					initNotice(getLoc("popup_index_register"));
					break;
				case "registerMobile":
					window.location.hash = "";
					initNotice(getLoc("popup_index_registerMobile"));
					break;
				case "emailconfirm":
					window.location.hash = "";
					initNotice(getLoc("popup_index_emailconfirm"));
					break;
				case "usedemailconfirm":
					window.location.hash = "";
					initNotice(getLoc("popup_index_usedemailconfirm"));
					break;
				case "registration":
					window.location.hash = "";
					if (!window.isLogin) {
						if (res.length == 2) {
							switch (res[1]) {
								case "mob":
								case "mob/":
									window.OpenPopupRegistration()
									break;
								case "email":
								case "email/":
									$.when(window.OpenPopupRegistration(true)).then(function () {
										$('#popup_reg_typeEmail').addClass('popup__nav-item--active');
										$('#popup_reg_typePhone').removeClass('popup__nav-item--active');
										$('#popup_reg_form_email').css('display', 'block');
										$('#popup_reg_form_phone').css('display', 'none');
										// $('#uLogin').css('display', 'flex');

										window.EnterForSubmit('#popup_reg_email', '.registration');
										window.EnterForSubmit('#popup_reg_password', '.registration');
									});
									break;
							}
							return;
						}
						if (!isMobile) {
							window.OpenPopupRegistration();
							$('#popup_reg_typeEmail').addClass('popup__nav-item--active');
							$('#popup_reg_typePhone').removeClass('popup__nav-item--active');
							$('#popup_reg_form_email').css('display', 'block');
							$('#popup_reg_form_phone').css('display', 'none');
							// $('#uLogin').css('display', 'flex');

							window.EnterForSubmit('#popup_reg_email', '.registration');
							window.EnterForSubmit('#popup_reg_password', '.registration');
						} else {
							window.OpenPopupRegistration();
						}
					}
					break;
				case "authorization":
					window.location.hash = "";
					window.OpenPopupRegistration();
					break;
				case "recovery":
					window.location.hash = "";
					$('#popupPlace').empty();
					$('body').addClass('page_shadow');
					$('#popupPlace').tplAppend('popup-recovery-newpassword', null);
					$('#popup_newpassword_hash').val(res[1]);
					break;
				case "unsubscribe":
					window.location.hash = "";
					unsubscribe();
					break;
				case "bonusChoice":
					window.location.hash = "";
					loadPopupBonusChoice();
					break;
				case "cashbox":
					window.location.hash = "";
					window.defaultSum = 0;
					window.OpenCashboxDeposit("bet");
					setTimeout(function () {
						if (!$('.cashbox__item--active')[0]) {
							handleCashItemOur($('.cashbox__item')[0], 'popup')
						}
					}, 250);
					break;
				default:
					console.log("default");
			}
		} else {
			var popup = getUrlVars()["popup"];
			switch (popup) {
				case "registration":
					if (!window.isLogin) {
						if (!isMobile) {
							window.OpenPopupRegistration();
							$('#popup_reg_typeEmail').addClass('popup__nav-item--active');
							$('#popup_reg_typePhone').removeClass('popup__nav-item--active');
							$('#popup_reg_form_email').css('display', 'block');
							$('#popup_reg_form_phone').css('display', 'none');
							// $('#uLogin').css('display', 'flex');

							window.EnterForSubmit('#popup_reg_email', '.registration');
							window.EnterForSubmit('#popup_reg_password', '.registration');
						} else {
							window.OpenPopupRegistration();
						}
					}
					break;
				case "bonusChoice":
					loadPopupBonusChoice();
					break;
				case "cashbox":
					window.defaultSum = 0;
					window.OpenCashboxDeposit("bet");
					setTimeout(function () {
						if (!$('.cashbox__item--active')[0]) {
							handleCashItemOur($('.cashbox__item')[0], 'popup')
						}
					}, 250);
					break;
				case "register":
					initNotice(getLoc("popup_index_register"));
					break;
				case "registerMobile":
					initNotice(getLoc("popup_index_registerMobile"));
					break;
				case "emailconfirm":
					initNotice(getLoc("popup_index_emailconfirm"));
					break;
				case "usedemailconfirm":
					initNotice(getLoc("popup_index_usedemailconfirm"));
					break;
				case "authorization":
					window.OpenPopupRegistration();
					break;
				case "recovery":
					$('#popupPlace').empty();
					$('body').addClass('page_shadow');
					$('#popupPlace').tplAppend('popup-recovery-newpassword', null);
					$('#popup_newpassword_hash').val(res[1]);
					break;
				case "replacement":
					$('#popupPlace').empty();
					$('body').addClass('page_shadow');
					$('#popupPlace').tplAppend('popup-email-recovery', null);
					$('body,html').animate({
						scrollTop: $("body").offset().top
					}, 1500);
					break;
				case "unsubscribe":
					unsubscribe();
					break;
			}
		}
	}, 299);
	// };

	$(window).on("hashchange", function () {
		switch (window.location.hash) {
			case "#registration":
				if (!window.isLogin) {
					window.OpenPopupRegistration();
				}
				break;
			case "#authorization":
				window.OpenPopupRegistration();
				break;
			case "#unsubscribe":
				unsubscribe();
				break;
			case "#emailconfirm":
                window.location.hash = "";
			case "#usedemailconfirm":
			    window.location.hash = "";
			default:
				break;
		};
	});

	function loadPopupBonusChoice() {
		if (window.currency != undefined && window.currency != "") {
			$.ajax({
				url: '/ajax/bonus/getBonusChoiceParamsPopup',
				type: 'POST',
				timeout: 15000,
				success: function (result) {
					if (result.error === null) {
						$("#yellowLine").css('display', 'none');
						$('body').addClass('page_shadow');
						$('#popupPlace').empty();

						$('#popupPlace').tplAppend('popup-bonusChoice', result);


						var bonusChoice = {
							bonusChoice: 'no',
						};

						$('.popup_bonusChoiceInfo').forceClick(function () {
							bonusChoice.bonusChoice = $(this).data('choice');
							$.ajax({
								url: '/ajax/bonus/getInfoBonus',
								type: 'POST',
								data: bonusChoice,
								timeout: 15000,
								success: function (result) {
									if (result.error === null) {
										$('#bonus-modal-sport').show();
										$('#bonus-modal-sport').empty();
										$('#bonus-modal-sport').append(result.info.html)
									} else {
										initNotice(result.error.message1 + " " + result.error.message2);
									}
								},
							});
						});

						$('.close_and_show_yellowline').forceClick(function () {
							$("#yellowLine").css('display', 'block');
						});


						$('.popup_bonusChoiceSet').forceClick(function () {
							bonusChoice.bonusChoice = $(this).data('choice');

							$.ajax({
								url: '/ajax/bonus/set',
								type: 'POST',
								data: bonusChoice,
								timeout: 15000,
								success: function (result) {
									if (result.error === null) {
										if (result.action === "cashbox") {
											window.bonusChoiceParams.priority = bonusChoice.bonusChoice;
											window.defaultSum = 0;
											window.OpenCashboxDeposit("bet");
											setTimeout(function () {
												if (!$('.cashbox__item--active')[0]) {
													handleCashItemOur($('.cashbox__item')[0], 'popup')
												}
											}, 250);
										} else if (result.action === "registration") {
											if (result.license) {
												window.location.replace(window.languageForPath + "/registration?page=" + window.location.pathname);
											} else {
												window.OpenPopupRegistration();
											}
										}
									} else {
										initNotice(result.error.message1 + " " + result.error.message2);
									}
								},
							});
						});

						if ($(window).width() < 1024) {
							$(".bonus-page__list").addClass('owl-carousel')
							$(".bonus-page__list").owlCarousel({
								stagePadding: 30,
								loop: false,
								margin: 20,
								rewind: true,
								responsive: {
									0: {
										stagePadding: 30,
										items: 1
									},
									375: {
										stagePadding: 50,
										items: 1
									},
									411: {
										items: 1,
										stagePadding: 30
									},
									768: {
										items: 2,
										stagePadding: 30
									}
								}
							});
						}
					} else {
						window.defaultSum = 0;
						window.OpenCashboxDeposit("bet");
						setTimeout(function () {
							if (!$('.cashbox__item--active')[0]) {
								handleCashItemOur($('.cashbox__item')[0], 'popup')
							}
						}, 250);
					}
				},
			});
		}
	}

	function hideLoader(){		
		if ($("#preloader")!= undefined){
			$("#preloader").css("display", "none");
		};
	}

	function loadIframeData() {
		console.log("index.js: load iframe")
		if (filter.match == "" || filter.id == "") {
			var hashArray = (window.location.pathname).split("/");
			var lengthHashArray = hashArray.length
			if (lengthHashArray > 1) {
				if (((hashArray[1] == window.userLanguage || hashArray[1] == "ru-ru") && lengthHashArray > 3) || (lengthHashArray > 2 && hashArray[1] !== window.userLanguage && hashArray[1] !== "ru-ru")) {
					filter.match = hashArray[lengthHashArray - 2].toLowerCase();
					if (filter.match == "ru-ru") {
						filter.match = "ru";
					};
					filter.match = filter.match.charAt(0).toUpperCase() + filter.match.substr(1);
					filter.id = hashArray[lengthHashArray - 1];
				}
			};
		}
		$.ajax({
			url: '/ajax/index/digitain',
			type: 'POST',
			data: filter,
			timeout: 15000,
			success: function (result) {
				if (result.error === null) {
				    if (screen.width < 1024){
				        result.data.device = 'm'
				    }
					if (window.esport == true) {
						console.log("DIGIGTAIN version: ESPORT")
						var params = params || {};
						params.server = result.data.server;
						params.containerId = "sport_div_iframe";
						params.token = result.data.token;
						params.language = result.data.language;
						params.defaultLanguage = result.data.language;
						params.device = result.data.device;
						params.registration = result.data.registration;
						// params.sportPartner = result.data.sportPartner;
						params.oddsFormat = window.digitainOddsFormt;

						if (params.token == ""){
							params.token = "-";
						};	

						params.loginTrigger =  function() {
							pinup.openNonAuth();
						};

						if (result.data.device == "m") {
							Bootstrapper.boot(params, { name: "ESport" });
						} else {
							Bootstrapper.bootIframe(params, { name: "ESport" });
						}
						
						hideLoader()
							
					} else if ((window.digitainVersion == "desktop" && window.sportBookView != "asianView" ) || window.digitainVersion == "old" || window.digitainVersion == "") {
					console.log("DIGIGTAIN version: OLD/DESKTOP")
					var _sp = _sp || [];
					_sp.push(['server', result.data.server]);
					// _sp.push(['sportPartner', result.data.sportPartner]);
					_sp.push(['token', result.data.token]);
					_sp.push(['language', result.data.language]);
					_sp.push(['login', result.data.login]);
					_sp.push(['registration', result.data.registration]);
					_sp.push(['currentPage', result.data.currentPage]);
					_sp.push(['device', result.data.device]);
					_sp.push(['eventId', result.data.eventId]);
					_sp.push(['oddsFormat', window.digitainOddsFormt]);
					_sp.push(['fixedHeight', true]);

						if (result.data.device == "d") {
						customCssUrl = window.location.origin + "/files/css/digitainSport.css?version="+window.currentVersion;
						_sp.push(['customCssUrl', encodeURIComponent(customCssUrl)]);
					}

					if (result.data.currentPage != "Schedule" && result.data.currentPage != "0") {
						_sp.push(['unHideOverflow', true]);
					} else {
						_sp.push(['unHideOverflow', false]);
					};

					if (!result.data.allowLiveTV) {
						_sp.push(['deposit', 'window.DigitainOpenCashbox']);
					};

					window.spIndex = _sp;
					SportFrame.frame(_sp);
					digitainIframeLoaded();
				} else if (window.digitainVersion == "new") {
					console.log("DIGIGTAIN version: NEW")
					var params = params || {};
					params.server = result.data.server;
					params.containerId = "sport_div_iframe";
					params.token = result.data.token;
					params.language = result.data.language;
					params.defaultLanguage = result.data.language;
					params.device = result.data.device;
					params.registration = result.data.registration;
					// params.sportPartner = result.data.sportPartner;
					params.oddsFormat = window.digitainOddsFormt
										
					if (params.token == ""){
						params.token = "-";
					};

					if (!result.data.allowLiveTV) {
						params.deposit = 'window.DigitainOpenCashbox';
					};

					params.defaultLanguage = params.language;

					params.loginTrigger =  function() {
					   pinup.openNonAuth();
					};
					params.events = {
						onAppMount: hideLoader
					}
					Bootstrapper.boot(params, { name: "Mobile" });
				} else {
						console.log("DIGIGTAIN version: ASIAN")
						var params = result.data;
						params.oddsFormat = 2
                        
                        params.containerId = "sport_div_iframe";

                        if (params.token == ""){
                            params.token = "-";
                        };

                        params.defaultLanguage = params.language;

                        params.loginTrigger =  function() {
                           pinup.openNonAuth();
						};
						

                        Bootstrapper.bootIframe(params, { name: "AsianView" }, { height: "900px" });
                        if ($("#preloader")!= undefined){
                            $("#preloader").css("display", "none");
                        };
                    }
				} else {
					if ($("#preloader") != undefined) {
						$("#preloader").css("display", "none");
					};
				}

			},
			error: function () {
				if ($("#preloader") != undefined) {
					$("#preloader").css("display", "none");
				};
			}

		});
		filter.match = "";
		filter.id = "";
	}

	console.log("index.js: full load")

	loadIframeData();

});