$(document).ready(() => {
    var url = window.location.hostname !== 'www.assetzexchange.co.uk' ?
    "https://apibeta.assetzexchange.co.uk/properties/featuredinvestments" :
    "https://api.assetzexchange.co.uk/properties/featuredinvestments";
    $.get(url, (data) => {
        fillContainer(data);
    });
    function fillContainer(dataArray) {
        var $container = $('.fi-container'),
            $template = $('.fi-template');
        $.each(dataArray, (index, object) => {
            $container.append(renderArticle(object, $template));
        });
    }
    function renderArticle(object, $template){
        var $article = $template.clone().removeClass('d-none');
        $article.find('.fi-image').css('background-image', 'url("'+object.imageUrl+'")');
        if(object.type) {
            $article.find('.fi-type').text(object.type);
        }
        else {
            $article.find('.fi-type').remove();
        }
        $article.find('.fi-name').text(object.name);
        $article.find('.fi-price').text(object.price);
        $article.find('.fi-netyield').text(object.netYieldPct);
        $article.find('.fi-location').text(object.location);
        return $article;
    }
});
