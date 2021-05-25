





/*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var MegaMenu = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        sl.log("MegaMenu options", options);
        this.updateBlockURL = "/pf4/cms2/edit_page";
        this.jsHiddenContentClass = options.jsHiddenContentClass;
        this.hiddenContentElement = null;
        this.menuBlockID = options.menuBlockID;
        this.setUpDropdown();
        this.initListeners();
    },

    initListeners: function () {
        this.blockElement.on({
            "jsChildModuleSelected": jQuery.proxy(this.childSelectedHandler, this),
            "jsChildModuleDeselected": jQuery.proxy(this.childModuleDeselected, this)
        })
        this.initTitleListener();
    },

    setUpDropdown: function () {
        var url = "/cms2/appearance/default/module/drop_down_menu?mod=" + this.menuBlockID;
    },

    addingChildHandler: function (id) {
        sl.log("addingChildHandler", id);
        this.setupHiddenContent(id);
    },

    movingChildHandler: function (id, targetId) {
        if (this.hiddenContentElement.has("#block_" + targetId).length == 0) { // this is when menu item is dropped outside
            var cmsModule = EditCMS2Page.findModule(); // Tom, is there a better way to update?
            cmsModule.updateDocument(id);
        } else {
            this.setupHiddenContent(id);
        }
    },


    setupHiddenContent: function (focusID) {
        sl.log("setupHiddenContent updateBlock", focusID)
        var getURL = this.updateBlockURL;
        var variables = {};
        variables["edit_form_data"] = this.getFormDataID();
        variables["mod"] = this.menuBlockID;
        sl.addAjaxScope(variables);
        var setupAjax = jQuery.ajax({
            url: getURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.hiddenContentLoadedHandler, this, focusID)
        });
        return setupAjax;
    },

    hiddenContentLoadedHandler: function (focusID, data) {
        this.hiddenContentElement = this.blockElement.find("." + this.jsHiddenContentClass);
        var hiddenContent = jQuery(data);
        hiddenContent.find(".jsDropdownColumn").addClass("jsAddChildBlockLink")
        hiddenContent.find(".cms2-selectable-module").addClass("jsSelectableIfParentSelected jsAddChildBlockLink");
        var newOffset = this.getHiddenContentOffset();

        this.hiddenContentElement
            .css({
                "left": newOffset
            });
        this.hiddenContentElement.html(hiddenContent).show();
        if (focusID != null) {
            this.focusChild(focusID)
        }
        sl.initCMS2Page();
    },

    getHiddenContentOffset: function () {
        var button = this.blockElement.find(".jsDropdownButton:first")
        //debugger;
        var offset = button.offset();
        var hiddenContentWidth = parseInt(this.hiddenContentElement.css("width"), 10);
        var buttonWidth = parseInt(this.blockElement.find(".jsDropdownButton:first").css("width"), 10);
        var viewportWidth = jQuery(window).width();
        var newOffset = (hiddenContentWidth == buttonWidth) ? 0 : (buttonWidth - hiddenContentWidth) / 2; //centering dropdown
        newOffset += button.position().left;//to handle buttons not flush left with hidden content
        if (offset.left + newOffset + hiddenContentWidth > viewportWidth) { //going off right
            newOffset = viewportWidth - offset.left - hiddenContentWidth;
        }
        if (offset.left + newOffset < 0) {//going off left
            newOffset = -offset.left + button.position().left;
        }
        return newOffset
    },


    selectHandler: function () {
        this.$super();
        this.renderingChain = this.setupHiddenContent(null);
    },

    focusChild: function (id) {
        var editor = EditCMS2Page.findModule();
        editor.editModule(jQuery("#block_" + id));
    },

    focusParent: function () {
        this.blockElement.removeClass("cms2-selectable-module--semi-selected");

        var editor = EditCMS2Page.findModule();
        editor.editModule(this.blockElement);
    },

    childSelectedHandler: function (e) {
        this.blockElement.addClass("cms2-selectable-module--semi-selected");
    },

    childModuleDeselected: function (e, newTarget) {
        sl.log("childModuleDeselected", e)
        if (this.hiddenContentElement.has(newTarget).length == 0) {
            this.blockElement.removeClass("cms2-selectable-module--semi-selected");
            this.deselectHandler();
            this.hiddenContentElement.empty();
        }
    },

    deletingChildHandler: function (id) {
        jQuery("#block_" + id).animate({
            opacity: 0,
            height: '0'
        }, 500, jQuery.proxy(this.setupHiddenContent, this));
        this.focusParent();
    },
    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var NavigationPlayer = Class.$extend({
    __init__: function (options) {
        //this.$super(options);
        this.menuElement = jQuery("#block_" + options.blockID)
        this.initListeners();

    },
    initListeners: function () {
        this.menuElement.on({
            "mouseenter": jQuery.proxy(this.mouseenterHandler, this),
            "mouseleave": jQuery.proxy(this.mouseleaveHandler, this),
            "focusin": jQuery.proxy(this.focusInHandler, this),
            "focusout": jQuery.proxy(this.focusOutHandler, this),
            "keydown": jQuery.proxy(this.keyDownHandler, this),
        }, ".jsDropdownHolder,.jsChildlessNavItemLink");
        this.menuElement.on("keydown", "a button", jQuery.proxy(this.keyDownHandler, this));

        sl.log("this.menuElement.attr(\"id\")",this.menuElement.attr("id"), this.menuElement)

        this.menuElement.on({
                "click": jQuery.proxy(this.megamenuClickHandler, this),
            }, ".jsClickToOpen")

        // }


    },
    setFromTarget: function (target) {
        //just handles the setting of elements
        this.button = (target.hasClass("jsDropdownButton")) ? target : target.closest(".jsDropdownHolder").find(".jsDropdownButton");
        var hasDropdownForHover = true;
        if (this.button.length == 0) {
            this.button = (target.hasClass("jsChildlessNavItemLink")) ? target : target.closest(".jsDropdownHolder").find(".jsChildlessNavItemLink");
            hasDropdownForHover = false;
        }
        this.openOnClick = this.button.hasClass("jsClickToOpen")
        this.container = this.button.closest(".jsDropdownHolder");
        this.hiddenContent = this.container.find(".jsDropdownContent:first");
        return !this.openOnClick && hasDropdownForHover;
    },

    megamenuClickHandler: function(event){
        sl.log("megamenuClickHandler",event)
        event.stopPropagation();
        var target = jQuery(event.target);
        this.setFromTarget(target);
        this.button.addClass("sl-cms2-nav__dropdown-button--on jsClickedOpen");
        if (jQuery(".jsClickedOpen").length > 1) {
             this.closeOtherDropdowns();
        }

        if (this.isOpen()){
           this.close()
        } else {
            this.open();
        }
        jQuery(document).on("click", jQuery.proxy(this.megamenuClickOffHandler, this, this.hiddenContent))
    },

    closeOtherDropdowns: function() {
        sl.log("close others");
        jQuery.each(jQuery(".jsClickedOpen").not(this.button), jQuery.proxy(this.closeFromButton, this))
    },

    closeFromButton: function (i, button){
           sl.log("button",button);
        jQuery(button).removeClass("jsClickedOpen sl-cms2-nav__dropdown-button--on")
            .attr("aria-expanded", "false")
            .closest(".jsDropdownHolder")
            .find(".jsDropdownContent")
            .slideUp("fast", jQuery.proxy(this.slideUpCallback, this, this.button))
            .attr("aria-hidden", "true");
    },

    megamenuClickOffHandler: function(hiddenContent,event){
        var isVisible = (hiddenContent.is(":visible"));
        var clickedOutside = (hiddenContent.find(jQuery(event.target)).length == 0);
        if (isVisible && clickedOutside) {
            this.hiddenContent = hiddenContent;
            this.button = this.hiddenContent.closest(".jsDropdownHolder").find(".jsDropdownButton");
            this.button.removeClass("sl-cms2-nav__dropdown-button--on jsClickedOpen")
            this.close();
            jQuery(document).off("click");
        }
    },

    mouseenterHandler: function (event) {
        jQuery(":focus").blur();
        var target = jQuery(event.target);
        var hasDropdownForHover = this.setFromTarget(target);
        this.button.addClass("sl-cms2-nav__dropdown-button--on");
        if (hasDropdownForHover) {
            this.open();
            this.closeOtherDropdowns();
        }
    },

    mouseleaveHandler: function (event) {
        var target = jQuery(event.target);
        if ( (this.button != null) && this.button.hasClass("jsClickedOpen")) {
            return;
        }

        var hasDropdownForHover = this.setFromTarget(target);
        if (hasDropdownForHover) {
            this.close();
        } else {
            this.button.removeClass("sl-cms2-nav__dropdown-button--on");
        }
    },
    focusInHandler: function (event) {
        var target = jQuery(event.target);
        this.setFromTarget(target);
        this.button.addClass("sl-cms2-nav__dropdown-button--on");
        sl.log("focusInHandler target", target)
    },

    focusOutHandler: function (event) {

    },

    slideUpCallback: function (button) {
    },
    tabbingOutHandler: function (event) {
        sl.log("tabbingOutHandler", event)
        if (event.keyCode == 9) {
            this.mouseleaveHandler();
        }
    },
    isOpen: function () {
        return this.button.attr("aria-expanded") == "true";
    },


    open: function () {
        this.dropdownTimeout = setTimeout(jQuery.proxy(this.openTimeoutFunctions, this), 100)
    },

    openTimeoutFunctions: function (target) {
        clearTimeout(this.dropdownTimeout);
        if (this.hiddenContent.attr("aria-hidden")) {
            if (this.container.hasClass("jsDropdownDynamicContent")) {
                this.loadOrOpenDynamicContent();
            }
            else {
                this.openDropdown()
            }
        }
    },

    close: function () {
        clearTimeout(this.dropdownTimeout);
        this.hiddenContent.slideUp("fast", jQuery.proxy(this.slideUpCallback, this, this.button))
            .attr("aria-hidden", "true")

        this.button.removeClass("sl-cms2-nav__dropdown-button--on")
            .attr("aria-expanded", "false");
    },

    keyDownHandler: function (event) {
        sl.log("keyDownHandler")
        var target = jQuery(event.target);
        sl.log("keyDownHandler", target)
        this.currentPanel = target.closest(".jsDropdownHolder");
        var keycode = event.keyCode || event.which,
            tabbables = this.currentPanel.find('.jsDropdownContent :tabbable').add(this.currentPanel.find('.sl-cms2-feature-story-vertical__link-container')),
            lastLinkInMenu = tabbables.last(),
            isTopLink = (target.parent().hasClass("jsNavTopList") || target.closest("ul").hasClass("jsNavTopList")),
            isOpen = this.isOpen(target),
            topLinks = this.currentPanel.closest("nav").find(".jsDropdownHolder"),
            topLevelIndex = topLinks.index(this.currentPanel),
            currentTopLevelItemLink = (this.currentPanel.is(":tabbable")) ? this.currentPanel : this.currentPanel.find(":tabbable:first"),
            nextTopLevelItem = jQuery(topLinks[topLevelIndex + 1]),
            nextTopLevelItemLink = (nextTopLevelItem.is(":tabbable")) ? nextTopLevelItem : nextTopLevelItem.find(":tabbable:first"),
            prevTopLevelItem = jQuery(topLinks[topLevelIndex - 1]),
            prevTopLevelItemLink = (prevTopLevelItem.is(":tabbable")) ? prevTopLevelItem : prevTopLevelItem.find(":tabbable:first"),
            currentlyOpen = this.currentPanel.find("jsDropdownContent").is(":visible");
            sl.log("tabbables.length", tabbables.length);
        switch (keycode) {
            case sl.keyboard["ENTER"]:
                if (isTopLink && !this.button.hasClass("jsClickToOpen")) {      //jsClickToOpen is handled by megamenuClickHandler
                    if (isOpen){
                        sl.log("close from keyboard")
                        event.stopPropagation();
                        this.close(target);
                    }  else {
                        event.stopPropagation();
                        sl.log("open from keyboard")
                        this.open(target);
                    }
                }
                break;
            case sl.keyboard["DOWN"]:
                event.preventDefault();
                if (isTopLink && !isOpen) {
                    this.open(target);
                }
                else {
                    var tabIndex = tabbables.index(target);
                    tabIndex++;
                    if (tabbables.length == tabIndex) {
                        nextTopLevelItemLink.focus();
                        this.close(target);
                    }
                    else {
                        jQuery(tabbables[tabIndex]).focus();
                    }
                }
                break;
            case sl.keyboard["UP"]:
                event.preventDefault();
                if (isTopLink) {
                    this.close(target);
                    prevTopLevelItemLink.focus();
                }
                else {
                    var tabIndex = tabbables.index(target);
                    tabIndex--;
                    if (tabIndex == 0) {
                        this.close(target);
                        currentTopLevelItemLink.focus();
                    }
                    else {
                        jQuery(tabbables[tabIndex]).focus();
                    }
                }
                break;

            case sl.keyboard["RIGHT"]:
                event.preventDefault();
                if (isTopLink) {
                    this.close(target);
                    nextTopLevelItemLink.focus()
                }
                else if (this.currentPanel.hasClass("jsDropdownDynamicContent")) {
                    var parentColumns = target.parents(".sl-cms2-column-container");
                    var parentsInMenu = parentColumns.not(this.currentPanel.parents(".sl-cms2-column-container").not(".jsDropdownColumn"))
                    this.reFocussed = false
                    jQuery.each(parentsInMenu, jQuery.proxy(this.checkColumnToArrowTo, this, "next"))
                    if (!this.reFocussed) {
                        this.close(target);
                        nextTopLevelItemLink.focus();
                    }
                }
                break;

            case sl.keyboard["LEFT"]:
                event.preventDefault();
                if (isTopLink) {
                    this.close(target);
                    prevTopLevelItemLink.focus();
                } else if (this.currentPanel.hasClass("jsDropdownDynamicContent")) {

                    var parentColumns = target.parents(".sl-cms2-column-container");
                    var parentsInMenu = parentColumns.not(this.currentPanel.parents(".sl-cms2-column-container").not(".jsDropdownColumn"))
                    this.reFocussed = false
                    jQuery.each(parentsInMenu, jQuery.proxy(this.checkColumnToArrowTo, this, "prev"))
                    if (!this.reFocussed) {
                        this.close(target);
                        prevTopLevelItemLink.focus();
                    }
                }
                break;

            case sl.keyboard["TAB"]:
                sl.log("tabbed", target)
                sl.log("last link tabbed", lastLinkInMenu, target.is(lastLinkInMenu))
                if (target.hasClass("jsChildlessNavItemLink")) {
                    sl.log("target.hasClass")
                    jQuery(".sl-cms2-nav__dropdown-button--on").removeClass("sl-cms2-nav__dropdown-button--on")

                } else if (target.hasClass("jsDropdownButton") && currentlyOpen) {
                    sl.log("target.hasClass jsDropdownButton, just break")
                    break
                } else if (target.is(lastLinkInMenu)) {
                    sl.log("target is last")
                    if (event.shiftKey != true){
                        jQuery(".sl-cms2-nav__dropdown-button--on").removeClass("sl-cms2-nav__dropdown-button--on");
                        this.close(target);
                    }
                } else {
                    sl.log("all else")
                    jQuery(".sl-cms2-nav__dropdown-button--on").removeClass("sl-cms2-nav__dropdown-button--on")
                }
                break;
            case sl.keyboard["ESCAPE"]:
                this.close(target);
                break;
            case sl.keyboard["SPACE"]:
                if (isTopLink) {
                    this.open(target);
                }
                break;
        }
    },
    checkColumnToArrowTo: function (direction, index, column, object) {
        sl.log("checking checkColumnToArrowTo")
        sl.log(direction, "i:", index, "column::", column);
        if (direction == "next") {
            if (jQuery(column).next(".sl-cms2-column-container").find(":tabbable:first").length == 1) {
                jQuery(column).next(".sl-cms2-column-container").find(":tabbable:first").focus();
                this.reFocussed = true;
                return false;
            }
        } else {
            if (jQuery(column).prev(".sl-cms2-column-container").find(":tabbable:first").length == 1) {
                jQuery(column).prev(".sl-cms2-column-container").find(":tabbable:first").focus();
                this.reFocussed = true;
                return false;
            }
        }
    },

    loadOrOpenDynamicContent: function () {
        sl.log("loadOrOpenDynamicContent")
        if (this.hiddenContent.is(':empty')) {
            var getURL = "/pf4/cms2/view_page";
            var variables = {};
            var pageParameterName = this.button.data("page-parameter-name");
            var pageParameterValue = this.button.data("page-parameter-value");
            var mod = this.button.data("content-id");
            variables[pageParameterName] = pageParameterValue;
            variables["mod"] = mod;
            variables["dont_include_css_js"] = true;
            sl.addAjaxScope(variables);
            var setupAjax = jQuery.ajax({
                url: getURL,
                type: "GET",
                data: variables,
                context: this,
                success: jQuery.proxy(this.loadHiddenContent, this)
            });
        }
        else {
            this.openDropdown();
        }
    },
    loadHiddenContent: function (data) {
        this.hiddenContent.html(data).promise().done(jQuery.proxy(this.openDropdown,this));
    },
    openDropdown: function () {
        this.numberOfHiddenImages = this.hiddenContent.find("img").length;
        if (this.numberOfHiddenImages > 0 && this.hiddenContent.data("images-loaded") != true){
            this.hiddenContent.data("images-loaded",true)
            this.getHiddenOffsetAfterImageLoad().then(jQuery.proxy(this.displayDropdown,this))
        } else {
            sl.log(" not awaitLoadingOfImages")
            this.displayDropdown();
        }
    },

    displayDropdown: function(){
        if (this.button.hasClass("jsOffsetContentIfRequired")){
            this.displayOffsetContentIfRequired();
        }
        else {
            this.hiddenContent.slideDown("fast")
        }
        this.hiddenContent.attr("aria-hidden", "false");
        this.button.attr("aria-expanded", "true");
        sl.fillSvgHolders();
        sl.initVideoForDynamicContentIfReqd(this.hiddenContent);
    },

    displayOffsetContentIfRequired: function () {
        var newOffsetAndWidth = this.getOffsetValues();
        sl.log("newOffsetAndWidth",newOffsetAndWidth,this.hiddenContent);
        if (this.button.closest("header").length == 0){
            this.hiddenContent.css({
                top: newOffsetAndWidth.offsetTop
            })
        }
        this.hiddenContent.css({
            left: newOffsetAndWidth.offsetLeft,
            width: newOffsetAndWidth.width
        })

        if (newOffsetAndWidth.offsetTop && newOffsetAndWidth.offsetTop < this.button.offset().top ){
            this.hiddenContent.show('slide', { direction: "down" }, 150);
        }   else {
            this.hiddenContent.slideDown("fast")
        }
    },

    slideDownCallback: function () {
        //debugger;
    },

    getHiddenOffsetAfterImageLoad: function () {
            this.imageCounter = 0
            sl.log("awaitLoadingOfImages")
            this.hiddenContent.find("img").on("load",jQuery.proxy(this.imageLoadedHandler, this))
            this.imagesLoaded = jQuery.Deferred()
            return this.imagesLoaded;
    },

    getOffsetValues: function () {
        sl.log("getHiddenOffsetAndWidth")
        var newOffsetLeft;
        var offset = this.button.offset();
        var offsetLeft = offset.left;
        var hiddenContentOuterWidth = this.hiddenContent.outerWidth();
        var newWidth = parseInt(this.hiddenContent.css("width"), 10);
        var buttonWidth = parseInt(this.button.css("width"), 10);
        newOffsetLeft = (hiddenContentOuterWidth == buttonWidth) ? 0 : (buttonWidth - hiddenContentOuterWidth) / 2; //centering dropdown
        newOffsetLeft += offsetLeft;
        var widthElement = jQuery(".jsWidthBoundaryForDropdowns:first") || jQuery("main");
        var useViewport = (widthElement.length == 0);
        var viewportWidth;
        var mainOffsetLeft;
        if (useViewport == true) {
            viewportWidth = jQuery(window).width();
            if (newOffsetLeft + hiddenContentOuterWidth > viewportWidth - 10) { //going off right
                newOffsetLeft = viewportWidth - 10 - hiddenContentOuterWidth;
            }
            if (newOffsetLeft < 10) {         //going off left
                newOffsetLeft = 10;
            }
        }
        else {
            viewportWidth = widthElement.width();
            var mainOffsetLeft = widthElement.offset().left
            if (newOffsetLeft + hiddenContentOuterWidth > viewportWidth) { //going off right
                newOffsetLeft = mainOffsetLeft + viewportWidth - hiddenContentOuterWidth;
            }
            if (newOffsetLeft < mainOffsetLeft) {         //going off left
                newOffsetLeft = mainOffsetLeft;
            }
        }
        if (hiddenContentOuterWidth > viewportWidth) { //content wider than view
            newWidth = viewportWidth - 30 - (hiddenContentOuterWidth - newWidth);   //the only time we change width is if it doesn't fit
            newOffsetLeft = (buttonWidth / 2 + newOffsetLeft < viewportWidth / 2) ? 10 : 20;
        }
        //check if going off bottom
        var buttonHeight = this.button.outerHeight();
        var offsetTop = offset.top;
        var newOffsetTop = null ;
        var hiddenContentHeight = this.hiddenContent.outerHeight();

        if ((this.button.closest("header").length == 0) && (offsetTop + hiddenContentHeight   > jQuery(window).scrollTop() + jQuery(window).height()) && (offsetTop - hiddenContentHeight > jQuery(window).scrollTop() )){ //changing height if it goes off bottom, only if outside header, doesn't disappear up
            newOffsetTop = offsetTop - hiddenContentHeight;
        }  else {
            newOffsetTop = offsetTop + buttonHeight;
        }
        return {offsetLeft: newOffsetLeft, offsetTop: newOffsetTop, width: newWidth};
    },

    loadImages: function(){
        this.imagesLoaded = jQuery.Deferred()
        return this.imagesLoaded;
    },

    imageLoadedHandler: function(){
        this.imageCounter++;
        sl.log("imageLoadedHandler",this.imageCounter, this.numberOfHiddenImages)
        if (this.imageCounter == this.numberOfHiddenImages ) {
            this.imagesLoaded.resolve()
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var AutoNavigation = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);

    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var InteriorNavigation = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);

    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var AnchorMenu = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    selectHandler: function() {
        this.$super();
        this.blockElement.find(".jsModuleTitle").focus();
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/2/17.
 * Globals CKEDITOR,sl *
 */

var TextLogoBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
    },

    selectHandler: function (options) {
        this.$super();
        if(options && options.selectedFromClick == true){
            this.moduleToolbar.toolbarTools["title-subtitle"].buttonClickHandler();
        }
    },

    getTitle: function () {
        return this.blockElement.find(".jsModuleTitle").text()
    },

    getSubtitle: function () {
        return this.blockElement.find(".jsModuleSubtitle").text()
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/2/17.
 * Globals CKEDITOR,sl *
 */

var TextLogoPlayer = BasePlayerHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.windowResizeFunctions();
    },

    windowResizeFunctions: function () {
        this.resizeFont()
    },

    resizeFont: function () {
        var elements = jQuery('.jsResizeFont');
        sl.log("resizeFont", elements);
        var i, element, elementClone, origElementWidth;
        for (i = 0; i < elements.length; i++) {
            element = jQuery(elements[i]);
            origElementWidth = element.width();
            elementClone = jQuery(elements[i]).clone();

            elementClone.css({
                "position": "absolute",
                //"visibility": "hidden",
                "font-size": "",
                "max-width": "inherit"
            })
                .insertAfter(element);
            if (elementClone.width() > origElementWidth) {
                while (elementClone.width() > origElementWidth && parseInt(elementClone.css('font-size')) > 12) {
                    elementClone.css('font-size', (parseInt(elementClone.css('font-size')) - 1) + "px");
                }
            }
            if (element.hasClass("jsModuleSubtitle") && (parseInt(elementClone.css('font-size')) > parseInt(element.siblings(".jsModuleTitle").css('font-size')))) { //ensure subtitle isn't bigger than title
                elementClone.css('font-size', (parseInt(element.siblings(".jsModuleTitle").css('font-size')) - 1) + "px");
            }
            var newFontSize = parseInt(elementClone.css('font-size'));

            element.css({
                "font-size": newFontSize + "px",
                "line-height": (newFontSize + 2) + "px",
                "visibility": "visible"
            });
            elementClone.remove();
        }
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var TopLevelMenuEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.sectionListElement = this.blockElement.find("." + options.sectionListClass)
    },
    editHandler: function () {
        sl.log("TwitterFeed edit handler");
        if (this.blockElement.find(".jsMenuName").is(":empty")) {
            this.openTopLevelSelectorDialog();
        }
        if (!this.blockElement.find(".jsDropContent ul").is(":empty")) {
            this.blockElement.find(".jsHiddenContent").removeClass("display-none")
        }
    },
    openTopLevelSelectorDialog: function () {
        var dialogHtml = this.sectionListElement.clone();
        var dialogData = {
            contentClassName: "sl-dialog-default",
            html: dialogHtml,
            dialogCallback: jQuery.proxy(this.selectSectionCallback, this)
        };
        this.currentDialog = new Dialog(dialogData);
        var afterOpen = jQuery.proxy(this.defaultRadioSelect, this)
        this.currentDialog.createDialogWithHtml(afterOpen);
    },
    selectSectionCallback: function (data) {
        if (data != false) {
            var selectedId = data.section;
            var url = "/pf4/cms2/setTLMMenuID";
            var variables = {
                edit_form_data: this.getFormDataID(),
                block_id: this.blockID,
                menu_id: selectedId
            };


            sl.addAjaxScope(variables);
            jQuery.ajax({
                url: url,
                data: variables,
                success: jQuery.proxy(this.setSectionSuccess, this)
            })
        }
    },
    setSectionSuccess: function () {
        sl.log("success");
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    },
    defaultRadioSelect: function () {
        jQuery(this.currentDialog.html).find("input[type=radio]:first").prop("checked", true)
    }


}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/2/17.
 * Globals CKEDITOR,sl *
 */

var TitleBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.initPersistentTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    selectHandler: function() {
        this.$super();
        this.blockElement.find(".jsModuleTitle").focus();
    }
}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */


var CMS2InlineRTEPlayer = BasePlayerHandler.$extend({
    __init__: function (options) {
        sl.log("CMS2InlineRTEPlayer", options);
        this.$super(options);
        this.fixTables();
        this.fixAccordionsWithVideos();
    },

    fixTables: function () {
        this.tables = this.blockElement.find("table");
        jQuery.each(this.tables, jQuery.proxy(this.modifyTable, this));
    },
    modifyTable: function (key, value) {
        sl.log("table key,value", key, value);
        var table = jQuery(value);
        var colHeads = table.find("[scope=col]");
        if (colHeads.length > 0){
            jQuery.each(colHeads, jQuery.proxy(this.processCols, this, table))
        }
        var tds = table.find("td");
        jQuery.each(tds, jQuery.proxy(this.processCells, this))
    },
    processCols: function (table, key, value) {
        sl.log("col ", key, value);
        var rows = table.find("tbody tr");
        var colHeaderText = jQuery(value).text()
        jQuery.each(rows, jQuery.proxy(this.processRow, this, key, colHeaderText))
    },
    processRow: function (colKey, colHeaderText, key, value) {
        var row = jQuery(value);
        sl.log("row", row, key, value);
        var index = colKey + (row.find("th").length == 0)
        row.find("td:nth-of-type(" + index + ")").attr("data-header", colHeaderText)
    },
    processCells: function (key, value){
        sl.log("cell",key, value)
        jQuery(value).contents().wrapAll("<div />")
    }
}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var BreadcrumbEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
    }
}) /*
 *
 *  * Copyright (c) 2004-2017, School Loop, Inc. All Rights Reserved.
 *
 *  Globals ace,sl,vex,BlockBase *
 */


var CustomBlockEditor = BaseEditHandler.$extend({
    __init__: function (options) {

        this.$super(options);
        this.codeEditor = {};
        this.saveTimeoutHandler = null;
        this.expandEditorString = options.expandEditorString;
        this.restoreEditorsString = options.restoreEditorsString;
        this.javascriptSource = null;
        this.htmlSource = null;
        this.cssSource = null;
        this.localIFrameURL = options.localIFrameURL;
        this.pageParameterName = options.pageParameterName;
        this.pageParameterValue = options.pageParameterValue;
        this.sourceHasIFrame = options.sourceHasIFrame;
        this.jsIframe = jQuery('#iframe_' + this.blockID)
        // this.initIframeListeners()
    },
    initIframeListeners: function () {
        // debugger;
        // this.jsIframe .contents().find("body").on('contextmenu', jQuery.proxy(this.iframeContextmenuHandler, this));
        // this.jsIframe.on("load",jQuery.proxy(this.iframeLoadedHandler, this))
    },


    iframeContextmenuHandler: function (event) {
        sl.log("iframeContextmenuHandler", jQuery(event.target))
        event.preventDefault();
        event.stopPropagation();
        var editor = EditCMS2Page.findModule();
        editor.contextmenuAction(this.blockElement);
    },

    loadAndOpenCodeEditor: function () {
        this.loadSource(jQuery.proxy(this.openCodeEditorDialog, this));
    },

    loadSource: function (callBack) {
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID
        };
        sl.addAjaxScope(variables);
        var url = "/pf4/cms2/getCustomBlockSource";
        jQuery.ajax({
            url: url,
            data: variables,
            context: this,
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    this.javascriptSource = window.atob(data.javascriptSource);
                    this.htmlSource = window.atob(data.htmlSource);
                    this.cssSource = window.atob(data.cssSource);
                }
                if (callBack != null) {
                    callBack();
                }
            }
        });
    },

    openCodeEditorDialog: function () {
        var dialogHtml = jQuery("#html-helpers").find("#jsCodeEditorDialog").clone();

        var openCallback = jQuery.proxy(this.setupCodePanels, this);
        var dialogData = {
            contentClassName: "sl-dialog-maxi",
            html: dialogHtml,
            showCloseButton: true,
            buttons: [],
            dialogCallback: jQuery.proxy(this.dialogLinkCallback, this)
        };
        this.codeDialog = new Dialog(dialogData);
        this.codeDialog.createDialogWithHtml(openCallback);
    },

    setupCodePanels: function () {
        this.dialogElement = jQuery(this.codeDialog.html);
        this.dialogElement.find(".jsExpandEditor").text(this.expandEditorString);
        this.previewElement = this.dialogElement.find(".jsPreviewResult");
        this.previewElement.css("max-width", this.blockElement.width());

        var codeEditors = this.dialogElement.find(".jsCodeEditor");
        var i = 0, codeType, codeEditorElement;
        for (i; i < codeEditors.length; i++) {
            codeEditorElement = jQuery(codeEditors[i]);
            codeType = codeEditorElement.data("code-type");
            codeEditorElement.attr("id", codeType)
            this.codeEditor[codeType] = ace.edit(codeType);
            this.codeEditor[codeType].setTheme("ace/theme/dreamweaver");
            this.codeEditor[codeType].getSession().setMode("ace/mode/" + codeType);
            this.codeEditor[codeType].getSession().setUseWrapMode(true);
            this.codeEditor[codeType].setShowPrintMargin(false);
            this.codeEditor[codeType].setValue(jQuery.trim(this.getPreExistingCode(codeType)));
            this.codeEditor[codeType].on("change", jQuery.proxy(this.changeHandler, this));
            this.codeEditor[codeType].getSession().selection.clearSelection();
            AceEditor.Instance().setEditor(this.codeEditor[codeType]);
        }
        this.loadPreview();
        this.initDialogListeners()
    },

    resizeCodePanels: function () {
        this.dialogElement = jQuery(this.codeDialog.html);
        var codeEditors = this.dialogElement.find(".jsCodeEditor");
        var i = 0, codeType, codeEditorElement;
        for (i; i < codeEditors.length; i++) {
            codeEditorElement = jQuery(codeEditors[i]);
            codeType = codeEditorElement.data("code-type");
            this.codeEditor[codeType].resize();
        }
    },

    getPreExistingCode: function (codeType) {
        switch (codeType) {
            case "html":
                return this.htmlSource;
            case "javascript":
                return this.javascriptSource;
            case "css":
                return this.cssSource;
        }
    },

    dialogLinkCallback: function (data) {
        if (data != false) {
            sl.log("Save data");
            var callback = jQuery.proxy(this.updateBlock, this)
            this.saveHandler(callback);
        }
    },

    changeHandler: function () {
        this.startAutosaveTimer();
    },

    saveHandler: function (callback) {
        sl.log("custom saveHandler");
        this.clearSaveTimeout();
        this.mainCallback = callback;
        if (!jQuery.isEmptyObject(this.codeEditor)) {
            jQuery.when(
                this.saveHtml(),
                this.saveCss(),
                this.saveJs()
            ).then(jQuery.proxy(this.mainCallback, this));
        } else {
            callback();
        }
    },

    saveEditorAjaxCall: function (variables, method) {
        jQuery.extend(variables, {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID
        });
        sl.addAjaxScope(variables);
        jQuery.ajax({
            type: "POST",
            context: this,
            url: "/pf4/cms2/" + method,
            data: variables
        });
    },

    saveHtml: function () {
        var variables = {html_source: this.codeEditor["html"].getValue()};
        this.saveEditorAjaxCall(variables, "setBlockHtmlSource");
    },
    saveCss: function () {
        var variables = {css_source: this.codeEditor["css"].getValue()};
        this.saveEditorAjaxCall(variables, "setBlockCssSource");
    },
    saveJs: function () {
        var variables = {js_source: this.codeEditor["javascript"].getValue()};
        this.saveEditorAjaxCall(variables, "setBlockJsSource");
    },

    initDialogListeners: function () {
        this.dialogElement.on("click", ".jsPlayPreview", jQuery.proxy(this.playPreviewHandler, this));
        this.dialogElement.on("click", ".jsExpandEditor", jQuery.proxy(this.expandEditorHandler, this))
        this.dialogElement.on("click", ".jsRestoreEditors", jQuery.proxy(this.restoreEditorsHandler, this))
    },

    playPreviewHandler: function () {
        this.saveHandler(jQuery.proxy(this.loadPreview, this));
    },

    expandEditorHandler: function (event) {
        this.targetColumnButton = jQuery(event.target);
        this.targetColumn = this.targetColumnButton.closest(".jsEditorColumn");
        var otherEditorColumns = this.dialogElement.find(".jsEditorColumn").not(this.targetColumn);
        otherEditorColumns.fadeOut("fast").promise().done(jQuery.proxy(this.expandTargetColumn, this));
    },
    expandTargetColumn: function () {
        this.targetColumn.animate({
            width: "100%"
        }, 500, jQuery.proxy(this.expandTargetColumnCallback, this));
    },
    expandTargetColumnCallback: function () {
        this.targetColumnButton.toggleClass("jsExpandEditor jsRestoreEditors").text(this.restoreEditorsString)
        this.resizeCodePanels();
    },

    restoreEditorsHandler: function (event) {
        var target = jQuery(event.target);
        target.toggleClass("jsExpandEditor jsRestoreEditors").text(this.expandEditorString);
        this.targetColumn = target.closest(".jsEditorColumn").css("width", "");
        var otherEditorColumns = this.dialogElement.find(".jsEditorColumn").not(this.targetColumn);
        otherEditorColumns.fadeIn("fast");
    },

    loadPreview: function () {
        var getURL = "/pf4/cms2/edit_page";
        var variables = {};
        variables["edit_form_data"] = this.getFormDataID();
        variables["mod"] = this.blockID;
        variables["preview"] = true;
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: getURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.getBlockSuccess, this)
        });
    },

    getBlockSuccess: function (data) {
        sl.log("getBlockSuccess", data);
        var jsPreviewElement = jQuery(data);
        jsPreviewElement.find("iframe:first").attr("id", "iframe_preview-custom")
        this.previewElement.attr("id", "block_preview-custom").empty().append(jsPreviewElement);
        var options = {
            blockID: "preview-custom",
            sourceHasIFrame: jsPreviewElement.find(".jsIframeForCustomCode").length == 0
        };

        new CustomBlockView(options);
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var CustomBlockView = BasePlayerHandler.$extend({
    __init__: function (options) {
        jQuery.extend(options, {"listenForResize": options.sourceHasIFrame})
        this.$super(options);
        this.sourceHasIFrame = options.sourceHasIFrame;
        this.iframeElement = this.blockElement.find('#iframe_' + this.blockID)
        this.addIFrameResizer();
    },

    addIFrameResizer: function()
    {
        if (this.sourceHasIFrame){
            this.sourceHasIFrameResizer();
        }
    },

    sourceHasIFrameResizer: function(){
        var origHeight = this.iframeElement.attr("height")
        var origWidth = this.iframeElement.attr("width");
        if (!isNaN(origHeight) && !isNaN(origWidth)){
            this.iframeAspectRatio = origHeight / origWidth;
            this.iframeElement.data("proportions-set", true)
            this.windowResizeFunctions();

        }
        if (!isNaN(origHeight) && isNaN(origWidth)){
            this.iframeElement.removeAttr("width")

        }
    },
    windowResizeFunctions: function(){
        if (this.iframeElement.data("proportions-set")){
            var containerWidth = this.blockElement.width();
            var newHeight = this.iframeAspectRatio * containerWidth;
            this.iframeElement.attr("height", newHeight)
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var PageTitleEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
    }
}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var SearchBoxEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
    }
}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var SocialMediaEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.mediaList = this.moduleElement.find(".sl-cms2-social-media__list");
    },

    selectHandler: function (options) {
        this.$super();
        if(options && options.selectedFromClick == true){
            this.openSocialMediaLinksDialog();
        }
    },

    openSocialMediaLinksDialog: function () {
        var url="/pf4/cms2/edit_social_media_block";
        var variables = {
            edit_form_data : this.getFormDataID(),
            block_id: this.blockID,
            no_buttons:true,
            mod:"page-wrapper"
        };
        sl.addAjaxScope(variables);
        var dialogData = {
            url: url,
            dialogCallback: jQuery.proxy(this.socialMediaCallback, this),
            contentClassName: "sl-dialog-medium",
            additonalData: variables
        };
        this.currentDialog = new Dialog(dialogData);
        this.currentDialog.createDialog();
    },

    socialMediaCallback: function (data) {
        if (data == false) {
            return;
        };
        var formID = "edit_generic_content";
        var options = {};
        options["success"] = jQuery.proxy(this.successHandler, this);
        options["dataType"] = "json";
        var formReturn = sl.ajaxSubmit("submit", formID, options);
    },

    successHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 6/22/16.
 * Globals CKEDITOR,sl *
 */

var ImageBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("image options", options);
        this.groupID = options.groupID;
        this.displayName = options.displayName;
        this.uploadURL = options.uploadURL;
        this.fromLockerURL = options.fromLockerURL;
        this.setImageFromLockerURL = options.setImageFromLockerURL;
        this.jsProgressItemTemplateClass = options.jsProgressItemTemplateClass;
        this.jsProgressItemHolderClass = options.jsProgressItemHolderClass;
        this.linkSettingUrl = options.linkSettingUrl;
        this.imageURL = options.imageURL;
        this.$super(options);
        this.preventImageDragging();
        this.initListeners();
        sl.fillSvgHolders();
    },

    initListeners: function () {
        this.blockElement.on({
            "keyup paste cut mouseup": jQuery.proxy(this.changeHandler, this)
        })
    },

    initProgressBar: function () {
        this.jsProgressItemTemplate = this.blockElement.find("." + this.jsProgressItemTemplateClass);
        this.jsProgressItemHolder = this.blockElement.find("." + this.jsProgressItemHolderClass);
        this.jsProgressItemHolder.hide();
        var options = {
            itemTemplate: this.jsProgressItemTemplate,
            itemsContainer: this.jsProgressItemHolder
        };
        this.progressInstance = new ProgressBar(options);
        this.jsProgressItemHolder.on({
            "abort": jQuery.proxy(this.abortUpload, this)
        })
    },

    abortUpload: function(){
        //var messageHtml = "Oops!  That photo is too large.  <a href='https://schoolloop.zendesk.com/hc/en-us/articles/115003364192-Recommended-dimensions-for-images' target='_blank'>Learn about requirements.</a>";
        //var dialogData = {
        //    contentClassName: "sl-dialog-medium",
        //    html: messageHtml,
        //    buttons:[
        //        jQuery.extend({}, vex.dialog.buttons.YES, {
        //            text: 'OK'
        //        })]
        //};
        //var dialog = new Dialog(dialogData);
        //dialog.createDialogWithHtml();
        this.update()
    },

    saveHandler: function (callback) {
        sl.log("ImageBlock saveHandler")
        this.saveTitleHandler(callback);
    },

    getCurrentLink: function () {
        return jQuery("#" + this.moduleID).data("link");
    },

    getOpenInNewWindow: function () {
        return jQuery("#" + this.moduleID).data("open-in-new-window");
    },

    selectFromAssetsHandler: function (editor) {
        var dialogData = {
            url: "/pf4/cms2_admin/theme_asset_list?shared_theme_data=" + EditThemeForm.GetFormDataID() + "&mod=theme_assets",
            contentClassName: "sl-dialog-medium sl-dialog-default-height",
            showCloseButton: true,
            buttons: []
        };
        this.currentDialog = new Dialog(dialogData);
        this.currentDialog.createDialog().then(jQuery.proxy(this.resolvedThemeAssetDialogHandler, this));
    },

    resolvedThemeAssetDialogHandler: function (vexElement) {
        vexElement.on("click", ".jsUseThemeAsset", jQuery.proxy(this.useThemeAsset, this));

    },

    useThemeAsset: function (event) {
        var themeAssetID = jQuery(event.currentTarget).data("asset-id");
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            asset_reference: themeAssetID
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: "/pf4/cms2/setImageBlockImageFromThemeAsset",
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.ThemeAssetCloseDialogAndUpdate, this),
            error: function (data) {
                sl.alert(data.responseText);
            }
        });
    },

    ThemeAssetCloseDialogAndUpdate: function (data) {
        sl.log("ThemeAssetCloseDialogAndUpdateFor", data)
        this.update();
        vex.close();
    },

    cropImageHandler: function() {
        this.cropImageActivate(this.blockElement.find(".jsImageModuleImageDiv"))
    },

    deselectHandler: function () {
        this.$super();
        if (this.croppieObject != null){
            this.confirmCropHandler()
        }
    },

    changeHandler: function (event) {
        sl.log("image changeHandler");
        this.startAutosaveTimer()
        var target = jQuery(event.target);
        if (this.editorInFocus && this.rteElement.has(target).length != 1 && !(target.attr("id") == this.rteEditorId)) {
            sl.log("should deselect", this.rteElement.has(target).length)
            this.deactivateRte();
        }
    },

    saveHandler: function (callback) {
        sl.log("feature story saveHandler")
        this.clearSaveTimeout();
        this.mainCallback = callback;
        this.title = this.blockElement.find(".jsModuleTitle").text();
        this.saveCaptionIfRequired = function(){};
        if (this.blockElement.find(".jsModuleCaption").length == 1) {
            this.caption = this.blockElement.find(".jsModuleCaption").text();
            this.saveCaptionIfRequired = jQuery.proxy(this.saveCaption,this)
        }
        jQuery.when(
            this.saveTitle(),
            this.saveCaptionIfRequired.call()
        ).then(jQuery.proxy(this.mainCallback, this));
    },

    saveTitle: function () {
        sl.log("saveTitle")
        var options = {
            url: "/pf4/cms2/setBlockTitle",
            attributes: {title: this.title}
        };
        return this.ajaxCallAttributeSetting(options);
    },

    saveCaption: function () {
        sl.log("saveCaption")
        var options = {
            url: "/pf4/cms2/setImageBlockCaption",
            attributes: {caption: this.caption}
        };
        return this.ajaxCallAttributeSetting(options);
    },

    update: function () {
        var editorHandler = sl.findDataInParentWithMethod("#block_" + this.blockID, "jsEditorHandler", "publicRefreshCurrentSlide")
        if (editorHandler != null) {
            editorHandler.publicRefreshCurrentSlide();
        }
        else {
            this.$super();
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 6/22/16.
 * Globals CKEDITOR,sl *
 */

var Image2 = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.imageURL = options.imageURL;
        this.fromLockerURL = options.fromLockerURL;
        this.setImageFromLockerURL = options.setImageFromLockerURL;
        this.acceptVideo = options.acceptVideo
    },

    initListeners: function () {
        this.blockElement.on({
            "keyup paste cut mouseup": jQuery.proxy(this.changeHandler, this)
        })
    },

    saveHandler: function (callback) {
        sl.log("ImageBlock saveHandler")
        this.saveTitleHandler(callback);
    },

    getCurrentLink: function () {
        return jQuery("#" + this.moduleID).data("link");
    },

    getOpenInNewWindow: function () {
        return jQuery("#" + this.moduleID).data("open-in-new-window");
    },

    selectFromAssetsHandler: function (editor) {
        var dialogData = {
            url: "/pf4/cms2_admin/theme_asset_list?shared_theme_data=" + EditThemeForm.GetFormDataID() + "&mod=theme_assets",
            contentClassName: "sl-dialog-medium sl-dialog-default-height",
            showCloseButton: true,
            buttons: []
        };
        this.currentDialog = new Dialog(dialogData);
        this.currentDialog.createDialog().then(jQuery.proxy(this.resolvedThemeAssetDialogHandler, this));
    },

    resolvedThemeAssetDialogHandler: function (vexElement) {
        vexElement.on("click", ".jsUseThemeAsset", jQuery.proxy(this.useThemeAsset, this));

    },

    useThemeAsset: function (event) {
        var themeAssetID = jQuery(event.currentTarget).data("asset-id");
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            asset_reference: themeAssetID
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: "/pf4/cms2/setImageBlockImageFromThemeAsset",
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.ThemeAssetCloseDialogAndUpdate, this),
            error: function (data) {
                sl.log("Image module useThemeAsset ajax error:", data.responseText);
            }
        });
    },

    ThemeAssetCloseDialogAndUpdate: function (data) {
        sl.log("ThemeAssetCloseDialogAndUpdateFor", data)
        this.update();
        vex.close();
    },

    cropImageHandler: function() {
        this.cropImageActivate(this.blockElement.find(".jsImageModuleImageDiv"))
    },

    deselectHandler: function () {
        this.$super();
        if (this.croppieObject != null){
            this.confirmCropHandler()
        }
    },

    changeHandler: function (event) {
        sl.log("image changeHandler");
        this.startAutosaveTimer()
        var target = jQuery(event.target);
        if (this.editorInFocus && this.rteElement.has(target).length != 1 && !(target.attr("id") == this.rteEditorId)) {
            sl.log("should deselect", this.rteElement.has(target).length)
            this.deactivateRte();
        }
    },

    saveHandler: function (callback) {
        sl.log("feature story saveHandler")
        this.clearSaveTimeout();
        this.mainCallback = callback;
        this.title = this.blockElement.find(".jsModuleTitle").text();
        this.saveCaptionIfRequired = function(){};
        if (this.blockElement.find(".jsModuleCaption").length == 1) {
            this.caption = this.blockElement.find(".jsModuleCaption").text();
            this.saveCaptionIfRequired = jQuery.proxy(this.saveCaption,this)
        }
        jQuery.when(
            this.saveTitle(),
            this.saveCaptionIfRequired.call()
        ).then(jQuery.proxy(this.mainCallback, this));
    },

    saveTitle: function () {
        sl.log("saveTitle")
        var options = {
            url: "/pf4/cms2/setBlockTitle",
            attributes: {title: this.title}
        };
        return this.ajaxCallAttributeSetting(options);
    },

    saveCaption: function () {
        sl.log("saveCaption")
        var options = {
            url: "/pf4/cms2/setImageBlockCaption",
            attributes: {caption: this.caption}
        };
        return this.ajaxCallAttributeSetting(options);
    },

    selectHandler: function (selectOptions) {
        this.$super();
        EditCMS2Page.findModule().setActiveEditableModule(this.blockElement);
    },

    update: function () {
        var editorHandler = sl.findDataInParentWithMethod("#block_" + this.blockID, "jsEditorHandler", "publicRefreshCurrentSlide")
        if (editorHandler != null) {
            editorHandler.publicRefreshCurrentSlide();
        }
        else {
            this.$super();
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/*
* dropdzone default is the blockelement
* send in option of dropzone:null if required
* */


var Uploader = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("Uploader init options", options)
        this.blockID = options.blockID;
        this.blockElement = options.blockElement;
        this.fileUploadButton = options.fileUploadButton;
        this.moduleCallback = options.doneHandler;
        this.multiplesDialog = options.multiplesDialog;
        this.slideshowInstance = options.slideshowInstance;
        this.captionsFile = options.captionsFile;
        this.acceptVideo = options.acceptVideo;
        this.videoModule = options.videoModule;
        this.promoVideo = options.promoVideo;
        var jsProgressItemTemplateClass = (this.multiplesDialog == true) ? "jsUploadMultipleItemsTemplate" : "jsUploadItemTemplate"
        if (this.multiplesDialog) {
            this.fileUploadButton.find("input").attr("multiple", true);
        }
        this.settings = {
            uploader: this,
            imageMaxWidth: 1920,
            imageMaxHeight: 1080,
            maxFileSize: 500000,
            jsProgressItemTemplate: jQuery("#html-helpers").find("." + jsProgressItemTemplateClass).clone(),
            progressHolder: this.blockElement,
            progresContainerClass: "sl-cms2-image-uploader__progress-holder",
            uploadURL: "/pf4/cms2/setImageBlockImage",
            dropzone: options.dropzone || this.blockElement
        };
        jQuery.extend(this.settings, options)
        this.dropzone = this.settings["dropzone"];
        this.dropBodyTimeout = 0;
        this.initListeners();
        this.itemMethods = {   // think this no longer used
            preview: jQuery.proxy(this.preview, this)
        }
    },

    initListeners: function () {
        sl.log("this.fileUploadButton",this.fileUploadButton);
        if (!jQuery._data(this.fileUploadButton.get(0), "events")){ // stops double listening caused by context menu.
            this.fileUploadButton.on("change", jQuery.proxy(this.fileSelectedHandler, this));
        }
        if (this.dropzone != null && this.dropzone.find(".jsDropZoneEffect").length == 0) {   // this prevents double dropzone in slideshow for video and image d&d
            this.jsDropzoneEffect = jQuery('<div />').addClass("jsDropZoneEffect").prependTo(this.dropzone);
            this.dropzone.on({
                "drop": jQuery.proxy(this.dropHandler, this),
            });

            this.dropzone.on({
                "dragover": jQuery.proxy(this.dragoverHandler, this),
            }, ".cms2-uploader__dropzone");

            this.dropzone.on({
                "dragleave": jQuery.proxy(this.dragleaveHandler, this),
            }, ".cms2-uploader__drag-zone--dragover");

            jQuery("body").on({
                'dragover': jQuery.proxy(this.bodyEnterHandler, this)
            });
        }
    },

    bodyEnterHandler: function () {
        if (this.dropBodyTimeout == 0) {
            sl.log("this.dropBodyTimeout == 0")
            if (!this.jsDropzoneEffect.hasClass("cms2-uploader__dropzone")) {
                sl.log("doesn't have cms2-uploader__dropzone")
                this.jsDropzoneEffect
                    .addClass("cms2-uploader__dropzone")
                    .css({
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    })
            }
        } else {
            clearTimeout(this.dropBodyTimeout);
        }
        this.dropBodyTimeout = setTimeout(
            jQuery.proxy(this.dropBodyTimeoutEnd, this), 100);
    },

    dropBodyTimeoutEnd: function () {
        this.dropBodyTimeout = 0;
        this.jsDropzoneEffect.removeClass("cms2-uploader__dropzone");
    },

    dragoverHandler: function (event) {
        clearTimeout(this.dropBodyTimeout);
        event.preventDefault();
        event.stopPropagation();
        this.jsDropzoneEffect.addClass("cms2-uploader__drag-zone--dragover");
    },

    dragleaveHandler: function (event) {
        sl.log("dragleaveHandler")
        event.preventDefault();
        event.stopPropagation();
        this.jsDropzoneEffect.removeClass("cms2-uploader__drag-zone--dragover");
        this.dropBodyTimeout = setTimeout(
            jQuery.proxy(this.dropBodyTimeoutEnd, this), 100);
    },

    dropHandler: function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.jsDropzoneEffect.removeClass("cms2-uploader__dropzone cms2-uploader__drag-zone--dragover")
        var event = event.originalEvent;
        this.fileSelectedHandler(event);
        this.dropBodyTimeout = 0;
    },

    fileSelectedHandler: function (event) {
        var files;
        if (event.dataTransfer) {
            files = event.dataTransfer.files;
        } else if (event.target) {
            files = event.target.files;   //this deals with the event being from file selector button click
        }

        if (files != null) { //only process if it was a file dropped
            if (this.settings.multiplesDialog) {
                this.createMultiplesDialog(files)
            } else {
                this.processFiles(files);
            }
        }
    },

    createMultiplesDialog: function (files) {
        var dialogHtml = jQuery("#html-helpers").find("#jsMultipleSlideUploadDialog").clone();
        var openCallback = jQuery.proxy(this.dialogAfterOpenHandler, this, files);
        var dialogData = {
            contentClassName: "sl-dialog-wide",
            html: dialogHtml,
            buttons: [
                jQuery.extend({}, vex.dialog.buttons.YES, {
                    className: 'vex-dialog-button-primary vex-dialog-button vex-first jsSubmitUploads',
                    text: 'Submit',
                    click: jQuery.proxy(this.submitUploads, this),

                }),
                jQuery.extend({}, vex.dialog.buttons.NO, {
                    className: 'vex-dialog-button-secondary vex-dialog-button vex-last',
                    text: 'Cancel',
                    click: jQuery.proxy(this.cancelUploads, this)
                })
            ]
        };
        var multipleSlidesDialog = new Dialog(dialogData);
        this.multipleSlidesDialog = multipleSlidesDialog.createDialogWithHtml();//openCallback
        this.dialogAfterOpenHandler(files);
    },

    dialogAfterOpenHandler: function (files) {
        this.multipleSlidesDialog.closest(".vex-content").find(".jsSubmitUploads").attr("disabled", true)
        this.setupProgressContainer(files)
    },

    submitUploads: function () {
        sl.log("submit")
        this.moduleCallback(this.uploadFiles, this.blockID); //the blockID is of the added slide, for deletion
    },

    cancelUploads: function () {
        sl.log("cancelUploads");
        this.uploadFiles = [];
        this.moduleCallback(this.uploadFiles, this.blockID);
        vex.closeAll();
    },

    setupProgressContainer: function (files) {
        this.settings["progressHolder"] = this.multipleSlidesDialog.find(".jsMultipleSlidesProgressHolder");
        this.settings["addSlideMethod"](jQuery.proxy(this.newSlideAddedHandler, this, files))
    },

    newSlideAddedHandler: function (files, id) {
        this.blockID = id;
        this.processFiles(files);
    },

    processFiles: function (files) {
        sl.log("processFiles ", files);
        var data = [];
        var i;
        var file_options = {
            blockID: this.blockID,
            groupID: this.groupID // doesn't seem to be used
        };
        jQuery.extend(this.settings, file_options); //
        this.uploadFiles = [];
        for (i = 0; i < files.length; i++) {
            this.uploadFiles[i] = new FileForUpload(files[i], this.settings);
        }
    },

    fileUploadedCallback: function (data, file) {    //data is url for slideshow
        this.deselectIfOtherActive();
        if (this.settings.multiplesDialog) {
            sl.log("image_uploader fileUploadedCallback with data", data);
            sl.log("uploadFiles", this.uploadFiles, file);
            var i;
            jQuery.each(this.uploadFiles, jQuery.proxy(this.addFilePathToUploadFile, this, data, file))
            var allDone = this.checkAllFilesUploaded();
            sl.log("allDOne", allDone)
            if (allDone) {
                this.multipleSlidesDialog.find(".jsTimeRemaining").text("Finished")
                this.multipleSlidesDialog.closest(".vex-content").find(".jsSubmitUploads").attr("disabled", false)
            }
        }
        else {
            this.moduleCallback(data);
        }
    },
    deselectIfOtherActive: function () {   // need to deselct active module if it's not the one uploaded to
        var editor = EditCMS2Page.findModule();
        var activeID = editor.getActiveEditableModuleID();
        var blockToCheckAgainst = this.blockID;
        if (this.slideshowInstance && this.slideshowInstance.blockID == activeID) {          //don't deselect if uploaded to an active slideshow
            blockToCheckAgainst = this.slideshowInstance.blockID;
        } else if (this.slideshowInstance && this.slideshowInstance.blockElement.find("[jsid=" + activeID + "]").length > 0) {
            activeID = blockToCheckAgainst;
        }
        if (activeID && activeID != blockToCheckAgainst) {
            sl.log("deselecting from uploader");
            editor.deselectClickHandler();
        }
    },

    fileCancelledCallback: function (file) {
        jQuery.each(this.uploadFiles, jQuery.proxy(this.removeFileFromUploads, this, file))
    },

    removeFileFromUploads: function (file, key, value) {
        if (value && value.file === file) {
            this.uploadFiles.splice(key, 1)
        }
        if (this.uploadFiles.length == 0) {
            if (this.multipleSlidesDialog) {
                vex.close(this.multipleSlidesDialog.data().vex.id);
            }
            this.moduleCallback(this.uploadFiles, this.blockID);
        }
    },

    addFilePathToUploadFile: function (data, file, key, value) {
        if (value.file === file) {
            value.filePath = data;
        }
    },

    checkAllFilesUploaded: function () {
        sl.log("checkAllFilesUploaded")
        var value = true
        var i;
        for (i = 0; i < this.uploadFiles.length; i++) {
            sl.log("checkAllFilesUploaded this.uploadFiles[i]", i, this.uploadFiles[i])
            if (this.uploadFiles[i].filePath == null) {
                value = false;
                sl.log("one file not finished", this.uploadFiles[i])
                break;
            }
        }
        return value;
    }
});

var ImageResizer = Uploader.$extend({  //used when adding image from locker
    __init__: function (options) {
        this.$super(options);
        var file = {
            embed_url: options.embed_url,
            name: "locker_image.jpg"
        };
        var locker_resource_options = {
            blockID: options.block_id,
            fileUploadedCallback: options.callback,
            groupID: options.groupID, // doesn't seem to be used
            name: options.title,
            progressHolder: options.blockElement,
        };
        jQuery.extend(this.settings, locker_resource_options)
        sl.log("ImageResizer file_options", file, this.settings)
        new FileForUpload(file, this.settings);
    },
    initListeners: function () {
    }
});

var DirectImageUploader = Uploader.$extend({  //used when adding image from svg library
    __init__: function (options) {
        this.$super(options);
        var directImageOptions = {
            blockID: options.block_id,
            fileUploadedCallback: options.callback,
            groupID: options.groupID,
            progressHolder: options.blockElement,
            directImage: true
        };
        jQuery.extend(this.settings, directImageOptions)
        fetch(options.embed_url)
            .then(jQuery.proxy(this.fileFetchedHandler,this))
            .then(jQuery.proxy(this.arrayBufferHandler, this))
    },
    fileFetchedHandler: function(response) {
        return response.arrayBuffer();
    },
    arrayBufferHandler: function(blob) {
        var file = new File([blob], 'dot.svg', {type: "image/svg+xml"}); // fix this if other filetypes possible
        new FileForUpload(file, this.settings);
    },
    initListeners: function () { //to avoid main class's listeners
    }
});

var FileUploader = Uploader.$extend({       //used when adding file to locker module
    __init__: function (options, editor) {
        sl.log("Uploader init options", options);
        this.lockerEditor = editor
        this.$super(options);
        // this.jsDropzoneEffect.addClass("cms2-uploader__dropzone--file");
        var directOptions = {
            uploader: this,
            uploadURL: '/locker2/uploadFile',// ---- where the URL goes
            directUpload: true,
        };
        jQuery.extend(this.settings, directOptions)
    },

    fileSelectedHandler: function (event) {
        var files;
        this.settings["lockerBlockPlayer"] = this.lockerEditor.getLockerBlockPlayer();
        if (event.dataTransfer) {
            files = event.dataTransfer.files;
        } else if (event.target) {
            files = event.target.files;   //this deals with the event being from file selector button click
        }
        sl.log("FileUploader file_options", this.settings, "files", files)

        var i, file;
        for (i = 0; i < files.length; i++) {
            file = files[i];
            if (file.type == "") {
                sl.alert("You cannot upload folders:<p><strong>" + file.name + "</strong></p>")
            } else {
                new FileForUpload(file, this.settings);
            }
        }
    },

    dragoverHandler: function (event) {
        this.$super(event)
        this.jsDropzoneEffect.addClass("cms2-uploader__drag-zone__file--dragover");
    }
});


//Class for each file for upload
var FileForUpload = BaseEditHandler.$extend({
    __init__: function (file, file_options) {
        sl.log("FileForUpload init options", file_options);

        this.uploader = file_options.uploader;
        this.file = file;
        if (this.file.embed_url != null) {
            this.file.name = file_options.name;
        }
        this.blockID = file_options.blockID;
        this.groupID = file_options.groupID;
        this.fileUploadedCallback = file_options.fileUploadedCallback;
        this.progressHolder = file_options.progressHolder
        this.previewCanvas = jQuery('<canvas class="jsPreviewCanvasTemplate cms2-uploader__preview-canvas"></canvas>');   //this.previewCanvas should be removed after upload
        this.previewHolder = jQuery('<div class="jsPreviewHolder preview-holder"></div>');
        this.jsProgressItemTemplate = file_options.jsProgressItemTemplate;
        this.multiplesDialog = file_options.multiplesDialog;
        this.captionsFile = file_options.captionsFile;
        this.acceptVideo = file_options.acceptVideo;
        this.directImage = file_options.directImage;
        this.videoModule = file_options.videoModule;
        this.promoVideo = file_options.promoVideo;
        jQuery("body").append(this.previewHolder);
        this.settings = file_options;
        sl.startWaitingScreen(this.settings.progressHolder);

        if (this.settings["directUpload"]) {
            this.lockerBlockPlayer = file_options.lockerBlockPlayer;
            this.directUpload();
        } else {
            this.setupFileReader();
        }
    },

    setupFileReader: function () {
        sl.log("setupFileReader")
        if (this.file.embed_url != null) {      //for lockers or remote images
            var img = new Image();
            img.addEventListener("load", jQuery.proxy(this.imageLoaded, this, img));
            img.crossOrigin = "Anonymous";
            img.src = this.file.embed_url;
        } else if (this.directImage == true) {

            this.file.name = this.setFileType();
            this.uploadImage();
        } else {
            var fileReader = new FileReader();
            fileReader.onload = jQuery.proxy(this.onloadHandler, this);

            fileReader.onerror = jQuery.proxy(this.onFileReaderErrorHandler, this);
            fileReader.readAsDataURL(this.file);
        }
    },
    onFileReaderErrorHandler: function (msg) {
        sl.alert("There is a problem reading this file as an image: <p><strong>" + this.file["name"] + "</strong></p>");
        this.uploader.fileCancelledCallback(this.file);
    },

    onloadHandler: function (event) {
        sl.log("fileData,event", event);
        if (this.videoModule ||  this.acceptVideo) {
         if(this.checkForVideoExtension()) {
            sl.log("this is a video", this.file);
            var source = URL.createObjectURL(this.file)
            this.video = jQuery('<video muted class="cms2-uploader__preview-canvas"></video>');
            this.video_loaded_events_fired = 0;
            this.video.on('loadedmetadata loadeddata suspend', jQuery.proxy(this.videoLoaded, this));
            var sourceElement = jQuery("<source />").prop({
                "type": "video/mp4",
                "src": source
            });
            this.video.appendTo(document.body);
            this.video.append(sourceElement) ;
            return true;
            // this.doAjaxCall();
            }else if(this.videoModule || this.promoVideo) {
             sl.alert("Sorry, please upload valid video type (.mov, .mp4)");
             this.uploader.fileCancelledCallback(this.file);
             return true;
         }
        }
        if (this.checkForCaptionsFile()) {
            this.doAjaxCall();
        }
        else if (this.validateImageExtension()) {
            var img = new Image();
            img.addEventListener("load", jQuery.proxy(this.imageLoaded, this, img));
            img.src = event.target.result;
        }
    },

    checkForCaptionsFile: function () {
        return (this.captionsFile == true);  // could put a test for captions extensions here
    },

    videoLoaded: function () {
        sl.log("videoLoaded", this.video_loaded_events_fired)
        if (++this.video_loaded_events_fired == 3) {
            this.doAjaxCall();
        }
    },

    beforeVideoSendHandler: function () {
        sl.log("beforeVideoSendHandler");
        this.progressContainer.append(this.video);
        this.beforeSendHandler();
    },

    checkForVideoExtension: function () {
        var videoFileTypes = (/\.(mp4|mov)$/i);
        var returnValue = false;
        if (videoFileTypes.test(this.file.name)) {
            returnValue = true;
        }

        return returnValue;
    },

    acceptVideoCheck: function () {
        if (this.acceptVideo != true) {
            sl.alert("Sorry, please upload valid image type (.jpg, .jpeg, .png, .gif)");
            this.uploader.fileCancelledCallback(this.file);
            return true;
        }
        return true;

    },

    validateImageExtension: function () {
        var imageFileTypes = (this.multiplesDialog) ? (/\.(gif|jpg|jpeg|png|bmp)$/i) : (/\.(gif|jpg|jpeg|png|bmp|svg)$/i);
        if (imageFileTypes.test(this.file.name)) {
            return true;
        } else {
            sl.alert("Sorry, please upload valid image type (.jpg, .jpeg, .png, .gif)");
            this.uploader.fileCancelledCallback(this.file);
            return false;
        }
    },

    imageLoaded: function (img) {
        this.img = img;
        sl.log("dimensions", img.width, img.height);
        this.origImgWidth = img.width;
        this.origImgHeight = img.height;
        if (this.areDimensionsOversized()) {
            var ratioX = this.settings.imageMaxWidth / this.origImgWidth;
            var ratioY = this.settings.imageMaxHeight / this.origImgHeight;
            var ratio = Math.min(ratioX, ratioY);
            var newWidth = this.origImgWidth * ratio;
            var newHeight = this.origImgHeight * ratio;
            this.contextCanvas = this.convertToCanvas(newWidth, newHeight, img);
            this.file.name = this.setFileType();
            this.checkCanvasFileSize()
            this.uploadImage()
        }
        else if (this.isFileTooBig() || this.file.embed_url != null) { // force processing if remote
            this.contextCanvas = this.convertToCanvas(this.origImgWidth, this.origImgHeight, img);
            this.file.name = this.setFileType();
            this.checkCanvasFileSize()
            this.uploadImage();
        }
        else if (this.file.embed_url != null ) {
            this.file = new File(this.file.embed_url);
            this.uploadImage();

        } else {
            this.uploadImage();
        }
    },

    doAjaxCall: function (optionalFormData) {
        var data;
        
        if (optionalFormData != null) {
            data = optionalFormData
        } else {
            data = new FormData();
            data.append('edit_form_data', this.getFormDataID());
            data.append('block_id', this.blockID);
            data.append('group_id', this.groupID);
            data.append('files[]', this.file);
        }

        this.ajaxCall = jQuery.ajax({
            beforeSend: jQuery.proxy(this.beforeSendHandler, this),
            xhr: jQuery.proxy(this.xhrHandler, this),
            url: this.settings.uploadURL,
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
        })
            .done(jQuery.proxy(this.fileDoneHandler, this));
    },

    setFileType: function () {
        var orignalFilename = this.file.name;
        var extension = orignalFilename.substring(orignalFilename.lastIndexOf('.') + 1).toLowerCase();
        var newname;
        switch (extension) {
            case "jpg":
            case "jpeg":
                this.filetype = "jpeg"
                newname = orignalFilename;
                break;
            case "png":
                this.filetype = "png"
                newname = orignalFilename;
                break;
            case "gif":
                this.filetype = "gif"
                newname = orignalFilename;
                break;
            case "svg":
                this.filetype = "svg"
                newname = orignalFilename;
                break;
            case "bmp":
                this.filetype = "jpeg"
                newname = orignalFilename.slice(0, -3) + "jpeg";
                break;
            default:
                this.filetype = "jpeg"
                newname = "invalid"
        }
        return newname;
    },

    checkCanvasFileSize: function () {
        var dataURL = this.contextCanvas.toDataURL("image/" + this.filetype)
        var head = 'data:image/png;base64,';
        this.canvasFileSize = Math.round((dataURL.length - head.length) * 3 / 4);
        sl.log("canvasFileSize before", this.canvasFileSize);
        var cloneWidth
        var cloneHeight;
        while (this.canvasFileSize > this.settings.maxFileSize) {
            cloneWidth = this.previewCanvasClone.width();
            cloneHeight = this.previewCanvasClone.height();
            this.previewCanvasClone.attr("width", cloneWidth * 0.9)
                .attr("height", cloneHeight * 0.9);
            sl.log("cloneWidth", cloneWidth)
            this.context.drawImage(this.img, 0, 0, cloneWidth * 0.9, cloneHeight * 0.9)
            dataURL = this.previewCanvasClone[0].toDataURL("image/" + this.filetype)
            this.canvasFileSize = Math.round((dataURL.length - head.length) * 3 / 4);
            sl.log("canvasFileSize during resize", this.canvasFileSize)
        }
    },

    convertToCanvas: function (width, height, img) {
        this.previewCanvasClone = this.previewCanvas
            .clone()
            .attr("width", width)
            .attr("height", height);
        this.previewHolder.append(this.previewCanvasClone);
        this.context = this.previewCanvasClone[0].getContext("2d")
        this.context.drawImage(img, 0, 0, width, height)
        return this.context.canvas;
    },

    directUpload: function () {
        sl.log("directUpload");
        var formData = new FormData();
        formData.append('files[]', this.file);
        var folderID = this.lockerBlockPlayer.getCurrentFolderID();
        var blockGroupID = this.lockerBlockPlayer.getBlockGroupID();
        if (folderID != null) {
            formData.append("folder_id", folderID);
        } else if (blockGroupID != "") {
            formData.append("group_id", blockGroupID);
        } else {
            formData.append('group_id', this.groupID);
        }
        this.doAjaxCall(formData);
    },

    uploadImage: function () {
        if (this.contextCanvas != null) {
            var filename = this.file.name;
            var dataURL = this.contextCanvas.toDataURL("image/" + this.filetype);
            var blob = window.dataURLtoBlob(dataURL);  //using function from old library
            this.file = new File([blob], filename, {type: 'image/' + this.filetype});
            this.doAjaxCall();
        } else {
            this.doAjaxCall();
        }
    },

    beforeSendHandler: function (ev, data) {
        sl.log("beforeSendHandler")
        sl.stopWaitingScreen();
        this.progressContainer = jQuery("<div />")
            .addClass(this.settings.progresContainerClass);
        this.settings.progressHolder.append(this.progressContainer);
        this.progressBar = this.renderProgressBar();
        this.progressContainer.append(this.progressBar);
    },

    xhrHandler: function (ev, data) {
        var xhr = new window.XMLHttpRequest();
        xhr.upload.addEventListener("progress", jQuery.proxy(this.progressHandler, this), false);
        this.progressContainer.on({"click": jQuery.proxy(this.abortUpload, this)}, ".jsActionButton")
        return xhr;
    },

    progressHandler: function (evt) {
        if (evt.lengthComputable) {
            var progress = evt.loaded / evt.total;
            if (this.progressBar.submitted == null) {
                this.progressBar.submitted = new Date().getTime();
                sl.log("set submitted at ", this.progressBar.submitted)
            }
            var percentComplete = parseInt(progress * 100);
            var progressBar = this.progressBar.find(".jsProgressbar");
            progressBar.progressbar();
            progressBar.progressbar("option", "value", percentComplete);
            var timeSpent = new Date().getTime() - this.progressBar.submitted;
            var secondsRemaining = Math.round(((timeSpent / progress) - timeSpent) / 1000);
            this.progressBar.find(".jsTimeRemaining").text(this._formatTime(secondsRemaining));
            if (percentComplete === 100) {
                this.progressBar.find(".jsTimeRemaining").text("Finishing up...")
            }
        }
    },

    renderProgressBar: function () {
        sl.log("renderProgressBar")
        var template = this.jsProgressItemTemplate.clone().addClass("sl-cms2-image-uploader__progress-item");
        template.find(".jsFileName").text(this.truncateFileName(this.file.name, 30));
        var file_size = (this.file.size) ? this.formatFileSize(this.file.size) : "";
        file_size += (this.canvasFileSize && this.canvasFileSize != this.file.size) ? " Compressed to -> " + this.formatFileSize(this.canvasFileSize) : "";
        template.find(".jsSize").text(file_size);
        if (!this.settings["directUpload"] && !this.settings["captionsFile"]  && !this.settings["directImage"]) {
            this.addThumbnail(template);
        }
        return template;
    },

    truncateFileName: function (filename, charLimit) {
        var filenameSplit = filename.split('.');
        if (filenameSplit[0].length > charLimit) {
            var truncatedFileName = filenameSplit[0].substring(0, charLimit);
            return truncatedFileName + '...' + filenameSplit[1];
        } else {
            return filename;
        }
    },

    abortUpload: function (event) {
        this.ajaxCall.abort();
        this.progressContainer.remove();
        this.uploader.fileCancelledCallback(this.file);

    },

    addThumbnail: function (template) {
        var thumb = template.find('.jsThumbnail');
        var thumbWidth = thumb.attr('width');
        var thumbHeight = thumb.attr('height');
        thumb.addClass('sl-cms2-image-uploader__thumbnail-visible');

        //grab the context from your destination canvas
        var thumbContext = thumb[0].getContext('2d');
        //call its drawImage() function passing it the source canvas directly
        if (this.video != null) {
            this.drawCanvasCover(thumbContext, this.video, thumbWidth, thumbHeight);
        }
        else if (this.contextCanvas != null) {
            this.drawCanvasCover(thumbContext, this.contextCanvas, thumbWidth, thumbHeight);

        } else {
            this.drawCanvasCover(thumbContext, this.img, thumbWidth, thumbHeight);
        }
    },

    drawCanvasCover: function (context, img, canvasWidth, canvasHeight) {
        var imageWidth = (img instanceof jQuery) ? img.width() : img.width,   // to handle jQuery objects, video
            imageHeight = (img instanceof jQuery) ? img.height() : img.height,
            leastRatio = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight),
            newWidth = imageWidth * leastRatio,   // new prop. width
            newHeight = imageHeight * leastRatio,   // new prop. height
            sourceOffsetX, sourceOffsetY, sourceWidth, sourceHeight, resizeRatio = 1;

        // decide which gap to fill
        if (newWidth < canvasWidth) resizeRatio = canvasWidth / newWidth;
        if (Math.abs(resizeRatio - 1) < 1e-14 && newHeight < canvasHeight) resizeRatio = canvasHeight / newHeight;  // updated
        newWidth *= resizeRatio;
        newHeight *= resizeRatio;

        // calc source rectangle
        sourceWidth = imageWidth / (newWidth / canvasWidth);
        sourceHeight = imageHeight / (newHeight / canvasHeight);

        sourceOffsetX = (imageWidth - sourceWidth) * 0.5;
        sourceOffsetY = (imageHeight - sourceHeight) * 0.5;
        // make sure source rectangle is valid
        if (sourceOffsetX < 0) sourceOffsetX = 0;
        if (sourceOffsetY < 0) sourceOffsetY = 0;
        if (sourceWidth > imageWidth) sourceWidth = imageWidth;
        if (sourceHeight > imageHeight) sourceHeight = imageHeight;

        if (img instanceof jQuery) {
            img = img[0];
        }
        // fill image in dest. rectangle
        context.drawImage(img, sourceOffsetX, sourceOffsetY, sourceWidth, sourceHeight, 0, 0, canvasWidth, canvasHeight);
    },

    formatFileSize: function (bytes, unit) {
        if (bytes < (unit = unit || 1000)) {
            return bytes + " Bytes";
        }
        var exp = Math.floor(Math.log(bytes) / Math.log(unit));
        var pre = ' ' + (unit === 1000 ? "kMGTPE" : "KMGTPE").charAt(exp - 1) + (unit === 1000 ? "" : "i") + 'B';
        return (bytes / Math.pow(unit, exp)).toFixed(1) + pre;
    },

    _formatBitrate: function (bits) {
        if (typeof bits !== 'number') {
            return '';
        }
        if (bits >= 1000000000) {
            return (bits / 1000000000).toFixed(2) + ' Gbit/s';
        }
        if (bits >= 1000000) {
            return (bits / 1000000).toFixed(2) + ' Mbit/s';
        }
        if (bits >= 1000) {
            return (bits / 1000).toFixed(2) + ' kbit/s';
        }
        return bits.toFixed(2) + ' bit/s';
    },
    _formatTime: function (seconds) {
        var date = new Date(seconds * 1000),
            days = Math.floor(seconds / 86400);
        days = days ? days + 'd ' : '';

        var hours = (date.getUTCHours() == 0) ? "" : date.getUTCHours() + "hours ";
        var mins = (date.getUTCMinutes() == 0 && date.getUTCHours() == 0) ? "" : date.getUTCMinutes() + "minutes ";
        var secs = date.getUTCSeconds() + "secs ";
        return hours.concat(mins, secs)
    },

    _formatPercentage: function (floatValue) {
        return (floatValue * 100).toFixed(2) + ' %';
    },

    fileDoneHandler: function (data) {
        if (this.multiplesDialog != true) {
            this.progressContainer.remove(); // don't do this for multiples
        }
        this.uploader.fileUploadedCallback(data, this.file);
    },

    areDimensionsOversized: function () {
        return this.origImgWidth > this.settings.imageMaxWidth || this.origImgHeight > this.settings.imageMaxHeight;
    },

    isFileTooBig: function () {
        return this.file.size > this.settings.maxFileSize;
    },
    getResizedDimensions: function (maxWidth, maxHeight) {
        var ratioX = maxWidth / this.origImgWidth;
        var ratioY = maxHeight / this.origImgHeight;
        var ratio = Math.min(ratioX, ratioY);
        var newWidth = this.origImgWidth * ratio;
        var newHeight = this.origImgHeight * ratio;
        return {width: newWidth, height: newHeight}
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/*
* file upload is now handled by base_edit_handler and toolbar
*/

var VideoBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("video options", options);
        this.groupID = options.groupID;
        this.displayName = options.displayName;
        this.uploadURL = options.uploadURL;
        this.uploadCaptionsURL = options.uploadCaptionsURL;
        this.fromLockerURL = options.fromLockerURL;
        this.setImageFromLockerURL = options.setImageFromLockerURL;
        this.jsProgressItemTemplateClass = options.jsProgressItemTemplateClass;
        this.jsProgressItemHolderClass = options.jsProgressItemHolderClass;
        this.imageURL = options.imageURL;
        this.$super(options);
        this.preventImageDragging();
        this.initListeners();
        this.setupVideo();
    },

    initListeners: function () {
        this.initTitleListener();
    },

    initProgressBar: function () {
        this.jsProgressItemTemplate = this.blockElement.find("." + this.jsProgressItemTemplateClass);
        this.jsProgressItemHolder = this.blockElement.find("." + this.jsProgressItemHolderClass);
        this.jsProgressItemHolder.hide();
        var options = {
            itemTemplate: this.jsProgressItemTemplate,
            itemsContainer: this.jsProgressItemHolder
        };
        this.progressInstance = new ProgressBar(options);
    },

    setupVideo: function () {
        plyr.setup("#" + this.block_id +"_jsPlyrVideo");
    },

    saveHandler: function (callback) {
        sl.log("VideoBlock saveHandler")
        this.saveTitleHandler(callback);
    },

    getOpenInNewWindow: function () {
        return jQuery("#" + this.moduleID).data("open-in-new-window");
    },

    selectResource: function (resourceID, title, url, embedURL, isGoogle, externalID) {
            var variables = {
                edit_form_data: this.getFormDataID(),
                block_id: this.blockID,
                resource_id: resourceID,
                title: title,
                link_url: url,
                embed_url: embedURL
            };
            if (isGoogle) {
                variables.google_id = "true";
                variables.external_id = externalID;
            }
            sl.addAjaxScope(variables);

            jQuery.ajax({
                url: this.setImageFromLockerURL,
                type: "GET",
                data: variables,
                context: this,
                success: jQuery.proxy(this.closeDialogAndUpdate, this),
                error: function (data) {
                    sl.alert(data.responseText);
                }
            });
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/2/17.
 * Globals CKEDITOR,sl *
 */

var GoogleCalendarBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.initTitleListener();
    },

    editHandler: function () {
     sl.log("Google Claendar edit handler");
     if (this.moduleElement.data("is-empty")){
         this.openOptionsDialog();
     }
   },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },


    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_google_calendar_block";
        var variables = {
            mod: "edit_generic_content",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_generic_content";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/2/17.
 * Globals CKEDITOR,sl *
 */

var GoogleFormsBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.initTitleListener();
    },

    editHandler: function () {
     sl.log("Google Claendar edit handler");
     if (this.moduleElement.data("is-empty")){
         this.openOptionsDialog();
     }
   },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },


    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_google_forms_block";
        var variables = {
            mod: "edit_generic_content",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_generic_content";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/2/17.
 * Globals CKEDITOR,sl *
 */

var GoogleMapsBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.initTitleListener();
    },

    editHandler: function () {
     sl.log("Google Maps edit handler");
     if (this.moduleElement.data("is-empty")){
         this.openOptionsDialog();
     }
   },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },


    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_google_maps_block";
        var variables = {
            mod: "edit_generic_content",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_generic_content";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/2/17.
 * Globals CKEDITOR,sl *
 */

var GoogleTranslateBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    }

}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var RSSFeedEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.isParentSquare = options.isParentSquare === "true";
    },

    initListeners: function () {
        this.initTitleListener();
    },

    editHandler: function () {
        if (this.moduleElement.data("is-empty")){
            this.openOptionsDialog()
        }
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url;
        if (this.isParentSquare)
        {
            url = "/pf4/cms2/edit_rss_parent_square_feed";
        }
        else
        {
            url = "/pf4/cms2/edit_rss_feed";
        }
        var variables = {
            mod: "edit_rss_feed",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_rss_feed";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        this.updateBlock();
    },

}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var RSSShowcaseEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.isParentSquare = options.isParentSquare === "true";
    },

    initListeners: function () {
        this.initTitleListener();
    },

    editHandler: function () {
        if (this.moduleElement.data("is-empty")){
            this.openOptionsDialog()
        }
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_rss_showcase";
        var variables = {
            mod: "edit_rss_feed",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_rss_feed";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        this.updateBlock();
    },

});

var RSSShowcasePlayer = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
    },

    submitSuccessHandler: function () {
        this.updateBlock();
    },

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var RSSShowcasePlayer = BasePlayerHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.autoRotate = options.autoRotate;
        this.isParentSquare = options.isParentSquare === "true";

        this.rotationIndex = 0;
        this.autoRotationInterval = 20000;
        this.animationSpeed = 300;
        this.showcaseContainer = this.blockElement.find('.jsRssShowcaseContainer');
        this.showcaseItem = this.blockElement.find('.jsShowcaseItem');
        this.showcaseDisplay = this.blockElement.find('.jsRssShowcaseDisplay');
        this.slider = this.blockElement.find('.jsSlider');
        this.navDotContainer = this.blockElement.find('.jsNavDots');
        this.initialized = false;
        this.initialPreSetup();
    },

    setUpNavigationListeners: function () {
        jQuery(window).on('keydown', jQuery.proxy(this.keydownHandler, this));
        this.blockElement.find(".jsRssShowcaseNavPrev").on('click keypress', jQuery.proxy(this.rssShowcaseNav, this, 'prev'));
        this.blockElement.find(".jsRssShowcaseNavNext").on('click keypress', jQuery.proxy(this.rssShowcaseNav, this, 'next'));
    },

    keydownHandler: function (e) {
        var keyCode = e.keyCode || e.which;
        switch (keyCode) {
            case sl.keyboard["LEFT"] :
                this.calendarNav('prev', e);
                break;
            case sl.keyboard["RIGHT"] :
                this.calendarNav('next', e);
                break;
            default :
                return;
        }
    },

    windowResizeFunctions: function () {
        var containers = this.containers;
        jQuery.each(containers, jQuery.proxy(this.replaceEachStoryWithData, this));
        this.clampFunctions();
    },

    replaceEachStoryWithData: function (index, value) {
        var jsItem = jQuery(value);
        jsItem.find(".sl-cms2-rss-showcase__item-description p:first").empty().text(jsItem.data("full-story"));
        jsItem.find(".sl-cms2-rss-showcase__item-title p").empty().text(jsItem.data("full-title"));
    },

    initialPreSetup: function () {
        this.blockElement.on({
            containerChangedSize: jQuery.proxy(this.containerChangedSizeHandler, this),
        });
    },

    initialSetup: function () {
        this.setUpNavigationListeners();
        this.initializeDisplayParameters();
        this.writeShowcase();
        this.writeNavDots();
        this.selectCurrentNavDot();
        this.showHideNav();
        if (!this.isMobile) {
            this.startAutoRotate();
        }

    },

    startAutoRotate: function () {
        if (this.autoRotate) {
            this.timer = setInterval(jQuery.proxy(this.rotateForwards, this), this.autoRotationInterval);
        }
    },

    stopAutoRotate: function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },

    containerChangedSizeHandler: function () {
        if (!this.initialized) {
            this.initialSetup();
            this.initialized = true;
        } else {
            this.updateDisplay();
        }
    },

    initializeDisplayParameters: function () {
        this.numberPresent = this.showcaseContainer.find('.jsShowcaseItem').length;
        this.numberDisplayed = this.getNumberDisplayed();

    },

    showHideNav: function () {
        if (this.numberDisplayed === this.numberPresent) {
            this.blockElement.find(".jsRssShowcaseNavPrev").hide();
            this.blockElement.find(".jsRssShowcaseNavNext").hide();
            this.navDotContainer.hide();
        } else {
            this.blockElement.find(".jsRssShowcaseNavPrev").show();
            this.blockElement.find(".jsRssShowcaseNavNext").show();
            this.navDotContainer.show();
        }

    },

    getNumberDisplayed: function () {
        var displayNum;
        if (this.blockElement.hasClass('sl_element_query_ipad_portrait')) {
            displayNum = 2;
            this.isMobile = false;
        } else if (this.blockElement.hasClass('sl_element_query_mobile_landscape') ||
            this.blockElement.hasClass('sl_element_query_mobile_portrait')) {
            displayNum = this.numberPresent;
            this.isMobile = true;
        }
        else {
            displayNum = 3;
            this.isMobile = false;
        }

        return displayNum;
    },

    updateDisplay: function () {
        var preUpdateMobile = this.isMobile;
        var numDisplayed = this.getNumberDisplayed();
        sl.log('update display called', numDisplayed, this.numberDisplayed);
        if (numDisplayed != this.numberDisplayed) {
            this.numberDisplayed = numDisplayed;
            this.rotationIndex = 0;
            this.showcaseDisplay.empty();
            this.writeShowcase();
            this.selectCurrentNavDot();
            this.showHideNav();
            (!this.isMobile && preUpdateMobile) ? this.startAutoRotate() : this.stopAutoRotate();
        }
    },

    writeShowcase: function () {
        var item;
        for (var i = 0; i < this.numberDisplayed; i++) {
            item = this.showcaseItem.eq(this.trueModulo(i + this.rotationIndex, this.numberPresent)).clone().appendTo(this.showcaseDisplay);
        }
        this.clampFunctions();
    },

    clampFunctions: function () {
        this.containers = this.showcaseDisplay.find(".jsShowcaseItem");
        jQuery.each(this.containers, jQuery.proxy(this.saveFullTitleStoryAsData, this))
        sl.textClamper(this.containers, "sl-cms2-rss-showcase__item-title");
        this.shrinkTitleFontsIfClamped();
        sl.textClamper(this.containers, "sl-cms2-rss-showcase__item-description");
    },


    saveFullTitleStoryAsData: function (index, value) {
        var jsItem = jQuery(value);
        jsItem.data("full-title", jsItem.find(".sl-cms2-rss-showcase__item-title").text())
        jsItem.data("full-story", jsItem.find(".sl-cms2-rss-showcase__item-description").text())
    },

    shrinkTitleFontsIfClamped: function () {
        jQuery.each(this.containers, jQuery.proxy(this.checkIfTitleShrunk, this))
    },

    checkIfTitleShrunk: function (index, value) {
        var jsItem = jQuery(value);
        if (jsItem.data("full-title") != jsItem.find(".sl-cms2-rss-showcase__item-title").text()) {
            jsItem.find(".sl-cms2-rss-showcase__item-title").text(jsItem.data("full-title"));
            this.resizeFontForThisElement(jsItem.find(".sl-cms2-rss-showcase__item-title"))
        }
    },


    writeNavDots: function () {
        var navDotButtonTemplate = this.blockElement.find('.jsHiddenContainer .jsNavDotsButton');

        for (var i = 0; i < this.numberPresent; i++) {
            navDotButtonTemplate.clone().appendTo(this.navDotContainer)
                .text("Slide " + (i + 1))
                .click(jQuery.proxy(this.goToRotationIndex, this, i));
        }
    },

    goToRotationIndex: function (selectedDotIndex) {
        var currentDotIndex = this.trueModulo(this.rotationIndex, this.numberPresent);
        this.stopAutoRotate();

        if (selectedDotIndex === currentDotIndex) {
            return;
        } else if (selectedDotIndex > currentDotIndex) {
            this.rotationIndex = this.trueModulo(selectedDotIndex - 1, this.numberPresent);
            this.showcaseDisplay.empty();
            this.writeShowcase();
            this.rotateForwards();
        } else {
            this.rotationIndex = this.trueModulo(selectedDotIndex + 1, this.numberPresent);
            this.showcaseDisplay.empty();
            this.writeShowcase();
            this.rotateBackwards();
        }
    },

    selectCurrentNavDot: function () {
        var navDotIndex = this.trueModulo(this.rotationIndex, this.numberPresent);

        this.navDotContainer.find('.jsNavDotsButton')
            .removeClass('sl-cms2-rss-showcase__nav-dots__button--current')
            .blur();
        this.navDotContainer.find('.jsNavDotsButton').eq(navDotIndex)
            .addClass('sl-cms2-rss-showcase__nav-dots__button--current');
    },

    rssShowcaseNav: function (dir, event) {
        var prevNavElement = this.blockElement.find(".jsRssShowcaseNavPrev"),
            nextNavElement = this.blockElement.find(".jsRssShowcaseNavNext"),
            code = (event.keyCode ? event.keyCode : event.which);

        if (code != sl.keyboard["ENTER"] &&
            code != sl.keyboard["SPACE"] &&
            code != sl.keyboard["LEFT"] &&
            code != sl.keyboard["RIGHT"] &&
            (code != 1)) {
            return;
        }

        if (dir === 'prev') {
            this.rotateBackwards();
        }

        if (dir === 'next') {
            this.rotateForwards();
        }

        this.clampFunctions();

    },

    trueModulo: function (dividend, divisor) {
        return ((dividend % divisor + divisor) % divisor);
    },

    rotateForwards: function () {
        this.rotationIndex++;
        this.selectCurrentNavDot();
        var newItemIndex = this.trueModulo(this.rotationIndex + this.numberDisplayed - 1, this.numberPresent);
        var newItem = this.showcaseItem.eq(newItemIndex).clone();
        this.freezeItemWidths();
        newItem.css({
            'width': this.showcaseDisplay.find('.jsShowcaseItem').eq(0).outerWidth() + 'px',
            'flex-grow': '0',
            'flex-shrink': '0'
        });
        newItem.appendTo(this.showcaseDisplay);
        sl.log('new item width', newItem.outerWidth());
        this.showcaseDisplay.animate({'margin-left': '-' + newItem.outerWidth() + 'px'}, this.animationSpeed, jQuery.proxy(this.finishRotateForwards, this));

    },

    finishRotateForwards: function () {
        this.showcaseDisplay.find('.jsShowcaseItem').eq(0).remove();
        this.showcaseDisplay.css('margin-left', 0);
        this.unFreezeItemWidths();
        this.clampFunctions();

    },

    rotateBackwards: function () {
        this.rotationIndex--;
        this.selectCurrentNavDot();
        var newItemIndex = this.trueModulo(this.rotationIndex, this.numberPresent);
        var newItem = this.showcaseItem.eq(newItemIndex).clone();
        newItem.css({
            'width': this.showcaseDisplay.find('.jsShowcaseItem').eq(0).outerWidth() + 'px',
            'flex-grow': '0',
            'flex-shrink': '0'
        });
        this.freezeItemWidths();
        newItem.prependTo(this.showcaseDisplay);
        this.showcaseDisplay.css('margin-left', '-' + newItem.outerWidth() + 'px');
        this.showcaseDisplay.animate({'margin-left': 0}, this.animationSpeed, jQuery.proxy(this.finishRotateBackwards, this));

    },

    finishRotateBackwards: function () {
        this.showcaseDisplay.find('.jsShowcaseItem').eq(this.numberDisplayed).remove();
        this.unFreezeItemWidths();
        this.clampFunctions();
    },

    freezeItemWidths: function () {
        this.slider.css('width', this.slider.outerWidth());
        var showcaseItems = this.showcaseDisplay.find('.jsShowcaseItem');
        for (var i = 0; i < showcaseItems.length; i++) {
            showcaseItems.eq(i).css('width', showcaseItems.eq(i).width() + 'px');
        }

        showcaseItems.css({
            'flex-grow': '0',
            'flex-shrink': '0'
        });
    },

    unFreezeItemWidths: function () {
        this.slider.removeAttr('style');
        var showcaseItems = this.showcaseDisplay.find('.jsShowcaseItem');
        showcaseItems.removeAttr('style');
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var StaffDirectoryEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
    },

    initListeners: function () {
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    editHandler: function () {
        if (this.moduleElement.data("is-empty")){
            this.openOptionsDialog()
        }
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2_site/edit_staff_directory";
        var variables = {
            mod: "edit_staff_directory",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium-max-height",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        CMS2EditStaffDirectory.SubmitSelectedUsers(jQuery.proxy(this.submitSuccessHandler, this));
    },

    submitSuccessHandler: function () {
        this.updateBlock();
    },

}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var LinkList = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("link list options", options);
        this.$super(options);
        this.addLinkURL = options.addLinkURL;
        this.itemClass = options.itemClass;
        this.jsAttachmentListAreaId = options.jsAttachmentListAreaId;
        this.jsAttachmentListArea = this.moduleElement.find("#" + this.jsAttachmentListAreaId);
        this.refreshURL = options.refreshURL;
        this.sortPlaceholderClass = options.sortPlaceholderClass;
        this.jsAttachmentHandleClass = options.jsAttachmentHandleClass;
        this.moveItemInListURL = options.moveItemInListURL;
        this.itemTitleClass = options.itemTitleClass
        this.renameItemURL = options.renameItemURL;
        this.deleteItemFromListClass = options.deleteItemFromListClass;
        this.deleteItemFromListURL = options.deleteItemFromListURL;
        this.jsAddLinkDialogClass = options.jsAddLinkDialogClass;
        this.changeUrlURL = options.changeUrlURL;
        this.titleErrorString = options.titleErrorString;
        this.urlErrorString = options.urlErrorString;
        this.blockElement.data("jsEditorHandler", this);
        this.listItems = [];
        this.initListeners();
    },

    initListeners: function () {
        sl.setupTooltips();

        this.moduleElement.on({
            click: jQuery.proxy(this.changeHandler, this),
            "focus": jQuery.proxy(this.focusItemTitleHandler, this),
            "keydown": jQuery.proxy(this.keydownHandler, this), //to check for enter while editing name
            "keyup paste cut mouseup": jQuery.proxy(this.keyupHandler, this) //starts autosave
        }, "." + this.itemTitleClass);

        this.moduleElement.on({
            "blur": jQuery.proxy(this.blurPlaceholderHandler, this)
        }, ".jsPlaceholder");

        this.moduleElement.on({
            mouseenter: jQuery.proxy(this.itemMouseenterHandler, this),
            mouseleave: jQuery.proxy(this.itemMouseleaveHandler, this)
        }, "." + this.itemClass);

        this.moduleElement.on({
            "click": jQuery.proxy(this.deleteItemFromListHandler, this)
        }, "." + this.deleteItemFromListClass);

        jQuery("body").on({
            click: jQuery.proxy(this.editLinkDialogHandler, this)
        }, ".jsLinkAdvanced")

        this.moduleElement.on({
            "click": jQuery.proxy(this.editLinkDialogHandler, this)
        }, "." + this.jsAddLinkDialogClass);

        this.updateListItems();
        this.applySortable();
        this.initTitleListener();
    },


    blurPlaceholderHandler: function (event) {
        var target = jQuery(event.target);
        var newTitle = target.text();
        var targetItem = target.closest("." + this.itemClass);
        if (newTitle != "") {
            this.addLinkHandler(newTitle, null, null, targetItem.data("id"));
        }
        this.updateLinksArea();
    },

    editHandler: function () {
        this.showPlaceholder();
    },
    showPlaceholder: function () {
        this.moduleElement.find(".jsPlaceholderHolder").removeClass("display-none");
    },
    hidePlaceholder: function () {
        this.moduleElement.find(".jsPlaceholder")
    },

    setEditingLinkID: function(id)
    {
        this.editingLinkID = id;
    },

    setEditingName: function(name){
      this.editingLinkName = name;
    },

    getEditingLinkID: function()
    {
        return this.editingLinkID;
    },

    getEditingName: function(){
        return this.editingLinkName;
    },

    hasEditingName: function() {
        var result = (this.editingLinkName != null) && (this.editingLinkName != "");
        return result;
    },

    addLinkDialogHandler: function (event, id) {//id is passed in if editing
        event.stopPropagation();
        this.setEditingLinkID(id);
        this.setEditingName(jQuery(event.target).closest(".jsListItem").data("link-name"))
        var variables = {};
        variables["link_id"] = id;
        variables["block_id"] = this.blockID;
        variables["edit_form_data"] = this.getFormDataID();
        sl.addAjaxScope(variables);
        var objectName = this.blockID + "_link_handler";
        window[objectName] = this;
        var dialogData = {
            url: "/pf4/cms2_site/new_link?mod=tab_module&object_name=" + objectName + "&resource_type=files_and_folders",
            dialogCssClasses: "sl-dialog-medium",
            variables: variables,
            formArea: "jsDefaultDialogContent"
        };
        this.addLinkDialog = new SLFormDialog(dialogData);
        this.addLinkDialog.open();
    },

    // called by web_link.js if user cancels add link
    cancelAddLinkDialog: function () {
        this.addLinkDialog.close();
    },

    // called by /resource/select_resource
    selectResource: function (resourceID, title, url, embedURL, isGoogle, externalID) {
        this.addLinkDialog.close();
        /* this functionality was designed to keep the name previously written inline */
            // if ( this.hasEditingName() )
            // {
            //     title = this.getEditingName();
            // }

        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            link_url: url,
            title: title,
            embed_url: embedURL,
            resource_id: resourceID,
            is_google: isGoogle,
            external_id: externalID
        };

        this.addLinkID(variables);
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: "/pf4/cms2/addLinkFromLockerToFileList",
            data: variables,
            context: this,
            success: jQuery.proxy(this.selectResourceSuccessHandler,this, resourceID),
            error: function (data) {
                sl.alert(data.responseText);
            }
        });
    },

    selectResourceSuccessHandler: function (resourceID){
            this.updateLinksArea();
    },

    addLinkID: function(variables)
    {
        if ( this.getEditingLinkID() != null )
        {
            variables["link_id"] = this.getEditingLinkID();
        }
    },

    // called by web_link.js and select_from_site_map
    selectLink: function (title, url, openInNewWindow, fromWebLink) {
        this.addLinkDialog.close();
        /* this functionality was designed to keep the name previously written inline */
        // if (this.hasEditingName() && (fromWebLink == null)) { // fromWebLink is true if called from tab to change name
        //     title = this.getEditingName();
        // }

        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            title: title,
            url: url,
            open_in_new_window: openInNewWindow
        };
        this.addLinkID(variables);
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: "/pf4/cms2/addLinkToList",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this),
            error: function (data) {
                sl.alert(data.responseText);
            }
        });
    },

    initDialogListeners: function () {
        this.urlField = this.currentDialog.find("[name=url]")
        this.urlField.on({"change": jQuery.proxy(this.urlChangeHanlder, this)})
    },
    urlChangeHanlder: function () {
        this.currentDialog.find(".jsTestLinkLink").attr("href", this.urlField.val())
    },

    editLinkDialogHandler: function (event) {
        event.stopPropagation();
        sl.log("editLinkDialogHandler");
        var target = jQuery(event.target);
        var id = target.data("id")

        this.addLinkDialogHandler(event, id) // opens add dialog with id
    },
    setEditDialog: function (data) {
        var dialogHtml = jQuery("#html-helpers").find("#jsAddEditLinkDialog").clone();
        dialogHtml.find(".jsAddEditHeading").text(dialogHtml.data("edit-title"));
        this.edittingData = data;
        if (data != null) {
            dialogHtml.find("[name=link_name]").val(this.edittingData["linkName"]);
            dialogHtml.find("[name=url]").val(this.edittingData["url"]);
            dialogHtml.find("[name=open_in_new_window]").prop("checked", this.edittingData["open"]);
        }
        this.openAddEditDialog(dialogHtml);
    },

    openAddEditDialog: function (dialogHtml) {
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: dialogHtml,
            dialogCallback: jQuery.proxy(this.addEditdialogCallback, this, "edit")
        };
        var dialog = new Dialog(dialogData);
        this.currentDialog = dialog.createDialogWithHtml();
        this.initDialogListeners();
    },

    massAdddialogCallback: function (data) {
        if (data != false) {
            var massList = data.mass_list.trim();
            var open = (data.open_in_new_window) ? true : false;
            sl.log("massList", massList)
            var arrayOfLines = massList.split('\n');
            if (this.validateMassAddData(arrayOfLines)) {
                sl.log("arrayOfLines", arrayOfLines);
                var i, currentLine, splitLine, title, url;
                for (i = 0; i < arrayOfLines.length; i++) {
                    currentLine = arrayOfLines[i]
                    splitLine = currentLine.split('\t');
                    sl.log("splitLine", splitLine);
                    title = splitLine[0];
                    url = splitLine[1];
                    this.addLinkHandler(title, url, open);
                }
            }
        }
    },
    validateUrl: function (url) {
        sl.log("validateUrl", url, url.substring(0, 4));
        return (url.substring(0, 4) == "http");
    },

    validateMassAddData: function (arrayOfLines) {
        var i, currentLine, splitLine, title, url;
        var titleError = false;
        var urlError = false;
        for (i = 0; i < arrayOfLines.length; i++) {
            currentLine = arrayOfLines[i];
            splitLine = currentLine.split('\t');
            sl.log("splitLine", splitLine);
            title = splitLine[0];
            url = splitLine[1];
            if (title == "") {
                titleError = true;
            }
            if (url && url.substring(0, 4) != "http") {
                urlError = true;
            }
        }
        if (titleError || urlError) {
            var alertString = ((titleError) ? this.titleErrorString : "") + ((urlError) ? "<br>" + this.urlErrorString : "");
            sl.alert(alertString);
            return false;
        }
        return !(titleError || urlError);
    },

    deleteItemFromListHandler: function (event) {
        var target = jQuery(event.target);
        var id = target.data("id");
        var targetTitle = target.closest("." + this.itemClass).find("." + this.itemTitleClass).text();
        var confirmMessage = "Are you sure you want to delete:<br><strong> " + targetTitle + "</strong>";
        jQuery.when(sl.confirmAction(confirmMessage)).then(jQuery.proxy(this.doDelete, this, id));
    },

    doDelete: function (id) {
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.deleteItemFromListURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this)
        });
    },

    itemClickHandler: function () {
        sl.log("clicked item");
    },

    focusItemTitleHandler: function (event) {
        sl.log("focus");
        var target = jQuery(event.target);
        target.closest("." + this.itemClass).addClass(this.itemSelectedClass);
    },



    changeHandler: function (event) {
        
        sl.log("changeHandler", event)
        var target = jQuery(event.target);
        sl.log("link list changeHandler target ", target);
        var newTitle = target.text();
        var targetItem = target.closest("." + this.itemClass);
        if (target.hasClass("jsPlaceholder")) {
            targetItem.find(".jsAddLinkDialogButton").remove();
        }
        targetItem.data("linkName", newTitle)
        var id = targetItem.data("id");
        this.saveHandler(id, newTitle);

    },

    keydownHandler: function (event) {
        if (event.which == sl.keyboard["ENTER"]) {
            jQuery(":focus").blur();
            return false;
        };

    },
    keyupHandler: function(event) {
        var target = jQuery(event.target);
        this.startNameChangeAutoSave(target);
    },

    startNameChangeAutoSave: function (target) {
        sl.log("saveNameTimeoutHandler")
        if (this.saveNameTimeoutHandler == null) {
            this.saveNameTimeoutHandler = setTimeout(jQuery.proxy(this.autoSaveName, this, target), 1000);//saveHandler was 5000
        }
    },

    autoSaveName: function (target) {
        sl.log("autosave name")
        this.clearsaveNameTimeout();
        if (target.closest(".jsPlaceholderHolder").length == 0){ //don't change title if it's new
            var newTitle = target.text();
            var id = target.closest("." + this.itemClass)
                .removeClass(this.itemSelectedClass)
                .data("id");
            this.changeLinkNameAjaxCall(id, newTitle);
        }
    },

    clearsaveNameTimeout: function () {
        if (this.saveNameTimeoutHandler != null) {
            clearTimeout(this.saveNameTimeoutHandler)
            this.saveNameTimeoutHandler = null;
        }
    },

    saveHandler: function (id, newTitle) {
        if (id == null) {
            return;
        }
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id,
            title: newTitle
        };
        sl.log("saving ")
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.renameItemURL,
            type: "POST",
            data: variables,
            context: this,
        });
    },

    changeLinkNameAjaxCall: function (id, newTitle) {
        sl.log("changeLinkNameAjaxCall")
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id,
            title: newTitle
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.renameItemURL,
            type: "POST",
            data: variables,
            context: this,
            // success: jQuery.proxy(this.updateLinksArea, this)
        });
    },

    changeLinkUrlAjaxCall: function (id, newUrl, open_in_new_window) {
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id,
            url: newUrl,
            open_in_new_window: open_in_new_window
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.changeUrlURL,
            type: "POST",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this)
        });
    },

    itemMouseenterHandler: function (event) {
        var target = (jQuery(event.target).hasClass(this.itemClass)) ? jQuery(event.target) : jQuery(event.target).closest("." + this.itemClass);
        target.addClass(this.itemSelectedClass);
        target.find(".jsShowOnHover").removeClass("visibility-hidden");
    },

    itemMouseleaveHandler: function (event) {
        var target = (jQuery(event.target).hasClass(this.itemClass)) ? jQuery(event.target) : jQuery(event.target).closest("." + this.itemClass);
        target.removeClass(this.itemSelectedClass);
        target.find(".jsShowOnHover").addClass("visibility-hidden");
    },

    addLinkHandler: function (title, url, open, placeholderId) {
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            title: title,
            url: url,
            open_in_new_window: open
        };
        this.addLinkID(variables);
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: "/pf4/cms2/addLinkToList",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this),
            error: function (data) {
                sl.alert(data.responseText);
            }
        });
    },

    updateLinksArea: function (callback) {
        sl.log("links list updateLinksArea")
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
        this.applySortable();
        this.updateListItems();
        sl.setupTooltips();

    },

    updateListItems: function () {
        this.listItems = this.moduleElement.find("." + this.itemClass).not(".jsListItemPlaceholder");
    },

    applySortable: function () {
        this.jsAttachmentListArea.css({"overflow": "auto"});
        this.jsAttachmentListArea.sortable({
            placeholder: this.sortPlaceholderClass,
            start: jQuery.proxy(this.sortableStartHandler, this),
            update: jQuery.proxy(this.sortableUpdateHandler, this),
            handle: "." + this.jsAttachmentHandleClass
        });
    },

    sortableStartHandler: function (event, ui) {
        jQuery(":focus").blur();
        jQuery(ui.helper).css("background","rgba(255,255,255,0.9)")
        this.originalSortableIndex = ui.item.index();
        this.originalSortableList = this.jsAttachmentListArea.find("." + this.itemClass);
    },

    sortableUpdateHandler: function (event, ui) {
        var id = jQuery(ui.item).data("id");
        var newIndex = ui.item.index();
        var before_id;
        if (newIndex + 1 == this.listItems.length) {
            before_id = "end";
        } else {
            before_id = jQuery(this.originalSortableList[newIndex + ((newIndex > this.originalSortableIndex) ? 1 : 0)]).data("id");
        }
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id,
            before_id: before_id
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.moveItemInListURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this)
        });
    },


    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var SlideLayoutEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.parentID = options.parentID;
        //this.slideshowParent = jQuery(EditCMS2Page.GetBlockDivID(this.parentID));
        this.slideshowParent = this.blockElement.closest(".jsSlideshow").closest(".cms2-selectable-module"); //fix this!!!
        this.groupID = options.groupID;
        this.jsUploadBgImgClass = options.jsUploadBgImgClass;
        this.jsProgressItemTemplateClass = options.jsProgressItemTemplateClass;
        this.jsProgressItemTemplate = this.blockElement.find("." + this.jsProgressItemTemplateClass);
        this.jsProgressItemHolderClass = options.jsProgressItemHolderClass;
        this.jsProgressItemHolder = this.slideshowParent.find("." + this.jsProgressItemHolderClass);
        this.lockerObjectName = options.lockerObjectName;
        this.slideFromLockerURL = options.slideFromLockerURL;
        this.slideshowControllerInstance = this.slideshowParent.data("jsEditorHandler");
        this.displayName = options.displayName;
        this.imageURL = options.imageURL;
        this.initSetupElements();
        this.initListeners();
        this.fromLockerURL = options.fromLockerURL;
        this.setImageFromLockerURL = options.setImageFromLockerURL;


    },
    initListeners: function () {
        this.moduleElement.on("jsChildModuleReloaded", jQuery.proxy(this.childReloaded, this));
    },

    initDropzoneEffects: function () {
        this.dragOverlayClass = "sl-cms2-attachments__dropzone";
        this.dropOverlayClass = "sl-cms2-attachments__dropzone--drop";
        var dropEffectsOptions = {
            dropzoneElement: this.blockElement.parent(),
            messageClass: "jsImageUploadMessage",
            dragOverlayClass: this.dragOverlayClass,
            dropOverlayClass: this.dropOverlayClass
        };
        var dropzoneEffect = new DropzoneEffect(dropEffectsOptions);
    },

    initSetupElements: function () {
        this.jsProgressItemHolder.hide();
        this.width = Math.round(this.moduleElement.width());
        this.height = Math.round(this.moduleElement.height());

    },
    addHandler: function (e, data) {                          //OLD
        var uploadFile = data.files[0];
        sl.log("addHandler in slide_layout", e, data);
        if (sl.verifyFileType(uploadFile) == false) {
            return false;
        }

        var imageFileTypes = (/\.(gif|jpg|jpeg|png)$/i);
        if (imageFileTypes.test(uploadFile.name)) {
            if (data.originalFiles.length > 1) {
                //sl.log("multiple");
                //data.url = "/pf4/cms2/setSlideLayoutImage";
                //this.slideshowControllerInstance.addMultipleSlides(e, data);
                if (data.originalFiles[0] == data.files[0]) {
                    sl.alert("Oops! Currently images have to be uploaded one at a time.")
                }
            }
            else {

                sl.log("addHandler", e, data)
                this.jsProgressItemHolder.show();
                this.initProgressBar();
                this.blockElement.on({
                    'fileuploaddone': jQuery.proxy(this.fileDropDoneHandler, this),
                    'fileuploadprogress': jQuery.proxy(this.progressInstance.progressHandler, this.progressInstance),
                    'abort': jQuery.proxy(this.abortUpload, this)
                });
                this.jqXHR = this.progressInstance.addHandler(e, data, "image");
                return true;
            }
        } else {
            sl.alert("Sorry, please upload valid image type (.jpg, .jpeg, .png, .gif)")
            return false;
        }

    },

    abortUpload: function () {
        this.updateSlide();
    },

    uploadErrorHandler: function (jqXHR, textStatus, errorThrown) {
        if (errorThrown === 'abort') {
            this.jsProgressItemHolder.fadeOut();
        } else {
            sl.alert('An error occured during the image upload');
        }
    },
    fileDropDoneHandler: function (e, data) {
        this.jsProgressItemHolder.hide();
        var result = data._response.result;
        if (result == "err") {
            sl.alert("There was an error uploading the file. The" +
                " file may also have had a virus");
        } else {
            this.imageURL = result;
            var selectOptions = {
                //showCrop: true
            };
            EditCMS2Page.findModule().deselectModule();
            this.slideshowControllerInstance.publicRefreshCurrentSlide(selectOptions);
        }
    },

    initProgressBar: function () {
        this.jsProgressItemHolder.empty()
        var options = {
            itemTemplate: this.jsProgressItemTemplate,
            itemsContainer: this.jsProgressItemHolder
        };
        this.progressInstance = new ProgressBar(options);
    },

    initUploader: function (options) {                                                /// ***THis is the new uploader method
        if (!this.uploaderSet ){
            options.blockID = this.blockID;
            options.blockElement = this.blockElement;
            this.slideshowControllerInstance = this.blockElement.closest(".jsSlideshow").closest(".cms2-selectable-module").data("jsEditorHandler"); // this because toolbar init before
            this.slideshowControllerInstance.initSlidehowUploader(options);
            this.uploaderSet = true;
        }
    },


    // initUploadWidget: function () {                                    // ***OLD
    //     var fileUploadData = {
    //         edit_form_data: this.getFormDataID(),
    //         block_id: this.blockID,
    //         group_id: this.groupID
    //     };
    //     var dropURL = "/pf4/cms2/setSlideLayoutImage";
    //
    //     this.blockElement.data("sladd", jQuery.proxy(this.addHandler, this));
    //     this.blockElement.fileupload({
    //         url: dropURL,
    //         maxFileSize: 70000000,
    //         loadImageMaxFileSize: 7000000000,
    //         imageMaxWidth: 1920,
    //         imageMaxHeight: 1080,
    //         disableImageResize: false,
    //         formData: fileUploadData,
    //         dropZone: this.blockElement.closest(".jsSlideBody"),
    //         error: jQuery.proxy(this.uploadErrorHandler, this),
    //         start: jQuery.proxy(this.uploadStartHandler, this)
    //     });
    // },

    updateSlide: function () {
        this.slideshowControllerInstance.publicRefreshCurrentSlide(this);
    },

    cropImageHandler: function () {
        this.cropImageActivate(this.blockElement)
    },

    confirmCropHandler: function () {
        this.moduleToolbar.toolbarTools["crop-image"].setImageOnlyCropAttributes(this.getCropAttributes());
        this.destroyCroppie();
    },

    selectHandler: function (selectOptions) {
        this.$super();
        EditCMS2Page.findModule().setActiveEditableModule(this.blockElement);

        if (selectOptions && selectOptions.showCrop == true) {
            this.cropImageHandler();
        }
    },

    deselectHandler: function () {
        this.$super();
        if (this.croppieObject != null) {
            this.confirmCropHandler()
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 5/9/16.
 * Globals CKEDITOR,sl, ProgressBar, DropzoneEffect, EditCMS2Page, Dialog, BlockBase *
 */


var FileList = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("file list options", options);
        this.jsItemTemplate = options.jsItemTemplate;
        this.jsAttachmentFromLockerClass = options.jsAttachmentFromLockerClass;
        this.jsAddLinkButton = options.jsAddLinkButton;
        this.jsAttachmentListAreaId = options.jsAttachmentListAreaId;
        this.jsAttachmentProgressAreaClass = options.jsAttachmentProgressAreaClass;
        this.jsAttachmentHandleClass = options.jsAttachmentHandleClass;
        this.sortPlaceholderClass = options.sortPlaceholderClass;
        this.refreshURL = options.refreshURL;
        this.objectName = options.objectName;
        this.fromLockerURL = options.fromLockerURL;
        this.deleteItemFromListURL = options.deleteItemFromListURL;
        this.moveItemInListURL = options.moveItemInListURL;
        this.renameItemURL = options.renameItemURL;
        this.addItemFromLockerURL = options.addItemFromLockerURL;
        this.addLinkURL = options.addLinkURL;
        this.dragOverlayClass = options.dragOverlayClass;
        this.dropOverlayClass = options.dropOverlayClass;
        this.deleteItemFromListClass = options.deleteItemFromListClass;
        this.itemClass = options.itemClass;
        this.itemTitleClass = options.itemTitleClass;
        this.itemSelectedClass = options.itemSelectedClass;
        this.displayName = options.displayName;
        this.uploadFileErrorString = options.uploadFileErrorString;
        this.$super(options);
        this.blockElement.data("jsEditorHandler", this);
        this.listItems = [];
        this.initListeners();
        this.currentlySelectedFolder = null;
        this.currentlySelectedFolderId = null;
    },

    initListeners: function () {
        this.moduleElement.on({
            "focus": jQuery.proxy(this.focusItemTitleHandler, this),
            "blur": jQuery.proxy(this.blurItemTitleHandler, this),
            keydown: jQuery.proxy(this.keydownHandler, this)
        }, "." + this.itemTitleClass);

        this.moduleElement.on({
            "click": jQuery.proxy(this.deleteItemFromListHandler, this)
        }, "." + this.deleteItemFromListClass);

        this.moduleElement.on({
            "click": jQuery.proxy(this.iconClickHandler, this)
        }, ".jsItemIconButton");

        this.moduleElement.on({
            "click": jQuery.proxy(this.backUpHandler, this)
        }, ".jsBackUpButton");

        this.moduleElement.on({
            mouseenter: jQuery.proxy(this.itemMouseenterHandler, this),
            mouseleave: jQuery.proxy(this.itemMouseleaveHandler, this),
        }, "." + this.itemClass);

        this.applySortable();
        this.updateListItems();
        this.initTitleListener();
    },

    initFileUpload: function (jsUploadFileButton) {
        if (jsUploadFileButton != null) {     //originally setup by toolbar
            this.jsUploadFileButton = jsUploadFileButton;
            this.initProgressBar();
            this.initDropzoneEffect();
        }
        var url = "/pf4/cms2/addFileToFileList";
        var fileUploadData = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            folder_id: this.currentlySelectedFolderId
        };
        this.jsUploadFileButton.fileupload({
            url: url,
            formData: fileUploadData,
            //sequentialUploads: true,
            maxFileSize: 70000000,
            done: jQuery.proxy(this.fileDropDoneHandler, this),
            add: jQuery.proxy(this.progressInstance.addHandler, this.progressInstance),
            progress: jQuery.proxy(this.progressInstance.progressHandler, this.progressInstance),
            dropZone: "#" + this.moduleID,
        });
        if (!DropzoneEffect.isSupported()) {
            this.moduleElement.find(".jsDragHelp").remove();
        }
    },

    refreshFileUpload: function () {
        this.jsUploadFileButton.fileupload("destroy");
        this.initFileUpload();
    },
    initDropzoneEffect: function () {
        var dropEffectsOptions = {
            dropzoneElement: this.moduleElement,
            messageClass: "jsEditorMessage",
            findDropZone: function (dropZone) {
                return dropZone;
            },
            dragOverlayClass: this.dragOverlayClass,
            dropOverlayClass: this.dropOverlayClass
        };
        var dropzoneEffect = new DropzoneEffect(dropEffectsOptions);
    },
    initProgressBar: function () {
        this.jsItemTemplate = this.moduleElement.find(".jsItemTemplate").clone().removeClass("jsItemTemplate, hidden");
        this.jsAttachmentListArea = this.moduleElement.find("#" + this.jsAttachmentListAreaId);
        this.jsAttachmentProgressArea = this.moduleElement.find("." + this.jsAttachmentProgressAreaClass);
        var options = {
            itemTemplate: this.jsItemTemplate,
            itemsContainer: this.jsAttachmentProgressArea
        };
        this.progressInstance = new ProgressBar(options);
    },
    applySortable: function () {
        this.jsAttachmentListArea.sortable({
            items: ".jsListItem",
            placeholder: this.sortPlaceholderClass,
            start: jQuery.proxy(this.sortableStartHandler, this),
            update: jQuery.proxy(this.sortableUpdateHandler, this),
            handle: "." + this.jsAttachmentHandleClass
        });
    },
    sortableStartHandler: function (event, ui) {
        this.originalSortableIndex = ui.item.index();
        this.originalSortableList = this.jsAttachmentListArea.find("." + this.itemClass + ":visible");
    },

    fileDropDoneHandler: function (ev, data) {
        sl.log("done uploading to file list",ev, data);
        this.progressInstance.doneHandler(ev, data);
        ev.preventDefault();
        var response = data._response.result;
        if ((response != null) && (response == "err" || response.substring(0, 5) == "Error")) {
            sl.alert(this.uploadFileErrorString);
        } else {
            this.updateLinksArea();
        }
    },
    updateLinksArea: function () {
        sl.log("updateLinksArea to file list");
        var variables = {
            edit_form_data: this.getFormDataID(),
            mod: this.blockID
        };
        sl.addAjaxScope(variables);
        this.storeOpenFolders();
        jQuery.ajax({
            url: this.refreshURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.renderUpdateLinksArea, this)
        });
    },

    storeOpenFolders: function () {
        this.openFolders = [];
        this.checkThisFolderLevelForOpenFolders(this.jsAttachmentListArea)

    },

    checkThisFolderLevelForOpenFolders: function (folder) {
        var childrenItems = folder.children(".jsListItem");
        var indexOfOpen = folder.children(".jsSelectedFolder").index();
        if (indexOfOpen >= 0) {
            this.openFolders.push(indexOfOpen)
        }
    },

    renderUpdateLinksArea: function (data) {
        var newListArea = jQuery(data).find("#" + this.jsAttachmentListAreaId).children();
        this.jsAttachmentListArea.html(newListArea);//replaceWith
        this.applySortable();
        this.updateListItems();
        this.openPreviouslyOpenedFolders();
    },

    openPreviouslyOpenedFolders: function () {
        var i;
        this.currentFolderBeingChecked = this.jsAttachmentListArea;
        for (i = 0; i < this.openFolders.length; i++) {
            this.openFolderHandler(this.currentFolderBeingChecked.children().eq(this.openFolders[i]));
        }
    },

    updateListItems: function () {
        this.listItems = this.moduleElement.find("." + this.itemClass + ":visible");
    },

    attachFromLockerHandler: function () {
        sl.log("attachFromLockerHandler");
        this.openLockerDialog();
    },

    openLockerDialog: function (data) {
        window[this.objectName] = this;
        var variables = {};
        variables.object_name = this.objectName;
        variables.mod = "container-table";
        sl.addAjaxScope(variables);
        var dialogData = {
            url: this.fromLockerURL,
            dialogCallback: jQuery.proxy(this.updateLinksArea, this, this.blockID),
            contentClassName: "sl-dialog-wide",
            additonalData: variables
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialog();
    },

    deleteItemFromListHandler: function (event) {
        var target = jQuery(event.target);
        var id = target.attr("jsid");
        var targetTitle = target.closest("." + this.itemClass).find("." + this.itemTitleClass).text();
        var confirmMessage = "Are you sure you want to delete:<br><strong> " + targetTitle + "</strong>";
        jQuery.when(sl.confirmAction(confirmMessage)).then(jQuery.proxy(this.doDelete, this, id));
    },

    doDelete: function (id) {
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.deleteItemFromListURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this)
        });
    },

    openFolderHandler: function (targetItem) {
        if (targetItem.parent().hasClass("jsFolderChildrenHolder")) {
            this.currentlySelectedFolder.find(".jsItemRow:first").addClass("display-none-important")
        }
        this.currentlySelectedFolder = targetItem;
        this.currentlySelectedFolder.removeClass("jsListItem").find(".jsItemRow:first")
            .addClass("sl-cms2-file-list__item__row--selected jsItemRowSelected")
            .removeAttr("contenteditable")
        this.currentlySelectedFolderId = this.currentlySelectedFolder.attr("jsID")
        this.setupFolderView();
        this.refreshFileUpload();
    },

    iconClickHandler: function (event) {
        var targetItem = jQuery(event.target).closest("." + this.itemClass);
        if (targetItem.data("type") == "folder") {
            this.openFolderHandler(targetItem)
        }
    },


    backUpHandler: function () {
        this.currentlySelectedFolder.removeClass("jsSelectedFolder display-none-important").find(".jsFolderChildrenHolder:first").addClass("display-none-important");
        this.currentlySelectedFolder.addClass("jsListItem").find(".jsItemRowSelected")
            .removeClass("sl-cms2-file-list__item__row--selected jsItemRowSelected")
            .attr("contenteditable")
        this.currentlySelectedFolder.siblings().removeClass("display-none-important");
        if (this.currentlySelectedFolder.parents(".jsSelectedFolder").length == 0) {
            this.currentlySelectedFolderId = null;
            this.currentlySelectedFolder = null
            this.moduleElement.find(".jsBackUpButton").addClass("display-none");
        } else {
            this.currentlySelectedFolder = this.currentlySelectedFolder.closest(".jsSelectedFolder");
            this.currentlySelectedFolderId = this.currentlySelectedFolder.attr("jsID");
            this.currentlySelectedFolder.find(".jsItemRowSelected:first").removeClass("display-none-important")
        }
        this.refreshFileUpload();
    },

    setupFolderView: function () {
        this.currentlySelectedFolder.addClass("jsSelectedFolder").siblings().addClass("display-none-important");
        this.currentlySelectedFolder.find(".jsFolderChildrenHolder:first").removeClass("display-none-important");
        this.moduleElement.find(".jsBackUpButton").removeClass("display-none").focus();

    },


    sortableUpdateHandler: function (event, ui) {
        var id = jQuery(ui.item).attr("jsid");
        var newIndex = ui.item.index();
        var before_id;
        if (newIndex + 1 == this.listItems.length) {
            before_id = "end";
        } else {
            before_id = jQuery(this.originalSortableList[newIndex + ((newIndex > this.originalSortableIndex) ? 1 : 0)]).attr("jsid");
        }
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id,
            before_id: before_id,
            folder_id: this.currentlySelectedFolderId
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.moveItemInListURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this)
        });
    },

    focusItemTitleHandler: function (event) {
        var target = jQuery(event.target);
        target.closest("." + this.itemClass).addClass(this.itemSelectedClass);
        this.originalItemTitle = target.text();
    },

    blurItemTitleHandler: function (event) {
        var target = jQuery(event.target);
        var newTitle = target.text();
        var id = target.closest("." + this.itemClass)
            .removeClass(this.itemSelectedClass)
            .attr("jsid");
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            id: id,
            title: newTitle
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.renameItemURL,
            type: "POST",
            data: variables,
            context: this,
            success: jQuery.proxy(this.updateLinksArea, this)
        });
    },

    selectResource: function (resourceID, title, url, embedURL, isGoogle, externalID) {
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            resource_id: resourceID,
            title: title,
            link_url: url,
            embed_url: embedURL
        };
        if (isGoogle) {
            variables.google_id = "true";
            variables.external_id = externalID;
        }
        sl.addAjaxScope(variables);

        jQuery.ajax({
            url: this.addItemFromLockerURL,
            type: "GET",
            data: variables,
            context: this,
            success: jQuery.proxy(this.closeDialogAndUpdate, this),
            error: function (data) {
                sl.alert(data.responseText);
            }
        });
    },

    closeDialogAndUpdate: function () {
        this.updateLinksArea();
        vex.closeAll();
    },

    addFolderHandler: function () {
        var url = "/pf4/cms2/new_folder_title_form"
        var variables = {
            mod: "form"
        };
        sl.addAjaxScope(variables);

        var dialogData = {
            url: url,
            dialogCallback: jQuery.proxy(this.titleForFolderDialogCallback, this),
            contentClassName: "sl-dialog-medium",
            additonalData: variables
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialog();
    },

    titleForFolderDialogCallback: function (data) {
        if ((data != null) && (data != false)) {
            var title = data.title;
            var variables = {
                edit_form_data: this.getFormDataID(),
                block_id: this.blockID,
                title: title,
                folder_id: this.currentlySelectedFolderId
            };
            sl.addAjaxScope(variables);
            jQuery.ajax({
                url: "/pf4/cms2/addFolderToList",
                data: variables,
                context: this,
                success: jQuery.proxy(this.updateLinksArea, this),
                error: function (data) {
                    sl.alert(data.responseText);
                }
            });
        }
    },

    addLinkHandler: function () {
        this.getAddLinkForm().then(jQuery.proxy(this.openAddLinkDialog, this))
    },

    getAddLinkForm: function () {
        var url = this.addLinkURL;
        var variables = {
            mod: "column-wide",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
            folder_id: this.currentlySelectedFolderId
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openAddLinkDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.addLinkdialogCallback, this)
        };
        this.currentDialog = new Dialog(dialogData);
        this.currentDialog.createDialogWithHtml();
    },
    addLinkdialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = jQuery(this.currentDialog.html).find("form").attr("id");
        var options = {};
        options["success"] = jQuery.proxy(this.addLinkSubmitSuccessHandler, this);
        options["dataType"] = "json";
        var formReturn = sl.ajaxSubmit("submit", formID, options);
    },
    addLinkSubmitSuccessHandler: function (response) {
        if ((response != null) && (response.statusCode == "reload")) {
            this.addLinkHandler();
        } else {
            var editor = EditCMS2Page.findModule();
            editor.updateBlock(this.blockID);
        }
    },

    itemMouseenterHandler: function (event) {
        var target = (jQuery(event.target).hasClass(this.itemClass)) ? jQuery(event.target) : jQuery(event.target).closest("." + this.itemClass);
        target.addClass(this.itemSelectedClass);
        target.children(".jsItemRow").find(".jsShowOnHover").removeClass("visibility-hidden");
    },

    itemMouseleaveHandler: function (event) {
        var target = (jQuery(event.target).hasClass(this.itemClass)) ? jQuery(event.target) : jQuery(event.target).closest("." + this.itemClass);
        target.removeClass(this.itemSelectedClass);
        jQuery(".jsShowOnHover").addClass("visibility-hidden");
    },
    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },
    keydownHandler: function (event) {
        var target = jQuery(event.target);
        if (event.which == sl.keyboard["ENTER"]) {
            jQuery(":focus").blur();
            return false;
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 5/11/17.
 * Globals CKEDITOR,sl *
 */
var FileListPlayer = Class.$extend({
    __init__: function (options) {
        sl.log("FileListPlayer")
        this.moduleElement = jQuery("#block_" + options.blockID);
        this.setupElement()
        this.initListeners();
    },
    initListeners: function () {
        this.moduleElement.on({
            click: jQuery.proxy(this.itemClickHandler,this)
        }, ".jsFileListItem");

        this.moduleElement.on({
            "click": jQuery.proxy(this.backUpHandler, this)
        },".jsBackUpButton");
    },
    setupElement: function () {
        //this caused a height:0px issue when module was loaded into the the hidden content (display-none) of a dropdown
        this.moduleElement.css ({
            "height":this.moduleElement.height(),
            overflow: "auto"
        });
    },
    itemClickHandler: function (event) {
        var targetItem = jQuery(event.target).closest(".jsListItem");
        if (targetItem.data("type") == "folder") {
            event.preventDefault();
            this.openFolderHandler(targetItem)
        }
    },
    openFolderHandler: function (targetItem) {
        if (targetItem.parent().hasClass("jsFolderChildrenHolder")) {
            this.currentlySelectedFolder.find(".jsItemRow:first").addClass("display-none-important")
        }
        this.currentlySelectedFolder = targetItem;
        this.currentlySelectedFolder.find(".jsItemRow:first")
            .addClass("sl-cms2-file-list__item__row--selected jsItemRowSelected");
        this.setupFolderView();
    },
    setupFolderView: function () {
        this.currentlySelectedFolder.addClass("jsSelectedFolder").siblings().addClass("display-none-important")
        this.currentlySelectedFolder.find(".jsFileListItem").attr("disabled",true);
        this.currentlySelectedFolder.find(".jsFolderChildrenHolder:first").removeClass("display-none-important");
        this.moduleElement.find(".jsBackUpButton").removeClass("display-none").focus();
    },
    backUpHandler: function() {
        this.currentlySelectedFolder.removeClass("jsSelectedFolder display-none-important").find(".jsFolderChildrenHolder:first").addClass("display-none-important");
        this.currentlySelectedFolder.find(".jsFileListItem").attr("disabled",false);
        this.currentlySelectedFolder.addClass("jsListItem").find(".jsItemRowSelected")
            .removeClass("sl-cms2-file-list__item__row--selected jsItemRowSelected")
        this.currentlySelectedFolder.siblings().removeClass("display-none-important");
        if (this.currentlySelectedFolder.parents(".jsSelectedFolder").length == 0) {
            this.currentlySelectedFolder = null
            this.moduleElement.find(".jsBackUpButton").addClass("display-none");
        } else {
            this.currentlySelectedFolder = this.currentlySelectedFolder.closest(".jsSelectedFolder");
            this.currentlySelectedFolder.find(".jsItemRowSelected:first").removeClass("display-none-important")
        }
    },
}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var LockerBlockEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("init locker here");
        this.$super(options);
        this.listAreaID = options.listAreaID;
        this.backButtonID = options.backButtonID;
        options["pageParameterName"] = "edit_form_data";
        options["pageParameterValue"] = this.getFormDataID();
        options["updateURL"] = this.getUpdateBlockURL();
        this.lockerBlockPlayer = new LockerBlockPlayer(options);
        this.initListeners();
    },

    getLockerBlockPlayer: function () {
        return this.lockerBlockPlayer;
    },

    initListeners: function () {
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_locker_block";
        var variables = {
            mod: "edit_locker",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium sl-dialog-default-height",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_locker";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    },

    initUploader: function (options) {
        if (!this.uploader) {

            options.blockID = this.blockID;
            options.blockElement = this.blockElement;
            options.groupID = jQuery("#html-helpers").data("group-id");//because this inited from toolbar
            options.doneHandler = jQuery.proxy(this.fileAddedDoneHandler, this);
            this.uploader = new FileUploader(options, this);
        }

    },
    fileAddedDoneHandler: function () {
        this.lockerBlockPlayer.updateList();
    }
});

var LockerBlockPlayer = Class.$extend({
    __init__: function (options) {
        sl.log("init locker player");
        this.blockID = options.blockID;
        this.blockElement = jQuery("#block_" + this.blockID);
        this.listAreaID = options.listAreaID;
        this.backButtonID = options.backButtonID;
        this.pageParameterName = options.pageParameterName;
        this.pageParameterValue = options.pageParameterValue;
        this.updateURL = options.updateURL;
        this.currentFolderID = null;
        this.folderIDStack = [];
        this.initListeners();
    },

    initListeners: function () {
        this.blockElement.on("keypress click", ".jsLockerBlockFolder", jQuery.proxy(this.handleFolderClick, this));
        this.blockElement.on("keypress click", ".jsLockerBlockBackUpButton", jQuery.proxy(this.handleBackClick, this));
    },

    handleFolderClick: function (event) {
        var eventCode = (event.keyCode) ? event.keyCode : event.which;
        this.keyboardUser = false;
        sl.log("handleFolderClickhandleFolderClick", eventCode, event)
        if (event && (eventCode == sl.keyboard["ENTER"] || eventCode == sl.keyboard["SPACE"])) {
            this.keyboardUser = true
        } else if (event && eventCode > 1) {
            return; // no action on keypresses not meant to open
        }
        event.preventDefault();
        event.stopPropagation();
        sl.log("handleFolderClickhandleFolderClick do it", event);
        sl.log("this.keyboardUser", this.keyboardUser)
        var folderID = jQuery(event.currentTarget).data("resource_id");
        this.folderIDStack.push(this.currentFolderID);
        this.currentFolderID = folderID;
        this.updateList(event);
    },

    handleBackClick: function (event) {
        var eventCode = (event.keyCode) ? event.keyCode : event.which;
        this.keyboardUser = false;
        if (event && (eventCode == sl.keyboard["ENTER"] || eventCode == sl.keyboard["SPACE"])) {
            this.keyboardUser = true
        } else if (event && eventCode > 1) {
            return; // no action on keypresses not meant to open
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.folderIDStack.length > 0) {
            this.refocusId = this.currentFolderID
            this.currentFolderID = this.folderIDStack.pop();
            this.updateList(event);
        }
    },

    updateList: function (event) {
        var variables = {};
        variables[this.pageParameterName] = this.pageParameterValue;
        variables["mod"] = this.blockID;
        if (this.currentFolderID != null) {
            variables["folder_id"] = this.currentFolderID;
        }
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: this.updateURL,
            type: "GET",
            data: variables,
            context: this,
            success: function (data) {
                var list = jQuery(data).find("#" + this.listAreaID);
                jQuery("#" + this.listAreaID).replaceWith(list);
                this.updateBackButton();
            }
        });
    },

    updateBackButton: function () {
        sl.log("updateBackButton this.currentFolderID", this.currentFolderID);
        var backButton = jQuery("#" + this.backButtonID);
        this.focusoutHandler(backButton);
        if (this.currentFolderID == null) {
            backButton.hide();
        }
        else {
            backButton.show()
            if (this.keyboardUser) {
                backButton.on("focusout", jQuery.proxy(this.focusoutHandler, this, backButton))
                backButton.on("focus", jQuery.proxy(this.focusHandler, this, backButton))
                backButton.addClass("sl-cms2--keyboard-focussed");
                backButton.focus();
            }
        }
        if (this.refocusId && this.keyboardUser) {
            this.blockElement.find("[data-resource_id=" + this.refocusId + "] :tabbable:first").focus();
        }
    },
    focusoutHandler: function (element) {
        element.removeClass("sl-cms2--keyboard-focussed")
    },
    focusHandler: function (element) {
        element.addClass("sl-cms2--keyboard-focussed")
    },

     getCurrentFolderID: function(){
         if (this.currentFolderID != null)
         {
             return this.currentFolderID;
         }
         else
         {
             return this.blockElement.find(".jsLockerHolder").data("folder-id") || null;
         }
     },
 

    getBlockGroupID: function () {
        return this.blockElement.find(".jsLockerHolder").data("block-group-id")
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 10/24/16.
 * Globals CKEDITOR,sl *
 */


var TwitterFeed = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("TwitterFeed __init__")
        this.$super(options);
        this.twitterHandle = "";
        if ( options.twitterHandle != null )
        {
            this.twitterHandle = atob(options.twitterHandle);
            sl.log('twitter handle:', this.twitterHandle);
        }
        this.initializeTwitter();
        if (this.twitterHandle != "") {
            if ((twttr.widgets == null)) {
                twttr.ready(jQuery.proxy(this.insertFeed, this));

            }   else {
                this.insertFeed();
            }
        }
    },
    editHandler: function () {
        sl.log("TwitterFeed edit handler");
        if (this.moduleElement.data("is-empty")){
            this.moduleToolbar.toolbarTools["twitter-name"].buttonClickHandler();
        }
    },

    initializeTwitter: function () {
        sl.log("initializeTwitter")
        window.twttr = (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
            if (d.getElementById(id)) {
                sl.log('existing twitter object', t);
                return t;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function(f) {
                t._e.push(f);
            };
            sl.log('twitter object', t);
            return t;
        }(document, "script", "twitter-wjs"));
    },

    testProxy: function() {
        sl.log('proxy call twitter');
    },

    insertFeed: function () {
        sl.log('twitter insert feed');
        twttr.widgets.createTimeline({
                sourceType: "profile",
                screenName: this.twitterHandle,
            }, document.getElementById(this.moduleID),
            {
                height: 537
            });
        this.setBlockData(this.twitterHandle);
        this.addClickShield();
    },

    setBlockData: function (username) {
        this.blockElement.data("twitter-username",username)
    },

    getTwitterUsername: function () {
        return this.blockElement.data("twitter-username");
    }
}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var NewsListEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("init NewsList here");
        this.format = options.format;
        this.$super(options);
        this.blockElement.data("jsEditorHandler", this);
        this.setupFormat();
        this.initListeners();
    },

    initListeners: function () {
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    setupFormat: function () {
        switch (this.format) {
            case "accordion":
                this.setupShowMore()
                break;
            case "feature":
                this.setupFeature()
                break;
            case "mixed":
                this.setupMixed()
                break;
            case "brief":
                this.setupBrief()
                break;
        }
    },

    justAddedHandler: function () {
        this.openOptionsDialog();
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_news_block";
        var variables = {
            mod: "edit_generic_content",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_generic_content";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    },
    setupFeature: function () {
        sl.log("setupShowMore editor")
        var newsElements = this.blockElement.find('.jsThumbnailParent');
        for (var i = 0; i < newsElements.length; i++) {
            var newsElement = jQuery(newsElements[i]);
            var jsFeatureBlurb = newsElement.find(".jsFeatureBlurb");
            if (newsElement.find("img").length > 0 && jsFeatureBlurb.text().trim().length > 0) {   // check if img is in html string and change newShortHeight
                //if there's an image and no text don't create thumbnail
                var imgElement = newsElement.find("img:first");
                imgElement.on("load", jQuery.proxy(this.makeFeatureThumbnail, this, imgElement, newsElement));

            } else if (jsFeatureBlurb[0].scrollHeight > jsFeatureBlurb[0].clientHeight) {
                jsFeatureBlurb.shave(jsFeatureBlurb[0].clientHeight);
            }
        }
    },
    setupMixed: function () {
        this.setupFeature()
    },
    setupShowMore: function (selector) {
        var showMores = this.blockElement.find('.jsCms2ShowMoreContainer');
        for (var i = 0; i < showMores.length; i++) {
            var newsElement = jQuery(showMores[i]);
            var showMorebutton = newsElement.find(".jsCms2ShowMoreButton");
            var visibleHeight = newsElement[0].clientHeight;
            var realHeight = newsElement[0].scrollHeight;
            if (newsElement.find("img").length > 0) {   // check if img is in html string and move it and change newShortHeight once loaded
                if (newsElement.children().not(".jsCms2ShowMoreButton").text().trim().length > 0) { //if there's an image and no text don't create thumbnail
                    var imgElement = newsElement.find("img:first");
                    imgElement.on("load", jQuery.proxy(this.makeThumbnail, this, imgElement, newsElement))
                } else {
                    newsElement.css("max-height", "inherit"); //overwrite max-height if it's image only
                }
            }
            else if (realHeight > visibleHeight) {
                showMorebutton.show();
            }
        }
    },
    prependThumbnail: function (imgElement, imgHolder) {
        imgHolder.prepend(imgElement.attr("style", "").addClass("sl-cms2-news-accordian__drag-thumbnail"));
    },
    makeFeatureThumbnail: function (imgElement, imgHolder) {
        this.prependThumbnail(imgElement, imgHolder)
        if (imgHolder.find(".jsFeatureBlurb")[0].scrollHeight > imgHolder.find(".jsFeatureBlurb")[0].clientHeight) {
            imgHolder.find(".jsFeatureBlurb").shave(imgHolder.find(".jsFeatureBlurb")[0].clientHeight);
        }
    },
    makeThumbnail: function (imgElement, newsElement) {
        this.prependThumbnail(imgElement, newsElement);
        var realHeight = newsElement[0].scrollHeight;
        var visibleHeight = newsElement[0].clientHeight;
        var showMorebutton = newsElement.find(".jsCms2ShowMoreButton");
        if (visibleHeight < realHeight) {
            showMorebutton.show().unbind("click").click(jQuery.proxy(this.showMoreClickHandler, this));
        }
    },
    setupBrief: function(){
        var playerOptions = {
            blockID:this.blockID,
            format: "brief",
            listenForResize: true
        };
        var player = new NewsListPlayer(playerOptions);
    }
});

/**
 * shave - Shave is a javascript plugin that truncates multi-line text within a html element based on set max height
 * @version v0.2.3
 * @link https://github.com/dollarshaveclub/shave#readme
 * @author Jeff Wainwright <jjwainwright2@gmail.com> (jeffry.in)
 * @license ISC */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.shave = t()
}(this, function () {
    "use strict";
    function e(e, t, n) {
        if (!t)throw Error("maxHeight is required");
        var s = "string" == typeof e ? document.querySelectorAll(e) : e;
        "length" in s || (s = [s]);
        for (var i = {
            character: "…",
            classname: "js-shave",
            spaces: !0
        }, a = n && n.character || i.character, r = n && n.classname || i.classname, o = (!n || n.spaces !== !1) && i.spaces, c = '<span class="js-shave-char">' + a + "</span>", l = 0; l < s.length; l++) {
            var h = s[l], f = h.querySelector("." + r), d = void 0 === h.textContent ? "innerText" : "textContent";
            f && (h.removeChild(h.querySelector(".js-shave-char")), h[d] = h[d]);
            var u = h[d], y = o ? u.split(" ") : u;
            if (!(y.length < 2)) {
                var p = h.style.height;
                h.style.height = "auto";
                var v = h.style.maxHeight;
                if (h.style.maxHeight = "none", h.offsetHeight < t)h.style.height = p, h.style.maxHeight = v; else {
                    for (var g = y.length - 1, m = 0, j = void 0; m < g;)j = m + g + 1 >> 1, h[d] = o ? y.slice(0, j).join(" ") : y.slice(0, j), h.insertAdjacentHTML("beforeend", c), h.offsetHeight > t ? g = o ? j - 1 : j - 2 : m = j;
                    h[d] = o ? y.slice(0, g).join(" ") : y.slice(0, g), h.insertAdjacentHTML("beforeend", c);
                    var x = o ? y.slice(g + 1).join(" ") : y.slice(g);
                    h.insertAdjacentHTML("beforeend", '<span class="' + r + '" style="display:none;">' + x + "</span>"), h.style.height = p, h.style.maxHeight = v
                }
            }
        }
    }

    if ("undefined" != typeof window) {
        var t = window.$ || window.jQuery || window.Zepto;
        t && (t.fn.shave = function (t, n) {
            return e(this, t, n), this
        })
    }
    return e
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var NewsListPlayer = BasePlayerHandler.$extend({
    __init__: function (options) {
        this.$super(options)
        this.blockElement = (options.preview) ? jQuery("#block_" + options.blockID).find("." + options.jsFormat) : jQuery("#block_" + options.blockID);
        sl.log("init this.blockElement", this.blockElement, options)
        this.format = options.format;
        this.setupFormat();
        this.fixAccordionsWithVideos();
    },

    setupFormat: function () {
        switch (this.format) {
            case "accordion":
                this.setupShowMore()
                break;
            case "feature":
                this.setupFeature()
                break;
            case "mixed":
                this.setupMixed()
                break;
            case "brief":
                this.setupBrief()
                break;
        }
    },

    setupFeature: function () {
        sl.log("setupFeature player")
        var newsElements = this.blockElement.find('.jsThumbnailParent');
        for (var i = 0; i < newsElements.length; i++) {
            var newsElement = jQuery(newsElements[i]);
            var jsFeatureBlurb = newsElement.find(".jsFeatureBlurb");
            if (jsFeatureBlurb.find("img").length > 0) {   // check if img is in html string and change newShortHeight
                if (jsFeatureBlurb.text().trim().length > 0) { //if there's an image and no text don't create thumbnail
                    var imgElement = newsElement.find("img:first");
                    jQuery(window).on("load", jQuery.proxy(this.makeFeatureThumbnail, this, imgElement, newsElement));
                }
            } else if (jsFeatureBlurb[0].scrollHeight > jsFeatureBlurb[0].clientHeight) {
                jsFeatureBlurb.shave(jsFeatureBlurb[0].clientHeight);
            }
        }
    },
    makeFeatureThumbnail: function (imgElement, imgHolder) {
        sl.log("makeFeatureThumbnail ", imgHolder.find(".jsFeatureBlurb"))
        this.prependThumbnail(imgElement, imgHolder)
        if (imgHolder.find(".jsFeatureBlurb")[0].scrollHeight > imgHolder.find(".jsFeatureBlurb")[0].clientHeight) {
            imgHolder.find(".jsFeatureBlurb").shave(imgHolder.find(".jsFeatureBlurb")[0].clientHeight);
        }
    },
    setupMixed: function () {
        this.setupFeature();
    },

    setupShowMore: function (selector) {
        sl.log("setupShowMore player")
        var showMores = this.blockElement.find('.jsCms2ShowMoreContainer');
        for (var i = 0; i < showMores.length; i++) {
            var newsElement = jQuery(showMores[i]);
            var showMorebutton = newsElement.find(".jsCms2ShowMoreButton");
            var visibleHeight = newsElement[0].clientHeight;
            newsElement.attr("data-short-height", visibleHeight); // to be used if we want to reset short height
            var realHeight = newsElement[0].scrollHeight;
            if (newsElement.find("img").length > 0) {   // check if img is in html string and move it and change newShortHeight once loaded
                if (newsElement.children().not(".jsCms2ShowMoreButton").text().trim().length > 0) { //if there's an image and no text don't create thumbnail
                    var imgElement = newsElement.find("img:first");
                    jQuery(window).on("load", jQuery.proxy(this.makeThumbnail, this, imgElement, newsElement))
                } else {
                    newsElement.css("max-height", "inherit"); //overwrite max-height if it's image only
                }
            }
            else if (visibleHeight < realHeight) { //add show more button and adjust short height if required
                showMorebutton.show().unbind("click").click(jQuery.proxy(this.showMoreClickHandler, this));
            }
        }
    },
    makeThumbnail: function (imgElement, newsElement) {
        this.prependThumbnail(imgElement, newsElement);
        var realHeight = newsElement[0].scrollHeight;
        var visibleHeight = newsElement[0].clientHeight;
        var showMorebutton = newsElement.find(".jsCms2ShowMoreButton");
        if (visibleHeight < realHeight) {
            showMorebutton.show().unbind("click").click(jQuery.proxy(this.showMoreClickHandler, this));
        }
    },

    prependThumbnail: function (imgElement, imgHolder) {
        imgHolder.prepend(imgElement.attr("style", "").addClass("sl-cms2-news-accordian__drag-image"));
    },
    showMoreClickHandler: function (event) {
        var button = jQuery(event.target);
        var container = button.closest(".jsCms2ShowMoreContainer");
        var fullyDisplayed = container.hasClass("jsMoreDisplayed")
        var buttonText = (fullyDisplayed) ? button.data("more-text") : button.data("less-text");
        if (fullyDisplayed) {
            container.animate({height: container.attr("data-short-height")})
        } else {
            var realHeight = container[0].scrollHeight - 1;
            container.animate({height: realHeight})
        }
        button.text(buttonText);
        container.toggleClass("jsMoreDisplayed sl-cms2-news-accordian__blurb--expanded")
    },

    setupBrief: function () {
        var blurbContainersToClamp = this.blockElement.find('.sl-cms2-news-brief__blurb-area');
        jQuery.each(blurbContainersToClamp, jQuery.proxy(this.saveEachStoryAsData, this))
        sl.textClamper(blurbContainersToClamp, "sl-cms2-news-brief__blurb-area-blurb", "jsBriefButton");
        this.setupBriefListeners()
    },

    saveEachStoryAsData: function (index, value) {
        jQuery(value).data("full-story", jQuery(value).find(".sl-cms2-news-brief__blurb-area-blurb").text());
    },

    setupBriefListeners: function () {
        this.blockElement.on({
            mouseenter: jQuery.proxy(this.mouseenterHandler, this),
            mouseleave: jQuery.proxy(this.mouseleaveHandler, this),
            click: jQuery.proxy(this.clickHandler, this),
        }, ".jsBriefNewsItem")
    },

    mouseenterHandler: function (event) {
        var target = (jQuery(event.target).hasClass("jsBriefNewsItem")) ? jQuery(event.target) : jQuery(event.target).closest(".jsBriefNewsItem");
        target.addClass("sl-cms2-news-brief__item--hover")
    },

    mouseleaveHandler: function (event) {
        var target = jQuery(event.target).closest(".jsBriefNewsItem");
        target.removeClass("sl-cms2-news-brief__item--hover")
    },

    clickHandler: function (event) {
        var target = jQuery(event.target).closest(".jsBriefNewsItem");

    },

    windowResizeFunctions: function () {
        sl.log("resize fired ")
        this.reClampBriefNews();
    },

    reClampBriefNews: function () {
        var blurbContainersToClamp = jQuery('.sl-cms2-news-brief__blurb-area');
        jQuery.each(blurbContainersToClamp, jQuery.proxy(this.replaceEachStoryWithData, this));
        sl.textClamper(blurbContainersToClamp, "sl-cms2-news-brief__blurb-area-blurb", "jsBriefButton");
    },

    replaceEachStoryWithData: function (index, value) {
        jQuery(value).find(".sl-cms2-news-brief__blurb-area-blurb p").empty().text(jQuery(value).data("full-story"))
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var CMS2CalendarBlockEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.pageParameterName = options.pageParameterName;
        this.pageParameterValue = options.pageParameterValue;
        this.format = options.format;
        this.initWeeksDisplayed = 4;
        this.scopeIDs = options.scopeIDs;
        this.initCalendarPlayer();
    },

    initListeners: function () {
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    justAddedHandler: function () {
        this.openOptionsDialog();
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2_site/edit_calendar";
        var variables = {
            mod: "edit_calendar",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);
        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium-max-height",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        CMS2EditCalendar.SubmitSelectedScopes(jQuery.proxy(this.submitSuccessHandler, this));
    },

    submitSuccessHandler: function () {
        this.updateBlock();
    },

    initCalendarPlayer: function () {
        var modelOptions = {
            blockID: this.blockID,
            eventURL: "/pf4/cms2/cmsEventsInRange",
            scopeIDs: this.scopeIDs,
            pageParameterName: this.pageParameterName,
            pageParameterValue: this.getFormDataID()
        };
        var model = new CMS2CalendarPlayerModel(modelOptions);

        var viewOptions = {
            model: model,
            format: this.format
            //callback: jQuery.proxy(this.addClickShield, this)
        };
        var view;

        view = window["CMS2CalendarPlayer" + this.format + "View"](viewOptions);

        var controllerOptions = {
            model: model,
            view: view,
            format: this.format
        };
        this.playerController = new CMS2CalendarBlockPlayerController(controllerOptions);
        this.playerController.initCalendarPlayer();
    }

}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

//************************ MODEL
var CMS2CalendarPlayerModel = Class.$extend({
    __init__: function (options) {
        this.eventURL = options.eventURL;
        this.blockID = options.blockID;
        this.scopeIDs = options.scopeIDs;
        this.pageParameterName = options.pageParameterName;
        this.pageParameterValue = options.pageParameterValue;
        //init objects
        this.calendarWeeks = {};
        this.calendarEvents = {};
        this.eventsSettings = {};
        sl.log('scope ids: ',  this.scopeIDs );
    },
    setController: function (controller) {
        this.controller = controller;
    },
    updateFilterScope: function (scopeID, checked, controller) {
        var variables = {
            block_id: this.blockID,
            scope_ids: this.scopeIDs,
            group_id: scopeID,
            checked: checked
        };

        sl.addAjaxScope(variables);
        return jQuery.ajax({
            url: "/pf4/cms2/updateCalendarFilterScope",
            data: variables,
            context: this,
            success: function (data) {
                console.log("success filter scope update - refreshing calendar")
                controller.updateCalendarPlayer();
            }
        })
    },

    fullRefresh: function () {
        var variables = {
            block_id: this.blockID,
        };
        if (this.pageParameterName == "edit_form_data") {
            variables["edit_form_data"] = this.pageParameterValue;       //this.getFormDataID()   ?????
        }
        else {
            variables[this.pageParameterName] = this.pageParameterValue;
        }

        variables["start_date"] = this.firstDateID;
        variables["end_date"] = this.endDateID;

        sl.addAjaxScope(variables);
        return jQuery.ajax({
            url: this.eventURL,
            dataType: "json",
            data: variables,
            context: this,
            success: function (returnedData) {
                this.calendarWeeks = {};
                this.calendarEvents = returnedData;
                sl.log("this.calendarEvents", returnedData);
                this.setupWeeks();
            }
        })
    },

    partialUpdate: function (startDateID, endDateID) {
        var variables = {
            block_id: this.blockID,
        };
        if (this.pageParameterName == "edit_form_data") {
            variables["edit_form_data"] = this.pageParameterValue;
        }
        else {
            variables[this.pageParameterName] = this.pageParameterValue;
        }
        variables["start_date"] = startDateID;
        variables["end_date"] = endDateID;
        return jQuery.ajax({
            url: this.eventURL,
            dataType: "json",
            data: variables,
            context: this,
            success: function (returnedData) {
                this.addNewWeeks(returnedData, startDateID, endDateID);
            }
        })
    },

    setEventsSettings: function(prop, value) {
        this.eventsSettings[prop] = value;
    },

    getEventsSettings: function () {
        return this.eventsSettings;
    },

    retrieveEvents: function() {
        var variables = {
            block_id: this.blockID
        };

        if (this.pageParameterName == "edit_form_data") {
            variables["edit_form_data"] = this.pageParameterValue;
        }
        else {
            variables[this.pageParameterName] = this.pageParameterValue;
        }

        variables["page_num"] = this.eventsSettings['eventPage'];
        variables["num_per_page"] = this.eventsSettings['eventNumber'];
        variables["start_date"] = this.firstDateID;
        variables["end_date"] = this.endDateID;

        sl.addAjaxScope(variables);
        return jQuery.ajax({
            url: this.eventURL,
            dataType: "json",
            data: variables,
            context: this,
            success: function (returnedData) {
                this.calendarEvents = returnedData;
            },
            error: function(err) {
                sl.log("ajax error in calendar player model", err);
            }
        })
    },

     setupWeeks: function () {
         var firstMoment = new moment(this.firstDateID);
         var endMoment = new moment(this.endDateID);
         var totalDays = endMoment.diff(firstMoment, "days");
         for (var d = 0; d <= totalDays; d += 7) {
             var weekDate = CMS2CalendarPlayerModel.getDateObj(this.firstDateID);
             weekDate.setDate(weekDate.getDate() + d);
             var weekKey = CMS2CalendarPlayerModel.idFormattedDate(weekDate)
             this.calendarWeeks[weekKey] = new CMS2CalendarPlayerModelWeek(weekDate, this);
             this.calendarWeeks[weekKey].addEvents(this.calendarEvents);
         }
     },
 
     getCurrentWeek: function (todayDate) {
        var sunday = CMS2CalendarPlayerModel.getSunday(todayDate);
         var week = new CMS2CalendarPlayerModelWeek(sunday, this);
         var firstID = CMS2CalendarPlayerModel.idFormattedDate(sunday);
         var lastID = CMS2CalendarPlayerModel.idFormattedDate(week.lastDay);
         this.partialUpdate(firstID, lastID);
         week.addEvents(this.calendarEvents);
         return week;
     },
 
 
     getFirstDate: function () {
        return this.firstDateID;
     }, 
     
     getEvents: function () {
        return this.calendarEvents;
     }, 
     
    setFirstDate: function (firstDate) {
       this.firstDateID = CMS2CalendarPlayerModel.idFormattedDate(firstDate);
    },
  

     getCurrentFirstOfMonth: function () {
         return this.currentFirstOfMonth;
     },
   
     setCurrentFirstOfMonth: function (firstDayOfMonth) {
         this.currentFirstOfMonth = new Date(firstDayOfMonth);
     },
   
    setEndDate: function (endDate) {
        this.endDateID = CMS2CalendarPlayerModel.idFormattedDate(endDate);
    },
    getBlockID: function () {
        return this.blockID
    },
    getModelWeeks: function () {
        return this.calendarWeeks;
    },
    getModelWeeksInMonth: function (month) {

    },


    addNewWeeks: function (newEvents, startDateID, endDateID) {
        this.newWeeks = {};
        var firstMoment = new moment(startDateID);
        var endMoment = new moment(endDateID);
        var totalDays = endMoment.diff(firstMoment, "days");
        for (var d = 0; d <= totalDays; d += 7) {
            var weekDate = CMS2CalendarPlayerModel.getDateObj(startDateID);
            weekDate.setDate(weekDate.getDate() + d);
            var weekKey = CMS2CalendarPlayerModel.idFormattedDate(weekDate);
            this.calendarWeeks[weekKey] = new CMS2CalendarPlayerModelWeek(weekDate, this);
            this.calendarWeeks[weekKey].addEvents(newEvents);
            this.newWeeks[weekKey] = this.calendarWeeks[weekKey];
        }
    },

    getNewWeeks: function () {
        return this.newWeeks;
    },
     
     
     updateMonth: function (monthsToAdd) {
         var firstMoment = new moment(this.firstDateID);
         firstMoment = firstMoment.add(7, 'days');  // make sure in 'current' month
         firstMoment = firstMoment.add(monthsToAdd, 'months');
         var newFirstDate = firstMoment.toDate();
         this.setFirstDate(newFirstDate);
         var startDateID = this.firstDateID;
 
         return this.partialUpdate(startDateID, endDateID);
     },

     addToTop: function (weeksToAdd) {
         var firstMoment = new moment(this.firstDateID);
         var endMoment = (new moment(this.firstDateID)).subtract(1, 'days');
         var endDateID = CMS2CalendarPlayerModel.idFormattedDate(endMoment.toDate());
         firstMoment = firstMoment.subtract(weeksToAdd, 'weeks');
         var newFirstDate = firstMoment.toDate();
         this.setFirstDate(newFirstDate);
         var startDateID = this.firstDateID;
 
         return this.partialUpdate(startDateID, endDateID);
     },
    addToBottom: function (weeksToAdd) {
        var lastMoment = new moment(this.endDateID);
        var startMoment = (new moment(this.endDateID)).add(1, 'days');
        var startDateID = CMS2CalendarPlayerModel.idFormattedDate(startMoment.toDate());
        lastMoment = lastMoment.add(weeksToAdd, 'weeks');
        var newLastDate = lastMoment.toDate();
        this.setEndDate(newLastDate);
        var endDateID = this.endDateID;
        return this.partialUpdate(CMS2CalendarPlayerModel.idFormattedDate(startDateID), CMS2CalendarPlayerModel.idFormattedDate(endDateID));
    },

    __classvars__: {
        // *************************** date functions ***************************
        parsedDate: function (date) {
            return jQuery.datepicker.parseDate("yy-mm-dd", date)
        },

        getDateObj: function (date) {
            return new Date(CMS2CalendarPlayerModel.parsedDate(date))
        },

        idFormattedDate: function (date) {
            var month = CMS2CalendarPlayerModel.addTrailingZero(date.getMonth() + 1);
            var day = CMS2CalendarPlayerModel.addTrailingZero(date.getDate());
            return (date.getFullYear() + "-" + month + "-" + day );
        },

        addTrailingZero: function (n) {
            n = (n < 10) ? ("0" + n) : n;
            return n;
        },

        getSunday: function (date) {
            var prevSunday = new Date(date.getTime());
            while (prevSunday.getDay() != 0) {
                prevSunday.setDate(prevSunday.getDate() - 1);
            }
            return prevSunday;
        },

        getEndSaturday: function (date) {
             var lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0);
             while (lastDay.getDay() != 6) {
                 lastDay.setDate(lastDay.getDate() + 1);
             }
             return lastDay;
       },

        isSameDay: function (dayOne, dayTwo) {
            return (dayOne.getDate() == dayTwo.getDate() && dayOne.getMonth() == dayTwo.getMonth() && dayOne.getFullYear() == dayTwo.getFullYear());
        },

        isInCurrentMonth: function (dayOne, dayTwo) {
            return (dayOne.getMonth() == dayTwo.getMonth() && dayOne.getFullYear() == dayTwo.getFullYear());
        },

        formattedDatepickerDate: function (date) {
            return jQuery.datepicker.formatDate('yy-mm-dd', date);
        },
        getFirstOfThisMonth: function (date) {
            var result = new Date(date.getTime());
            while (result.getDate() != 1) {
                result.setDate(result.getDate() - 1);
            }
            return result;
        },
        getLastOfThisMonth: function (date) {
            var thisMonth = date.getMonth();
            while (date.getMonth() == thisMonth) {
                date.setDate(date.getDate() + 1);
            }
            date.setDate(date.getDate() - 1);
            return date;


        },
        getWeekLater: function (date) {
            date.setDate(date.getDate() + 7);
            return date;
        }
    }

});


var CMS2CalendarPlayerModelWeek = Class.$extend({
    __init__: function (day, model) {
        this.model = model;
        this.firstDay = day;
        this.lastDay = new Date(day);
        this.lastDay.setDate(this.lastDay.getDate() + 6);
        this.events = {};
        this.days = [];
        this.setupDays()
    },

    getDays: function () {
        return this.days;
    },

    setupDays: function () {
        var daysDay = new Date(this.firstDay);
        daysDay.setHours(0, 0, 0, 0);
        for (var i = 0; i <= 6; i++) {
            this.days[i] = new CMS2CalendarPlayerModelDay(daysDay, this.model);
            var newDate = new Date(daysDay);
            daysDay = new Date(newDate.setDate(newDate.getDate() + 1));
        }
    },

    addEvents: function (events) {

        if (events != null) {
            for (var i = 0; i < events.length; i++) {
                var event = events[i];
                //if (this.isInWeek(event)) {
                for (var j = 0; j <= 6; j++) {
                    if (this.days[j].isInDay(event)) {
                        this.days[j].addEvent(event)
                    }
                }
                //}
            }
        }
    }
});

var CMS2CalendarPlayerModelDay = Class.$extend({
    __init__: function (day, model) {
        this.day = day;
        this.ID = CMS2CalendarPlayerModel.idFormattedDate(day)
        this.model = model;
        this.dayEvents = [];
    },
    getDay: function () {
        return this.day;
    },

    getID: function () {
        return this.ID;
    },
    addEvent: function (event) {
        this.dayEvents.push(event)
    },
    getEvents: function () {
        return this.dayEvents;
    },
    isInDay: function (event, day) {
        var start = CMS2CalendarPlayerModel.getDateObj(event.startDay);
        var end = CMS2CalendarPlayerModel.getDateObj(event.endDay);
        //var result = (start.getTime() <= this.day.getTime() && end.getTime() >= this.day.getTime());this is we want an event to span days
        var result = (end.getTime() <= this.day.getTime() && end.getTime() >= this.day.getTime()); // this only looks at endDay

        return result;
    },

}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */
var CMS2CalendarBlockPlayerController = Class.$extend({
    __init__: function (options) {

        this.model = options.model;
        this.view = options.view;
        this.view.setController(this);
        this.initWeeksDisplayed = 6;
        this.weeksToAdd = 1;
        this.loading = false;
        this.holderElement = this.view.getHolderElement();
        this.moduleID = this.model.getBlockID();
        this.viewElement = jQuery("#block_" + this.moduleID);
        this.instanceID = options.instanceID;
        this.format = options.format;
    },

     initCalendarPlayer: function () {

        if(this.format === "HorizontalList") {

            this.model.setEventsSettings('eventPage', 0);
            this.model.setEventsSettings('eventNumber', 12);
            this.initDateRange();
            this.model.retrieveEvents().then(jQuery.proxy(this.view.initialRender, this.view));
        }

        else {
            this.initDateRange();
            this.model.fullRefresh().then(jQuery.proxy(this.view.initialRender, this.view));
        }

     },


    eventScroll: function (mode) {
        var currentSettings = this.model.getEventsSettings();
        this.model.setEventsSettings('eventPage', currentSettings['eventPage'] + 1);
        this.model.retrieveEvents().then(jQuery.proxy(this.view.updateEventCollection, this.view, mode));
    },

     updateCalendarPlayer: function () {
        this.model.fullRefresh().then(jQuery.proxy(this.view.updateRender, this.view));
     },

       initDateRange: function () {
           var firstDate = new Date();   //set up around today
           var newEndDate;
           if (this.format === "VerticalList" || this.format === "HorizontalList")
           {
               newEndDate = new Date();
               newEndDate.setYear(firstDate.getFullYear()+1);
           }
           else
           {
               var firstOfMonth = CMS2CalendarPlayerModel.getFirstOfThisMonth(firstDate);
               this.model.setCurrentFirstOfMonth(firstOfMonth);
               firstDate = CMS2CalendarPlayerModel.getSunday(firstOfMonth);
               newEndDate = CMS2CalendarPlayerModel.getEndSaturday(new Date());
           }
           this.model.setFirstDate(firstDate);
           this.model.setEndDate(newEndDate);
           console.log(('+days='+(7 * this.initWeeksDisplayed) + 6))
       },

      updateWeek: function (newDate) {

          var firstOfMonth = this.model.getCurrentFirstOfMonth();
          var deltaMonths = new moment(newDate).diff(firstOfMonth, "months");
          firstOfMonth.getMonth();
          this.addMonths(deltaMonths);
       },


      addMonths: function (numMonths) {
        if (numMonths != 0)
        {
            var firstOfMonth = this.model.getCurrentFirstOfMonth();
            var moment1 = new moment(firstOfMonth);
            moment1.add(numMonths, "months");
            firstOfMonth = moment1.toDate();
            var newEndDate = CMS2CalendarPlayerModel.getEndSaturday(firstOfMonth);
            var newFirstDate = CMS2CalendarPlayerModel.getSunday(firstOfMonth);
            this.model.setFirstDate(newFirstDate);
            this.model.setEndDate(newEndDate);
            this.model.setCurrentFirstOfMonth(firstOfMonth);
            // console.log('new date range'+newFirstDate+' '+newEndDate);
        }
        this.updateCalendarPlayer();
      },

  getFirstDate: function () {
        return this.firstDateID;
    },

    addToTop: function () {
        if (this.loading == false) {
            this.viewElement.find(".jsTopWaiting").show();
            this.loading = true;
//            this.holderElement = this.view.getHolderElement();
            this.originalTopElementId = this.moduleID + this.model.getFirstDate();
            var updateRangeFn = jQuery.proxy(this.view.updateRange, this.view, true);
            var afterTopScrollFn = jQuery.proxy(this.afterTopScroll, this)
            this.model.addToTop(this.weeksToAdd).then(updateRangeFn).then(afterTopScrollFn);
        }
    },

    afterTopScroll: function () {
        var movedTopPosition = jQuery("#" + this.originalTopElementId).position();
        var movedTopPositionTop = movedTopPosition.top;
        if (movedTopPositionTop <= 1) {
            movedTopPosition = jQuery("#" + this.originalTopElementId).parent().position();
            movedTopPositionTop = movedTopPosition.top;
        }
        this.view.getHolderElement().scrollTop(movedTopPositionTop);
        this.loading = false;
        this.viewElement.find(".jsTopWaiting").hide()
    },

    addToBottom: function () {
        if (this.loading == false) {
            this.loading = true;
            this.viewElement.find(".jsBottomWaiting").show();
            var updateRangeFn = jQuery.proxy(this.view.updateRange, this.view, false);
            var afterBottomScrollFn = jQuery.proxy(this.afterBottomScroll, this);
            this.model.addToBottom(this.weeksToAdd).then(updateRangeFn).then(afterBottomScrollFn);
        }
    },
    afterBottomScroll: function () {

        var outerHeight = this.holderElement.outerHeight();
        var scrollHeight = this.holderElement[0].scrollHeight;
        this.holderElement.scrollTop(scrollHeight - outerHeight - 2);
        this.loading = false;
        this.viewElement.find(".jsBottomWaiting").hide()
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

//************************ VIEW


var CMS2CalendarPlayerView = Class.$extend({
    __init__: function (options) {
        this.model = options.model;
        this.callback = options.callback;
        this.viewWeeks = {};
        this.domCache = {};
        this.moduleID = this.model.getBlockID();
        this.setSpecialDays();
        this.viewElement = jQuery("#block_" + this.model.getBlockID());
        this.holderElement = this.viewElement.find(".jsCalendarHolder");
        this.format = options.format;
        this.scrollTargetLength = 1;
        this.check = false;
        this.isRelative = true;
        this.makeDomCache();
        this.setUpListeners();
        sl.log("CMS2CalendarPlayerView view options ", this.moduleID, this.viewElement, options)
    },

    setUpListeners: function () {
        this.loading = false
        //this.holderElement.on("scroll", jQuery.proxy(this.scrollHandler, this));

        this.viewElement.on({
            containerChangedSize: jQuery.proxy(this.containerChangedSizeHandler, this),
        });
        if (this.viewElement.find(".jsNextMonth").length > 0) {
            this.viewElement.on({
                click: jQuery.proxy(this.nextMonthHandler, this),
            }, ".jsNextMonth");

            this.viewElement.on({
                click: jQuery.proxy(this.prevMonthHandler, this),
            }, ".jsPrevMonth");
        }

        //this.viewElement.on({
        //     click: jQuery.proxy(this.nextWeekHandler, this),
        // }, ".jsNextWeek");
        //
        //this.viewElement.on({
        //     click: jQuery.proxy(this.prevWeekHandler, this),
        // }, ".jsPrevWeek");

        this.viewElement.on({
            mouseenter: jQuery.proxy(this.smallCellEnterHandler, this),
            mouseleave: jQuery.proxy(this.smallCellLeaveHandler, this),
            click: jQuery.proxy(this.smallCellClickHandler, this),
            keydown: jQuery.proxy(this.smallCellClickHandler, this)
        }, ".jsSmallDayCell");

        this.viewElement.on({
           // mouseenter: jQuery.proxy(this.smallCellEnterHandler, this),
            mouseleave: jQuery.proxy(this.filterFormLeaveHandler, this)
        }, ".jsFilterBox");
       
        this.viewElement.on({
            click: jQuery.proxy(this.filterScopeClickHandler, this)
        }, ".jsCalendarFilterScope");
    },

    setSpecialDays: function () {
        this.todayDate = new Date();
        this.todayDateId = this.moduleID + CMS2CalendarPlayerModel.idFormattedDate(this.todayDate);
        this.firstOfMonthDate = CMS2CalendarPlayerModel.getFirstOfThisMonth(new Date());
        this.firstOfMonthDateID = this.moduleID + CMS2CalendarPlayerModel.idFormattedDate(this.firstOfMonthDate);
        this.lastOfMonthDate = CMS2CalendarPlayerModel.getLastOfThisMonth(new Date());
        this.lastOfMonthDateID = this.moduleID + CMS2CalendarPlayerModel.idFormattedDate(this.lastOfMonthDate);
        this.lastSunday = CMS2CalendarPlayerModel.getSunday(new Date());
        this.lastSundayID = this.moduleID + CMS2CalendarPlayerModel.idFormattedDate(this.lastSunday);
        this.nextSundayDate = CMS2CalendarPlayerModel.getWeekLater(CMS2CalendarPlayerModel.getSunday(new Date()));
        this.nextSundayDateID = this.moduleID + CMS2CalendarPlayerModel.idFormattedDate(this.nextSundayDate);
    },

    getTodayDate: function () {
        return this.todayDate;
    },

    containerChangedSizeHandler: function () {
        //set in view subclass
    },
    setController: function (controller) {
        this.controller = controller;
    },
    smallCellEnterHandler: function (event) {
    },
    smallCellLeaveHandler: function (event) {
    },
    smallCellClickHandler: function (event) {
    },
    filterFormLeaveHandler: function (event) {
        var selectList = this.viewElement.find(".jsDropContent");
        selectList.fadeOut()
    },
    filterScopeClickHandler: function (event) {
        var target = event.target;
        this.model.updateFilterScope(target.id, target.checked, this.controller);
    },
   makeDomCache: function () {
        this.calendarElement = this.viewElement.find(".js" + this.format + "Holder");
        this.holderElement = this.viewElement.find(".jsCalendarHolder");
        this.domCache["jsDayCalItem"] = this.calendarElement.find(".jsDayCalItem")
    },

    getHolderElement: function () {
        return this.holderElement;
    },
    getViewElement: function () {
        return this.viewElement;
    },

     refreshDomCache: function (domClass) {
         if (domClass != null) {
             this.domCache[domClass] = this.calendarElement.find("." + domClass);
         }
         else {
             this.makeDomCache()
         }
     },

     emptyCalendarContents: function () {
         this.calendarElement.empty()
     },
    //
    // scrollHandler: function () {
    //     this.currentScroll = this.holderElement.scrollTop();
    //     var outerHeight = this.holderElement.outerHeight();
    //     var scrollHeight = this.holderElement[0].scrollHeight;
    //     if (scrollHeight - outerHeight - this.currentScroll <= this.scrollTargetLength) {
    //         this.controller.addToBottom();
    //     }
    //
    //     if (this.currentScroll <= this.scrollTargetLength) {
    //         this.controller.addToTop();
    //     }
    // },
    stripModuleIdFromDayID: function (dayID) {
        return dayID.replace(this.moduleID, '');

    },

    __classvars__: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        clonedElements: {},
        itemHeight: function (id) {
            return CMS2CalendarPlayerView.cloneFromTemplates(id).height()
        },
        cloneFromTemplates: function (className) {

            var element = CMS2CalendarPlayerView.clonedElements[className];
            if (element == null) {
                element = jQuery("#jsCalTemplates").find("." + className);
                //element.attr("id", "");
                CMS2CalendarPlayerView.clonedElements[className] = element;
            }
            return element.clone();
        }
    }
});

//************************ WEEK VIEW
var CMS2CalendarPlayerWeekView = CMS2CalendarPlayerView.$extend({
    __init__: function (options) {
        this.$super(options);
        this.currentDate = new Date();
    },

     initialRender: function () {
         var modelWeek = this.model.getModelWeeks();
         this.renderFrame();
         this.renderEvents();
         this.sizeSpecificRendering();
         //this.initialScroll(this.lastSundayID);
         this.initialWeekTitle();
         if (this.callback != null) {
             this.callback()
         }
     },
 
     updateRender: function () {
        this.renderFrame();
         this.renderEvents();
         this.initialWeekTitle();
         if (this.callback != null) {
             this.callback()
         }
     },
 
    sizeSpecificRendering: function () {
        // alert("size="+jQuery("#" + this.nextSundayDateID).parent().position())
        // var weekToTop = jQuery("#" + this.lastSundayID).parent().position().top;
        // var firstToTop = weekToTop + jQuery("#" + this.lastSundayID).position().top;
        // var lastToTop = jQuery("#" + this.nextSundayDateID).parent().position().top;
        // this.holderElement.height(lastToTop - firstToTop);
    },

     todayReturnHandler: function () {
         //this.scrollToDay(this.lastSundayID);
     },

     nextWeekHandler: function () {
         this.currentDate.setDate(this.currentDate.getDate() + 7);
         this.controller.updateWeek(this.currentDate);
     },
                    
     prevWeekHandler: function () {
         this.currentDate.setDate(this.currentDate.getDate() - 7);
         this.controller.updateWeek(this.currentDate);
     },
                    
    renderFrame: function () {
        var modelWeek = this.model.getCurrentWeek(this.currentDate);
        this.emptyCalendarContents();
        var weekView = new CMS2CalendarWeekViewWeek(modelWeek, this.model, this);
        this.viewWeeks[0] = weekView;
        var weekElement = weekView.render();
        this.calendarElement.append(weekElement);
    },

    renderEvents: function (deferredRender) {
        this.viewWeeks[0].renderWeekEvents();
        this.refreshDomCache("jsDayCalItem")
        this.refreshDomCache("jsDayCalItemInner")
        if (deferredRender != null) {
            deferredRender.resolve();
        }
    },
    getViewElement: function () {
        return this.viewElement;
    },

    updateRange: function (top) {
        var calendarWeeks = this.model.getNewWeeks();
        for (var i in calendarWeeks) {
            var modelWeek = calendarWeeks[i]
            this.viewWeeks[i] = new CMS2CalendarWeekViewWeek(modelWeek, this.model, this);
            var weekElement = this.viewWeeks[i].render();
            if (top) {
                this.calendarElement.prepend(weekElement);
            }
            else {
                this.calendarElement.append(weekElement);
            }
            this.viewWeeks[i].renderWeekEvents();
        }
        this.refreshDomCache("jsCalItem");
        this.refreshDomCache("jsCalItemInner");
    },

    // scrollHandler: function () {
    //     this.$super();
    //     this.updateWeekTitle();
    // },
    initialWeekTitle: function () {
        var modelWeek = this.model.getCurrentWeek(this.currentDate);
        this.fillWeekTitleWith(modelWeek.firstDay, modelWeek.lastDay);
    },


    updateWeekTitle: function () {

        var holderCoords = this.holderElement.offset();
        var element = jQuery.elementFromPoint(holderCoords.left + 10, holderCoords.top - jQuery(document).scrollTop() + 5);
        if (element != null && !jQuery(element).hasClass("click-shield")) {
            var targetRow = element.closest(".jsWeekTable");
            if (targetRow != null) {
                var dayCells = jQuery(targetRow).find(".jsWeekDayCell");
                var firstDateId = this.stripModuleIdFromDayID(jQuery(dayCells[0]).attr("id"));
                var lastDateId = this.stripModuleIdFromDayID(jQuery(dayCells[6]).attr("id"));
                this.fillWeekTitleWith(firstDateId, lastDateId)
            }
        }
    },
    fillWeekTitleWith: function (firstDate,lastDate) {
        var checkFirst = moment(firstDate)
        var firstMonthhName = checkFirst.format('MMMM');
        var firstDay = checkFirst.format("D");
        var checkSecond = moment(lastDate);

        var secondMonthName = (checkSecond.format('MMMM') == firstMonthhName) ? "" : checkSecond.format('MMMM') + " ";
        var secondDay = checkSecond.format("D");

        var weekNameString = firstMonthhName + " " + firstDay + " - " + secondMonthName + secondDay;
        this.viewElement.find(".jsWeekName").text(weekNameString);
    },
    // initialScroll: function () {
    //     var dayPosition = jQuery("#" + this.lastSundayID).position().top;
    //     dayPosition += jQuery("#" + this.lastSundayID).parent().position().top;
    //     this.holderElement.scrollTop(dayPosition)
    // },
    // scrollToDay: function (dayId) {
    //     var dayPosition = jQuery("#" + dayId).position().top;
    //     dayPosition += jQuery("#" + dayId).parent().position().top;
    //     this.holderElement.animate({
    //         scrollTop: dayPosition// - this.todayOffset
    //     }, 1000, "easeInOutQuad")
    // },
});


var CMS2CalendarWeekViewWeek = Class.$extend({
    __init__: function (modelWeek, model, view) {
        this.model = model;
        this.modelWeek = modelWeek;
        this.view = view;
        this.viewDays = {}
        this.jsWeek = CMS2CalendarPlayerView.cloneFromTemplates("jsWeekTable");
    },
    render: function () {
        var generatingWeek = this.jsWeek;
        //var extraCell = this.jsExtraCell;
        var modelDays = this.modelWeek.getDays();
        for (var i = 0; i <= 6; i++) {
            var day = modelDays[i];
            this.viewDays[i] = new CMS2CalendarWeekViewDay(day, this.model);
            var jsDay = this.viewDays[i].renderFrame();
            generatingWeek.append(jsDay);
        }
        return generatingWeek;
    },
    renderWeekEvents: function () {

        for (var i = 0; i <= 6; i++) {
            this.viewDays[i].renderEvents();
        }
    }
});

var CMS2CalendarWeekViewDay = Class.$extend({
    __init__: function (modelDay, model) {
        this.model = model;
        this.modelDay = modelDay;
        this.jsDay = CMS2CalendarPlayerView.cloneFromTemplates("jsWeekDayCell");
        this.todayDate = new Date();
        this.dayID = this.modelDay.getID();
        this.jsDayCalItem = CMS2CalendarPlayerView.cloneFromTemplates("jsDayCalItem");
    },
    renderFrame: function () {
        var date = this.modelDay.getDay();
        var isToday = CMS2CalendarPlayerModel.isSameDay(date, this.todayDate);
        var isEvenWeek = (moment(this.dayID, "YYYY-MM-DD").week() % 2);
        this.dayElement = this.jsDay.clone();
        if (isEvenWeek) {
            this.dayElement.addClass("sl-cms2-calendar__week__cell--odd-week")
        } else {
            this.dayElement.addClass("sl-cms2-calendar__week__cell--even-week")
        }
        if (isToday) {
            this.dayElement.addClass("sl-cms2-calendar__week__cell--today-highlight")
        }
        if ((date.getDay() == 0) || (date.getDay() == 6)) {
            this.dayElement.addClass("sl-cms2-calendar__week__cell--weekend")
        }
        //debugger;
        this.dayElement.attr("id", this.model.getBlockID() + this.dayID);
        this.dayElement.find(".jsDayName").text(CMS2CalendarPlayerView.days[date.getDay()]);
        this.dayElement.find(".jsDayDate").text(date.getMonth() + 1 + "-" + date.getDate());
        return this.dayElement;
    },
    renderEvents: function () {
        var events = this.modelDay.getEvents();
        var i, event;
        for (i = 0; i < events.length; i++) {
            event = events[i];
            this.renderEvent(event);
        }
    },
    renderEvent: function (event) {
        var jsNewItem = this.jsDayCalItem.clone();
        var jsDayCalItemInner = jsNewItem.find(".jsDayCalItemInner");
        jsDayCalItemInner.find(".jsEventTitle").text(event.title)
            .attr("data-href", "/pf4/cms2/event_display?id=" + event.ID + "&mod=content")
        if (event.allDay)
        {
            jsDayCalItemInner.find(".jsEventStartTime").text("All Day");
            jsDayCalItemInner.find(".jsEventEndTime").remove()
        }
        else
        {
            jsDayCalItemInner.find(".jsEventStartTime").text(event.startTimeString)
            jsDayCalItemInner.find(".jsEventEndTime").text(event.endTimeString);
        }
        jsDayCalItemInner.find(".jsEventDetails").html(event.description);
        this.dayElement.append(jsNewItem);
    }
});


//This is a jquery polyfiller for elementFromPoint
//used for determining months while scrolling
(function ($) {
    var check = false, isRelative = true;

    $.elementFromPoint = function (x, y) {
        if (!document.elementFromPoint) return null;

        if (!check) {
            var sl;
            if ((sl = $(document).scrollTop()) > 0) {
                isRelative = (document.elementFromPoint(0, sl + $(window).height() - 1) == null);
            }
            else if ((sl = $(document).scrollLeft()) > 0) {
                isRelative = (document.elementFromPoint(sl + $(window).width() - 1, 0) == null);
            }
            check = (sl > 0);
        }

        if (!isRelative) {
            x += $(document).scrollLeft();
            y += $(document).scrollTop();
        }
        return document.elementFromPoint(x, y);
    }

})(jQuery); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 6/26/17.
 * Globals sl *
 */

//************************ MONTH VIEW
var CMS2CalendarPlayerMonthView = CMS2CalendarPlayerView.$extend({
    __init__: function (options) {
        this.$super(options);
        this.todayOffset = 25;
        this.currentlySelectedId = this.todayDateId;
    },

    todayReturnHandler: function () {
        //this.scrollToDay(this.firstOfMonthDateID);
    },

    prevMonthHandler: function () {
        this.controller.addMonths(-1);
    },

    nextMonthHandler: function () {
        this.controller.addMonths(1);
    },

    initialRender: function () {
        this.setCalendarSize();
        this.renderFrame();
        this.renderEvents();
        this.sizeSpecificRendering()
        //this.initialScroll();
        this.initialMonthTitle();
        if (this.callback != null) {
            this.callback()
        }
    },

    updateRender: function () {
        this.renderFrame();
        this.renderEvents();
        this.sizeSpecificRendering()
        //this.initialScroll();
        this.updateMonthTitle();
        if (this.callback != null) {
            this.callback()
        }

    },

    sizeSpecificRendering: function () {
        if (this.calendarSize == "small") {
            this.showSmallEvents();
            this.setSmallHolderHeight();
        } //else {
            // Currently obsolete
            // this.setLargeHolderHeight();
        //}
    },

    setSmallHolderHeight: function () {
        return; /*eliminating this function as per Jikko #7374 - setting the height does not work properly
        for months with extra row like dec 2018*/
        var rowHeight = this.holderElement.find(".jsWeekRow:first").height();
        var correction = 0;
        if(rowHeight === 30) {
            correction = -10; //figure out better way to do this when more time - ld
        }
        this.holderElement.height(rowHeight * 6 + correction);
    },

    // Currently obsolete, left in for possible future use
    setLargeHolderHeight: function () {
        if (jQuery("#" + this.firstOfMonthDateID).position() && jQuery("#" + this.lastOfMonthDateID).position()) {
            var firstToTop = jQuery("#" + this.firstOfMonthDateID).position().top;
            var lastToTop = jQuery("#" + this.lastOfMonthDateID).position().top + jQuery("#" + this.lastOfMonthDateID).height();
            var monthHeight = lastToTop - firstToTop + 20;  // 20 extra to prevent scroll bar
            console.log('setting calendar month height:' + monthHeight);
            this.holderElement.height(monthHeight);
            this.weekHeight = monthHeight / Object.keys(this.model.getModelWeeks()).length;
        }
        else {
            // re-render: adjust calendar height to # of weeks
            this.holderElement.height(this.weekHeight * Object.keys(this.model.getModelWeeks()).length);
        }
    },

    // scrollToDay: function (dayId) {
    //     this.currentScroll = this.holderElement.scrollTop();
    //     var dayPosition = jQuery("#" + dayId).position().top;
    //     this.holderElement.animate({
    //         scrollTop: dayPosition
    //     }, 1000, "easeInOutQuad")
    // },

    // initialScroll: function () {
    //     var dayPosition = jQuery("#" + this.firstOfMonthDateID).position().top;
    //     this.holderElement.scrollTop(dayPosition)
    // },

    smallCellEnterHandler: function (event) {
        var target = (jQuery(event.target).hasClass("jsSmallDayCell")) ? jQuery(event.target) : jQuery(event.target).closest(".jsSmallDayCell");
        sl.log("small enter", target)
        target.addClass("sl-cms2-calendar__month__cell--hover")
    },
    smallCellLeaveHandler: function (event) {
        var target = (jQuery(event.target).hasClass("jsSmallDayCell")) ? jQuery(event.target) : jQuery(event.target).closest(".jsSmallDayCell");
        target.removeClass("sl-cms2-calendar__month__cell--hover")
    },
    smallCellClickHandler: function (event) {
        if ((event.type == 'keydown') && (event.which != sl.keyboard["ENTER"])) {     //allows keyboard accessibility... listener in calendar_player_view.js
            return;
        }
        var target = (jQuery(event.target).hasClass("jsSmallDayCell")) ? jQuery(event.target) : jQuery(event.target).closest(".jsSmallDayCell");
        this.currentlySelectedElement.removeClass("sl-cms2-calendar__month__cell--selected");
        this.currentlySelectedId = target.attr("id");
        this.showSmallEvents();
    },
    filterScopeClickHandler: function (event) {
        var target = event.target;
        this.model.updateFilterScope(target.id, target.checked, this.controller);
    },
    containerChangedSizeHandler: function () {
        this.resetCalendar()
        this.controller.initCalendarPlayer();
    },
    showSmallEvents: function () {
        this.currentlySelectedElement = jQuery("#" + this.currentlySelectedId)
        this.currentlySelectedElement.addClass("sl-cms2-calendar__month__cell--selected")
        jQuery("#" + this.currentlySelectedSmallEventsId).addClass("display-none")
        this.currentlySelectedSmallEventsId = "small_events_" + this.currentlySelectedId;
        jQuery("#" + this.currentlySelectedSmallEventsId).removeClass("display-none")
    },
    setCalendarSize: function () {
        sl.refreshElementQueries();
        if (this.viewElement.hasClass("sl_element_query_mobile_landscape") || this.viewElement.hasClass("sl_element_query_mobile_portrait")) {
            this.calendarSize = "small";
        } else {
            this.calendarSize = "large";
        }
        this.viewElement.addClass("sl-cms2-calendar__month__holder-" + this.calendarSize);
        this.holderElement.addClass("sl-cms2-calendar__month__" + this.calendarSize);
    },

    getSmallMonthDaysEventsHolder: function () {
        return this.viewElement.find(".jsSmallMonthDaysEventsHolder");
    },

    resetCalendar: function () {
        this.viewElement.removeClass("sl-cms2-calendar__month__holder-small sl-cms2-calendar__month__holder-large");
        this.holderElement.removeClass("sl-cms2-calendar__month__small sl-cms2-calendar__month__large")
        this.getSmallMonthDaysEventsHolder().empty();
        this.holderElement.find(".js" + this.format + "Holder").empty();
    },

    renderFrame: function () {
        var calendarWeeks;
        this.emptyCalendarContents();
        if (this.getSmallMonthDaysEventsHolder() != null) {
            this.getSmallMonthDaysEventsHolder().empty();
        }
        calendarWeeks = this.model.getModelWeeks();
        for (var i in calendarWeeks) {
            var modelWeek = calendarWeeks[i]
            this.viewWeeks[i] = new CMS2CalendarPlayerMonthViewWeek(modelWeek, this.model, this);
            var weekElement = this.viewWeeks[i].render(this.calendarSize);
            this.calendarElement.append(weekElement);
        }
    },

    renderEvents: function (deferredRender) {
        var calendarWeeks = this.model.getModelWeeks();
        for (var i in calendarWeeks) {
            this.viewWeeks[i].renderWeekEvents();
        }
    },

    updateRange: function (top) {
        var calendarWeeks = this.model.getNewWeeks();
        for (var i in calendarWeeks) {
            var modelWeek = calendarWeeks[i]
            this.viewWeeks[i] = new CMS2CalendarPlayerMonthViewWeek(modelWeek, this.model, this);
            var weekElement = this.viewWeeks[i].render(this.calendarSize);
            if (top) {
                this.calendarElement.prepend(weekElement);
            }
            else {
                this.calendarElement.append(weekElement);
            }
            this.viewWeeks[i].renderWeekEvents();
        }
        this.refreshDomCache("jsCalItem");
        this.refreshDomCache("jsCalItemInner");
    },
    // scrollHandler: function () {
    //     this.$super();
    //     //this.updateMonthTitle();
    // },

    initialMonthTitle: function () {
        var check = moment(this.stripModuleIdFromDayID(this.todayDateId), 'YYYY/MM/DD')
        var monthName = check.format('MMMM');
        var fullYear = check.format('YYYY');
        this.viewElement.find(".jsMonthName").text(monthName + "  " + fullYear);
    },

    updateMonthTitle: function () {
        var firstOfMonth = this.model.getCurrentFirstOfMonth();
        var moment1 = new moment(firstOfMonth);
        this.viewElement.find(".jsMonthName").text(moment1.format('MMMM') + "  " + moment1.format('YYYY'));
    }
})

var CMS2CalendarPlayerMonthViewWeek = Class.$extend({
    __init__: function (modelWeek, model, view) {
        this.modelWeek = modelWeek;
        this.model = model;
        this.view = view;
        this.viewDays = {}
        this.jsWeek = CMS2CalendarPlayerView.cloneFromTemplates("jsWeekRow");
        this.jsExtraCell = CMS2CalendarPlayerView.cloneFromTemplates("jsExtraCell");
    },
    render: function (calendarSize) {
        var generatingWeek = this.jsWeek
        var extraCell = this.jsExtraCell;
        var priorDay = null;
        var modelDays = this.modelWeek.getDays();

        for (var i = 0; i <= 6; i++) {
            var day = modelDays[i];
            this.viewDays[i] = new CMS2CalendarPlayerMonthViewDay(day, this.view, this.model);
            var jsDay = this.viewDays[i].renderFrame(calendarSize);
            generatingWeek.append(jsDay);
        }
        generatingWeek.append(extraCell)
        return generatingWeek;
    },
    renderWeekEvents: function () {
        for (var i = 0; i <= 6; i++) {
            this.viewDays[i].renderEvents();
        }
    },
})


var CMS2CalendarPlayerMonthViewDay = Class.$extend({
    __init__: function (modelDay, view, model) {
        this.model = model;
        this.modelDay = modelDay;
        this.view = view;
        this.viewElement = this.view.getViewElement()
        this.jsDay = CMS2CalendarPlayerView.cloneFromTemplates("jsDayCell");
        this.todayDate = this.view.getTodayDate()
        this.dayID = this.modelDay.getID();
        this.jsDayCalItem = CMS2CalendarPlayerView.cloneFromTemplates("jsMonthCalItem");
        this.jsSmallMonthDaysEventsHolder = this.view.getSmallMonthDaysEventsHolder();
        this.jsSmallMonthDayHolder = CMS2CalendarPlayerView.cloneFromTemplates("jsSmallMonthDayHolder");
        this.jsSmallMonthItem = CMS2CalendarPlayerView.cloneFromTemplates("jsSmallMonthItem");
        this.dayElement = null;

    },
    renderFrame: function (calendarSize) {
        this.calendarSize = calendarSize;
        var date = this.modelDay.getDay();
        var isEvenMonth = (date.getMonth() % 2);
        var isToday = CMS2CalendarPlayerModel.isSameDay(date, this.todayDate);
        var isInCurrentMonth = CMS2CalendarPlayerModel.isInCurrentMonth(date, this.todayDate)

        this.dayElement = this.jsDay.clone();
        if (isToday) {
            this.dayElement.addClass("sl-cms2-calendar__month__cell--today-highlight")
        }

        if ((date.getDay() == 0) || (date.getDay() == 6)) {
            this.dayElement.addClass("sl-cms2-calendar__month__cell--weekend")
        }

        this.dayElement.attr("id", this.model.getBlockID() + this.dayID);
        this.dayElement.find(".jsDateNumber").text(date.getDate());

        if (this.calendarSize == "small") {
            this.dayElement.addClass("jsSmallDayCell");
            this.smallMonthDayHolder = this.jsSmallMonthDayHolder.clone();
            this.smallMonthDayHolder.attr("id", "small_events_" + this.model.getBlockID() + this.dayID)
            this.jsSmallMonthDaysEventsHolder.append(this.smallMonthDayHolder);
        } else {
            this.dayElement.removeClass("jsSmallDayCell");
        }
        return this.dayElement;
    },
    renderEvents: function () {
        var events = this.modelDay.getEvents();
        var event, i;
        this.addMonthAndDayString();
        if (events != null && events.length > 0)
        {
            for (i = 0; i < events.length; i++)
            {
                event = events[i];
                this.renderEvent(event);
            }
        }
        else 
        {
            this.renderNoEvents()
        }
    },
    
    addMonthAndDayString: function () {
        sl.log('month day string', this.calendarSize);
        if (this.calendarSize !== "large") {
            var momnt = moment(this.modelDay.getID(), 'YYYY/MM/DD')
            var monthName = momnt.format('MMMM');
            var day = momnt.format('D');
            var jsDateElement = this.smallMonthDayHolder.find(".jsMonthAndDayString").text(monthName + ' ' + day);
        }
    },

    renderEvent: function (event) {
        this.dayElement.addClass("jsHasEvent sl-cms2-calendar__month__cell--has-event");
        if (this.calendarSize == "large") {
            sl.log("Add  a large", this.dayElement)
            var jsNewItem = this.jsDayCalItem.clone();
            var jsDayCalItemInner = jsNewItem.find(".jsDayCalItemInner");
            //debugger;
            jsDayCalItemInner.find(".jsEventTitle")
                .attr("data-href", "/pf4/cms2/event_display?id=" + event.ID + "&mod=content")
                .attr("id",this.viewElement.attr("id") + "_event_" + event.ID)
                .text(event.title);

            //populate event time
            if(!event.allDay) {
                jsDayCalItemInner.find(".jsEventStartTime")
                    .addClass('sl-cms2-calendar__month__cell--time-populated')
                    .attr("data-href", "/pf4/cms2/event_display?id=" + event.ID + "&mod=content")
                    .attr("id", this.viewElement.attr("id") + "_event_" + event.ID)
                    .text(event.startTimeString);
            } else {
                jsDayCalItemInner.find(".jsEventStartTime").removeClass('sl-cms2-calendar__month__cell--time-populated');
            }

            this.dayElement.append(jsNewItem);
        } else {
            sl.log("month view renderEvent small event", event);
            this.dayElement.attr("tabindex", "0")
            var jsNewItem = this.jsSmallMonthItem.clone();
            var jsDayCalItemInner = jsNewItem.find(".jsSmallMonthItemInner");
            jsDayCalItemInner.find(".jsEventTitle")
                .attr("data-href", "/pf4/cms2/event_display?id=" + event.ID + "&mod=content")
                .attr("id",this.viewElement.attr("id") + "_event_" + event.ID)
                .text(event.title);
            if (event.allDay) {
                jsDayCalItemInner.find(".jsEventStartTime").text("All Day");
                jsDayCalItemInner.find(".jsEventEndTime").remove()
            }
            else {
                jsDayCalItemInner.find(".jsEventStartTime").text(event.startTimeString)
                jsDayCalItemInner.find(".jsEventEndTime").text(event.endTimeString);
            }
            this.smallMonthDayHolder.append(jsNewItem);
        }
    },

    renderNoEvents: function () {
        if (this.calendarSize != "large") {
            sl.log("renderNoEvents small");
            this.dayElement.attr("tabindex", "0")
            var jsNewItem = this.jsSmallMonthItem.clone();
            var jsDayCalItemInner = jsNewItem.find(".jsSmallMonthItemInner");
            jsDayCalItemInner.find(".jsEventIfNoEvents").text("No events on calendar today");
            jsNewItem.find(".jsEventTitle").attr("tabindex","-1")
            this.smallMonthDayHolder.append(jsNewItem);
        }
    },
    
    renderSmallCalendarEvents: function (event) {
        var jsSmallDayEvent = this.jsSmallMonthItem.clone();
    }

})

var CMS2CalendarPlayerMonthWithListView = CMS2CalendarPlayerMonthView.$extend({
    __init__: function (options) {
        this.$super(options);
        this.jsSmallMonthDaysEventsHolderRight = this.viewElement.find(".jsSmallMonthDaysEventsHolderRight")
    },

    setCalendarSize: function () {
        // always small - only the event list location changes
        sl.refreshElementQueries();
        this.calendarSize = "small";
        this.viewElement.addClass("sl-cms2-calendar__month__holder-" + this.calendarSize);
        this.holderElement.addClass("sl-cms2-calendar__month__" + this.calendarSize);
    },

    // get RHS list if large, bottom list if small
    getSmallMonthDaysEventsHolder: function () {
        var holder;
        if (this.viewElement.hasClass("sl_element_query_mobile_landscape") || this.viewElement.hasClass("sl_element_query_mobile_portrait")) {
            this.viewElement.find(".jsSmallMonthDaysEventsHolderRight").addClass("display-none");
            this.viewElement.find(".jsSmallMonthDaysEventsHolderRight").empty();
            holder = this.viewElement.find(".jsSmallMonthDaysEventsHolder"); // bottom
            holder.removeClass("display-none");
        } else {
            this.viewElement.find(".jsSmallMonthDaysEventsHolder").addClass("display-none");
            this.viewElement.find(".jsSmallMonthDaysEventsHolder").empty();
            holder = this.viewElement.find(".jsSmallMonthDaysEventsHolderRight"); // rhs
            holder.removeClass("display-none");
        }
        return holder;
    }
}) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 6/26/17.
 * Globals sl *
 */

var CMS2CalendarPlayerVerticalListView = CMS2CalendarPlayerView.$extend({
        __init__: function (options) {
            this.$super(options);
            //this.currentlySelectedId = this.todayDateId;
            this.jsEventListHolder = this.viewElement.find(".jsEventListHolder");
            this.jsEventListItem = CMS2CalendarPlayerView.cloneFromTemplates("jsEventListItem");
        },
    
        initialRender: function () {
            this.updateRender();
        },
    
        updateRender: function () {
            this.renderEvents()
            if (this.callback != null) {
                 this.callback()
             }
          },
    
        filterScopeClickHandler: function (event) {
            var target = event.target;
            this.model.updateFilterScope(target.id, target.checked, this.controller);
        },

        renderEvents: function () {
            this.jsEventListHolder.empty();
            var events = this.model.getEvents();
            for (var i in events) {
                this.renderEvent(events[i]);
            }
        },
    
         renderEvent: function (event) {
            sl.log("renderEvent small event", event)
            var jsNewItem = this.jsEventListItem.clone();
            var jsDayCalItemInner = jsNewItem.find(".jsEventListItemInner");
            jsDayCalItemInner.find(".jsEventTitle")
                .attr("data-href", "/pf4/cms2/event_display?id=" + event.ID + "&mod=content")
                .attr("id",this.viewElement.attr("id") + "_event_" + event.ID)
                .text(event.title);
            jsDayCalItemInner.find(".jsMonthString").text(event.monthString)
            jsDayCalItemInner.find(".jsDayOfMonthString").text(event.dayOfMonthString)
            if (event.allDay)
            {   jsDayCalItemInner.find(".jsEventStartTime").text("All Day");
                jsDayCalItemInner.find(".jsEventEndTime").remove()}
            else {
                jsDayCalItemInner.find(".jsEventStartTime").text(event.startTimeString)
                jsDayCalItemInner.find(".jsEventEndTime").text(event.endTimeString);
            }

            this.jsEventListHolder.append(jsNewItem);
        }

    })

var CMS2CalendarPlayerHorizontalListView = CMS2CalendarPlayerVerticalListView.$extend({
        __init__: function (options) {
            this.$super(options);
            this.jsEventListItem = CMS2CalendarPlayerView.cloneFromTemplates("jsEventListItemHorizontal");
            this.navInfo = {};
            this.eventCollection = [];
            this.initializeViewParameters();
            this.setUpHorizontalListeners();
        },

        initializeViewParameters: function () {
            this.navInfo['widthMap'] = [0, 500, 850, 1200, 1550, 1900];
            this.navInfo['vertEventNumber'] = 4;
            this.initDisplayNumber();
            this.navInfo['eventsDisplayed'] = this.navInfo['eventDisplayNumber'];
            this.navInfo['eventScrollNumber'] = this.navInfo['eventDisplayNumber'];
            this.navInfo['displayStart'] = 0;
            this.navInfo['displayEnd'] = this.navInfo['eventDisplayNumber'];
            this.navInfo['nearEndOfEvents'] = false;
            this.navInfo['noMoreEventData'] = false;
            this.navInfo['allowResizeAction'] = true;
        },

        setUpHorizontalListeners: function () {
            jQuery(window).resize(jQuery.proxy(this.updateDisplayNumber, this));
            jQuery(window).on('keydown', jQuery.proxy(this.keydownHandler, this));
            this.viewElement.find(".jsCalendarEventsNavPrev").on('click keypress', jQuery.proxy(this.calendarNav, this, 'prev'));
            this.viewElement.find(".jsCalendarEventsNavNext").on('click keypress', jQuery.proxy(this.calendarNav, this, 'next'));
        },

        populateEventCollection: function () {
            var newEvents = this.model.getEvents();
            if(newEvents) {
                this.eventCollection = this.eventCollection.concat(this.model.getEvents());
            }
        },

        getDisplayWidth: function () {
            return this.viewElement.width();
        },

        initDisplayNumber: function() {
            var testWidth = 0;

            if(this.getDisplayWidth() >= this.navInfo['widthMap'][this.navInfo['widthMap'].length-1]) {
                this.navInfo['eventDisplayNumber'] = this.navInfo['widthMap'].length;
                return;
            }

            while(testWidth < this.navInfo['widthMap'].length) {
                if(this.getDisplayWidth() < this.navInfo['widthMap'][testWidth + 1]) {
                    break;
                }
                testWidth++;
            }

            if(testWidth >= 1) {
                this.navInfo['eventDisplayNumber'] = testWidth + 1;
            } else {
                this.navInfo['eventDisplayNumber'] = this.navInfo['vertEventNumber'];
                this.navInfo['isMobile'] = true;
            }
        },

        updateDisplayNumber: function() {
            if(this.viewElement.hasClass('sl_element_query_mobile_landscape') ||
                this.viewElement.hasClass('sl_element_query_mobile_portrait')) {
                if(this.navInfo['eventDisplayNumber'] < this.navInfo['vertEventNumber'] &&
                    this.navInfo['allowResizeAction'] ) {
                    this.navInfo['allowResizeAction'] = false;
                    for (var i = this.navInfo['eventDisplayNumber']; i < this.navInfo['vertEventNumber']; i++) {
                        this.addOneEvent();
                    }
                    this.navInfo['allowResizeAction'] = true;
                }
                return;
            }

           if(this.getDisplayWidth() >= this.navInfo['widthMap'][this.navInfo['eventDisplayNumber']]  &&
                this.navInfo['allowResizeAction']) {
                this.navInfo['allowResizeAction'] = false;
                this.addOneEvent();
                this.navInfo['allowResizeAction'] = true;
            }
            else if(this.getDisplayWidth() < this.navInfo['widthMap'][this.navInfo['eventDisplayNumber'] - 1] &&
                this.navInfo['allowResizeAction']) {
                this.navInfo['allowResizeAction'] = false;
                this.removeOneEvent();
                this.navInfo['allowResizeAction'] = true;
            }
        },


        keydownHandler: function (e) {
            var keyCode = e.keyCode || e.which;

            switch (keyCode) {
                case sl.keyboard["LEFT"] :
                    this.calendarNav('prev', e);
                    break;
                case sl.keyboard["RIGHT"] :
                    this.calendarNav('next', e);
                    break;
                default : return;

            }
        },

        calendarNav: function(dir, event) {
            var prevNavElement = this.viewElement.find(".jsCalendarEventsNavPrev"),
                nextNavElement = this.viewElement.find(".jsCalendarEventsNavNext"),
                code = (event.keyCode ? event.keyCode : event.which);

            if (code != sl.keyboard["ENTER"] &&
                code != sl.keyboard["SPACE"] &&
                code != sl.keyboard["LEFT"] &&
                code != sl.keyboard["RIGHT"] &&
                (code != 1 )) {
                return;
            }

            if (dir === 'prev' && !prevNavElement.hasClass('sl-cms2-calendar-nav-arrows__button--disabled')) {
                this.navInfo['nearEndOfEvents'] = false;
                this.backwardPage();
                this.setEventContainer('backwardPage');
            }

            if (dir === 'next'&& !nextNavElement.hasClass('sl-cms2-calendar-nav-arrows__button--disabled')) {
                this.forwardPage();
                this.setEventContainer('forwardPage');

            }

        },

        disableCalendarNav: function (navElement) {
            navElement.off('click', jQuery.proxy(this.calendarNav, this))
                .removeAttr('tabIndex').addClass('sl-cms2-calendar-nav-arrows__button--disabled');

        },

        enableCalendarNav: function (navElement) {
            var dir;

            if(navElement.hasClass('jsCalendarEventsNavPrev')) {
                dir = 'prev';
            } else {
                dir = 'next';
            }

            if(navElement.hasClass('sl-cms2-calendar-nav-arrows__button--disabled')) {
                navElement.on('click', jQuery.proxy(this.calendarNav, this, dir))
                    .attr('tabIndex', 0).removeClass('sl-cms2-calendar-nav-arrows__button--disabled');
            }
        },

        addOneEvent: function() {
            this.navInfo['eventDisplayNumber']++;
            if(this.eventCollection[this.navInfo['eventsDisplayed']]) {
                this.navInfo['eventsDisplayed']++;
            }
            this.setEventContainer('addOneEvent');
        },

        removeOneEvent: function () {
            this.navInfo['eventDisplayNumber']--;
            if(!this.navInfo['nearEndOfEvents'] &&
                this.eventCollection[this.navInfo['eventsDisplayed']+ 1]) {
                this.navInfo['eventsDisplayed']--;
            }
            this.setEventContainer('removeOneEvent');
        },

        forwardPage: function() {
           if(!this.navInfo['nearEndOfEvents']) {
                this.navInfo['eventsDisplayed'] += this.navInfo['eventDisplayNumber'];
            } else {
                this.navInfo['eventsDisplayed'] = this.eventCollection.length;
            }
        },

        backwardPage: function () {
            if (this.navInfo['eventsDisplayed'] >= 2*this.navInfo['eventDisplayNumber']) {
                this.navInfo['eventsDisplayed'] -= this.navInfo['eventDisplayNumber'];
            } else {
                this.navInfo['eventsDisplayed'] = this.navInfo['eventDisplayNumber'];
            }
        },

        setEventContainer: function(mode) {
            var events = this.eventCollection;
            this.navInfo['displayStart'] = this.navInfo['eventsDisplayed'] - this.navInfo['eventDisplayNumber'];
            this.navInfo['displayEnd'] = this.navInfo['eventsDisplayed'];

            if (this.navInfo['eventsDisplayed'] + this.navInfo['eventDisplayNumber'] > events.length) {
                if(!this.navInfo['noMoreEventData']) {
                    this.controller.eventScroll(mode);
                } else  {
                    this.navInfo['nearEndOfEvents'] = true;
                    this.renderEvents(mode);
                }

            } else {
                this.renderEvents(mode);
            }
        },

        updateEventCollection: function (mode) {
            this.populateEventCollection();
            this.renderEvents(mode);
            if(!this.model.getEvents() || this.model.getEvents().length < this.navInfo['eventDisplayNumber']) {
                this.navInfo['nearEndOfEvents'] = true;
                this.navInfo['noMoreEventData'] = true;
            }
        },

        renderEvents: function (mode) {
            if(!this.eventCollection.length) {
                this.populateEventCollection();
            }
            var events = this.eventCollection;

            if (this.navInfo['displayStart'] <= 0) {
                this.disableCalendarNav(this.viewElement.find(".jsCalendarEventsNavPrev"));
            } else {
                this.enableCalendarNav(this.viewElement.find(".jsCalendarEventsNavPrev"));
            }

            if (this.navInfo['displayEnd'] >= events.length) {
                this.disableCalendarNav(this.viewElement.find(".jsCalendarEventsNavNext"));
            } else {
                this.enableCalendarNav(this.viewElement.find(".jsCalendarEventsNavNext"));
            }

            if(!mode) {
                var eventSubset = events.slice(this.navInfo['displayStart'], this.navInfo['displayEnd']);
                for (var i in eventSubset) {
                    this.renderEvent(eventSubset[i]);
                }

                this.clampTitles();
                this.displayParamRefresh();
            } else {
                switch(mode) {
                    case 'forwardPage':
                        this.viewElement.hasClass('sl_element_query_mobile_landscape') ||
                        this.viewElement.hasClass('sl_element_query_mobile_portrait')   ? this.renderDownward():this.renderForward();
                        break;
                    case 'backwardPage':
                        this.viewElement.hasClass('sl_element_query_mobile_landscape') ||
                        this.viewElement.hasClass('sl_element_query_mobile_portrait')    ? this.renderUpward():this.renderBackward();
                        break;
                    case 'addOneEvent':
                        if(this.navInfo['displayEnd'] > this.navInfo['prevDisplayEnd']) {
                            this.renderEvent(this.eventCollection[this.navInfo['displayEnd']-1]);
                        } else {
                            this.renderEvent(this.eventCollection[this.navInfo['displayStart']], true);
                        }
                        this.displayParamRefresh();
                        break;
                    case 'removeOneEvent':
                        if(this.navInfo['displayEnd'] < this.navInfo['prevDisplayEnd']) {
                            this.removeFrontEvents();
                        } else {
                            this.removeEvent(0);
                        }
                        this.displayParamRefresh();
                        break;

                    default:
                        return;
                }
            }
        },

        displayParamRefresh: function () {
            this.navInfo['prevDisplayStart'] = this.navInfo['displayStart'];
            this.navInfo['prevDisplayEnd'] = this.navInfo['displayEnd'];
        },

        clampTitles: function () {
            sl.textClamper(this.jsEventListHolder.find('.jsEventListItemHorizontal'), "jsEventTitle");
        },

        freezeHorizontalElements: function (slider) {
            var events = this.eventCollection,
                sliderWidth = slider.width(),
                eventItems = this.jsEventListHolder.find('.jsEventListItemHorizontal');

            slider.css('width', sliderWidth);
            for(var i = 0; i < eventItems.length; i++) {
               eventItems.eq(i).css('width', eventItems.eq(i).outerWidth() + 'px');
            }

            eventItems.css({
                'flex-grow': '0',
                'flex-shrink': '0'
            });
        },

        freezeNewItemWidth: function (newItem, firstElementWidth) {
            newItem.css({
                'flex-grow': '0',
                'flex-shrink': '0',
                'width': firstElementWidth
            });
        },

        renderForward: function () {
            var  slider = this.viewElement.find('.jsEventListSlider'),
                firstElementWidth = this.jsEventListHolder.find('.jsEventListItemHorizontal').width();
                offsetWidth = 0;

            this.freezeHorizontalElements(slider);

            for(var i = this.navInfo['prevDisplayEnd']; i < this.navInfo['displayEnd']; i++) {
                var newItem =this.renderEvent(this.eventCollection[i]);
                this.freezeNewItemWidth(newItem, firstElementWidth);
                offsetWidth += parseInt(this.jsEventListHolder
                    .find('.jsEventListItemHorizontal')
                    .eq(i - this.navInfo['prevDisplayEnd']).outerWidth(true));
            }

            this.clampTitles();
            this.jsEventListHolder.animate({
                marginLeft: '-' + offsetWidth + 'px'
            }, 500, 'swing', jQuery.proxy(this.removeBackEvents, this, slider));
        },

        renderBackward: function () {
            var slider = this.viewElement.find('.jsEventListSlider'),
                firstElementWidth = this.jsEventListHolder.find('.jsEventListItemHorizontal').width(),
                offsetWidth=0;

            this.freezeHorizontalElements(slider);

            for(var i = this.navInfo['prevDisplayStart'] - 1; i >= this.navInfo['displayStart'];  i--) {
                var newItem = this.renderEvent(this.eventCollection[i], true);
                this.freezeNewItemWidth(newItem, firstElementWidth);
                offsetWidth += parseInt(this.jsEventListHolder.find('.jsEventListItemHorizontal').eq(0).outerWidth(true));
            }

            this.jsEventListHolder.css({
                'margin-left': '-' + offsetWidth + 'px'
            });

            this.clampTitles();

            this.jsEventListHolder.animate({
                'margin-left': 0
            }, 500, 'swing', jQuery.proxy(this.removeFrontEvents, this, slider));
        },

        renderDownward: function () {
            var  slider = this.viewElement.find('.jsEventListSlider');
            offsetHeight = 0;

            slider.css('height', slider.height());

            for(var i = this.navInfo['prevDisplayEnd']; i < this.navInfo['displayEnd']; i++) {
                var newItem =this.renderEvent(this.eventCollection[i]);
                offsetHeight += parseInt(this.jsEventListHolder
                    .find('.jsEventListItemHorizontal')
                    .eq(i - this.navInfo['prevDisplayEnd']).outerHeight(true));
            }

            this.clampTitles();
            this.jsEventListHolder.animate({
                marginTop: '-' + offsetHeight + 'px'
            }, 500, 'swing', jQuery.proxy(this.removeTopEvents, this, slider));
        },

        renderUpward: function () {
            var slider = this.viewElement.find('.jsEventListSlider'),
                offsetHeight=0;

            slider.css('height', slider.height());

            for(var i = this.navInfo['prevDisplayStart'] - 1; i >= this.navInfo['displayStart'];  i--) {
                var newItem = this.renderEvent(this.eventCollection[i], true);
                offsetHeight += parseInt(this.jsEventListHolder.find('.jsEventListItemHorizontal').eq(0).outerHeight(true));
            }

            this.jsEventListHolder.css({
                'margin-top': '-' + offsetHeight + 'px'
            });

            this.clampTitles();

            this.jsEventListHolder.animate({
                'margin-top': 0
            }, 500, 'swing', jQuery.proxy(this.removeBottomEvents, this, slider));
        },

        unfreezeHorizontalElements: function (slider) {
            slider.css('width', '100%');

            this.jsEventListHolder.find('.jsEventListItemHorizontal').css({
                'flex-grow': '1',
                'flex-shrink': '1',
                'width': 'auto'
            });
        },

        removeBackEvents: function (slider) {
            var numberToRemove = (this.navInfo['displayStart'] - this.navInfo['prevDisplayStart']);
            for(var j = 0; j < numberToRemove; j++ ) {
                this.removeEvent(0);
            }
            this.jsEventListHolder.css('margin-left', 0);
            this.unfreezeHorizontalElements(slider);
            this.displayParamRefresh();
        },

        removeTopEvents: function (slider) {
            var numberToRemove = (this.navInfo['displayStart'] - this.navInfo['prevDisplayStart']);
            for(var j = 0; j < numberToRemove; j++ ) {
                this.removeEvent(0);
            }
            this.jsEventListHolder.css('margin-top', 0);
            slider.css('height', 'auto');
            this.displayParamRefresh();
        },

        removeFrontEvents: function (slider) {
            var numberToRemove = (this.navInfo['prevDisplayEnd'] - this.navInfo['displayEnd']);
            for(var j = 0; j < numberToRemove; j++ ) {
                this.removeEvent(this.jsEventListHolder.find('.jsEventListItemHorizontal').length -1);
            }
            if(slider) {
                this.unfreezeHorizontalElements(slider);
                slider.css('height', 'auto');
            }
            this.displayParamRefresh();
        },

        removeBottomEvents: function(slider) {
            var numberToRemove = (this.navInfo['prevDisplayEnd'] - this.navInfo['displayEnd']);
            for(var j = 0; j < numberToRemove; j++ ) {
                this.removeEvent(this.jsEventListHolder.find('.jsEventListItemHorizontal').length -1);
            }
            if(slider) {
                slider.css('height', 'auto');
            }
            this.displayParamRefresh();
        },

        removeEvent: function(eventNumber) {
            this.jsEventListHolder.find('.jsEventListItemHorizontal').eq(eventNumber).remove();
        },

        renderEvent: function (event, prePlace) {
            var jsNewItem = this.jsEventListItem.clone();
            var jsDayCalItemInner = jsNewItem.find(".jsEventListItemInner");
            jsDayCalItemInner.find(".jsEventTitle")
                .attr("data-href", "/pf4/cms2/event_display?id=" + event.ID + "&mod=content")
                .attr("id",this.viewElement.attr("id") + "_event_" + event.ID)
                .text(event.title);
            jsDayCalItemInner.find(".jsMonthString").text(event.monthString)
            jsDayCalItemInner.find(".jsDayOfMonthString").text(event.dayOfMonthString)
            if (event.allDay)
            {   jsDayCalItemInner.find(".jsEventStartTime").text("All Day");
                jsDayCalItemInner.find(".jsEventEndTime").remove()}
            else {
                jsDayCalItemInner.find(".jsEventStartTime").text(event.startTimeString)
                jsDayCalItemInner.find(".jsEventEndTime").text(event.endTimeString);
            }
            if(prePlace) {
                this.jsEventListHolder.prepend(jsNewItem);
            } else {
                this.jsEventListHolder.append(jsNewItem);
            }

            return jsNewItem;

        }
    }) /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var NoteListEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("init notelist here");
        this.format = options.format;
        this.$super(options);
        this.initListeners();
    },

    initListeners: function () {
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    justAddedHandler: function () {
        this.openOptionsDialog();
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_notes_block";
        var variables = {
            mod: "edit_generic_content",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_generic_content";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var AssignmentListEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        sl.log("init assignmentlist here");
        this.format = options.format;
        this.$super(options);
        this.initListeners();
    },

    initListeners: function () {
        this.initTitleListener();
    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    justAddedHandler: function () {
        this.openOptionsDialog();
    },

    openOptionsDialog: function () {
        this.getForm().then(jQuery.proxy(this.openDialog, this))
    },

    getForm: function () {
        var url = "/pf4/cms2/edit_assignment_block";
        var variables = {
            mod: "edit_generic_content",
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            no_buttons: true,
            ajax_post: true,
        };
        sl.addAjaxScope(variables);

        var formAjax = jQuery.ajax({
            url: url,
            data: variables
        })
        return formAjax;
    },

    openDialog: function (data) {
        sl.log("openDialog data", data);
        var dialogData = {
            contentClassName: "sl-dialog-medium",
            html: data,
            dialogCallback: jQuery.proxy(this.dialogCallback, this)
        };
        var dialog = new Dialog(dialogData);
        dialog.createDialogWithHtml();
    },

    dialogCallback: function (data) {
        if (data == false) {
            return;
        }
        var formID = "edit_generic_content";
        var options = {};
        options["success"] = jQuery.proxy(this.submitSuccessHandler, this);
        sl.ajaxSubmit("submit", formID, options);
    },

    submitSuccessHandler: function () {
        var editor = EditCMS2Page.findModule();
        editor.updateBlock(this.blockID);
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */


var FeatureStory = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.rteEditorId = options.rteEditorId;
        sl.log("init FeatureStory options", options);
        this.fromLockerURL = options.fromLockerURL;
        this.setImageFromLockerURL = options.setImageFromLockerURL;
        this.imageURL = options.imageURL;
        this.editorInFocus = false;
        this.toolbar = options.toolbar;
        this.titleElement = this.blockElement.find(".jsFeatureStoryTitle")
        this.rteElement = jQuery("#" + this.rteEditorId);
        this.bodyElement = this.blockElement.find(".jsFeatureStoryBody")
        this.linkElement = this.blockElement.find(".jsFeatureStoryLink");
        this.initListeners();
        jQuery(".jsToolbarExternalMoreButtonHolder").hide();
        this.preventImageDragging();
    },

    initListeners: function () {
        this.blockElement.on({
            "click": jQuery.proxy(this.clickRteHandler, this)
        }, "#" + this.rteEditorId);

        this.blockElement.on({
            "click": jQuery.proxy(this.clickBlockHandler, this),
            "keyup paste cut mouseup": jQuery.proxy(this.changeHandler, this)
        });

        this.titleElement.on({
            "keydown": jQuery.proxy(this.checkCharacterCount, this, this.titleElement)
        });

        this.linkElement.on({
            "keydown": jQuery.proxy(this.checkCharacterCount, this, this.linkElement)
        })

        this.bodyElement.on({
            "keydown": jQuery.proxy(this.checkCharacterCount, this, this.bodyElement)
        })

        this.blockElement.on("jsChildModuleReloaded", jQuery.proxy(this.childReloaded, this));
    },

    checkCharacterCount: function (element, event) {
        var limits = element.data("character-limits");
        if (limits != null){
            var max = limits.default;
            var i = 0;
            while (limits.widths[i]["width"] < element.width() || i == limits.widths.length) {
                max = limits.widths[i]["chars"]
                i++
            }

            if (event.which == 13) {
                //sl.alert("Text only in this area. No new lines or paragraphs.")
                event.preventDefault();
            } else if (event.which != 8 && element.text().length > max)
             {
                sl.alert("This area has a limit of " + max + " characters.")
                event.preventDefault();
            }
        }
    },

    clickBlockHandler: function (event) {
        var target = jQuery(event.target)
        if (!target.hasClass("jsFeatureStoryBody") && (target.parents(".jsFeatureStoryBody").length == 0)) {
            jQuery(".jsToolbarExternalMoreButtonHolder").hide();
        } else {
            jQuery(".jsToolbarExternalMoreButtonHolder").show();
        }
    },

    clickRteHandler: function (event) {
        sl.log("clickRteHandler");
        if (!this.editorInFocus) {
            this.editor = EditCMS2Page.findModule().getRichTextEditor();
            jQuery("#" + this.rteEditorId).attr("contenteditable", true).focus();
            var newSettings = {toolbar: this.toolbar};
            this.editor.activateEditor(this.rteEditorId, newSettings);
            this.editorInFocus = true;
        }
    },

    changeHandler: function () {
        sl.log("feature story changeHandler");
        this.startAutosaveTimer()
        var target = jQuery(event.target);
        if (this.editorInFocus && this.rteElement.has(target).length != 1 && !(target.attr("id") == this.rteEditorId)) {
            sl.log("should deselect", this.rteElement.has(target).length);
            this.deactivateRte();
        }
    },

    deactivateRte: function () {
        sl.log("deactivateRte")
        jQuery("#" + this.rteEditorId).removeAttr("contenteditable")
        if (CKEDITOR.instances[this.rteEditorId] != null) {
            this.editor = EditCMS2Page.findModule().getRichTextEditor();
            this.editor.deactivateEditor(this.rteEditorId);
        }
        this.editorInFocus = false;
    },

    getCurrentLink: function () {
        return jQuery("#" + this.moduleID).data("link");
    },

    getOpenInNewWindow: function () {
        return jQuery("#" + this.moduleID).data("open-in-new-window");
    },

    saveHandler: function (callback) {
        sl.log("feature story saveHandler")
        this.clearSaveTimeout();
        this.mainCallback = callback;
        this.titleText = this.blockElement.find(".jsFeatureStoryTitle").text();
        this.bodyHtml = this.bodyElement.text();
        this.linkText = this.linkElement.text();
        jQuery.when(
            this.saveTitle(),
            this.saveBody(),
            this.saveButtonText()
        ).then(jQuery.proxy(this.mainCallback, this));
    },

    saveTitle: function () {
        sl.log("saveTitle")
        var options = {
            url: "/pf4/cms2/setBlockTitle",
            attributes: {title: this.titleText}
        };
        return this.ajaxCallAttributeSetting(options);
    },

    saveBody: function () {
        sl.log("saveBody")
        var options = {
            url: "/pf4/cms2/saveHTMLBlock",
            attributes: {field_value: this.bodyHtml},
        };
        return this.ajaxCallAttributeSetting(options);
    },
    saveButtonText: function () {
        var options = {
            url: "/pf4/cms2/setLinkTitle",
            attributes: {title: this.linkText}
        };
        return this.ajaxCallAttributeSetting(options);
    },
    update: function () {
        var editorHandler = sl.findDataInParentWithMethod("#block_" + this.blockID, "jsEditorHandler", "publicRefreshCurrentSlide")
        if (editorHandler != null) {
            editorHandler.publicRefreshCurrentSlide();
        }
        else {
            this.$super();
        }
    },

    selectHandler: function (selectOptions) {
        this.$super();
        EditCMS2Page.findModule().setActiveEditableModule(this.blockElement);
        if (selectOptions && selectOptions.showCrop == true) {
            this.cropImageHandler();
        }
    },
    cropImageHandler: function () {
        this.cropImageActivate(this.blockElement.find(".jsFeatureStoryImage"))
    },

    deselectHandler: function () {
        this.$super();
        if (this.croppieObject != null) {
            this.confirmCropHandler()
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var FeatureStoryPlayer = Class.$extend({
    __init__: function (options) {
        this.blockElement = jQuery("#block_" + options.blockID);
        sl.log("init this.blockElement", this.blockElement, options);
        this.format = this.blockElement.find(".jsFeatureStoryModule").attr("format");
        this.animationValues = {};
        this.setupFormat();
    },

    setupFormat: function () {
        switch (this.format) {
            case "bling":
                this.setupBlingListeners();
                this.setupBling();
                break;
        }
    },

    setupBling: function () {
        var blurbContainersToClamp = jQuery('.jsFeatureStoryBlingContentContainer');
        sl.textClamper(blurbContainersToClamp, "jsFeatureStoryTitle");
        sl.textClamper(blurbContainersToClamp, "jsFeatureStoryBody");

        //position title at starting point (bottom of container)
        this.calculateAnimationValues();
        this.blockElement.find(".jsBlingTitleContainer").css({
            marginTop: this.animationValues.containerHeight - this.animationValues.titleHeight - this.animationValues.heightCorrection
        });
    },

    calculateAnimationValues: function () {
        //corrects for top padding in title container used to smooth initial gradient
        this.animationValues.heightCorrection = parseInt(this.blockElement.find(".jsBlingTitleContainer").css("paddingTop"));
        this.animationValues.titleHeight = this.blockElement.find(".jsBlingTitleContainer").height();
        this.animationValues.containerHeight = this.blockElement.find(".jsFeatureStoryBlingContentContainer").height();
    },

    setupBlingListeners: function () {
        //change height of title as container height changes on window resize
        jQuery(window).resize(jQuery.proxy(this.repositionContent, this));

        this.blockElement.find(".jsFeatureStoryModule").on({
            mouseenter: jQuery.proxy(this.revealContent, this),
            focusin: jQuery.proxy(this.revealContent, this),
            mouseleave: jQuery.proxy(this.resetContent, this),
            focusout: jQuery.proxy(this.resetContent, this)
        });
    },

    //used for repositioning title on window resize
    repositionContent: function () {
        this.calculateAnimationValues();
        this.blockElement.find(".jsBlingTitleContainer").css({
            marginTop: this.animationValues.containerHeight - this.animationValues.titleHeight - this.animationValues.heightCorrection
        });
    },

    revealContent: function () {
        this.blockElement.find(".jsFeatureStoryModule").addClass("active");
        this.blockElement.find(".jsBlingTitleContainer").stop( true, true ).animate({
            marginTop: 0
        }, 600);

    },

    resetContent: function () {
        //check if related target is inside of the instance and if so do not reset
        if(!this.blockElement.find(event.relatedTarget).length) {
            this.blockElement.find(".jsFeatureStoryModule").removeClass("active");
            this.blockElement.stop( true, true ).find(".jsBlingTitleContainer").animate({
                marginTop: this.animationValues.containerHeight - this.animationValues.titleHeight - this.animationValues.heightCorrection
            }, 600);
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var PromoBlock = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.rteEditorId = options.rteEditorId;
        sl.log("init PromoBlock options", options);
        this.fromLockerURL = options.fromLockerURL;
        this.setImageFromLockerURL = options.setImageFromLockerURL;
        this.imageURL = options.imageURL;
        this.editorInFocus = false;
        this.toolbar = options.toolbar;
        this.titleElement = this.blockElement.find(".jsPromoTitle")
        this.rteElement = jQuery("#" + this.rteEditorId);
        this.bodyElement = this.blockElement.find(".jsPromoBody")
        this.linkElement = this.blockElement.find(".jsPromoLink");
        this.initListeners();
        jQuery(".jsToolbarExternalMoreButtonHolder").hide();
        this.preventImageDragging();
        this.groupID = options.groupID;
    },


    initListeners: function () {
        this.blockElement.on({
            "click": jQuery.proxy(this.clickRteHandler, this)
        }, "#" + this.rteEditorId);

        this.blockElement.on({
            "click": jQuery.proxy(this.clickBlockHandler, this),
            "keypress paste cut mouseup": jQuery.proxy(this.changeHandler, this)
        });

        this.titleElement.on({
            "keydown": jQuery.proxy(this.checkCharacterCount, this, this.titleElement)
        });

        this.linkElement.on({
            "keydown": jQuery.proxy(this.checkCharacterCount, this, this.linkElement)
        })

        this.bodyElement.on({
            "keydown": jQuery.proxy(this.checkCharacterCount, this, this.bodyElement)
        })

        this.blockElement.on("jsChildModuleReloaded", jQuery.proxy(this.childReloaded, this));
    },

    checkCharacterCount: function (element, event) {
        var limits = element.data("character-limits");
        if (limits != null) {
            var max = limits.default;
            var i = 0;
            while (limits.widths[i]["width"] < element.width() || i == limits.widths.length) {
                max = limits.widths[i]["chars"]
                i++
            }

            if (event.which == 13) {
                //sl.alert("Text only in this area. No new lines or paragraphs.")
                event.preventDefault();
            } else if (event.which != 8 && element.text().length > max) {
                sl.alert("This area has a limit of " + max + " characters.")
                event.preventDefault();
            }
        }
    },

    clickBlockHandler: function (event) {
        var target = jQuery(event.target)
        if (!target.hasClass("jsPromoBody") && (target.parents(".jsPromoBody").length == 0)) {
            jQuery(".jsToolbarExternalMoreButtonHolder").hide();
        } else {
            jQuery(".jsToolbarExternalMoreButtonHolder").show();
        }
    },

    clickRteHandler: function (event) {
        sl.log("clickRteHandler");
        if (!this.editorInFocus) {
            this.editor = EditCMS2Page.findModule().getRichTextEditor();
            jQuery("#" + this.rteEditorId).attr("contenteditable", true).focus();
            var newSettings = {toolbar: this.toolbar};
            this.editor.activateEditor(this.rteEditorId, newSettings);
            this.editorInFocus = true;
        }
    },

    changeHandler: function (event) {
        sl.log("event", event.which)
        if (event && event.which == 13){
            return false; //prevents linebreaks
        }
        sl.log("promot changeHandler");
        this.startAutosaveTimer()
        var target = jQuery(event.target);
        if (this.editorInFocus && this.rteElement.has(target).length != 1 && !(target.attr("id") == this.rteEditorId)) {
            sl.log("should deselect", this.rteElement.has(target).length);
            this.deactivateRte();
        }
    },

    deactivateRte: function () {
        sl.log("deactivateRte")
        jQuery("#" + this.rteEditorId).removeAttr("contenteditable")
        if (CKEDITOR.instances[this.rteEditorId] != null) {
            this.editor = EditCMS2Page.findModule().getRichTextEditor();
            this.editor.deactivateEditor(this.rteEditorId);
        }
        this.editorInFocus = false;
    },

    getCurrentLink: function () {
        return jQuery("#" + this.moduleID).data("link");
    },

    getOpenInNewWindow: function () {
        return jQuery("#" + this.moduleID).data("open-in-new-window");
    },

    saveHandler: function (callback) {
        sl.log("promo saveHandler")
        this.clearSaveTimeout();
        this.mainCallback = callback;
        this.titleText = this.blockElement.find(".jsPromoTitle").text();
        this.bodyHtml = this.bodyElement.text();//.html();//[0].innerText;//
        this.linkText = this.linkElement.text();
        jQuery.when(
            this.saveTitle(),
            this.saveBody(),
            this.saveButtonText()
        ).then(jQuery.proxy(this.mainCallback, this));
    },

    saveTitle: function () {
        sl.log("saveTitle")
        var options = {
            url: "/pf4/cms2/setBlockTitle",
            attributes: {title: this.titleText}
        };
        return this.ajaxCallAttributeSetting(options);
    },

    saveBody: function () {
        sl.log("saveBody")
        var options = {
            url: "/pf4/cms2/saveHTMLBlock",
            attributes: {field_value: this.bodyHtml},
        };
        return this.ajaxCallAttributeSetting(options);
    },
    saveButtonText: function () {
        var options = {
            url: "/pf4/cms2/setLinkTitle",
            attributes: {title: this.linkText}
        };
        return this.ajaxCallAttributeSetting(options);
    },
    update: function () {
        var editorHandler = sl.findDataInParentWithMethod("#block_" + this.blockID, "jsEditorHandler", "publicRefreshCurrentSlide")
        if (editorHandler != null) {
            editorHandler.publicRefreshCurrentSlide();
        }
        else {
            this.$super();
        }
    },

    selectHandler: function (selectOptions) {
        this.$super();
        EditCMS2Page.findModule().setActiveEditableModule(this.blockElement);
        if (selectOptions && selectOptions.showCrop == true) {
            this.cropImageHandler();
        }
    },
    cropImageHandler: function () {
        if (this.blockElement.find(".jsPromoVideo").length > 0) {
            if (this.blockElement.find(".jsPromoVideo").hasClass("jsFitted")) {
                this.moduleToolbar.toolbarTools["crop-image"].setImageOnlyCropAttributes(this.getVideoUnFitAttributes());

            } else {
                this.blockElement.find(".jsPromoVideo").addClass("jsFitted")
                this.moduleToolbar.toolbarTools["crop-image"].setImageOnlyCropAttributes(this.getVideoFitAttributes());
            }
            this.update();
        } else {
            this.cropImageActivate(this.blockElement.find(".jsPromoImage"));//sl-cms2-promo__slide-background-image
        }
    },

    deselectHandler: function () {
        this.$super();
        if (this.croppieObject != null) {
            this.confirmCropHandler()
        }
    },

    selectResource: function (resourceID, title, url, embedURL, isGoogle, externalID) {
        if (embedURL.split('.').pop() == "mp4") {     // I think this should be  in PromoBlock  -- yes do this.
            var variables = {
                edit_form_data: this.getFormDataID(),
                block_id: this.blockID,
                resource_id: resourceID,
                title: title,
                link_url: url,
                embed_url: embedURL
            };
            this.slideshowControllerInstance.videoFromLocker(variables);
            vex.closeAll();
        }
        else {
            this.$super(resourceID, title, url, embedURL, isGoogle, externalID);
        }
    }


}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */


var BadgeEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        sl.log("init Badge options", options);
        this.uploadURL = options.uploadURL;
        this.fromLockerURL = options.fromLockerURL;
        this.setImageFromLockerURL = options.setImageFromLockerURL;
        this.linkSettingUrl = options.linkSettingUrl;
        this.imageURL = options.imageURL;
        this.preventImageDragging();
        this.saveTimeoutHandler = null;
        this.initListeners();
        sl.fillSvgHolders();
    },

    initListeners: function () {
        this.initTitleListener();
        this.blockElement.on("keyup paste cut mouseup", ".jsBadgeLink", jQuery.proxy(this.autosaveHandler, this))
    },

    autosaveHandler: function () {
        if (this.saveTimeoutHandler == null) {
            this.saveTimeoutHandler = setTimeout(jQuery.proxy(this.saveLink, this), 1000);
        }
    },

    saveLink: function () {
        this.saveTimeoutHandler = null;
        var linkText = this.blockElement.find(".jsBadgeLink").text();
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            title: linkText
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            url: "/pf4/cms2/setLinkTitle",
            data: variables
        });

    },

    saveHandler: function (callback) {
        this.saveTitleHandler(callback);
    },

    getCurrentLink: function () {
        return jQuery("#" + this.moduleID).data("link");
    },

    getOpenInNewWindow: function () {
        return jQuery("#" + this.moduleID).data("open-in-new-window");
    },

    cropImageHandler: function () {
        this.cropImageActivate(this.blockElement.find(".jsBadgeImage"))
    },

    deselectHandler: function () {
        this.$super();
        if (this.croppieObject != null) {
            this.confirmCropHandler()
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

var Button = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        sl.log("init Button options",options);
        this.blockElement.data("jsEditorHandler", this);
        this.buttonTitleClass = options.buttonTitleClass;
        this.titleSettingUrl = options.titleSettingUrl;
        this.linkSettingUrl = options.linkSettingUrl;
        this.initListeners()
    },

    initListeners: function () {
        this.blockElement.on({
            "keyup paste cut mouseup": jQuery.proxy(this.startAutosaveTimer, this)
        },"." + this.buttonTitleClass)
    },



    saveHandler: function(callback) {
        this.clearSaveTimeout();
        var newButtonTitle = this.blockElement.find(".jsButtonTitle").text();
        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: this.blockID,
            title: newButtonTitle
        };
        sl.addAjaxScope(variables);
        jQuery.ajax({
            type: "POST",
            url: this.titleSettingUrl,
            data: variables,
            success: callback
        });
    },

    getCurrentLink: function () {
        return jQuery("#" + this.moduleID).data("link");
    },

    getOpenInNewWindow: function () {
        return jQuery("#" + this.moduleID).data("open-in-new-window");
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 7/28/16.
 * Globals CKEDITOR,sl *
 */

var ColumnEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.displayName = options.displayName;
        this.blockElement.data("jsEditorHandler", this);
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 7/28/16.
 * Globals CKEDITOR,sl *
 */

var RowEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        sl.log("init RowEditor");
    },
    addDropzoneToModule: function () {
        return;
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 7/28/16.
 * Globals CKEDITOR,sl *
 */

var IncludeBlockEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        sl.log("init IncludeBlockEditor");
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */


var NavigationHolderEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        this.helpDialogString = options.helpDialogString;
        this.helpDialogHelpLinkString = options.helpDialogHelpLinkString;
        this.helpDialogHelpLinkURL = options.helpDialogHelpLinkURL;
        this.desktopNavHolder = this.blockElement.find(".jsDesktopNavHolder");
        this.desktopNav = this.desktopNavHolder.find(".jsDesktopNav");
        this.addFlagIfItemsTooWide();
        this.initListeners();
    },

    initListeners: function () {
        this.blockElement.on({
            "jsModuleSelected": jQuery.proxy(this.childSelectedHandler, this),
            "jsModuleDeselected": jQuery.proxy(this.childDeselectedHandler, this)
        });
        this.blockElement.on({
            "click": jQuery.proxy(this.helpClickHandler, this)
        }, ".jsNavHelpArticle");

        jQuery(window).resize(jQuery.throttle(25, jQuery.proxy(this.resize, this)));

    },

    addFlagIfItemsTooWide: function () {
        if (this.checkIfOverFlowing()) {
            sl.log("too wide");
            this.hideOverflowOnChildren();
        }
    },

    checkIfOverFlowing: function () {
        this.childrensTotalWidth = 0;
        jQuery.each(this.desktopNav.children(".jsCMS2Block"), jQuery.proxy(this.incrementChildrenWidth,this))
        sl.log("parseInt(this.desktopNav.width(),10)", (parseInt(this.desktopNav.width(), 10) > parseInt(this.blockElement.width(), 10)), parseInt(this.desktopNav.width(), 10), parseInt(this.blockElement.width(), 10))
        return (this.childrensTotalWidth > parseInt(this.blockElement.width(), 10))
    },

    incrementChildrenWidth: function (key, value){
        // debugger;
        this.childrensTotalWidth += parseInt(jQuery(value).width(),10);
        sl.log("this.childrensTotalWidth",this.childrensTotalWidth)
    },

    hideOverflowOnChildren: function () {
        this.blockElement.addClass("sl-cms2-nav-holder__desktop-nav--hidden-overflow");
        this.blockElement.find(".jsNavInfoFlag").removeClass("display-none-important")
    },

    hideOverflowOnChild: function () {

    },


    addDropzoneToModule: function () {
        return;
    },

    childSelectedHandler: function () {
        sl.log("nav childSelectedHandler")
        if (this.checkIfOverFlowing()) {
            this.addOverflowingClassesForEdit();
        }
    },

    addOverflowingClassesForEdit: function () {
        this.blockElement.find(".jsNavInfoFlag").removeClass("display-none-important")

        var flagWidth = this.blockElement.width();

        this.blockElement.removeClass("sl-cms2-nav-holder__desktop-nav--hidden-overflow");
        this.desktopNav.addClass("sl-cms2-nav-holder__desktop-nav--selected-wrapping");
        if (this.desktopNav.find(".jsAutoNavList").width > flagWidth) {
            this.desktopNav.find(".jsAutoNavList").width(flagWidth)
        }
    },

    removeOverflowingClassesForEdit: function () {
        this.blockElement.find(".jsNavInfoFlag").addClass("display-none-important")
    },

    childDeselectedHandler: function (event) {
        sl.log("nav childDeselectedHandler");
        if (this.checkIfOverFlowing()) {
            this.blockElement.addClass("sl-cms2-nav-holder__desktop-nav--hidden-overflow");

        }
        this.desktopNav.removeClass("sl-cms2-nav-holder__desktop-nav--selected-wrapping");
        this.desktopNav.find(".jsAutoNavList").width("")

    },

    helpClickHandler: function (event) {
        event.stopPropagation()
        sl.alert('<p>' + this.helpDialogString + '</p>' +
            '<a href="'+ this.helpDialogHelpLinkURL + '" target="_blank">' + this.helpDialogHelpLinkString + '</a>')
    },

    resize: function () {
        sl.log("resize");
        if (this.checkIfOverFlowing()) {
            this.addOverflowingClassesForEdit();

        } else {
            this.removeOverflowingClassesForEdit();
        }
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

//HAMBURGER
//Items for mobile hamburger need to be   jsMobileNavItem and either a child or the same element as  jsNavTopList
//all jsMobileNavItem items will have the class   display-none-important removed
//For the click of a mobile item the sub menu needs to be wrapped in jsNavSubList or have parameters for content in the li
//translateWidgetPresent

var NavigationHolderPlayer = Class.$extend({
    __init__: function (options) {
        sl.log("NavigationHolderPlayer init", options)
        if (NavigationHolderPlayer.player == null || options.instanceEditable) {
            this.helpDialogString = options.helpDialogString;
            this.helpDialogHelpLinkString = options.helpDialogHelpLinkString;
            this.helpDialogHelpLinkURL = options.helpDialogHelpLinkURL;

            //only want one per page
            NavigationHolderPlayer.player = this;
            sl.log("init NavigationHolderPlayer", options);
            this.blockElement = jQuery("#block_" + options.blockID);
            this.navigationHolderElement = this.blockElement.closest(".jsNavigationHolder")
            this.hamburgerButton = this.blockElement.find(".jsHamburgerButton");
            this.mobileDropdownElement = this.blockElement.find(".jsMobileDropdown");
            this.mobileDropdownStoreElement = this.blockElement.find(".jsMobileDropdownStore");
            this.mobileDropdownSnapshot = {};
            this.desktopTopNavHolder = this.blockElement.find(".jsDesktopNavHolder");
            this.mobileNavHolder = this.blockElement.find(".jsMobileNavHolder");
            this.devOnly = options.devOnly;
            this.editMode = options.editMode;
            this.instanceEditable = options.instanceEditable;
            this.jsInstanceEditableWidthFlag = this.blockElement.find(".jsNavWidthFlagInfoHolder");
            this.breakpoint = parseInt(options.tabletBreakpoint, 10)
            this.menuLevel = 0;
            this.currentMenuParentMenus = [];
            this.internalNavigationHolderElement = jQuery(".jsInteriorNavigationHolder").clone();
            this.elementsToHideWhenHamburger = jQuery(".jsElementForHamburgerTop").add(".jsElementForHamburgerBottom").add(".jsHideWhenHamburger");
            this.elementsForHamburgerTop = jQuery(".jsElementForHamburgerTop").clone();
            this.elementsForHamburgerBottom = jQuery(".jsElementForHamburgerBottom").clone();
            this.resizeTime;
            this.resizeTimeout = false;
            this.resizeDelta = 5;
            this.translateWidgetPresent = this.translateWidgetPresentCheck();
            this.setupNavStore();
            this.backHamburgerString = options.backHamburgerString
            this.setupHamburger();
            this.setHamburgerDropdownWidth();
            this.hamburgerShown = false;
            this.showHamburgerBreakpoint = null;
            this.setHamburgerState(true);
            this.setUpTranslateWidget();
            this.initListeners();
            this.targetItemName = [];
            this.showHideMain = jQuery('main');
            this.showHideFooter = jQuery('footer');
            this.showHideWrapper = jQuery('.sl-cms2-bg-wrapper_header');
            this.showHideWrapperHeight = this.showHideWrapper.height();
        }
    },

    initListeners: function () {
        this.hamburgerButton.on("click", jQuery.proxy(this.hamburgerClickHandler, this));
        this.hamburgerButton.on('touchstart', jQuery.proxy(this.addTouchClass, this));
        this.mobileDropdownElement.on("click", ".jsSubNavButton", jQuery.proxy(this.subNavListItemClickHandler, this));
        this.mobileDropdownElement.on("click", ".jsBackHeader", jQuery.proxy(this.subNavBackClickHandler, this));
        this.mobileDropdownElement.on("click", ".jsAnchorTagMenuItem", jQuery.proxy(this.anchorClickHandler, this));

        this.mobileDropdownElement.on("keydown", jQuery.proxy(this.keydownHandler, this));

        jQuery(window).resize(jQuery.proxy(this.windowResizeHandler, this));
        // debugger;
        jQuery(document).on({
            "click": jQuery.proxy(this.helpClickHandler, this)
        }, ".jsNavHelpArticle");
    },

    helpClickHandler: function (event) {
        event.stopPropagation();
        vex.closeAll();
        sl.alert('<p>' + this.helpDialogString + '</p>' +
            '<a href="'+ this.helpDialogHelpLinkURL + '" target="_blank">' + this.helpDialogHelpLinkString + '</a>')
    },

    addTouchClass: function () {
        if(!this.mobileDropdownElement.hasClass('jsTouchElement')){
            this.mobileDropdownElement.addClass('jsTouchElement');
        }
    },

    devOnlyFunctions: function () {
        jQuery(".jsMobileDropdownStore").show();
        jQuery(".jsMobileDropdownStore").on("click", function () {
            jQuery(".jsMobileDropdownStore").fadeOut();
        })
    },

    setupNavStore: function () {
        var topListItems = this.formatElementsForHamburger(this.elementsForHamburgerTop);
        var navListItems = this.navigationHolderElement.find(".jsNavTopList").children(".jsMobileNavItem")
            .add(this.navigationHolderElement.find(".jsNavTopList.jsMobileNavItem"));
        sl.log('nav list items', navListItems);
        var bottomListItems = this.formatElementsForHamburger(this.elementsForHamburgerBottom);
        var i, listItem;
        for (i = 0; i < topListItems.length; i++) {
            listItem = jQuery(topListItems[i]);
            listItem.find("script").remove();
            this.mobileDropdownStoreElement.append(listItem)
        }
        for (i = 0; i < navListItems.length; i++) {
            listItem = jQuery(navListItems[i]);
            listItem.find("script").remove();
            this.mobileDropdownStoreElement.append(listItem)
        }

        this.mobileDropdownStoreElement.append('<li class="sl-cms2-nav-holder__hamburger-google-translate jsMobileTranslateWidgetHolder jsMobileNavItem" />')

        for (i = 0; i < bottomListItems.length; i++) {
            listItem = jQuery(bottomListItems[i]);
            listItem.find("script").remove();
            this.mobileDropdownStoreElement.append(listItem)
        }
    },

    formatElementsForHamburger: function (items) {
        var formattedListElements = [], i, item, id, itemOnPage;
        for (i = 0; i < items.length; i++) {
            item = jQuery(items[i]);
            id  = jQuery(items[i]).attr("id");
            itemOnPage = jQuery("#" + id)
            if (!itemOnPage.is(":visible")){
                itemOnPage.addClass("display-none-important")
            }

            item = this.fixHamburgerItemHtml(item, "_HamburgerStore");
            formattedListElements[i] = jQuery("<li/>")
                .addClass("jsMobileNavItem jsSubNavButton sl-cms2-nav__mobile-top-item")
                .html(item.html())
        }
        sl.log("formattedListElements", formattedListElements)
        return formattedListElements;
    },

    fixHamburgerItemHtml: function (item, suffix) {
        if (item.find("input").length > 0) {
            var inputItems = item.find("input");
            var i, id;
            for (i = 0; i < inputItems.length; i++) {
                if (jQuery(inputItems[i])[0].hasAttribute("id")) {
                    id = jQuery(inputItems[i]).attr("id");
                    jQuery(inputItems[i]).attr("id", id + suffix);
                    item.find("label[for=" + id + "]").attr("for", id + suffix)
                }
            }
        }

        if(item.hasClass('jsMegaMenuNavItem')){
            item.append('<span class="sl-cms2-nav__mobile-parent-icon"></span>');
        }
        return item;
    },

    setupHamburger: function () {
        this.repositionHamburger();
        this.mobileDropdownElement.empty();
        this.menuLevel = 0;
        var navListItems = this.mobileDropdownStoreElement.children(".jsMobileNavItem").clone().removeClass("display-none-important");
        var i, listItem;
        for (i = 0; i < navListItems.length; i++) {
            sl.log('list item:', listItem);
            listItem = jQuery(navListItems[i]);
            if (listItem.find(".jsNavSubList").length > 0) {
                listItem
                    .find(".jsSubNavButton").removeClass("display-none")
                listItem.find(".jsNavSubList").remove();
            }
            listItem.addClass("jsMobileNavItem");
            listItem = this.fixHamburgerItemHtml(listItem, "_HamburgerDisplay");
            this.mobileDropdownElement.append(listItem)
        }

        this.currentMenu = this.mobileDropdownStoreElement;
    },

    windowResizeHandler: function () {
        this.resizeTime = new Date();
        sl.log("windowResizeHandler ")
        if (this.resizeTimeout === false) {
            this.resizeTimeout = true;
            setTimeout(jQuery.proxy(this.windowResizeTimeoutHandler, this), this.resizeDelta);
        }
    },

    windowResizeTimeoutHandler: function () {
        if (new Date() - this.resizeTime < this.resizeDelta) {
            setTimeout(jQuery.proxy(this.windowResizeTimeoutHandler, this), this.resizeDelta);
        } else {
            this.resizeTimeout = false;
            this.setHamburgerState();
            this.setHamburgerDropdownWidth();
        }
    },

    // Fix for viewport/window scrollbar width discrepancy
    setHamburgerDropdownWidth: function () {
        this.mobileDropdownElement.css({width: jQuery(window).width() + 'px'});
    },

    repositionHamburger: function () {
        jQuery(".jsPlaceHamburgerTopRight:first").prepend(this.mobileNavHolder);
    },

    setHamburgerState: function (init) {
        sl.log("setHamburgerState: this.hamburgerShown", this.hamburgerShown)
        sl.log("setHamburgerState: this.showHamburgerBreakpoint", this.showHamburgerBreakpoint)
        sl.log("setHamburgerState: this.initiallyHamburgerShown", this.initiallyHamburgerShown);
        sl.log("setHamburgerState: this.navItemsFit()", this.navItemsFit());

        if (this.navItemsFit() && this.viewportIsWide()) {
            if (this.hamburgerShown) {
                if (this.showHamburgerBreakpoint != null && jQuery(window).width() > this.showHamburgerBreakpoint) {
                    this.showDesktop();
                }
                if (init) {
                    this.showDesktop();
                    this.initiallyHamburgerShown = false;
                }
                if (this.initiallyHamburgerShown && this.showHamburgerBreakpoint == null) {
                    this.showHamburgerBreakpoint = jQuery(window).width();
                }
            }
        }
        else {
            sl.log("items don't fit")
            if (!this.hamburgerShown) {
                if (this.showHamburgerBreakpoint != null && jQuery(window).width() < this.showHamburgerBreakpoint) {
                    this.showHamburger();
                }
                if (init) {
                    this.showHamburger();
                    this.initiallyHamburgerShown = true;
                }
                if (!this.initiallyHamburgerShown && this.showHamburgerBreakpoint == null) {
                    this.showHamburgerBreakpoint = jQuery(window).width();
                }
            }
        }

        if (init) {
            this.desktopTopNavHolder.css({
                visibility: "inherit"
            });
        }
    },

    showDesktop: function () {
        this.mobileNavHolder.hide()
        this.desktopTopNavHolder.add(this.elementsToHideWhenHamburger).show();
        this.hamburgerShown = false;
        this.hamburgerFinishClosing();
        this.showNonHamburgerPageElements(true);
        if(this.instanceEditable == "true"){
            sl.log("showDesktop ");
            this.jsInstanceEditableWidthFlag.hide()
        }
        },

    setupTranslateListener: function () {
        jQuery(".jsDesktopTranslateWidgetHolder").on("mouseenter", jQuery.proxy(this.widgetMouseenterHandler, this))
    },

    widgetMouseenterHandler: function () {
        jQuery("#google_translate_element").find("div").click();
    },

    showHamburger: function () {
        this.mobileNavHolder.show();
        this.desktopTopNavHolder.add(this.elementsToHideWhenHamburger).hide();
        this.hamburgerShown = true;
        if(this.instanceEditable == "true"){                                                                          /// this is to show the width warning flag in edit mode only
            this.mobileNavHolder.addClass("sl-cms2-nav-holder__mobile-holder--ajax-page");
            var headerElement = (this.mobileNavHolder.closest("header").length == 1) ? this.mobileNavHolder.closest("header") : this.mobileNavHolder.parent(); // addition for warning flags
            var top = this.mobileNavHolder.offset().top - headerElement.offset().top + ( this.mobileNavHolder.outerHeight() / 2  - this.jsInstanceEditableWidthFlag.outerHeight() / 2 )
            // debugger;
            this.jsInstanceEditableWidthFlag.css({
                "right": this.mobileNavHolder.width(),// + jQuery(".jsNavWidthFlagInfoHolder").width(),
                 "top": top
            });
            this.mobileNavHolder.css("right");
            this.jsInstanceEditableWidthFlag.show().insertAfter(headerElement);//.parent()
        }
    },

    translateWidgetPresentCheck: function () {
        var value = false;
        if (jQuery(".sl-cms2-google-translate").length > 0) {
            jQuery(".sl-cms2-google-translate").parent().addClass("jsDesktopTranslateWidgetHolder");
            value = true;
        }
        return value;
    },

    setUpTranslateWidget: function () {
        //this was for handling old-style google translate widget in hamburger - no longer needed
        if (this.translateWidgetPresent) {
            // this.translateWidgetHtml = jQuery('<div id="google_translate_element"></div>' +
            //     '<script type="text/javascript">function googleTranslateElementInit() {' +
            //     'new google.translate.TranslateElement({pageLanguage: "en", layout: google.translate.TranslateElement.InlineLayout.SIMPLE, includedLanguages: "ar,de,en,es,fa,fr,hi,hmn,ht,hy,it,ja,km,ko,lo,pa,pl,pt,ru,sm,so,th,uk,ur,vi,zh-CN,zh-TW"}, "google_translate_element");' +
            //     '}<\/script>' +
            //     '<script type="text\/javascript" src="\/\/translate.google.com\/translate_a\/element.js?cb=googleTranslateElementInit"><\/script>');
            if (this.hamburgerShown == true) {
                this.mobileDropdownElement.find(".jsMobileTranslateWidgetHolder").append(this.translateWidgetHtml)
            } else {
                if (jQuery('.jsDesktopTranslateWidgetHolder .sl-cms2-google-translate').is(':empty')) {
                    jQuery(".jsDesktopTranslateWidgetHolder .sl-cms2-google-translate").append(this.translateWidgetHtml);
                    //this.setupTranslateListener();
                }
            }
            this.widgetLoaded = false;
            this.widgetLoadedTimer();
        }
    },

    widgetLoadedTimer: function () {
        if (jQuery('#google_translate_element').is(':empty')) {
            setTimeout(jQuery.proxy(this.widgetLoadedTimer, this), 50);
        } else {
            this.widgetLoaded = true;
            this.updateTranslateStyle();
        }
    },

    updateTranslateStyle: function () {
        jQuery("#google_translate_element span").css("border-color", jQuery('.sl-cms2-google-translate-styling-span').css("backgroundColor"));
        jQuery("#google_translate_element div").eq(1).css("border-color", jQuery('.sl-cms2-google-translate-styling-div').css("border-color"));
        jQuery("#google_translate_element div").eq(1).css("border-radius", jQuery('.sl-cms2-google-translate-styling-div').css("border-radius"));
        jQuery("#google_translate_element span").eq(3).html('<div class="sl-cms2-google-translate-styling-down-arrow"></div>');
        jQuery("#google_translate_element div").eq(1).css("padding", jQuery('.sl-cms2-google-translate-styling-div').css("padding"));
        jQuery("#google_translate_element div").eq(1).css("font-weight", jQuery('.sl-cms2-google-translate-styling-div').css("font-weight"));
        jQuery("#google_translate_element span").eq(1).css("font-family", jQuery('.sl-cms2-google-translate-styling-span').css("font-family"));
        jQuery("#google_translate_element span").eq(1).css("font-size", jQuery('.sl-cms2-google-translate-styling-span').css("font-size"));

    },

    hamburgerClickHandler: function (event) {
        if (!this.hamburgerButton.hasClass("sl-cms2-nav-holder__hamburger-holder--on")) {
            this.hamburgerButton.addClass("sl-cms2-nav-holder__hamburger-holder--on");
            this.hamburgerAnimateOpen();

        } else {
            this.setupHamburger();
            this.hamburgerAnimateClose();
        }
    },

    hamburgerCreateOverlay: function() {
        var overlay = jQuery("<div class='sl-cms2--nav__mobile-overlay'></div>").appendTo('body');

        overlay.on("click", jQuery.proxy(this.hamburgerClickHandler, this));
        overlay.animate({'opacity': 0.7}, 300);
        jQuery(".jsPlaceHamburgerTopRight").addClass("sl-cms2--nav__mobile-overlay--topnav");

    },

    hamburgerFadeOutOverlay: function() {
        jQuery('.sl-cms2--nav__mobile-overlay').animate({'opacity': 0}, 300, jQuery.proxy(this.hamburgerDiscardOverlay, this));
    },

    hamburgerDiscardOverlay: function() {
        jQuery('.sl-cms2--nav__mobile-overlay').remove();
        jQuery(".jsPlaceHamburgerTopRight").removeClass("sl-cms2--nav__mobile-overlay--topnav");
    },

    hideNonHamburgerPageElements: function() {
        this.showHideMain.hide();
        this.showHideFooter.hide();
        this.showHideWrapper.animate({height: 0}, 500, jQuery.proxy(this.finishHidingTopWrapper, this));
    },

    finishHidingTopWrapper: function () {
        this.showHideWrapper.hide();
    },

    showNonHamburgerPageElements: function(noAnimate) {
        this.showHideMain.show();
        this.showHideFooter.show();
        this.showHideWrapper.show();
        if(noAnimate) {
            this.showHideWrapper.css('height', 'auto');
        } else {
            this.showHideWrapper.animate({height: this.showHideWrapperHeight}, 500, jQuery.proxy(this.resetTopWrapper, this));
        }

    },

    resetTopWrapper: function () {
        this.showHideWrapper.css('height', 'auto');
    },

    hamburgerAnimateOpen: function() {
       // var menuheight =  this.mobileDropdownElement.get(0).scrollHeight;

        var menuheight = Math.max(jQuery(window).height(), this.mobileDropdownElement.get(0).scrollHeight);
        this.mobileDropdownElement.animate({height: menuheight}, 500);
        this.hideNonHamburgerPageElements();
    },

    hamburgerResetMenuHeight: function() {
        // this.mobileDropdownElement.css('height', 'auto');
        // var menuheight =  this.mobileDropdownElement.height();
        // this.mobileDropdownElement.animate({height: menuheight}, 200);
    },

    hamburgerAnimateClose: function() {
        this.mobileDropdownElement.animate({height: 0}, 500, jQuery.proxy(this.hamburgerFinishClosing, this));
        this.showNonHamburgerPageElements();
    },

    hamburgerFinishClosing: function () {
        this.hamburgerButton.removeClass("sl-cms2-nav-holder__hamburger-holder--on");
    },

    scrollBackToTop: function() {
            if (jQuery(window).scrollTop() > 0)
            jQuery("html, body").animate({ scrollTop: 0 }, 300);
    },

    subNavListItemClickHandler: function (event) {
        var target = (jQuery(event.target).hasClass("jsMobileNavItem")) ? jQuery(event.target) : jQuery(event.target).closest(".jsMobileNavItem");

        this.targetItemName[this.menuLevel] = target.find('.jsItemName').eq(0).text();

        event.stopPropagation();
        if (target.find("input").length > 0 || (target.children("a").attr("href") != null )) {
            return;
        } else {
            this.scrollBackToTop();
        }

        var linkType;
        var dataFromClick = {};

        if (event.target.hasAttribute("data-content-id") || target[0].hasAttribute("data-content-id")) {
            dataFromClick = (event.target.hasAttribute("data-content-id")) ? jQuery(event.target).data() : target.data();
            sl.log("data from click dynamic:", dataFromClick);

            dataFromClick["title"] = (event.target.hasAttribute("data-content-id")) ? jQuery(event.target).text() : target.text();
            linkType = "dynamicDropdown"
        }
        if (event.target.hasAttribute("data-content-for-dropdown-present")) {
            dataFromClick.title = jQuery(event.target).text();
            sl.log("data from click static:", dataFromClick);

            dataFromClick.jsDropdownContent = target.find(".jsDropdownContent").html();
            linkType = "staticDropdown"
        }

        //start here for submenu & submenu back titling

        var clickedMenuIndex = target.parent().children().not(".jsBackHeader").not(".jsMobileMenuTitle").index(target);
        this.currentMenuParentMenus[this.menuLevel] = this.currentMenu;
        this.menuLevel++;

        if (linkType == "dynamicDropdown") {
            this.fillMenuWithDynamicContent(dataFromClick);
        } else if (linkType == "staticDropdown") {
            this.fillMenuWithStaticContent(dataFromClick);
        } else {
            this.currentMenu = this.currentMenu.children(".jsMobileNavItem").eq(clickedMenuIndex).children(".jsNavSubList");
            this.fillMenu();
        }
    },

    addDropzoneToModule: function () {
        return;
    },

    subNavBackClickHandler: function (event) {
        this.scrollBackToTop();
        var target = jQuery(event.target);
        this.menuLevel--;
        if (this.menuLevel == 0) {
            this.setupHamburger();
            this.animateMenuTransition('back');

            this.hamburgerResetMenuHeight();

        }
        else {
            this.currentMenu = this.currentMenuParentMenus[this.menuLevel];
            this.fillMenu('back');
        }
    },

    animateMenuTransition: function (dir) {
        this.mobileDropdownSnapshot = this.mobileDropdownElement.clone().addClass('sl-cms2-nav-holder__dropdown-snapshot');

        this.mobileNavHolder.append(this.mobileDropdownSnapshot);
        this.mobileDropdownSnapshot.css('transform');

        if(dir && dir==='back') {
            this.mobileDropdownSnapshot.addClass('sl-cms2-nav-holder__dropdown-snapshot--fly-right');
        } else {
            this.mobileDropdownSnapshot.addClass('sl-cms2-nav-holder__dropdown-snapshot--fly-left');
        }

        this.mobileDropdownSnapshot.on("transitionend", jQuery.proxy(this.cleanUpMenuTransition, this));
    },

    cleanUpMenuTransition: function () {
        sl.log('cleanup');
        this.mobileDropdownSnapshot.remove();
    },

    fillMenu: function (dir) {
        this.animateMenuTransition(dir);
        var newMenuItems = this.currentMenu.children(".jsMobileNavItem").clone().removeClass("display-none-important");
        var i, listItem;
        var backItem = this.currentMenu.closest(".jsMobileNavItem");
        //var backTitle = (backItem.children(".jsItemName").text() != "") ? backItem.children(".jsItemName").text() : backItem.text();
        var backTitle = this.backHamburgerString + " to Main Menu";

        if(this.menuLevel > 1) {
            var backTitle = this.backHamburgerString + " to " + this.targetItemName[this.menuLevel-2];
        }


        var backTemplate = jQuery("<button class='sl-cms2-nav-holder__hamburger-back-header-holder jsBackHeader'>" +
            "<span class='sl-cms2-nav-holder__hamburger-back-header-back-arrow' aria-hidden='true'></span> " + backTitle + "</button>");
        this.mobileDropdownElement.empty().append(backTemplate);
        var mobileMenuTitle = jQuery("<li class='sl-cms2-nav__mobile-menu-title jsMobileMenuTitle'>" + this.targetItemName[this.menuLevel-1] + "</li>");
        this.mobileDropdownElement.append(mobileMenuTitle);

        for (i = 0; i < newMenuItems.length; i++) {
            listItem = jQuery(newMenuItems[i]);
            this.mobileDropdownElement.append(listItem);
        }

        this.hamburgerResetMenuHeight();
    },

    fillMenuWithStaticContent: function (dataFromClick) {
        this.animateMenuTransition();
        var backTemplate = jQuery("<button class='sl-cms2-nav-holder__hamburger-back-header-holder jsBackHeader'>" +
            // "<span class='sl-cms2-nav-holder__hamburger-back-header-back-arrow' aria-hidden='true'></span> " + dataFromClick['title'] + "</button>");
            "<span class='sl-cms2-nav-holder__hamburger-back-header-back-arrow' aria-hidden='true'></span> " + this.backHamburgerString + " to Main Menu" + "</button>");
            this.mobileDropdownElement.empty().append(backTemplate);
        this.loadedHandler(dataFromClick.jsDropdownContent);
    },

    fillMenuWithDynamicContent: function (dataFromClick) {
        this.animateMenuTransition();
        sl.log("fillMenuWithDynamicContent", dataFromClick);
        var backTemplate = jQuery("<button class='sl-cms2-nav-holder__hamburger-back-header-holder jsBackHeader'>" +
            // "<span class='sl-cms2-nav-holder__hamburger-back-header-back-arrow' aria-hidden='true'></span> " + dataFromClick['title'] + "</button>");
            "<span class='sl-cms2-nav-holder__hamburger-back-header-back-arrow' aria-hidden='true'></span> " + this.backHamburgerString + " to Main Menu" + "</button>");
            sl.log("this.mobileDropdownElement",this.mobileDropdownElement)
        this.mobileDropdownElement.empty();
        this.mobileDropdownElement.append(backTemplate);
        this.getContent(dataFromClick).then(jQuery.proxy(this.loadedHandler, this));
    },

    getContent: function (dataFromClick) {
        sl.log("getContent")
        var getURL = "/pf4/cms2/view_slide";
        var variables = {};
        variables[dataFromClick["pageParameterName"]] = dataFromClick["pageParameterValue"];
        variables.mod = dataFromClick["contentId"];
        sl.addAjaxScope(variables);
        var setupAjax = jQuery.ajax({
            url: getURL,
            type: "GET",
            data: variables,
            context: this,
        });
        return setupAjax
    },

    loadedHandler: function (data) {
        var appendedDynamicContent = this.mobileDropdownElement.append(data);

        sl.log('loaded handler content:', appendedDynamicContent);
        sl.fillSvgHolders();
        sl.initVideoForDynamicContentIfReqd(this.mobileDropdownElement);

        this.hamburgerResetMenuHeight();
    },

    anchorClickHandler: function () {
        this.hamburgerButton.toggleClass("sl-cms2-nav-holder__hamburger-back-header-holder--checked");
    },

    navItemsFit: function () {
        sl.log("navItemsFit", this.desktopTopNavHolder.width(), ">", this.desktopTopNavHolder.find(".jsDesktopNav").width());
        sl.log("jsDesktopNav", this.desktopTopNavHolder.find(".jsDesktopNav"))
        var wasHidden = false;

        if (!this.desktopTopNavHolder.is(":visible")) {
            this.desktopTopNavHolder.css({
                display: "flex",
                visibility: "hidden"
            })
            wasHidden = true;
        }

        var doesFit = (this.desktopTopNavHolder.width() > this.desktopTopNavHolder.find(".jsDesktopNav").width() );
        if (wasHidden) {
            this.desktopTopNavHolder.css({
                display: "none",
                visibility: "inherit"
            })
        }

        sl.log("doesFit", doesFit)
        return doesFit;

    },

    viewportIsWide: function () {
        var viewportWidth = jQuery(window).width();
        sl.log("viewportWidth > this.breakpoint  -- viewportIsWide", viewportWidth, this.breakpoint, (viewportWidth > this.breakpoint))
        return (viewportWidth > this.breakpoint);
    },

    keydownHandler: function (event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        sl.log("code", code);
        if (code == sl.keyboard["TAB"] ) {
            var target = jQuery(event.target);
            sl.log("target ", target)
            var lastTabbable = target.closest(".jsMobileDropdown").find(":tabbable:last");
            if (target.is(lastTabbable)) {
                sl.log("last tabbed");
                this.hamburgerClickHandler();
            }
        }
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 7/28/16.
 * Globals CKEDITOR,sl *
 */

var ComponentBlockEditor = BaseEditHandler.$extend({
    __init__: function (options) {
        this.$super(options);
        sl.log("init ComponentBlockEditor");
    }
}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 4/7/16.
 * Globals CKEDITOR,sl,vex,BlockBase *
 */

/* Model */

var SlideshowModel = BlockBase.$extend({
    __init__: function (options) {
        sl.log("model options", options);
        this.getSlideshowUrl = options.getSlideshowUrl;
        this.blockID = options.blockID;
        this.addSlideUrl = options.addSlideUrl;
        this.getSlideUrl = options.getSlideUrl;
        this.deleteSlideUrl = options.deleteSlideUrl;
        this.moveSlideUrl = options.moveSlideUrl;
        this.controller = null;
        this.slideshow = {};
        this.slides = [];
    },
    setController: function (controller) {
        this.controller = controller;
    },
    getSlides: function () {
        return this.slides;
    },

    public_refreshSlides: function () {
        sl.log("public_refreshSlides");
        this.refreshSlides();
        this.refreshSlidesDeferred = jQuery.Deferred();
        return this.refreshSlidesDeferred;
    },

    setSlidesOnly: function () {
        this.getJson().then(jQuery.proxy(this.setSlides, this));
        this.refreshSlidesDeferred = jQuery.Deferred();
        return this.refreshSlidesDeferred;
    },

    setSlides: function (data) {
        this.slides = data.slides;
        this.refreshSlidesDeferred.resolve();
    },

    refreshSlides: function () {
        sl.log("refreshSlides");
        this.getJson().then(jQuery.proxy(this.processJson, this));

    },

    getJson: function () {
        var variables = {
            edit_form_data: this.getFormDataID(),
            id: this.blockID
        };
        sl.addAjaxScope(variables);
        return jQuery.ajax({
            url: this.getSlideshowUrl,
            data: variables,
            dataType: "json"
        });
    },

    processJson: function (data) {
        if (data != null) {
            sl.log("processJson DATA", data);
            this.slides = data.slides;
            this.showOptions = data.options;
            if (this.slides.length == 0) {
                this.addNewSlide();
            } else {
                this.refreshSlidesDeferred.resolve();
            }
        }
    },

    addNewSlideDeferring: function () {
        this.addNewSlide();
        this.refreshSlidesDeferred = jQuery.Deferred();
        return this.refreshSlidesDeferred;
    },

    addNewSlide: function (callback, data) {
        var successHandler = callback || jQuery.proxy(this.addNewSlideCallback, this, data)
        var variables = this.getVariables(null, true);
        variables.id = this.blockID;
        sl.addAjaxScope(variables);
        var addNewSlideAjax = jQuery.ajax({
            url: this.addSlideUrl,
            type: "GET",
            data: variables,
            context: this,
            success: function (id) {
                successHandler(id)
            },
            error: jQuery.proxy(this.errorAlert, this)
        });
        return addNewSlideAjax;
    },

    noRefreshAddCallback: function (data, id) {
        sl.log("noRefreshAddCallback", data, "id", id);
        this.controller.slideAddedHandler(data, id);
    },

    errorAlert: function (requestObject, textStatus, error) {
        sl.alert("Error:" + textStatus + "<br>" + error);
    },

    addNewSlideCallback: function () {
        this.refreshSlides();
    },

    getBlockID: function () {
        return this.blockID;
    },

    getVariables: function (slide_id, useSlideBlockID) {
        var variables = {
            edit_form_data: this.getFormDataID(),
            slide_id: slide_id
        };
        if (useSlideBlockID) {
            variables["slide_block_id"] = this.blockID;
        } else {
            variables["block_id"] = this.blockID;
        }
        if (slide_id != null) {
            variables["slide_id"] = slide_id;
        }
        sl.addAjaxScope(variables);
        return variables;
    },

    getSlide: function (slideID) {
        sl.log("getSlide", slideID);

        var variables = this.getVariables(slideID, true);
        variables.mod = slideID;

        var getSlideAjax = jQuery.ajax({
            url: this.getSlideUrl,
            type: "GET",
            data: variables,
            context: this,
            error: jQuery.proxy(this.errorAlert, this)
        });
        return getSlideAjax;
    },

    deleteSlide: function (slideID) {
        if (slideID == null) {
            slideID = this.getIdFromTabIndex(this.focussedSlideIndex);
        }

        this.deleteSlideAjax(slideID, jQuery.proxy(this.refreshSlides, this))
        this.refreshSlidesDeferred = jQuery.Deferred();
        return this.refreshSlidesDeferred;
    },

    deleteSlideAjax: function (slideID, callback) {
        var variables = this.getVariables(slideID, false);
        var deleteSlideAjax = jQuery.ajax({
            url: this.deleteSlideUrl,
            data: variables,
            context: this,
            success: callback,
            error: jQuery.proxy(this.errorAlert, this)
        });
    },
    reorderSlide: function (slide_id, before_id) {
        var variables = this.getVariables(slide_id, false);
        variables.before_id = before_id;
        sl.log("variables for reorderSlide", this.moveSlideUrl, variables);
        var reorderSlideAjax = jQuery.ajax({
            url: this.moveSlideUrl,
            data: variables,
            context: this,
            success: jQuery.proxy(this.refreshSlides, this),
            error: jQuery.proxy(this.errorAlert, this)
        });
        this.refreshSlidesDeferred = jQuery.Deferred();
        return this.refreshSlidesDeferred;
    }

});

/* ***** View **** */

var SlideshowView = Class.$extend({
    __init__: function (model, options) {
        this.model = model;
        this.moduleId = options.moduleId;
        this.tabsHolderClass = options.tabsHolderClass;
        this.tabTemplate = options.tabTemplate;
        this.tabStyleClass = options.tabStyleClass;
        this.tabClass = options.tabClass;
        this.tabPlusTemplate = options.tabPlusTemplate;
        this.tabPlusClass = options.tabPlusClass;
        this.deleteSlideButtonTemplate = options.deleteSlideButtonTemplate;
        this.tabDeleteClass = options.tabDeleteClass;
        this.editAltTextButtonTemplate = options.editAltTextButtonTemplate;
        this.editAltTextClass = options.editAltTextClass;
        this.tabImageClass = options.tabImageClass;
        this.previewClass = options.previewClass;
        this.stopPreviewClass = options.stopPreviewClass;
        this.slideBodyClass = options.slideBodyClass;
        this.focussedClass = options.focussedClass;
        this.displayName = options.displayName;
        this.moduleToolbarID = options.moduleToolbarID;
    },

    setUpTabs: function () {
        //this.moduleElement = jQuery("#" + this.moduleId);
        this.tabsHolder = this.moduleElement.find("." + this.tabsHolderClass);
        this.tabsList = this.tabsHolder.find("ul");
        this.slideBodyElement = this.moduleElement.find("." + this.slideBodyClass);
        this.focussedSlideIndex = 0;
    },

    getModuleID: function () {
        return this.moduleId;
    },

    childSelected: function (event) {
        this.blockElement.addClass("cms2-selectable-module--semi-selected");
        this.controller.childSelectedHandler();
    },

    childDeselected: function (ev, moduleToEdit) {
        sl.log("child deselected in SlideshowView", moduleToEdit);
        ev.stopPropagation();
        this.blockElement.removeClass("cms2-selectable-module--semi-selected");
        this.controller.childDeselectedHandler(ev, moduleToEdit);
    },

    childReloaded: function (ev) {
        sl.log("child reloaded");
        ev.stopPropagation();
        if (this.blockElement.hasClass("cms2-selectable-module--semi-selected")) {   //check for
            this.refreshTabsOnly();
            this.controller.childSelectedHandler();
        } else if (this.blockElement.hasClass("cms2-selectable-module--selected")) {
            this.controller.getChildModules().addClass("cms2-selectable-module");
        }
    },

    refreshTabsOnly: function () {
        this.model.setSlidesOnly()
            .then(jQuery.proxy(this.refreshTabs, this))
    },

    setController: function (controller) {
        this.controller = controller;
    },

    initialRender: function () {
        this.slides = this.model.getSlides();
        sl.log("initialRender", this.slides);
        this.blockElement = this.controller.getBlockElement();
        this.moduleElement = this.controller.getModuleElement();
        this.setUpTabs()
        this.setUpListeners();
        this.refreshTabs();
    },
    refreshTabs: function () {
        sl.log("refreshTabs")
        this.slides = this.model.getSlides();
        this.emptyTabs();
        this.renderTabs();
        this.tabs = this.tabsHolder.tabs();
        this.tabsHolder.find(".ui-tabs-nav").sortable({
            delay: 150,//added to prevent too quick dragging instead of clicking to select
            items: "> li:not(." + this.tabPlusClass + ")",
            update: jQuery.proxy(this.tabsUpdateHandler, this)
        });
        this.toggleFocussedSlide();
    },

    tabsUpdateHandler: function (event, ui) {
        var originalIndex = jQuery(ui.item).data("order");
        var newIndex = ui.item.index();
        var slide_id = this.getIdFromTabIndex(originalIndex);
        var before_id;
        if (newIndex + 1 == this.slides.length) {
            before_id = null;
        } else {
            before_id = this.getIdFromTabIndex(newIndex + ((newIndex > originalIndex) ? 1 : 0));
        }
        if (originalIndex != this.focussedSlideIndex) { //only load slide if it's a new one
            this.focussedSlideIndex = newIndex;
            this.controller.reorderSlide(slide_id, before_id).then(jQuery.proxy(this.loadfocussedSlide, this))
        } else {
            this.focussedSlideIndex = newIndex;
            this.controller.reorderSlide(slide_id, before_id);
        }
    },

    emptyTabs: function () {
        this.tabsList.empty();
    },

    renderTabs: function () {
        var l = this.slides.length;
        var i = 0;
        var tabNo;
        var tabTemplate, tabThumbnail, slide, tooltipMessage;
        sl.log("renderTabs", this.slides);
        for (i; i < l; i++) {
            for (tabNo in this.slides) {
                slide = this.slides[tabNo]
                if (slide.order == i + 1) {
                    if (slide.fullImageURL) {     // !!! This is just to deal with bug of uploaded video
                        if (slide.fullImageURL.split('.').pop() == "mp4" || slide.fullImageURL.split('.').pop() == "mov") {
                            tabThumbnail = jQuery("<div/>")
                                .attr("class", "sl-cms2-slides-tabs__video")
                        } else {
                            tabThumbnail = jQuery("<img />")
                                .attr("src", slide.fullImageURL).addClass(this.tabImageClass);
                        }
                    } else {
                        tabThumbnail = jQuery("<div/>").addClass("sl-cms2-slides-tabs__placeholder")
                    }


                    //tooltipMessage = (jQuery(this.slides[tabNo].title).text() == "") ? "Untitled slide" : jQuery(this.slides[tabNo].title).text();
                    tabTemplate = jQuery(this.tabTemplate)
                        .append(tabThumbnail);
                    //.append("<br>" + this.slides[tabNo].ID)      //for debugging
                    //.addClass(this.tabClass + " slTooltip").attr({
                    tabTemplate.addClass(this.tabClass).attr({
                        "data-order": i
                        //"data-message": tooltipMessage
                    });
                    if (slide.slide508Errors != null) {
                        // add 508 error highlight alert(JSON.stringify(this.slides[tabNo]));
                        tabTemplate.removeClass("sl-cms2-slides-tabs__tab");
                        tabTemplate.addClass("sl-cms2-slides-tabs__tab--508error")
                    }
                    this.tabsList.append(tabTemplate);
                    break;
                }
            }
        }
        sl.setupTooltips();
        this.tabsList.append(jQuery(this.tabPlusTemplate).addClass(this.tabPlusClass));
        this.tabsList.append(jQuery(this.deleteSlideButtonTemplate));
        this.tabsList.append(jQuery(this.editAltTextButtonTemplate));
    },
    loadfocussedSlide: function () {
        sl.log("loadfocussedSlide in view");
        var checkOrder = this.focussedSlideIndex + 1;
        var found = jQuery.grep(this.slides, function (el) {
            return el.order === checkOrder;
        });
        this.toggleFocussedSlide();
        this.model.getSlide(found[0].ID).then(jQuery.proxy(this.fillSlide, this));
        this.loadfocussedSlideDeferred = jQuery.Deferred();
        return this.loadfocussedSlideDeferred;
    },

    fillSlide: function (data) {
        this.slideBodyElement.html(data);
        sl.refreshElementQueries();
        this.initEditorsInSlideBody();

        this.loadfocussedSlideDeferred.resolveWith(this, this.slideBodyElement);
    },
    initEditorsInSlideBody: function () {
        this.slideBodyElement.find("div").each(function (index) {
            var initer = jQuery(this).data("editHandlerIniter");
            if (initer != null) {
                initer.init();
            }
        });
    },
    setUpListeners: function () {
        this.moduleElement.on("jsChildModuleSelected", jQuery.proxy(this.childSelected, this));
        this.moduleElement.on("jsChildModuleDeselected", jQuery.proxy(this.childDeselected, this));
        this.moduleElement.on("jsChildModuleReloaded", jQuery.proxy(this.childReloaded, this));

        this.moduleElement.on({
            "click": jQuery.proxy(this.tabClickHandler, this)
        }, "." + this.tabClass);

        this.moduleElement.on({
            "click": jQuery.proxy(this.addClickHandler, this)
        }, "." + this.tabPlusClass);

        this.moduleElement.on({     //not currently used
            "click": jQuery.proxy(this.deleteTabClickHandler, this)
        }, "." + this.tabDeleteClass);

        this.moduleElement.on({
            "click": jQuery.proxy(this.editAltTextClickHandler, this)
        }, "." + this.editAltTextClass);

    },
    addClickHandler: function (event) {
        event.stopPropagation();
        this.focussedSlideIndex = this.slides.length;
        this.controller.addNewSlide();
    },
    toggleFocussedSlide: function () {
        this.tabsList.find("." + this.focussedClass).removeClass(this.focussedClass)
        this.tabsList.find("." + this.tabClass).eq(this.focussedSlideIndex).addClass(this.focussedClass);
    },
    tabClickHandler: function (event) {
        sl.log("tabClickHandler", jQuery(event.target));
        event.stopPropagation();
        var clickedTab = this.getTabFromEvent(event);
        this.focussedSlideIndex = clickedTab.index();
        var callback = jQuery.proxy(this.tabClickCallback, this);
        var cmsModule = EditCMS2Page.findModule();
        cmsModule.saveActiveModule(callback);
    },
    tabClickCallback: function () {
        var cmsModule = EditCMS2Page.findModule();
        cmsModule.selectModule(this.blockElement)
        this.loadfocussedSlide()
            .then(jQuery.proxy(this.controller.selectHandler, this.controller));
    },
    getTabFromEvent: function (event) {
        return (jQuery(event.target).hasClass(this.tabClass)) ? jQuery(event.target) : jQuery(event.target).closest("." + this.tabClass);
    },
    deleteTabClickHandler: function (event) {
        var deleteId = this.getIdFromTabIndex(this.focussedSlideIndex);
        this.controller.deleteSlide(deleteId);
    },

    editAltTextClickHandler: function (event) {
        var url = "/pf4/cms2_site/edit_slideshow_alt_text";
        var variables = {
            edit_form_data : this.model.getFormDataID(),
            block_id: this.model.getBlockID(),
            mod:"column-wide"
        };
        var dialogData = {
            url: url,
            contentClassName: "sl-dialog-medium sl-dialog-default-height",
            showCloseButton: true,
            additonalData: variables,
            buttons: [
                jQuery.extend({}, vex.dialog.buttons.YES, {
                    className: 'vex-dialog-button-primary vex-dialog-button vex-first',
                    text: 'OK',
                    click: jQuery.proxy(this.controller.update, this.controller)
                })]
        };
        this.currentDialog = new Dialog(dialogData);
        this.currentDialog.createDialog();
    },

    getIdFromTabIndex: function (index) {
        var tabNo;
        var id;
        for (tabNo in this.slides) {
            if (this.slides[tabNo].order == index + 1) {
                id = this.slides[tabNo].ID;
                break;
            }
        }
        return id;
    },
    decrementFocus: function () {
        this.focussedSlideIndex--;
    },
    getDisplayName: function () {
        return this.displayName;
    },
    showTabs: function () {
        this.tabsHolder.removeClass("display-none");
    },
    hideTabs: function () {
        this.tabsHolder.addClass("display-none");
    },
    getModuleToolbarID: function () {
        return this.moduleToolbarID
    },
    getFocussedSlideIndex: function () {
        return this.focussedSlideIndex;
    }
});

/* ***** Controller **** */

var SlideshowController = BaseEditHandler.$extend({
    __init__: function (model, view) {
        this.model = model;
        this.view = view;
        var options = {
            moduleID: this.view.getModuleID(),
            blockID: this.model.getBlockID(),
            displayName: this.view.getDisplayName(),
            moduleToolbarID: this.view.getModuleToolbarID()
        }
        this.$super(options);
        this.view.setController(this);
        this.model.setController(this);
        this.initTitleListener();
        this.filesCounter = 0;
    },


    getModuleElement: function () {
        return this.moduleElement;
    },

    getBlockElement: function () {
        return this.blockElement;
    },

    publicInit: function () {
        sl.log("SlideshowController publicInit this.blockElement", this.blockElement);
        this.blockElement.data("jsEditorHandler", this);
        this.renderingChain = this.model.public_refreshSlides()
            .then(jQuery.proxy(this.view.initialRender, this.view))
            .then(jQuery.proxy(this.view.loadfocussedSlide, this.view));
    },

    publicRefreshCurrentSlide: function (selectOptions) {
        sl.log("publicRefreshCurrentSlide selectOptions", selectOptions);
        return this.model.public_refreshSlides()
            .then(jQuery.proxy(this.view.refreshTabs, this.view))
            .then(jQuery.proxy(this.view.loadfocussedSlide, this.view))
            .then(jQuery.proxy(this.selectHandler, this)) //added
            .then(jQuery.proxy(this.selectCurrentSlide, this, selectOptions));
    },

    selectCurrentSlide: function (selectOptions) {
        this.view.childSelected();
        var editorHandler = sl.findDataInChildNotIncludingSelf("#block_" + this.blockID, "jsEditorHandler");
        if (editorHandler != null) {
            editorHandler.selectHandler(selectOptions);
        }
    },

    addNewSlide: function () {
        this.renderingChain = this.model.addNewSlideDeferring()
            .then(jQuery.proxy(this.view.refreshTabs, this.view))
            .then(jQuery.proxy(this.view.loadfocussedSlide, this.view))
            .then(jQuery.proxy(this.selectHandler, this))
            .then(jQuery.proxy(this.selectCurrentSlide, this));

    },

    deleteSlide: function () {
        var deleteId = this.view.getIdFromTabIndex(this.view.getFocussedSlideIndex());
        this.model.deleteSlide(deleteId).then(jQuery.proxy(this.addSlideOnEmpty, this)).then(jQuery.proxy(this.publicRefreshCurrentSlide, this));
    },

    cropSlide: function (id) {
        var deleteId = this.view.getIdFromTabIndex(this.view.getFocussedSlideIndex());
        this.model.deleteSlide(deleteId).then(jQuery.proxy(this.addSlideOnEmpty, this)).then(jQuery.proxy(this.publicRefreshCurrentSlide, this));
    },

    addSlideOnEmpty: function () {
        var remainingSlidesLength = this.model.getSlides().length;
        if (remainingSlidesLength == 0) {
            this.model.addNewSlide();
        } else if (this.view.getFocussedSlideIndex() == remainingSlidesLength) {
            this.view.decrementFocus();
        }
    },

    reorderSlide: function (slide_id, before_id) {
        return this.model.reorderSlide(slide_id, before_id).then(jQuery.proxy(this.view.refreshTabs, this.view));
    },

    selectHandler: function () {
        this.$super();
        sl.log("slideshow selectHandler ");
        if (this.renderingChain.state() == "pending") {
            this.renderingChain.done(jQuery.proxy(this.selectActions, this));
        } else {
            this.selectActions();
        }
    },

    selectActions: function () {
        sl.log("selectActions");
        this.getChildModules().addClass("cms2-selectable-module");
        this.view.showTabs();
        this.blockElement.removeClass("cms2-selectable-module--semi-selected");
    },

    deselectHandler: function () {
        this.$super();
        this.view.hideTabs();
        this.getChildModules().removeClass("cms2-selectable-module cms2-selectable-module--selected");
    },

    getChildModules: function () {
        var result = this.blockElement.find(".jsSelectableIfParentSelected");
        return result;
    },

    childSelectedHandler: function (child) {
        this.view.showTabs();
        this.getChildModules().addClass("cms2-selectable-module");
    },

    childDeselectedHandler: function (ev, moduleToEdit) {
        var target = jQuery(ev.target);
        if (this.blockElement.has(target).length == 0 || this.blockElement.has(moduleToEdit).length == 0) {
            this.view.hideTabs();
            this.getChildModules().removeClass("cms2-selectable-module cms2-selectable-module--selected");
            this.deselectHandler();
        }
    },

    slideAddedHandler: function (data, id) {
        sl.log("slideAddedHandler", id, data);
        var fileUploadData = {
            edit_form_data: this.getFormDataID(),
            block_id: id,
            group_id: this.groupID,
        };
        data.formData = fileUploadData;
        sl.log("id in slideAddedHandler", id)
        this.progressInstance.addHandler("", data, "image-multiple")

    },

    uploadErrorHandler: function (jqXHR, textStatus, errorThrown) {      //not used I think, rw
        if (errorThrown !== 'abort') {
            sl.alert('An error occured during the image upload: ' + errorThrown);
        }
    },

    initSlidehowUploader: function (options) {
        var settings = {
            blockID: options.blockID,
            blockElement: options.blockElement,
            fileUploadButton: options.fileUploadButton,
            doneHandler: jQuery.proxy(this.uploadDoneHandler, this),
            multiplesDialog: true,
            uploadURL: "/pf4/cms2/setSlideLayoutImage",
            addSlideMethod: jQuery.proxy(this.model.addNewSlide, this.model),
            slideshowInstance: this,
            acceptVideo: options.acceptVideo,
            promoVideo: options.promoVideo
        };
        var uploader = new Uploader(settings);
    },

    uploadDoneHandler: function (uploadFiles, addedSlideId) {
        sl.log("uploadDoneHandler", uploadFiles);
        this.model.deleteSlide(addedSlideId);
        this.setNextSlideId();    // if set this is where new slides get added before
        if (uploadFiles.length > 0) {
            sl.startWaitingScreen(this.blockElement);
            var i;
            this.uploadFiles = uploadFiles;
            this.numberOfFiles = this.uploadFiles.length;
            this.filesCounter = 0;
            this.processUploadFiles();
        }
    },

    processUploadFiles: function(){
        this.model.addNewSlide(null)//this null is so we don't pass in callback and can use deferred obj
            .then(jQuery.proxy(this.addPathToSlide, this, this.uploadFiles[this.filesCounter]["filePath"]))
    },

    setNextSlideId: function () {
        this.currentSlideId = this.view.getIdFromTabIndex(this.view.getFocussedSlideIndex());
        this.slides = this.model.getSlides();
        this.nextSlideId = null;
        if (this.slides[this.slides.length - 1].ID != this.currentSlideId) {   //check it's not final slide

            var l = this.slides.length;
            var i = 0;
            sl.log("getNextSlideId", this.slides);
            for (i; i < l; i++) {
                if (this.slides[i].ID == this.currentSlideId && this.slides[i + 1].ID != null) {
                    this.nextSlideId = this.slides[i + 1].ID;
                }
            }
        }
    },

    addPathToSlide: function (path, id) {
        sl.log("addPathToSlide", path, id);
        var url = "/pf4/cms2/setSlideLayoutImageWithPath"

        var variables = {
            edit_form_data: this.getFormDataID(),
            block_id: id,
            'file_path': path
        };
        sl.addAjaxScope(variables);
        var setSlide = jQuery.ajax({
            url: url,
            type: 'POST',
            data: variables,
            success: jQuery.proxy(this.pathAddedSuccessHandler, this, id),
        })
        return setSlide;
    },

    pathAddedSuccessHandler: function (slide_id, id) {
        sl.log("pathAddedSuccessHandler", slide_id, id);
        if (this.nextSlideId != null) {
            sl.log("reorder")
            this.model.reorderSlide(slide_id, this.nextSlideId).then(jQuery.proxy(this.checkIfAllAdded, this));
        }  else {
            this.checkIfAllAdded();
        }
    },

    checkIfAllAdded: function () {
        this.filesCounter++;
        if (this.filesCounter == this.numberOfFiles) {
            if (this.currentSlideIsPlaceholder()) {
                this.model.deleteSlide(this.currentSlideId).then(jQuery.proxy(this.publicRefreshCurrentSlide, this));
            } else {
                this.publicRefreshCurrentSlide();
            }
            sl.stopWaitingScreen();
        } else {
            this.processUploadFiles();
        }
    },

    saveHandler: function (callback) {
        sl.log("slideshow saveHandler")
        this.saveTitleHandler(callback);
    },

    currentSlideIsPlaceholder: function () {
        var checkChildren = jQuery("#" + this.currentSlideId).find("div");
        this.placeholderResult = false;
        jQuery.each(checkChildren, jQuery.proxy(this.hasPlaceholder, this))
        return this.placeholderResult;
    },

    hasPlaceholder: function (key, value) {
        // sl.log("value", value)
        if (value && jQuery(value).css("background-image") != null && jQuery(value).css("background-image") != "none") {
            var backgroundString = jQuery(value).css("background-image");
            if (backgroundString.includes("placeholder.png")) {
                this.placeholderResult = true;
            }
        }
    },
    videoFromLocker: function (variables) {
        this.filesCounter = 1;
        this.model.addNewSlide(jQuery.proxy(this.addPathToSlide, this, variables.embed_url));
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 2/26/16.
 * Globals CKEDITOR, sl, DotsTypeHandler, ArrowsTypeHandler, Shutters, Scroller, CarouselThreeD_slide3D *
 */


var SlideshowPlayer = Class.$extend({
    __init__: function (options) {
        sl.log("SlideshowPlayer init", options);
        this.defaults = {
            getSlideUrl: "/pf4/cms2/view_slide",
            "transition": "Scroller",
            "navigation": ["Dots", "Arrows"],
            // "autoplay": true,
            holdOnSlides: options.slideDuration,
            transitionSpeed: 1000
        };

        this.id = options.id;
        this.pageParameterName = options.pageParameterName;
        this.pageParameterValue = options.pageParameterValue;
        this.slideShowID = options.slideShowID;
        this.getSlideshowUrl = options.getSlideshowUrl;
        this.getSlideUrl = options.getSlideUrl;
        this.slideClass = options.slideClass;
        this.navDotsClass = options.navDotsClass;
        this.arrowsHolderClass = options.arrowsHolderClass;
        this.titlesUnderClass = options.titlesUnderClass;
        this.titlesUnderButtonClass = options.titlesUnderButtonClass;
        this.titlesSideHolderClass = options.titlesSideHolderClass;
        this.titlesSideInnerClass = options.titlesSideInnerClass;
        this.titlesSideItemClass = options.titlesSideItemClass;
        this.videoClass = options.videoClass;
        this.slides = null;


        this.slideshowElement = jQuery("#" + this.id);
        this.sliderWrapper = this.slideshowElement.find(".jsSlider");
        this.currentPosition = 0;
        this.isAnimating = false;
        this.translateFactor = 230;

        this.containsVideo = false;
        this.videoElements = null;
        this.transEndEventName = 'transitionend';//this.transEndEventNames[ Modernizr.prefixed( 'transition' ) ];

        this.beforeInitialRenderCallbacks = jQuery.Callbacks();
        this.beforeTransitionCallbacks = jQuery.Callbacks();
        this.afterTransitionCallbacks = jQuery.Callbacks();
        this.aspectRatio = null;
        this.pauseTimeout = 0;
        this.isPaused = false;
        this.mouseIsOver = false;
        this.initListeners();

        this.windowScrollTimeout = false;
        this.windowScrollDelay = 250;

        this.windowResizeTimeout = false;
        this.windowResizeDelay = 250;

        jQuery.expr.filters.offscreen = function (el) {
            var rect = el.getBoundingClientRect();
            return (
                (rect.x + rect.width) < 0
                || (rect.y + rect.height) < 0
                || (rect.x > window.innerWidth || rect.y > window.innerHeight)
            );
        };
    },

    initListeners: function () {
        this.slideshowElement.on({
            focusin: jQuery.proxy(this.focusinHandler, this),
            mouseenter: jQuery.proxy(this.mouseenterHandler, this),
            mouseleave: jQuery.proxy(this.mouseleaveHandler, this),
        });

        this.slideshowElement.on({
            click: jQuery.proxy(this.ribbonClickHandler, this),
            mouseenter: jQuery.proxy(this.ribbonMouseenterHandler, this),
            focusin: jQuery.proxy(this.ribbonMouseenterHandler, this),
            mouseleave: jQuery.proxy(this.ribbonMouseleaveHandler, this),
            focusout: jQuery.proxy(this.ribbonMouseleaveHandler, this),
        }, ".jsRibbonContainer");

        jQuery(window).scroll(jQuery.proxy(this.windowScrollDebouncer, this));
        jQuery(window).resize(jQuery.proxy(this.windowResizeDebouncer, this));
    },

    finishInitialRender: function () {
        //sl.log("finishInitialRender");
        this.sliderWrapper.find(".sl-cms2-slideshow-container--loading-slide").removeClass("sl-cms2-slideshow-container--loading-slide")
        this.setSlidesElements();
        this.checkForTooMuchText();//this is for initial slide... might be smoother if call fires sooner
        this._getSize();
        this._setSize();
        if (this.slides.length > 1) {
            this.initNav();
            this.setupNav();
            this.setupTranstions();
            this.transitionTypes[this.showOptions.transition].setup(this.slidesElements);
            this.addCallbacksAroundTransitions();
            this.initTabindex();
            this.setTabindexForCurrent(this.slidesElements.eq(this.currentPosition));
            if (this.autoplay == true) {
                this._startSlideshow();
            }
        }
        this._loadEvents();
        this.initVideoCheck();  // sets up callbacks for video
        sl.refreshElementQueries();
        this.ariaShowHideSlides(this.currentSlideElement);
        this.fixEmptyRibbonInVertical();
    },

    addCallbacksAroundTransitions: function () {
        this.addBeforeCallback(jQuery.proxy(this.beforeTimer, this)); //these are just for debugging
        this.addAfterCallback(jQuery.proxy(this.beforeTimerEnd, this));
        this.addAfterCallback(jQuery.proxy(this.checkForGapAtBottom, this));
        this.addAfterCallback(jQuery.proxy(this._startSlideshow, this));
        this.addAfterCallback(jQuery.proxy(this.checkForTooMuchText, this));
        this.addBeforeCallback(jQuery.proxy(this.fixEmptyRibbonInVertical, this));
    },

    beforeTimer: function () {
        console.time("before transition");
        console.timeEnd("between slides");
    },

    beforeTimerEnd: function () {
        //sl.log("beforeTimerEnd")
        console.timeEnd("before transition");
        console.time("between slides");

    },

    windowScrollDebouncer: function () {
        //sl.log("windowScrollDebouncer in slideshow")
        clearTimeout(this.windowScrollTimeout);
        this.windowScrollTimeout = setTimeout(jQuery.proxy(this.windowScrollFunctions, this), this.windowScrollDelay);
    },

    windowScrollFunctions: function () {
        //sl.log("debounced scroll");
        this.pauseSlideshowIfTopIsOutside();
        this.toggleVideoByVisibility();
    },

    pauseSlideshowIfTopIsOutside: function () {
        if (this.isTopOffScreen()) {
            //sl.log("pause current",this.currentSlideElement)
            this.pauseSlideshow();
        } else {
            //sl.log("statr if current")
            if (this.mouseIsOver == false) {
                this.unpauseSlideshow();
            }
        }
    },

    toggleVideoByVisibility: function () {
        this.playPauseVideo(this.currentSlideElement, (this.isCurrentSlideOffScreen()) ? "pause" : "play")
    },

    isCurrentSlideOffScreen: function () {
        var slideTop = this.currentSlideElement.offset().top;
        var slideBottom = slideTop + this.currentSlideElement.height();
        var windowTop = jQuery(window).scrollTop();
        return (slideBottom <= windowTop || slideTop >= windowTop + window.innerHeight);
    },

    isTopOffScreen: function () {
        //sl.log("elementOffset - scrollTop", this.slideshowElement.offset().top - jQuery(window).scrollTop())
        return (this.slideshowElement.offset().top - jQuery(window).scrollTop() < 0)
    },

    windowResizeDebouncer: function () {
        //sl.log("windowResizeDebouncer in slideshow");
        clearTimeout(this.windowResizeTimeout);
        this.windowScrollTimeout = setTimeout(jQuery.proxy(this.windowResizeFunctions, this), this.windowResizeDelay);
    },

    windowResizeFunctions: function () {
        //sl.log("debounced scroll");
        this.checkForTooMuchText();         // restore this
    },

    isVideoCheck: function (slideElement) {
        return slideElement.find(".jsPromoVideo").length == 1;
    },

    startIfNextIsVideo: function () {
        //sl.log("startIfNextIsVideo",this.slideshowElement," next",this.nextSlideElement)
        if (this.isVideoCheck(this.nextSlideElement)) {
            this.nextSlideElement.find(".jsPromoVideo")[0].play();
        }
    },

    playPauseVideo: function (slideElement, control) {
        //sl.log("playPauseVideo",slideElement, control);
        if (typeof slideElement == 'string') {         //i.e. previous or next
            slideElement = this[slideElement + "SlideElement"];
        }
        if (this.isVideoCheck(slideElement)) {
            slideElement.find(".jsPromoVideo")[0][control]();
        }
    },


    pausePreviousIfVideo: function () {
        if (this.isVideoCheck(this.previousSlideElement)) {
            //sl.log("pausing video previousSlideElement",this.previousSlideElement.find(".jsPromoVideo"))
            this.previousSlideElement.find(".jsPromoVideo")[0].pause();
        }
    },

    focusinHandler: function (event) {
        this.pauseSlideshow();
    },

    pauseSlideshow: function () {
        //sl.log("pause slideshow");
        clearTimeout(this.slideshowTimer);
        //sl.log("this.slideshowTimer", this.slideshowTimer)
        this.isPaused = true;
    },

    unpauseSlideshow: function () {
        //sl.log("unpause slideshow")
        this.isPaused = false;
        this._startSlideshow();
    },

    mouseenterHandler: function () {
        //sl.log("mouseenterHandler");
        this.mouseIsOver = true;
        this.pauseSlideshow();
    },

    mouseleaveHandler: function () {
        this.mouseIsOver = false;
        this.unpauseSlideshow();
    },

    ribbonClickHandler: function (event) {
        var target = (jQuery(event.target).hasClass("jsRibbonContainer")) ? jQuery(event.target) : jQuery(event.target).closest(".jsRibbonContainer");
        if (target.find(".jsPromoLink").attr("href") != "") {
            target.find(".jsPromoLink:first")[0].click();
        }
        event.stopPropagation();
    },

    ribbonMouseenterHandler: function (event) {
        var target = (jQuery(event.target).hasClass("jsRibbonContainer")) ? jQuery(event.target) : jQuery(event.target).closest(".jsRibbonContainer");
        //sl.log("href of slide",target.find(".jsPromoLink").attr("href"))
        if (target.find(".jsPromoLink").length > 0 && target.find(".jsPromoLink").attr("href") != "") {
            target.addClass("sl-cms2-promo__ribbon-container--on");
            target.find(".jsPromoLink").addClass("sl-cms2-button__button--on");
        }
    },

    ribbonMouseleaveHandler: function (event) {
        var target = (jQuery(event.target).hasClass("jsRibbonContainer")) ? jQuery(event.target) : jQuery(event.target).closest(".jsRibbonContainer");
        if (target.find(".jsPromoLink").attr("href") != "") {
            target.removeClass("sl-cms2-promo__ribbon-container--on");
            target.find(".jsPromoLink").removeClass("sl-cms2-button__button--on");
        }
    },

    startShow: function () {
        this.refreshSlides();
    },

    refreshSlides: function () {
        var variables = {};
        variables[this.pageParameterName] = this.pageParameterValue;
        variables.id = this.slideShowID;
        sl.addAjaxScope(variables);
        var ajaxCall = jQuery.ajax({
            //url: "/pf4/static/test/slideshow_player_test.json",
            url: this.getSlideshowUrl,
            dataType: "json",
            data: variables,
            success: jQuery.proxy(this.processJson, this),
            error: jQuery.proxy(this.ajaxErrorHandler, this)
        });
        return ajaxCall;
    },
    ajaxErrorHandler: function (jqXHR, textStatus, errorThrown) {
        sl.log("Error loading ajax: " + textStatus + "<br>" + errorThrown);
    },
    processJson: function (data) {
        if ((data != null)) {
            sl.log("processJson data from ", this.getSlideshowUrl, data)
            this.slides = data.slides;
            this.slidesCount = this.slides.length;
            this.showOptions = jQuery.extend(this.defaults, data);
            //sl.log("processJson this.showOptions", this.showOptions)
            this.autoplay = (this.showOptions.holdOnSlides < 999999);
            this.initialRender();
        }
    },

    initialRender: function () {
        this.slideCounter = 0;
        setTimeout(jQuery.proxy(this.loadSlides, this), 1)
    },

    loadSlides: function () {
        this.appendSlides()
        //  .then(jQuery.proxy(this.finishInitialRender, this));
    },

    checkForGapAtBottom: function () {      //checks to see if the sliderwrapper (.jsSlider) is hiding any content... and reveals it after slide appears
        //sl.log("checkForGapAtBottom")
        var slideJustShownOffsetHeight = this.nextSlideElement[0].offsetHeight;
        this._getResizeSize();
        this.sliderWrapper.add(this.sliderWrapper.find('.js-slideshow-content-wrapper')).height(slideJustShownOffsetHeight);
        if (slideJustShownOffsetHeight != this.size.height) {
            this.sliderWrapper.add(this.sliderWrapper.find('.js-slideshow-content-wrapper')).animate({height: this.size.height})
        }
    },

    checkForTooMuchText: function () {
        //sl.log("checkForTooMuchText this.currentSlideElement", this.currentSlideElement);
        var slideToCheck = (this.nextSlideElement != null) ? this.nextSlideElement : this.currentSlideElement;
        var ribbon = slideToCheck.find(".jsRibbon:first");
        ribbon.css("height", "auto");
        if (ribbon.find(".jsPromoBody").data("original-blurb") != null) {
            ribbon.find(".jsPromoBody").empty().text(ribbon.find(".jsPromoBody").data("original-blurb"))
        }
        if (ribbon.length == 1) {
            var checkRibbonTopAgainst = this.slideshowElement.offset().top + 10;
            if (ribbon.offset().top < checkRibbonTopAgainst) {
                //sl.log("ribbon, ribbon.offset().top, checkRibbonTopAgainst",ribbon, ribbon.offset().top, checkRibbonTopAgainst)
                this.slideTextClamper(ribbon, checkRibbonTopAgainst);

            }
        }
    },

    slideTextClamper: function (ribbon, checkRibbonTopAgainst) {
        var blurb = ribbon.find(".jsPromoBody");
        var blurbText = blurb.text();
        blurb.data("original-blurb", blurbText);
        var safetyValve = 0;

        while (ribbon.offset().top < checkRibbonTopAgainst && blurbText != "") { // Check if the paragraph's height is taller than the container's height. If it is:
            blurbText = blurbText.replace(/\W*\s(\S)*$/, "...");
            blurb.empty().append(blurbText);
            //sl.log("ribbon.offset().top",ribbon.offset().top,checkRibbonTopAgainst)
            if (safetyValve++ > 1000) {
                break;
            }
        }
    },

    fixEmptyRibbonInVertical: function () {
        var slideToCheck = (this.nextSlideElement != null) ? this.nextSlideElement : this.currentSlideElement;
        if (slideToCheck.find(".jsRibbon").length == 0 && slideToCheck.find("[class*='sl-cms2-promo__content-container--vertical']").length == 1) {
            var css = {
                width: "100%",
                margin: "auto"
            };
            slideToCheck.find(".jsPromoImage").css(css)
        }
    },

    appendSlidesXXXX: function () { //old way
        var i;
        for (i = 0; i < this.slides.length; i++) {//now starts from 0 so first slide returns deferred
            var jsSlide = jQuery("<div/>").addClass(this.slideClass);
            if (i > 0) {
                jsSlide.addClass("sl-cms2-slideshow-container--loading-slide")
            }
            this.sliderWrapper.append(jsSlide);
            this.getSlideHtml(i).then(jQuery.proxy(this.appendSlide, this, jsSlide));
        }
        this.deferredSlidesAppended = jQuery.Deferred();
        return this.deferredSlidesAppended;
    },

    appendSlides: function () {  //new way
        this.loadFirstSlide().
            then(jQuery.proxy(this.loadAllSlides, this)).
            then(jQuery.proxy(this.processIndividualSlides, this));
    },
    loadFirstSlide: function() {
        var jsSlide = jQuery('<div/>').addClass(this.slideClass);
        this.sliderWrapper.append(jsSlide);
        this.getSlideHtml(0).then(jQuery.proxy(this.appendSlide, this, jsSlide));
        this.deferredSlidesAppended = jQuery.Deferred();
        return this.deferredSlidesAppended;
    },
    processIndividualSlides: function (data) {
        // sl.log("processIndividualSlides", data);
        var i;
        //now starts from 1 so first slide returns deferred    --- potentially go back to separate out first slide to deal with big slideshows
        for (i = 1; i < this.slides.length; i++) {
            var jsSlide = jQuery("<div/>").addClass(this.slideClass);
            if (i > 0) {
                jsSlide.addClass("sl-cms2-slideshow-container--loading-slide")
            }
            this.sliderWrapper.append(jsSlide);
            var jsSlideHtml = jQuery(data).find("#" + this.slides[i]["ID"]);
            this.appendSlide(jsSlide, jsSlideHtml)
        }
        this.finishInitialRender()
    },

    loadAllSlides: function () {
        var variables = {
            show_all_slides: true,
            slide_block_id: this.slideShowID,
            mod: this.slideShowID
        };
        variables[this.pageParameterName] = this.pageParameterValue;
        // variables.mod = slideID;
        sl.addAjaxScope(variables);
        var getSlideAjax = jQuery.ajax({
            url: this.getSlideUrl,
            type: "GET",
            data: variables,
            context: this
        });
        return getSlideAjax;
    },

    appendSlide: function (jsSlide, slideHtml) {
        // sl.log("appendSlide");
        var cleanedSlideHtml = this.cleanSlideHtml(slideHtml)
        this.slideCounter++;
        jsSlide.html(cleanedSlideHtml);
        jsSlide.children()
            .wrapAll('<div class="js-slideshow-content-wrapper" />')
        if (this.deferredSlidesAppended != undefined && this.slideCounter === 1) {
            this.deferredSlidesAppended.resolve();
        }
    },

    cleanSlideHtml: function (slideHtml) {
        // sl.log('slide html', slideHtml);
        var jsSlideHtml = jQuery(slideHtml);
        var jsPromoBlock = jsSlideHtml.find('.jsPromoBlock');
        var ribbon = jsSlideHtml.find(".jsRibbonContainer");
        var jsPromoTitle = jsSlideHtml.find(".jsPromoTitle");
        var jsPromoBody = jsSlideHtml.find(".jsPromoBody");
        var jsPromoLink = jsSlideHtml.find(".jsPromoLink").clone();

        //If there is only button text, this wraps the button in a new container and removes the ribbon
        if (jsPromoTitle.text().trim() + jsPromoBody.text().trim() == "" && jsPromoLink.text().trim() != "") {
            var noTissuePositionClass;
            if (jsPromoBlock.hasClass('sl-cms2-promo__content-container--left-ribbon') ||
                jsPromoBlock.hasClass('sl-cms2-promo__content-container--vertical-left-ribbon')) {
                noTissuePositionClass = 'sl-cms2-promo__button-no-tissue--left';
            } else if (jsPromoBlock.hasClass('sl-cms2-promo__content-container--center-ribbon')) {
                noTissuePositionClass = 'sl-cms2-promo__button-no-tissue--center';
            } else if (jsPromoBlock.hasClass('sl-cms2-promo__content-container--right-ribbon') ||
                jsPromoBlock.hasClass('sl-cms2-promo__content-container--vertical-right-ribbon')) {
                noTissuePositionClass = 'sl-cms2-promo__button-no-tissue--right';
            } else {
                noTissuePositionClass = 'sl-cms2-promo__button-no-tissue--right';
            }


            jsSlideHtml.append('<div class="sl-cms2-promo__button-container-no-tissue sl-cms2-promo__button ' + noTissuePositionClass + ' jsNoTissueButtonWrapper" />')
            jsSlideHtml.find(".jsNoTissueButtonWrapper").append(jsPromoLink);
            jsSlideHtml.find(".jsRibbonContainer").remove();
        }

        return jsSlideHtml;

    },

    setSlidesElements: function () {
        this.slidesElements = this.sliderWrapper.children('.' + this.slideClass);
        this.currentSlideElement = this.slidesElements.eq(0)
    },

    initNav: function () {
        sl.log("initNav");
        this.navTypes = {
            Dots: new DotsTypeHandler(this),
            Arrows: new ArrowsTypeHandler(this),
            TitlesUnder: new TitlesUnderTypeHandler(this),
            TitlesSide: new TitlesSideTypeHandler(this)
        };
        var i;
        for (i = 0; i < this.showOptions.navigation.length; i++) {
            this.navTypes[this.showOptions.navigation[i]].preRenderCallback();
        }
    },

    resetSize: function (dir, size) {
        sl.log("resetSize", size);
        var showWidth = this.slideshowElement.width();
        //this.slideshowElement.width(showWidth - size)
        if (dir == "right") {

        }
    },

    setupNav: function () {
        if (this.showOptions.dotsNav) {
            this.navTypes["Dots"].setup(this);
        }

        if (this.showOptions.arrowNav) {
            this.navTypes["Arrows"].setup(this);
        }
    },

    setupTranstions: function () {
        //just need to setup transition - unless we want random
        this.transitionTypes = {
            Shutters: new Shutters(this),
            Scroller: new Scroller(this),
            CarouselThreeD_scroll3D: new CarouselThreeD_scroll3D(this),
            CarouselThreeD_slide3D: new CarouselThreeD_slide3D(this),
            KenBurns: new KenBurns(this)
        };
    },
    getSliderWrapper: function () {
        return this.sliderWrapper;
    },
    addBeforeCallback: function (callback) {
        this.beforeTransitionCallbacks.add(callback);
        sl.log("addBeforeCallback", this.beforeTransitionCallbacks)
    },

    addAfterCallback: function (callback) {
        this.afterTransitionCallbacks.add(callback);
    },


    getCurrentPostion: function () {
        return this.currentPosition;
    },

    getOldPostion: function () {
        return this.oldPosition;
    },

    getSlides: function () {
        return this.slidesElements;
    },

    getSlideshowElement: function () {
        return this.slideshowElement;
    },

    getSlideHtml: function (index) {
        var slideID = this.slides[index].ID;
        var variables = {
            slide_id: slideID,
            slide_block_id: this.slideShowID
        };
        variables[this.pageParameterName] = this.pageParameterValue;
        variables.mod = slideID;
        sl.addAjaxScope(variables);
        var getSlideAjax = jQuery.ajax({
            url: this.getSlideUrl,
            type: "GET",
            data: variables,
            context: this
        });
        return getSlideAjax;
    },

    _getSize: function () {                                                                                 //determine height !!
        sl.log("height of slideshow width", this.slideshowElement.height(), this.slideshowElement.width());
        var heightOfFirstSlide = jQuery(this.slidesElements[0]).height()
        this.size = {
            width: this.slideshowElement.outerWidth(true),
            height: heightOfFirstSlide
        };

    },
    _getResizeSize: function () {     // this actually just sets this.size which is the appropriate resized sizes
        sl.log("_getResizeSize")
        var cssStyle = {
            height: "auto"
        };
        this.sliderWrapper.css(cssStyle).find('div.js-slideshow-content-wrapper').css(cssStyle);     //clear wrapper heights
        var resizedHeight = this.slidesElements.eq(this.currentPosition).find('.js-slideshow-content-wrapper').height(); //so responsive slide is at new height
        this.size = {
            width: this.slideshowElement.outerWidth(true),
            height: resizedHeight
        };
    },
    _setSize: function () {
        sl.log("_setSize")
        var cssStyle = {
            width: this.size.width,
            height: this.size.height
        };
        this.sliderWrapper.css(cssStyle).find('div.js-slideshow-content-wrapper').css(cssStyle);
    },


    _loadEvents: function () {
        jQuery(window).resize(jQuery.throttle(25, jQuery.proxy(this.resize, this)));
        jQuery(window).on('keydown', jQuery.proxy(this.keydownHandler, this));
    },
    keydownHandler: function (e) {
        var keyCode = e.keyCode || e.which,
            arrow = {
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
        switch (keyCode) {
            case arrow.left :
                this._stopSlideshow();
                this._navigate('prev');
                break;
            case arrow.right :
                this._stopSlideshow();
                this._navigate('next');
                break;
        }
    },
    next: function (event) {
        sl.log("event", event);
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code == sl.keyboard["ENTER"] || code == sl.keyboard["SPACE"] || (code == 1)) {
            event.preventDefault();
            this._stopSlideshow();
            this._navigate('next');
        }
    },
    previous: function (event) {
        sl.log("event", event);
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code == sl.keyboard["ENTER"] || code == sl.keyboard["SPACE"] || (code == 1)) {
            event.preventDefault();
            this._stopSlideshow();
            this._navigate('prev');
        }
    },
    _startSlideshow: function () {
        sl.log("_startSlideshow this.slideshowTimer ", this.slideshowTimer)
        sl.log("this.showOptions.holdOnSlides", this.showOptions.holdOnSlides)
        if (this.autoplay == true) {
            window.clearTimeout(this.slideshowTimer);
            this.slideshowTimer = setTimeout(jQuery.proxy(this._startSlideshowTimeoutFunctions, this), this.showOptions.holdOnSlides);
        }

    },
    _startSlideshowTimeoutFunctions: function () {
        sl.log("_startSlideshowTimeoutFunctions this.slideshowTimer ", this.slideshowTimer)
        if (this.isPaused != true) {
            this._navigate('next');

        }
    },
    _stopSlideshow: function () {
        if (this.autoplay == true) {
            clearTimeout(this.slideshowTimer);
            this.isPlaying = false;
            this.autoplay = false;
        }
    },

    resize: function () {      //used for viewport size change
        sl.log("resize")
        var cssStyle = {
            width: "100%",
        };
        this.sliderWrapper.css(cssStyle).find('.js-slideshow-content-wrapper').css(cssStyle);
        this._getResizeSize();
        this._setSize();
    },

    _navigate: function (dir, pos) {
        sl.log("_navigate", dir, pos);
        if (this.isAnimating || this.slidesCount < 2) {
            return false;
        }
        this.isAnimating = true;
        this.currentSlideElement = this.slidesElements.eq(this.currentPosition);
        sl.log("this.currentSlideElement", this.currentSlideElement)
        this.oldPosition = this.currentPosition;
        // if position is passed
        if (pos !== undefined) {
            this.currentPosition = pos;
        } else if (dir === 'next') {
            this.currentPosition = this.currentPosition < this.slidesCount - 1 ? ++this.currentPosition : 0;
        } else if (dir === 'prev') {
            this.currentPosition = this.currentPosition > 0 ? --this.currentPosition : this.slidesCount - 1;
        }
        this.nextSlideElement = this.slidesElements.eq(this.currentPosition);
        this.setTabindexForCurrent(this.nextSlideElement)
        this.ariaShowHideSlides(this.nextSlideElement);
        this.beforeTransitionCallbacks.fire();
        this.transitionTypes[this.showOptions.transition].transition(this, this.currentSlideElement, this.nextSlideElement, dir);
        this.previousSlideElement = this.slidesElements.eq(this.oldPosition);
        this.currentSlideElement = this.slidesElements.eq(this.currentPosition);
    },
    ariaShowHideSlides: function (slide) {
        slide.attr("aria-hidden", "false")
        slide.siblings().attr("aria-hidden", "true")
    },

    onEndNavigate: function () {
        this.isAnimating = false;
        sl.log("fire after animation");
        this.afterTransitionCallbacks.fire();
    },
    initVideoCheck: function () {
        this.videoElements = this.slidesElements.find("." + this.videoClass);
        if (this.videoElements.length > 0) {
            this.containsVideo = true;
            this.addBeforeCallback(jQuery.proxy(this.playPauseVideo, this, "next", "play"));
            this.addAfterCallback(jQuery.proxy(this.playPauseVideo, this, "previous", "pause"));
            this.playPauseVideo(this.currentSlideElement, "play")
        }
    },

    initTabindex: function () {                     // for accessibility
        this.slidesElements.find(":tabbable").attr("tabindex", -1);

    },
    setTabindexForCurrent: function (element) {     // for accessibility
        element.find("[tabindex='-1']").attr("tabindex", "0");
        this.slidesElements.not(element).find("[tabindex='0']").attr("tabindex", "-1");
    },


}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 3/16/16.
 * Globals CKEDITOR,sl *
 */

var NavTypeHandler = Class.$extend({
    __init__: function (player) {
        sl.log("navTypeHandler __init__", player);
        this.player = player;
    },
    setup: function (player) {
        this.player = player;
        if (this.player.slideshowElement.find(".jsImageSizedNavHolder").length == 0) {
            this.firstImg = this.player.slideshowElement.find("[role=img]:first");
            this.imageSizedHolder = this.firstImg
            this.imageSizedHolder = jQuery("<div />")
                .addClass("jsImageSizedNavHolder sl-cms2-image-size-nav-holder")
                .prependTo(this.player.slideshowElement)
        } else {
            this.imageSizedHolder = this.player.slideshowElement.find(".jsImageSizedNavHolder")
        }
    },
    itemClickHandler: function (pos) {
        if (pos != this.player.getCurrentPostion()) {
            this.jumpTo(pos);
        }
    },

    jumpTo: function (pos) {
        this.player._stopSlideshow();
        this.player._navigate(pos > this.player.getCurrentPostion() ? 'next' : 'prev', pos);
    },

    setTitles: function () {
        this.slides = this.player.getSlides();
        var i, currentTitle;
        for (i = 0; i < this.slides.length; i++) {
            currentTitle = jQuery(this.slides[i]).find(".jsPromoTitle").text();
            this.titles.push(currentTitle || i + 1);
        }
    },
    preRenderCallback: function () {
        return false;
    }
});


var DotsTypeHandler = NavTypeHandler.$extend({
    __init__: function () {
    },

    setup: function (player) {
        sl.log("dotsTypeHandler setup");
        this.$super(player);
        this.navDotHolder = player.slideshowElement.find("." + player.navDotsClass);
        var i;
        for (i = 0; i < player.slidesCount; i++) {
            jQuery("<button />")
                .addClass("sl-cms2-bg-accent_light sl-cms2-slideshow-nav-dots__button")
                .text("Slide " + (i + 1))
                .appendTo(this.navDotHolder);
        }
        this.navDotElements = this.navDotHolder.children();
        this.imageSizedHolder.append(this.navDotHolder);
        this.dotsBeforeCallback();
        player.addBeforeCallback(jQuery.proxy(this.dotsBeforeCallback, this));
        this.setupDotListener();
    },

    setupDotListener: function () {
        sl.log("this.navDotElements", this.navDotElements);
        var i;
        for (i = 0; i < this.navDotElements.length; i++) {
            jQuery(this.navDotElements[i]).click(jQuery.proxy(this.itemClickHandler, this, i));
        }
    },
    dotsBeforeCallback: function () {
        this.navDotElements.removeClass('sl-cms2-bg-accent_light sl-cms2-slideshow-nav-dots__button--current');
        this.navDotElements.eq(this.player.getCurrentPostion()).addClass('sl-cms2-bg-accent_light sl-cms2-slideshow-nav-dots__button--current');
    }
});


var ArrowsTypeHandler = NavTypeHandler.$extend({
    __init__: function (options) {
        this.events = [];
        this.typeClass = "not_set";
    },
    setup: function (player) {
        this.$super(player);
        this.arrowHolder = this.player.slideshowElement.find("." + this.player.arrowsHolderClass).fadeIn("slow");
        this.imageSizedHolder.append(this.arrowHolder);
        this.setupArrowsListener();
    },
    setupArrowsListener: function () {
        sl.log("this.arrowHolder.children(':last')", this.arrowHolder.children(':last'))
        this.arrowHolder.children(':last').on('click keypress', jQuery.proxy(this.player.next, this.player));
        this.arrowHolder.children(':first').on('click keypress', jQuery.proxy(this.player.previous, this.player));
    }
});


var TitlesUnderTypeHandler = NavTypeHandler.$extend({
    __init__: function (player) {
        this.$super(player);

        this.titles = [];
        this.buttonElements = []
    },
    setup: function (player) {
        sl.log("TitlesUnderTypeHandler setup");
        this.$super(player);
        this.titlesUnderHolder = player.slideshowElement.find("." + player.titlesUnderClass);
        this.titlesUnderButtonClass = player.titlesUnderButtonClass;
        this.titlesUnderButtonActiveClass = player.titlesUnderButtonActiveClass;

        this.setTitles();
        this.createButtons();
        this.setActive(player.currentPosition);
        this.setUpSlider()
        player.addBeforeCallback(jQuery.proxy(this.titlesUnderBeforeCallback, this));

    },

    createButtons: function () {
        var i, currentButton;
        for (i = 0; i < this.titles.length; i++) {
            currentButton = jQuery("<span />")
                .addClass(this.titlesUnderButtonClass)
                .text(this.titles[i])
                .on("click", jQuery.proxy(this.itemClickHandler, this, i));
            this.titlesUnderHolder.append(currentButton);
        }
        this.buttonElements = this.titlesUnderHolder.children("." + this.titlesUnderButtonClass);
    },
    titlesUnderBeforeCallback: function () {
        var oldButton = this.buttonElements.eq(this.player.getOldPostion());
        var newButton = this.buttonElements.eq(this.player.getCurrentPostion());
        var startPosition = oldButton.position();
        var endPosition = newButton.position();
        var endWidth = newButton.width();
        var backgroundSlider = oldButton.clone().height(oldButton.outerHeight()).attr("class", "js-slideshow-titles-under__button--sliding");

        backgroundSlider.css("left", startPosition.left)
            .appendTo(this.titlesSliderHolder)
            .animate({
                    left: endPosition.left,
                    width: endWidth
                }, 1000, "easeOutQuint", jQuery.proxy(this.animationCallback, this, backgroundSlider)
            );
        oldButton.attr("class", "js-slideshow-titles-under__button");
        this.setActive(this.player.getCurrentPostion());

    },
    animationCallback: function (backgroundSlider) {
        backgroundSlider.remove();
    },
    setActive: function (pos) {
        this.buttonElements.eq(pos).attr("class", "js-slideshow-titles-under__button--active");
    },
    setUpSlider: function () {
        this.titlesSliderHolder = this.titlesUnderHolder
            .clone()
            .removeClass("js-slideshow-titles-under__inner")
            .addClass("js-slider-holder")
            .empty()
            .css("margin-top", -this.titlesUnderHolder.height())
            .insertAfter(this.titlesUnderHolder);
    }
});

var TitlesSideTypeHandler = NavTypeHandler.$extend({
    __init__: function (player) {
        this.$super(player);

        this.titles = [];
        this.buttonElements = [];
        this.titlesSideHolder = player.slideshowElement.find("." + player.titlesSideHolderClass);
        this.slideshowElement = player.getSlideshowElement()
        this.titlesSideInnerClass = player.slideshowElement.find("." + player.titlesSideInnerClass);
        this.titlesSideItemClass = player.titlesSideItemClass;
        this.slideshowElement.closest(".js-slideshow--outer").append(this.titlesSideHolder);

        sl.log("TitlesSideTypeHandler init");
    },
    setup: function (player) {
        sl.log("TitlesSideTypeHandler setup", player);

        this.slideshowElement = player.getSlideshowElement()
        this.titlesSideInnerClass = player.slideshowElement.find("." + player.titlesSideInnerClass);
        this.titlesSideItemClass = player.titlesSideItemClass;

        this.setTitles();
        this.setupHolder();
        this.createItems();
        this.setActive(player.currentPosition);

        this.player.addBeforeCallback(jQuery.proxy(this.titlesSideBeforeCallback, this));

    },
    setupHolder: function () {
        var height = this.slideshowElement.height();
        this.titlesSideHolder.height(height).show();
    },
    createItems: function () {
        var i, currentItem;
        for (i = 0; i < this.titles.length; i++) {
            currentItem = jQuery("<div />")
                .addClass(this.titlesSideItemClass);
            jQuery("<div />")
                .addClass("js-slideshow-titles-side__item__title")
                .text(this.titles[i])
                .appendTo(currentItem)
                .on("click", jQuery.proxy(this.itemClickHandler, this, i));
            this.titlesSideHolder.append(currentItem);
        }
        this.itemElements = this.titlesSideHolder.children("." + this.titlesSideItemClass);
    },
    preRenderCallback: function () {
        this.titlesSideHolder.show();
        return this.player.resetSize("right", this.titlesSideHolder.width());
    },

    titlesSideBeforeCallback: function () {
        var oldButton = this.itemElements.eq(this.player.getOldPostion());
        var newButton = this.itemElements.eq(this.player.getCurrentPostion());
        var startPosition = oldButton.position();
        var endPosition = newButton.position();

        var endHeight = newButton.height();
        var backgroundSlider = jQuery('<div class="js-slideshow-titles-side__slider"/>');
        //debugger;
        //debugger;

        this.checkScroll(newButton, endPosition)
        backgroundSlider.css("top", startPosition.top + this.titlesSideHolder.scrollTop())
            .appendTo(this.titlesSideHolder)
            .animate({
                    top: endPosition.top + this.titlesSideHolder.scrollTop(),
                    height: endHeight
                }, 1000, "easeOutQuint", jQuery.proxy(this.animationCallback, this, backgroundSlider)
            );
        oldButton.attr("class", "js-slideshow-titles-side__item");
        this.setActive(this.player.getCurrentPostion());
    },
    animationCallback: function (backgroundSlider) {
        backgroundSlider.remove();
    },
    setActive: function (pos) {
        this.itemElements.eq(pos).attr("class", "js-slideshow-titles-side__item--active");
    },
    checkScroll: function (newButton, endPosition) {
        sl.log("checkScroll", newButton, endPosition);
        var bottomEdge = endPosition.top + newButton.outerHeight() + this.titlesSideHolder.scrollTop();
        if (bottomEdge > this.titlesSideHolder.height() && !(bottomEdge < this.titlesSideHolder.height() + this.titlesSideHolder.scrollTop())) {
            //this.titlesSideHolder.scrollTop(bottomEdge - this.titlesSideHolder.height());
            this.titlesSideHolder.animate({
                scrollTop: bottomEdge - this.titlesSideHolder.height()
            }, 700, "easeOutQuint");
        } else if (endPosition.top < 0) {
            //this.titlesSideHolder.scrollTop(this.titlesSideHolder.scrollTop() + endPosition.top);
            this.titlesSideHolder.animate({
                scrollTop: this.titlesSideHolder.scrollTop() + endPosition.top
            }, 700, "easeOutQuint");
        }
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Created by russellward on 3/16/16.
 * Globals CKEDITOR,sl *
 *
 * Shutters
 * Scroller
 * CarouselThreeD_scroll3D
 * CarouselThreeD_slide3D
 * KenBurns
 *
 */

var TransitionTypeHandler = Class.$extend({
    __init__: function (player) {
        this.player = player;
        this.sliderWrapper = player.sliderWrapper;
    },
    setup: function () {

    },
    addTransitionWrapper: function (wrapperClass) {
        this.sliderWrapper.addClass(wrapperClass);
    },

    hideOverflow: function () {
        this.sliderWrapper.parent().css("overflow","hidden");
    }

});


var Shutters = TransitionTypeHandler.$extend({
    __init__: function (player) {
        sl.log("init Shutters");
        this.$super(player);

    },
    setup: function (slides) {
        slides.addClass("sl-slide-horizontal").hide();
        this.addTransitionWrapper("sl-cms2-slideshow__shutter-wrapper");
        slides.eq(0).show();
        this.hideOverflow();
    },

    transition: function (player, currentSlideElement, nextSlideElement, dir) {
        var movingSlideElement = (dir === 'next') ? currentSlideElement : nextSlideElement;
        sl.log("Shutters transition");
        jQuery.extend(this, player);
        var config = {};
        this.player = player;

        config.orientation = 'horizontal',
            config.slice1angle = -25,
            config.slice1scale = 2,
            config.slice2angle = -25,
            config.slice2scale = 2;
        var cssStyle = config.orientation === 'horizontal' ? {
                marginTop: -this.size.height / 2
            } : {
                marginLeft: -this.size.width / 2
            },
        // default slide's slices style
            resetStyle = {
                'transform': 'translate(0%,0%) rotate(0deg) scale(1)',
                opacity: 1,
                marginTop: 0
            },
        // slice1 style
            slice1Style = config.orientation === 'horizontal' ? {
                'transform': 'translateY(-' + this.translateFactor + '%) rotate(' + config.slice1angle + 'deg) scale(' + config.slice1scale + ')'
            } : {
                'transform': 'translateX(-' + this.translateFactor + '%) rotate(' + config.slice1angle + 'deg) scale(' + config.slice1scale + ')'
            },
        // slice2 style
            slice2Style = config.orientation === 'horizontal' ? {
                'transform': 'translateY(' + this.translateFactor + '%) rotate(' + config.slice2angle + 'deg) scale(' + config.slice2scale + ')'
            } : {
                'transform': 'translateX(' + this.translateFactor + '%) rotate(' + config.slice2angle + 'deg) scale(' + config.slice2scale + ')'
            };

        currentSlideElement.removeClass('sl-trans-elems');

        var transitionProp = {
            'transition': 'all ' + this.showOptions.transitionSpeed + 'ms ease-in-out'
        };

        // add the 2 slices and animate them
        var slice = movingSlideElement.css('z-index', this.slidesCount)
            .find('div.js-slideshow-content-wrapper')
            .wrap(jQuery('<div class="js-slideshow-shutters-content-slice" />').css(transitionProp))
            .parent();


        if (dir === 'prev') {
            slice.css(slice1Style);
        }
        setTimeout(function () {
            if (dir === 'prev') {
                slice.css(resetStyle);
            }
            else {
                slice.css(slice1Style);
            }
        }, 50);
        var slice2 = slice.clone()
            .appendTo(movingSlideElement);
        if (dir === 'prev') {
            slice2.css(slice2Style);
        }
        var self = this;
        var timer = setTimeout(function () {
            if (dir === 'prev') {
                currentSlideElement.addClass('sl-trans-back-elems');
                slice2.css(resetStyle).on(player.transEndEventName, function () {
                    self.endNavigate(slice2, currentSlideElement, dir);
                });
            }
            else {
                nextSlideElement.addClass('sl-trans-elems');
                slice2.css(slice2Style).on(player.transEndEventName, jQuery.proxy(self.endNavigate, self, slice2, currentSlideElement, dir));
            }
        }, 50);

        slice2.find('div.js-slideshow-content-wrapper')
            .css(cssStyle);

        nextSlideElement.show();
    },
    endNavigate: function ($slice, $oldSlide, dir) {
        // reset previous slide's style after next slide is shown
        var jsSlide = $slice.parent(),
            removeClasses = 'sl-trans-elems sl-trans-back-elems';
        // remove second slide's slice
        $slice.remove();
        // unwrap..
        jsSlide.css('z-index', 1)
            .find('div.js-slideshow-content-wrapper')
            .unwrap();
        $oldSlide.hide().removeClass(removeClasses);
        jsSlide.removeClass(removeClasses);
        this.player.onEndNavigate(jsSlide, $oldSlide);
    }
});


var Scroller = TransitionTypeHandler.$extend({
    __init__: function (player) {
        sl.log("init Scroller");
        this.$super(player);

    },
    setup: function (slides) {
        this.hideOverflow();
        slides.addClass("js-scroller");
        slides.first().addClass("js-slideshow-scroller-selected");
        this.addTransitionWrapper("js-scroller-wrapper");
    },
    transition: function (player, currentSlideElement, nextSlideElement, dir) {
        sl.log("nextSlideElement", nextSlideElement);
        if (currentSlideElement.is(":last-child") && dir === 'next') {
            dir = 'prev';
        }
        else if (currentSlideElement.is(":first-child") && dir === 'prev') {
            dir = 'next';
        }
        currentSlideElement.removeClass('js-slideshow-scroller-selected js-slideshow-scroller-from-left js-slideshow-scroller-from-right')
            .addClass('is-moving')
            .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', jQuery.proxy(this.endNavigate, this, currentSlideElement, nextSlideElement));
        if (dir === 'next') {
            //currentSlideElement.addClass('move-left')
            nextSlideElement.addClass('js-slideshow-scroller-selected js-slideshow-scroller-from-right').prevAll().addClass('move-left');
        } else {
            nextSlideElement.addClass('js-slideshow-scroller-selected js-slideshow-scroller-from-left').removeClass('move-left').nextAll().removeClass('move-left');
        }
        sl.log("currentSlideElement, movingSlideElement, nextSlideElement,", currentSlideElement, nextSlideElement)

    },
    endNavigate: function (currentSlideElement, nextSlideElement) {
        currentSlideElement.removeClass('is-moving');
        this.player.onEndNavigate(currentSlideElement);
    }

});


var CarouselThreeD = TransitionTypeHandler.$extend({
    __init__: function (player) {
        sl.log("init CarouselThreeD");
        this.$super(player);

    },
    setup: function (options) {
        sl.log("CarouselThreeD setup");
        this.addTransitionWrapper("js-scroller-threed");
        this.sliderWrapper.children().wrapAll("<div class='js-slideshow-three-d-carousel'/>");
        var settings = {
            slideClass: 'js-slide', // array of images source or slides from template
            animation: 'scroll3D', // slide | slide3D | scroll | scroll3D | fade
            animationCurve: 'ease',
            animationDuration: 2000,
            animationInterval: 1000,
            autoplay: false,
            navigation: false,
            onSlideShow: jQuery.proxy(this.threedCallback, this),
            controls: false,
            width :this.sliderWrapper.width(),			/* largest allowed width */
            height: this.sliderWrapper.height(),			/* largest allowed height */
        };
        jQuery.extend(settings, options)
        this.threedCarousel = this.sliderWrapper.find(".js-slideshow-three-d-carousel").jR3DCarousel(settings);//js-slideshow-three-d-carousel
    },
    transition: function (player, currentSlideElement, nextSlideElement, dir) {
        this.jumpTo(nextSlideElement.index());
        this.currentSlideElement = currentSlideElement;
        this.nextSlideElement = nextSlideElement
    },

    threedCallback: function () {
        this.player.onEndNavigate();
    },
    jumpTo: function (pos) {
        this.threedCarousel.jumpTo(pos);
    }

});

var CarouselThreeD_scroll3D = CarouselThreeD.$extend({
    setup: function () {
        var options = {animation: 'scroll3D'};
        this.$super(options)
    }
});

var CarouselThreeD_slide3D = CarouselThreeD.$extend({
    setup: function () {
        var options = {animation: 'slide3D'};
        this.$super(options)
    }
});


var KenBurns = TransitionTypeHandler.$extend({
    __init__: function (player) {
        sl.log("init KenBurns");
        this.$super(player);
        this.player.addAfterCallback(jQuery.proxy(this.player.checkForGapAtBottom, this.player));
    },
    setup: function (slides) {
        slides.addClass("js-slideshow-burns__slide");
        slides.eq(0).css("z-index", 5)
        this.slides = slides;
        this.hideOverflow();
    },
    transition: function (player, currentSlideElement, nextSlideElement, dir) {
        currentSlideElement.find(".jsRibbon").css("color")
        var cssTransition = {
            transform: "scale3d(1.1, 1.1, 1.1)"
        };
        var animationCallback = jQuery.proxy(this.endNavigate, this, currentSlideElement, nextSlideElement);
        nextSlideElement.css("z-index", 10).addClass("js-slideshow-ken-burns-revealing").one('animationend', animationCallback);
        nextSlideElement.find(".js-slideshow-background-image").css(cssTransition);
    },
    endNavigate: function (currentSlideElement, nextSlideElement) {
        sl.log("endNavigate")
        var cssReset = {
            transform: "none"
        };
        currentSlideElement.css({"z-index": 0}).find(".js-slideshow-background-image").css(cssReset);
        nextSlideElement.css({"z-index": 5}).removeClass('js-slideshow-ken-burns-revealing');
        this.player.onEndNavigate(currentSlideElement);
    }

}); /*
 *
 *  * Copyright (c) 2004-2018, School Loop, Inc. All Rights Reserved.
 *
 */

/**
 * Author: Vinayak Rangnathrao Jadhav
 * Project: jR3DCarousel
 * Version: 0.0.8
 **/
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(function ($) {

    $.fn.jR3DCarousel = function (options) {

        var _defaults = {
            width: 1349, /* largest allowed width */
            height: 668, /* largest allowed height */
            slides: [], /* array of images source or gets slides by 'slide' class */
            slideLayout: 'fill', /* contain | fill | cover */
            perspective: 0, /* perspective | default dynamic perpendicular */
            animation: 'slide3D', /* slide | slide3D | scroll | scroll3D | fade */
            animationCurve: 'ease', /* ease | ease-in | ease-out | ease-in-out | linear | bezier */
            animationDuration: 700,
            animationInterval: 2000,
            autoplay: true,
            controls: true,
            slideClass: 'jR3DCarouselSlide',
            navigation: 'circles', /* circles | squares */
            onSlideShow: function () {
            }   /* callback when Slide show event occurs */
        }
        var _settings = $.extend(true, {}, _defaults, options);
        var _container = this;
        var _width = _settings.width;
        var _height = _settings.height;
        var _aspectRatio = _settings.width / _settings.height;
        var _jR3DCarouselDiv = $("<div class='jR3DCarousel' />")
            .css({
                width: '100%',
                height: '100%',
                transition: 'transform ' + _settings.animationDuration + 'ms ' + _settings.animationCurve,
                'transformStyle': 'preserve-3d'
            })
            .appendTo(_container);
        var _currentSlideIndex = 0;
        var _targetSlideIndex = 1;
        var _animations = new Animations();
        var _previousButton;
        var _nextButton;
        var _timer;
        var _baseAngle;
        var _rotationAngle = 0;
        var _translateZ;
        var _perspective;
        var _transform;
        var _noOfSlides = _settings.slides.length || _container.find('.' + _settings.slideClass).length;

        (function setup() {

            /* create jR3DCarousel */
            createjR3DCarousel();

            /* create control buttons */
            if (_settings.controls) {
                _createControls();
            }

            /* create navigation bar */
            if (_settings.navigation) {
                _createNavigation();
            }

            /* start jR3DCarousel if autoplay */
            if (_settings.autoplay) {
                _playjR3DCarousel();
            }

            /* adjust size according to device */
            addEventListener('resize', _maintainResposive);
            _maintainResposive();

            function createjR3DCarousel() {
                /* compute translate and perspective */
                if (_settings.animation.indexOf('slide') != -1) {
                    _translateZ = (_width / 2) / Math.tan(Math.PI / _noOfSlides);
                    _perspective = (_width / 2) * Math.tan(2 * Math.PI / _noOfSlides) + 'px';
                } else if (_settings.animation.indexOf('scroll') != -1) {
                    _translateZ = (_height / 2) / Math.tan(Math.PI / _noOfSlides);
                    _perspective = (_height / 2) * Math.tan(2 * Math.PI / _noOfSlides) + 'px';
                } else if (_settings.animation == 'fade') {
                    _translateZ = (_width / 2) / Math.tan(Math.PI / _noOfSlides);
                    _perspective = (_width / 2) * Math.tan(2 * Math.PI / _noOfSlides) + 'px';
                }

                /* compute base angle */
                _baseAngle = 360 / _noOfSlides;

                /* create jR3DCarousel slide stack */
                if (_settings.slides.length) {
                    for (var i = 0; i < _settings.slides.length; i++) {
                        var slide = $("<div class='jR3DCarouselSlide' data-index=" + i + " />")
                            .append("<img src='" + _settings.slides[i].src + "' alt='" + _settings.slides[i].alt + "' />");
                        if (_settings.animation.indexOf('slide') != -1) {
                            _transform = 'rotateY(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                        } else if (_settings.animation.indexOf('scroll') != -1) {
                            _transform = 'rotateX(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                        } else if (_settings.animation == 'fade') {
                            _transform = 'rotateY(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                        }
                        slide.css({transform: _transform});
                        _jR3DCarouselDiv.append(slide);
                    }
                } else {
                    _container.find('.' + _settings.slideClass).each(function (i) {
                        var slide = $(this).attr('data-index', i);
                        if (_settings.animation.indexOf('slide') != -1) {
                            _transform = 'rotateY(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                        } else if (_settings.animation.indexOf('scroll') != -1) {
                            _transform = 'rotateX(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                        } else if (_settings.animation == 'fade') {
                            _transform = 'rotateY(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                        }
                        slide = slide.css({transform: _transform}).detach();
                        _jR3DCarouselDiv.append(slide);
                    });
                }
                _jR3DCarouselDiv.find('.' + _settings.slideClass).css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden'
                })
                    .find('img').css({width: '100%', height: '100%', objectFit: _settings.slideLayout});
                _perspective = _settings.perspective || _perspective;
                _container.css({
                    perspective: _perspective,
                    width: _width + 'px',
                    height: _height + 'px',
                    position: "relative",
                    overflow: 'visible'
                });
            }

            function _createControls() {
                _previousButton = $("<div class='previous controls' style='left: 8px; transform: rotate(-45deg);'></div>");
                _nextButton = $("<div class='next controls' style='right: 8px; transform: rotate(135deg);'></div>");
                _previousButton.add(_nextButton).appendTo(_container)
                    .css({
                        position: 'absolute',
                        top: '42%',
                        zIndex: 1,
                        display: 'inline-block',
                        padding: '1.2em',
                        boxShadow: '2px 2px 0 rgba(255,255,255,0.9) inset',
                        cursor: 'pointer'
                    })
                    .hide();

                /* event handlers */
                _previousButton.on('click', function () {
                    _currentSlideIndex = Math.round(_rotationAngle / _baseAngle);
                    _targetSlideIndex = _currentSlideIndex - 1;
                    _animations.run(_settings.animation, _targetSlideIndex);
                });
                _nextButton.on('click', function () {
                    _currentSlideIndex = Math.round(_rotationAngle / _baseAngle);
                    _targetSlideIndex = _currentSlideIndex + 1;
                    _animations.run(_settings.animation, _targetSlideIndex);
                });

                /* event handlers */
                _container.on('mouseenter touchstart', function () {
                    _previousButton.add(_nextButton).fadeIn();
                })
                    .on('mouseleave touchcancel', function () {
                        _previousButton.add(_nextButton).fadeOut();
                    });

                $(document).on('keydown', function (e) {
                    var rect = _container[0].getBoundingClientRect();
                    var inView = rect.bottom > 0 && rect.right > 0 &&
                        rect.left < (innerWidth || document.documentElement.clientWidth) &&
                        rect.top < (innerHeight || document.documentElement.clientHeight);

                    if (inView && e.which == 37) {
                        clearInterval(_timer);
                        _previousButton.click();
                    } else if (inView && e.which == 39) {
                        clearInterval(_timer);
                        _nextButton.click();
                    }
                });

                _swipedetect(_container, function (swipedir) {
                    clearInterval(_timer);
                    //swipedir contains either "none", "left", "right", "up", or "down"
                    if (swipedir == 'left') {
                        _nextButton.click();
                    } else if (swipedir == 'right') {
                        _previousButton.click();
                    } else if (_settings.animation.indexOf('scroll') != -1) {
                        if (swipedir == 'down') {
                            _nextButton.click();
                        } else if (swipedir == 'up') {
                            _previousButton.click();
                        }
                    }
                });
            }

            function _swipedetect(el, handleswipe) {
                var touchsurface = el, swipedir, startX, startY, distX, distY,
                    threshold = 20, //required min distance traveled to be considered swipe
                    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
                    allowedTime = 700, // maximum time allowed to travel that distance
                    elapsedTime, startTime

                touchsurface.on('touchstart', function (e) {
                    var touchobj = e.originalEvent.changedTouches[0]
                    swipedir = 'none'
                    startX = touchobj.pageX
                    startY = touchobj.pageY
                    startTime = new Date().getTime() // record time when finger first makes contact with surface
                    //e.preventDefault()
                })
                    .on('touchmove', function (e) {
                        e.preventDefault() // prevent scrolling when inside DIV
                    })
                    .on('touchend', function (e) {
                        var touchobj = e.originalEvent.changedTouches[0]
                        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
                        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
                        elapsedTime = new Date().getTime() - startTime // get time elapsed
                        if (elapsedTime <= allowedTime) { // first condition for awipe met
                            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
                            }
                            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
                            }
                        }
                        handleswipe(swipedir)
                        //e.preventDefault()
                    })
            }

            function _createNavigation() {
                var type = _settings.navigation;
                var _navigation = $('<div class=navigation />').css({position: 'absolute', bottom: 0, right: 0});
                for (var i = 0; i < _noOfSlides; i++) {
                    _navigation.append('<div class=nav></div>');
                }
                if (type == 'circles') {
                    _navigation.find('.nav').css({borderRadius: '12px'});
                }
                _navigation.find('.nav').css({
                    display: 'inline-block',
                    margin: '5px',
                    cursor: 'pointer',
                    backgroundColor: 'rgba(255, 255, 255, 0.77)',
                    width: '12px',
                    height: '12px',
                    transition: 'all ' + _settings.animationDuration + 'ms ease'
                })
                    .first().css({backgroundColor: 'rgba(0, 0, 0, 1)'});
                _jR3DCarouselDiv.after(_navigation);

                /* event handler */
                _container.on('click', '.nav', function () {
                    _targetSlideIndex = $(this).index();
                    _animations.run(_settings.animation, _targetSlideIndex);
                });
            }

            function _playjR3DCarousel() {
                _timer = setInterval(function () {
                    _currentSlideIndex = Math.round(_rotationAngle / _baseAngle);
                    _targetSlideIndex = _currentSlideIndex + 1;
                    _animations.run(_settings.animation, _targetSlideIndex);
                }, _settings.animationInterval + _settings.animationDuration);

                /* event handlers */
                _container.hover(function () {
                    clearInterval(_timer);
                }, function () {
                    _timer = setInterval(function () {
                        _currentSlideIndex = Math.round(_rotationAngle / _baseAngle);
                        _targetSlideIndex = _currentSlideIndex + 1;
                        _animations.run(_settings.animation, _targetSlideIndex);
                    }, _settings.animationInterval + _settings.animationDuration);
                });
            }

        })();


        /************ SL russell additions ****************/
        function jumpTo(index) {
            _animations.run(_settings.animation, index);
        }

        function showPrevious() {
            _currentSlideIndex = Math.round(_rotationAngle / _baseAngle);
            _targetSlideIndex = _currentSlideIndex - 1;
            _animations.run(_settings.animation, _targetSlideIndex);
        }

        function showNext() {
            _currentSlideIndex = Math.round(_rotationAngle / _baseAngle);
            _targetSlideIndex = _currentSlideIndex + 1;
            _animations.run(_settings.animation, _targetSlideIndex);
        }


        function _getPreviousSlide() {
            return _jR3DCarouselDiv.find('.' + _settings.slideClass).eq((_currentSlideIndex - 1) % _noOfSlides);
        }

        function _getCurrentSlide() {
            return _jR3DCarouselDiv.find('.' + _settings.slideClass).eq(_currentSlideIndex);
        }

        function _getNextSlide() {
            return _jR3DCarouselDiv.find('.' + _settings.slideClass).eq((_currentSlideIndex + 1) % _noOfSlides);
        }

        function _getSlideByIndex(idx) {
            return _jR3DCarouselDiv.find('.' + _settings.slideClass + '[data-index=' + idx + ']');
        }

        function Animations() {
            this.animations = {
                slide: _slide,
                slide3D: _slide3D,
                scroll: _scroll,
                scroll3D: _scroll3D,
                fade: _fade
            }
        }

        Animations.prototype.run = function run(animation, targetSlideIndex) {
            this.animations[animation](targetSlideIndex);
        }

        function _slide(targetSlideIndex) {
            _container.css({perspective: '', overflow: 'hidden'});
            _rotationAngle = _baseAngle * targetSlideIndex;
            _jR3DCarouselDiv.css({transform: 'translateZ(' + -_translateZ + 'px) rotateY(' + -_rotationAngle + 'deg)'});
            _slideCarouseld();
        }

        function _slide3D(targetSlideIndex) {
            _container.css({perspective: _perspective, overflow: 'visible'});
            _rotationAngle = _baseAngle * targetSlideIndex;
            _jR3DCarouselDiv.css({transform: 'translateZ(' + -_translateZ + 'px) rotateY(' + -_rotationAngle + 'deg)'});
            _jR3DCarouselDiv.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', //moved to after transition for text clamping
                function () {
                    sl.log(" transitionend"); //doSomething
                    _slideCarouseld();

                });
        }

        function _scroll(targetSlideIndex) {
            _container.css({perspective: '', overflow: 'hidden'});
            _rotationAngle = _baseAngle * targetSlideIndex;
            _jR3DCarouselDiv.css({transform: 'translateZ(' + -_translateZ + 'px) rotateX(' + -_rotationAngle + 'deg)'});
            _slideCarouseld();
        }

        function _scroll3D(targetSlideIndex) {
            _container.css({perspective: _perspective, overflow: 'visible'});
            _rotationAngle = _baseAngle * targetSlideIndex;
            _jR3DCarouselDiv.css({transform: 'translateZ(' + -_translateZ + 'px) rotateX(' + -_rotationAngle + 'deg)'});
            _jR3DCarouselDiv.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', //moved to after transition for text clamping
                function () {
                    sl.log(" transitionend");
                    _slideCarouseld();
                });
        }

        function _fade(targetSlideIndex) {
            _jR3DCarouselDiv.css({
                transition: 'opacity ' + _settings.animationDuration + 'ms ' + _settings.animationCurve,
                opacity: 0
            });
            /* set active nav icon */
            _container.find('.nav').css({backgroundColor: 'rgba(255, 255, 255, 0.77)'})
                .eq(_targetSlideIndex % _noOfSlides).css({backgroundColor: 'rgba(0, 0, 0, 1)'});
            clearTimeout(_tt);
            var _tt = setTimeout(function () {
                _rotationAngle = _baseAngle * targetSlideIndex;
                _jR3DCarouselDiv.css({
                    transform: 'translateZ(' + -_translateZ + 'px) rotateY(' + -_rotationAngle + 'deg)',
                    opacity: 1
                });

                _currentSlideIndex = (Math.round(_rotationAngle / _baseAngle) - 1) % _noOfSlides;
                _settings.onSlideShow.call(this, _getNextSlide());
            }, _settings.animationDuration);
        }

        function _slideCarouseld() {
            /* set active nav icon */
            _container.find('.nav').css({backgroundColor: 'rgba(255, 255, 255, 0.77)'})
                .eq(_targetSlideIndex % _noOfSlides).css({backgroundColor: 'rgba(0, 0, 0, 0.77)'});
            _currentSlideIndex = (Math.round(_rotationAngle / _baseAngle) - 1) % _noOfSlides;
            _settings.onSlideShow.call(this, _getNextSlide());
        }

        function _maintainResposive() {
            _container.width('100%');
            _width = _container.width() < _settings.width ? _container.width() : _settings.width;
            _height = _width / _aspectRatio;
            _container.css({width: _width + 'px', height: _height + 'px'});

            if (_settings.animation.indexOf('slide') != -1) {
                _translateZ = (_width / 2) / Math.tan(Math.PI / _noOfSlides);
                _perspective = (_width / 2) * Math.tan(2 * Math.PI / _noOfSlides) + 'px';
            } else if (_settings.animation.indexOf('scroll') != -1) {
                _translateZ = (_height / 2) / Math.tan(Math.PI / _noOfSlides);
                _perspective = (_height / 2) * Math.tan(2 * Math.PI / _noOfSlides) + 'px';
            } else if (_settings.animation == 'fade') {
                _translateZ = (_width / 2) / Math.tan(Math.PI / _noOfSlides);
                _perspective = (_width / 2) * Math.tan(2 * Math.PI / _noOfSlides) + 'px';
            }

            _container.find('.' + _settings.slideClass).each(function (i) {
                var slide = $(this);
                if (_settings.animation.indexOf('slide') != -1) {
                    _transform = 'rotateY(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                } else if (_settings.animation.indexOf('scroll') != -1) {
                    _transform = 'rotateX(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                } else if (_settings.animation == 'fade') {
                    _transform = 'rotateY(' + _baseAngle * i + 'deg) translateZ(' + _translateZ + 'px)';
                }
                slide.css({transform: _transform});
            });
            _perspective = _settings.perspective || _perspective;
            _jR3DCarouselDiv.css({transform: 'translateZ(' + -_translateZ + 'px) rotateY(' + -_rotationAngle + 'deg)'});
            _container.css({perspective: _perspective});
        }

        /* public API */
        this.showSlide = function (index) {
            _jR3DCarouselDiv.find('.nav').eq((index - 1) % _noOfSlides).click();
        }

        this.jumpTo = function (index) {   // use this
            return jumpTo(index);
        }

        this.getCurrentSlide = function () {
            return _getCurrentSlide();
        }
        this.getSlideByIndex = function (index) {
            return _getSlideByIndex(index);
        }
        this.showPreviousSlide = function () {
            _previousButton.click();
        }

        this.showPrevious = function () {
            return showPrevious();
        }


        this.showNextSlide = function () {
            _nextButton.click();
        }

        this.showNext = function () {
            return showNext();
        }

        return this;
    }

}); 





