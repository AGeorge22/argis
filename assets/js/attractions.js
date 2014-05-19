// all Points
attractions = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon:  L.icon({
                iconUrl: 'img/historic.png',
                iconSize: [0, 0],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
            })
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup(feature.properties.name, {
                closeButton: false
            });
        }
    }
});

//historic
var historic = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: historicIcon,
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {
      	if (feature.properties) {
            layer.bindPopup(feature.properties.name, {
                closeButton: false
            });
      	}
        historicSearch.push({
            name: layer.feature.properties.name,
            source: "historic",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});

//theaters
var theater = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: theaterIcon,
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup('<strong>'+ feature.properties.name + '</strong><br>'+ feature.properties.description + '<br><a href="' + feature.properties.weblink + '" target="_blank_">Link</a>', {
                closeButton: false
            });
        }
        theaterSearch.push({
            name: layer.feature.properties.name,           
            source: "theater",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});





var artCenter = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: artCenterIcon,
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup('<strong>'+ feature.properties.name + '</strong><br>'+ feature.properties.description + '<br><a href="' + feature.properties.weblink + '" target="_blank_">Link</a>', {
                closeButton: false
            });
        }
        artCenterSearch.push({
            name: layer.feature.properties.name,            
            source: "artCenter",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});



var ecoCenter = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: ecoCenterIcon,
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup('<strong>'+ feature.properties.name + '</strong><br>'+ feature.properties.description + '<br><a href="' + feature.properties.weblink + '" target="_blank_">Link</a>', {
                closeButton: false
            });
        }
        ecoCenterSearch.push({
            name: layer.feature.properties.name,            
            source: "ecoCenter",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});



//greatCamp
var greatCamp = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: greatCampIcon,
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup('<strong>'+ feature.properties.name + '</strong><br>'+ feature.properties.description + '<br><a href="' + feature.properties.weblink + '" target="_blank_">Link</a>', {
                closeButton: false
            });
        }
        greatCampSearch.push({
            name: layer.feature.properties.name,            
            source: "greatCamp",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});

/**/

//museum
var museum = new L.GeoJSON(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: museumIcon,
            title: feature.properties.name
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup('<strong>'+ feature.properties.name + '</strong><br>'+ feature.properties.description + '<br><a href="' + feature.properties.weblink + '" target="_blank_">Link</a>',  {
                    closeButton: false
                });
        }
        museumSearch.push({
            name: layer.feature.properties.name,            
            source: "museum",
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});


//////////////////////
////GOOGLE CALENDAR///
//////////////////////



//Load Individual layers
$.getJSON("http://frontier-spatial.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM tourism_assets_11_26_13 WHERE category in ('eco center','theater','art center','great camp','historic site','museum') ORDER BY category, name", function(data) {     
    attractions.addData(data);
/*      for (each in attractions._layers) {
            attractionsSearch.push({
                id: attractions._layers[each]._leaflet_id, 
                name: attractions._layers[each].feature.properties.name,
                lat: attractions._layers[each].feature.geometry.coordinates[1], 
                lng: attractions._layers[each].feature.geometry.coordinates[0]});
      }*/
      $.each(data.features, function(index, value) {
      if (value.properties.category === "museum") {
          museum.addData(value);
      };
      if (value.properties.category === "theater") {
          theater.addData(value);
      };
      if (value.properties.category === "art center") {
          artCenter.addData(value);
      };
      if (value.properties.category === "historic") {
          historic.addData(value);
      };
      if (value.properties.category === "eco center") {
          ecoCenter.addData(value);
      };
      if (value.properties.category === "historic site") {
          historic.addData(value);
      };
      if (value.properties.category === "great camp") {
          greatCamp.addData(value);
      };
  });
})