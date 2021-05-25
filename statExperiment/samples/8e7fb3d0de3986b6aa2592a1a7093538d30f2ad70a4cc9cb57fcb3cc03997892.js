$(function(){
if(!Modernizr.svg){
var imgs=document.getElementsByTagName('img');
for (var i=0; i < imgs.length; i++){
if(/.*\.svg$/.test(imgs[i].src)){
imgs[i].src=imgs[i].src.slice(0, -3) + 'png';
}}
}});
jQuery(document).ready(function($){
function bannerTabs(){
$('.homeLinks a:first').addClass('active');
$('.homeLinks a').click(function(){
var bannerTabValue=$(this).data('home-slide');
console.log(bannerTabValue);
$('.homeLinks a').removeClass('active');
$(this).addClass('active');
$('.homeBanner').hide();
$('#homeBanner_' + bannerTabValue).show().animate({'opacity':'1'});
});
};
/*function homeLinkLoop(index){
x=7;
betweenSlides=3000;
$('.homeLinks a').each(function(index){
var bannerTab=$(this);
setTimeout(function(){
console.log(bannerTab);
$(bannerTab).click();
},index*betweenSlides);
});
setTimeout(homeLinkLoop,x*betweenSlides);
}
homeLinkLoop();*/
$('.homebannerWrap').cycle({
slides:'> .homeBanner',
pager:'#bannerLinks',
pagerTemplate:'',
pagerActiveClass:'active',
fx:'none',
speed:1,
timeout:6000
});
$('#bannerLinks > a').click(function(){
$('.homebannerWrap').cycle('pause');
});
});