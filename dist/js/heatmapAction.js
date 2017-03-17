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
                    color: '#e1e100', // Color the shape will turn when intersects
                    message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                },
                shapeOptions: {
                    color: '#bada55'
                }
            },
            circle: {},
            rectangle: {
                shapeOptions: {
                    clickable: false
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
            var center = turf.point([layer._latlng.lat, layer._latlng.lng]);
            var radius = layer._mRadius;
            var steps = 30;
            var units = 'meters';
            geoJSONData = turf.circle(center, radius, steps, units);
        } else if (event.layerType == 'polygon' || event.layerType == 'rectangle') {
            var points = [];
            layer._latlngs[0].forEach(function (point) {
                points.push([point.lat, point.lng]);
            })
            //闭合多边形
            points.push([layer._latlngs[0][0].lat, layer._latlngs[0][0].lng]);
            geoJSONData = turf.polygon([points]);
        }
        var analyzePolygon = turf.featureCollection(geoJSONData);
        // var analyzePoint = turf.random('points', 10000, {
        //     bbox: [110.423423, 21.32323, 113.22133421, 23.312312]
        // });
        console.log(spatialAnalyzeGeoJSON);
        console.log(analyzePolygon);
        var ptsWithin = turf.within(spatialAnalyzeGeoJSON, analyzePolygon);
        console.log(ptsWithin);
    });

});