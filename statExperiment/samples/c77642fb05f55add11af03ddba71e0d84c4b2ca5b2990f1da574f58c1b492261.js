var TRK = TRK || {};

(function (TRK) {
    'use strict';

    TRK.utilities = {
        // TODO: remove
        balanceHeights: function(wrap, balance, n) {
            setTimeout( function(){
                $(wrap).each( function(index) {
                    return $(this).find(balance).setMinHeight(n);
                });
            }, 200);
        },
        countdown: function (options) {
            var timer,
                self = this,
                seconds = options.seconds || 10,
                update = options.onUpdate || function() {},
                finish = options.onFinish || function() {};

            function decrement() {
                update(seconds);

                if( seconds === 0 ) {
                    finish();
                    self.stop();
                }

                seconds--;
            }

            this.start = function() {
                clearInterval(timer);

                timer = 0;
                seconds = options.seconds;
                timer = setInterval(decrement, 1000);
            };

            this.stop = function() {
                clearInterval(timer);
            };
        }
    };

    // TODO: remove
    $.fn.setMinHeight = function(setCount) {
        var i;

        for(i = 0; i < this.length; i += setCount) {
            var current_set = this.slice(i, i + setCount),
            max_height = 0;

            current_set.each( function() {
                max_height = Math.max(max_height, $(this).height());
            });

            current_set.css('height', max_height);
        }
        return this;
    };

    // TODO: remove
    $.fn.makeSameHeight = function() {
        var $elements = $(this),
        max_height = 0;

        $elements.each(function(index,element) {
            var element_height = $(element).outerHeight();

            if (max_height < element_height) {
                max_height = element_height;
            }

        });

        $elements.outerHeight(max_height);
    };

})(TRK);

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) { 
            size++
        }
    }
    return size;
};