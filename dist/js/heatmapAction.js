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