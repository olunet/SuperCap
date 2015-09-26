createChart = function() {
    
        var labels = [];
        var data = []
    
        for(var i = 0; i <= 20; i++) {
            labels.push(i);
            data.push(0);
        }
    
    	var data = {
                labels : labels,
		datasets : [
			{
				fillColor : "rgba(0, 0, 0,0.4)",
				strokeColor : "#444444",
				pointColor : "#fff",
				pointStrokeColor : "#444444",
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

refreshChart = function(anion, cation, electrolyte) {
        
        for(var i = 0; i < chart.datasets[0].points.length; i++) {
            
            var alt = i / 10;
            
            var val = Math.sin(cation * i) * 10 + Math.cos(anion * alt) * 7 + Math.sin(electrolyte * alt) * 12;

            chart.datasets[0].points[i].value = val;
        }
        
        chart.update();

}