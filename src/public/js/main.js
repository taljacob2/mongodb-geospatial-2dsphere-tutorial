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
     * Loop through the restaurants array and place a marker for each set of
     * coordinates.
     * 
     * @param {*} restaurants Restaurants to present in map.
     */
    const setRestaurantsMarkersInMap = (restaurants) => {
        for (let i = 0; i < restaurants.length; i++) {
            const coords = restaurants[i].location.coordinates;
            const latLng = new google.maps.LatLng(coords[1], coords[0]);

            new google.maps.Marker({
                position: latLng,
                map: map,
            });
        }
    };

    /**
     * Loop through the neighborhoods array and place a marker for each set of
     * coordinates.
     * 
     * @param {*} neighborhoods Neighborhoods to present in map.
     */
    const setNeighborhoodsMarkersInMap = (neighborhoods) => {
        for (let i = 0; i < neighborhoods.length; i++) {
            console.log(JSON.stringify(neighborhoods[i], null, 2));
            const coords = neighborhoods[i].geometry.coordinates[0][0];
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
                    setRestaurantsMarkersInMap(data);
                })
        } else if ($('.import-json-neighborhoods-page').length) {
            $.get(`${HOST}/api/neighborhood`)
                .done((data, textStatus, jqXHR) => {
                    initMap();
                    setNeighborhoodsMarkersInMap(data);
                })
        } 
    }
    pageLoader();

}(jQuery));