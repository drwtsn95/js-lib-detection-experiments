var form_active = $("ul.be li.active form").attr("id");
kendo.culture("it-IT");
var margintop = 0;
$("input").placeholder();
var srcIsontop = 0;
var srcIsScrolling = 0;

$(".numeric").kendoNumericTextBox({
  min: 1,
  max: 21,
  step: 1,
  format: "#",
});

var data = [{ text: "Adulti", value: "0" }];
for (var i = 1; i <= 9; i++) data.push({ text: i, value: i });
$(".select_adulti").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
});

var data = [{ text: "Bambini", value: "0" }];
for (var i = 0; i <= 5; i++) data.push({ text: i, value: i });
$(".select_bambini").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
});

var data = [
  { text: "7", value: "7" },
  { text: "14", value: "14" },
];
for (var i = 1; i <= 13; i++) {
  if (i == 7) {
    continue;
  }
  data.push({ text: i, value: i });
}

var adults = 2;
var rooms = 1;
var childs = 0;
var inInitForm = 0;
var soloVoloDataAndata = undefined;
var soloVoloDataRitorno = undefined;

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  var contentToFix = "";
  var bambiniToFix;
  var r = 0;

  if ($("#searchString").length) {
    hashes = $("#searchString").val().split("&");
  }

  if ($("#queryparams").length) {
    $("#queryparams").val(
      window.location.href.slice(window.location.href.indexOf("?") + 1)
    );
  }

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");

    if (hash[0].indexOf("%5B%5D") > 0) {
      if (contentToFix != hash[0]) {
        r = 0;
        contentToFix = hash[0];
      } else {
        r++;
      }
      hash[0] = hash[0].replace("%5B%5D", "%5B" + r.toString() + "%5D");
    }
    if (hash[0].indexOf("[]") > 0) {
      if (contentToFix != hash[0]) {
        r = 0;
        contentToFix = hash[0];
      } else {
        r++;
      }
      hash[0] = hash[0].replace("[]", "[" + r.toString() + "]");
    }

    vars.push(decodeURIComponent(hash[0]));
    vars[decodeURIComponent(hash[0])] = decodeURIComponent(hash[1]);
    if (
      vars["partenzaData"] == undefined &&
      vars["data_partenza"] != undefined
    ) {
      vars["partenzaData"] = vars["data_partenza"];
    }
  }

  return vars;
}

function popolaPartenze() {
  var value = $("#codiceRicerca").val();
  var prodottoType = $("#prodottoType").val();
  if (!value) {
    return;
  }
  $.ajax({
    url: urls["earliest_departure_search"],
    cache: false,
    data: {
      prodotto: value,
      tipologia: prodottoType,
    },
  }).done(function (resultJson) {
    date = resultJson.dataMinimaPartenza;
    dateString = date.split("/");
    datePart =
      dateString[1].toString() +
      "/" +
      dateString[0].toString() +
      "/" +
      dateString[2].toString();
    if ("altre_date" in resultJson) {
      var altre_date = resultJson.altre_date;
      $("#datepicker").datepicker("option", "beforeShowDay", function (dt) {
        var mm = dt.getMonth() + 1;
        var dd = dt.getDate();
        var dts = [
          dt.getFullYear(),
          (mm > 9 ? "" : "0") + mm,
          (dd > 9 ? "" : "0") + dd,
        ].join("-");
        for (var i = 0; i < altre_date.length; i++) {
          if (dts == altre_date[i].trim()) {
            return [true];
          }
        }
        return [false];
      });
    } else {
      $("#datepicker").datepicker("option", "beforeShowDay", function (dt) {
        return [true];
      });
    }

    if (inInitForm != 1) {
      $("#datepicker").datepicker("setDate", datePart);
      $("#datepicker").datepicker("option", "minDate", datePart);

      $("#partenzaData").val(resultJson.dataMinimaPartenza);

      $(".departure").each(function () {
        $(this).val(resultJson.dataMinimaPartenza);
      });
      $(".data_partenza").each(function () {
        $(this).val(
          resultJson.dataMinimaPartenza +
            "   " +
            $("#notti-number-input").val() +
            " Notti"
        );
      });
    }

    $("#data_partenza_hotel").removeAttr("disabled");
    $("#" + form_active + " " + ".adulti_bambini_camere").removeAttr(
      "disabled"
    );
    $(".isDisabled").removeClass("isDisabled");
    $(".submit_cerca").removeAttr("disabled");
    $("#data_partenza_hotel").addClass("inputEnabled");
    $("#" + form_active + " " + ".adulti_bambini_camere").addClass(
      "inputEnabled"
    );
    $("#" + form_active + " " + "#composizione_wrapper").addClass(
      "inputEnabled"
    );
  });
}
function goUp() {
  if ($("#src-up-ricerca").length !== 0) {
    if (
      $(window).width() > 1280 &&
      srcIsontop == 0 &&
      $(window).width() < 1600
    ) {
      $("#src-up-ricerca").animate({ top: "-=21vw" }, "slow");
      srcIsontop = 1;
      window.scrollTo(0, 0);
    }
    if (
      $(window).width() > 1600 &&
      srcIsontop == 0 &&
      $(window).width() < 1900
    ) {
      $("#src-up-ricerca").animate({ top: "-=22vw" }, "slow");
      srcIsontop = 1;
      window.scrollTo(0, 0);
    }
    if ($(window).width() > 1900 && srcIsontop == 0) {
      $("#src-up-ricerca").animate({ top: "-=23vw" }, "slow");
      srcIsontop = 1;
      window.scrollTo(0, 0);
    }
    if (
      $(window).width() > 1050 &&
      srcIsontop == 0 &&
      $(window).width() < 1280
    ) {
      $("#src-up-ricerca").animate({ top: "-=20vw" }, "slow");
      srcIsontop = 1;
      window.scrollTo(0, 0);
    }
    if (
      $(window).width() < 1050 &&
      srcIsontop == 0 &&
      $(window).width() > 761
    ) {
      $("#src-up-ricerca").animate({ top: "-=17vw" }, "slow");
      srcIsontop = 1;
      window.scrollTo(0, 0);
    }
  }
}

function popolaPartenzeNave() {
  var value = $("#form_nave #codiceRicerca").val();
  var prodottoType = $("#form_nave #prodottoType").val();

  $.ajax({
    url: urls["ferry_earliest_departure_search"],
    cache: false,
    data: {
      prodotto: value,
      tipologia: prodottoType,
    },
  }).done(function (resultJson) {
    date = resultJson.dataMinimaPartenza;
    dateString = date.split("/");
    datePart =
      dateString[1].toString() +
      "/" +
      dateString[0].toString() +
      "/" +
      dateString[2].toString();
    if ("altre_date" in resultJson) {
      var altre_date = resultJson.altre_date;
      $("#datepicker_nave").datepicker(
        "option",
        "beforeShowDay",
        function (dt) {
          var mm = dt.getMonth() + 1;
          var dd = dt.getDate();
          var dts = [
            dt.getFullYear(),
            (mm > 9 ? "" : "0") + mm,
            (dd > 9 ? "" : "0") + dd,
          ].join("-");
          for (var i = 0; i < altre_date.length; i++) {
            if (dts == altre_date[i].trim()) {
              return [true];
            }
          }
          return [false];
        }
      );
    } else {
      $("#datepicker_nave").datepicker(
        "option",
        "beforeShowDay",
        function (dt) {
          return [true];
        }
      );
    }
    $("#datepicker_nave").datepicker("setDate", datePart);
    $("#datepicker_nave").datepicker("option", "minDate", datePart);
    $("#form_nave #partenzaData").val(resultJson.dataMinimaPartenza);
    $(".departure").each(function () {
      $(this).val(resultJson.dataMinimaPartenza);
    });
    $(".data_partenza").each(function () {
      $(this).val(
        resultJson.dataMinimaPartenza +
          "   " +
          $("#notti-number-input").val() +
          " Notti"
      );
    });
    $("#data_partenza_nave").removeAttr("disabled");
    $("#" + form_active + " " + ".adulti_bambini_camere").removeAttr(
      "disabled"
    );
    $(".isDisabled").removeClass("isDisabled");
    $(".submit_cerca").removeAttr("disabled");
    $("#data_partenza_nave").addClass("inputEnabled");
    $("#" + form_active + " " + ".adulti_bambini_camere").addClass(
      "inputEnabled"
    );
    $("#" + form_active + " " + "#composizione_wrapper").addClass(
      "inputEnabled"
    );
  });
}

function initFormSoloVolo(parameters) {
  $("#selectSoloVolo").click();
  //loadSelectViaAjax(null,urls['only_flight'],$('#solo_volo_apt_partenza').data('kendoDropDownList'),'Aeroporto di Partenza',false);
  kendoDropDownList = $("#solo_volo_apt_partenza").data("kendoDropDownList");
  kendoDropDownList.setDataSource([{ text: "Caricamento...", value: "" }]);
  soloVoloDataAndata = parameters.partenzaData;
  soloVoloDataRitorno = parameters.partenzaArrivo;

  $.ajax({
    url: urls["only_flight"],
    cache: false,
  })
    .fail(function () {
      alert("errore nella comunicazione col server");
    })
    .done(function (resultJson) {
      var dataSource = [{ text: "Aeroporto di Partenza", value: "" }];
      $.each(resultJson["results"], function (index, value) {
        dataSource.push({ text: value.label, value: value.key });
      });
      kendoDropDownList.setDataSource(dataSource);
      var i = 0;
      $("#solo_volo_apt_partenza > option").each(function () {
        if ($(this).val() == parameters.aeroporto_partenza) {
          kendoDropDownList.select(i);
        }
        i++;
      });
      arrivoDropDownList = $("#solo_volo_apt_arrivo").data("kendoDropDownList");
      arrivoDropDownList.setDataSource([{ text: "Caricamento...", value: "" }]);
      $.ajax({
        url: urls["only_flight_return"],
        data: {
          apt: $("#solo_volo_apt_partenza").data("kendoDropDownList").value(),
        },
        cache: false,
      })
        .fail(function () {
          alert("errore nella comunicazione col server");
        })
        .done(function (resultJson) {
          var dataSource = [{ text: "Aeroporto di Arrivo", value: "" }];
          $.each(resultJson["results"], function (index, value) {
            dataSource.push({ text: value.label, value: value.key });
          });
          arrivoDropDownList.setDataSource(dataSource);
          var i = 0;
          $("#solo_volo_apt_arrivo > option").each(function () {
            if ($(this).val() == parameters.aeroporto_arrivo) {
              arrivoDropDownList.select(i);
              arrivoDropDownList.trigger("change");
              $(".solo_volo_apt_wrapper.ritorno span.k-input").addClass(
                "inputEnabled"
              );
              $("#solo_volo_composizione_wrapper").removeClass("isDisabled");
              $("#passeggeriInput").addClass("inputEnabled");
              $("#passeggeriInput").removeAttr("disabled");
            }
            i++;
          });
        })
        .always(function () {
          //enableAerportoSoloVoloRitorno(true);
        });
    })
    .always(function () {
      setCamereSoloVolo(parameters);
    });
}

