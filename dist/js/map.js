/**
 * Created by Administrator on 2017/3/13 0013.
 */
var tiandiMap = null;
var darkBaseMap = null;
var gaoDeMap = null;
var googleMap = null;
var geoQMap = null;
var tiandiVMap = null;
var tiandiLMap = null;
var tonerMap = null;
var baseMap = null;
var precipitation = null;
var wind = null;
var pressure = null;
var temperature = null;

function initMap() {
    var map = L.map('map', {
        zoomControl: false,
        // miniZoom: 3,
        zoom: 4,
        center: [27.324, 113.434],
    })

    // 全屏地图控件
    L.control.fullscreen({
        position: 'topright',
    }).addTo(map);

    // 缩放地图控件
    L.control.zoom({
        position: 'topright'
    }).addTo(map);


    globalMiniMap = new L.Control.GlobeMiniMap({
        topojsonSrc: 'dist/json/world.json'
    });
    map.addControl(globalMiniMap);


    sidebar = L.control.sidebar('sidebar').addTo(map);

    // 底图

    tiandiVMap = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.tianditu.com/">天地图</a> contributors',
        type: 'basemap',
    })
    tiandiLMap = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
        maxZoom: 18,
        minZoom: 3,
        type: 'basemap',
    });

    gaoDeMap = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
        maxZoom: 18,
        minZoom: 3,
        type: 'basemap',
        attribution: '&copy; <a href="http://osm.org/copyright">高德地图/a> contributors',
    });
    googleMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
        maxZoom: 18,
        minZoom: 3,
        type: 'basemap',
        attribution: '&copy; <a href="http://osm.org/copyright">谷歌地图</a> contributors',
    });
    geoQMap = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
        maxZoom: 18,
        minZoom: 3,
        type: 'basemap',
        attribution: '&copy; <a href="http://osm.org/copyright">GeoQ地图</a> contributors',
    });

    darkBaseMap = L.tileLayer('http://120.55.74.101:8012/mapbox-studio-dark/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        type: 'basemap',
        maxZoom: 18,
        minZoom: 3,
    });

    tonerMap = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        type: 'basemap',
        maxZoom: 18,
        minZoom: 3,
    })


    temperature = L.tileLayer('http://{s}.maps.owm.io:8099/5735d67f5836286b007625cd/{z}/{x}/{y}?hash=c0468a6816b9afd0c048cf6ca39f0620', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenWeatherMap</a> contributors',
        type: 'heatmap',
        maxZoom: 18,
        minZoom: 3,
        opacity: 0.5
    });

    precipitation = L.tileLayer('http://{s}.maps.owm.io:8099/57456d1237fb4e01009cbb17/{z}/{x}/{y}?hash=c0468a6816b9afd0c048cf6ca39f0620', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenWeatherMap</a> contributors',
        type: 'heatmap',
        maxZoom: 18,
        minZoom: 3,
        opacity: 0.5
    });

    wind = L.tileLayer('http://{s}.maps.owm.io:8099/5735d67f5836286b0076267b/{z}/{x}/{y}?hash=c0468a6816b9afd0c048cf6ca39f0620', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenWeatherMap</a> contributors',
        type: 'heatmap',
        maxZoom: 18,
        minZoom: 3,
        opacity: 0.5
    });

    pressure = L.tileLayer('http://{s}.maps.owm.io:8099/5837ee50f77ebe01008ef68d/{z}/{x}/{y}?hash=c0468a6816b9afd0c048cf6ca39f0620', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenWeatherMap</a> contributors',
        type: 'heatmap',
        maxZoom: 18,
        minZoom: 3,
        opacity: 0.5
    });

    tiandiMap = L.layerGroup([tiandiVMap, tiandiLMap]);
    map.addLayer(geoQMap);
    temperature.setZIndex(99);

    // map.addLayer(tiandiMap);
    baseMap = {
        'tiandiMap': tiandiMap,
        'darkBaseMap': darkBaseMap,
        'gaoDeMap': gaoDeMap,
        'googleMap': googleMap,
        'geoQMap': geoQMap,
        'tonerMap': tonerMap
    };
    return map;
};
