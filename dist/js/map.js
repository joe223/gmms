/**
 * Created by Administrator on 2017/3/13 0013.
 */
function initMap() {
    var map = L.map('map', {zoomControl: false}).setView([32.324, 103.434], 5);
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    tileMap = L.tileLayer("http://t0.tianditu.cn/vec_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}");

    labelMap = L.tileLayer("http://t0.tianditu.com/cva_w/wmts?" +
        "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
        "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
        attribution: '&copy; <a href="http://www.tianditu.com/">天地图</a> contributors'
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