function initForm(parameters) {
  inInitForm = 1;

  if (parameters.tipoSearch === "volo") {
    value = parameters.codiceRicerca;
    prodottoType = parameters.prodottoType;
    loadSelectViaAjax(
      { destinazione: value, prodottoType: prodottoType },
      urls["flights_search"],
      $("#areoporto_partenza_volo").data("kendoDropDownList"),
      "Aeroporto di Partenza",
      parameters.aeroporto_partenza
    );
    $("#selectVolo").click();
    enableAerporto(true);
    $("#data_partenza_volo").addClass("inputEnabled");
    $("#form_volo #composizione_wrapper").addClass("inputEnabled");
    $("#form_volo .adulti_bambini_camere").addClass("inputEnabled");
    $(".camere-select").selectmenu("enable");
  } else if (parameters.tipoSearch === "nave") {
    $("#selectNave").click();
    setCamereDefault();
    $("#data_partenza_nave").addClass("inputEnabled");
    $("#form_nave #composizione_wrapper").addClass("inputEnabled");
    $("#form_nave .adulti_bambini_camere").addClass("inputEnabled");
  } else {
    $("#data_partenza_hotel").addClass("inputEnabled");
    $("#form_hotel #composizione_wrapper").addClass("inputEnabled");
    $("#form_hotel .adulti_bambini_camere").addClass("inputEnabled");
    $(".camere-select").selectmenu("enable");
  }

  $("#codiceRicerca").val(parameters.codiceRicerca);
  $("#form_volo #prodottoType").val(parameters.prodottoType);
  $("#form_nave #prodottoType").val(parameters.prodottoType);
  $("#prodottoType").val(parameters.prodottoType);
  $("#form_volo #codiceRicerca").val(parameters.codiceRicerca);
  $("#form_nave #codiceRicerca").val(parameters.codiceRicerca);
  prodottoType = $("#form_volo #prodottoType").val();
  //window.location.href = ui.item.nome;
  if (parameters.prodottoType === "regione" || parameters.destinazione !== "") {
    $("#destinazione").val(parameters.codiceRicerca);
    $("#localita").val("");
    $("#codiceProdotto").val("");
    $("#form_volo #destinazione").val(parameters.codiceRicerca);
    $("#form_volo #localita").val("");
    $("#form_volo #codiceProdotto").val("");
    $("#form_nave #destinazione").val(parameters.codiceRicerca);
    $("#form_nave #localita").val("");
    $("#form_nave #codiceProdotto").val("");
  }
  if (parameters.prodottoType === "localita" || parameters.localita !== "") {
    $("#localita").val(parameters.codiceRicerca);
    $("#codiceProdotto").val("");
    $("#destinazione").val("");
    $("#form_volo #localita").val(parameters.codiceRicerca);
    $("#form_volo #codiceProdotto").val("");
    $("#form_volo #destinazione").val("");
    $("#form_nave #localita").val(parameters.codiceRicerca);
    $("#form_nave #codiceProdotto").val("");
    $("#form_nave #destinazione").val("");
  }
  if (
    parameters.prodottoType === "struttura" ||
    (parameters.destinazione === "" && parameters.localita === "")
  ) {
    $("#codiceProdotto").val(parameters.codiceRicerca);
    $("#localita").val("");
    $("#destinazione").val("");
    $("#form_volo #codiceProdotto").val(parameters.codiceRicerca);
    $("#form_volo #localita").val("");
    $("#form_volo #destinazione").val("");
    $("#form_nave #codiceProdotto").val(parameters.codiceRicerca);
    $("#form_nave #localita").val("");
    $("#form_nave #destinazione").val("");
  }

  var descrizioneData = decodeURIComponent(parameters.partenzaData);
  var descrizioneCamere = decodeURIComponent(parameters.adulti_bambini_camere);
  var dataPartenza = decodeURIComponent(parameters.data_partenza);
  $("#autocomplete_" + parameters.tipoSearch).val(
    parameters.prodotto_input.replace(/\+/g, " ")
  );
  $("#data_partenza_" + parameters.tipoSearch).val(
    descrizioneData.replace(/\+/g, " ")
  );

  if (parameters.tipoSearch === "volo") {
    var areoporto = parameters.aeroporto_partenza;
    if (areoporto !== "") {
      var ajaxData = {
        codice_aeroporto_partenza: areoporto,
      };
      var prodottoType = $("#form_volo #prodottoType").val();
      if (prodottoType === "struttura") {
        ajaxData["prodotto"] = $("#form_volo #codiceProdotto").val();
        $.ajax({
          url: urls["flights_earliest_departure_search"],
          cache: false,
          data: ajaxData,
        }).done(function (resultJson) {
          date = resultJson.dataMinimaPartenza;
          dateString = date.split("/");
          datePart =
            dateString[1].toString() +
            "/" +
            dateString[0].toString() +
            "/" +
            dateString[2].toString();
          if ("altre_date" in resultJson) {
            var altre_date = resultJson.altre_date;
            $("#datepicker_volo").datepicker(
              "option",
              "beforeShowDay",
              function (dt) {
                var mm = dt.getMonth() + 1;
                var dd = dt.getDate();
                var dts = [
                  dt.getFullYear(),
                  (mm > 9 ? "" : "0") + mm,
                  (dd > 9 ? "" : "0") + dd,
                ].join("-");
                for (var i = 0; i < altre_date.length; i++) {
                  if (dts == altre_date[i].trim()) {
                    return [true];
                  }
                }
                return [false];
              }
            );
          }
        });
      }
    }
  } else if (parameters.tipoSearch === "nave") {
    popolaPartenzeNave();
  } else {
    popolaPartenze();
  }
  $(".adulti_bambini_camere").each(function (index) {
    $(this).val(descrizioneCamere.replace(/\+/g, " "));
  });
  date = dataPartenza;
  dateString = date.split("/");
  datePart =
    dateString[1].toString() +
    "/" +
    dateString[0].toString() +
    "/" +
    dateString[2].toString();
  $("#datepicker").datepicker("setDate", datePart);
  //$('#datepicker').datepicker('option','minDate',new Date());
  $("#partenzaData").val(dataPartenza);
  $("#form_volo #partenzaData").val(dataPartenza);
  $("#form_nave #partenzaData").val(dataPartenza);
  $("#datepicker_volo").datepicker("setDate", datePart);
  //$('#datepicker_volo').datepicker('option','minDate',new Date());
  $("#datepicker_nave").datepicker("setDate", datePart);
  //$('#datepicker_nave').datepicker('option','minDate',new Date());
  $("#partenzaData_volo").val(dataPartenza);

  $(".departure").each(function () {
    $(this).val(dataPartenza);
  });
  $(".isDisabled").removeClass("isDisabled");
  $(".submit_cerca").removeAttr("disabled");
  $("#data_partenza_nave").removeAttr("disabled");
  $("#" + form_active + " " + ".adulti_bambini_camere").removeAttr("disabled");
  $("#data_partenza_volo").removeAttr("disabled");
  $("#data_partenza_hotel").removeAttr("disabled");
  setCamere(parameters);
  $(".notti-select").val(parameters["num_notti"]);
  $("#" + form_active + " #partenzaNotti").val(parameters["num_notti"]);
  $("#" + form_active + " #notti-number-input-button .ui-selectmenu-text").text(
    parameters["num_notti"]
  );
  $("#" + form_active + " .addCamere").trigger("click");
}

function loadSelectViaAjax(
  ajaxData,
  ajaxUrl,
  kendoDropDownList,
  emptyLabel,
  defaultValue
) {
  kendoDropDownList.setDataSource([{ text: "Caricamento...", value: "" }]);
  $.ajax({
    url: ajaxUrl,
    cache: false,
    data: ajaxData,
  })
    .fail(function () {
      alert("errore nella comunicazione col server");
    })
    .done(function (resultJson) {
      var dataSource = [{ text: emptyLabel, value: "" }];
      $.each(resultJson["results"], function (index, value) {
        dataSource.push({ text: value.label, value: value.key });
      });
      kendoDropDownList.setDataSource(dataSource);
      if (defaultValue) {
        kendoDropDownList.value(defaultValue);
        //kendoDropDownList.search(defaultValue);
        kendoDropDownList.trigger("change");
      }
    })
    .always(function () {});
}

$("#destinazione_volo").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
  change: function (e) {
    var destinazione = $("#destinazione_volo")
      .data("kendoDropDownList")
      .value();
    if (destinazione !== "") {
      enableAutocompleteVolo(false);
      enableAreoportoVolo(true);
      enableDataVolo(false);
      enableSistemazioniVolo(false);
      checkIfEnableSistemazioniVolo();
    } else {
      enableAutocompleteVolo(true);
      enableAreoportoVolo(false);
      enableDataVolo(false);
      enableSistemazioniVolo(false);
      checkIfEnableSistemazioniVolo();
      return;
    }
    loadSelectViaAjax(
      { destinazione: destinazione },
      urls["destination_flights_search"],
      $("#localita_volo").data("kendoDropDownList"),
      "Località",
      false
    );
    loadSelectViaAjax(
      { destinazione: destinazione },
      urls["flights_search"],
      $("#areoporto_partenza_volo").data("kendoDropDownList"),
      "Aeroporto di Partenza",
      false
    );
  },
});

$("#solo_volo_apt_partenza").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: [{ text: "Partenza", value: "" }],
  index: 0,
  change: function (e) {
    var aereoporto = $("#solo_volo_apt_partenza")
      .data("kendoDropDownList")
      .value();
    if (aereoporto !== "") {
      var ajaxData = {
        codice_aeroporto_partenza: aereoporto,
      };
      ajaxData["apt"] = aereoporto;
      loadSelectViaAjax(
        { apt: aereoporto },
        urls["only_flight_return"],
        $("#solo_volo_apt_arrivo").data("kendoDropDownList"),
        "Aeroporto di Arrivo",
        false
      );
      enableAerportoSoloVoloRitorno(true);
    } else {
      enableAerportoSoloVoloRitorno(false);
      $("#solo_volo_composizione_wrapper").addClass("isDisabled");
      $("#data_partenza_solo_volo").val("Data Partenza");
      $("#data_ritorno_solo_volo").val("Data Ritorno");
      $("#passeggeriInput").val("2 Adulti");
      $("#passeggeriInput").removeClass("inputEnabled");
      $("#passeggeriInput").attr("disabled", "disabled");
      $("#data_partenza_solo_volo").removeClass("inputEnabled");
      $("#data_partenza_solo_volo").attr("disabled", "disabled");
      $("#data_ritorno_solo_volo").attr("disabled", "disabeld");
    }
  },
  open: function () {
    //goUp();
    $(".dropdown-calendar").hide();
    $("#sistemazioni_form_solo_volo").hide();
  },
});

$("#solo_volo_apt_arrivo").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: [{ text: "Arrivo", value: "" }],
  index: 0,
  change: function (e) {
    var aereoporto = $("#solo_volo_apt_arrivo")
      .data("kendoDropDownList")
      .value();

    if (aereoporto !== "") {
      $("#solo_volo_composizione_wrapper").addClass("inputEnabled");
      $("#passeggeriInput").addClass("inputEnabled");
      $("#passeggeriInput").removeAttr("disabled");
      $("#data_partenza_solo_volo").removeAttr("disabled");
      $("#data_partenza_solo_volo").addClass("inputEnabled");
      populateSoloVoloRitornoDatePicker();
    } else {
      $("#solo_volo_composizione_wrapper").addClass("isDisabled");
      $("#data_partenza_solo_volo").val("Data Partenza");
      $("#data_ritorno_solo_volo").val("Data Ritorno");
      $("#passeggeriInput").val("2 Adulti");
      $("#passeggeriInput").removeClass("inputEnabled");
      $("#passeggeriInput").attr("disabled", "disabled");
      $("#data_partenza_solo_volo").removeClass("inputEnabled");
      $("#data_partenza_solo_volo").attr("disabled", "disabled");
      $("#data_ritorno_solo_volo").attr("disabled", "disabeld");
    }
  },
  open: function () {
    //goUp();
    $(".dropdown-calendar").hide();
    $("#sistemazioni_form_solo_volo").hide();
  },
});

