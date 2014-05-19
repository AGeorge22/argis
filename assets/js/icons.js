// Making the icons
var PointIcon = L.Icon.extend({
    options: {
        iconSize: [22, 25],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup(feature.properties.name, {
                autoPanPadding: new L.Point(5, $('.navbar').height()+5)
            });
        }
    }
});

var leantoIcon = new PointIcon({iconUrl: 'assets/img/leanto.png'});
var campsiteIcon = new PointIcon({iconUrl: 'assets/img/campsite.png'});
var trailRegisterIcon = new PointIcon({iconUrl: 'assets/img/trailhead.png'});
var allPointsIcon = new PointIcon({iconUrl: 'assets/img/historic.png'});

var boatLaunchIcon = new PointIcon({iconUrl: 'assets/img/boatLaunch.png'});
var campgroundIcon = new PointIcon({iconUrl: 'assets/img/campground.png'});


var commentIcon = new PointIcon({iconUrl: 'assets/img/comment-map-icon.png'});
var confectionIcon = new PointIcon({iconUrl: 'assets/img/confection.png'});
var museumIcon = new PointIcon({iconUrl: 'assets/img/museum.png'});
var historicIcon = new PointIcon({iconUrl: 'assets/img/historic.png'});
var farmIcon = new PointIcon({iconUrl: 'assets/img/farm.png'});
var boozeIcon = new PointIcon({iconUrl: 'assets/img/booze.png'});
var furnitureIcon = new PointIcon({iconUrl: 'assets/img/furniture.png'});
var boatingIcon = new PointIcon({iconUrl: 'assets/img/boating.png'});
var theaterIcon = new PointIcon({iconUrl: 'assets/img/theater.png'});
var trailHeadIcon = new PointIcon({iconUrl: 'assets/img/trailhead.png'});
var golfIcon = new PointIcon({iconUrl: 'assets/img/golf.png'})
var ecoCenterIcon = new PointIcon({iconUrl: 'assets/img/ecoCenter.png'})
var artCenterIcon = new PointIcon({iconUrl: 'assets/img/artCenter.png'})
var greatCampIcon = new PointIcon({iconUrl: 'assets/img/greatCamp.png'})
var parkingIcon = new PointIcon({iconUrl: 'assets/img/parking.png'})

