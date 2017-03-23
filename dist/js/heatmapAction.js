/**
 * Created by Administrator on 2017/3/14 0014.
 */
$('#hideHeatMapButton').on('click', function () {
    if (heatmap != null) {
        map.removeLayer(heatmap);
    }
});

$('#createHeatMapButton').on('click', function () {
    if (heatmap != null) {
        map.addLayer(heatmap);
    }
});

$('#createISOpButton').on('click', function () {
    showISOMap();
});

$('#hideISOButton').on('click', function () {
    if (isoLayer != null) {
        map.removeLayer(isoLayer);
    }
});

$('#analyze').on('click', function () {
    var options = {
        position: 'topright',
        draw: {
            polyline: false,
            polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                drawError: {
                    color: '#FF0000', // Color the shape will turn when intersects
                    message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                },
                shapeOptions: {
                    color: '#FF0000'
                }
            },
            circle: {
                shapeOptions: {
                    color: '#FF0000'
                }
            },
            rectangle: {
                shapeOptions: {
                    color: '#FF0000'
                }
            },
            marker: false
        }
    };
    if (drawControl == null) {
        drawControl = new L.Control.Draw(options);
    }
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        var geoJSONData = null;
        if (event.layerType == 'circle') {
            var center = turf.point([layer._latlng.lng, layer._latlng.lat]);
            var radius = layer._mRadius / 1000;
            var steps = 30;
            var units = 'kilometers';
            geoJSONData = turf.circle(center, radius, steps, units);
        } else if (event.layerType == 'polygon' || event.layerType == 'rectangle') {
            var points = [];
            layer._latlngs[0].forEach(function (point) {
                points.push([point.lng, point.lat]);
            })
            //闭合多边形
            points.push([layer._latlngs[0][0].lng], layer._latlngs[0][0].lat);
            geoJSONData = turf.polygon([points]);
        }
        var box = turf.bbox(geoJSONData);

        var points = turf.random('points', 30, {
            bbox: box
        });
        var pointWithin = [];
        points.features.forEach(function (point) {
            var coordinate = point.geometry.coordinates;
            if (turf.inside(turf.point(coordinate), geoJSONData)) {
                if (coordinate[0] > 100 && coordinate[0] < 140 && coordinate[1] > 15 && coordinate[1] < 50) {
                    pointWithin.push(point);
                }
            }
        })
        if (spatialAnlyzeLayer != null) {
            spatialAnlyzeLayer.clearLayers();
        }
        if (pointWithin.length > 0) {
            spatialAnlyzeLayer = L.geoJSON(turf.featureCollection(pointWithin), {
                pointToLayer: function (feature, latlng) {
                    var icon = L.AwesomeMarkers.icon({
                        icon: icons[Math.floor(Math.random() * icons.length)],
                        markerColor: colors[Math.floor(Math.random() * colors.length)]
                    });
                    return L.marker(latlng, {icon: icon});
                }
            }).addTo(map);
            spatialAnlyzeLayer.on('click', function (e) {
                marker.setLatLng(e.latlng);
                var table = createFlightDom(details, details_map);
                map.addLayer(marker);
                map.flyTo(e.latlng, 9);
                marker.bindPopup(table[0].outerHTML).openPopup();
                $('.leaflet-popup-content-wrapper').width(440).height(560);
            })
        } else {
            $('#noPointModel').modal('show');
        }
    });
});