/* Created by theos1128 on 2017. 07. 17 */
/* Copyright (c) 2017년 OKmall.com <http://www.okmall.com> */

/**
* @file favoriteProd.js
* @brief 관심상품 레이어 \n
* 찜한 상품 및 최근 본 상품 레이어 \n
* @author OKmall.com, theos1128
* @see 
*/
$(window).load(function ()
{
	// 각 버튼에 이벤트 추가

	//  관심상품 버튼
	$(".btn_favorite").on('click touchstart', function(e) {
		e.preventDefault();
		favoriteLayerToggle();
	});

	// 찜한 상품 탭
	$(".favList_ZzimTab").on('click touchstart', function(e) {
		e.preventDefault();
		favListTabToggle('zzim');
	});

	// 최근 본 상품 탭
	$(".favList_RecentTab").on('click touchstart', function(e) {
		e.preventDefault();
		favListTabToggle('recent');
	});

	// 닫기
	$("#favListClose").on('click touchstart', function(e) {
		e.preventDefault();
		favoriteLayerToggle();
	});

});

var favListScroll;
var favListScroll2;

function onRemoveScroll(e) {
	e.preventDefault();
}

// 관심상품 레이어 띄우기
function favoriteLayerToggle()
{
	if($("#favListLayer").css("display") == "none")
	{
		// 찜한 상품 탭을 기본값으로 선택
		favListTabToggle("zzim");
		$("#favListLayer").css("display", "");
	}
	else
	{
		document.removeEventListener("touchmove", onRemoveScroll, false);
		$("body").removeClass("over_hid");
		$("#favListLayer").css("display","none");
	}
}

// 관심상품 탭 전환
function favListTabToggle(tab)
{
	// 상품목록 초기화
	$("#favList_ProdList").html("");
	$("#favList_ProdList2").html("");
	$("#favList_Zzim").removeClass();
	$("#favList_Recent").removeClass();

	$("#favList_Zzim_Login").css("display", "none");
	$("#favList_Zzim_None").css("display", "none");
	$("#favList_Recent_None").css("display", "none");
	//$("#favList_DelBtn").css("display", "none");

	$("#favList_DelAll").css("display", "none");
	$("#favList_DelSel").css("display", "none");
	$("#favList_DelCancel").css("display", "none");
	$("#favList_Delete").css("display", "none");


	if(tab == "zzim")
	{
		if ($("#favList_Zzim").attr("class") != "on")
		{
			$("#favList_Zzim").addClass("on");
			$("#favList_goZzim").css("display", "none");
			$("#favList_goRecent").css("display", "");
			//favListDelToggle('cancel');

			// 찜한 상품은 로그인 했을 경우에만 노출
			if (JS_IsLogin)
			{
				$("#favList_ProdList").css("display", "");
				getFavZzimProdList();
			}
			else
			{
				$("#favList_ProdList").css("display", "none");
				$("#favList_Zzim_Login").css("display", "");
			}
		}
	}
	else
	{
		if ($("#favList_Recent").attr("class") != "on")
		{
			$("#favList_Recent").addClass("on");
			$("#favList_goZzim").css("display", "");
			$("#favList_goRecent").css("display", "none");
			//favListDelToggle('cancel');
			getFavRecentProdList();
		}
	}
}

// 관심상품 삭제 토글
function favListDelToggle(btn)
{
	// 취소 버튼 선택
	if (btn == "cancel")
	{
		if ($("#favList_Zzim").attr("class") == "on") {
			$("#favList_ProdList").removeClass("edit_mode");
		} else {
			$("#favList_ProdList2").removeClass("edit_mode");
		}

		$("#favList_DelAll").css("display", "");
		$("#favList_DelSel").css("display", "");
		$("#favList_DelCancel").css("display", "none");
		$("#favList_Delete").css("display", "none");
	}
	// 전체삭제, 선택 삭제 버튼 선택
	else
	{
		if ($("#favList_Zzim").attr("class") == "on") {
			$("#favList_ProdList").addClass("edit_mode");
		} else {
			$("#favList_ProdList2").addClass("edit_mode");
		}
		$("#favList_DelAll").css("display", "none");
		$("#favList_DelSel").css("display", "none");
		$("#favList_DelCancel").css("display", "inline-block");
		$("#favList_Delete").css("display", "inline-block");

		if (btn == "all")
		{
			if ($("#favList_Zzim").attr("class") == "on") {
				$("#favList_ProdList input[name=favList_Check]").each(function()
				{
					$(this).attr("checked", true);
				});
			} else {
				$("#favList_ProdList2 input[name=favList_Check]").each(function()
				{
					$(this).attr("checked", true);
				});
			}
		}
		else
		{
			if ($("#favList_Zzim").attr("class") == "on") {
				$("#favList_ProdList input[name=favList_Check]").each(function()
				{
					$(this).attr("checked", false);
				});
			} else {
				$("#favList_ProdList2 input[name=favList_Check]").each(function()
				{
					$(this).attr("checked", false);
				});
			}
		}
	}
}

