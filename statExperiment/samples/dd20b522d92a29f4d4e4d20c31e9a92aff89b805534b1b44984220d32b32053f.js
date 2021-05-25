/* ==================================================
#Image functions
#Recently viewed
#Load more / infinite load
#Filter products with AJAX
#Search autocomplete
#Sidebar filter on collection pages
#Misc
#Quick shop
#Newsletter popup
#Currency converter
#Product Media Controls
#Plyr setup

/*============================================================================
  Image functions
==============================================================================*/

var usePageDots = Shopify.theme_settings.page_dots_enabled;

var imageFunctions = {
  zoom: function(){
    var $image = $(event.target);
    var zoomSrc = $image.data('zoom-src');

    if (zoomSrc) {
      $image.wrap('<span class="zoom-container"></span>').css('display', 'block').parent().zoom({
        url: zoomSrc,
        touch: false,
        magnify: 1
      });
    }
  },
  linkGalleryAndCarousel: function($gallery, $carousel){

    $carousel.find('.gallery-cell:nth-child(1)').addClass('is-nav-selected');

    //EVENT - click on carousel item to slide gallery
    $carousel.on( 'click', '.gallery-cell', function() {
        var index = $(this).index();
        $carousel.find('.is-nav-selected').removeClass('is-nav-selected');
        $(this).addClass('is-nav-selected');
        $gallery.flickity( 'select', index );
    });

    //EVENT - update carousel based on gallery index
    $gallery.on( 'select.flickity', function() {
      var galleryData = $(this).data('flickity');
      if (galleryData){
        $carousel.find('.is-nav-selected').removeClass('is-nav-selected');
        $carousel.find('.gallery-cell:nth-child(' + (galleryData.selectedIndex + 1) + ')').addClass('is-nav-selected');
      }
    });
  },
  fullWidth: function(images, imageContainer){
    $(images).each(function(){
      var $image = $(this),
          alt = $image.attr('alt'),
          src = $image.attr('src');

      if (alt.indexOf("[") >= 0){

        //remove from description
        $image.remove();

        //find shortcode values and remove from alt
        var shortcodes = alt.match(/\[(.*?)\]/ig);
        alt = alt.replace(/\[(.*?)\]/ig, '');

        //remove brackets from shortcode to be used as classes
        var captionClass = $.map( shortcodes, function( value, index ) {
            value = value.replace(/[\[\]']+/g,'');
            return value;
        });

        //markup for caption

        var caption = [
            '<div class="position-' + (captionClass.length ? captionClass : 'center') + ' caption js-caption">',
              '<div class="caption-content caption-background-false align-' + (captionClass.length ? captionClass : 'center') + '">',
                '<p class="headline">' + alt + '</p>',
              '</div>',
            '</div>'
        ].join('');

        //image attributes added
        $image.attr({
          alt: alt,
          class: 'lazyload blur-up',
          src: src,
          dataSizes: 'auto'
        });

        var image = $image.prop('outerHTML')
        var banner =  '<div class="banner">' + image + caption + '</div>'

        $(imageContainer).append(banner);
      }
    })
  },
  showSecondaryImage: function(){
    if (Shopify.media_queries.large.matches) {
      $('.has-secondary-media-swap').off().on('mouseenter', function() {
        $(this).find('.image-element__wrap img').toggleClass('secondary-media-hidden');
        $(this).find('[data-html5-video]').toggleClass('secondary-media-hidden');
        $(this).find('.external-video__container').toggleClass('secondary-media-hidden');
        videoFeature.enableVideoOnHover($(this));
      });

      $('.has-secondary-media-swap').on('mouseleave', function() {
        $(this).find('.image-element__wrap img').toggleClass('secondary-media-hidden');
        $(this).find('[data-html5-video]').toggleClass('secondary-media-hidden');
        $(this).find('.external-video__container').toggleClass('secondary-media-hidden');
        videoFeature.enableVideoOnHover($(this));
      });
    }
  },
  //Fix for flickity issue on IOS, where you can't swipe through the slider
  flickityIosFix: function()  {
    var touchingCarousel = false,
      touchStartCoords;

    document.body.addEventListener('touchstart', function(e) {
      if (e.target.closest('.flickity-slider')) {
        touchingCarousel = true;
      } else {
        touchingCarousel = false;
        return;
      }

      touchStartCoords = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    });

    document.body.addEventListener('touchmove', function(e) {
      if (!(touchingCarousel && e.cancelable)) {
        return;
      }

      var moveVector = {
        x: e.touches[0].pageX - touchStartCoords.x,
        y: e.touches[0].pageY - touchStartCoords.y
      };

      if (Math.abs(moveVector.x) > 7)
        e.preventDefault()

    }, {passive: false});
  }
}

/*============================================================================
  Recently viewed
==============================================================================*/

var recentlyViewed = {
  init: function(){

    var productHandle,
        rvCookie,
        rvProducts,
        displayProducts,
        rvProductArray;

    if ($('.js-product_section[data-rv-handle]').length){
      productHandle = $('.js-product_section').data('rv-handle').toString();
      rvCookie = Cookies.get('recentlyViewed');
      rvProducts = recentlyViewed.getCookieProducts(rvCookie, productHandle);
    } else if ($('.recently-viewed__section').length){
      rvCookie = Cookies.get('recentlyViewed');
      rvProducts = recentlyViewed.getCookieProducts(rvCookie, productHandle);
    } else if ($('.js-sidebar-recently-viewed').length){
      rvCookie = Cookies.get('recentlyViewed');
      rvProducts = recentlyViewed.getCookieProducts(rvCookie, productHandle);
    }

    if (rvProducts){
      rvProductArray = unescape(rvProducts).split(',');
    }

    if (productHandle){

      if(!$.inArray(productHandle, rvProductArray) !== -1){
        displayProducts = [];
        rvProductArray.unshift(productHandle);
        $.each(rvProductArray, function(i, el){
            if($.inArray(el, displayProducts) === -1) displayProducts.push(el);
        });
      }

      recentlyViewed.setCookieProducts(displayProducts);
    } else {
      displayProducts = rvProductArray;
    }

    if ($('.recently-viewed__section').length){
      var parent = '.recently-viewed__section';
      var recentlyViewedProductsLoaded = $(parent).data('recently-viewed-items-loaded');

      if (recentlyViewedProductsLoaded) {
        return false;
      }

      recentlyViewed.getProductInformation(parent, displayProducts, productHandle);
    } else if ($('.js-recently-viewed .rv-main').length){
      var parent = '.js-recently-viewed';
      var recentlyViewedProductsLoaded = $(parent).data('recently-viewed-items-loaded');

      if (recentlyViewedProductsLoaded) {
        return false;
      }

      recentlyViewed.getProductInformation(parent, displayProducts, productHandle);
    }

    if ($('.sidebar .js-sidebar-recently-viewed').length){
      var parent = '.sidebar .js-sidebar-recently-viewed';
      var recentlyViewedProductsLoaded = $(parent).data('recently-viewed-items-loaded');
      if (recentlyViewedProductsLoaded) {
        return false;
      }

      if (productHandle){
        recentlyViewed.getProductInformation(parent, displayProducts, productHandle);
      } else {
        recentlyViewed.getProductInformation(parent, displayProducts);
      }
    }

  },
  getCookieProducts: function(rvCookie, productHandle){

    if (!rvCookie && productHandle) {
      Cookies.set('recentlyViewed', productHandle, { expires: 30, path: '/' });
      rvCookie = Cookies.get('recentlyViewed');
    } else {
      rvCookie = Cookies.get('recentlyViewed');
    }

    return rvCookie;

  },
  setCookieProducts: function(rvProductArray){
    Cookies.set('recentlyViewed', escape(rvProductArray.join(',')), { expires: 30, path: '/' });
  },
  getProductInformation: function(parent, displayProducts, productHandle){

    // Add data-attribute 'recently-viewed-items-loaded="true" to parent container
    $(parent).attr('data-recently-viewed-items-loaded', 'true');

    if (productHandle){
      displayProducts.splice( $.inArray(productHandle, displayProducts), 1 );
    }

    var productLimit = $(parent).data('visible-products');

    if (productLimit && displayProducts){
      displayProducts = displayProducts.slice(0, productLimit);
    }

    $.each(displayProducts, function (index, value) {

      if (value){
        $(parent).removeClass('hidden');

        $(parent).parents('.sidebar-block').show();

        $.ajax({
          type: 'GET',
          url: '/products/' + value  + '?view=rv',
          success: function(data) {

            var rvProduct = $(data).find('.js-recently-viewed-product');

            $(parent).find(' .rv-box-' + index ).append(rvProduct);

            if (Currency.show_multiple_currencies) {
              currencyConverter.convertCurrencies();
            }

            // Initialize show secondary media on hover feature
            if (Shopify.theme_settings.collection_secondary_image) {
              imageFunctions.showSecondaryImage();
            }

            var $video = rvProduct.find('[data-html5-video] video, [data-youtube-video]');
            if ($video.length > 0) {
              videoFeature.setupPlayerForRecentlyViewedProducts(rvProduct.find('[data-html5-video] video, [data-youtube-video]'))
            }

           },
           error: function(x, t, m) {
            console.log(x);
            console.log(t);
            console.log(m);
           },
           dataType: "html"
        });
      }

      if ($(parent).find('.rv-main').hasClass('js-rv-slider')){
        if (displayProducts.length <= productLimit) {
          $('.js-rv-slider .gallery-cell').eq(displayProducts.length).nextAll().addBack().remove();
        } else {
          $('.js-rv-slider .gallery-cell').eq(productLimit).nextAll().addBack().remove();
        }
        recentlyViewed.createSlider(parent, productLimit);
      } else if ($(parent).find('.rv-main').hasClass('js-rv-grid')){
        if (displayProducts.length <= productLimit) {
          $('.js-rv-grid .thumbnail').eq(displayProducts.length).nextAll().addBack().remove();
        } else {
          $('.js-rv-grid .thumbnail').eq(productLimit).nextAll().addBack().remove();
        }
      }
    });
  },

  createSlider: function(el, productsAvailable){

    var products_per_slide = $('.js-rv-slider').data('products-per-slide');
    var products_generated = $('.js-rv-slider').find('.gallery-cell').length;
    var products_available = $('.js-rv-slider').data('products-available');
    var cellAlign = 'left'
    var wrapAround = true;
    var prevNextButtons = true;
    var initialIndex;

    if(products_per_slide >= products_generated) {
      cellAlign = 'center';
      wrapAround = false;
      prevNextButtons = false;
    }

    if (products_per_slide == "2" && products_available > products_per_slide || products_per_slide == "4" && products_available > products_per_slide || products_per_slide == "6" && products_available > products_per_slide){
      initialIndex = 0;
    } else if (products_per_slide == "3" && products_available) {
      initialIndex = 1;
    } else if (products_per_slide == "5" && products_available) {
      initialIndex = 2;
    } else if (products_per_slide == "7" && products_available) {
      initialIndex = 3;
    }

    $('.js-rv-slider').flickity({
      "lazyLoad": 2,
      "imagesLoaded": true,
      "prevNextButtons": prevNextButtons,
      "wrapAround": wrapAround,
      "cellAlign": cellAlign,
      "pageDots": usePageDots,
      "contain": true,
      "freeScroll": true,
      "arrowShape": arrowSize,
      "initialIndex": initialIndex
    });

    $('.js-rv-slider').addClass('slider-initialized');
  }
}

/* ===============================================
  #Load more / infinite load
================================================== */

//Collection template

var enableLoadMoreProducts = function(){
  $('body').on('click', '.js-load-more a', function(e){
    enableInfiniteScroll();
    e.stopPropagation();
    return false;
  });
}

var enableInfiniteScroll = function(){
  if ($('.collection-matrix').length) {
    var infiniteScroll = new Waypoint.Infinite({
      element: $('.collection-matrix')[0],
      items: '.collection-matrix',
      more: '.load-more__btn',
      loadingClass: 'loading-in-progress',
      onBeforePageLoad: function(){
        $('.js-load-more').hide();
      },
      onAfterPageLoad: function(data){
        $('.collection-matrix > .collection-matrix .thumbnail').unwrap('.collection-matrix');
        if (Shopify.theme_settings.enable_shopify_review_comments && Shopify.theme_settings.enable_shopify_collection_badges){
          SPR.$(document).ready(function() {
            return SPR.registerCallbacks(),
            SPR.initRatingHandler(),
            SPR.initDomEls(),
            SPR.loadProducts(),
            SPR.loadBadges()
          })
        }
        if (Currency.show_multiple_currencies) {
          currencyConverter.convertCurrencies();
        }
        // Initialize shopify payment buttons
        if (Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }
        productPage.init();
        if (Shopify.theme_settings.quick_shop_enabled){
          quickShop.init();
        }
        hideNoScript();

        videoFeature.init();

        // Initialize show secondary media on hover feature
        if (Shopify.theme_settings.collection_secondary_image){
          imageFunctions.showSecondaryImage();
        }

        // Refresh waypoints
        Waypoint.refreshAll()
      }
    })
  }
}

//Search template

var enableLoadMoreSearch = function(){
  $('body').on('click', '.js-load-more a', function(e){
    enableInfiniteSearchScroll();
    e.stopPropagation();
    return false;
  });
}

var enableInfiniteSearchScroll = function(){
  if ($('.search-matrix').length) {
    var infiniteSearchScroll = new Waypoint.Infinite({
      element: $('.search-matrix')[0],
      items: '.search-matrix',
      more: '.load-more__btn',
      loadingClass: 'loading-in-progress',
      onBeforePageLoad: function(){
        $('.js-load-more').hide();
      },
      onAfterPageLoad: function(data){
        $('.search-matrix > .search-matrix .thumbnail').unwrap('.search-matrix');
        if (Shopify.theme_settings.enable_shopify_review_comments && Shopify.theme_settings.enable_shopify_collection_badges){
          SPR.$(document).ready(function() {
            return SPR.registerCallbacks(),
            SPR.initRatingHandler(),
            SPR.initDomEls(),
            SPR.loadProducts(),
            SPR.loadBadges()
          })
        }
        if (Currency.show_multiple_currencies) {
          currencyConverter.convertCurrencies();
        }
        // Initialize shopify payment buttons
        if (Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }
        productPage.init();
        if (Shopify.theme_settings.quick_shop_enabled) {
          quickShop.init();
        }
        hideNoScript();

        videoFeature.init();

        // Initialize show secondary media on hover feature
        if (Shopify.theme_settings.collection_secondary_image){
          imageFunctions.showSecondaryImage();
        }
      }
    })
  }
}

var hideNoScript = function(){
  // Used to ensure noscript elements are hidden when JS is present.
  $('.image__container .noscript').addClass('hidden');
}

/*============================================================================
  Filter Products with AJAX
==============================================================================*/

Shopify.queryParams = {};
if (location.search.length) {
 for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
    aKeyValue = aCouples[i].split('=');
    if (aKeyValue.length > 1) {
     Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
    }
  }
}

var quickFilter = {
  init: function(){
    var selectedOptions = [],
        query = '',
        currentTags = '',
        url1 = $.url('1') ? '/' + $.url('1') + '/' : ''

        // Check the length of url1 to see if there is a translation added to the end of the host URL, if there is, use a different path
        if ( url1.length <= 4) {
          url2 = $.url('2') ? $.url('2') + '/' : '',
          url3 = $.url('3') ? $.url('3') + '/' : '',
          path = url1 + url2 + url3;
        } else {
          url2 = $.url('2') ? $.url('2') + '/' : '',
          path = url1 + url2;
        }

    //Handle dropdowns if they exist
    if ($('#sort-by').length){
      query = $('#sort-by').val();
    } else {
      query = url('?sort_by');
    }

    if ($('#tag_filter').length){
      var $tagFilterValue = $('#tag_filter').val();

      if ($('#tag_filter').data('default-collection') != $tagFilterValue){
        urlTag = $tagFilterValue.substr($tagFilterValue.lastIndexOf('/') + 1);
        var tagFilterUrl = $tagFilterValue.substr($tagFilterValue)

        // apply the selected attribute to the proper option value in tag filter dropdown
        $('#tag_filter option').removeAttr('selected');
        $('#tag_filter option[value="' + tagFilterUrl + '"]').attr('selected', 'selected')

        if (urlTag != 'all'){
          if ($.inArray( urlTag, selectedOptions ) > -1){
            //Do nothing
          } else {
            selectedOptions.unshift(urlTag);
          }
        }
      }
    }

    //Add all checkbox values to array
    $('[data-option-filter] input:checked').each(function (){
      selectedOptions.push($(this).val());
    });
    selectedOptions = $.makeArray(selectedOptions);

    //Loop through tags to create string to update page url
    $.each(selectedOptions, function(i, value){

      if (i != selectedOptions.length - 1) {
        currentTags += selectedOptions[i] + '+';
      } else {
        currentTags += selectedOptions[i];
      }

    });

    Shopify.queryParams.sort_by = query;
    query = '?' + $.param(Shopify.queryParams);

    quickFilter.processUrl(path, currentTags, query);
  },
  updateView: function(filterURL) {

    $.ajax({
      type: 'GET',
      url: filterURL,
      beforeSend: function() {
        $(".collection-matrix").addClass('fadeOut animated loading-in-progress filter-loading');
        Waypoint.destroyAll();
      },
      success: function(data) {
          $(".collection-matrix").removeClass('loading-in-progress');
          $(".collection-matrix").removeClass('filter-loading');
          var filteredBreadcrumb = $(data).find('.breadcrumb_text').html();
          $('.breadcrumb_text').html(filteredBreadcrumb);

          var filteredPagination = $(data).find('.paginate').html();
          $('.paginate').html(filteredPagination);

          var filteredSidebar = $(data).find('.sidebar').html();
          $('.sidebar').html(filteredSidebar);

          var filteredPageLinks = $(data).find('.paginate').html();
          $('.paginate').empty();
          $('.paginate').html(filteredPageLinks);

          var filteredData = $(data).find('.collection-matrix');
          $('.collection-matrix').remove();
          filteredData.insertBefore( $('.load-more__icon') );

          window.history && window.history.pushState && window.history.pushState("", "", filterURL);

          if ($('.sidebar__collection-filter').length){
            collectionSidebarFilter.init();
          }

          if (Shopify.theme_settings.pagination_type == 'infinite_scroll'){
            enableInfiniteScroll();
          }

          if (Currency.show_multiple_currencies) {
            currencyConverter.convertCurrencies();
          }

          if (Shopify.theme_settings.enable_shopify_review_comments && Shopify.theme_settings.enable_shopify_collection_badges) {
            SPR.$(document).ready(function() {
              return SPR.registerCallbacks(),
              SPR.initRatingHandler(),
              SPR.initDomEls(),
              SPR.loadProducts(),
              SPR.loadBadges()
            })
          }

        //Will reload recently viewed if present
        recentlyViewed.init();

        // Re-link swatches on inline quick-shop
        $('.js-product_section .product_form_options').each(function () {
          new Shopify.OptionSelectors($(this).data("select-id"), { product: $(this).data("product"), onVariantSelected: selectCallback, enableHistoryState: $(this).data("enable-state") });
        });

        // Prevent event bubbling
        $('body').off('click', '.swatch-element');

        // Reload product swatches
        productPage.productSwatches();

        //Swatch toggler
        $('.swatch_options input').each(function(){
          if($(this).is(':checked')) {
            quickShop.toggleSwatchImages($(this));
          }
        });

        $('.swatch_options label').on('click', function(){
          quickShop.toggleSwatchImages($(this));
        });

        // Initialize shopify payment buttons
        if (Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }
      },
      error: function(x, t, m) {
        console.log(x);
        console.log(t);
        console.log(m);
        location.replace(location.protocol + '//' + location.host + filterURL);

      },
      dataType: "html"
    });
  },
  processUrl: function(path, tags, query){

    var query = query.replace(/\page=(\w+)&/, ''),
        urlString = '';

    urlString = path + tags + query;

    quickFilter.updateView(urlString);

  }
}

/*============================================================================
  Search autocomplete
==============================================================================*/

var searchAutocomplete = {
  init: function(){

    var currentAjaxRequest = null;
    var url1 = $.url('1') ? '/' + $.url('1') + '/' : '';

    if ( url1.length <= 4) {
      var shopURL = $('body').data('shop-url') + url1;
    } else {
      var shopURL = $('body').data('shop-url');
    }

    if (Shopify.theme_settings.search_option == 'products'){
      var searchPath = shopURL + '/search?type=product&q=';
    } else {
      var searchPath = shopURL + '/search?q=';
    }

    //Submit wildcard searches
    $(".search_form, .search__form, .header_search_form").on("submit", function(e){
      var formValue = $(this).find('input[name="q"]').val();
      var cleanFormValue = encodeURI(formValue);

      e.preventDefault();

      if(cleanFormValue == null) {
        window.location.href = '/search';
      } else {
        window.location.href = searchPath + cleanFormValue + '*';
      }
    });

    var searchForms = $('form.search_form, form.search, form.header_search_form').each(function() {

      var input = $(this).find('input[name="q"]');

      // Adding a list for showing search results.
      $('<div class="search__results-wrapper"><ul class="search__results"></ul></div>').appendTo($(this));
      // Listening to keyup and change on the text field within these search forms.
      input.attr('autocomplete', 'off').bind('keyup change', function() {

        if(input.val() == '') {
          $('.search__results').hide();
          $('.search__results').empty();
        }

        var term = $(this).val();
        var cleanTerm = encodeURI(term);

        var form = $(this).closest('form');
        var searchURL =  searchPath + cleanTerm;

        var resultsList = form.find('.search__results');

        if (term.length >= 3) {

          if (currentAjaxRequest != null) currentAjaxRequest.abort();

          currentAjaxRequest = $.getJSON(searchURL +'*&view=json', function(data) {
            resultsList.empty();

            // If we have no results.
            if(data.results_count == 0) {
              resultsList.hide();
            } else {
              // If we have results.
              $.each(data.results, function(index, item) {
                if(index >= Shopify.theme_settings.search_items_to_display) {
                  return false;
                }

                var link = $('<a></a>').attr('href', item.url);

                //Collect collection handles if product
                if(item.object_type == 'product') {

                  var collectionHandles = [];
                  for(i=0; i < item.collections.length; i++) {
                    collectionHandles.push(item.collections[i].handle);
                  }

                  if($.inArray('coming-soon', collectionHandles) != -1) {
                    var itemPrice = Shopify.translation.coming_soon_text;
                  } else {
                    if(item.available == true) {

                      if(item.raw_compare > item.raw_price ) {
                        var itemPrice = '<span class="was_price">' + item.compare + '</span> ' + item.price;
                      } else {
                        if(item.price_varies && item.price_min > 0) {
                          var itemPrice = Shopify.translation.from_text + ' ' + item.price;
                        } else if(item.price > 0 || item.raw_price > 0) {
                          var itemPrice = item.price;
                        } else {
                          var itemPrice = Shopify.theme_settings.free_text;
                        }
                      }
                    } else {
                      var itemPrice = Shopify.theme_settings.display_sold_out_price ? item.price + ' ' + '<span class="sold-out-text">' + Shopify.theme_settings.sold_out_text + '</span>' : '<span class="sold-out-text">' + Shopify.theme_settings.sold_out_text + '</span>';
                    }
                  }

                  if(item.thumbnail != 'NULL') {
                    link.append('<div class="thumbnail"><img class="lazyload blur-up" src="' + item.thumbnail + '" /></div>');
                  }
                  link.append('<div class="title">' + item.title + '<br><span class="item-pricing">'+ itemPrice +'</span></div>');


                } else if(item.object_type == 'article') {
                  if(item.thumbnail != 'NULL') {
                    link.append('<div class="thumbnail"><img class="lazyload blur-up" src="' + item.thumbnail + '" /></div>');
                  }
                  link.append('<div class="title">' + item.title + '<br><span class="item-pricing">'+ item.text_content +'</span></div>');

                } else if(item.object_type == 'page') {
                  link.append('<div class="title">' + item.title + '<br><span class="item-pricing">'+ item.text_content +'</span></div>');
                }

                link.wrap('<li class="item-result result--' + item.object_type + '"></li>');
                resultsList.append(link.parent());
              });
              // The Ajax request will return at the most 5 results.
              // If there are more than 5, let's link to the search results page.
              if(data.results_count >= Shopify.theme_settings.search_items_to_display) {
                resultsList.append('<li class="all-results"><span class="title see-all"><a href="' + searchURL + '*">' + Shopify.translation.all_results + ' (' + data.results_count + ')</a></span></li>');
              }
              resultsList.fadeIn(200);
            }
          })
        }
      });
    });

    // Clicking outside makes the results disappear.
    $(document).on('click', function(e){
      var container = $('[data-autocomplete-true]');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('[data-autocomplete-true]').find('.search__results-wrapper').hide();
      }
    });

    $('[data-autocomplete-true] input').on('focus', function(){
      $(this).parents('[data-autocomplete-true]').find('.search__results-wrapper').show();
    });
  },
  unload: function() {
    $('body').off('focus', '[data-autocomplete-true] input');
  }
}

