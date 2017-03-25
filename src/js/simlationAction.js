/**
 * Created by Administrator on 2017/3/16 0016.
 */

$('#trackSimulation').on('click', function () {
    if (timeline == null) {
        $('body').append($('<div/>', {
            id: 'timeline'
        }));
        bodyElment.classList.add('body-show-timeline');
        initTimeLine();
    }
});