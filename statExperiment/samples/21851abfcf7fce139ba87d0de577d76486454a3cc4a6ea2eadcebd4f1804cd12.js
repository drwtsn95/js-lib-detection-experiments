$(document).ready(function(){
        
    /*$data = {
        category : $("#category"),
        cart : $(".mini-cart"),
        aside: $('aside.right'),
        
    };*/
    
    var category = new Category($("#category")),
        aside = new Aside($("aside.right"));
        
       // product = new Product($(".products-list"));
        //art = new Cart($(".mini-cart"));
    
    category.init();
    aside.categoryInit();
   // console.log(category);
    
    //Application.onhashchange($data);
    
    search = new AdvSearch();
    search.init();
});