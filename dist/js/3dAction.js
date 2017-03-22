/**
 * Created by Administrator on 2017/3/14 0014.
 */

$('#show3DPointsModel').on('click', function () {
    $('#3dPointsShow').modal('show');
    // sidebar.close();
});

$('#show3DLineModel').on('click', function () {
    $('#3dLinesShow').modal('show');
    // sidebar.close();
});

$('#show3DPolygonModel').on('click', function () {
    $('#3dPolygonShow').modal('show');
    sidebar.close();
});
