/**
 * Created by Administrator on 2017/3/14 0014.
 */

function switcher(timelineSwitcher, heatmapSwitcher, featureSwitcher) {
    switchSimPanel(timelineSwitcher);
    switcheHeatmapPanel(heatmapSwitcher);
    switchFeatureLayer(featureSwitcher);
}

//隐藏时间线功能及其控件
function switchSimPanel(switcher) {
    if (switcher === 'on') {
        $('#timeline').css("display", "block");
        initTimeLine();
    } else {
        $('#timeline').css("display", "none");
        timeline = null;
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
        if(markers!=null){
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
        if (pointsLayer != null) {
            map.removeLayer(pointsLayer);
        }
        if (lineLayer != null) {
            map.removeLayer(lineLayer);
        }
    }

}
