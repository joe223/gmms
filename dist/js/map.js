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

function initMap() {
    var map = L.map('map', {
        zoomControl: false,
        miniZoom: 3,
        zoom: 8,
        center: [23.324, 113.434],
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
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });
    googleMap = L.tileLayer.chinaProvider('Google.Normal.Map', {
        maxZoom: 18,
        minZoom: 3,
        type: 'basemap',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });
    geoQMap = L.tileLayer.chinaProvider('Geoq.Normal.Map', {
        maxZoom: 18,
        minZoom: 3,
        type: 'basemap',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });

    darkBaseMap = L.tileLayer('http://120.55.74.101:8012/mapbox-studio-dark/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        type: 'basemap',
        maxZoom: 18,
        minZoom: 3,
    });

    tonerMap = L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        type: 'basemap',
        maxZoom: 18,
        minZoom: 3,
    })

    tiandiMap = L.layerGroup([tiandiVMap, tiandiLMap]);
    map.addLayer(tiandiMap);
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
