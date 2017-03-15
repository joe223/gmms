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

$('#earthquakeCheckbox').click(function () {
    if (this.checked) {
        addEarthquakePoints();
    } else {
        map.removeLayer(earthquakeLayer);
    }
});

$('#tracksCheckbox').click(function () {
    if (this.checked) {
        addLineStrings();
    } else {
        if (lineLayer != null) {
            map.removeLayer(lineLayer);
        }

    }
});

$('#regionCheckbox').click(function () {
    if (this.checked) {
        addPolygonLayer();
    } else {
        if (polygonLayer != null) {
            map.removeLayer(polygonLayer);
        }

    }
});


$('#tracks').click(function () {
    if (this.checked) {
        addLineStrings();
    } else {
        map.removeLayer(lineLayer);
    }
})


$('#region').click(function () {
    if (this.checked) {
        addPolygonLayer();
    } else {
        map.removeLayer(polygonLayer);
    }
})

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
