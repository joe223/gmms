/**
 * Created by Administrator on 2017/3/14 0014.
 */

$('#flightCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addFlightPoints();
    } else {
        map.removeLayer(flightLayer);
    }
});

$('#earthquakeCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addEarthquakePoints();
    } else {
        if (earthquakeLayer != null) {
            map.removeLayer(earthquakeLayer);
        }
    }
});

function hideMarker() {
    if (marker != null) {
        map.removeLayer(marker);
    }
};

$('#heatmapCheckbox').click(function () {
    if (this.checked) {
        if (heatmap != null) {
            map.addLayer(heatmap);
            map.fitBounds(heatmapPointsLayer.getBounds());
        }
    } else {
        if (heatmap != null) {
            map.removeLayer(heatmap);
        }
    }
})

$('#tracksCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addLineStrings();
    } else {
        if (lineLayer != null) {
            map.removeLayer(lineLayer);
        }
        if (bufferLayer != null) {
            map.removeLayer(bufferLayer);
        }
        if (lineMarkerLayer != null) {
            map.removeLayer(lineMarkerLayer);
        }
    }
});

$('#regionCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addPolygonLayer();
    } else {
        if (polygonLayer != null) {
            map.removeLayer(polygonLayer);
        }
    }
});

$('#dijiCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addDijiLayer();
    } else {
        if (dijiLayer != null) {
            map.removeLayer(dijiLayer);
        }
    }
});


$('#jiantong').click(function () {
    if (this.checked) {
        map.addLayer(sub_com);
        map.fitBounds(sub_com.getBounds());
    } else {
        if (sub_com != null) {
            map.removeLayer(sub_com);
        }
        if (marker != null) {
            map.removeLayer(marker);
        }
    }
});

$('#timeZone').click(function () {
    if (this.checked) {
        if (teminatorLayer != null) {
            map.setView([20.233, 103.323], 3);
            map.addLayer(teminatorLayer);
        }
    } else {
        if (teminatorLayer != null) {
            map.removeLayer(teminatorLayer);
        }
    }
});


function layerSwitcher(name, checked, layer, pointLayer, lineLayer, data) {
    if (checked) {
        if (layer == null) {
            layer = L.geoJSON.ajax(data[0], {
                'type': name,
                style: function () {
                    var color = colors_hex[Math.floor(Math.random() * colors_hex.length)];
                    return {
                        "color": color,
                        "weight": 5,
                        "opacity": 0.9
                    };
                }
            });
            layer.on('data:loaded', function () {
                layer.on('click', function () {
                    //TODO 添加点击要素后面板展示内容
                });
                map.addLayer(layer);
                map.fitBounds(layer.getBounds());
            });
            var color = colors_hex[Math.floor(Math.random() * colors_hex.length)];
            lineLayer = L.geoJSON.ajax(data[1], {
                'type': name, style: {
                    "color": color,
                    "weight": 2,
                    "opacity": 1,
                    "width": 3
                }
            });
            lineLayer.on('data:loaded', function () {
                map.addLayer(lineLayer);
            });

            pointLayer = L.geoJSON.ajax(data[2], {
                'type': name,
                pointToLayer: function (feature, latlng) {
                    var jiantong = L.icon({
                        iconUrl: 'dist/css/images/favicon1.png',
                        iconSize: [35, 28]
                    });
                    return L.marker(latlng, {icon: jiantong});
                }
            });
            pointLayer.on('data:loaded', function () {
                map.addLayer(pointLayer);
                pointLayer.on('click', function () {
                    //TODO 添加点击要素后面板展示内容
                });
            });
        } else {
            map.addLayer(layer);
            map.addLayer(pointLayer);
            map.addLayer(lineLayer);
            map.fitBounds(layer.getBounds());
        }
    } else {
        map.eachLayer(function (layer) {
            if (layer.options.hasOwnProperty('type')) {
                if (layer.options.type == name) {
                    map.removeLayer(layer);
                }
            }
        })
    }
}


$('#zafBusiness').click(function () {
    layerSwitcher('zaf', this.checked, zafLayer, zafPointsLayer, zafLayer, ['dist/json/zaf2.geojson',
        'dist/json/zaf2_line.geojson', 'dist/json/zaf2_points.geojson']);
});

$('#thaBusiness').click(function () {
    layerSwitcher('tha', this.checked, thiLayer, thiPointLayer, thiLineLayer, ['dist/json/tha.geojson',
        'dist/json/tha_line.geojson', 'dist/json/tha_points.geojson']);
});

$('#indBusiness').click(function () {
    layerSwitcher('ind', this.checked, indlayer, indPointLayer, indLineLayer, ['dist/json/ind2.geojson',
        'dist/json/ind2_line.geojson', 'dist/json/ind2_point.geojson']);
});

$('#bolBusiness').click(function () {
    layerSwitcher('bol', this.checked, bolLayer, bolPointLayer, bolLineLayer, ['dist/json/bol2.geojson',
        'dist/json/bol2_line.geojson', 'dist/json/bol2_points.geojson']);
});