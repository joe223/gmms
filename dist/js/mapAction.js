/**
 * Created by beyouth on 2017/3/12.
 */

var earthquakeLayer = null;
var flightLayer = null;

var lineLayer = null;
var polygonLayer = null;
var dijiLayer = null;

var popup = L.popup();


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
        image: 'http://www.honlitech.com/d/file/contents/2016/03/56d7e3124368c.png'
    },
    {
        name: 'M3812 省道勘察点',
        type: '二级项目',
        position: 'XX省国道XX县市',
        contract: '项目合同',
        start_time: '2016-09-10',
        end_time: '2016-12-22',
        raw_data: 'dist/json/china.json',
        final_data: 'dist/json/china.json',
        image: 'dist/css/images/lidar.jpg'
    },
    {
        name: 'H12M12 国道勘察点',
        type: '一级项目',
        position: 'XX省国道XX县市',
        contract: '项目合同',
        start_time: '2016-09-10',
        end_time: '2016-12-22',
        raw_data: 'dist/json/gas_station.geojson',
        final_data: 'dist/json/gas_station.geojson',
        image: 'http://www.lidar360.com/wp-content/uploads/2016/10/Viewernew-1-1024x555.png'
    },
    {
        name: 'M3ds12 县道勘察点',
        type: '三级项目',
        position: 'XX省国道XX县市',
        contract: '项目合同',
        start_time: '2016-09-10',
        end_time: '2016-12-22',
        raw_data: 'dist/json/feed.json',
        final_data: 'dist/json/feed.json',
        image: 'http://www.lidar360.com/wp-content/uploads/2015/10/%E9%A6%99%E8%95%89%E5%9B%AD%E7%82%B9%E4%BA%91%E5%B1%95%E7%A4%BA_%E5%89%AF%E6%9C%AC.png'
    }
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


var videos = [
    "<iframe height=360 width=100% src='http://player.youku.com/embed/XODM2ODUyMDUy' frameborder=0 'allowfullscreen'></iframe>",
    "<iframe height=360 width=100% src='http://player.youku.com/embed/XNDI3MjU0MzY4' frameborder=0 'allowfullscreen'></iframe>",
    "<iframe height=360 width=100% src='http://player.youku.com/embed/XODkyMTE0NDQ4' frameborder=0 'allowfullscreen'></iframe>",
    "<iframe height=360 width=100% src='http://player.youku.com/embed/XNjY3NTA4MjIw' frameborder=0 'allowfullscreen'></iframe>"
];

var icons = [
    'coffee',
    'map-marker',
    'map-signs',
    'photo',
    'bus',
    'bicycle',
    'cab'
];
var colors = [
    'red',
    'blue',
    'yellow'
];

function showImageGallery() {
    $('#imageGallery').modal('show');
    sidebar.close();
}

function createFlightDom(details, details_map) {

    var table = $('<table class="ui celled striped table info-table"></table>');

    var thead = $('<thead><tr><th colspan="2">项目简介</th></thead>');
    table.append(thead);
    var tbody = $('<tbody></tbody>');
    var index = Math.floor(Math.random() * details.length);
    var data = details[index];
    var imgSrc = '';
    for (var property in data) {
        var tr = $('<tr></tr>');
        var tdOne = $('<td></td>').text(details_map[property]);
        var tdTwo = null;
        if (property === 'image') {
            tdTwo = $('<td><img onclick="showImageGallery()" src="' + data[property] + '" style="height: 100px;width: 200px;"></img></td>');
            imgSrc = data[property];
        } else if (property === 'raw_data' || property === 'final_data') {
            tdTwo = $('<td><a href="' + data[property] + '" target="_black">下载</a></td>');
        }
        else {
            tdTwo = $('<td></td>').text(data[property]);
        }

        tr.append(tdOne);
        tr.append(tdTwo);
        tbody.append(tr)
    }
    $('#imgAddress').attr('src', imgSrc);
    table.append(tbody);
    return table;
}

//添加点要素
function addEarthquakePoints() {

    if (earthquakeLayer == null) {
        // var earthquakeFeedPointsURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson';
        var earthquakeFeedPointsURL = 'dist/json/gas_station.geojson'

        earthquakeLayer = L.geoJson.ajax(earthquakeFeedPointsURL, {
            pointToLayer: function (feature, latlng) {
                var icon = L.AwesomeMarkers.icon({
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    markerColor: colors[Math.floor(Math.random() * colors.length)]
                });
                return L.marker(latlng, {icon: icon});
            }
        });
        earthquakeLayer.on('data:loaded', function () {
            map.addLayer(earthquakeLayer);
            map.fitBounds(earthquakeLayer.getBounds());
            earthquakeLayer.on('click', function (e) {
                marker.options.opacity = 1;
                marker.setLatLng(e.latlng);
                map.setView(e.latlng, 13);
                var table = createFlightDom(details, details_map)
                marker.bindPopup(table[0].outerHTML).openPopup();
                map.addLayer(marker);
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
                    var table = createFlightDom(details, details_map);
                    flightMarker.bindPopup(table[0].outerHTML);
                    flightLayer.addLayer(flightMarker);
                    map.addLayer(flightMarker);
                }
            }
            map.addLayer(flightLayer);
        })
    }
}

