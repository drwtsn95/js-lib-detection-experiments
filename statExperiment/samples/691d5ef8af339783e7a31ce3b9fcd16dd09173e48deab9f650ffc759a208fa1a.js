/* common.js */

// constant
//////////////////////////////////////////////////
var SYSTEM_ERROR_MESSAGE =
  "システムエラーが発生しました。\nお手数ですが画面を更新して、もう一度最初から操作をしてください。";

// variables
//////////////////////////////////////////////////
var ieVer = checkIEVer(); // IEバージョン採取(※非IEの場合false)
var uiGnavNews_timer;

// functions
//////////////////////////////////////////////////
// 初期化
function initialize() {
  // ブラウザ確認
  if (ieVer <= 8 && ieVer != false) $("html").addClass("Uie8");
  $("html").addClass(getUA());
}

// 個別CSSをBODYからHEADに読み込む
function addCss(_path) {
  var insert = '<link rel="stylesheet" media="screen" href="' + _path + '">';
  $("head").append(insert);
}

// ユーザエージェント取得
function getUA() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua == null || ua == "") {
    return false;
  }
  var ver = window.navigator.appVersion.toLowerCase();
  if (ua.indexOf("opera") != -1) {
    return "opera";
  } else if (ua.indexOf("msie") != -1) {
    if (ver.indexOf("msie 10.") != -1) {
      return "ie10";
    } else if (ver.indexOf("msie 9.") != -1) {
      return "ie9";
    } else if (ver.indexOf("msie 8.") != -1) {
      return "ie8";
    } else if (ver.indexOf("msie 7.") != -1) {
      return "ie7";
    } else if (ver.indexOf("msie 6.") != -1) {
      return "ie6";
    } else {
      return "ie";
    }
  } else if (ua.indexOf("chrome") != -1) {
    return "chrome";
  } else if (ua.indexOf("safari") != -1) {
    return "safari";
  } else if (ua.indexOf("firefox") != -1) {
    return "firefox";
  } else {
    return false;
  }
}

// IEのバージョン取得
function checkIEVer() {
  var ua = getUA();
  if (ua == null || ua == "") {
    return false;
  }
  if (ua.indexOf("ie") != -1) {
    return ua.substring(2);
  } else {
    return false;
  }
}

// FileReader対応チェック
function checkFileReader() {
  return window.FileReader ? true : false;
}

// Getパラメータ取得
function getUrlQuery(key) {
  if (location.search.length > 1) {
    var get = new Object();
    var ret = location.search.substr(1).split("&");
    for (var i = 0; i < ret.length; i++) {
      var r = ret[i].split("=");
      get[r[0]] = r[1];
    }
    return escape(get[key]);
  } else {
    return false;
  }
}

// Cookie取得
function getCookie(key) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i].split("=");
    if (c[0] == key) {
      return c[1];
    }
  }
  return false;
}

// Cookieセット
function setCookie(key, value, limit) {
  _limit = limit || 7;
  var date = new Date();
  date.setDate(date.getDate() + limit);
  var cookie = key + "=" + value + "; expires=" + date.toGMTString();
  document.cookie = cookie;
}

// 日付生成
function generateDate(_prefix) {
  var y = $("#" + _prefix + "Y").val();
  var m = $("#" + _prefix + "M").val();
  var last;
  // 閏年判定
  if (2 == m && (0 == y % 400 || (0 == y % 4 && 0 != y % 100))) {
    last = 29;
  } else {
    last = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)[m - 1];
  }
  // 要素取得と初期化
  var $day = $("#" + _prefix + "D");
  $day.find("option").remove();
  $day.append('<option value="-1">-</option>');
  //  日の要素生成
  for (var i = 0; i < last; i++) {
    var n = parseInt(i + 1);
    $day.append('<option value="' + n + '">' + n + "日</option>");
  }
}

