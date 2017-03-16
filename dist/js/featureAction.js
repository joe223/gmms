/**
 * Created by Administrator on 2017/3/14 0014.
 */

$('#flightCheckbox').click(function () {
    if (this.checked) {
        addFlightPoints();
    } else {
        map.removeLayer(flightLayer);
    }
});

$('#earthquakeCheckbox').on('click', function () {
    addEarthquakePoints();
});

$('#tracksCheckbox').on('click', function () {
    addLineStrings();
});

$('#regionCheckbox').on('click', function () {
    addPolygonLayer();
});


$('#pointTab').click(function () {
    showLayer('point');
    $('#earthquakeCheckbox').prop('checked', true);
    $('#flightCheckbox').prop('checked', false);
    $('#tracksCheckbox').prop('checked', false);
    $('#regionCheckbox').prop('checked', false);

})

$('#lineTab').on('click', function () {
    showLayer('line');
    $('#earthquakeCheckbox').prop('checked', false);
    $('#flightCheckbox').prop('checked', false);
    $('#tracksCheckbox').prop('checked', true);
    $('#regionCheckbox').prop('checked', false);
})


$('#polygonTab').on('click', function () {
    showLayer('polygon');
    $('#earthquakeCheckbox').prop('checked', false);
    $('#flightCheckbox').prop('checked', false);
    $('#tracksCheckbox').prop('checked', false);
    $('#regionCheckbox').prop('checked', true);
})
