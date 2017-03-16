/**
 * Created by Administrator on 2017/3/16 0016.
 */
$('#tiandiMap').on('click', function () {
    if (basemap != 'tiandi') {
        map.addLayer(tileMap);
        map.addLayer(labelMap);
    }
    map.removeLayer(darkBaseMap);
});

$('#darkMap').on('click', function () {
    map.removeLayer(tileMap);
    map.removeLayer(labelMap);
    map.addLayer(darkBaseMap);
});