// Placeholder表示
function showPlaceHolder(options) {
  if (ieVer > 9 || !ieVer) return false;
  var posT = "8px" || options["top"];
  var posL = "9px" || options["left"];
  var fSize = "12px" || options["font-size"];
  var lHeight = "1.4" || options["line-height"];
  var fColor = "#a9a9a9" || options["color"];
  $("input[placeholder], textarea[placeholder]").each(function () {
    if ($(this).parent().hasClass("phWrap")) return false;
    if ($(this).val().length < 1) {
      var placeholderStr = $(this).attr("placeholder");
      var overflow =
        $(this)[0].tagName.toUpperCase() == "INPUT" ? "hidden" : "visible";
      $(this).wrap('<div class="phWrap" style="position:relative;"></div>');
      $(this).after(
        '<p style="position:absolute; ' +
          "top:" +
          posT +
          "; " +
          "left:" +
          posL +
          "; " +
          "font-size:" +
          fSize +
          "; " +
          "line-height:" +
          lHeight +
          "; " +
          "color:" +
          fColor +
          "; " +
          "width:" +
          ($(this).width() - 16) +
          "px; " +
          "height:auto; " +
          "word-break:break-all; " +
          "overflow:" +
          overflow +
          '">' +
          placeholderStr +
          "</p>"
      );
      $(this).on("focus", function () {
        $(this).next().hide();
      });
      $(this).on("blur", function () {
        if ($(this).val().length >= 1) return false;
        $(this).next().show();
      });
      $(this)
        .next()
        .on("click", function () {
          $(this).prev().focus();
        });

      /*
      $(this).bind('focus', function() { $(this).next().hide(); });
      $(this).bind('blur', function() {
        if ($(this).val().length >= 1) return false;
        $(this).next().show();
      });
      $(this).next().bind('click', function() {
        $(this).prev().focus();
      });
*/
    }
  });
}

// position:absolute要素のセンタリング
function centeringObj($obj) {
  var winW = $(window).width();
  //var winH = $(window).height();
  var objW = $obj.width();
  //var objH = $(id).height();
  posX = (winW - objW) / 2;
  if (posX <= 0) $("body").scrollLeft(-posX);
  else $obj.css({ left: posX });
}

// 閲覧環境のチェック
function checkViewEnvironment(target) {
  if ($(target).is(":checked")) {
    insertViewEnvironment();
  } else {
    removeViewEnvironment();
  }
}

// 閲覧環境の挿入
function insertViewEnvironment() {
  var insertStr = "";
  //var jsDate = new Date();
  //insertStr = 'JSDATE  :  ' + jsDate.getFullYear() + '/' + jsDate.getMonth()+1 + '/' + jsDate.getDate() + ' ' + jsDate.getHours() + ':' + jsDate.getMinutes() + ':' + jsDate.getSeconds() + '\n';
  //insertStr = insertStr + 'HOST     :  ' + location.host + '\n';
  //insertStr = insertStr + 'HOSTNAME :  ' + location.hostname + '\n';
  //insertStr = insertStr + 'PORT     :  ' + location.port + '\n';
  //insertStr = insertStr + 'REQUEST  :  ' + location.pathname + '\n';
  //insertStr = insertStr + 'CODE     :  ' + navigator.appCodeName + '\n';
  //insertStr = insertStr + 'BROWSER  :  ' + navigator.appName + '\n';
  //insertStr = insertStr + 'VERSION  :  ' + navigator.appVersion + '\n';
  insertStr = insertStr + "LANG     :  " + navigator.language + "\n";
  insertStr = insertStr + "PLATFORM :  " + navigator.platform + "\n";
  insertStr = insertStr + "USERAGENT:  " + navigator.userAgent + "\n";
  //insertStr = insertStr + 'REFERER  :  ' + document.referrer + '\n';
  //insertStr = insertStr + 'DOMAIN   :  ' + document.domain + '\n';
  insertStr = insertStr + "SCREEN.W :  " + screen.width + "\n";
  insertStr = insertStr + "SCREEN.H :  " + screen.height + "\n";
  //if (screen.colorDepth==8) {
  //  insertStr = insertStr + 'SCREEN.COL:  ' + screen.colorDepth + 'Bit\n';
  //} else {
  //  insertStr = insertStr + 'SCREEN.COL:  ' + screen.colorDepth + 'Bit\n';
  //}
  $("#viewEnvironment").show();
  $("#viewEnvironment").empty();
  $("#viewEnvironment").append(htmlEscape(insertStr));
  $("#viewEnvironment_hidden").val(insertStr);
}

