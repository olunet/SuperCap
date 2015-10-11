

createChart = function (voltages) {
    var labels = [];
    var data = []

    for (var i = 0; i < voltages.length; i++) {
        labels.push(voltages[i]);
        data.push(0);
    }

    var data = {
        labels: labels,
        datasets: [
            {
                fillColor: "rgba(0, 0, 0,0)",
                strokeColor: "#ff0000",
                pointColor: "#fff",
                pointStrokeColor: "#444444",
                data: data
            }
        ]
    }


    var canvas = document.getElementById('chart');
    canvas.width = $("#canvasParent").width();
    var context = canvas.getContext('2d');
    var chart = new Chart(context).Line(data);
    this.chart = chart;
}


refreshChart = function (values) {

    for (var i = 0; i < chart.datasets[0].points.length; i++) {

        chart.datasets[0].points[i].value = values[i];
    }

    chart.update();

}







