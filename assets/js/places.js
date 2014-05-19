// places
places = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon:  L.icon({
                iconUrl: 'img/adkwebmap/place.png',
                iconSize: [0, 0],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
            })
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup(feature.properties.NAME, {
               closeButton: false
            });
        }
        placeSearch.push({
            name: layer.feature.properties.NAME,
            source: "place",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});

$.getJSON("data/json/places.geojson", function (data) {
    places.addData(data);
});