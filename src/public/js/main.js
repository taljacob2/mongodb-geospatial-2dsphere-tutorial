(function ($) {
    "use strict";
    console.clear();

    /**
     * Stores to google map.
     * 
     * It is required for `initMap` to work properly.
     * 
     * @see initMap
     */
    let map;

    /**
     * Initializes Google Map.
     */
    const initMap = () => {
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 2,
            center: new google.maps.LatLng(2.8, -187.3),
            mapTypeId: "terrain",
        });
    }

    /**
     * Loop through the results array and place a marker for each set of
     * coordinates.
     * 
     * @param {*} documents documents to present in map.
     */
    const setMarkersInMap = (documents) => {
        for (let i = 0; i < documents.length; i++) {
            const coords = documents[i].location.coordinates;
            const latLng = new google.maps.LatLng(coords[1], coords[0]);

            new google.maps.Marker({
                position: latLng,
                map: map,
            });
        }
    };

    const pageLoader = () => {
        if ($('.import-json-restaurants-page').length) {
            $.get(`${HOST}/api/restaurant`)
                .done((data, textStatus, jqXHR) => {
                    initMap();
                    setMarkersInMap(data);
                })
        }
    }
    pageLoader();

}(jQuery));