// 관심상품 삭제
function favListDelete(target) {
	var checkedProd = new Array();

	if ($("#favList_Zzim").attr("class") == "on") {
		$("#favList_ProdList input[name=favList_Check]").each(function()
		{
			if ($(this).attr("checked"))
			{
				checkedProd.push($(this).val());
			}
		});
	} else {
		$("#favList_ProdList2 input[name=favList_Check]").each(function()
		{
			if ($(this).attr("checked"))
			{
				checkedProd.push($(this).val());
			}
		});
	}

	var deleteURL = "";
	if ($("#favList_Zzim").attr("class") == "on")
	{
		deleteURL = "http://m.okmall.com/member/mypage.html?ProgMode=callAjax&Mode=mWishAllDel";
	}
	else
	{
		deleteURL = "http://m.okmall.com/product/recent.html?ProgMode=callAjax&Mode=mRecentAllDel";
	}

	$.ajax({
		url: deleteURL,
		method: "POST",
		dataType: "JSON",
		data: {uids : checkedProd},
		success : function(rtn) {
			if ($("#favList_Zzim").attr("class") == "on")
			{
				favListTabToggle("zzim");
			}
			else
			{
				favListTabToggle("recent");
			}
		},
		error : function() {
		}
	});
}

// 최근 본 상품 목록 가져오기
function getFavRecentProdList() {
	$.ajax({
		url: "/product/recent.html?returnType=JSON2",
		dataType: "JSON",
		success : function(rtn) {
			if (rtn.length == 0)
			{
				$("#favList_ProdList2").css("display", "none");
				$("#favList_Recent_None").css("display", "");
				$("#favList_DelAll").css("display", "none");
				$("#favList_DelSel").css("display", "none");
				$("#favList_DelCancel").css("display", "none");
				$("#favList_Delete").css("display", "none");
			}
			else
			{
				$("#favList_ProdList2").css("display", "");
				//$("#favList_DelBtn").css("display", "");
				$("#favList_DelAll").css("display", "");
				$("#favList_DelSel").css("display", "");
				$("#favList_DelCancel").css("display", "");
				$("#favList_Delete").css("display", "");
				favListDelToggle('cancel');
				layoutProdList(rtn, "recent");
			}
		},
		error : function() {
			$("#favList_Recent_None").css("display", "");
		}
	});
}

// 찜한 상품 목록 가져오기
function getFavZzimProdList() {
	$.ajax({
		url: "/member/wish.html?returnType=JSON2",
		dataType: "JSON",
		success : function(rtn) {
			if (rtn.length == 0)
			{
				$("#favList_ProdList").css("display", "none");
				$("#favList_Zzim_None").css("display", "");
				$("#favList_DelAll").css("display", "none");
				$("#favList_DelSel").css("display", "none");
				$("#favList_DelCancel").css("display", "none");
				$("#favList_Delete").css("display", "none");
			}
			else
			{
				$("#favList_ProdList").css("display", "");
				//$("#favList_DelBtn").css("display", "");
				$("#favList_DelAll").css("display", "");
				$("#favList_DelSel").css("display", "");
				$("#favList_DelCancel").css("display", "");
				$("#favList_Delete").css("display", "");
				favListDelToggle('cancel');
				layoutProdList(rtn, "zzim");
			}
		},
		error : function() {
			$("#favList_Zzim_None").css("display", "");
		}
	});
}

// 관심상품 그리기
function layoutProdList(data, target) {
	// 최대 노출 상품 개수 50개
	var maxDispCount = 50;
	// 상품이 50개를 초과하였을 경우 더보기 버튼 추가

	for(var i=0; i<data.length; i++)
	{
		if (i == maxDispCount)
		{
			break;
		}
		var item = $(".dummyProd").clone(true);
		var link = item.find("a");
		var img = item.find("a").find("img");
		var check = item.find("input");

		link.attr("href", "/product/view.html?no=" + data[i].No);
		img.attr("src", data[i].Thumb.IMAGE);
		if (target == "zzim")
		{
			check.val(data[i].Uid);
		}
		else
		{
			check.val(data[i].No);
		}

		if (target == "zzim")
		{
			$("#favList_ProdList").append(item);
		}
		else
		{
			$("#favList_ProdList2").append(item);
		}
		item.removeClass("dummyProd").css("display", "");
	}

	if (data.length > maxDispCount)
	{
		var item = $(".dummyProdMore").clone(true);
		var link = item.find("a");
		if (target == "zzim")
		{
			link.attr("href", "/member/wish.html");
		}
		else
		{
			link.attr("href", "/product/recent.html");
		}

		if (target == "zzim")
		{
			$("#favList_ProdList").append(item);
		}
		else
		{
			$("#favList_ProdList2").append(item);
		}
		item.removeClass("dummyProdMore").addClass("btn_more").css("display", "");
	}

	$("body").addClass("over_hid");
	document.addEventListener("touchmove", onRemoveScroll, false);

	if (target == "zzim")
	{
		$("#favList_Content").css("display", "");
		$("#favList_Content2").css("display", "none");

		if (favListScroll)
		{
			favListScroll.destroy();
		}
		favListScroll = new IScroll("#favList_Content", {
			click : true
		});
	}
	else
	{
		$("#favList_Content").css("display", "none");
		$("#favList_Content2").css("display", "");

		if (favListScroll2)
		{
			favListScroll2.destroy();
		}
		favListScroll2 = new IScroll("#favList_Content2", {
			click : true
		});
	}

}