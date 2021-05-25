define("discourse/plugins/discourse-narrative-bot/initializers/new-user-narrative",["exports","discourse/lib/ajax","discourse/lib/plugin-api"],function(e,s,t){"use strict";function i(e){var t=e.container.lookup("message-bus:main"),i=e.getCurrentUser(),r=e.container.lookup("service:app-events");e.modifyClass("component:site-header",{didInsertElement:function(){this._super.apply(this,arguments),this.dispatch("header:search-context-trigger","header")}}),e.modifyClass("controller:topic",{_togglePostBookmark:function(t){var i=this;return-2!==t.user_id||t.bookmarked?this._super(t):(0,s.ajax)("/bookmarks",{type:"POST",data:{post_id:t.id}}).then(function(e){t.setProperties({"topic.bookmarked":!0,bookmarked:!0,bookmark_id:e.id}),t.appEvents.trigger("post-stream:refresh",{id:i.id})})}}),e.attachWidgetAction("header","headerSearchContextTrigger",function(){this.site.mobileView?this.state.skipSearchContext=!1:(this.state.contextEnabled=!0,this.state.searchContextType="topic")}),t&&i&&t.subscribe("/new_user_narrative/tutorial_search",function(){r.trigger("header:search-context-trigger")})}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"new-user-narratve",initialize:function(e){e.lookup("site-settings:main").discourse_narrative_bot_enabled&&(0,t.withPluginApi)("0.8.7",i)}};e.default=r});
//# sourceMappingURL=https://sjc5.discourse-cdn.com/try/assets/plugins/discourse-narrative-bot-0b1e40d099d739cee23bbad45c2fb5eac1dcaaba028fdc9fa21b9e32930ec40b.js.map