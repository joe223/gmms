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
}

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
            map.addLayer(teminatorLayer);
        }
    } else {
        if (teminatorLayer != null) {
            map.removeLayer(teminatorLayer);
        }
    }
});

$('#zafBusiness').click(function () {
    if (this.checked) {
        if (zafLayer == null) {
            zafLayer = L.geoJSON.ajax('dist/json/zaf2.geojson');
            zafLayer.on('data:loaded', function () {
                map.addLayer(zafLayer);
                map.fitBounds(zafLayer.getBounds());
            });
            zafLineLayer = L.geoJSON.ajax('dist/json/zaf2_line.geojson');
            zafLineLayer.on('data:loaded', function () {
                map.addLayer(zafLineLayer);
            })
            zafPointsLayer = L.geoJSON.ajax('dist/json/zaf2_points.geojson');
            zafPointsLayer.on('data:loaded', function () {
                map.addLayer(zafPointsLayer);
            })
        } else {
            map.addLayer(zafLayer);
            map.addLayer(zafLineLayer);
            map.addLayer(zafPointsLayer);
            map.fitBounds(zafLayer.getBounds());
        }
    } else {
        if (zafLayer != null) {
            map.removeLayer(zafLayer);
        }
        if (zafPointsLayer != null) {
            map.removeLayer(zafPointsLayer);
        }
        if (zafLineLayer != null) {
            map.removeLayer(zafLineLayer);
        }
    }
});

$('#thaBusiness').click(function () {
    if (this.checked) {
        if (thiLayer == null) {
            thiLayer = L.geoJSON.ajax('dist/json/tha.geojson');
            thiLayer.on('data:loaded', function () {
                map.addLayer(thiLayer);
                map.fitBounds(thiLayer.getBounds());
            });
            thiLineLayer = L.geoJSON.ajax('dist/json/tha_line.geojson');
            thiLineLayer.on('data:loaded', function () {
                map.addLayer(thiLineLayer);
            })
            thiPointLayer = L.geoJSON.ajax('dist/json/tha_points.geojson');
            thiPointLayer.on('data:loaded', function () {
                map.addLayer(thiPointLayer);
            })
        } else {
            map.addLayer(thiLayer);
            map.addLayer(thiPointLayer);
            map.addLayer(thiLineLayer);
            map.fitBounds(thiLayer.getBounds());
        }
    } else {
        if (thiLayer != null) {
            map.removeLayer(thiLayer);
        }
        if (thiPointLayer != null) {
            map.removeLayer(thiPointLayer);
        }
        if (thiLineLayer != null) {
            map.removeLayer(thiLineLayer);
        }
    }
});

$('#indBusiness').click(function () {
    if (this.checked) {
        if (indlayer == null) {
            indlayer = L.geoJSON.ajax('dist/json/ind2.geojson');
            indlayer.on('data:loaded', function () {
                map.addLayer(indlayer);
                map.fitBounds(indlayer.getBounds());
            });
            indLineLayer = L.geoJSON.ajax('dist/json/ind2_line.geojson');
            indLineLayer.on('data:loaded', function () {
                map.addLayer(indLineLayer);
            })
            indPointLayer = L.geoJSON.ajax('dist/json/ind2_point.geojson');
            indPointLayer.on('data:loaded', function () {
                map.addLayer(indPointLayer);
            })
        } else {
            map.addLayer(indlayer);
            map.addLayer(indPointLayer);
            map.addLayer(indLineLayer);
            map.fitBounds(indlayer.getBounds());
        }
    } else {
        if (indlayer != null) {
            map.removeLayer(indlayer);
        }
        if (indLineLayer != null) {
            map.removeLayer(indLineLayer);
        }
        if (indPointLayer != null) {
            map.removeLayer(indPointLayer);
        }
    }
});

$('#bolBusiness').click(function () {
    if (this.checked) {
        if (bolLayer == null) {
            bolLayer = L.geoJSON.ajax('dist/json/bol2.geojson');
            bolLayer.on('data:loaded', function () {
                map.addLayer(bolLayer);
                map.fitBounds(bolLayer.getBounds());
            });
            bolLineLayer = L.geoJSON.ajax('dist/json/bol2_line.geojson');
            bolLineLayer.on('data:loaded', function () {
                map.addLayer(bolLineLayer);
            })
            bolPointLayer = L.geoJSON.ajax('dist/json/bol2_points.geojson');
            bolPointLayer.on('data:loaded', function () {
                map.addLayer(bolPointLayer);
            })
        } else {
            map.addLayer(bolLayer);
            map.addLayer(bolLineLayer);
            map.addLayer(bolPointLayer);
            map.fitBounds(bolLayer.getBounds());
        }
    } else {
        if (bolLayer != null) {
            map.removeLayer(bolLayer);
        }
        if (indLineLayer != null) {
            map.removeLayer(bolLineLayer);
        }
        if (indPointLayer != null) {
            map.removeLayer(bolPointLayer);
        }
    }
});