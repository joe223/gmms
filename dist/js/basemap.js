/**
 * Created by Administrator on 2017/3/16 0016.
 */
$('#tiandiMap').on('click', function () {
    changeBaseMap('tiandiMap');
});

$('#darkMap').on('click', function () {
    changeBaseMap('darkBaseMap');
});

$('#googleMap').on('click', function () {
    changeBaseMap('googleMap');
});

$('#gaodeMap').on('click', function () {
    changeBaseMap('gaoDeMap');
});

$('#geoQMap').on('click', function () {
    changeBaseMap('geoQMap');
});

// 切换底图
function changeBaseMap(baseLayer) {
    map.eachLayer(function (layer) {
        if (layer.options.type === 'basemap') {
            map.removeLayer(layer);
        }
    })
    if (baseLayer === 'tiandiMap') {
        tiandiMap = L.layerGroup([tiandiVMap, tiandiLMap]);
        map.addLayer(tiandiMap);
    } else {
        map.addLayer(baseMap[baseLayer]);
    }

}

