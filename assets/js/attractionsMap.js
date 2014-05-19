var map,attractionSearch = [];


// all Points
attraction = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon:  L.icon({
                iconUrl: 'assets/img/attractions_cartodb/' + feature.properties.category + '.png',
                iconSize: [22, 25],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
            })
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup('<strong>'+ feature.properties.name + '</strong><br>'+ feature.properties.description + '<br><a href="' + feature.properties.weblink + '" target="_blank_">Link</a>', {
                closeButton: false
        });
    }
    attractionSearch.push({
            name: layer.feature.properties.name,
            source: "attraction",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});



//Load Individual layers
$.getJSON("http://frontier-spatial.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM tourism_assets_11_26_13 ORDER BY category, name", function(data) {     
    attraction.addData(data);
  });

map = L.map("map", {
    zoom: 8,
    center: [43.9504005, -74.283802 ],
    minZoom: 6,
    maxZoom: 17,
    layers: [attraction]

});
    mapquestOSM.addTo(map);
    map.attributionControl.setPrefix('Website by <a href="http://frontierspatial.com" target="_blank">Frontier Spatial | </a>Bootleaf template by <a href="http://bryanmcbride.com" target="_blank">Bryan McBride</a>');



    // Larger screens get expanded layer control
    if (document.body.clientWidth <= 767) {
        var isCollapsed = true;
    } else {
        var isCollapsed = false;
    };

    var baseLayers = {
        "Terrain": mapquestOSM,
        "Imagery": mapquestHYB,
        "Imagery, no labels": mapquestOAM
    };

    var overlays = {

        "<img src='assets/img/attractions_cartodb/historicSite.png' width='18' height='21'>Attractions": attraction/*,
        "<img src='assets/img/theater.png' width='18' height='21'>&nbsp;Theater": theater,
        "<img src='assets/img/greatCamp.png' width='18' height='21'>&nbsp;Great Camp": greatCamp,
        "<img src='assets/img/ecoCenter.png' width='18' height='21'>&nbsp;Eco Center": ecoCenter,
        "<img src='assets/img/artCenter.png' width='18' height='21'>&nbsp;Art Center": artCenter,
        "<img src='assets/img/historic.png' width='18' height='21'>&nbsp;Historic Site": historic,
        "<img src='assets/img/blueline.png' width='18' height='21'>&nbsp;Park Boundary": blueline,
        "<img src='assets/img/longlake/LongLakeBearLogo.jpg' width='18' height='21'>&nbsp;Long Lake Attractions": longlakeCluster */                
    };

    //geocoder
    var osmGeocoder = new L.Control.OSMGeocoder({
            collapsed: false,
            position: 'bottomright',
            text: 'Find Address!',
            });
    map.addControl(osmGeocoder);

    var layerControl = L.control.layers(baseLayers, overlays, {
        collapsed: isCollapsed
    }).addTo(map);

    /*L.control.locate().addTo(map);*/
    
/*            var sidebar = L.control.sidebar("sidebar", {
        closeButton: true,
        position: "left"
    }).addTo(map);
*/
    // Highlight search box text on click
    $("#searchbox").click(function () {
        $(this).select();
    });

    // Typeahead search functionality
 $(document).one("ajaxStop", function () {
        $("#loading").hide();

        var attractionBH = new Bloodhound({
            name: "attraction",
            datumTokenizer: function (d) {
                return Bloodhound.tokenizers.whitespace(d.name);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: attractionSearch,
            limit: 10
        });

        

        attractionBH.initialize();

        // instantiate the typeahead UI
        $("#searchbox").typeahead({
            minLength: 3,
            highlight: true,
            hint: false
        }, {
            name: "attraction",
            displayKey: "name",
            source: attractionBH.ttAdapter(),
            templates: {
                header: "<h4 class='typeahead-header'><img src='assets/img/place.png' width='18' height='21'>&nbsp;Attraction</h4>"
            }
        }).on("typeahead:selected", function (obj, datum) {
            if (datum.source === "attraction") {
                map.setView([datum.lat, datum.lng], 15);
            };
            
            if ($(".navbar-collapse").height() > 50) {
                $(".navbar-collapse").collapse("hide");
            };
        }).on("typeahead:opened", function () {
            $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
            $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
        }).on("typeahead:closed", function () {
            $(".navbar-collapse.in").css("max-height", "");
            $(".navbar-collapse.in").css("height", "");
        });
        $(".twitter-typeahead").css("position", "static");
        $(".twitter-typeahead").css("display", "block");
    });

