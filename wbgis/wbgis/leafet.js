var map = L.map('map', {
    measureControl: true,
}).setView([9.0820, 8.6753], 8);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

// googlestreet
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 50,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// googleStreets.addTo(map)

// Hybrid
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// googleHybrid.addTo(map)

// sat
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// googleSat.addTo(map);

var urlParams;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();

// Marker
var singlemarker = L.marker([9.0820, 8.6753], { draggable: true });
var popup = singlemarker.bindPopup('This is Nigeria.' + singlemarker.getLatLng()).openPopup()
popup.addTo(map);

var secondmarker = L.marker([6.5236, 3.6006], { draggable: true });
var popup = secondmarker.bindPopup('This is Lagos.' + secondmarker.getLatLng()).openPopup()
popup.addTo(map);

var nepalDistrict = L.geoJSON(nepalGeoJsonData, {
    onEachFeature: function (feature, layer) {
        area = (turf.area(feature) / 1000000).toFixed(2);
        center_lat = turf.center(feature).geometry.coordinates[1]
        center_long = turf.center(feature).geometry.coordinates[0]
        bbox = turf.bbox(feature).toString();
        layer.bindPopup(`<b>Area: </b> ${area} </br> <b>Center(x,y): </b> (${center_long, center_lat}) </br> <b>Bbox: </b> [${bbox}]`)
    }
});
var nepalHq = L.geoJSON(hqData, {
    onEachFeature: function (feature, layer) {
        var buffered = turf.buffer(feature, 5, { units: 'kilometers' });
        L.geoJSON(buffered, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`This area is nearby HQ. (Buffer distance: 5)`)
            }
        }).addTo(map)
    }
})

// layer controls
if (urlParams.layercontrol == 'true') {
    var Basemaps = {
        "OSM": osm,
        "GOOGLESTREET": googleStreets,
        "GOOGLE HYBRID": googleHybrid,
        "GOOGLESAT": googleSat
    };
    var overlaymaps = {
        'Nepal District': nepalDistrict,
        'Nepal Headquater': nepalHq,
        "First Marker": singlemarker,
        "Second Marker": secondmarker
    };

    L.control.layers(Basemaps, overlaymaps, { collapsed: false }).addTo(map);

}
else if (urlParams.layercontrol == 'false') {
}

//Turf creating geometry (GeoJSON)
var point = turf.multiPoint([[84.1240, 28.3949], [83.1240, 29.3949]])
// L.geoJSON(point).addTo(map)

var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], { name: 'line 1' });
var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], { name: 'line 2' });
var linestring1Geojson = L.geoJSON(linestring1).addTo(map)

// var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
// var polygonGeojson = L.geoJSON(polygon).addTo(map)

var points = turf.randomPoint(10, { bbox: [80, 20, 90, 30] })

// var pointsGeojson = L.geoJSON(points).addTo(map)

var polygon = turf.randomPolygon(2, { bbox: [80, 20, 90, 30] })

// var polygonGeojson = L.geoJSON(polygon).addTo(map)

// map.fitBounds(point.getBounds())

//Buffer 


var polygon1 = turf.polygon([[
    [128, -26],
    [141, -26],
    [141, -21],
    [128, -21],
    [128, -26]
]], {
    "fill": "#F00",
    "fill-opacity": 0.1
});

// var polyGeojson = L.geoJSON(polygon1).addTo(map)

var polygon2 = turf.polygon([[
    [126, -28],
    [140, -28],
    [140, -20],
    [126, -20],
    [126, -28]
]], {
    "fill": "#00F",
    "fill-opacity": 0.1
});

var from = turf.point([-75.343, 39.984]);
var to = turf.point([-75.534, 39.123]);
var options = {units: 'kilometres'};

var distance = turf.distance(from, to, options);

//addToMap
var addToMap = [from, to];
from.properties.distance = distance;
to.properties.distance = distance;
console.log(distance)

var polyGeojson2 = L.geoJSON(addToMap).addTo(map)


// var difference = turf.difference(polygon1, polygon2);

// var diffGeojson = L.geoJSON(difference).addTo(map)

// map.fitBounds(diffGeojson.getBounds())

// console.log(difference)

var pt = turf.point([-7903683.846322424, 5012341.663847514]);
var converted = turf.toMercator(pt);
console.log(converted)

// remove layer
map.removeLayer(singlemarker);
map.removeLayer(secondmarker);
map.removeLayer(nepalDistrict);
map.removeLayer(nepalHq);

//fullscreenview
var mapid = document.getElementById('map')
function fullScreenview() {
    mapid.requestFullscreen();
}

//search control
if (urlParams.searchcontrol == 'true') {
    L.Control.geocoder().addTo(map);
}
else {

}
