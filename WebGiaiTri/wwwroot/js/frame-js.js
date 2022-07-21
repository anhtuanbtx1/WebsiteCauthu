jQuery(document).ready(function () {
    if (window.location.search.indexOf("?iframe=ots") !== -1) {
        jQuery(document.body).append('<div id="loading" style="width:100%;height:100%;background: white;position:fixed;top:0;left:0">Loading...</div>');
        jQuery(".navbar-default.navbar-static-side").hide();
        jQuery("#page-wrapper").css({ "margin": "0px", "padding": "0px","margin-top":"-5px" });
        jQuery(".wrapper.wrapper-content.animated.fadeInRight").css("padding", "0px");
        jQuery(".navbar.navbar-static-top").parent().hide();
        jQuery(".ibox-tools").remove();
        jQuery(".btn.btn-primary").remove();
        jQuery("#loading").hide();
    }
});