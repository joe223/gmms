/**
 * Created by beyouth on 2017/3/12.
 */

var earthquakeLayer = null;
var flightLayer = null;

var lineLayer = null;
var polygonLayer = null;

var popup = L.popup();


function addGeoFile() {
    // var geoFileControl = document.getElementById('geoFile');
    var file = 'C:\\youth\\project\\gmms\\dist\\json\\world.json';
    return L.geoJson.ajax(file, {local: true}).addTo(map);
};

//添加点要素
function addEarthquakePoints() {

    if (earthquakeLayer == null) {
        var earthquakeFeedPointsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';
        earthquakeLayer = L.geoJson.ajax(earthquakeFeedPointsURL);
        earthquakeLayer.on('data:loaded', function () {
            map.addLayer(earthquakeLayer);
            map.fitBounds(earthquakeLayer.getBounds());
            earthquakeLayer.on('click', function (e) {
                marker.options.opacity = 1;
                marker.setLatLng(e.latlng);
                marker.bindPopup("<h3>" + e.layer.feature.properties.title + "</h3>").openPopup();
            })
        })

    } else {
        map.fitBounds(earthquakeLayer.getBounds());
        map.addLayer(earthquakeLayer);
    }
}

function addFlightPoints() {
    var flightURL = 'dist/json/feed.json'
    $.get(flightURL, function (data) {

        flightLayer = L.markerClusterGroup();

        for (var key in data) {
            if (data[key].length !== undefined) {
                var title = '航班' + data[key][7] + '_' + data[key][6];
                var marker = L.marker(new L.LatLng(data[key][1], data[key][2]), {title: title});
                marker.bindPopup(title);
                flightLayer.addLayer(marker);
            }
        }
        map.addLayer(flightLayer);
    })
}

//添加线要素
function addLineStrings() {
    if (lineLayer == null) {
        var lineLayerURL = 'dist/json/track.geojson';
        lineLayer = L.geoJson.ajax(lineLayerURL);
        lineLayer.on('data:loaded', function () {
            map.addLayer(lineLayer);
            map.fitBounds(lineLayer.getBounds());
        })

    } else {
        map.fitBounds(lineLayer.getBounds());
        map.addLayer(lineLayer);
    }
}

// 添加面要素
function addPolygonLayer() {
    if (polygonLayer == null) {
        polygonLayer = L.geoJson.ajax('dist/json/guang_dong_geo.json');
        polygonLayer.on('data:loaded', function () {
            map.addLayer(polygonLayer);
            map.fitBounds(polygonLayer.getBounds());
            polygonLayer.on('click', function (e) {
                marker.options.opacity = 1;
                marker.setLatLng(e.latlng);
                marker.bindPopup("<h3>" + e.layer.feature.properties.name + "</h3>").openPopup();
            })
        })
    } else {
        map.fitBounds(polygonLayer.getBounds());
        map.addLayer(polygonLayer);
    }
}

//只显示某要素图层
function showLayer(layerGroupName) {
    var groupName = ['point', 'line', 'polygon'];
    groupName.splice(groupName.indexOf(layerGroupName), 1);
    if (layerGroupName === 'point') {
        if (earthquakeLayer != null) {
            map.addLayer(earthquakeLayer);
            map.fitBounds(earthquakeLayer.getBounds());
        } else {
            addEarthquakePoints();
        }
    } else if (layerGroupName === 'line') {
        if (lineLayer != null) {
            map.addLayer(lineLayer);
            map.fitBounds(lineLayer.getBounds());
        } else {
            addLineStrings();
        }
    } else if (layerGroupName === 'polygon') {
        if (polygonLayer != null) {
            map.addLayer(polygonLayer);
            map.fitBounds(polygonLayer.getBounds());
        } else {
            addPolygonLayer();
        }
    }
    groupName.forEach(function (layer) {
        if (layer === 'point') {
            if (earthquakeLayer != null) {
                map.removeLayer(earthquakeLayer);
            }
            if (flightLayer != null) {
                map.removeLayer(flightLayer);
            }
        } else if (layer === 'line') {
            if (lineLayer != null) {
                map.removeLayer(lineLayer);
            }
        } else if (layer === 'polygon') {
            if (polygonLayer != null) {
                map.removeLayer(polygonLayer);
            }
        }
    });
}
var heatmapPointsLayer = null;

function showHeatmap() {
    if (heatmap == null) {
        addressPoints = addressPoints.map(function (p) {
            return [p[0], p[1]];
        });
        heatmapPointsLayer = L.polyline(addressPoints);
        markers = L.markerClusterGroup();
        for (var i = 0; i < addressPoints.length; i++) {
            var a = addressPoints[i];
            var title = a[2];
            var marker = L.marker(new L.LatLng(a[0], a[1]), {title: title});
            marker.bindPopup(title);
            markers.addLayer(marker);
        }
        ;

        map.addLayer(markers);

        heatmap = L.heatLayer(addressPoints);
        map.fitBounds(heatmapPointsLayer.getBounds());
        // map.addLayer(heatmap);
    } else {
        if (heatmapPointsLayer != null) {
            map.fitBounds(heatmapPointsLayer.getBounds());
        }
        map.addLayer(markers);
        // map.addLayer(heatmap);
    }

}
