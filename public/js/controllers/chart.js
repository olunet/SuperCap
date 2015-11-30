initializeChart = function ($scope, voltages) {
    $scope.chartData = [];

    for (var i = 0; i < voltages.length - 1; i++) {
        $scope.chartData.push({x: voltages[i]});
    }
    
    $scope.chartOptions = {
        lineMode: "cardinal",
        hideOverflow: true,
        drawDots: false,
        drawLegend: false,
        series: []
    };
    
    //Used to check if there's already a line for some input set
    $scope.chartOptions.inputSets = [];
    
    loadAxisTitles($scope);
    window.addEventListener('resize', function(event){
        loadAxisTitles($scope);
    });
};

loadAxisTitles = function ($scope) {
    setTimeout(function(){
      var axis = d3.select(".x.axis");
      var width = axis.node().getBBox().width;
      axis.append("text")
        .text("U/V")
        .attr("dy", 40)
        .attr("dx", width /2 )
        .attr("text-anchor","middle");

      axis = d3.select(".y.axis");
      var text = axis.append("text")
        .text("C / µC cm⁻²");
        
      var tWidth = 150;
      text.attr("dy", 15 )
        .attr("dx", -tWidth )
        .attr("text-anchor","start")
        .attr("transform","rotate(-90)")
        .text("C / µC cm⁻²");

    }, 100);
};

updateChartInputSet = function ($scope, inputSet) {
    //Update data values
    for (var i = 0; i < $scope.chartData.length; i++) {
        if(!isNaN(inputSet.data[i])) {
            $scope.chartData[i]["line" + inputSet.id] = inputSet.data[i];
        } else {
            $scope.chartData[i]["line" + inputSet.id] = 0;
            console.log("Something has gone wrong in calculations.");
        }
    }
    
    loadAxisTitles($scope);
    if($scope.chartOptions.inputSets["inputSet" +  inputSet.id]) {
       //There is already an entry for this input set, apply changes
       var phase = $scope.$root.$$phase;
       if(phase !== '$apply' && phase !== '$digest') {
            $scope.$apply();
       }
    } else {
        if(!inputSet.hidden) {
            //Add new chartOptions entry
            $scope.chartOptions.series.push(
                    {
                        y: "line" + inputSet.id,
                        label: "Line" + inputSet.id,
                        thickness: '3px',
                        color: $scope.colors[inputSet.id % $scope.colors.length]
                    });

            $scope.chartOptions.inputSets["inputSet" +  inputSet.id] = inputSet;

            var phase = $scope.$root.$$phase;
            if(phase !== '$apply' && phase !== '$digest') {
                $scope.$apply();
            }
        }
    }
};

removeInputSetFromChart = function($scope, inputSet) {
    //Find the chartoptions series element
    for(var i = 0; i < $scope.chartOptions.series.length; i++) {
        var series = $scope.chartOptions.series[i];
        
        if(series.y === "line" + inputSet.id) {
            //Remove the element
            var index = $scope.chartOptions.series.indexOf(series);
            if (index > -1) {
                $scope.chartOptions.series.splice(index, 1);
            }
            break;
        }   
    }
    
    //Also remove the chartoptions.inputsets element
    var value = $scope.chartOptions.inputSets["inputSet" + inputSet.id];
    if(value !== undefined) {
        delete $scope.chartOptions.inputSets["inputSet" + inputSet.id];
    }
    
    var phase = $scope.$root.$$phase;
    if(phase !== '$apply' && phase !== '$digest') {
         $scope.$apply();
    }
    
};