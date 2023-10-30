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
     * Places a point marker on a Google Map, where each geoJson type is a
     * `Point`.
     * 
     * @param {*} geoJson geoJson that its 'type' is 'Point'.
     * @returns {google.maps.LatLng}
     */
    const setPointMarkersInMap = (geoJson) => {
        if (geoJson.type != 'Point') { return null; }

        const coords = geoJson.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);

        new google.maps.Marker({
            position: latLng,
            map: map,
        });

        return latLng;
    }

    /**
     * Set all the restaurants as Google Map markers.
     * 
     * @param {*} restaurants Restaurants to present in map.
     * @see https://developers.google.com/maps/documentation/javascript/importing_data
     */
    const setRestaurantsMarkersInMap = (restaurants) => {
        let returnedLatLng;

        for (let i = 0; i < restaurants.length; i++) {
            returnedLatLng = setPointMarkersInMap(restaurants[i].location);
        }

        return returnedLatLng;
    };

    /**
     * Places a polygon marker on a Google Map, where each geoJson type is a
     * `Polygon`.
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

        return outerCoords[0];
    }

    /**
     * Places a polygon marker on a Google Map, where each geoJson type is
     * 'MultiPolygon', i.e. `Polygon` with holes.
     * 
     * @param {*} geoJson geoJson that its 'type' is 'MultiPolygon'.
     * @returns {google.maps.LatLng}
     * @see https://developers.google.com/maps/documentation/javascript/examples/polygon-hole
     */
    const setMultiPolygonMarkersInMap = (geoJson) => {
        if (geoJson.type != 'MultiPolygon') { return null; }
        if (!geoJson.coordinates) { return null; }

        
        let outerCoords = []
        const outerCoordsRaw = geoJson.coordinates[0][0];
        for (let i = 0; i < outerCoordsRaw.length; i++) {
            const latLng = new google.maps.LatLng(outerCoordsRaw[i][1], outerCoordsRaw[i][0]);
            outerCoords[i] = latLng;
        }

        let innerCoords = []
        const innerCoordsRaw = geoJson.coordinates[1][0];
        for (let i = 0; i < innerCoordsRaw.length; i++) {
            const latLng = new google.maps.LatLng(innerCoordsRaw[i][1], innerCoordsRaw[i][0]);
            outerCoords[i] = latLng;
        }

        const polygon = new google.maps.Polygon({
            paths: [outerCoords, innerCoords],
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });
        polygon.setMap(map);
        
        return outerCoords[0];
    }

    /**
     * Set all the neighborhoods as Google Map markers.
     * 
     * @param {*} neighborhoods Neighborhoods to present in map.
     */
    const setNeighborhoodsMarkersInMap = (neighborhoods) => {
        let returnedLatLng;

        for (let i = 0; i < neighborhoods.length; i++) {
            const neighborhoodGeoJson = neighborhoods[i].geometry;

            returnedLatLng = setPolygonMarkersInMap(neighborhoodGeoJson) || returnedLatLng;
            returnedLatLng = setMultiPolygonMarkersInMap(neighborhoodGeoJson) || returnedLatLng;           
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