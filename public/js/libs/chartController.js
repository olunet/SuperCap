refreshChart = function(anion, cation, electrolyte) {
        var labels = [];
        var data = [];
        
        for(var i = 0; i <= 20; i++) {
            labels.push(i);
            
            var alt = i / 10;
            
            var val = Math.sin(cation * i) * 10 + Math.cos(anion * alt) * 7 + Math.sin(electrolyte * alt) * 12;
            
            
            data.push(val);
        }
        
        console.log(data);
 
	var data = {
		labels : labels,
		datasets : [
			{
				fillColor : "rgba(0, 0, 0,0.4)",
				strokeColor : "#444444",
				pointColor : "#fff",
				pointStrokeColor : "#444444",
				data : data
			}
		]
	}

	var context = document.getElementById('chart').getContext('2d');
	new Chart(context).Line(data);

}