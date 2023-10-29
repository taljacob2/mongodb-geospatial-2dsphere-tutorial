(function ($) {
    "use strict";
    console.clear();

    pageLoader();
    function pageLoader() {
        if ($('.import-json-restaurants-page').length) {

            $.get(`${HOST}/api/restaurant`)
            .done(function(data, textStatus, jqXHR) {
                console.log(data);
            })

        }
    }

}(jQuery));