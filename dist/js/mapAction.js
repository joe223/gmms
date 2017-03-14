/**
 * Created by beyouth on 2017/3/12.
 */

var pointsLayer = null;
var lineLayer = null;
var polygonLayer = null;

var popup = L.popup();


function addGeoFile() {
    // var geoFileControl = document.getElementById('geoFile');
    var file = 'C:\\youth\\project\\gmms\\dist\\json\\world.json';
    return L.geoJson.ajax(file, {local: true}).addTo(map);
};

//添加点要素
function addPointsLayer() {
    showLayer('point');
    if (pointsLayer == null) {
        var earthquakeFeedPointsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';
        pointsLayer = L.geoJson.ajax(earthquakeFeedPointsURL);
        pointsLayer.on('data:loaded', function () {
            map.addLayer(pointsLayer);
            map.fitBounds(pointsLayer.getBounds());
            pointsLayer.on('click', function (e) {
                marker.options.opacity = 1;
                marker.setLatLng(e.latlng);
                marker.bindPopup("<h3>" + e.layer.feature.properties.title + "</h3>").openPopup();
            })
        })

    } else {
        map.fitBounds(pointsLayer.getBounds());
        map.addLayer(pointsLayer);
    }
}

//添加线要素
function addLineStrings() {
    showLayer('line');
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
    showLayer('polygon');
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

//隐藏要素图层
function showLayer(layerGroupName) {
    var groupName = ['point', 'line', 'polygon'];
    groupName.splice(groupName.indexOf(layerGroupName), 1);
    groupName.forEach(function (layer) {
        if (layer === 'point') {
            if (pointsLayer != undefined) {
                map.removeLayer(pointsLayer);
            }
        } else if (layer === 'line') {
            if (lineLayer != undefined) {
                map.removeLayer(lineLayer);
            }
        } else if (layer === 'polygon') {
            if (polygonLayer != undefined) {
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
        heatmap = L.heatLayer(addressPoints);
        map.fitBounds(heatmapPointsLayer.getBounds());
        map.addLayer(heatmap);
    } else {
        if (heatmapPointsLayer != null) {
            map.fitBounds(heatmapPointsLayer.getBounds());
        }

        map.addLayer(heatmap);
    }

}
