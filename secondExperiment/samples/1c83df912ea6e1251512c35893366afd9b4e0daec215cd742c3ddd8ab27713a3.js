$(document).ready(function(){
    var pageToken = window.location.pathname.split('/');
    for (i = 0; i < pageToken.length; i++) {
        if ( pageToken[i] === 'navps') {
            var pageIs = 'navps';
        }
        else if (pageToken[i] === 'vul-fund-prices') {
            var pageIs = 'vul';
        }
    }
    var siteName = "ph";
    var langCode = $("html").attr("lang").split('-')[0];
    var TableHtml = '';

    //Calling the properties file

    $.ajax({
        type: "GET",
        url: '/content/dam/sunlife/legacy/assets/ph/properties/ph_fund.properties',
        dataType: "text",
        success: function(data){
            //console.log(data);

            var splitData = data.split("\n");
            var stringData = {};
            for(i=0; i<splitData.length; i++){
                if(splitData[i].indexOf("=") == -1){
                   continue;
                }
                var equalsplit = splitData[i].split("=");
                stringData[equalsplit[0].trim()] = equalsplit[1].trim();
            }
            //console.log(stringData);

            var NAVPS_FUND_PDF_LOCATION = stringData[siteName+".navpsfundpdflocation"];
            var NAVPS_FUND_PDF_PREFIX = stringData[siteName+".navpsfundpdfprefix."+langCode];
            var phCurrency =stringData[siteName+".phillipinescurrencycode"];
            var usdCurrency = stringData[siteName+".usdcurrencycode"];
            /*List pesoRateFundList = getFundsForNAVPS(phCurrency);
            List usdRateFundList  = getFundsForNAVPS(usdCurrency);*/
            
            var funddateformat = stringData[siteName+".funddateformat."+langCode];
            var pesofundheading1 = stringData[siteName+".pesofundheading1."+langCode];
            var pesofundheading2 = stringData[siteName+".pesofundheading2."+langCode];
            var navpsAbbr = stringData[siteName+".netassetvaluepershareabbr."+langCode];
            var ytdAbbr = stringData[siteName+".yeartodateyieldabbr."+langCode];
            var yoyAbbr = stringData[siteName+".yearonyearyield."+langCode];
            var productFeatureAbbr = stringData[siteName+".productfeaturesheading."+langCode];
            var dollarfundheading1 = stringData[siteName+".dollarfundheading1."+langCode];
            var dollarfundheading2 = stringData[siteName+".dollarfundheading2."+langCode];
            var unitprice = stringData[siteName+".unitprice."+langCode];
            var fortheweek = stringData[siteName+".fortheweek."+langCode];
            var fortheweekof = stringData[siteName+".fortheweekof."+langCode];

            TableHtml += '<div class="slf-tab-container">' +
                         '<div class="tab-content responsive table-box-fund">';

            if ("navps"===pageIs) {
                $.ajax({
                    type: "post",
                    url: '/funds/navprice/mf/latest?version=1&language=en-us',
                    dataType: "text",
                    success: function(data1){
                        //console.log(data1);
                        var fundDataArr = JSON.parse(data1);
                        //console.log(fundDataArr.pesoList);
                        var pesoList = fundDataArr.pesoList;
                        var dollarList = fundDataArr.dollarList;

                                                            //peso table start here
                    
                        TableHtml += '<div  id="PesoFunds" aria-hidden="false" aria-expanded="true">' +
                                     '<div class="slf-table table-responsive pad-top-30" style="padding-top: 0px;">' +
                                     '<table class="table table-striped-row datagrid slf-comparison" id="accordion-section-1" >';

                        var pesoNAVPSIterator = pesoList.length;
                        var pesoNAVPSHeaderFlag = true;
                        for (var i = 0 ; i <pesoNAVPSIterator; i++) {
                            var mfPriceInfo = pesoList[i];
                            var fundDate1= mfPriceInfo['fundValDate'];
                            fundDate = moment(fundDate1).format(funddateformat); //update properties
                            var pdfFilePath = NAVPS_FUND_PDF_LOCATION+NAVPS_FUND_PDF_PREFIX+" "+mfPriceInfo['fundDesc'] + ' Fund' + ".pdf";

                            if(pesoNAVPSHeaderFlag)
                            {
                                TableHtml += '<thead class="bottom-border-fund">' + '<tr>' +
                                    '<th colspan="5"><span class="pull-left pad-left-18">As of '+ fundDate +'</span> <span class="margin-right-136">' +
                                            pesofundheading1 + '</span></th>' + '</tr>' + '<tr>' + 
                                    '<th scope="col" class="col-width-30">' + pesofundheading2 + '</th>' +
                                    '<th scope="col" class="col-width-20">' + navpsAbbr + '*</th>'+
                                    '<th scope="col" class="col-width-20">' + ytdAbbr + '*</th>' +
                                    '<th scope="col" class="col-width-20">' + yoyAbbr + '**</th>' +
                                    '<th class="col-width-10"><span class="sr-only">' + productFeatureAbbr + '</span> FFS</th>'+ '</tr> </thead>'+
                                    '<tbody id="q1">' ;
                                pesoNAVPSHeaderFlag = false;
                            }
                            TableHtml += '<tr>' + '<th scope="row">' + mfPriceInfo['fundDesc'] +'  Fund' + '</th>' +
							             '<td>' + '<div class="visible-xs">' + '<strong>' + mfPriceInfo['fundDesc'] +'  Fund' + '</strong> </div>'+
                                          mfPriceInfo['fundCurrency'] +  '&nbsp;' + mfPriceInfo['fundNetVal'] + '</td>';
								  
                            TableHtml += '<td>' + '<div class="visible-xs">' + '<strong>' + mfPriceInfo['fundDesc'] +'  Fund' + '</strong>'+
                                          '</div>' + mfPriceInfo['fundYtdVal'] + '%</td>';
							
                            TableHtml += '<td> <div class="visible-xs"> <strong>' + mfPriceInfo['fundDesc'] +'  Fund' + '</strong>' + 
                                         '</div>' + mfPriceInfo['fundYoyVal'] + '%</td>';

                            TableHtml += '<td> <div class="visible-xs"> <strong>' + mfPriceInfo['fundDes'] +'  Fund' + '</strong>' + 
                                         '</div> <a target="_new" href="' + pdfFilePath +'">' + '<img src="/content/dam/sunlife/legacy/assets/ph/images/download_factsheet.gif"' +
                                         'alt="download sheet" class="">' + '</a> </td> </tr>'

 
                        } //end while pesoNAVPSIterator
                        
                        TableHtml += '</tbody> 	</table> </div>';

                                                                        //peso table ends here

                                                                        //Dollar table starts here

                        TableHtml += '<div class="slf-table table-responsive pad-top-30"> <table class="table table-striped-row datagrid slf-comparison" id="accordion-section-2">';

                        var  usdNAVPSIterator = dollarList.length;
                        var usdNAVPSHeaderFlag = true;

                        for (var i = 0 ; i < usdNAVPSIterator; i++) {
                            var mfPriceInfo = dollarList[i];
                            var fundDate1= mfPriceInfo['fundValDate'];
                            fundDate = moment(fundDate1).format(funddateformat); //update properties
                            var pdfFilePath = NAVPS_FUND_PDF_LOCATION+NAVPS_FUND_PDF_PREFIX+" "+mfPriceInfo['fundDesc'] + " Fund" + ".pdf";
                            if(usdNAVPSHeaderFlag)
                            {
                                TableHtml += '<thead class="bottom-border-fund">' + '<tr>' +
                                    '<th colspan="5"><span class="pull-left pad-left-18">As of '+ fundDate +'</span> <span class="margin-right-136">' +
                                        dollarfundheading1 + '</span></th>' + '</tr>' + '<tr>' + 
                                    '<th scope="col" class="col-width-30">' + dollarfundheading2 + '</th>' +
                                    '<th scope="col" class="col-width-20">' + navpsAbbr + '*</th>'+
                                    '<th scope="col" class="col-width-20">' + ytdAbbr + '*</th>' +
                                    '<th scope="col" class="col-width-20">' + yoyAbbr + '**</th>' +
                                    '<th class="col-width-10">'+ '<span class="sr-only">' + productFeatureAbbr + '</span>' + 'FFS' +'</th>'+
                                    '</tr> </thead>'+'<tbody id="q2">' ;

                                    usdNAVPSHeaderFlag = false;
                            }

                            TableHtml += '<tr>' + '<th scope="row">' + mfPriceInfo['fundDesc'] +'  Fund' + '</th>' +
							             '<td>' + '<div class="visible-xs">' + '<strong>' + mfPriceInfo['fundDesc'] +'  Fund' + '</strong> </div>'+
                                          mfPriceInfo['fundCurrency'] +  '&nbsp;' + mfPriceInfo['fundNetVal'] + '</td>';
								  
                            TableHtml += '<td>' + '<div class="visible-xs">' + '<strong>' + mfPriceInfo['fundDesc'] +'  Fund' + '</strong>'+
                                          '</div>' + mfPriceInfo['fundYtdVal'] + '%</td>';
							
                            TableHtml += '<td> <div class="visible-xs"> <strong>' + mfPriceInfo['fundDesc'] +'  Fund' + '</strong>' + 
                                         '</div>' + mfPriceInfo['fundYoyVal'] + '%</td>';

                            TableHtml += '<td> <div class="visible-xs"> <strong>' + mfPriceInfo['fundDes'] + '</strong>' + 
                                         '</div> <a target="_new" href="' + pdfFilePath +'">' + '<img src="/content/dam/sunlife/legacy/assets/ph/images/download_factsheet.gif"' +
                                         'alt="download sheet" class="">' + '</a> </td> </tr>'


                        } //end while usdNAVPSIterator

                        TableHtml += '</tbody> 	</table> </div>';

                                                                        //dollar table ends here

                        
                        //end of tablehtml
                        TableHtml += '</div> </div>';

                        $('.html-component #NavpsFundsHtml').html(TableHtml);
                        pesoTable ();
                        intialiseTable();
                        
                        
                    },
                    error: function(){
                        console.log("funds service call failure:");
                    }   
                })
            }
            else if ("vul"===pageIs) {
                $.ajax({
                    type: "post",
                    url: '/funds/navprice/vul/latest?version=1&language=en-us',
                    dataType: "text",
                    success: function(data2){
                        //console.log(data2);
                        var fundDataArr = JSON.parse(data2);
                        var pesoList = fundDataArr.pesoList;
                        var dollarList = fundDataArr.dollarList;

                        var pesoRateVULFundList = []; 
                        var usdRateVULFundList =  []; 
                        var weeklyVULFundList =   []; 
                        var weeklyVULPesoFundList =   [];

                        for (var i in pesoList) {
                            if (pesoList[i]['weekly']=='Y') {
                                weeklyVULPesoFundList.push(pesoList[i]);
                            }
                            else if (pesoList[i]['weekly']=='N') {
                                pesoRateVULFundList.push(pesoList[i]);
                            }
                        }

                        for (var i in dollarList) {
                            if (dollarList[i]['weekly']=='Y') {
                                weeklyVULFundList.push(dollarList[i]);
                            }
                            else if (dollarList[i]['weekly']=='N') {
                                usdRateVULFundList.push(dollarList[i]);
                            }
                        }

                        TableHtml += '<div class="tab-pane tab-padding" id="DollarFunds"> <div class="slf-table table-responsive pad-top-30">' +
                                     '<table class="table table-striped-row datagrid slf-comparison" id="accordion-section-1">';
                            
                        var pesoVULIterator = pesoRateVULFundList.length;
                        var pesoVULHeaderFlag = true;
                        
                        for (var i=0; i< pesoVULIterator; i++) {
                            var vulPriceInfo = pesoRateVULFundList[i];
                            var fundDate1= vulPriceInfo['fundDate'];
                            fundDate = moment(fundDate1).format(funddateformat); //update properties
                            
                            if(pesoVULHeaderFlag)
                            {
                                TableHtml += '<thead class="bottom-border-fund">' + '<tr>' +
                                    '<th colspan="5"><span class="pull-left pad-left-18">As of '+ fundDate +'</span> <span class="margin-right-136">' +
                                    pesofundheading1 + '</span></th>' + '</tr>' + '<tr>' + 
                                    '<th scope="col" class="col-width-30">' + pesofundheading2 + '</th>' +
                                    '<th scope="col" class="col-width-20">' + unitprice + '</th>'+
                                    '<th scope="col" class="col-width-20">' + ytdAbbr + '*</th>' +
                                    '<th scope="col" class="col-width-20">' + yoyAbbr + '**</th>' +
                                    '</tr> </thead>'+
                                    '<tbody id="q3">' ;

                                    pesoVULHeaderFlag = false;
                            }

                            TableHtml += '<tr> <th scope="row">' + vulPriceInfo['fundDesc'] + ' Fund' + '</th>' + 
                                         '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                          vulPriceInfo['fundCurrency'] + '&nbsp;' + vulPriceInfo['fundVal'] + '</td>' +
                                          '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                           vulPriceInfo['fundYtdVal'] + ' %'+  '</td>' +
                                           '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                           vulPriceInfo['fundYoyVal'] + ' %' +  '</td> </tr>';
                        
                        } //end while pesoVULIterator

                        TableHtml += '</tbody> 	</table> </div>';

                                                                            //Peso Vul Table End

                        TableHtml += '<div class="slf-table table-responsive pad-top-30">' +
                                     '<table class="table table-striped-row datagrid slf-comparison" id="accordion-section-2">';
                            
                        var usdRateVULIterator = usdRateVULFundList.length;
                        var usdRateVULHeaderFlag = true;  
                        
                        for (var i=0; i< usdRateVULIterator; i++) {
                            var vulPriceInfo = usdRateVULFundList[i];
                            var fundDate1= vulPriceInfo['fundDate'];
                            fundDate = moment(fundDate1).format(funddateformat); //update properties
                            
                            if(usdRateVULHeaderFlag)
                            {
                                TableHtml += '<thead class="bottom-border-fund">' + '<tr>' +
                                    '<th colspan="5"><span class="pull-left pad-left-18">As of '+ fundDate +'</span> <span class="margin-right-136">' +
                                    dollarfundheading1 + '</span></th>' + '</tr>' + '<tr>' + 
                                    '<th scope="col" class="col-width-30">' + dollarfundheading2 + '</th>' +
                                    '<th scope="col" class="col-width-20">' + unitprice + '</th>'+
                                    '<th scope="col" class="col-width-20">' + ytdAbbr + '*</th>' +
                                    '<th scope="col" class="col-width-20">' + yoyAbbr + '**</th>' +
                                    '</tr> </thead>'+
                                    '<tbody id="q4">' ;

                                    usdRateVULHeaderFlag = false;
                            }

                            TableHtml += '<tr> <th scope="row">' + vulPriceInfo['fundDesc'] + ' Fund' + '</th>' + 
                                         '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                          vulPriceInfo['fundCurrency'] + '&nbsp;' + vulPriceInfo['fundVal'] + '</td>' +
                                          '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                           vulPriceInfo['fundYtdVal'] + ' %'+  '</td>' +
                                           '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                           vulPriceInfo['fundYoyVal'] + ' %' +  '</td> </tr>';
                        
                        } //end while usdRateVULIterator

                        TableHtml += '</tbody> 	</table> </div>';

                                                                            //Dollar Vul Table End

                        TableHtml += '<div class="slf-table table-responsive pad-top-30">' +
                        '<table class="table table-striped-row datagrid slf-comparison" id="accordion-section-5">';
                            
                        var weeklyVULIterator = weeklyVULFundList.length;
                        var weeklyVULHeaderFlag = true;  
                        
                        for (var i=0; i<  weeklyVULIterator; i++) {
                            var vulPriceInfo = weeklyVULFundList[i];
                            var fundDate1= vulPriceInfo['fundDate'];
                            fundDate = moment(fundDate1).format(funddateformat); //update properties
                                                                   
                            if(weeklyVULHeaderFlag)
                            {
                                TableHtml += '<thead class="bottom-border-fund">' + '<tr>' +
                                    '<th colspan="5"><span class="pull-left pad-left-18">'+ fortheweekof + ' ' + fundDate +'</span> <span class="margin-right-136">' +
                                    dollarfundheading1 + '</span></th>' + '</tr>' + '<tr>' + 
                                    '<th scope="col" class="col-width-30">' + fortheweek + '</th>' +
                                    '<th scope="col" class="col-width-20">' + unitprice + '</th>'+
                                    '<th scope="col" class="col-width-20">' + ytdAbbr + '*</th>' +
                                    '<th scope="col" class="col-width-20">' + yoyAbbr + '**</th>' +
                                    '</tr> </thead>'+
                                    '<tbody id="q4">' ;

                                    weeklyVULHeaderFlag = false;
                            }
                                       
                            TableHtml += '<tr> <th scope="row">' + vulPriceInfo['fundDesc'] + ' Fund' + '</th>' + 
                                        '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                            vulPriceInfo['fundCurrency'] + '&nbsp;' + vulPriceInfo['fundVal'] + '</td>' +
                                            '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                            vulPriceInfo['fundYtdVal'] + ' %'+  '</td>' +
                                            '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                            vulPriceInfo['fundYoyVal'] + ' %' +  '</td> </tr>';
                        
                        } //end while weeklyVULIterator
    
                        TableHtml += '</tbody> 	</table> </div>';
    
                                                                                //Dollar Weekly Vul Table End

                        
                        TableHtml += '<div class="slf-table table-responsive pad-top-30">' +
                        '<table class="table table-striped-row datagrid slf-comparison" id="accordion-section-6">';     
                        
                        var weeklyVULPesoIterator = weeklyVULPesoFundList.length;
                        var weeklyVULPesoHeaderFlag  = true;

                        for (var i=0; i<  weeklyVULPesoIterator; i++) {
                            var vulPriceInfo = weeklyVULPesoFundList[i];
                            var fundDate1= vulPriceInfo['fundDate'];
                            fundDate = moment(fundDate1).format(funddateformat); //update properties
                                                                   
                            if(weeklyVULPesoHeaderFlag )
                            {
                                TableHtml += '<thead class="bottom-border-fund">' + '<tr>' +
                                    '<th colspan="5"><span class="pull-left pad-left-18">'+ fortheweekof + ' '+ fundDate +'</span> <span class="margin-right-136">' +
                                    pesofundheading1 + '</span></th>' + '</tr>' + '<tr>' + 
                                    '<th scope="col" class="col-width-30">' + fortheweek + '</th>' +
                                    '<th scope="col" class="col-width-20">' + unitprice + '</th>'+
                                    '<th scope="col" class="col-width-20">' + ytdAbbr + '*</th>' +
                                    '<th scope="col" class="col-width-20">' + yoyAbbr + '**</th>' +
                                    '</tr> </thead>'+
                                    '<tbody id="q4">' ;

                                    weeklyVULPesoHeaderFlag = false;
                            }
                                       
                            TableHtml += '<tr> <th scope="row">' + vulPriceInfo['fundDesc'] + ' Fund' + '</th>' + 
                                        '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                            vulPriceInfo['fundCurrency'] + '&nbsp;' + vulPriceInfo['fundVal'] + '</td>' +
                                            '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                            vulPriceInfo['fundYtdVal'] + ' %'+  '</td>' +
                                            '<td><div class="visible-xs">' + '<strong> ' + vulPriceInfo['fundDesc'] + ' Fund' + '</strong> </div>'+
                                            vulPriceInfo['fundYoyVal'] + ' %' +  '</td> </tr>';
                        
                        } 



                        //end of tablehtml
                        TableHtml += '</div> </div>';

                        $('.html-component #VulFundsHtml').html(TableHtml);

                        intialiseTable();
                        vulTable();

                    },
                    error: function(){
                        console.log("funds service call failure:");
                    }   
                })

            }
                
        },
        error: function(){
            console.log("properties file not found");
        }   
    })


});

