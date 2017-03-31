/**
 * this is the main file
 * everything begains with it
 */
// require("style-loader!css-loader!./src/css/leaflet.css");

$('.menu .item').tab();
$('.ui.accordion').accordion();

window.map = initMap();
window.editableLayers = new L.FeatureGroup();
window.pulsingIcon = L.icon.pulse({iconSize: [20, 20], color: 'red'});
window.marker = L.marker([50, 15], {icon: pulsingIcon});
window.teminatorLayer = L.terminator();

showSubCom();
