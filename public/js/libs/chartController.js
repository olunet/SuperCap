createChartCanvas = function (voltages) {
    var dataset = [];
    var labels = [];

    for (var i = 0; i < voltages.length; i++) {
        labels.push(voltages[i]);
        dataset.push(0);
    }

    var data = {
        labels: labels,
        datasets: [ { data: dataset } ]
    }

    var canvas = document.getElementById('chart');
    canvas.width = $("#canvasParent").width();
    canvas.height = 350;
    var context = canvas.getContext('2d');
    var chart = new Chart(context).Line(data);
    this.chart = chart;
    
    console.log(chart);
}

createNewChart = function (inputSet) {
    var dataset = [];

    console.log(chart);

    for (var i = 0; i < chart.scale.xLabels.length; i++) {
        dataset.push(1);
    }

    chart.datasets.push({data: dataset});
    chart.update();
}


refreshChart = function (values) {

    for (var set = 0; set < chart.datasets.length; set++) {
        console.log(chart.datasets[set]);
        for (var i = 0; i < chart.datasets[0].points.length; i++) {
            chart.datasets[set].points[i].value = values[i];
        }
    }

    chart.update();
}