var data = [{ text: "Aeroporto di partenza", value: "" }];

$("#areoporto_partenza_volo").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
  change: function (e) {
    var areoporto = $("#areoporto_partenza_volo")
      .data("kendoDropDownList")
      .value();
    if (areoporto !== "") {
      var ajaxData = {
        codice_aeroporto_partenza: areoporto,
      };
      var prodottoType = $("#form_volo #prodottoType").val();
      if (prodottoType === "regione") {
        ajaxData["destinazione"] = $("#form_volo #destinazione").val();
      }
      if (prodottoType === "localita") {
        ajaxData["localita"] = $("#form_volo #localita").val();
      }
      if (prodottoType === "struttura") {
        ajaxData["prodotto"] = $("#form_volo #codiceProdotto").val();
      }
      $.ajax({
        url: urls["flights_earliest_departure_search"],
        cache: false,
        data: ajaxData,
      }).done(function (resultJson) {
        if (inInitForm == 0) {
          date = resultJson.dataMinimaPartenza;
          dateString = date.split("/");
          datePart =
            dateString[1].toString() +
            "/" +
            dateString[0].toString() +
            "/" +
            dateString[2].toString();

          if ("altre_date" in resultJson) {
            var altre_date = resultJson.altre_date;
            $("#datepicker_volo").datepicker(
              "option",
              "beforeShowDay",
              function (dt) {
                var mm = dt.getMonth() + 1;
                var dd = dt.getDate();
                var dts = [
                  dt.getFullYear(),
                  (mm > 9 ? "" : "0") + mm,
                  (dd > 9 ? "" : "0") + dd,
                ].join("-");
                for (var i = 0; i < altre_date.length; i++) {
                  if (dts == altre_date[i].trim()) {
                    return [true];
                  }
                }
                return [false];
              }
            );
          } else {
            $("#datepicker_volo").datepicker(
              "option",
              "beforeShowDay",
              function (dt) {
                return [true];
              }
            );
          }

          $("#datepicker_volo").datepicker("setDate", datePart);
          $("#datepicker_volo").datepicker("option", "minDate", datePart);
          $("#form_volo #partenzaData").val(resultJson.dataMinimaPartenza);
          $(".departure").each(function () {
            $(this).val(resultJson.dataMinimaPartenza);
          });
          $(".data_partenza").each(function () {
            $(this).val(
              resultJson.dataMinimaPartenza +
                "   " +
                $("#form_volo #notti-number-input").val() +
                " Notti"
            );
          });
          $(".isDisabled").removeClass("isDisabled");
          $(".submit_cerca").removeAttr("disabled");
          $("#data_partenza_volo").removeAttr("disabled");
          $("#" + form_active + " " + ".adulti_bambini_camere").removeAttr(
            "disabled"
          );
          $("#" + form_active + " " + " .adulti_bambini_camere").addClass(
            "inputEnabled"
          );
          $("#" + form_active + " " + " #composizione_wrapper").addClass(
            "inputEnabled"
          );
          $("#data_partenza_volo").addClass("inputEnabled");
        } else {
          inInitForm = 0;
        }
      });
    } else {
      $("#data_partenza_volo").val("");
      $("#form_volo .submit_cerca").addClass("isDisabled");
      $("#form_volo .submit_cerca").attr("disabled");
      $(".data_partenza").val("");
      $("#form_volo .adulti_bambini_camere").attr("disabled", true);
      $("#data_partenza_volo").attr("disabled", true);
      $("#data_partenza_volo").removeClass("inputEnabled");
      $("#form_volo .adulti_bambini_camere").removeClass("inputEnabled");
      $("#form_volo #composizione_wrapper").removeClass("inputEnabled");
      $("#form_volo .adulti_bambini_camere").attr("disabled", true);
    }
  },
});

var data = [
  { text: "7", value: "7" },
  { text: "10", value: "10" },
  { text: "11", value: "11" },
  { text: "14", value: "14" },
];

$("#nrnotti_volo").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
  change: function (e) {
    checkIfEnableSistemazioniVolo();
  },
});

var data = [
  { text: "Destinazione", value: "0" },
  { text: "Sardegna", value: "341" },
  { text: "Sicilia", value: "386" },
];
$("#destinazione_nave").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
  change: function (e) {
    var destinazione = $("#destinazione_nave")
      .data("kendoDropDownList")
      .value();
    if (destinazione > 0) {
      enableAutocompleteNave(false);
      enablePortoNave(true);
      enableDataNave(true);
      enableSistemazioniNave(false);
      checkIfEnableSistemazioniNave();
    } else {
      enableAutocompleteNave(true);
      enablePortoNave(false);
      enableDataNave(false);
      enableSistemazioniNave(false);
      checkIfEnableSistemazioniNave();
      return;
    }
    loadSelectViaAjax(
      { destinazione: destinazione },
      urls["destination_ferry_search"],
      $("#localita_nave").data("kendoDropDownList"),
      "Località",
      false
    );
    $.ajax({
      url: urls["ferry_earliest_departure_search"],
      cache: false,
      data: { destinazione: destinazione },
    }).done(function (resultJson) {
      if (!resultJson["dataMinimaPartenza"]) {
        return;
      }
      $("#data_partenza_nave")
        .data("kendoDatePicker")
        .value(resultJson["dataMinimaPartenza"]);
      checkIfEnableSistemazioniNave();
    });
  },
});
var data = [{ text: "Localit\340", value: "0" }];
$("#localita_nave").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
  change: function () {
    var localita = $("#localita_nave").data("kendoDropDownList").value();
    $.ajax({
      url: urls["ferry_earliest_departure_search"],
      cache: false,
      data: { localita: localita },
    }).done(function (resultJson) {
      if (!resultJson["dataMinimaPartenza"]) {
        return;
      }
      $("#data_partenza_nave")
        .data("kendoDatePicker")
        .value(resultJson["dataMinimaPartenza"]);
      checkIfEnableSistemazioniNave();
    });
  },
});

var tomorrow = new Date();

var data = [
  { text: "7", value: "7" },
  { text: "10", value: "10" },
  { text: "11", value: "11" },
  { text: "14", value: "14" },
];

$("#nrnotti_nave").kendoDropDownList({
  dataTextField: "text",
  dataValueField: "value",
  dataSource: data,
  index: 0,
  change: function (e) {
    checkIfEnableSistemazioniNave();
  },
});
$("#solo_volo_composizione_wrapper, #passeggeriInput").click(function () {
  //$('.data_partenza').removeClass('focusBorder');
  //$('.aeroporto_partenza_wrapper').removeClass('focusBorder');
  $(".dropdown-calendar").hide();
  if ($(this).attr("class").indexOf("isDisabled") == -1) {
    changeLayerPosition("passeggeriInput", "sistemazioni_form_solo_volo", true);
    $("#sistemazioni_form_solo_volo").show("blind", null, 600);
  }
});

function changeLayerPosition(elId, wrapperId, aum) {
  var el = document.getElementById(elId);
  var wrapper = document.getElementById(wrapperId);

  // Mi tocca fare così perché con display none l'altezza è uguale a zero
  wrapper.style.visibility = "hidden";
  wrapper.style.display = "block";

  var topSopra, topSotto;

  if ($(window).width() <= 761) {
    topSopra =
      "-" + (wrapper.getBoundingClientRect().height + (aum ? 110 : 40)) + "px";
    topSotto = aum ? "-65px" : "0";
  } else {
    topSopra =
      "-" + (wrapper.getBoundingClientRect().height + (aum ? 80 : -70)) + "px";
    topSotto = "-35px";
  }

  if (el) {
    if (
      el.getBoundingClientRect().y + el.getBoundingClientRect().height >
      document.documentElement.clientHeight / 2
    ) {
      wrapper.style.marginTop = topSopra;
    } else {
      console.log("sotto");
      wrapper.style.marginTop = topSotto;
    }
  }

  // Vedi sopra
  wrapper.style.visibility = "visible";
  wrapper.style.display = "none";
}

$(".adulti_bambini_box").click(function () {
  debugger;
  $(".data_partenza").removeClass("focusBorder");
  $(".aeroporto_partenza_wrapper").removeClass("focusBorder");

  if ($(this).attr("class").indexOf("disableBox") == -1) {
    var isDisabled = $(this).find(".adulti_bambini_camere").attr("disabled");

    if (typeof isDisabled !== typeof undefined && isDisabled !== false) {
      return;
    } else {
      $(this).addClass("focusBorder");
      var name_form = $(this).parent("div").parent("form").attr("id");
      initWindow("scegli_persone_" + name_form);
      $(".dropdown-calendar").hide();
      changeLayerPosition(
        "adulti_bambini_camere-" + name_form,
        "sistemazioni-" + name_form,
        true
      );
      $("#sistemazioni-" + name_form).show("blind", null, 600);
    }
  }
});

/* ModalBox Camere // START */
var id_window_open = "";
var modalbox_camere_opened = new Array();
function initWindow(id_window) {
  id_window_open = id_window;
  var windowOptions = {
    width: "500px",
    title: "Sistemazione",
    visible: false,
    position: {
      top: 100,
    },
    height: 550,
    modal: true,
    pinned: false,
    draggable: true,
    actions: [],
    close: function () {
      $("html, body").css("overflow", "");
    },
  };

  windowOptions.animation = {
    open: { effects: "fadeIn" },
    close: { effects: "", reverse: true },
  };
  if (modalbox_camere_opened[id_window_open] != 1) {
    initCamereModal();
  }
}

function initCamereModal() {
  var dateSource = [
    { text: "1", value: "1" },
    { text: "2", value: "2" },
    { text: "3", value: "3" },
    { text: "4", value: "4" },
  ];
  var selector = "#scegli_persone_" + form_active + " #numero_camere";
}

function initCamere(n) {
  var ncamere = n;
  var currentNumber = 0;
  var idx = null;
  $(".camere-select").each(function (index) {
    $(this).val(ncamere);
    $(this).next().children().text(ncamere);
  });
  $(".camera_inner").each(function (index) {
    idx = $(this).attr("id").split("_");
    currentNumber = idx[1];
    if (currentNumber <= ncamere) {
      $(this).css("display", "flex");
    } else {
      $(this).hide();
    }
  });
}

