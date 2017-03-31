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

$('#tonerMap').on('click', function () {
    changeBaseMap('tonerMap');
});

$('#globalPrecipitation').click(function () {
    hideMarker();
    if (this.checked) {
        map.addLayer(precipitation);
        precipitation.setZIndex(99);
    } else {
        if (precipitation != null) {
            map.removeLayer(precipitation);
        }
    }
});

$('#globalWind').click(function () {
    hideMarker();
    if (this.checked) {
        map.addLayer(wind);
        wind.setZIndex(99);
    } else {
        if (precipitation != null) {
            map.removeLayer(wind);
        }
    }
});

$('#globalPressure').click(function () {
    hideMarker();
    if (this.checked) {
        map.addLayer(pressure);
        pressure.setZIndex(99);
    } else {
        if (pressure != null) {
            map.removeLayer(pressure);
        }
    }
});

$('#globalTemperature').click(function () {
    hideMarker();
    if (this.checked) {
        map.addLayer(temperature);
        temperature.setZIndex(99);
    } else {
        if (precipitation != null) {
            map.removeLayer(temperature);
        }
    }
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

