initializeChart = function ($scope, voltages) {
    $scope.chartData = [];

    for (var i = 0; i < voltages.length; i++) {
        $scope.chartData.push({x: voltages[i]});
    }
    
    $scope.chartOptions = {
        lineMode: "bundle",
        hideOverflow: "true",
        series: []
    };
    
    //Used to check if there's already a line for some input set
    $scope.chartOptions.inputSets = [];

};

updateChart = function ($scope, inputSet) {
    //Update data values
    console.log($scope);
    for (var i = 0; i < $scope.chartData.length; i++) {
        $scope.chartData[i]["line" + inputSet.id] = inputSet.data[i];
    }
    
    if($scope.chartOptions.inputSets[inputSet.id]) {
       //There is already an entry for this input set, apply changes
       $scope.$apply();
    } else {
        //Add new chartOptions entry
        $scope.chartOptions.series.push(
                {
                    y: "line" + inputSet.id,
                    label: "Line" + inputSet.id,
                    color: $scope.colors[inputSet.id % $scope.colors.length]
                });
    
        $scope.chartOptions.inputSets[inputSet.id] = inputSet;
    }
    
};
