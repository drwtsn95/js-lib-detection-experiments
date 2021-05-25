function getLogo1() {
var thisImg;
var alt;
var thisDate= new Date();
var thisYear= thisDate.getFullYear();
var thisMonth = thisDate.getMonth();
var thisDay = thisDate.getDate();
var weekDay = thisDate.getDay();
var inWhichWeek;
inWhichWeek = Math.floor((thisDay -1) / 7 ) + 1;	// this day is in which week (1 or 2 or 3 or 4 ...)	
thisImg = "/images/logo-5.gif";	// default display	//default
// 春节
if ((thisYear ==2022 && thisMonth == 1 && thisDay ==1 ) ||
    (thisYear ==2023 && thisMonth == 1 && thisDay ==21) || 
    (thisYear ==2024 && thisMonth == 1 && thisDay ==10) || 
    (thisYear ==2021 && thisMonth == 1 && thisDay ==12)) 
{
thisImg = "/images/logoSpringFestival-5.gif";
}
// 元宵
if ((thisYear ==2022 && thisMonth == 1 && thisDay ==15 ) ||
    (thisYear ==2023 && thisMonth == 1 && thisDay ==5) || 
    (thisYear ==2024 && thisMonth == 1 && thisDay ==24) || 
    (thisYear ==2021 && thisMonth == 1 && thisDay ==26)) 
{
thisImg = "/images/logoYuanxiao-5.gif";
}
// 清明
if ((thisYear ==2022 && thisMonth == 3 && thisDay ==5 ) ||
    (thisYear ==2023 && thisMonth == 3 && thisDay ==5) || 
    (thisYear ==2024 && thisMonth == 3 && thisDay ==4) || 
    (thisYear ==2021 && thisMonth == 3 && thisDay ==4)) 
{
thisImg = "/images/logoQingming-5.gif";
}
// 端午
if ((thisYear ==2022 && thisMonth == 5 && thisDay ==3 ) ||
    (thisYear ==2023 && thisMonth == 5 && thisDay ==22) || 
    (thisYear ==2024 && thisMonth == 5 && thisDay ==10) || 
    (thisYear ==2021 && thisMonth == 5 && thisDay ==14)) 
{
thisImg = "/images/logoDuanwu-5.gif";
}
// 七夕
if ((thisYear ==2022 && thisMonth == 7 && thisDay ==4 ) ||
    (thisYear ==2023 && thisMonth == 7 && thisDay ==22) || 
    (thisYear ==2024 && thisMonth == 7 && thisDay ==10) || 
    (thisYear ==2021 && thisMonth == 7 && thisDay ==14)) 
{
thisImg = "/images/logoQixi-5.gif";
}
// 中秋
if ((thisYear ==2022 && thisMonth == 8 && thisDay ==10 ) ||
    (thisYear ==2023 && thisMonth == 8 && thisDay ==29) || 
    (thisYear ==2024 && thisMonth == 8 && thisDay ==17) || 
    (thisYear ==2020 && thisMonth == 9 && thisDay ==1) || 
    (thisYear ==2021 && thisMonth == 8 && thisDay ==21)) 
{
thisImg = "/images/logoMoonFestival-5.gif";
}
// 重阳
if ((thisYear ==2022 && thisMonth == 9 && thisDay ==17 ) ||
    (thisYear ==2023 && thisMonth == 9 && thisDay ==7) || 
    (thisYear ==2024 && thisMonth == 9 && thisDay ==25) || 
    (thisYear ==2020 && thisMonth == 9 && thisDay ==25) || 
    (thisYear ==2021 && thisMonth == 9 && thisDay ==14)) 
{
thisImg = "/images/logoChongyang-5.gif";
}
// international holidays
if ((thisMonth == 0 && thisDay ==1 ) || (thisMonth == 11 && thisDay == 31 ))	// new year 1/1
{
thisImg = "/images/logoNewYear-5.gif";	
}
if (thisMonth == 1 && thisDay ==14 )	// Valentine
{
thisImg = "/images/logoValentine-5.gif";	
}
if (thisMonth == 4 && weekDay == 0 && inWhichWeek == 2)	// Mother's day, 2nd Sunday in May
{
thisImg = "/images/logoMother-5.gif";	
}
if (thisMonth == 5 && weekDay == 0 && inWhichWeek == 3)	// Father's day, 3rd Sunday in June
{
thisImg = "/images/logoFather-5.gif";	
}
if (thisMonth == 9 && thisDay == 31 )	// Holloween day 10/31
{
thisImg = "/images/logoHolloween-5.gif";	
}
if (thisMonth == 10 && weekDay == 4 && inWhichWeek == 4)	// thanksgiving 4th Thursday
{
thisImg = "/images/logoThanksgiving-5.gif";	
}
if (thisMonth == 11 && (thisDay == 24 || thisDay ==25) )	// christmas 12/25
{
thisImg = "/images/logoChristmas-5.gif";	
}
var theImage=document.getElementById("logo");
theImage.src=thisImg;
}