// 閲覧環境の削除
function removeViewEnvironment() {
  $("#viewEnvironment").hide();
  $("#viewEnvironment").empty();
  $("#viewEnvironment_hidden").val("");
}

// newsの自動スライド
function slideNews(index) {
  $("#gNavNews .list > li:visible").fadeOut("slow", function () {
    $("#gNavNews .list > li").removeClass("current");
  });
  $("#gNavNews .list > li").eq(index).find("span").css({ left: "10px" });
  $("#gNavNews .list > li").eq(index).find("span").animate({ left: "0px" });
  $("#gNavNews .list > li")
    .eq(index)
    .fadeIn("slow", function () {
      $(this).addClass("current");
    });
}

// Windowにフィット
function fitWindow($obj) {
  $obj.width($(window).width());
  $obj.height($(window).height());
}

// pulldown表示
function showHdPulldown() {
  $("#hdMymenu").fadeIn(100);
  $("#hdPulldown .bt_myMenu").addClass("open");
}

// pulldown非表示
function hideHdPulldown() {
  $("#hdMymenu").fadeOut(100);
  $("#hdPulldown .bt_myMenu").removeClass("open");
}

// tooltip表示
function showTooltip(_this) {
  var $this = $(_this);
  var thisTip = $(_this).next(".j-tooltip");
  var thisParent = thisTip.parent(".tpWrap");
  hideTooltip();
  var posY = thisParent.height() + 20;
  thisTip.css({
    top: posY + "px",
    left: "20px",
  });
  thisTip.fadeIn("fast");
}
function hideTooltip() {
  $(".j-tooltip").hide();
}