//添加线要素
function addLineStrings() {
    if (lineLayer == null) {
        var lineLayerURL = 'dist/json/railway.geojson';
        lineLayer = L.geoJson.ajax(lineLayerURL);
        lineLayer.on('data:loaded', function () {
            map.addLayer(lineLayer);
            map.fitBounds(lineLayer.getBounds());
            lineLayer.on('click', function (e) {
                marker.setLatLng(e.latlng);
                map.setView(e.latlng, 9);
                var index = Math.floor(Math.random() * details.length);
                var data = details[index];
                marker.bindPopup('<h3>' + data['name'] + '段监控</h3>'+ '<p>拍摄时间: 2017-02-01 09:30</p>' + videos[Math.floor(Math.random() * videos.length)]).openPopup();
                $('.leaflet-popup-content').height(440).width(600);
                map.addLayer(marker);
            })
        })

    } else {
        map.fitBounds(lineLayer.getBounds());
        map.addLayer(lineLayer);
    }
}

var colors_hex = [
    '#E52D34',
    '#BC252B',
    '#FBC17B',
    '#FFF38F',
    '#D1C029',
    '#9DE477',
    '#4B9C1F',
    '#7CA7FF',
    '#204CA3'
]


function runChartScript(name) {
    var myChart = echarts.init(document.getElementById('dijiChart'));
    var option = {
        backgroundColor: '#FFFFFF',

        title: {
            text: name + '土地使用状况',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#000000'
            }
        },

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 300,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '土地使用状况',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: Math.floor(Math.random() * 100 + 50), name: '建设用地'},
                    {value: Math.floor(Math.random() * 100 + 50), name: '公园用地'},
                    {value: Math.floor(Math.random() * 100 + 50), name: '耕地'},
                    {value: Math.floor(Math.random() * 100 + 50), name: '保留地'},
                    {value: Math.floor(Math.random() * 100 + 50), name: '工业用地'}
                ].sort(function (a, b) {
                    return a.value - b.value
                }),
                roseType: 'angle',
                toolbox: {
                    saveAsImage: {show: true}
                },
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#EF7161',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };
    myChart.setOption(option);
    sidebar.close();
}

// 添加面要素
function addPolygonLayer() {
    if (polygonLayer == null) {
        polygonLayer = L.geoJson.ajax('dist/json/guang_dong_geo.json', {
            style: function () {
                var color = colors_hex[Math.floor(Math.random() * colors_hex.length)];
                return {
                    "color": color,
                    "weight": 5,
                    "opacity": 0.9
                };
            }
        });

        polygonLayer.on('data:loaded', function () {
            map.addLayer(polygonLayer);
            map.fitBounds(polygonLayer.getBounds());
            polygonLayer.on('click', function (e) {
                marker.setLatLng(e.latlng);
                marker.options.opacity = 1;
                map.setView(e.latlng, 8);
                //TODO infowindow
                marker.bindPopup("<h3>" + e.layer.feature.properties.name + "</h3>" + '<div id="dijiChart" style="width:400px;height:300px"></div>').openPopup();
                map.addLayer(marker);
                setTimeout(function () {
                    runChartScript(e.layer.feature.properties.name);
                }, 250);
            })
        })
    } else {
        map.fitBounds(polygonLayer.getBounds());
        map.addLayer(polygonLayer);
    }
};

function addDijiLayer() {
    if (dijiLayer == null) {
        dijiLayer = L.geoJson.ajax('dist/json/440100.json', {
            style: function () {
                var color = colors_hex[Math.floor(Math.random() * colors_hex.length)];
                return {
                    "color": color,
                    "weight": 5,
                    "opacity": 0.9
                };
            }
        });

        dijiLayer.on('data:loaded', function () {
            map.addLayer(dijiLayer);
            map.fitBounds(dijiLayer.getBounds());
            dijiLayer.on('click', function (e) {
                marker.setLatLng(e.latlng);
                marker.options.opacity = 1;
                map.setView(e.latlng, 10);
                //TODO infowindow
                marker.bindPopup("<h3>" + e.layer.feature.properties.name + "</h3>" + '<div id="dijiChart" style="width:400px;height:300px"></div>').openPopup();
                map.addLayer(marker);
                setTimeout(function () {
                    runChartScript(e.layer.feature.properties.name);
                }, 250);
            })
        })
    } else {
        map.fitBounds(dijiLayer.getBounds());
        map.addLayer(dijiLayer);
    }
};


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
            var icon = L.AwesomeMarkers.icon({
                icon: icons[Math.floor(Math.random() * icons.length)],
                markerColor: colors[Math.floor(Math.random() * colors.length)]
            });
            var marker = L.marker(new L.LatLng(a[0], a[1]), {title: title, icon: icon});
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

    // 加载空间分析图层
    L.Util.ajax("dist/json/pp1.geojson").then(function (points) {
        spatialAnalyzeGeoJSON = points;
        spatialAnalyzeGeoJSON.features.forEach(function (point) {
            point.geometry.coordinates = [point.geometry.coordinates[1], point.geometry.coordinates[0]];
        })
    });
}

function showISOMap() {
    if (isoLayer == null) {
        L.Util.ajax("dist/json/gas_station.geojson").then(function (points) {
            for (var i = 0; i < points.features.length; i++) {
                points.features[i].properties.z = Math.random() * 10;
            }

            var breaks = [0, 1, 2, 3, 4, 5, 6];
            var isolined = turf.isolines(points, 'z', 50, breaks);

            isoLayer = L.geoJSON(isolined);
            map.addLayer(isoLayer);
            map.fitBounds(isoLayer.getBounds());
        });

    } else {
        map.addLayer(isoLayer);
        map.fitBounds(isoLayer.getBounds());
    }
}
