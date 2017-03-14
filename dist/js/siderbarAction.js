/**
 * Created by Administrator on 2017/3/14 0014.
 */

function switcher(timelineSwitcher, heatmapSwitcher) {
    switchSimPanel(timelineSwitcher);
    switcherHeatmapPanel(heatmapSwitcher);
}

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

function switcherHeatmapPanel(switcher) {
    if (switcher === 'on') {
        showHeatmap();
    }else{
        map.removeLayer(heatmap);
    }
}