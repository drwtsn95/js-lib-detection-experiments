"use strict";

// Plugin - Anime.js (.anime())
//--------------------------------------------------------------
var initRelativeOffset = anime.timeline({
  loop: false
});

var addTransition = function addTransition(relativeOffset) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (i <= 3) {
    addTransition(relativeOffset.add({
      targets: ".js-box--".concat(i, " .js-box-line"),
      easing: 'linear',
      duration: 400,
      width: '50%'
    }).add({
      targets: ".js-box--".concat(i, " .js-box-checkmark"),
      duration: 200,
      direction: 'alternate',
      offset: '-=300',
      scale: [{
        value: 1.2,
        duration: 100
      }, {
        value: 1,
        duration: 100,
        delay: 500
      }],
      color: {
        value: '#ffffff',
        easing: 'linear'
      },
      backgroundColor: {
        value: '#78d33a',
        easing: 'linear'
      }
    }).add({
      targets: ".js-box--".concat(i, " .js-box-header"),
      easing: 'easeInQuad',
      offset: '-=500',
      duration: 200,
      fontWeight: 500,
      fontSize: {
        value: ['1.5rem', '1.75rem']
      },
      color: {
        value: ['#a1a1a1', '#78d33a']
      }
    }).add({
      targets: ".js-box--".concat(i, " .js-box-icon"),
      duration: 200,
      offset: '-=600',
      delay: function delay(el, i) {
        return i * 200;
      },
      color: {
        value: '#78d33a',
        easing: 'linear'
      },
      backgroundColor: {
        value: '#e4f6d8',
        easing: 'linear'
      },
      scale: [{
        value: 1.2,
        duration: 50
      }, {
        value: 1,
        duration: 50,
        delay: 500
      }]
    }).add({
      targets: ".js-box--".concat(i, " .js-box-item"),
      easing: 'easeInQuad',
      offset: '-=500',
      duration: 200,
      opacity: 1
    }).add({
      targets: ".js-box--".concat(i, " .js-box-line"),
      easing: 'linear',
      delay: 0,
      duration: 400,
      width: {
        value: ['50%', '100%']
      }
    }), i + 1);
  }
};

setTimeout(function () {
  addTransition(initRelativeOffset);
}, 2000);