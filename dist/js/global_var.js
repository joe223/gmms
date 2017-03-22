/**
 * Created by Administrator on 2017/3/22 0022.
 */

//  logic script
var isoLayer = null;
var heatmap = null;
var markers = null;

// map control
var globalMiniMap = null;
var sidebar = null;

var timeline = null;
var playback = null;
var spatialAnalyzeGeoJSON = null;
var bufferLayer = null;
var lineMarkerLayer = null;

var sub_com = null;

var zafLayer = null;
var zafLineLayer = null;
var zafPointsLayer = null;

var indlayer = null;
var indPointLayer = null;
var indLineLayer = null;

var thiLayer = null;
var thiLineLayer = null;
var thiPointLayer = null;

var bolLayer = null;
var bolPointLayer = null;
var bolLineLayer

//    draw control
var drawControl = null;

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

var subComNameMap = {
    'name': '子公司名',
    'address': '地址',
    'email': '邮件',
    'telephone': '电话'
};

var details = [
    {
        name: 'H121巡线监控点',
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
        name: 'M3812巡线监控点',
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
        name: 'M3ds12巡线监控点',
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