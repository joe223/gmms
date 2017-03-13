/**
 * Created by Administrator on 2017/3/13 0013.
 */
function initMap() {
    var map = L.map('map', {zoomControl: false}).setView([32.324, 103.434], 5);
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    var tileMap = L.tileLayer("http://t0.tianditu.cn/vec_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}");

    var labelMap = L.tileLayer("http://t0.tianditu.com/cva_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    var cities = L.layerGroup([tileMap, labelMap]);
    map.addLayer(cities);

    // L.tileLayer('http://120.55.74.101:8012/mapbox-studio-outdoors/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    new L.Control.GlobeMiniMap({
        topojsonSrc: 'dist/json/world.json'
    }).addTo(map);

    var sidebar = L.control.sidebar('sidebar').addTo(map);


    return map;
};

function addGeoJSON(url, map) {
    $.getJSON(url, function (data) {
        L.geoJSON(data).addTo(map);
    });
}

function addPoints(map) {
    var earthquakeFeedPointsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';
    $.getJSON(earthquakeFeedPointsURL, function (data) {
        L.geoJSON(data).addTo(map);
    });
};

function addLineStrings(map) {
    for (var i = 0, latlngs = [], len = route.length; i < len; i++) {
        latlngs.push(new L.LatLng(route[i][0], route[i][1]));
    }
    var path = L.polyline(latlngs);

    map.addLayer(L.marker(latlngs[0]));
    map.addLayer(L.marker(latlngs[len - 1]));

    map.addLayer(path);
    path.bindPopup("Hello world");

    path.on('snake start snake snakeend', function (ev) {
        console.log(ev.type);
    });

    map.fitBounds(L.latLngBounds(latlngs));
    path.snakeIn();
}


function addPolygons(map) {

}