//for seperate the table

function pesoTable () {
    
    $("#accordion-section-2 tr:eq(1)").find("th").eq(1).html("NAVPS<sup>1</sup>");
    $("#PesoFunds th:contains('NAVPS1/NAVPU2*')").html("NAVPS<sup>1</sup>/NAVPU<sup>2</sup>");
    //$("thead.tableFloatingHeaderOriginal > tr > th.col-width-10").html("FFS");
		$("tbody#q1 > tr > td:last-child > div.visible-xs").html("");
		$("tbody#q2 > tr > td:last-child > div.visible-xs").html("");
    var $mainTable = $("#accordion-section-1");
    var splitBy = 9;
    var rows = $mainTable.find ( "tr" ).slice( splitBy );
	var headers=$mainTable.find ( "thead" ).html();
    var $secondTable = $("#accordion-section-1").parent().append("<table id='secondTable' class='table table-striped-row datagrid slf-comparison'><thead ></thead><tbody></tbody></table>");
	$("#secondTable").find("thead").append(headers);
	$secondTable.find("tbody").append(rows);
    $mainTable.find ( "tr" ).slice( splitBy ).remove();
	$("#secondTable th:contains('NAVPS1/NAVPU2')").html("NAVPU<sup>2</sup>");      
	$("#accordion-section-1 th:contains('NAVPS1/NAVPU2')").html("NAVPS<sup>1</sup>");	
    $("#secondTable td:contains('0.0000%')").html("<div class='visible-xs'>N/A***</div><div class='hidden-xs'>N/A</div>");
    $('#secondTable tr:nth-child(4) th').text('World Equity Index Feeder Fund ***');//Desktop
    $("#secondTable td .visible-xs strong:contains('World Equity Index Feeder Fund')").eq(1).text('World Equity Index Feeder Fund***');//Mobile
}

