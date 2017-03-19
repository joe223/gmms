/**
 * Created by Administrator on 2017/3/14 0014.
 */

$('#flightCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addFlightPoints();
    } else {
        map.removeLayer(flightLayer);
    }
});

$('#earthquakeCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addEarthquakePoints();
    } else {
        if (earthquakeLayer != null) {
            map.removeLayer(earthquakeLayer);
        }
    }

});

function hideMarker() {
    if(marker!=null){
        map.removeLayer(marker);
    }
}

$('#tracksCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addLineStrings();
    } else {
        if (lineLayer != null) {
            map.removeLayer(lineLayer);
        }
    }
});

$('#regionCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addPolygonLayer();
    } else {
        if (lineLayer != null) {
            map.removeLayer(polygonLayer);
        }
    }
});

$('#dijiCheckbox').click(function () {
    hideMarker();
    if (this.checked) {
        addDijiLayer();
    } else {
        if (dijiLayer != null) {
            map.removeLayer(dijiLayer);
        }
    }
})
