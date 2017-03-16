/**
 * Created by 19375 on 2017/3/16.
 */
var data = [
    {
        id: '3d',
        name: 'WebGIS 三维项目',
        isParent: 'Y',
        children: [
            {name: '激光点云采集项目', layerName: 'lidar'},
            {name: '倾斜摄影测量项目', layerName: 'tiltMeasurement'},
        ]
    },
    {
        id: 'highway',
        name: '某高速公路测量工程',
        isParent: 'Y',
        children: [
            {name: '测量站点', layerName: 'highwayPoints'},
            {name: '路线', layerName: 'highwayLine'},
        ]
    },
    {
        id: 'digitalRegion',
        name: '数字县区',
        isParent: 'Y',
        children: [
            {name: '数字县区边界', layerName: 'digitalRegion'}
        ]
    },
    {
        id: 'cadastral',
        name: '地籍调查',
        isParent: 'Y',
        children: [
            {name: '地籍调查区划', layerName: 'cadastral'}
        ]
    }
];
$('#tree1').tree({
    data: data,
    closedIcon: '+',
    openedIcon: '-',
    onCreateLi: function (node, $li) {
        // Add 'icon' span before title
        $li.find('.jqtree-title').after('<span class="fa fa-map-o"></span>');
    }
});

function hideOtherLayer(layerName) {
    var groupName = ['lidar', 'tiltMeasurement', 'highwayPoints', 'highwayLine', 'digitalRegion'];
    groupName.splice(groupName.indexOf(layerName), 1);
    groupName.forEach(function (layer) {
        if (layer === 'lidar') {
            if (flightLayer != null) {
                map.removeLayer(flightLayer);
            }
        } else if (layer === 'tiltMeasurement') {
            $('#3dLinesShow').modal('hide');
        } else if (layer === 'highwayPoints') {
            $('#3dPointsShow').modal('hide');
        } else if (layer === 'highwayLine') {
            if (lineLayer != null) {
                map.removeLayer(lineLayer);
            }
        } else if (layer === '') {

        } else if (layer === 'digitalRegion') {
            if (polygonLayer != null) {
                map.removeLayer(polygonLayer);
            }
        }
    })
}

// 点击展开要素信息
$('#tree1').bind(
    'tree.click',
    function (event) {
        // The clicked node is 'event.node'
        var node = event.node;
        if (node.isParent === 'Y') {
            var openNode = $('#tree1').tree('getNodeById', node.id);
            if (openNode.opened == 'Y') {
                openNode.opened = 'N';
                $('#tree1').tree('closeNode', openNode);
            } else {
                openNode.opened = 'Y';
                $('#tree1').tree('openNode', openNode);
            }
        } else {
            hideOtherLayer(node.layerName);
            if (node.layerName == 'lidar') {
                show3DPointsModel();
            } else if (node.layerName === 'tiltMeasurement') {
                show3DLineModel();
            } else if (node.layerName === 'highwayPoints') {
                addFlightPoints();
            } else if (node.layerName === 'highwayLine') {
                addLineStrings();
            } else if (node.layerName === 'digitalRegion') {
                addPolygonLayer();
            }
        }

    }
);