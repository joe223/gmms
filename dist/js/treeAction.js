/**
 * Created by 19375 on 2017/3/16.
 */
var data = [
    {
        name: '激光点云采集项目',
        children: [
            {name: '激光点云数据展示'},
        ]
    },
    {
        name: '某高速公路测量工程',
        children: [
            {name: '测量站点'},
            {name: '路线'},
        ]
    },
    {
        name: '数字县区',
        children: [
            {name: '数字县区边界'}
        ]
    },
    {
        name: '地籍调查',
        children: [
            {name: '地籍调查区划'}
        ]
    }
];
$('#tree1').tree({
    data: data,
    closedIcon: '+',
    openedIcon: '-',
    onCreateLi: function (node, $li) {
        // Add 'icon' span before title
        $li.find('.jqtree-title').before('<span class="fa fa-map-o"></span>');
    }
});
$('#tree1').bind(
    'tree.click',
    function (event) {
        // The clicked node is 'event.node'
        var node = event.node;
        console.log(node);
        alert(node.name);
    }
);