function setCamere(obj) {
  initCamere(obj.camere);
  var bambinieta = [];
  for (i = 0; i < obj.camere; i++) {
    nAdulti = obj["adulti[" + i + "]"];

    idCamera = "camera_" + (i + 1);
    nBambini = obj["bambini[" + i + "]"];
    bambinieta = [];
    $(".persone").each(function () {
      id = $(this).parent("div").parent("div").attr("id");
      if (id == idCamera) {
        $(this).val(nAdulti);
        $(this).next().children().text(nAdulti);
      }
    });
    if (nBambini > 0) {
      $("#" + idCamera + " > .eta_inner > .eta_box .col-12 label").show();
      $(".info-bambini").show();
    } else {
      $("#" + idCamera + " > .eta_inner > .eta_box .col-12 label").hide();
    }
    $("#" + idCamera + " > .eta_inner > .eta_box .age").each(function (index) {
      idx = $(this).attr("name").split("_");
      currentNumber = idx[1];
      if (currentNumber <= nBambini) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    $(".bambini").each(function () {
      id = $(this).parent("div").parent("div").attr("id");
      if (id == idCamera) {
        $(this).val(nBambini);
        $(this).next().children().text(nBambini);
      }
    });

    for (l = 0; l < nBambini; l++) {
      bambinieta.push(obj["bambini_eta[" + i + "][" + l + "]"]);
      $(".eta").each(function () {
        elem = $(this).parent("div").attr("name");
        id = $(this)
          .parent("div")
          .parent("div")
          .parent("div")
          .parent("div")
          .attr("id");
        if (elem === "age_" + (l + 1) && id === idCamera) {
          $(this).val(obj["bambini_eta[" + i + "][" + l + "]"]);
          $(this)
            .next()
            .children()
            .text(obj["bambini_eta[" + i + "][" + l + "]"]);
        }
      });
    }
  }
}

function setCamereSoloVolo(obj) {
  initCamere(1);

  var nAdulti = obj["persone_1"];
  var idCamera = "#camera_1";
  var nBambini = obj["bambini_1"];
  var text = nAdulti;
  if (nAdulti > 1) {
    text = text + " Adulti";
  } else {
    text = text + " Adulto";
  }

  $("#sistemazioni_form_solo_volo #persone_1-button .ui-selectmenu-text").text(
    nAdulti
  );
  $("#sistemazioni_form_solo_volo #persone_1").val(nAdulti);
  $("#sistemazioni_form_solo_volo #bambini_1-button .ui-selectmenu-text").text(
    nBambini
  );
  $("#sistemazioni_form_solo_volo #bambini_1").val(nBambini);

  if (nBambini > 0) {
    if (nBambini > 1) {
      text = text + " e " + nBambini + " Bambini";
    } else {
      text = text + " e " + nBambini + " Bambino";
    }
    $(
      "#sistemazioni_form_solo_volo " +
        idCamera +
        " > .eta_inner > .eta_box .col-12 label"
    ).show();
    $(".info-bambini").show();
  } else {
    $(
      "#sistemazioni_form_solo_volo " +
        idCamera +
        " > .eta_inner > .eta_box .col-12 label"
    ).hide();
  }
  $(idCamera + " > .eta_inner > .eta_box .age").each(function (index) {
    idx = $(this).attr("name").split("_");
    currentNumber = idx[1];
    if (currentNumber <= nBambini) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  $("#sistemazioni_form_solo_volo #eta_1-button .ui-selectmenu-text").text(
    obj["eta_1"]
  );
  $("#sistemazioni_form_solo_volo #eta_1").val(obj["eta_1"]);
  $("#sistemazioni_form_solo_volo #eta_2-button .ui-selectmenu-text").text(
    obj["eta_2"]
  );
  $("#sistemazioni_form_solo_volo #eta_2").val(obj["eta_2"]);
  $("#sistemazioni_form_solo_volo #eta_3-button .ui-selectmenu-text").text(
    obj["eta_3"]
  );
  $("#sistemazioni_form_solo_volo #eta_3").val(obj["eta_3"]);
  $("#sistemazioni_form_solo_volo #eta_4-button .ui-selectmenu-text").text(
    obj["eta_4"]
  );
  $("#sistemazioni_form_solo_volo #eta_4").val(obj["eta_4"]);

  $("#solo_volo_composizione_wrapper #passeggeriInput").val(text);
}

function setCamereDefault() {
  initCamere(1);
  for (i = 0; i < 1; i++) {
    nAdulti = 2;
    idCamera = "camera_" + (i + 1);
    nBambini = 0;

    $(".persone").each(function () {
      id = $(this).parent("div").parent("div").attr("id");
      if (id == idCamera) {
        $(this).val(nAdulti);
        $(this).next().children().text(nAdulti);
      }
    });

    $("#" + idCamera + " > .eta_inner > .eta_box .age").each(function (index) {
      idx = $(this).attr("name").split("_");
      currentNumber = idx[1];
      if (currentNumber <= nBambini) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
    $(".bambini").each(function () {
      id = $(this).parent("div").parent("div").attr("id");
      if (id == idCamera) {
        $(this).val(nBambini);
        $(this).next().children().text(nBambini);
      }
    });
  }
  text = "2 Adulti, 1 Camera";
  $(".adulti_bambini_camere").each(function (index) {
    $(this).val(text);
  });
}

function initBambini(ui) {
  var formId = ui.item.element[0].form.id;
  var cameraId = ui.item.element
    .parent("select")
    .parent("div")
    .parent("div")
    .attr("id");
  var nBambini = ui.item.value;
  var currentNumber = 0;
  var idx = null;
  var ncameratoupdate = ui.item.element
    .parent("select")
    .parent("div")
    .parent("div")
    .attr("id");
  var id = "";

  if (nBambini > 0) {
    $("#" + cameraId + " > .eta_inner > .eta_box .col-12 label").show();
  } else {
    $("#" + cameraId + " > .eta_inner > .eta_box .col-12 label").hide();
  }
  $("#" + cameraId + " > .eta_inner > .eta_box .age").each(function (index) {
    idx = $(this).attr("name").split("_");
    currentNumber = idx[1];
    if (currentNumber <= nBambini) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
  showBambiniWarning = false;
  $(".bambini").each(function () {
    id = $(this).parent("div").parent("div").attr("id");

    if (id == ncameratoupdate) {
      $(this).val(ui.item.value);
      $(this).next().children().text(ui.item.value);
    }
    if (parseInt($(this).val()) > 0) {
      showBambiniWarning = true;
    }
  });
  if (showBambiniWarning) {
    $(".info-bambini").show();
  } else {
    $(".info-bambini").hide();
  }
}

function initEta(ui) {
  var elementToupdate = ui.item.element
    .parent("select")
    .parent("div")
    .attr("name");
  var ncameratoupdate = ui.item.element
    .parent("select")
    .parent("div")
    .parent("div")
    .parent("div")
    .parent("div")
    .attr("id");
  var id = "";
  var name = "";
  $(".eta").each(function () {
    name = $(this).parent("div").attr("name");
    id = $(this)
      .parent("div")
      .parent("div")
      .parent("div")
      .parent("div")
      .attr("id");
    if (name === elementToupdate && id === ncameratoupdate) {
      $(this).val(ui.item.value);
      $(this).next().children().text(ui.item.value);
    }
  });
}

function initPersone(ui) {
  var ncameratoupdate = ui.item.element
    .parent("select")
    .parent("div")
    .parent("div")
    .attr("id");
  var id = "";
  $(".persone").each(function () {
    id = $(this).parent("div").parent("div").attr("id");
    if (id == ncameratoupdate) {
      $(this).val(ui.item.value);
      $(this).next().children().text(ui.item.value);
    }
  });
}

function initBambiniModal(num_camere) {
  for (var i = 1; i <= num_camere; i++) {
    var valueDefault = bambiniDefault[i - 1];
    var selector = "#scegli_persone_" + form_active + " #bambini_" + i;
  }
}
function initEtaModal(nrcamera) {
  var data = [];
  for (var i = 0; i <= 17; i++) {
    data.push({ text: i, value: i });
  }
  $(
    "#scegli_persone_" + form_active + " #camera_" + nrcamera + " select.eta"
  ).each(function () {
    var valueDefault = 0;
    var num_camera, num_bambino;
    num_bambino = parseInt($(this).attr("name").replace("eta_", "")) - 1;
    num_camera = parseInt(nrcamera) - 1;
    if (bambiniEta[num_camera][num_bambino] !== undefined)
      valueDefault = bambiniEta[num_camera][num_bambino];
    $(this).kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: data,
      index: 100,
      value: valueDefault,
      change: function () {
        bambiniEta[num_camera][num_bambino] = this.value();
      },
    });
  });
}

function cleanfield(type) {
  if (type == "hotel") {
    cleanFormVolo();
    cleanFormNave();
    cleanFormSoloVolo();
    setCamereDefault();
    $(".data_partenza").val("");
    $(".data_partenza").removeClass("inputEnabled");
    $(".camere-select").selectmenu("enable");
  } else if (type == "nave") {
    cleanFormVolo();
    cleanFormHotel();
    setCamereDefault();
    cleanFormSoloVolo();
    $(".data_partenza").val("");
    $(".data_partenza").removeClass("inputEnabled");
    $(".camere-select").selectmenu("disable");
  } else if (type == "volo") {
    cleanFormHotel();
    cleanFormNave();
    cleanFormSoloVolo();
    setCamereDefault();
    $(".data_partenza").val("");
    $(".data_partenza").removeClass("inputEnabled");
    $(".camere-select").selectmenu("enable");
  } else if (type == "solo_volo") {
    cleanFormHotel();
    cleanFormNave();
    cleanFormVolo();
    setCamereDefault();
    $(".data_partenza").val("");
    $(".data_partenza").removeClass("inputEnabled");
    $(".camere-select").selectmenu("enable");
  }
}

function enableAerporto(enable) {
  if (enable == false) {
    $("#areoporto_partenza_volo").data("kendoDropDownList").value("");
    $("#areoporto_partenza_volo").data("kendoDropDownList").trigger("change");
    $("#areoporto_partenza_volo").data("kendoDropDownList").enable(false);
    $("#areoporto_partenza_volo")
      .parent(".k-dropdown")
      .addClass("disabledSelect");
    $(".aeroporto_partenza_wrapper span.k-input").text("Aeroporto di Partenza");
    $(".aeroporto_partenza_wrapper span.k-input").removeClass("inputEnabled");
    $("#form_volo .adulti_bambini_camere").removeClass("inputEnabled");
    $("#form_volo #composizione_wrapper").removeClass("inputEnabled");
    $("#data_partenza_volo").removeClass("inputEnabled");
    $("#data_partenza_volo").val("");
  } else {
    $("#areoporto_partenza_volo").data("kendoDropDownList").enable(true);
    $("#areoporto_partenza_volo")
      .parent(".k-dropdown")
      .removeClass("disabledSelect");
    $(".aeroporto_partenza_wrapper span.k-input").text("Aeroporto di Partenza");
    $(".aeroporto_partenza_wrapper span.k-input").addClass("inputEnabled");
  }
}

function cleanFormHotel() {
  $("#autocomplete_hotel").val("");
  $("#data_partenza_hotel").removeClass("inputEnabled");
  $("#data_partenza_nave").removeClass("inputEnabled");
  $("#form_hotel .submit_cerca").addClass("isDisabled");
  $("#form_hotel .adulti_bambini_camere").attr("disabled", true);
  $("#data_partenza_hotel").attr("disabled", true);
  $("#form_hotel .adulti_bambini_camere").removeClass("inputEnabled");
  $("#form_hotel #composizione_wrapper").removeClass("inputEnabled");
  $("#form_hotel .adulti_bambini_camere").attr("disabled", true);
}

function cleanFormSoloVolo() {
  enableAerportoSoloVoloRitorno(false);
  $("#solo_volo_apt_partenza").data("kendoDropDownList").select(0);
  $("#solo_volo_apt_arrivo").data("kendoDropDownList").select(0);
  $("#solo_volo_composizione_wrapper").addClass("isDisabled");
  $("#data_partenza_solo_volo").val("Data Partenza");
  $("#data_ritorno_solo_volo").val("Data Ritorno");
  $("#passeggeriInput").val("2 Adulti");
  $("#passeggeriInput").removeClass("inputEnabled");
  $("#passeggeriInput").attr("disabled", "disabled");
  $("#data_partenza_solo_volo").removeClass("inputEnabled");
  $("#data_partenza_solo_volo").attr("disabled", "disabled");
  $("#data_ritorno_solo_volo").attr("disabled", "disabeld");
}

function cleanFormVolo() {
  $("#autocomplete_volo").val("");
  enableAerporto(false);
  //$("#areoporto_partenza_volo").kendoDropDownList().trigger("change");
  $("#data_partenza_volo").val("");
  $("#form_volo .submit_cerca").addClass("isDisabled");
  $("#autocomplete_nave").val("");
  $("#form_volo .data_partenza").val("");
  $("#data_partenza_volo").attr("disabled", true);
  $("#form_volo .adulti_bambini_camere").attr("disabled", true);
}

function cleanFormNave() {
  $("#autocomplete_nave").val("");
  $("#form_nave .data_partenza").val("");
  $("#form_nave .submit_cerca").addClass("isDisabled");
  $("#form_nave .adulti_bambini_camere").removeClass("inputEnabled");
  $("#form_nave #composizione_wrapper").removeClass("inputEnabled");
}

function enableAerportoSoloVoloRitorno(enable) {
  if (enable == false) {
    $("#solo_volo_apt_arrivo").data("kendoDropDownList").enable(false);
    $("#solo_volo_apt_arrivo").parent(".k-dropdown").addClass("disabledSelect");

    $(".solo_volo_apt_wrapper.ritorno span.k-input").text(
      "Aeroporto di Arrivo"
    );
    $(".solo_volo_apt_wrapper.ritorno span.k-input").removeClass(
      "inputEnabled"
    );
    $("#solo_volo_composizione_wrapper").removeClass("inputEnabled");
    $("#passeggeriInput").removeClass("inputEnabled");
    $("#passeggeriInput").attr("disabled", "disabled");
    $("#solo_volo_apt_arrivo").removeClass("inputEnabled");
    $("#solo_volo_apt_arrivo").val("");
  } else {
    $("#solo_volo_apt_arrivo").data("kendoDropDownList").enable(true);
    $("#solo_volo_apt_arrivo")
      .parent(".k-dropdown")
      .removeClass("disabledSelect");
    $(".solo_volo_apt_wrapper.ritorno span.k-input").text(
      "Aeroporto di Arrivo"
    );
    $(".solo_volo_apt_wrapper.ritorno span.k-input").addClass("inputEnabled");
    $("#solo_volo_composizione_wrapper").removeClass("isDisabled");
    $("#passeggeriInput").addClass("inputEnabled");
    $("#passeggeriInput").removeAttr("disabled");
  }
}

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

function popolateDatepickerSoloVoloRitorno(dateText) {
  var apt_partenza = $("#solo_volo_apt_partenza")
    .data("kendoDropDownList")
    .value();
  var apt_arrivo = $("#solo_volo_apt_arrivo").data("kendoDropDownList").value();

  $.ajax({
    url: urls["only_flights_return_search"],
    cache: false,
    data: {
      apt_partenza: apt_partenza,
      apt_arrivo: apt_arrivo,
      data_partenza: dateText,
    },
  })
    .fail(function () {
      alert("errore nella comunicazione col server");
    })
    .done(function (resultJson) {
      var dates = [];
      var i, date, dateString, datePart;
      for (i = 0; i < resultJson.results.length; i++) {
        dates.push(resultJson.results[i]);
      }

      $("#datepicker_solo_volo_ritorno").datepicker("destroy");

      $("#datepicker_solo_volo_ritorno").datepicker({
        minDate: new Date(),
        beforeShowDay: function (dt) {
          formatted_date =
            appendLeadingZeroes(dt.getDate()) +
            "/" +
            appendLeadingZeroes(dt.getMonth() + 1) +
            "/" +
            dt.getFullYear();
          if (dates.includes(formatted_date)) {
            return [true];
          } else {
            return [false];
          }
        },
        onSelect: function (dateText, inst) {
          $("#seleziona_solo_volo_ritorno").trigger("click");
        },
      });
      if (soloVoloDataRitorno === undefined) {
        date = dates[0];
      } else {
        date = soloVoloDataRitorno;
        soloVoloDataRitorno = undefined;
      }
      dateString = date.split("/");
      datePart =
        dateString[1].toString() +
        "/" +
        dateString[0].toString() +
        "/" +
        dateString[2].toString();

      $("#datepicker_solo_volo_ritorno").datepicker("setDate", datePart);
      $("#datepicker_solo_volo_ritorno").datepicker(
        "option",
        "minDate",
        datePart
      );
      $("#seleziona_solo_volo_ritorno").trigger("click");
    })

    .always(function () {
      $.datepicker.regional["it"];
    });
}

function populateSoloVoloRitornoDatePicker() {
  var apt_partenza = $("#solo_volo_apt_partenza")
    .data("kendoDropDownList")
    .value();
  var apt_arrivo = $("#solo_volo_apt_arrivo").data("kendoDropDownList").value();

  $.ajax({
    url: urls["only_flights_earliest_departure_search"],
    cache: false,
    data: { apt_partenza: apt_partenza, apt_arrivo: apt_arrivo },
  })
    .fail(function () {
      alert("errore nella comunicazione col server");
    })
    .done(function (resultJson) {
      var dates = [];
      var i, date, dateString, datePart;
      for (i = 0; i < resultJson.results.length; i++) {
        dates.push(resultJson.results[i]);
      }

      $("#datepicker_solo_volo_andata").datepicker("destroy");

      $("#datepicker_solo_volo_andata").datepicker({
        minDate: new Date(),
        beforeShowDay: function (dt) {
          formatted_date =
            appendLeadingZeroes(dt.getDate()) +
            "/" +
            appendLeadingZeroes(dt.getMonth() + 1) +
            "/" +
            dt.getFullYear();
          if (dates.includes(formatted_date)) {
            return [true];
          } else {
            return [false];
          }
        },
        onSelect: function (dateText, inst) {
          $("#seleziona_solo_volo_andata").trigger("click");
          popolateDatepickerSoloVoloRitorno(dateText);
        },
      });

      if (soloVoloDataAndata === undefined) {
        date = dates[0];
      } else {
        date = soloVoloDataAndata;
        soloVoloDataAndata = undefined;
      }
      dateString = date.split("/");
      datePart =
        dateString[1].toString() +
        "/" +
        dateString[0].toString() +
        "/" +
        dateString[2].toString();
      $("#datepicker_solo_volo_andata").datepicker("setDate", datePart);
      $("#datepicker_solo_volo_andata").datepicker(
        "option",
        "minDate",
        datePart
      );
      $("#seleziona_solo_volo_andata").trigger("click");
      popolateDatepickerSoloVoloRitorno(datePart);
    })
    .always(function () {
      $.datepicker.regional["it"];
    });
}

$(document).ready(function () {
  var mySwiper = new Swiper("#swiper-offerte", {
    slidesPerView: 4,
    spaceBetween: 10,
    breakpoints: {
      960: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      770: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".offerte-next",
      prevEl: ".offerte-prev",
    },
  });

  var mySwiperVolo = new Swiper("#swiper-offerte-volo", {
    slidesPerView: 4,
    spaceBetween: 10,
    breakpoints: {
      960: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      770: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 1,
      },
      320: {
        slidesPerView: 1,
      },
    },
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".offerte-next",
      prevEl: ".offerte-prev",
    },
  });
  var photoSwiper = new Swiper("#royalSlider_box", {
    speed: 600,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: ".photo-next",
      prevEl: ".photo-prev",
    },
  });

  if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
    $(".list-inline-item").css("float", "unset");
  }
  var changeForm = form_active;
  var dialog = $("#dialog"),
    undo = $("#undo"),
    dialogVolo = $("#dialog"),
    dialogNave = $("#dialog");

  //    loadSelectViaAjax(null,urls['only_flight'],$('#solo_volo_apt_partenza').data('kendoDropDownList'),'Aeroporto di Partenza',false);
  //    enableAerportoSoloVoloRitorno(false);
  $("#solo_volo_composizione_wrapper").addClass("isDisabled");
  $("#passeggeriInput").removeClass("inputEnabled");
  $("#passeggeriInput").attr("disabled", "disabled");
  undo.click(function () {
    dialog.data("kendoDialog").open();
    undo.fadeOut();
  });

  function onClose() {
    undo.fadeIn();
  }

  $(".all-destination-btn").click(function () {
    if ($(window).width() > 900) {
      dialogwidth = 700;
    } else {
      dialogwidth = $(window).width() - 100;
    }

    if (form_active === "form_hotel") {
      dialog.kendoDialog({
        width: dialogwidth + "px",
        title: "Scegli una destinazione",
        content: $("#dialog-content").html(),
        closable: true,
        modal: true,
        close: onClose,
        show: onOpenKendo,
        buttonLayout: "normal",
      });
      dialog.data("kendoDialog").open();
      $(".modal_location").click(function () {
        id = $(this).attr("id");
        text = $(this).text();
        $("#prodottoType").val("regione");
        $("#codiceRicerca").val(id);
        $("#destinazione").val(id);
        $("#localita").val("");
        $("#codiceProdotto").val("");
        $("#autocomplete_hotel").val(text);
        dialog.data("kendoDialog").close();
        popolaPartenze();
      });
    } else if (form_active === "form_volo") {
      dialogVolo.kendoDialog({
        width: dialogwidth + "px",
        title: "Scegli una destinazione",
        content: $("#dialog-content-volo").html(),
        closable: true,
        modal: true,
        close: onClose,
        buttonLayout: "normal",
      });
      dialogVolo.data("kendoDialog").open({ open: onOpenKendo });
      $(".modal_location").click(function () {
        id = $(this).attr("id");
        text = $(this).text();
        $("#form_volo #codiceRicerca").val(id);
        $("#form_volo #prodottoType").val("regione");
        $("#form_volo #destinazione").val(id);
        $("#form_volo #localita").val("");
        $("#autocomplete_volo").val(text);
        $("#form_volo #localita").val("");
        $("#form_volo #codiceProdotto").val("");
        dialogVolo.data("kendoDialog").close();
        value = $("#form_volo #codiceRicerca").val();
        prodottoType = $("#form_volo #prodottoType").val();
        loadSelectViaAjax(
          { destinazione: value, prodottoType: prodottoType },
          urls["flights_search"],
          $("#areoporto_partenza_volo").data("kendoDropDownList"),
          "Aeroporto di Partenza",
          false
        );
        enableAerporto(true);
      });
    } else if (form_active === "form_nave") {
      dialog.kendoDialog({
        width: dialogwidth + "px",
        title: "Scegli una destinazione",
        content: $("#dialog-content-nave").html(),
        closable: true,
        modal: true,
        close: onClose,
        buttonLayout: "normal",
      });
      dialogNave.data("kendoDialog").open();
      $(".modal_location").click(function () {
        id = $(this).attr("id");
        text = $(this).text();
        $("#form_nave #prodottoType").val("regione");
        $("#form_nave #codiceRicerca").val(id);
        $("#form_nave #destinazione").val(id);
        $("#form_nave #localita").val("");
        $("#form_nave #codiceProdotto").val("");
        $("#autocomplete_nave").val(text);
        dialogNave.data("kendoDialog").close();
        popolaPartenzeNave();
      });
    }
  });

  function onOpenKendo(e) {
    if ($(window).width() <= 767) {
      $(".k-window-titlebar.k-dialog-titlebar.k-header").css(
        "margin-top",
        "+=45px"
      );
      $("#dialog").css("height", "500px");
      $("#dialog").css("overflow", "scroll");
    }
  }

  $(".aeroporto_partenza_wrapper").click(function () {
    inInitForm = 0;
    if ($(this).children(".disabledSelect").length > 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    } else {
      $(this).addClass("focusBorder");
      $("#sistemazioni-form_volo").fadeOut(600);
      $("#calendarWrapper_volo").fadeOut(600);
      $("#data_partenza_volo").removeClass("focusBorder");
      $(".adulti_bambini_box").removeClass("focusBorder");
    }
  });
  $(".notti-select").selectmenu({
    change: function (event, ui) {
      $("#" + form_active + " #partenzaNotti").val(ui.item.value);
    },
  });

  $(".camere-select").selectmenu({
    change: function (event, ui) {
      initCamere(ui.item.value);
    },
  });
  $(".persone").selectmenu({
    change: function (event, ui) {
      initPersone(ui);
    },
  });
  $(".bambini").selectmenu({
    change: function (event, ui) {
      initBambini(ui);
    },
  });
  $(".eta").selectmenu({
    change: function (event, ui) {
      initEta(ui);
    },
  });
  var itemsGroup = [];
  $("#autocomplete_hotel").on("keydown", function () {
    $(".submit_cerca").addClass("isDisabled");
    $(".data_partenza").val("");
    $(".form_ricerca").height(105);
    $("#waiting").hide();
    $("#data_partenza_hotel").attr("disabled", true);
    $("#" + form_active + " " + ".adulti_bambini_camere").attr(
      "disabled",
      true
    );
    $("#data_partenza_hotel").removeClass("inputEnabled");
    $("#" + form_active + " " + ".adulti_bambini_camere").removeClass(
      "inputEnabled"
    );
    $("#" + form_active + " " + "#composizione_wrapper").removeClass(
      "inputEnabled"
    );
  });

  $("#autocomplete_nave").on("keydown", function () {
    $(".submit_cerca").addClass("isDisabled");
    $(".form_ricerca").height(105);
    $("#waiting").hide();
    $("#data_partenza_nave").attr("disabled", true);
    $("#" + form_active + " " + ".adulti_bambini_camere").attr(
      "disabled",
      true
    );
    $("#data_partenza_nave").removeClass("inputEnabled");
    $("#" + form_active + " " + ".adulti_bambini_camere").removeClass(
      "inputEnabled"
    );
    $("#" + form_active + " " + "#composizione_wrapper").removeClass(
      "inputEnabled"
    );
    $(".data_partenza").val("");
  });

  $("#autocomplete_volo").on("keydown", function () {
    enableAerporto(false);
  });

  $("#autocomplete_hotel")
    .autocomplete({
      position: { collision: "flip" },
      source: urls["product_search"],
      classes: {
        "ui-autocomplete": "highlight",
      },
      select: function (event, ui) {
        $("#waiting").hide();
        if (ui.item.type == "noData") {
          $("#codiceRicerca").val("");
          $("#prodottoType").val("");
          $("#autocomplete_hotel").val("");
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
        $("#codiceRicerca").val(ui.item.codice);
        $("#prodottoType").val(ui.item.type);
        if (ui.item.type === "regione") {
          $("#destinazione").val(ui.item.codice);
          $("#localita").val("");
          $("#codiceProdotto").val("");
        }
        if (ui.item.type === "localita") {
          $("#localita").val(ui.item.codice);
          $("#codiceProdotto").val("");
          $("#destinazione").val("");
        }
        if (ui.item.type === "struttura") {
          $("#codiceProdotto").val(ui.item.codice);
          $("#localita").val("");
          $("#destinazione").val("");
        }
        var value = $("#codiceRicerca").val();
        var prodottoType = $("#prodottoType").val();
        if (!value) {
          return;
        }
        inInitForm = 0;
        popolaPartenze();
      },

      open: function (e) {
        if ($(window).width() >= 768) {
          $(".highlight").width(470);
        } else {
          $(".highlight").width(278);
        }
        $("#waiting").hide();
        $(".suggest_group_header").hover(function () {
          event.stopPropagation();
        });
        $(".dropdown-head").hover(function () {
          event.stopPropagation();
        });
        $(".form_ricerca").height(105);
      },
      search: function (event, ui) {
        //closeAutoSuggest();
        if ($("#autocomplete_hotel").val().length > 1) {
          $(".form_ricerca").height(150);
          $("#waiting").show();
        } else {
          $(".submit_cerca").addClass("isDisabled");
          $(".form_ricerca").height(105);
          $("#waiting").hide();
          $("#data_partenza_hotel").attr("disabled", true);
          $("#" + form_active + " " + ".adulti_bambini_camere").attr(
            "disabled",
            true
          );
          $("#data_partenza_hotel").removeClass("inputEnabled");
          $("#" + form_active + " " + ".adulti_bambini_camere").removeClass(
            "inputEnabled"
          );
          $("#" + form_active + " " + "#composizione_wrapper").removeClass(
            "inputEnabled"
          );
          event.stopPropagation();
          event.stopImmediatePropagation();
          return false;
        }
      },
      change: function (e) {
        if ($("#autocomplete_hotel").val().length < 2) {
          $("#waiting").hide();
          $(".submit_cerca").addClass("isDisabled");
          $("#data_partenza_hotel").attr("disabled", true);
          $("#" + form_active + " " + ".adulti_bambini_camere").attr(
            "disabled",
            true
          );
          $("#data_partenza_hotel").removeClass("inputEnabled");
          $("#" + form_active + " " + ".adulti_bambini_camere").removeClass(
            "inputEnabled"
          );
          $("#" + form_active + " " + "#composizione_wrapper").removeClass(
            "inputEnabled"
          );
        }
      },
      response: function (e, ui) {
        $("#waiting").hide();
      },
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
    header = "";
    if (item.type !== "noData") {
      if (item.indice === 0) {
        header =
          '<h5 class=suggest_group_header onclick="event.stopPropagation();">' +
          item.label +
          "</h5>";
      }
      inner_html =
        '<div class="list_item_container"><div class="image" style="display: none"><img src="/futuranew/web/img/notfound.jpg" ></div><div class="label"><h4>' +
        item.value +
        "<i> " +
        item.descrizione +
        "</i></h4></div></div>";

      li = $('<li class="suggest"></li>')
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
      li.before(header);
      if (item.counter === 0) {
        li.prev().before(
          '<div class="dropdown-head" style="border:none"><button onclick="closeAutoSuggest();event.stopPropagation();"class="btn-close close-popover hidden" type="button" style="margin-right: 5px" >&nbsp;X</button><span class="dropdown-title">Seleziona la tua destinazione</span></div>'
        );
      }
      if (item.indice === 0) {
        li.css("border-top", "none");
      }
    } else {
      inner_html =
        '<div class="list_item_container"><div class="image" style="display: none"><img src="/futuranew/web/img/notfound.jpg" ></div><div class="label">' +
        item.value +
        "</div></div>";
      li = $('<li class="suggest"></li>')
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
      li.before(header);
      if (item.counter === 0) {
        li.prev().before(
          '<div class="dropdown-head" style="border:none"><button onclick="closeAutoSuggest();event.stopPropagation();"class="btn-close close-popover hidden" type="button" style="margin-right: 5px" >&nbsp;X</button><span class="dropdown-title">Seleziona la tua destinazione</span></div>'
        );
      }
      if (item.indice === 0) {
        li.css("border-top", "none");
      }
    }
    return li;
  };

  $("#autocomplete_volo")
    .autocomplete({
      position: { collision: "flip" },
      source: function (request, response) {
        $.getJSON(
          urls["product_search"],
          { tipo: "volo", term: $("#autocomplete_volo").val() },
          response
        );
      },
      minLength: 2,
      classes: {
        "ui-autocomplete": "highlight",
      },
      select: function (event, ui) {
        $("#form_volo #waiting").hide();
        if (ui.item.type == "noData") {
          $("#form_volo #codiceRicerca").val("");
          $("#form_volo #prodottoType").val("");
          $("#autocomplete_volo").val("");
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
        $("#form_volo #codiceRicerca").val(ui.item.codice);
        $("#form_volo #prodottoType").val(ui.item.type);
        if (ui.item.type === "regione") {
          $("#form_volo #destinazione").val(ui.item.codice);
          $("#form_volo #localita").val("");
          $("#form_volo #codiceProdotto").val("");
        }
        if (ui.item.type === "localita") {
          $("#form_volo #localita").val(ui.item.codice);
          $("#form_volo #codiceProdotto").val("");
          $("#form_volo #destinazione").val("");
        }
        if (ui.item.type === "struttura") {
          $("#form_volo #codiceProdotto").val(ui.item.codice);
          $("#form_volo #localita").val("");
          $("#form_volo #destinazione").val("");
        }
        var value = $("#form_volo #codiceRicerca").val();
        var prodottoType = $("#form_volo #prodottoType").val();
        if (!value) {
          return;
        }
        //$("#areoporto_partenza_volo").kendoDropDownList().select(0);
        //$("#areoporto_partenza_volo").kendoDropDownList().trigger("change");
        inInitForm = 0;
        loadSelectViaAjax(
          { destinazione: value, prodottoType: prodottoType },
          urls["flights_search"],
          $("#areoporto_partenza_volo").data("kendoDropDownList"),
          "Aeroporto di Partenza",
          false
        );
        //$("#areoporto_partenza_volo").kendoDropDownList().dataSource.read();

        enableAerporto(true);
      },

      open: function (e) {
        $(".form_ricerca").height(85);
        if ($(window).width() >= 768) {
          $(".highlight").width(470);
        } else {
          $(".highlight").width(278);
        }
        $("#form_volo #waiting").hide();
        $(".suggest_group_header").hover(function () {
          event.stopPropagation();
        });
        $(".dropdown-head").hover(function () {
          event.stopPropagation();
        });
      },
      search: function (event, ui) {
        //closeAutoSuggest();
        if ($("#autocomplete_volo").val().length > 2) {
          $(".form_ricerca").height(150);
          $("#form_volo #waiting").show();
        } else if ($("#autocomplete_volo").val().length == 3) {
          $(".submit_cerca").addClass("isDisabled");
          //$('.submit_cerca').attr('disabled');
          $(".form_ricerca").height(105);
        }
      },
      change: function (e) {
        if ($("#autocomplete_volo").val().length < 3) {
          $("#form_volo #waiting").hide();
          $(".submit_cerca").addClass("isDisabled");
          $("#data_partenza_volo").attr("disabled", true);
          $("#data_partenza_volo").val("");
          $("#" + form_active + " " + ".adulti_bambini_camere").attr(
            "disabled",
            true
          );
        }
      },
      response: function (e, ui) {
        $("#form_volo #waiting").hide();
      },
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
    header = "";
    if (item.type !== "noData") {
      if (item.indice === 0) {
        header =
          '<h5 class=suggest_group_header onclick="event.stopPropagation();">' +
          item.label +
          "</h5>";
      }
      inner_html =
        '<div class="list_item_container"><div class="image" style="display: none"><img src="/futuranew/web/img/notfound.jpg" ></div><div class="label"><h4>' +
        item.value +
        "<i> " +
        item.descrizione +
        "</i></h4></div></div>";

      li = $('<li class="suggest"></li>')
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
      li.before(header);
      if (item.counter === 0) {
        li.prev().before(
          '<div class="dropdown-head" style="border:none"><button onclick="closeAutoSuggest();event.stopPropagation();"class="btn-close close-popover hidden" type="button" style="margin-right: 5px" >&nbsp;X</button><span class="dropdown-title">Seleziona la tua destinazione</span></div>'
        );
      }
      if (item.indice === 0) {
        li.css("border-top", "none");
      }
    } else {
      inner_html =
        '<div class="list_item_container"><div class="image" style="display: none"><img src="/futuranew/web/img/notfound.jpg" ></div><div class="label">' +
        item.value +
        "</div></div>";
      li = $('<li class="suggest"></li>')
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
      li.before(header);
      if (item.counter === 0) {
        li.prev().before(
          '<div class="dropdown-head" style="border:none"><button onclick="closeAutoSuggest();event.stopPropagation();"class="btn-close close-popover hidden" type="button" style="margin-right: 5px" >&nbsp;X</button><span class="dropdown-title">Seleziona la tua destinazione</span></div>'
        );
      }
      if (item.indice === 0) {
        li.css("border-top", "none");
      }
    }
    return li;
  };

  $("#autocomplete_nave")
    .autocomplete({
      position: { collision: "flip" },
      source: function (request, response) {
        $.getJSON(
          urls["product_search"],
          { tipo: "nave", term: $("#autocomplete_nave").val() },
          response
        );
      },
      minLength: 2,
      classes: {
        "ui-autocomplete": "highlight",
      },

      select: function (event, ui) {
        $("#form_nave #prodottoType").val(ui.item.type);
        $("#form_nave #codiceRicerca").val(ui.item.codice);
        var value = $("#form_nave #codiceRicerca").val();
        var prodottoType = $("#form_nave #prodottoType").val();
        if (!value) {
          return;
        }
        if (ui.item.type === "regione") {
          $("#form_nave #destinazione").val(ui.item.codice);
          $("#form_nave #localita").val("");
          $("#form_nave #codiceProdotto").val("");
        }
        if (ui.item.type === "localita") {
          $("#form_nave #localita").val(ui.item.codice);
          $("#form_nave #codiceProdotto").val("");
          $("#form_nave #destinazione").val("");
        }
        if (ui.item.type === "struttura") {
          $("#form_nave #codiceProdotto").val(ui.item.codice);
          $("#form_nave #localita").val("");
          $("#form_nave #destinazione").val("");
        }
        inInitForm = 0;
        popolaPartenzeNave();
      },
      open: function (e) {
        $(".form_ricerca").height(85);
        if ($(window).width() >= 768) {
          $(".highlight").width(470);
        } else {
          $(".highlight").width(278);
        }
        $("#form_nave #waiting").hide();
        $(".suggest_group_header").hover(function () {
          event.stopPropagation();
        });
        $(".dropdown-head").hover(function () {
          event.stopPropagation();
        });
      },
      search: function (event, ui) {
        //closeAutoSuggest();
        if ($("#autocomplete_nave").val().length > 2) {
          $(".form_ricerca").height(150);
          $("#form_nave #waiting").show();
        } else if ($("#autocomplete_nave").val().length == 3) {
          $(".submit_cerca").addClass("isDisabled");
          //$('.submit_cerca').attr('disabled');
          $(".form_ricerca").height(105);
        }
      },
      change: function () {
        if ($("#autocomplete_nave").val().length < 2) {
          $("#waiting").hide();

          $(".submit_cerca").addClass("isDisabled");
          //$('.submit_cerca').attr('disabled');
          $("#data_partenza_nave").attr("disabled", true);
          //$('#data_partenza_hotel').val('');
          $("#" + form_active + " " + ".adulti_bambini_camere").attr(
            "disabled",
            true
          );
        }
      },
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
    header = "";
    if (item.type !== "noData") {
      if (item.indice === 0) {
        header =
          '<h5 class=suggest_group_header onclick="event.stopPropagation();">' +
          item.label +
          "</h5>";
      }
      inner_html =
        '<div class="list_item_container"><div class="image" style="display: none"><img src="/futuranew/web/img/notfound.jpg" ></div><div class="label"><h4>' +
        item.value +
        "<i> " +
        item.descrizione +
        "</i></h4></div></div>";

      li = $('<li class="suggest"></li>')
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
      li.before(header);
      if (item.counter === 0) {
        li.prev().before(
          '<div class="dropdown-head" style="border:none"><button onclick="closeAutoSuggest();event.stopPropagation();"class="btn-close close-popover hidden" type="button" style="margin-right: 5px" >&nbsp;X</button><span class="dropdown-title">Seleziona la tua destinazione</span></div>'
        );
      }
      if (item.indice === 0) {
        li.css("border-top", "none");
      }
    } else {
      inner_html =
        '<div class="list_item_container"><div class="image" style="display: none"><img src="/futuranew/web/img/notfound.jpg" ></div><div class="label">' +
        item.value +
        "</div></div>";
      li = $('<li class="suggest"></li>')
        .data("item.autocomplete", item)
        .append(inner_html)
        .appendTo(ul);
      li.before(header);
      if (item.counter === 0) {
        li.prev().before(
          '<div class="dropdown-head" style="border:none"><button onclick="closeAutoSuggest();event.stopPropagation();"class="btn-close close-popover hidden" type="button" style="margin-right: 5px" >&nbsp;X</button><span class="dropdown-title">Seleziona la tua destinazione</span></div>'
        );
      }
      if (item.indice === 0) {
        li.css("border-top", "none");
      }
    }
    return li;
  };

  $("#form_hotel .submit").click(function (e) {
    if (form_active === "form_hotel") {
      if ($("#autocomplete_hotel").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      }
    }
    if (form_active === "form_volo") {
      if ($("#autocomplete_volo").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      } else if ($("#areoporto_partenza_volo").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare un aeroporto di partenza.");
      }
    }
    if (form_active === "form_nave") {
      if ($("#autocomplete_nave").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      }
    }
  });

  $("#form_solo_volo .submit").click(function (e) {
    if ($("#solo_volo_apt_partenza").data("kendoDropDownList").value() == "") {
      e.preventDefault();
      swal("Attenzione", "Indicare un aeroporto di partenza");
    } else if (
      $("#solo_volo_apt_arrivo").data("kendoDropDownList").value() == ""
    ) {
      e.preventDefault();
      swal("Attenzione", "Indicare un aeroporto di arrivo");
    }
  });

  $("#form_volo .submit").click(function (e) {
    if (form_active === "form_hotel") {
      if ($("#autocomplete_hotel").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      }
    }
    if (form_active === "form_volo") {
      if ($("#autocomplete_volo").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      } else if ($("#areoporto_partenza_volo").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare un aeroporto di partenza.");
      }
    }
    if (form_active === "form_nave") {
      if ($("#autocomplete_nave").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      }
    }
  });

  $("#form_nave .submit").click(function (e) {
    if (form_active === "form_hotel") {
      if ($("#autocomplete_hotel").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      }
    }
    if (form_active === "form_volo") {
      if ($("#autocomplete_volo").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      } else if ($("#areoporto_partenza_volo").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare un aeroporto di partenza.");
      }
    }
    if (form_active === "form_nave") {
      if ($("#autocomplete_nave").val() === "") {
        e.preventDefault();
        swal("Attenzione", "Indicare nome/codice hotel o la destinazione.");
      }
    }
  });

  $(".autocomplete_hotel").focus(function () {
    $("#calendarWrapper").hide();
    $(".data_partenza").removeClass("focusBorder");
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $("#calendarWrapper_nave").hide();
    $("#sistemazioni-form_hotel").hide();
    $("#sistemazioni-form_nave").hide();
    $("#sistemazioni-form_volo").hide();
    $("#calendarWrapper_volo").hide();
  });
  $(".chiudi-calendar").click(function () {
    var date = $("#" + form_active + " .dt-picker").val();
    var dateString = date.split("/");
    var datePart =
      dateString[1].toString() +
      "/" +
      dateString[0].toString() +
      "/" +
      dateString[2].toString();
    $("#" + form_active + " #partenzaData").val(datePart);
    $(".departure").each(function () {
      $(this).val(datePart);
    });
    $(".data_partenza").each(function () {
      if (form_active != "form_solo_volo") {
        $(this).val(
          datePart +
            "   " +
            $("#" + form_active + " #notti-number-input").val() +
            " Notti"
        );
      }
    });
    if (form_active == "form_solo_volo") {
      if ($(this).attr("id") == "seleziona_solo_volo_andata") {
        $("#data_partenza_solo_volo").val(datePart);
        $("#data_ritorno_solo_volo").addClass("inputEnabled");
        $("#data_ritorno_solo_volo").removeAttr("disabled");
      }
      if ($(this).attr("id") == "seleziona_solo_volo_ritorno") {
        date = $("#datepicker_solo_volo_ritorno").val();
        dateString = date.split("/");
        datePart =
          dateString[1].toString() +
          "/" +
          dateString[0].toString() +
          "/" +
          dateString[2].toString();
        $("#data_ritorno_solo_volo").val(datePart);
      }
    }
    $(".dropdown-calendar").hide();
  });
  $(".dt-picker").datepicker({
    minDate: new Date(),
    onSelect: function (dateText, inst) {
      $("#seleziona_hotel").trigger("click");
    },
  });
  $.datepicker.regional["it"];

  $("#data_partenza_hotel").focus(function () {
    $("#sistemazioni-form_hotel").hide();
    changeLayerPosition("data_partenza_hotel", "calendarWrapper");
    $("#calendarWrapper").show("blind", null, 600);
    $(this).addClass("focusBorder");
    $(".adulti_bambini_box").removeClass("focusBorder");
    if ($(window).width() <= 761) {
      $("html,body").animate(
        {
          scrollTop: $("#calendarWrapper").offset().top,
        },
        "slow"
      );
    }
  });
  $("#calendar_icon_form").click(function () {
    $(".data_partenza").addClass("focusBorder");
    $("#sistemazioni-form_hotel").hide();
    $("#calendarWrapper").show("blind", null, 600);
  });
  $("#data_partenza_volo").focus(function () {
    $("#sistemazioni-form_volo").hide();
    changeLayerPosition("data_partenza_volo", "calendarWrapper_volo");
    $("#calendarWrapper_volo").fadeIn(600);
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $(this).addClass("focusBorder");
    if ($(window).width() <= 761) {
      $("html,body").animate(
        {
          scrollTop: $("#form_volo #calendarWrapper_volo").offset().top,
        },
        "slow"
      );
    }
  });
  $("#data_partenza_solo_volo").focus(function () {
    $("#sistemazioni_form_solo_volo").hide();
    changeLayerPosition("data_partenza_solo_volo", "calendarWrapper_solo_volo");
    $("#calendarWrapper_solo_volo_ritorno").hide();
    $("#calendarWrapper_solo_volo").fadeIn(600);
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $(this).addClass("focusBorder");
    if ($(window).width() <= 761) {
      $("html,body").animate(
        {
          scrollTop: $("#calendarWrapper_solo_volo").offset().top,
        },
        "slow"
      );
    }
  });
  $("#data_ritorno_solo_volo").focus(function () {
    $("#sistemazioni_form_solo_volo").hide();
    $("#calendarWrapper_solo_volo").hide();
    changeLayerPosition(
      "data_ritorno_solo_volo",
      "calendarWrapper_solo_volo_ritorno"
    );
    $("#calendarWrapper_solo_volo_ritorno").fadeIn(600);
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $(this).addClass("focusBorder");
    if ($(window).width() <= 761) {
      $("html,body").animate(
        {
          scrollTop: $("#calendarWrapper_solo_volo").offset().top,
        },
        "slow"
      );
    }
  });
  $("#data_partenza_nave").focus(function () {
    $("#sistemazioni-form_nave").hide();
    changeLayerPosition("data_partenza_nave", "calendarWrapper_nave");
    $("#calendarWrapper_nave").fadeIn(600);
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(this).addClass("focusBorder");
    // if($(window).width() <= 761) {
    //     $('html,body').animate({
    //         scrollTop: $("#form_volo #calendarWrapper_nave").offset().top
    //     }, 'slow');
    // }
  });
  //enableSistemazioniHotel(true);

  $("body").on("click", "a.trattamenti_diversi", function (e) {
    e.preventDefault();
    swal({
      title: "Attenzione",
      text:
        "Non &egrave; possibile prenotare sistemazioni con trattamenti differenti tra loro.<br />Per qualsiasi aiuto o informazione aggiuntiva puoi contattare il nostro servizio Help Desk.",
      html: true,
    });
  });

  $("body").on("click", "a.b2b_prenota", function (e) {
    e.preventDefault();
    loaderWrapper = $("#loader-wrapper.home-wrapper");

    if (loaderWrapper.length > 0) {
      scrollTop = $(window).scrollTop();

      if (scrollTop > 700) {
        scrollTop = scrollTop - 700;
      }
      //loaderWrapper.css('top',scrollTop.toString()+'px');
      loaderWrapper.css("display", "block");
    } else {
      var loaderWrapperParent = $(this).closest(":has(#loader-wrapper)");
      loaderWrapperParent.removeClass("loaded");
    }
    urlCheck = $(this).attr("href");
    $.ajax({
      url: $(this).attr("href"),
    })
      .done(function (json) {
        if (json.codice_pratica === "0") {
          swal({
            title: "Attenzione",
            text:
              'La struttura e/o il servizio prescelti al momento non sono disponibili (<span class="red">' +
              json.messaggio +
              "</span>).<br />Per qualsiasi aiuto o informazione aggiuntiva puoi contattare il nostro servizio Help Desk.",
            html: true,
          });

          loaderWrapper.hide();
          $("#loader-wrapper").hide();
        } else {
          parStringStart = urlCheck.indexOf("?");
          additionalParameter = urlCheck.substring(parStringStart + 1);
          window.location =
            urls.file_data +
            "?codice_pratica=" +
            json.codice_pratica +
            "&" +
            additionalParameter;
        }
      })
      .fail(function () {
        loaderWrapper.hide();
        $("#loader-wrapper").hide();
      });
  });

  $(".ricerca_home .tab").click(function (e) {
    e.preventDefault();
    $(".ricerca_home ul li").removeClass("active");
    $(this).parent().addClass("active");
    form_active = $(".ricerca_home ul li.active form").attr("id");
  });
  $("#selectVolo, #selectVolo_mobile").click(function () {
    $(".data_partenza").removeClass("focusBorder");
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $(".sistemazioni").hide();
    $(".dropdown-calendar").hide();

    if (changeForm != form_active) {
      cleanfield("volo");
    }
    changeForm = "form_volo";
    //inInitForm = 0;
  });
  $("#selectNave, #selectNave_mobile").click(function () {
    inInitForm = 0;
    $(".data_partenza").removeClass("focusBorder");
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $(".sistemazioni").hide();
    $(".dropdown-calendar").hide();
    if (changeForm != form_active) {
      cleanfield("nave");
    }
    changeForm = "form_nave";
  });
  $("#selectHotel, #selectHotel_mobile").click(function () {
    inInitForm = 0;
    $(".data_partenza").removeClass("focusBorder");
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $(".sistemazioni").hide();
    $(".dropdown-calendar").hide();
    if (changeForm != form_active) {
      cleanfield("hotel");
    }
    changeForm = "form_hotel";
  });
  $("#selectSoloVolo, #selectSoloVolo_mobile").click(function () {
    inInitForm = 0;
    $(".data_partenza").removeClass("focusBorder");
    $(".adulti_bambini_box").removeClass("focusBorder");
    $(".aeroporto_partenza_wrapper").removeClass("focusBorder");
    $(".sistemazioni").hide();
    $(".dropdown-calendar").hide();
    if (changeForm != form_active) {
      cleanfield("solo_volo");
    }
    changeForm = "form_solo_volo";
  });
  var parameters = getUrlVars();
  if (parameters.length > 1) {
    if (typeof parameters.tipoSearch !== "undefined") {
      if (parameters.tipoSearch !== "solo_volo") {
        initForm(parameters);
        loadSelectViaAjax(
          null,
          urls["only_flight"],
          $("#solo_volo_apt_partenza").data("kendoDropDownList"),
          "Aeroporto di Partenza",
          false
        );
        enableAerportoSoloVoloRitorno(false);
      } else {
        initFormSoloVolo(parameters);
      }
    }
  } else {
    loadSelectViaAjax(
      null,
      urls["only_flight"],
      $("#solo_volo_apt_partenza").data("kendoDropDownList"),
      "Aeroporto di Partenza",
      false
    );
    enableAerportoSoloVoloRitorno(false);
    enableAerporto(false);
    if ($("#criteriolocalita").length > 0) {
      $("#prodottoType").val($("#placeType").val().toLocaleLowerCase());
      $("#codiceRicerca").val($("#placeId").val());
      $("#destinazione").val($("#placeId").val());
      $("#localita").val("");
      $("#codiceProdotto").val("");
      $("#autocomplete_hotel").val($("#criteriolocalita").val());
      popolaPartenze();
    }
    if ($("#criteriostruttura").length > 0) {
      $("#prodottoType").val("struttura");
      $("#codiceRicerca").val($("#marketingId").val());
      $("#destinazione").val("");
      $("#localita").val("");
      $("#codiceProdotto").val($("#marketingId").val());
      $("#autocomplete_hotel").val($("#criteriostruttura").val());
      popolaPartenze();
    }
  }

  // // Dropdown Navigation
  // const menuItems = document.querySelectorAll('li.dropdown');
  // Array.prototype.forEach.call(menuItems, function(el) {
  //   const links = el.querySelector('a');
  //   links.addEventListener("mouseover",  function(event) {
  //     this.parentNode.className = "dropdown link open";
  //     this.setAttribute('aria-expanded', "true");
  //     return false;
  //   });
  //   links.addEventListener("mouseout",  function(event) {
  //     this.parentNode.className = "dropdown link";
  //     this.setAttribute('aria-expanded', "false");
  //     return false;
  //   });
  // });

});
$(".soloVoloPaseggeri").click(function (e) {
  var form = "form_solo_volo";
  var nCamere = $("#" + form + " #numero_camere").val();
  var nAdulti = 0;
  var nBambini = 0;
  var text = "";
  var bambiniTxt = "";
  var mainForm = $(this)[0].form.id;
  var camereElement = $("input[name='camere']");
  var adultiElement = null;
  var bambiniElement = null;
  var etaElement = null;
  var adultiPerCamera = 0;
  var bambiniPerCamera = 0;
  var maxCamere = 4;

  $("#" + form + " select.persone").each(function (index) {
    if (index == 0) {
      adultiPerCamera = parseInt($(this).val());
      nAdulti = nAdulti + adultiPerCamera;

      adultiElement = $("input[name=adulti\\[" + index + "\\]]");
      adultiElement.each(function () {
        $(this).val(adultiPerCamera);
      });
    }
  });

  $("#" + form + " select.bambini").each(function (index) {
    if (index == 0) {
      bambiniPerCamera = parseInt($(this).val());
      nBambini = nBambini + bambiniPerCamera;
      bambiniElement = $("input[name=bambini\\[" + index + "\\]]");
      bambiniElement.each(function () {
        $(this).val(bambiniPerCamera);
      });
      age = index + 1;
      $(this)
        .parent("div")
        .next()
        .find("select")
        .each(function () {
          idBambino = $(this).attr("name").split("_");
          c = parseInt(idBambino[1]) - 1;
          $("input[name=bambini_eta\\[" + index + "\\]\\[" + c + "\\]]").val(
            $(this).val()
          );
        });
      //$("div[name=]")
    }
  });

  bambiniTxt = "";
  if (nBambini > 0 && nBambini < 2) {
    bambiniTxt = ", " + nBambini.toString() + " Bambino ";
  }
  if (nBambini > 1) {
    bambiniTxt = ", " + nBambini.toString() + " Bambini ";
  }
  if (nAdulti > 1) {
    adultiString = " Adulti";
  } else {
    adultiString = " Adulto";
  }

  text = nAdulti.toString() + adultiString + bambiniTxt;
  $("#passeggeriInput").val(text);

  rooms = nCamere;
  adults = nAdulti;
  childs = nBambini;
  $(".sistemazioni").hide();
});

$(".addCamere").click(function (e) {
  var form = $(this).parent("div").parent("div").parent("div").attr("id");
  var nCamere = $("#" + form + " #numero_camere").val();
  var nAdulti = 0;
  var nBambini = 0;
  var text = "";
  var bambiniTxt = "";
  var mainForm = $(this)[0].form.id;
  var camereElement = $("input[name='camere']");
  var adultiElement = null;
  var bambiniElement = null;
  var etaElement = null;
  var adultiPerCamera = 0;
  var bambiniPerCamera = 0;
  var maxCamere = 4;

  camereElement.each(function (index) {
    $(this).val(nCamere);
  });

  $("#" + form + " select.persone").each(function (index) {
    if (index + 1 <= nCamere) {
      adultiPerCamera = parseInt($(this).val());
      nAdulti = nAdulti + adultiPerCamera;

      adultiElement = $("input[name=adulti\\[" + index + "\\]]");
      adultiElement.each(function () {
        $(this).val(adultiPerCamera);
      });
    }
  });

  for (i = nCamere; i < maxCamere; i++) {
    adultiElement = $("input[name=adulti\\[" + i + "\\]]");
    adultiElement.each(function () {
      $(this).val(0);
    });
  }

  $("#" + form + " select.bambini").each(function (index) {
    if (index + 1 <= nCamere) {
      bambiniPerCamera = parseInt($(this).val());
      nBambini = nBambini + bambiniPerCamera;
      bambiniElement = $("input[name=bambini\\[" + index + "\\]]");
      bambiniElement.each(function () {
        $(this).val(bambiniPerCamera);
      });
      age = index + 1;
      $(this)
        .parent("div")
        .next()
        .find("select")
        .each(function () {
          idBambino = $(this).attr("name").split("_");
          c = parseInt(idBambino[1]) - 1;
          $("input[name=bambini_eta\\[" + index + "\\]\\[" + c + "\\]]").val(
            $(this).val()
          );
        });
      //$("div[name=]")
    }
  });

  for (i = nCamere; i < maxCamere; i++) {
    bambiniElement = $("input[name=bambini\\[" + i + "\\]]");
    bambiniElement.each(function () {
      $(this).val(0);
    });
    $("input[name=bambini_eta\\[" + i + "\\]\\[" + 0 + "\\]]").val(0);
    $("input[name=bambini_eta\\[" + i + "\\]\\[" + 1 + "\\]]").val(0);
    $("input[name=bambini_eta\\[" + i + "\\]\\[" + 2 + "\\]]").val(0);
    $("input[name=bambini_eta\\[" + i + "\\]\\[" + 3 + "\\]]").val(0);
  }

  bambiniTxt = "";
  if (nBambini > 0 && nBambini < 2) {
    bambiniTxt = nBambini.toString() + " Bimbo, ";
  }
  if (nBambini > 1) {
    bambiniTxt = nBambini.toString() + " Bimbi, ";
  }
  if (nAdulti > 1) {
    adultiString = "Adulti, ";
  } else {
    adultiString = "Adulto, ";
  }
  if (nCamere > 1) {
    camereString = " Camere";
  } else {
    camereString = " Camera";
  }
  text =
    nAdulti.toString() +
    adultiString +
    bambiniTxt +
    nCamere.toString() +
    camereString;
  $(".adulti_bambini_camere").each(function (index) {
    $(this).val(text);
  });

  rooms = nCamere;
  adults = nAdulti;
  childs = nBambini;
  $(".sistemazioni").hide();
});

function closeAutoSuggest() {
  $(".autocomplete_hotel").autocomplete("close");
}