/*============================================================================
  Sidebar filter on collection pages
==============================================================================*/

var collectionSidebarFilter = {
  init: function(){

    $('.filter-active-tag input:checked').parents('.filter-active-tag').siblings('.filter-all-tags').hide();
    $('.toggle-all--true .toggle_list .filter-active-tag input:checked').parents('ul.toggle_list').prev().click();

    //checks if there is an active filter, and if so, to keep the tag filter dropdown open
    var queryString = window.location.search;
    if (queryString.indexOf("sort_by") > 0 && $('.toggle-all--true .toggle_list .filter-active-tag input').attr('checked')) {
      $('.sidebar__collection-filter > h4').addClass('active')
    }

    //Hide filters if types or vendors is in URL (can't be combined)
    if ($.url(2) === 'types' || $.url(2) === 'vendors'){
      $('.sidebar__collection-filter').remove();
    }

    $('.sidebar-block:empty').prev().css('border-bottom', 'none');

    //Will reload recently viewed if present
    recentlyViewed.init();
  },
  clearAllFilters: function(){
    $('[data-option-filter] input').prop('checked', false);
    $('[data-option-filter] input').trigger('change');

    //Will reload recently viewed if present
    recentlyViewed.init();
  },
  clearSelectedFilter: function(optionFilter){
    // if the sidebar tag that is being cleared matched the tag inside of the tag filter dropdown, reset the dropdown value to it's default value
    if ($('#tag_filter').length) {
      if (optionFilter.find('[data-option-filter] input').val() === $('#tag_filter option:selected ').val().substr($('#tag_filter option:selected ').val().lastIndexOf('/') + 1)) {
        $('#tag_filter').val($('#tag_filter option:first').val())
      }
    }

    optionFilter.find('[data-option-filter] input').prop('checked', false);
    optionFilter.find('[data-option-filter] input').trigger('change');

    //Will reload recently viewed if present
    recentlyViewed.init();
  }
}




