/**
 * Created by Administrator on 2017/3/14 0014.
 */


$('#flightCheckbox').checkbox({
    onChecked: function () {
        addFlightPoints();
    },
    onUnchecked: function () {
        map.remove(flightLayer);
    }
})
$('#earthquakeCheckbox').click(function () {
    if (this.checked) {
        addEarthquakePoints();
    } else {
        map.removeLayer(earthquakeLayer);
    }
});