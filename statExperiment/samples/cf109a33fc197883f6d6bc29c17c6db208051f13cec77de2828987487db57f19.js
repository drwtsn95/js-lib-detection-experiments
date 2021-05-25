$(document).ready(function () {

    $('.form-check-input').on('click', function () {
        submitSearch();
    });

    $(document).on('click', '.page-link', function () {
        var requiredPage = $(this).data('page');
        $('#current-page').val(requiredPage);
        submitSearch();
    });

    $(document).bind("ajaxSend", function () {
        $('#search-icon').removeClass('fa-search');
        $('#search-icon').addClass('fa-sync fa-spin');
    }).bind("ajaxComplete", function () {
        $('#search-icon').removeClass('fa-sync fa-spin');
        $('#search-icon').addClass('fa-search');
    });

    $('.course-search-box-header').on('click', function () {
        var item = $(this).children('span.fas');
        rotateChevron(item, 0.5, false);
    });

    //$('#collapse-button').on('click', function (e) {
    //    e.preventDefault();
    //    //e.stopPropagation();
    //    //if any boxes are shown, hide all
    //    //just hide the whole form
    //    //var collapses = $('.course-search-box .collapse');
    //    //var headers = $('.course-search-box-header').children('span.fas');
    //    //var shown = $('.course-search-box .collapse.show');
    //    //if (shown.length > 0) {
    //    //    rotateChevron(headers, 0.1, true, false);
    //    //    collapses.removeClass('show');
    //    //} else {
    //    //    rotateChevron(headers, 0.1, true, true);
    //    //    collapses.addClass('show');
    //    //}    

    //    //this is necessary because the events won't fire when we're just adding or removeing classes.
    //    setTimeout(function () { setButtonText(); }, 0.5);
        
    //});
    $('#courseSearchOptions').on('hidden.bs.collapse', function (e) {
        if (e.target.id === $(this).attr('id')) {
            setButtonText();
        }
    });

    $('#courseSearchOptions').on('shown.bs.collapse', function (e) {
        if (e.target.id === $(this).attr('id')) {
            setButtonText();
        }
    });

    //fires after a collapse is hidden
    //$('.course-search-box .collapse').on('hidden.bs.collapse', function () {
    //    setTimeout(function () { setButtonText(); }, 0.3);
    //});

    //fires after a collapse is shown
    //$('.course-search-box .collapse').on('shown.bs.collapse', function () {
    //    setTimeout(function () { setButtonText(); }, 0.3);
    //});

    //submit the search on the first load of the page.
    (function () {
        submitSearch();
    })();
});

function setButtonText() {
    var button = $('#collapse-button');
    var shown = $('#courseSearchOptions.collapse.show');

    //if any items are shown we are always going to collapse 
    if (button.text() === 'Show Filters') {
        button.text('Hide Filters');
    } else {
        button.text('Show Filters');
    }
}


function rotateChevron(item, timing, all, showing) {

    if (!timing || timing === undefined || timing === null) timing = 0.5;

    if (all && showing) {
        //showing all items - remove the rotated class and rotate to normal position.
        TweenLite.to(item, timing, { rotation: 0, ease: Linear.easeOut, transformOrigin: "25% 50%" });
        item.removeClass('rotated');
        return;
    }

    if (all && !showing) {
        //hiding all items - add the rotated class and rotate to -90
        TweenLite.to(item, timing, { rotation: -90, ease: Linear.easeOut, transformOrigin: "25% 50%" });
        item.addClass('rotated');
        return;
    }

    //if we're not doing everything then just use the default action:
    if (item.length > 0) {
        if (item.hasClass('rotated')) {
            TweenLite.to(item, timing, { rotation: 0, ease: Linear.easeOut, transformOrigin: "25% 50%" });
            item.removeClass('rotated');
        } else {
            TweenLite.to(item, timing, { rotation: -90, ease: Linear.easeOut, transformOrigin: "25% 50%" });
            item.addClass('rotated');
        }

    }
}

function submitSearch() {
    var model = $('#course-search-form').serialize();
    $.ajax({
        url: '/umbraco/Surface/CourseSearchResult/DoCourseSearch',
        type: 'POST',
        data: model,
        success: function (data) {
            $('#course-search-results').html(data);
        }
    });
}