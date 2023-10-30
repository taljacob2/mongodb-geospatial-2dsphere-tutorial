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
    * 
    * @param {*} mapOptions 
    */
    const initMap = ({
        zoom = 2,
        center = new google.maps.LatLng(2.8, -187.3),
        mapTypeId = "terrain"
    }) => {
        const mapOptions = { zoom, center, mapTypeId }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }

    /**
     * Loop through the restaurants array and place a marker for each set of
     * coordinates, where each document is a `Point`.
     * 
     * @param {*} restaurants Restaurants to present in map.
     * @see https://developers.google.com/maps/documentation/javascript/importing_data
     */
    const setRestaurantsMarkersInMap = (restaurants) => {
        let returnedLatLng;

        for (let i = 0; i < restaurants.length; i++) {
            const coords = restaurants[i].location.coordinates;
            const latLng = new google.maps.LatLng(coords[1], coords[0]);

            new google.maps.Marker({
                position: latLng,
                map: map,
            });

            returnedLatLng = latLng;
        }

        return returnedLatLng;
    };

    /**
     * Places a polygon marker on a Google Map.
     * 
     * @param {*} geoJson geoJson that its 'type' is 'Polygon'.
     * @returns {google.maps.LatLng}
     */
    const setPolygonMarkersInMap = (geoJson) => {
        if (geoJson.type != 'Polygon') { return null; }
        
        let outerCoords = []
        const outerCoordsRaw = geoJson.coordinates[0];
        for (let i = 0; i < outerCoordsRaw.length; i++) {
            const latLng = new google.maps.LatLng(outerCoordsRaw[i][1], outerCoordsRaw[i][0]);
            outerCoords[i] = latLng;
        }

        const polygon = new google.maps.Polygon({
            paths: outerCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });

        polygon.setMap(map);

        // TODO: debug
        console.log(outerCoords);

        return outerCoords[0];
    }

    /**
     * Loop through the neighborhoods array and place a marker for each set of
     * coordinates, where each document is a `Polygon` with holes.
     * 
     * @param {*} neighborhoods Neighborhoods to present in map.
     * @see https://developers.google.com/maps/documentation/javascript/examples/polygon-hole
     */
    const setNeighborhoodsMarkersInMap = (neighborhoods) => {
        let returnedLatLng;

        for (let i = 0; i < neighborhoods.length; i++) {
            const neighborhoodGeoJson = neighborhoods[i].geometry;
            let outerCoords = []
            let innerCoords = []

            returnedLatLng = setPolygonMarkersInMap(neighborhoodGeoJson) || returnedLatLng;
            // const outerCoordsRaw = neighborhoods[i].geometry.coordinates[0];
            // for (let i = 0; i < outerCoordsRaw.length; i++) {
            //     const latLng = new google.maps.LatLng(outerCoordsRaw[i][1], outerCoordsRaw[i][0]);
            //     outerCoords[i] = latLng;
            // }
            
            // // if (neighborhoods[i].geometry.coordinates.length >= 2) {
            // //     const innerCoordsRaw = neighborhoods[i].geometry.coordinates[1];
            // //     for (let i = 0; i < innerCoordsRaw.length; i++) {
            // //         const latLng = new google.maps.LatLng(innerCoordsRaw[i][1], innerCoordsRaw[i][0]);
            // //         innerCoords[i] = latLng;
            // //     }
            // // }

            // const polygon = new google.maps.Polygon({
            //     paths: [outerCoords, innerCoords],
            //     strokeColor: "#FF0000",
            //     strokeOpacity: 0.8,
            //     strokeWeight: 2,
            //     fillColor: "#FF0000",
            //     fillOpacity: 0.35,
            // });

            // returnedLatLng = outerCoords;
    
            // polygon.setMap(map);
        }

        return returnedLatLng;
    };

    const pageLoader = () => {
        if ($('.import-json-restaurants-page').length) {
            $.get(`${HOST}/api/restaurant`)
                .done((data, textStatus, jqXHR) => {
                    initMap({
                        zoom: 18,
                        center: setRestaurantsMarkersInMap(data)
                    });
                    setRestaurantsMarkersInMap(data);
                })
        } else if ($('.import-json-neighborhoods-page').length) {
            $.get(`${HOST}/api/neighborhood`)
                .done((data, textStatus, jqXHR) => {
                    initMap({
                        zoom: 12,
                        center: setNeighborhoodsMarkersInMap(data)
                    });
                    setNeighborhoodsMarkersInMap(data);
                })
        }
    }
    pageLoader();

}(jQuery));