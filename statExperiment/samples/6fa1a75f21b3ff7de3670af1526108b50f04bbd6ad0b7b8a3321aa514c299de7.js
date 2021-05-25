(function(window, document) {
'use strict';
function LazyLoad(images, options) {
	var defaults = {
        src: "data-original",
        srcset: "data-srcset",
        selector: ".lazy"
    };
    this.settings = extend(defaults, options || {});
    this.images = images || document.querySelectorAll(this.settings.selector);
    this.observer = null;
    this.init();
}

function extend() {

    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    /* Check if a deep merge */
    if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
        deep = arguments[0];
        i++;
    }

    /* Merge the object into the extended object */
    var merge = function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                /* If deep merge and property is an object, merge properties */
                if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    /* Loop through each object and conduct a merge */
    for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
    }

    return extended;
}

LazyLoad.prototype.init = function(){
	var self = this;
    var observerConfig = {
        root: null,
        rootMargin: "0px",
        threshold: [0]
    };

    this.observer = new IntersectionObserver(function(entries){
    	entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0 || entry.isIntersecting) {
                self.observer.unobserve(entry.target);
                self.loadImage(entry.target);
            }
        });
    }, observerConfig);

    this.images.forEach(function (image) {
        self.observer.observe(image);
    });
};

LazyLoad.prototype.loadImage = function(image){
	var self = this;
	var src = image.getAttribute(self.settings.src);
    var srcset = image.getAttribute(self.settings.srcset);
    if ("img" === image.tagName.toLowerCase()) {
        if (src) {
            image.src = src;
        }
        if (srcset) {
            image.srcset = srcset;
        }
    } else {
        image.style.backgroundImage = "url(" + src + ")";
    }
};

if (window.jQuery) {
    var $ = window.jQuery;
    $.fn.lazyload = function (options) {
        options = options || {};
        options.attribute = options.attribute || "data-original";
        new LazyLoad($.makeArray(this), options);
        return this;
    };
}

}(window, document));