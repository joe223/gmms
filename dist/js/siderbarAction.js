/**
 * Created by Administrator on 2017/3/14 0014.
 */

// const variable
var bodyElment = document.body;


// 总开关
function switcher(timelineSwitcher, heatmapSwitcher, featureSwitcher, timeLineSwitcher) {
    switchSimPanel(timelineSwitcher);
    switcheHeatmapPanel(heatmapSwitcher);
    switchFeatureLayer(featureSwitcher);
    switchTimeline(timeLineSwitcher);
}

//隐藏时间线功能及其控件
function switchSimPanel(switcher) {
    if (switcher === 'on') {
        $('#timeline').css("display", "block");
        $('body').append($('<div/>', {
            id: 'timeline'
        }));
        bodyElment.classList.add('body-show-timeline');
        initTimeLine();
    } else {
        $('#timeline').css("display", "none");
        bodyElment.classList.remove('body-show-timeline');
        timeline = null;
        $('#timeline').remove();
        if (playback != null) {
            playback.destroy();
        }
    }
}

//关闭热力图图层
function switcheHeatmapPanel(switcher) {
    if (switcher === 'on') {
        showHeatmap();
    } else {
        if (heatmap != null) {
            map.removeLayer(heatmap);
        }
        if (markers != null) {
            map.removeLayer(markers);
        }
    }
}

//移除所有要素图层
function switchFeatureLayer(switcher) {
    if (switcher === 'off') {
        if (polygonLayer != null) {
            map.removeLayer(polygonLayer);
        }
        if (earthquakeLayer != null) {
            map.removeLayer(earthquakeLayer);
        }
        if (lineLayer != null) {
            map.removeLayer(lineLayer);
        }
    } else {
        addEarthquakePoints();
    }
}

function switchTimeline(switcher) {
    if (switcher === 'off') {
        if (globalMiniMap != null) {
            map.removeControl(globalMiniMap);
        }
    } else {
        map.addControl(globalMiniMap);
    }
}
