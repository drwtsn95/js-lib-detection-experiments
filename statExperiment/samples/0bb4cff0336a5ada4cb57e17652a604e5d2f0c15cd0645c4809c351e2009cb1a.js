var newVars = options.newVars;

var reloadStyle = function () {
    $('body > .container').addClass("active");
    $.when($.get("/css/Template/" + options.templateName + "-RTL.less?v=" + new Date().getMilliseconds()))
        .done(function (lessCode) {
            $('#dynamic-style').remove();
            less.render(lessCode, {
                "modifyVars": newVars
            }, function (err, output) {
                if (err) return console.error(err);
                $('<style id="dynamic-style" />').text(output.css).appendTo($('body'));
            });
            $('body > .container').removeClass("active");
        });
    $('li.save-button').addClass('active');
}

$(function () {
    reloadStyle();
})