/*============================================================================
  Misc
==============================================================================*/
if (Shopify.theme_settings.slideshow_arrow_size == 'bold'){
  var arrowSize = {
    x0: 10,
    x1: 40, y1: 50,
    x2: 80, y2: 50,
    x3: 50
  }
  var svgArrowSizeLeft = '<svg viewBox="0 0 100 100"><path d="M 10,50 L 40,100 L 80,100 L 50,50  L 80,0 L 40,0 Z" class="arrow"></path></svg>'
  var svgArrowSizeRight = '<svg viewBox="0 0 100 100"><path d="M 10,50 L 40,100 L 80,100 L 50,50  L 80,0 L 40,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>'
} else if (Shopify.theme_settings.slideshow_arrow_size == 'light'){
  var arrowSize = {
    x0: 10,
    x1: 60, y1: 50,
    x2: 62, y2: 40,
    x3: 22
  }
  var svgArrowSizeLeft = '<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 62,90 L 22,50  L 62,10 L 60,0 Z" class="arrow"></path></svg>'
  var svgArrowSizeRight = '<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 62,90 L 22,50  L 62,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>'
} else if (Shopify.theme_settings.slideshow_arrow_size == 'regular'){
  var arrowSize = {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
  var svgArrowSizeLeft = '<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow"></path></svg>'
  var svgArrowSizeRight = '<svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg>'
}

function isScreenSizeLarge() {
  if (window.matchMedia( "(min-width: 1024px)" ).matches) {
    return true
  }
}

var utils = {
  createAccordion: function(container, tab, content){
    var $container = $(container);
    var $tab = $(container).find(tab);
    var $content = $(container).find(content);
    var specificTab = container + ' ' + tab;

    //Check to see if need to rearrange product tabs to create accordion (backwards compatible)
    if (container.indexOf(".accordion-tabs") >= 0){
      var rearrangedTabs = $.map($tab, function(v, i) { return [v, $content[i]]; });
      $container.empty();

      $.each(rearrangedTabs, function (index, value) {
        $container.append(this);
      });

      $content.removeClass('active');
      $container.find('.active').next().slideToggle();

      tab = container + '> a';
    }

    $(container).children('a').each(function(i, tab) {
      var tab = $(this);
      var tabValue = tab.attr('href'); //get tab id
      tab.attr('data-tab-value', tabValue); //set tab id in data attribute
      tab.removeAttr("href"); //remove href (to prevent url hash update)
    });

    $(container).find(tab + '.active').next().slideToggle();
    $('body').on('click', specificTab, function(e){
      e.preventDefault();
      $(this).toggleClass('active');
      $(this).next().slideToggle();
    });
  },
  mobileAccordion: function(container, tab, content){
    $container = $(container);
    $tab = $(container).find(tab);
    $content = $(container).find(content);

    $(tab + '.active').next().slideToggle();

    $('body').on('click', tab, function(e){
      e.preventDefault();
      $(this).toggleClass('active');
      $(this).next().slideToggle();
    });
  },
  mobileParentActiveAccordion: function(container, tab, content){
    $container = $(container);
    $tab = $(container).find(tab);
    $content = $(container).find(content);

    $(tab + '.active').parent().next().slideToggle();

    $('body').on('click', tab, function(e){
      e.preventDefault();
      $(this).toggleClass('active');
      $(this).parent().next().slideToggle();
    });
  },
  initializeTabs: function(){
    $('ul.tabs > li > a').attr('data-no-instant', true);
    $('body').on('click', 'ul.tabs > li > a', function(e) {
      e.preventDefault();
      var contentLocation = $(this).attr('href');
      if(contentLocation.charAt(0)=="#") {
        $('ul.tabs > li > a.active').removeClass('active');
        $(this).addClass('active');
        $(this).parents('ul.tabs').next().find(contentLocation).show().css({'display': 'block'}).addClass('active').siblings().hide().removeClass('active');
      }
    });
  },
  pageBannerCheck: function(){
    //check for header banner
    if (!$('.page-banner').length > 0 || $('.header').hasClass('header-background--solid')) {
      $('.feature_image').removeClass('feature_image');
      $('.header.is-absolute').removeClass('is-absolute');
      //hide secondary logo
      $('.secondary_logo--true').find('.secondary_logo').css('display', 'none');
      $('.secondary_logo--true').find('.primary_logo').css('display', 'block');
    } else {
      if ($('.page-banner').hasClass('full-width--true')) {
        $('.header').parent().addClass('feature_image');
        $('.header').addClass('is-absolute');
        //check for secondary logo
        if ($('header.feature_image').hasClass('secondary_logo--true')){
          $('.secondary_logo--true').find('.secondary_logo').css('display', 'block');
          $('.secondary_logo--true').find('.primary_logo').css('display', 'none');
        }
      } else {
        $('.header').parent().removeClass('feature_image');
        $('.header').removeClass('is-absolute');
      }
    }

    //check for section that uses header banner on home page
    if ($('.index-sections').children().first('.under-menu').find('.full-width--true').length) {
      if (!$('.header').hasClass('header-background--solid')) {
        $('.index .header').parent().addClass('feature_image');
        $('.index .header').addClass('is-absolute');
      }
      //check for secondary logo
      if ($('header.feature_image').hasClass('secondary_logo--true')){
        $('.secondary_logo--true').find('.secondary_logo').show();
        $('.secondary_logo--true').find('.primary_logo').hide();
      }
    } else {
      $('.index .feature_image').removeClass('feature_image');
      $('.index .header.is-absolute').removeClass('is-absolute');
      //hide secondary logo
      if (!$('header.feature_image').hasClass('secondary_logo--true')){
        $('.secondary_logo--true').find('.secondary_logo').hide();
        $('.secondary_logo--true').find('.primary_logo').show();
      }
    }

    //check for section that uses header banner on the page details template
    if ($('.detail-sections').children().first().hasClass('under-menu')) {
      if (!$('.header').hasClass('header-background--solid')) {
        $('[class^="page-details"] .header').parent().addClass('feature_image');
        $('[class^="page-details"] .header').addClass('is-absolute');
      }

      //check for secondary logo
      if ($('header.feature_image').hasClass('secondary_logo--true')){
        $('.secondary_logo--true').find('.secondary_logo').show();
        $('.secondary_logo--true').find('.primary_logo').hide();
      }
    } else {
      $('[class^="page-details"] .feature_image').removeClass('feature_image');
      $('[class^="page-details"] .header.is-absolute').removeClass('is-absolute');

      //hide secondary logo
      if (!$('header.feature_image').hasClass('secondary_logo--true')){
        $('.secondary_logo--true').find('.secondary_logo').hide();
        $('.secondary_logo--true').find('.primary_logo').show();
      }
    }
  },
  resizeActionButtons: function(){
    $('.js-caption:visible').each(function(){
      var buttonWidth = 0;
      $(this).find('.action_button').each(function(){
        $button = $(this);
        if($(this).width() > buttonWidth){
            buttonWidth = $(this).width();
        }
      });
      $(this).find('.action_button').width(buttonWidth);
    });
  },
  enableDisclosure: function() {

    var $disclosure = $('[data-disclosure]');
    var $toggle = $('[data-disclosure-toggle]');
    var $disclosureWrap = $('.disclosure__list-wrap');

    //Check if current opened menu is offscreen
    function checkOffScreen($openedToggle) {
      if($openedToggle.siblings('.disclosure__list-wrap').is(':off-right')) {
        $openedToggle.siblings('.disclosure__list-wrap').addClass('disclosure--left');
      }
    }

    function closeDisclosures(ignoreTarget, currentTarget) {
      if(ignoreTarget === true) {
        $toggle.not(currentTarget).removeClass('is-clicked');
        $toggle.not(currentTarget).attr('aria-expanded', 'false');
      } else {
        $toggle.removeClass('is-clicked');
        $toggle.attr('aria-expanded', 'false');
      }

      $disclosureWrap.removeClass('disclosure--left');
    }

    //Close menus on ESC
    $('body').on('keyup', function(e) {
      if(e.which == '27') {
        closeDisclosures();
      }
    });

    //Close menus on hoverout
    $disclosure.on('mouseleave', function(e) {
      closeDisclosures();
    });

    //On click/focus event for toggling options
    $toggle.on('mouseenter focus', function(e) {
      //Close all other menus
      closeDisclosures(true, this);

      var $target = $(e.currentTarget);
      $target.attr('aria-expanded', 'true').addClass('is-clicked');
      checkOffScreen($target);
    });

    //When tabbing through, close dropdown when tabbing out of dropdown
    $('.disclosure__button').on('focusout', function(e) {
      //Close all other menus
      if(!$(e.relatedTarget).hasClass('disclosure__button') || $(e.relatedTarget).hasClass('disclosure__toggle')) {
        closeDisclosures();
      }
    });

    //Mobile toggle logic
    $toggle.on('touchstart', function(e) {
      if (Shopify.media_queries.medium.matches || !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var $target = $(e.currentTarget);

        closeDisclosures(true, this);

        if(!$target.hasClass('is-clicked')) {
          $target.attr('aria-expanded', 'true').addClass('is-clicked');
          checkOffScreen($target);
        } else {
          $target.attr('aria-expanded', 'false').removeClass('is-clicked');
          $disclosureWrap.removeClass('disclosure--left');
        }
      }
    })

  },
  unload: function($target){
    $('[data-disclosure]').off();
    $('[data-disclosure-toggle]').off();
  }
}

var sliderBlock = {
  select: function(blockId, $parentSection){
    var $blocks = $parentSection.find('.gallery-cell');
    var blockIdsArray = $blocks.map(function() {
      return String($(this).data('block-id'));
    });

    var $slider = $parentSection.find('[data-slider-id]');
    var settings = {
      slideshowTextAnimation: $slider.data('slideshow-text-animation')
    }
    var flkty = $slider.data('flickity');

    $slider.flickity('pausePlayer');

    for(var i = 0; i < blockIdsArray.length; i++){
      if(blockIdsArray[i] === blockId){
        var currentSlide = i;
        if (currentSlide !== flkty.selectedIndex){
          $slider.flickity( 'select', parseInt(currentSlide), false, true);
        }
      }
    }
  },
  deselect: function($parentSection){
    var $slider = $parentSection.find('.flexslider').data('flexslider');
    if($slider) {
      $slider.flickity('unpausePlayer');
    }
  }
}

/*============================================================================
  Quick shop
==============================================================================*/

var globalQuickShopProduct;

var quickShop = {
  init: function(){

    //EVENT - click on quick-shop
    $('body').on('click', '.js-quick-shop-link', function(e){
      e.stopImmediatePropagation();
      e.preventDefault();

      //Set productData object based on data attributes
      var productData = {
        handle: $(this).data('handle'),
        product_id: $(this).data('id'),
        single_variant: $(this).attr('data-single-variant'),
        product_in_collection_url: $(this).data('url'),
        escaped_title: $(this).data('title').replace('"',""),
        escaped_vendor: $(this).data('vendor').replace(/\&/g,'%26'),
        details_text: $(this).data('details-text'),
        full_description: $(this).data('full-description'),
        regular_description: $(this).data('regular-description'),
        feat_img: $(this).data('feat-img'),
        image_array: quickShop.createImageObjects($(this).data('images')),
        thumbnail_array: quickShop.createImageObjects($(this).data('thumbnail-images')),
        collection_handles: $(this).data('collection-handles').trim(',').split(','),
        money_format: $('body').data('money-format')
      }

      //Find current product and notify forms
      var $notifyForm = $(this).next('.js-quickshop-forms__container').find('.notify_form');
      var $productForm = $(this).next('.js-quickshop-forms__container').find('.product_form');

      $.fancybox.open($('.js-quick-shop'), {
        baseClass: 'quick-shop__lightbox product-' + productData.product_id,
        hash: false,
        infobar : false,
        toolbar: false,
        loop: false,
        smallBtn : true,
        video: {
          autoStart: false
        },
        touch: false,
        mobile: {
          preventCaptionOverlap: false,
          toolbar: true,
          buttons: [
            "close"
          ]
        },
        beforeLoad: function(){
          quickShop.beforeOpen(productData);
        },
        afterLoad: function(){
          quickShop.afterContent($productForm, $notifyForm, productData);
          videoFeature.setupRecommendedVideoPlayer();
          productMedia.setupMedia();
        },
        afterShow: function(){

        },
        beforeClose: function(){
          quickShop.beforeClose(productData);
        }
      })

    });

    //Swatch toggler
    $('.swatch_options input').each(function(){
      if($(this).is(':checked')) {
        quickShop.toggleSwatchImages($(this));
      }
    });

    $('.swatch_options label').on('click', function(){
      quickShop.toggleSwatchImages($(this));
    });

  },
  toggleSwatchImages: function(swatchInput){
    var swatchImageID = $(swatchInput).data('image');
    var $quickShopElement = $(swatchInput).parents('.thumbnail').find('.image__container img');

    $quickShopElement.attr('src', swatchImageID);
    $quickShopElement.attr('srcset', swatchImageID);
  },
  createImageObjects: function($images){
    //split image info
    var image_paths_alts = $images.split('~');

    //Create new array with image objects
    var imageArray = image_paths_alts.map(function(image){
      var imageInfo = image.split('^');
      return {
        path: imageInfo[0],
        alt: imageInfo[1],
        id: imageInfo[2],
        mediaType: imageInfo[4]
      }
    });

    return imageArray;
  },
  beforeOpen: function(productData) {

    //Add image elements before gallery is opened
    quickShop.populateGallery(productData);

    $('.js-sale-banner, .js-sold-out, .js-current-price, .js-was-price, .js-savings, .js-new-banner, .js-pre-order-banner').empty();
    $('.modal_price, .js-notify-form').show();

    if (productData.image_array.length > 1) {
      $('.js-gallery-modal').addClass('multi-image');
      $('.js-gallery-modal').removeClass('single-image');
      $('.js-gallery-modal').addClass('is-draggable');
    } else {
      $('.js-gallery-modal').addClass('single-image');
      $('.js-gallery-modal').removeClass('multi-image');
    }

  },
  afterContent: function($productForm, $notifyForm, productData) {

    quickShop.retrieveProductInfo(productData);

    videoFeature.setupVideoPlayer();

    var $productGallery =  $('.js-gallery-modal');

    productPage.enableGallery($productGallery);

    //Copy latest form data to modal
    $('.quick-shop__lightbox .js-notify-form').append($notifyForm.last());
    $('.quick-shop__lightbox .js-product-form').append($productForm.last());

    //Initiate selectCallback
    if($productForm.hasClass("product_form_options") && $productForm.hasClass("viewed") == false) {
      //If form hasn't been viewed previously, run OptionSelectors function
      new Shopify.OptionSelectors($productForm.data("select-id"),
      {
        product: $productForm.data("product"),
        onVariantSelected: selectCallback,
        enableHistoryState: $productForm.data("enable-state")
      });
    } else {
      //If form has been previously viewed, just convert currencies
      if (Currency.show_multiple_currencies) {
        currencyConverter.convertCurrencies();
      }
    }

    //Link sold out options when there is more than one option available (eg. S is selected and Yellow option appears as sold out)
    if (Shopify.theme_settings.product_form_style == 'swatches'){
      var JSONData = $productForm.data('product');
      var productID = productData.section_id;
      var productSection = '.product-' + productID + ' .js-product_section';
      var swatchOptions = $productForm.find('.swatch_options .swatch');
      if (swatchOptions.length > 1){
        Shopify.linkOptionSelectors(JSONData, productSection);
      }
    }

    $('.js-quick-shop select[name="id"]').trigger('change');

    utils.initializeTabs();

    productPage.productSwatches();

  },
  beforeClose: function(productData) {

    var $insertedNotifyForm = $('.quick-shop__lightbox .notify_form');
    var $insertedProductForm = $('.quick-shop__lightbox .product_form');

    //Copy form data back to product loop and add .viewed
    $('.js-quickshop-forms--'+ productData.product_id).append($insertedProductForm);
    $('.js-quickshop-forms--'+ productData.product_id).append($insertedNotifyForm);
    $('.js-quickshop-forms--'+ productData.product_id +' .product_form').addClass('viewed');
    $('.js-quickshop-forms--'+ productData.product_id +' .notify_form').addClass('viewed');

    //Find gallery and carousel
    var $gallery = $('.js-gallery-modal');
    var $carousel = $('.js-gallery-carousel');

    $('.js-gallery-carousel .gallery-cell').off('click');

    //Remove image slides from gallery
    $gallery.flickity( 'remove', $('.gallery-cell', $gallery));

    //Destroy sliders when modal closes
    $gallery.flickity('destroy');
    if ($carousel.hasClass('flickity-enabled')){
      $carousel.flickity( 'remove', $('.gallery-cell', $carousel) );
      $carousel.flickity('destroy');
    } else {
      $carousel.find('.gallery-cell').remove();
    }

    var variantPrice = $('.js-current-price .money').text();
    $('.js-quick-shop-link[data-id=' + productData.product_id + ']').attr('data-initial-modal-price', variantPrice);
    $('.js-current-price, .js-was-price, .js-savings').empty();

  },
  retrieveProductInfo: function(productData){
    $.ajax({
      dataType: "json",
      async: false,
      cache: false,
      url: "/products/" + productData.handle + ".js",
      success: function(product) {
        //Create new object combining info
        product = $.extend({}, product, productData);

        globalQuickShopProduct = product;
        quickShop.updateVariant(product.variants[0].id.toString(), product);

      }
    });

  },
  updateVariant: function(variant){

  if (globalQuickShopProduct != 'undefined'){

    var product = globalQuickShopProduct;

    $('.js-current-price').html('');
    $('.js-was-price').html('');
    $('.js-savings').html('');

      //Title and Vendor
      $('.js-product-title').html('<a href="'+ product.product_in_collection_url +'" title="'+ product.escaped_title +'">'+ product.title +'</a>');
      $('.js-product-vendor')
      .html('<a href="/collections/vendors?q=' + product.escaped_vendor +'">' + product.vendor + '</a>');

      //Product Description
      $('.js-full-description').html(product.full_description);
      $('.js-regular-description').html(product.regular_description);
      var productDetails = '<a href="'+ product.product_in_collection_url +'" class="secondary_button" title="'+ product.escaped_title +' Details">'+ product.details_text +'</a>';
      $('.js-product-details').html(productDetails);

      //Collection banners
      $.each( product.collection_handles, function( value, index ) {
        if (this.toString() == 'new'){
          $('.js-new-banner').html(Shopify.translation.new_text);
        }
        if (this.toString() == 'pre-order'){
          $('.js-pre-order-banner').html(Shopify.translation.pre_order_text);
        }
        if (this.toString() == 'coming-soon'){
          product.price = Shopify.translation.coming_soon_text;
        }

      });

      if (product.single_variant == 'true'){

        //No variants
        //Sale Banner
        if (Shopify.theme_settings.sale_banner_enabled){
          if (product.compare_at_price > product.price){
            $('.js-sale-banner').html(Shopify.translation.sale_text);
          }
        }

        //Sale
        if (product.compare_at_price > product.price) {
          $('.js-current-price').addClass('sale');
        } else {
          $('.js-current-price').removeClass('sale');
        }

        //Availability
        if (product.available == false){
          if (product.price == Shopify.translation.coming_soon_text) {
            $('.js-sold-out').html(Shopify.translation.coming_soon_text)
          } else {
            $('.js-sold-out').html(Shopify.theme_settings.sold_out_text);
          }
        } else {
          $('.js-sold-out').html('');
        }

        //Price
        if (product.available == true || product.available == false && Shopify.theme_settings.display_sold_out_price) {
          if (product.compare_at_price > product.price) {
            $('.js-was-price').html('<span class="money">' + Shopify.formatMoney(product.variants[0].compare_at_price, product.money_format)  + '</span>');
            $('.js-savings').html(Shopify.translation.savings_text + ' ' + parseInt(((product.variants[0].compare_at_price - product.variants[0].price) * 100) / product.variants[0].compare_at_price) + '% (' + '<span class="money">' + Shopify.formatMoney(product.variants[0].compare_at_price - product.variants[0].price, product.money_format) + '</span>)');
          }

          if (product.price == Shopify.translation.coming_soon_text){
            $('.js-current-price').html(Shopify.translation.coming_soon_text);
          } else if (product.price) {
            $('.js-current-price').html('<span class="money">' + Shopify.formatMoney(product.variants[0].price, product.money_format) + '</span>');
          } else {
            $('.js-current-price').html(Shopify.theme_settings.free_text);
          }
        }

        //Notify Form
        if (product.available == true) {
          $('.js-notify-form').hide();
        } else {
          $('.js-notify-form').show();
        }

      } else {

        //Variant loop
        for (var i = 0; i < product.variants.length; i++) {

          if (variant == product.variants[i].id.toString()){
            //Sale Banner
            if (Shopify.theme_settings.sale_banner_enabled){
              if (product.variants[i].compare_at_price > product.variants[i].price){
                $('.js-sale-banner').html(Shopify.translation.sale_text);
              }
            }

            //Sale
            if (product.variants[i].compare_at_price > product.variants[i].price) {
              $('.js-current-price').addClass('sale');
            } else {
              $('.js-current-price').removeClass('sale');
            }

            //Availability
            if (product.variants[i].available == false){
              if (product.price == Shopify.translation.coming_soon_text) {
                $('.js-sold-out').html(Shopify.translation.coming_soon_text)
              } else if ($('.js-current-price').parents('.modal_price').hasClass('variant-unavailable')){
                $('.js-sold-out').html(Shopify.translation.unavailable_text);
              } else {
                $('.js-sold-out').html(Shopify.theme_settings.sold_out_text);
              }
            } else {
              $('.js-sold-out').html('');
            }

            //Extra check to ensure the product is not unavailable
            if ($('.js-current-price').parents('.modal_price').hasClass('variant-unavailable')){
              $('.js-sold-out').html(Shopify.translation.unavailable_text);
            }

            //Notify Form
            if (product.variants[i].available == true) {
              $('.js-notify-form').hide();
            } else {
              $('.js-notify-form').show();
            }

            //Price
            if (product.variants[i].available == true || product.variants[i].available == false && Shopify.theme_settings.display_sold_out_price){

              if (product.variants[i].compare_at_price > product.variants[i].price) {
                $('.js-was-price').html('<span class="money">' + Shopify.formatMoney(product.variants[i].compare_at_price, product.money_format) + '</span>');
                $('.js-savings').html(Shopify.translation.savings_text + ' ' + parseInt(((product.variants[i].compare_at_price - product.variants[i].price) * 100) / product.variants[i].compare_at_price) + '% (' + '<span class="money">' + Shopify.formatMoney(product.variants[i].compare_at_price - product.variants[i].price, product.money_format) + '</span>)');
              }

              if (product.price == Shopify.translation.coming_soon_text){
                $('.js-current-price').html(Shopify.translation.coming_soon_text);
              } else if (product.variants[i].price) {
                $('.js-current-price').html('<span class="money">' + Shopify.formatMoney(product.variants[i].price, product.money_format) + '</span>');
              } else {
                $('.js-current-price').html(Shopify.theme_settings.free_text);
              }
            }
          }
        }
      }
    }
    if (Currency.show_multiple_currencies) {
      currencyConverter.convertCurrencies();
    }
  },
  populateGallery: function(productData){

    //Find gallery and carousel
    var $gallery = $('.js-gallery-modal');
    var $carousel = $('.js-gallery-carousel');

    //Add gallery images based on product info from API
    function addMainGalleryImages(){

      $.each( productData.image_array, function( i, image ){

        if (image.path == '' || image.id == undefined) {
          var imgPath = productData.feat_img;
        } else {
          var imgPath = image.path;
        }

        if (image.alt == undefined || image.alt == '') {
          var alt = "";
        } else {
          var alt = image.alt;
        }

        var img2048x2048 = imgPath.replace(/(\.[^.]*)$/, "_2048x2048$1").replace('http:', '');
        var cellContent;

        if (image.mediaType.indexOf("image") >= 0) {
          cellContent = '<div class="image__container" style="max-width:' + image.width + 'px"><img class="lazyload '+ Shopify.theme_settings.image_loading_style +'" src="' + imgPath + '" alt="${alt}" data-zoom-src="' + imgPath +'" data-image-id="' + image.id + '" data-index="' + i + '" /></div>';
        } else {
          cellContent = unescape(imgPath);
        }

        var $cellElems = $('<div class="gallery-cell">'+ cellContent +'</div>');
        $('.js-gallery-modal').append($cellElems);
      });

    }

    //Add carousel images based on product info from API
    function addCarouselGalleryImages(){

      $.each( productData.thumbnail_array, function( i, image ){
        if (image.path != '') {
          var imgPath = image.path;
          var carouselSizedImg = imgPath.replace(/(\.[^.]*)$/, "_grande$1").replace('http:', '');

          var mediaBadge = '';

          if (image.alt.indexOf("model") >= 0) {
            mediaBadge = '<span class="icon media-badge"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 25H25V1H1V25Z" fill=""/><path class="media-badge__outline" d="M0.5 25V25.5H1H25H25.5V25V1V0.5H25H1H0.5V1V25Z" stroke="" stroke-opacity="0.05"/><g opacity="0.6"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 6L19.0622 9.5V16.5L13 20L6.93782 16.5V9.5L13 6Z" stroke="" stroke-width="1.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M13 20V12.6024C13.6225 12.2002 13.6225 12.2002 13.6225 12.2002L19 9V16.4082L13 20Z" fill=""/></g></svg></span>';
          } else if(image.alt.indexOf('external_video') >= 0 || image.alt.indexOf('video') >= 0 ) {
            mediaBadge = '<span class="icon media-badge"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 25H25V1H1V25Z" fill=""/><path class="media-badge__outline" d="M0.5 25V25.5H1H25H25.5V25V1V0.5H25H1H0.5V1V25Z" stroke="" stroke-opacity="0.05"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.19995 5.8V20.2L19.3999 12.5858L8.19995 5.8Z" fill="" fill-opacity="0.6"/></svg></span>';
          }

          var img = '<img src="'+ carouselSizedImg + '" alt="' + escape(image.alt) + '" />';
          var $carouselCellElems = $('<div class="gallery-cell product-gallery__thumbnail">'+ img + mediaBadge +'</div>');
          $carousel.append($carouselCellElems);
        }
      });

      imageFunctions.linkGalleryAndCarousel($gallery, $carousel);

    }

    addMainGalleryImages();

    // Adds carousel images to thumbnail slider if there is more than one slide in main gallery
    if ($gallery.find('.gallery-cell').length > 1) {
      addCarouselGalleryImages();
    }

  }
}

/*============================================================================
  Newsletter Popup
==============================================================================*/

var newsletter_popup = {
  init: function(){
    var popup = Cookies.get('popup');
    var newsletter_popup_days = parseInt(Shopify.theme_settings.newsletter_popup_days);
    var cookie_enabled = newsletter_popup_days != 0 ? true : false;
    if (cookie_enabled && popup == 'open') {
      return false;
    } else {
      newsletter_popup.open();
    }
    if (cookie_enabled) {
      Cookies.set('popup', 'open', { expires: newsletter_popup_days });
    }
  },
  open: function(){
    var newsletter_popup_seconds = parseInt(Shopify.theme_settings.newsletter_popup_seconds);

    if (Shopify.theme_settings.newsletter_popup_mobile || Shopify.media_queries.large.matches) {
      setTimeout( function() {
        $.fancybox.open($('.js-newsletter-popup'), {
          baseClass: 'newsletter__lightbox',
          hash: false,
          infobar : false,
          toolbar: false,
          loop: true,
          smallBtn : true,
          mobile: {
            preventCaptionOverlap: false,
            toolbar: true,
            buttons: [
              "close"
            ]
          }
        });
      },
      newsletter_popup_seconds * 1000);
    }
  }
}

/*============================================================================
Product media controls
==============================================================================*/

var productMedia = {
  models: [],
  setupMedia: function() {
    var config = {
      // Default control list
      controls: [
        'zoom-in',
        'zoom-out',
        'fullscreen'
      ],
      focusOnPlay: false
    }

    $($('model-viewer', $('.js-product-gallery, .js-gallery-modal'))).each(function(index, model) {
      model = new Shopify.ModelViewerUI(model, config);
      productMedia.models.push(model)
    })

    $('.product-gallery__model model-viewer').on('mousedown',function(){
      productMedia.hideModelIcon(this);
    })
  },
  showModelIcon: function(slide) {
    $(slide).find('.button--poster, .model-icon-button-control').show();
  },
  hideModelIcon: function(slide) {
    $(slide).find('.button--poster, .model-icon-button-control').hide();
  }
}

/*============================================================================
Plyr setup
==============================================================================*/

var videoEl = {
  playButtonIcon:'<button type="button" class="plyr__control plyr__control--overlaid" aria-label="Play, {title}" data-plyr="play"><svg class="play-icon-button-control" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23 20V40L39 29.4248L23 20Z" fill="#323232"/></svg><span class="plyr__sr-only">Play</span></button>',
  playButton: '<button type="button" class="plyr__controls__item plyr__control" aria-label="Play, {title}" data-plyr="play"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Pause</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span></button>',
  muteButton: '<button type="button" class="plyr__controls__item plyr__control" aria-label="Mute" data-plyr="mute"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span></button>',
  progressInput: '<div class="plyr__controls__item plyr__progress__container"><div class="plyr__progress"><input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek"><progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress><span role="tooltip" class="plyr__tooltip">00:00</span></div></div>',
  volume: '<div class="plyr__controls__item plyr__volume"><input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume"></div>',
  fullscreen: '<button type="button" class="plyr__controls__item plyr__control" data-plyr="fullscreen"><svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg><svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg><span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span><span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span></button>'
}

var videoControls = videoEl.playButtonIcon + '<div class="plyr__controls">' + videoEl.playButton + videoEl.progressInput + videoEl.muteButton + videoEl.volume + videoEl.fullscreen + '</div>';
var globalVideoPlayers = [];
var videoPlayers = [];
var videosInRecommendedProductsPlayer;

videoFeature = {
  init: function() {

    this.setupVideoPlayer();
    this.setupRecommendedVideoPlayer();

  },
  setupVideoPlayer: function() {
    var productVideos = document.querySelectorAll('[data-html5-video] video, [data-youtube-video]');

    var setupVideoPlayers = Plyr.setup(productVideos, {
      controls: videoControls,
      ratio: this.aspect_ratio,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true
      },
      storage: {
        enabled: false
      }
    });

    // Moves players into global array so that we can target them for play/pause on global level
    if (globalVideoPlayers) {
      $.each(setupVideoPlayers, function(index, player) {
        globalVideoPlayers.push(player);
      })
    }

    var videoLooping = $('[data-video-loop]').data('video-loop') || false;
    $.each(setupVideoPlayers, function(index, player) {
      player.loop = videoLooping;
      videoPlayers.push(player);
    });

    this.setupListeners();
  },
  setupPlayerForRecentlyViewedProducts: function(video) {

    if (video) {
      var recentlyViewedProductPlayer = new Plyr(video, {
        controls: videoControls,
        ratio: this.aspect_ratio,
        fullscreen: {
          enabled: true,
          fallback: true,
          iosNative: true
        },
        storage: {
          enabled: false
        }
      });

      if (videoPlayers !== null) {
        videoPlayers.push(recentlyViewedProductPlayer);
        this.setupListeners();
      }

    }
  },
  setupRecommendedVideoPlayer: function() {
    var videosInRecommendedProducts = document.querySelectorAll('.product-recommendations [data-html5-video] video, .product-recommendations [data-youtube-video]');

    // Only run Plyr.setup if videosInRecommendedProducts exists
    if (videosInRecommendedProducts.length > 0) {
      videosInRecommendedProductsPlayer = Plyr.setup(videosInRecommendedProducts, {
        controls: videoControls,
        fullscreen: {
          enabled: true,
          fallback: true,
          iosNative: true
        },
        storage: {
          enabled: false
        }
      });
      if (videoPlayers !== null) {
        var combinedArray = videoPlayers.concat(videosInRecommendedProductsPlayer);
        videoPlayers = combinedArray;
      } else {
        videoPlayers = videosInRecommendedProductsPlayer;
      }
    }

    this.setupListeners();
  },
  setupListeners: function() {
    // Adds plyr video id to video wrapper
    $.each(videoPlayers, function(index, player) {
      var id = player.id || player.media.dataset.plyrVideoId;
      var $video;

      if (player.isHTML5) {
        $video = $(player.elements.wrapper).find('video');
        $video.attr('data-plyr-video-id', id);
      }
    })

    // When a video is playing, pause any other instances
    $.each(globalVideoPlayers, function(index, player) {
      player.on('play', function(event) {
        var instance = event.detail.plyr;
        $.each(globalVideoPlayers, function(index, player) {
          if (instance.id != player.id ) {
            player.pause();
          }
        })
      })
    })
  },
  enableVideoOnHover: function($thumbnail) {

    var $html5Video = $thumbnail.find('[data-html5-video]');
    var $youtubeVideo = $thumbnail.find('[data-youtube-video]');
    var videoID;

    if ($html5Video.length > 0) {
      videoID = $html5Video.find('[data-plyr-video-id]').data('plyr-video-id');
    } else if ($youtubeVideo.length > 0) {
      videoID = $youtubeVideo.find('iframe').attr('id');
    }

    if (videoID) {
      $.each(videoPlayers, function(index, player) {

        if (player.id == videoID || player.media.id == videoID) {
          player.toggleControls(false);
          player.muted = true;
          player.play();
        }
      })
    }
  },
  disableVideoOnHover: function($thumbnail) {
    var $html5Video = $thumbnail.find('[data-html5-video]');
    var $youtubeVideo = $thumbnail.find('[data-youtube-video]');
    var videoID;

    if ($html5Video.length > 0) {
      videoID = $html5Video.find('[data-plyr-video-id]').data('plyr-video-id');
    } else if ($youtubeVideo.length > 0) {
      videoID = $youtubeVideo.find('iframe').attr('id');
    }

    if (videoID) {
      $.each(videoPlayers, function(index, player) {
        if (player.id == videoID || player.media.id == videoID) {
          if (player.playing) {
            player.pause();
          }
        }
      })
    }
  }
}