// パスワード安全性チェック
function checkPasswordSafety(_password) {
  //var _target = arguments[1] || '#ti_password';
  var _popup = arguments[1] || "#safetyGrade";
  var flg = 0;
  var guideStr = "";
  // 文字数判定
  if (_password.length <= 0) {
    hidePasswordSafety();
    return false;
  } else if (_password.length < 8) {
    guideStr += '<p class="err">8文字以上にしてください。</p>';
  } else if (_password.length > 32) {
    guideStr += '<p class="err">32文字以下にしてください。</p>';
  }
  // 文字種判定
  if (_password.match(/[0-9]/)) flg++;
  if (_password.match(/[a-zA-Z]/)) flg++;
  if (_password.match(/[_\!#\$%&'\(\)=~|\-\^\\@\[;:\],\.\/`\{\+\*\}>\? ]/))
    flg++;
  if (
    _password.match(/</) ||
    _password.match(/&{/) ||
    _password.match(
      /[^0-9a-zA-Z^_\!#\$%&'\(\)=~|\-\^\\@\[;:\],\.\/`\{\+\*\}>\? ]/
    )
  )
    flg = -1;
  if (flg <= -1) {
    guideStr +=
      '<p class="err">不正な文字が含まれています。</p>\n<a class="mc_a" href="/faq_detail?categoryId=2&id=3">パスワードに使用できる文字について</a>\n';
  } else if (flg < 2) {
    guideStr += '<p class="err">英数字、記号を組み合わせてください。</p>';
  }
  // エラー出力
  hidePasswordSafety();
  if (guideStr.length > 0) {
    $(_popup).css({ display: "inline-block" }).find(".inner").append(guideStr);
  } else {
    $(_popup)
      .css({ display: "inline-block" })
      .find(".inner")
      .append('<p class="mc_p valid">有効なパスワードです。</p>');
  }
}
function hidePasswordSafety(_config) {
  //var _target = arguments[1] || '#ti_password';
  var _popup = arguments[1] || "#safetyGrade";
  $(_popup).css({ display: "none" }).find(".inner").empty();
}

// 指定要素までスクロール
//function scroll2Element($target) {
//  if ($target.length <= 0) return false;
//  $('html, body').animate({scrollTop:$target.offset().top + 'px'}, 'normal');
//  $target.click();
//}

// エラーの存在チェック
function isExistError($target) {
  if ($target != undefined) $target = $target.find(".err");
  else $target = $(".err");
  var _f = true;
  var _tmp = "";
  $target.each(function () {
    _tmp += $.trim($(this).text());
  });
  if (_tmp.length <= 0) _f = false; // エラー無し
  return _f;
}

// 指定ブロック内の<img>要素のwidth, height属性を無効化
function disableWH($block) {
  $block.find("img").each(function () {
    $(this).removeAttr("height");
    $(this).removeAttr("width");
    $(this).removeAttr("style");
    if ($(this).width() > $block.width()) {
      $(this).width($block.width());
    }
  });
}

// 特定のHTMLタグを実態参照置換
function htmlEscape(text) {
  var s = new String(text);
  s = s.replace(/&/g, "&amp;");
  s = s.replace(/"/g, "&quot;");
  s = s.replace(/'/g, "&#39;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  return s;
}

// events
//////////////////////////////////////////////////
$(function () {
  // 初期化
  initialize();

  // .errが空の場合 remove
  /*
  $('.err').each(function() {
    var _val = $.trim($(this).text());
    if (_val.length <= 0) $(this).remove();
  });
*/

  // .errが全て空の場合
  if (!isExistError()) $(".errNotice").hide();
  else $(".errNotice").show();

  // .answerが空の場合
  $(".mc_answer").each(function () {
    var _val = $.trim($(this).text());
    if (_val.length <= 0) $(this).css({ background: "none" });
  });

  // ajax待ち処理
  $(document).on("click", ".bt_lockScreen", function () {
    var $form = $(this).parents("form").eq(0);
    var _waitingObj =
      '<div id="mdl_lockScreen" class="mdl">' +
      '<div class="mdlHead">' +
      '<p class="ttl">通信中...</p>' +
      "<!-- /.mdlHead --></div>" +
      '<div class="mdlBody">' +
      '<div class="taC">' +
      '<img src="/assets/images/ico_loading.gif" alt="" style="margin:20px auto 30px;" />' +
      '<p class="mc_p mB40">ただいま通信中です...<br />しばらくお待ちください。</p>' +
      "</div>" +
      "<!-- /.mdlBody --></div>" +
      "<!-- /#mdl_lockScreen --></div>";
    // スクリーンロック
    if ($("#mdl_lockScreen").length < 1) $("body").append(_waitingObj);
    mdl.showModal("#mdl_lockScreen", true);
    setTimeout(function () {
      $form.submit();
    }, 10); // loading画像を表示するために10ms待ち
  });

  // limit以上のファイルを参照した場合 submit禁止
  $("input:file").change(function () {
    if (this.files == undefined || this.files == null) return false; // 空, nullの場合
    var _fSize = this.files[0].size;
    var $form = $(this).parents("form").eq(0);
    $(this).prev("p.err").remove();
    if (this.files[0].size < 10000000) {
      // limit:3MB
      if ($form.attr("onsubmit") == "return false") {
        $form.removeAttr("onsubmit");
      }
    } else {
      $(this).before('<p class="err">ファイルサイズの上限は10MBです。</p>');
      $form.attr("onsubmit", "return false");
    }
  });

  // form submit時
  $("form").submit(function () {
    var _onsubmitAttr = $(this).attr("onsubmit");
    if (_onsubmitAttr == undefined) return true;
    else if (_onsubmitAttr.indexOf("return false") > -1)
      alert(
        "入力エラーがあるため送信できません。\nエラー内容をご確認ください。"
      );
  });

  // form多重送信対策
  $("form").submit(function () {
    setTimeout(function () {
      $(this)
        .children()
        .each(function () {
          $(this)
            .removeAttr("onclick href")
            .off("click")
            .attr("disabled", "disabled");
        });
    }, 1);
  });

  // submitトリガーへの個別対策
  // ※対象要素に class="disable2ndClick" を付与
  $(".disable2ndClick").click(function () {
    $(this).removeAttr("onclick href").off("click");
  });

  // scroll top
  if ($("#go2Top").length) {
    $("#go2Top").hide();
    $(window).scroll(function () {
      var $top = $("#go2Top");
      if ($(this).scrollTop() < 100) {
        $top.fadeOut();
      } else {
        $top.fadeIn();
      }
    });
    $("#go2Top").click(function () {
      $("body, html").animate({ scrollTop: 0 }, 500);
      return false;
    });
  }

  // 閲覧環境を添付
  if ($("#viewEnvironment_check").length) {
    checkViewEnvironment("#viewEnvironment_check");
  }

  // IE9以前でPlaceholderを有効化
  if ($("input[placeholder], textarea[placeholder]").length) {
    showPlaceHolder();
  }

  // モーダルウィンドウ
  if ($(".mdl").length) {
    // windowにフィット
    $(window).resize(function () {
      mdl.adjustWH($("#mdlOverlay"));
      mdl.setModalPos($(".mdlWrap:visible"));
    });
    // モーダルclose
    $(document).on("click", ".mdl .close", function () {
      mdl.hideModal("#" + $(this).parents(".mdl").attr("id"));
    });
    // 全モーダル消去
    $(document).on("click", "#mdlOverlay", function () {
      mdl.hideAllModal();
    });
  }

  // news自動スライド
  if ($("#gNavNews").length) {
    uiGnavNews_timer = setInterval(function () {
      if ($("#gNavNews .list > li").length <= 1) {
        clearInterval(uiGnavNews_timer);
        return false;
      }
      var currentIndex = 0 || $("#gNavNews .list > li.current").index();
      var maxIndex = $("#gNavNews .list > li").length - 1;
      if (currentIndex < maxIndex) currentIndex++;
      else currentIndex = 0;
      slideNews(currentIndex);
    }, 6000);
  }

  // gNav special
  $("#gNav .special > a").toggle(
    function () {
      $(this).next().slideDown(200);
      $(this).addClass("current");
    },
    function () {
      $(this).next().hide();
      $(this).removeClass("current");
    }
  );

  // loginメニュー pulldown
  if ($("#hdPulldown").length) {
    $("#hdPulldown .bt_myMenu").click(function () {
      if ($("#hdMymenu").is(":visible")) {
        hideHdPulldown();
      } else {
        showHdPulldown();
      }
      return false;
    });
    $(document).click(function (e) {
      var hide_f = true;
      $(e.target)
        .parents()
        .each(function () {
          if ($(this)[0] === $("#hdMymenu")[0]) hide_f = false;
        });
      if (hide_f) hideHdPulldown();
    });
  }

  // 自動フォーカス
  if ($(".autoFocus").length) {
    $(".autoFocus")[0].focus();
  }

  // tooltip
  if ($(".tooltip").length) {
    $(".tooltip").toggle(
      function () {
        showTooltip(this);
      },
      function () {
        hideTooltip();
      }
    );
    $(document).click(function () {
      if ($(".j-tooltip").length) hideTooltip();
    });
    $(window).resize(function () {
      if ($(".j-tooltip").length) hideTooltip();
    });
  }

  // ti_password
  $("#ti_password").bind("keyup change", function () {
    checkPasswordSafety($(this).val());
  });

  // fileReader非対応端末
  if (!checkFileReader()) {
    $("html").addClass("noFileReader");
  }

  // ヘッダーのアイコンメニューtooltip
  // $("#iconMenu a").hover(function() {
  //  $(this).find(".hTooltip").animate({opacity: "show", bottom: "-37"}, "slow");}, function() {
  //         $(this).find(".hTooltip").animate({opacity: "hide", bottom: "-45"}, "fast");
  //   });
  // return false;
  $("#iconMenu a")
    .mouseover(function () {
      $(this).find(".hTooltip").show();
    })
    .mouseout(function () {
      $(this).find(".hTooltip").hide();
    });

  //header固定
  var hed = $("#header");
  if (hed.offset() != null) {
    var hedTop = hed.offset().top;
  }

  $(window).scroll(function () {
    var winTop = $(this).scrollTop();
    if (winTop >= hedTop) {
      hed.addClass("fixHead");
    } else if (winTop < hedTop) {
      hed.removeClass("fixHead");
    }
  });

  // menu tooltip
  $(".indiv_menu")
    .mouseover(function () {
      $(this).find(".menu_tooltip").show();
    })
    .mouseout(function () {
      $(this).find(".menu_tooltip").hide();
    });

  // pulldown表示
  function showHeadMyMenu() {
    $(".my_info_pulldownmenu").fadeIn(100);
  }
  // pulldown非表示
  function hideHeadMyMenu() {
    $(".my_info_pulldownmenu").fadeOut(100);
  }
  // loginメニュー pulldown
  if ($(".my_info_more").length) {
    $(".my_info_more").click(function () {
      if ($(".my_info_pulldownmenu").is(":visible")) {
        hideHeadMyMenu();
      } else {
        showHeadMyMenu();
      }
      return false;
    });
    $(document).click(function (e) {
      var hide_f = true;
      $(e.target)
        .parents()
        .each(function () {
          if ($(this)[0] === $(".my_info_pulldownmenu")[0]) hide_f = false;
        });
      if (hide_f) hideHeadMyMenu();
    });
  }

  // pulldown表示
  function showHeadIndivInfoMenu() {
    $(".indiv_info_pulldownmenu").fadeIn(100);
  }
  // pulldown非表示
  function hideHeadIndivInfoMenu() {
    $(".indiv_info_pulldownmenu").fadeOut(100);
  }
  // message infoメニュー pulldown
  if ($(".indiv_info_more").length) {
    $(".indiv_info_more").click(function () {
      if ($(".indiv_info_pulldownmenu").is(":visible")) {
        hideHeadIndivInfoMenu();
      } else {
        showHeadIndivInfoMenu();
      }
      return false;
    });
    $(document).click(function (e) {
      var hide_f = true;
      $(e.target)
        .parents()
        .each(function () {
          if ($(this)[0] === $(".indiv_info_pulldownmenu")[0]) hide_f = false;
        });
      if (hide_f) hideHeadIndivInfoMenu();
    });
  }

  //like-box　遅延読み込み
  setTimeout(function () {
    $(".fb-like-box-placeholder").each(function () {
      $(this).addClass("fb-like-box");
      $(this).removeClass("fb-like-box-placeholder");
      $(".fb-like-box").hide();
      $(".fb_icoLoad").fadeOut("slow");
      $(".fb-like-box").fadeIn("slow");
    });
    FB.XFBML.parse();
  }, 3000);

  //トップページ　アンケート　アニメーション
  $(window).ready(function () {
    setTimeout(function () {
      $("#js-pointGetImg").addClass("expandOpen");
    }, 1000);
  });

  //トップページ　アンケート　次の問題クリック時
  $("#js-nextBtn").click(function (event) {
    event.preventDefault();
    $("#js-pointGet").fadeOut("1000");
    setTimeout(function () {
      $("#js-enquete").fadeIn("1000");
    }, 200);
  });
});

$(function () {
  /**
   * Drawer
   */
  $(".js-drawer").simpleDrawer({
    fixed: true,
    btnside: "right",
    drawerside: "right",
  });

  $(".event_footer_close").click(function (event) {
    event.preventDefault();
    $("#event_footer_area").hide().addClass("hide");
  });
  $(window).scroll(function () {
    if (!$("#event_footer_area").hasClass("hide")) {
      var scrollY = $(window).scrollTop();
      var footerY =
        $("#footer").offset() != null ? $("#footer").offset().top : null;
      var windowHeight = $(window).height();
      if (scrollY != 0 && footerY > windowHeight + scrollY) {
        $("#event_footer_area").slideDown(500);
      } else {
        $("#event_footer_area").slideUp(500);
      }
    }
  });
});