function intialiseTable() {
    var anchorPoint = $('.slf-mobile-header-wrapper');
    if( $("#language-top").is(":visible") && $("#top-pin-bar").length === 1){
    anchorPoint = $("#top-pin-bar");
    }

    //initialize the table
  var table = $(".table-responsive table");
  table.stickyTableHeaders({fixedOffset: anchorPoint, cacheHeaderHeight: true});
  //on init apply the padding fix for tables
  table.parent().each(function(){
    var tab = $(this).closest(".tab-pane");
    if(tab.parent().hasClass("tab-pane")){
      tab = tab.parent();
    }
    var panel = $(this).closest(".panel-collapse, .slf-accordion-plus .collapse");
    var caption = $(this).find("caption");
    if(tab.length > 0){//it is inside a tab
      var tabLink = $("a[href='#" + tab.attr("id") + "']");
      tabLink.on("shown.bs.tab", function(){
        if(caption.length ===0){//there is no caption
          $($(this).attr("href")).find(".table-responsive").css("padding-top", "0");
        }else{
          $($(this).attr("href")).find(".table-responsive").css("padding-top", $($(this).attr("href")).find("caption").outerHeight(true)  + "px");
        }
      });
    }else if(panel.length >0){//it is inside a accordion
      panel.on("shown.bs.collapse", function(){
        if(caption.length ===0){//there is no caption
          $(this).find(".table-responsive").css("padding-top", "0");
        }else{
          $(this).find(".table-responsive").css("padding-top", $(this).find("caption").outerHeight(true)  + "px");
        }
      });
    }else{
      if(caption.length ===0){//there is no caption
        $(this).css("padding-top", "0");
      }else{
        $(this).css("padding-top", $(this).find("caption").outerHeight(true)  + "px");
      }
    }


				});
				$(window).resize(function(){
					var table = $(".table-responsive table");
					//on init apply the padding fix for tables
					table.parent().each(function(){
						var caption = $(this).find("caption");
						if(caption.length ===0){//there is no caption
							$(this).css("padding-top", "0");
						}else{
							$(this).css("padding-top", $(this).find("caption").outerHeight(true)  + "px");
						}
					});
				});


        $(".table-responsive").on("scroll", function(e){
          var lastScroll = $(this).attr("data-last-scroll");
          var current = $(this).scrollLeft();
          if(lastScroll !== undefined){
             lastScroll = Number(lastScroll);
             if(lastScroll !== current){
               $(this).find("table").stickyTableHeaders({fixedOffset: $('.slf-mobile-header-wrapper'), cacheHeaderHeight: true});
             }
          }else{
            $(this).find("table").stickyTableHeaders({fixedOffset: $('.slf-mobile-header-wrapper'), cacheHeaderHeight: true});
          }
          $(this).attr("data-last-scroll", current);

        });
        $(".navbar-toggle").on("click", function(){
          $(".table-responsive table").stickyTableHeaders({fixedOffset: $('.slf-mobile-header-wrapper'), cacheHeaderHeight: true});
          var delta = 25;
          var sum = 0;
          var stop = 250;
          var myInterval = setInterval(function(){
            $(".table-responsive table").stickyTableHeaders({fixedOffset: $('.slf-mobile-header-wrapper'), cacheHeaderHeight: true});
            //console.log("running!");
            if(sum >= stop){
              clearInterval(myInterval);
            }
            sum+=delta;
          }, delta);
        });
}

function vulTable() {
  $("#accordion-section-6 tr:eq(4)").find('th[scope="row"]').html("Sun Peso Maximizer Fund***");
$("#accordion-section-6 tr:eq(5)").find('th[scope="row"]').html("Sun Peso Maximizer Fund-Primo 2 Fund***");
$("#accordion-section-6 tr:eq(4)").find('div[class="visible-xs"]').html("<strong>Sun Peso Maximizer Fund***</strong>");
$("#accordion-section-6 tr:eq(5)").find('div[class="visible-xs"]').html("<strong>Sun Peso Maximizer Fund-Primo 2 Fund***</strong>");
}
