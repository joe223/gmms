/**
 * this is the main file
 * everything begains with it
 */
// require("style-loader!css-loader!./src/css/leaflet.css");


const $ = require("jquery");
window.jQuery = $;

const leaflet = require("leaflet");
const d3 = require("d3");
const topojson = require("topojson");
const initMap = require("script/map.js");

require("script/plugins/semantic.min.js");
require("script/plugins/Leaflet.fullscreen.min.js");
require("script/plugins/topojson.min.js");
require("script/plugins/Leaflet.fullscreen.min.js");
require("script/plugins/topojson.min.js");
require("script/plugins/leaflet-sidebar.js");
require("script/plugins/tdtLayer.js");
require("script/plugins/route.js");
require("script/plugins/leaflet-heat.js");
require("script/plugins/leaflet.ajax.js");
require("script/timelineAction.js");
require("script/plugins/leaflet.ChineseTmsProviders.js");
require("script/plugins/vis.min.js");
require("script/plugins/LeafletPlayback.js");
require("script/plugins/leaflet.markercluster-src.js");
require("script/plugins/L.Icon.Pulse.js");
require("script/plugins/leaflet.awesome-markers.min.js");
require("script/plugins/L.Terminator.js");
require("script/plugins/leaflet-measure.min.js");
require("script/plugins/Control.GlobeMiniMap.js");



//    ui script
$('.menu .item').tab();
$('.ui.accordion').accordion();

var map = initMap();
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);


var pulsingIcon = L.icon.pulse({iconSize: [20, 20], color: 'red'});
var marker = L.marker([50, 15], {icon: pulsingIcon});

var teminatorLayer = L.terminator();

showSubCom();
