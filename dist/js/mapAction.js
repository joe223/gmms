/**
 * Created by beyouth on 2017/3/12.
 */

var earthquakeLayer = null;
var flightLayer = null;

var lineLayer = null;
var polygonLayer = null;

var popup = L.popup();

// var warning = L.AwesomeMarkers.icon({
//     icon: 'warning',
//     markerColor: 'red'
// });

function showImageGallery() {
    $('#imageGallery').modal('show');
    sidebar.close();
}

function createFlightDom() {
    var details = [
        {
            name: 'H121公路勘察点',
            type: '一级项目',
            position: 'XX省国道XX县市',
            contract: '项目合同',
            start_time: '2016-09-10',
            end_time: '2016-12-22',
            raw_data: 'dist/json/china.json',
            final_data: 'dist/json/china.json',
            image: 'dist/css/images/lidar.jpg'
        },
        // {name: '', type: '', postition: '', contract: '', start_time: '', end_time: '', raw_data: '', final_data: ''},
        // {name: '', type: '', postition: '', contract: '', start_time: '', end_time: '', raw_data: '', final_data: ''}
    ];
    var details_map = {
        name: '项目名称',
        type: '项目类型',
        position: '项目地点',
        contract: '项目合同',
        start_time: '开始时间',
        end_time: '结束时间',
        raw_data: '原始数据',
        final_data: '成果数据',
        image: '项目展示'
    }
    var table = $('<table class="ui celled striped table info-table"></table>');

    var thead = $('<thead><tr><th colspan="2">项目简介</th></thead>');
    table.append(thead);
    var tbody = $('<tbody></tbody>');
    details.forEach(function (data) {
        for (var property in data) {
            var tr = $('<tr></tr>');
            var tdOne = $('<td></td>').text(details_map[property]);
            var tdTwo = null;
            if (property === 'image') {
                tdTwo = $('<td><img onclick="showImageGallery()" src="' + data[property] + '" style="height: 100px;width: 200px;"></img></td>');
            } else if (property === 'raw_data' || property === 'final_data') {
                tdTwo = $('<td><a href="' + data[property] + '">' + data[property] + '</a></td>');
            }
            else {
                tdTwo = $('<td></td>').text(data[property]);
            }

            tr.append(tdOne);
            tr.append(tdTwo);
            tbody.append(tr)
        }
    })
    table.append(tbody);
    return table;
}

//添加点要素
function addEarthquakePoints() {

    if (earthquakeLayer == null) {
        // var earthquakeFeedPointsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';
        var earthquakeFeedPointsURL = 'dist/json/gas_station.geojson'
        earthquakeLayer = L.geoJson.ajax(earthquakeFeedPointsURL);
        earthquakeLayer.on('data:loaded', function () {
            map.addLayer(earthquakeLayer);
            map.fitBounds(earthquakeLayer.getBounds());
            earthquakeLayer.on('click', function (e) {
                marker.options.opacity = 1;
                marker.setLatLng(e.latlng);
                map.setView(e.latlng, 13);
                marker.bindPopup(createFlightDom()[0].outerHTML).openPopup();
            })
        })

    } else {
        map.fitBounds(earthquakeLayer.getBounds());
        map.addLayer(earthquakeLayer);
    }
}


function addFlightPoints() {
    var flightURL = 'dist/json/feed.json'
    if (flightLayer != null) {
        map.addLayer(flightLayer);
        map.fitBounds(flightLayer.getBounds());
    } else {
        $.get(flightURL, function (data) {
            flightLayer = L.markerClusterGroup();
            for (var key in data) {
                if (data[key].length !== undefined) {
                    var title = '航班' + data[key][7] + '_' + data[key][6];
                    var flightMarker = L.marker(new L.LatLng(data[key][1], data[key][2]), {title: title});
                    var table = createFlightDom();
                    flightMarker.bindPopup(table[0].outerHTML);
                    flightLayer.addLayer(flightMarker);
                }
            }
            map.addLayer(flightLayer);
        })
    }
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
                map.setView(e.latlng, 6);
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
            // marker.bindPopup(title);
            markers.addLayer(marker);
        }
        ;
        map.addLayer(markers);

        heatmap = L.heatLayer(addressPoints);
        map.fitBounds(heatmapPointsLayer.getBounds());
    } else {
        if (heatmapPointsLayer != null) {
            map.fitBounds(heatmapPointsLayer.getBounds());
        }
        map.addLayer(markers);
    }
}

function showISOMap() {
    if (isoLayer == null) {
        L.Util.ajax("dist/json/pp1.geojson").then(function (points) {
            for (var i = 0; i < points.features.length; i++) {
                points.features[i].properties.z = Math.random() * 10;
            }
            var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var isolined = turf.isolines(points, 'z', 30, breaks);
            isoLayer = L.geoJSON(isolined);
            map.addLayer(isoLayer);
            map.fitBounds(isoLayer.getBounds());
        });

    } else {
        map.addLayer(isoLayer);
        map.fitBounds(isoLayer.getBounds());
    }
}
