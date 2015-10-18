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


}

createNewChart = function (inputSet) {

}


refreshChart = function (values) {

}

