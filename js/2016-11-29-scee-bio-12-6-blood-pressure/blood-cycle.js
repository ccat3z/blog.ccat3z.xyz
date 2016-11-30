var container = $('#blood-cycle');
var cover = $('#cover');

var DOTstring = `
bloodcycle {
    1[label="主动脉" group="动脉血"]
    2[label="毛细血管" group="静脉血"]
    3[label="主静脉" group="静脉血"]
    4[label="右心房" group="静脉血"]
    5[label="右心室" group="静脉血"]
    6[label="肺动脉" group="静脉血"]
    7[label="肺毛细血管" group="静脉血"]
    8[label="肺静脉" group="静脉血"]
    9[label="左心房" group="静脉血"]
    10[label="左心室" group="动脉血"]
    0[label="血液循环" fontsize=30]
    1->2->3->4->5->6->7->8->9->10->1
    {1 2 3 4 5 6 7 8 9 10}--0 [opacity=0.2]
}
`
var parsedData = vis.network.convertDot(DOTstring);

var data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
};

var width = container.width() + 'px';
var height = container.width() * 2 / 3 + 'px';
cover.width(width);
cover.height(height);

var options = {
    width: width,
    height: height,
    interaction: {
        // dragNodes: false,
        dragView: false,
        selectable: false,
        selectConnectedEdges: false,
        zoomView: false
    },
    groups: {
        动脉血: {
            shape: 'circle',
            size: 30,
            color: {
                background: '#ffffff',
                border: '#ff0000'
            }
        },
        静脉血: {
            shape: 'circle',
            size: 30,
            color: {
                background: '#ffffff',
                border: '#0085ff'
            }
        },
        TITLE: {
            color: {
                opacity: 0
            }
        }
    },
    layout: {
        randomSeed: 10
    }
};

var network = new vis.Network(container[0], data, options);

$(window).resize(function() {
    var width = container.width() + 'px';
    var height = container.width() * 2 / 3 + 'px';
    network.setSize(width, height)
    network.redraw();
    cover.width(width);
    cover.height(height);
});
