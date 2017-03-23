/**
 * Created by Administrator on 2017/3/14 0014.
 */


function initTimeLine() {
    // Get start/end times
    var startTime = new Date(demoTracks[0].properties.time[0]);
    var endTime = new Date(demoTracks[0].properties.time[demoTracks[0].properties.time.length - 1]);

    // Create a DataSet with data
    var timelineData = new vis.DataSet([{start: startTime, end: endTime, content: '路径播放'}]);

    // Set timeline options
    var timelineOptions = {
        "width": "100%",
        "height": "120px",
        "style": "box",
        "axisOnTop": true,
        "showCustomTime": true,
        "labels": true,
        "popups": true
    };

    // Setup timeline
    timeline = new vis.Timeline(document.getElementById('timeline'), timelineData, timelineOptions);

    // Set custom time marker (blue)
    timeline.setCustomTime(startTime);
    // Playback options
    var playbackOptions = {
        labels: true,
        playControl: true,
        dateControl: true,
        popups: true,
        // layer and marker options
        layer: {
            pointToLayer: function (featureData, latlng) {
                var result = {};

                if (featureData && featureData.properties && featureData.properties.path_options) {
                    result = featureData.properties.path_options;
                }

                if (!result.radius) {
                    result.radius = 1;
                }
                return new L.CircleMarker(latlng, result);
            }
        },

        marker: {
            getPopup: function (featureData) {
                // var result = '';
                //
                // if (featureData && featureData.properties && featureData.properties.title) {
                //     result = featureData.properties.title;
                //     result = '项目进度';
                // }
                return '项目进度';
            }
        }

    };
    // Initialize playback
    playback = new L.Playback(map, null, onPlaybackTimeChange, playbackOptions);

    // ui setup
    $('.leaflet-popup-content-wrapper').width(200);
    $('.leaflet-popup-content').width(200);
    $('.leaflet-popup-content').html('<h3>广州某工程施工播报</h3>');

    $('.ui.progress').progress({
        total: 100,
        percent: 0,
        value: 0,
        text: {
            active: '{value} of {total} done'
        }
    });

    playback.setData(demoTracks);
    playback.addData(blueMountain);

    // Uncomment to test data reset;
    //playback.setData(blueMountain);

    // Set timeline time change event, so cursor is set after moving custom time (blue)
    timeline.on('timechange', onCustomTimeChange);

    // A callback so timeline is set after changing playback time
    var tick = 0;

    function onPlaybackTimeChange(ms) {
        timeline.setCustomTime(new Date(ms).toISOString());
        var today = new Date(ms);
        var todayStr = today.getFullYear() + '-0' + (today.getMonth() - 1) + '-' + today.getDate();
        var $progress = $('.ui.progress');
        $progress.progress('increment');

        $('.datetimeControl').html('<p> ' + todayStr + ' 当前施工进度:</p><div class="ui teal progress" data-percent="0" id="example1"> <div class="bar"></div> <div class="label" id="progress">0</div> </div> ');

        tick += 0.02;
        $('.leaflet-popup-content-wrapper').width(200);
        $('.leaflet-popup-content').width(200);
        $('.leaflet-popup-content').html('<h3>广州某工程施工播报</h3>');
        if (tick > 100) {
            playback.stop();
            $('#progress').text('施工完成！');
            $('#example1').progress({
                percent: 100
            });
        } else {
            $('#progress').text(tick.toFixed(2) + '%');
            $('#example1').progress({
                percent: tick.toFixed(2)
            });
        }
    };
    $('.datetimeControl').html('施工进展面板');
    function onCustomTimeChange(properties) {
        if (!playback.isPlaying()) {
            playback.setCursor(properties.time.getTime());
        }
    }
}
