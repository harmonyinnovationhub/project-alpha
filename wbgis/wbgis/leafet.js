var map = L.map('map', {
    measureControl: true,
}).setView([9.0820, 8.6753], 8);
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

//watercolour
var Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});
// Watercolor.addTo(map)

// delorme
var DeLorme = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
    minZoom: 1,
    maxZoom: 11
});
// DeLorme.addTo(map)

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

// Marker
var singlemarker = L.marker([9.0820, 8.6753], { draggable: true });
var popup = singlemarker.bindPopup('This is Nigeria.' + singlemarker.getLatLng()).openPopup()
popup.addTo(map);

var secondmarker = L.marker([6.5236, 3.6006], { draggable: true });
var popup = secondmarker.bindPopup('This is Lagos.' + secondmarker.getLatLng()).openPopup()
popup.addTo(map);

// layer controls
var Basemaps = {
    "OSM": osm,
    "DELORME": DeLorme,
    "WATERCOLOUR": Watercolor,
    "GOOGLESTREET": googleStreets,
    "GOOGLE HYBRID": googleHybrid,
    "GOOGLESAT": googleSat
};
var overlaymaps = {
    "First Marker": singlemarker,
    "Second Marker": secondmarker
};

L.control.layers(Basemaps, overlaymaps, { collapsed: true }).addTo(map);

// remove layer
map.removeLayer(osm);
map.removeLayer(singlemarker);
map.removeLayer(secondmarker);

//fullscreenview
var mapid = document.getElementById('map')
function fullScreenview() {
    mapid.requestFullscreen();
}

//search control
L.Control.geocoder().addTo(map);