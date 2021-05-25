/*ブラウザウインドウ*/
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}


/*スタイル*/
var Win = navigator.appVersion.indexOf('Win',0) != -1;
var Mac = navigator.appVersion.indexOf('Mac',0) != -1;

if(Mac){ document.writeln('<link rel="stylesheet" type="text/css" href="/used/study/css/study.css" >'); }
if(Win){ document.writeln('<link rel="stylesheet" type="text/css" href="/used/study/css/studywin.css" >'); }

