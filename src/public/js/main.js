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
    const initMap = (zoom = 16, center = new google.maps.LatLng(2.8, -187.3),
        mapTypeId = google.maps.MapTypeId.TERRAIN) => {
        const mapOptions = { zoom, center, mapTypeId }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    /**
     * Marks any geoJson type in Google Map.
     * 
     * @param {*} geoJson geoJson with any 'type'.
     */
    const setGeoJsonInMap = (geoJson) => {
        map.data.addGeoJson({
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": geoJson
            }]
        });
    }

    /**
     * Set all the restaurants as Google Map markers.
     * 
     * @param {*} restaurants Restaurants to present in map.
     * @returns {google.maps.LatLng} center LatLng.
     */
    const setRestaurantsMarkersInMap = (restaurants) => {
        let latLngToReturn = null;

        for (let i = 0; i < restaurants.length; i++) {
            setGeoJsonInMap(restaurants[i].location);
            if (i == 0) {
                latLngToReturn = new google.maps.LatLng(
                    restaurants[i].location.coordinates[1],
                    restaurants[i].location.coordinates[0]
                );
            }
        }

        return latLngToReturn;
    };

    /**
     * Set all the neighborhoods as Google Map markers.
     * 
     * @param {*} neighborhoods Neighborhoods to present in map.
     * @returns {google.maps.LatLng} center LatLng.
     */
    const setNeighborhoodsMarkersInMap = (neighborhoods) => {
        let latLngToReturn = null;

        for (let i = 0; i < neighborhoods.length; i++) {
            setGeoJsonInMap(neighborhoods[i].geometry);
            if (i == 0) {
                latLngToReturn = new google.maps.LatLng(
                    neighborhoods[i].geometry.coordinates[0][0][1],
                    neighborhoods[i].geometry.coordinates[0][0][0]
                );
            }
        }

        map.data.setStyle({
            strokeColor: "blue",
        })

        return latLngToReturn;
    };

    const pageLoader = () => {
        if ($('.import-json-restaurants-page').length) {
            $.get(`${HOST}/api/restaurant`)
                .done((data, textStatus, jqXHR) => {
                    initMap();
                    map.center = setRestaurantsMarkersInMap(data);
                })
        } else if ($('.import-json-neighborhoods-page').length) {
            $.get(`${HOST}/api/neighborhood`)
                .done((data, textStatus, jqXHR) => {
                    initMap();
                    map.center = setNeighborhoodsMarkersInMap(data);
                })
        }
    }
    pageLoader();

}(jQuery));