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
        var analyzePolygon = turf.featureCollection(geoJSONData);

        var points = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [111.6318, 21.5323]
                    }
                }, {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [111.6318, 21.5523]
                    }
                }, {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [111.6318, 21.5623]
                    }
                }, {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [111.3318, 21.5223]
                    }
                }, {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                        "type": "Point",
                        "coordinates": [113.36318, 23.1523]
                    }
                }
            ]
        };

        var ptsWithin = turf.within(points, analyzePolygon);
        console.log(JSON.stringify(analyzePolygon));
        console.log(JSON.stringify(points));
        console.log(ptsWithin);
    });
});