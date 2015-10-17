angular.module('SuperCap').controller('DataCtrl', function ($scope, DataService) {
    //List for storing multiple input sets
    $scope.inputSets = [];
    //Currently active input set
    $scope.activeInputSet; 
    //Add a new empty input set as the currently active input set.
    addNewInputSet();

    //Number of subdivisions on the X axis
    var numSteps = 21;
    //Minimum voltage on the X axis
    var min = -2;
    //Maximum voltage on the X axis
    var max = 2;
    //Calculate the size of 1 step on the X axis, equal to u1s
    var voltages = calculateVoltageSteps(min, max, numSteps);
    createChart(voltages);
    DataService.getAnions().then(function (response) {
        $scope.anions = response.data;
    });
    DataService.getCations().then(function (response) {
        $scope.cations = response.data;
    });
    DataService.getElectrodes().then(function (response) {
        $scope.electrodes = response.data;
    });
    $scope.inputChanged = function () {
        $scope.updateGraph();
    };
    $scope.anionChanged = function () {
        if ($scope.selectedAnion) {
            $("#a0CationSlider").value = $scope.selectedAnion.a0;
            document.getElementById("a0AnionValue").innerHTML = $scope.selectedAnion.a0;
            $("#gammaAnionSlider").value = $scope.selectedAnion.gamma;
            document.getElementById("gammaAnionValue").innerHTML = $scope.selectedAnion.gamma;
        }
        $scope.activeInputSet.anion = $scope.selectedAnion;
        updateInputSetHTML($scope.activeInputSet);
        $scope.updateGraph();
    };
    $scope.cationChanged = function () {
        if ($scope.selectedCation) {
            $("#a0CationSlider").value = $scope.selectedCation.a0;
            document.getElementById("a0CationValue").innerHTML = $scope.selectedCation.a0;
            $("#gammaCationSlider").value = $scope.selectedCation.gamma;
            document.getElementById("gammaCationValue").innerHTML = $scope.selectedCation.gamma;
        }
        $scope.activeInputSet.cation = $scope.selectedCation;
        updateInputSetHTML($scope.activeInputSet);    
        $scope.updateGraph();
    };
    $scope.electrodeChanged = function () {
        $scope.activeInputSet.electrode = $scope.selectedElectrode;
        updateInputSetHTML($scope.activeInputSet);
        $scope.updateGraph();
    };

    load3Dmodel();

    //Slider handling
    $("#epsilonSlider").on("input", function () {
        document.getElementById("epsilonValue").innerHTML = this.value;
        $scope.updateGraph();
    });
    $("#a0AnionSlider").on("input", function () {
        document.getElementById("a0AnionValue").innerHTML = this.value;
        $scope.updateGraph();
    });
    $("#a0CationSlider").on("input", function () {
        document.getElementById("a0CationValue").innerHTML = this.value;
        $scope.updateGraph();
    });
    $("#gammaAnionSlider").on("input", function () {
        document.getElementById("gammaAnionValue").innerHTML = this.value;
        $scope.updateGraph();
    });
    $("#gammaCationSlider").on("input", function () {
        document.getElementById("gammaCationValue").innerHTML = this.value;
        $scope.updateGraph();
    });
    $scope.updateGraph = function () {
        if ($scope.selectedAnion && $scope.selectedCation && $scope.selectedElectrode) {
            updateCalculations($scope.selectedAnion, $scope.selectedCation, $scope.selectedElectrode, voltages);
        }
    };

    $scope.addNewInputSet = function () {
        addNewInputSet()
    };
    function addNewInputSet() {
        var inputSet = new InputSet($scope.selectedAnion, $scope.selectedCation, $scope.selectedElectrode);
        $scope.inputSets.push(inputSet);
        addNewInputSetHTML(inputSet);
        
        $("#input-panel-" + inputSet.id).click(function () {
            switchToInputSet(inputSet);
        });

        setActiveInputSet(inputSet);

        return inputSet;
    }
    
    function switchToInputSet(inputSet) {
        setActiveInputSet(inputSet);

        $scope.selectedAnion = inputSet.anion;
        $scope.selectedCation = inputSet.cation;
        $scope.selectedElectrode = inputSet.electrode;

        if (inputSet.anion) {
            $("#a0CationSlider").value = inputSet.anion.a0;
            document.getElementById("a0AnionValue").innerHTML = inputSet.anion.a0;
            $("#gammaAnionSlider").value = inputSet.anion.gamma;
            document.getElementById("gammaAnionValue").innerHTML = inputSet.anion.gamma;
        }
        if (inputSet.cation) {
            $("#a0CationSlider").value = inputSet.cation.a0;
            document.getElementById("a0CationValue").innerHTML = inputSet.cation.a0;
            $("#gammaCationSlider").value = inputSet.cation.gamma;
            document.getElementById("gammaCationValue").innerHTML = inputSet.cation.gamma;
        }

        //Force update on the fields
        $scope.$apply()
    }

    function setActiveInputSet(inputSet) {
        $scope.activeInputSet = inputSet;
    }


    $scope.existingInputToSidebar = function (id, list) {
        if ($scope.selectedCation === undefined
                || $scope.selectedAnion === undefined
                || $scope.selectedElectrode === undefined) {
            alert("Please select anion, cation and electode.");
        } else {
            var anion = $scope.selectedAnion.label;
            var cation = $scope.selectedCation.label;
            var electrode = $scope.selectedElectrode.label;
            var input =
                    [
                        id,
                        $scope.selectedAnion,
                        $scope.selectedCation,
                        $scope.selectedElectrode,
                        Number(document.getElementById("epsilonValue").innerHTML),
                        Number(document.getElementById("a0AnionValue").innerHTML),
                        Number(document.getElementById("a0CationValue").innerHTML),
                        Number(document.getElementById("gammaAnionValue").innerHTML),
                        Number(document.getElementById("gammaCationValue").innerHTML)
                    ];
            $scope.inputs.push(input);

            var html2 = '<div id="printingInfo-'
                    + id +
                    '" class="printingInfo">' +
                    '<div>' +
                    '<div class = "panel panel-default col-xs-2 col-md-2">' +
                    '<table class = "table" style="font-size:70%">' +
                    '<tr>' +
                    '<td>Anion: ' + anion + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Cation: ' + cation + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Electorde: ' + electrode + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>E: ' + input[4] + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>a0 anion: ' + input[5] + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>a0 cation: ' + input[6] + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>y0 anion: ' + input[7] + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>y0 cation: ' + input[8] + '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            $("#printingInfo").append(html2);
            $("#input-panel-delete-" + id).click(function () {
                // Remove from sidebar
                $("#input-panel-" + id).remove();
                // Remove from printview
                $("#printingInfo-" + id).remove();
                list.splice(id, 1);
                console.log("Removing id " + id);
                // Remove from inputs.
                for (var i = id; i < $scope.inputs.length; i++) {
                    if ((($scope.inputs[i])[0]) === id) {
                        ($scope.inputs).splice(i, 1);
                    }
                }

                // Remove from sidebar list
                for (var i = id; i < list.length; i++) {
                    console.log("Reducing " + list[i] + " by 1");
                    $("#input-panel-" + id).attr('id', "input-panel-" + (i - 1));
                    list[i] = list[i] - 1;
                }
            }

            );
        }
    }
});

var inputSetIdCounter = 0;

var InputSet = function (anion, cation, electrode) {
    this.id = inputSetIdCounter++;
    this.anion = anion;
    this.cation = cation;
    this.electrode = electrode;

    return this;
};

function addNewInputSetHTML(inputSet) {
    var anionName = inputSet.anion !== undefined ? inputSet.anion.label : " ";
    var electrodeName = inputSet.electrode !== undefined ? inputSet.electrode.label : " ";
    var cationName = inputSet.cation !== undefined ? inputSet.cation.label : " ";

    var html = '<div id="input-panel-'
            + inputSet.id +
            '" class="input-panel">' +
            '<span id="input-panel-delete-'
            + inputSet.id + '" class="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>' +
            '<div class="text-center">' +
            '<h4 id="input-panel-text-' + inputSet.id + '">' +
            formatInput(anionName, cationName, electrodeName) +
            '</h4>' +
            '</div>' +
            '</div>';

    $("#input-panels").append(html);
};

function updateInputSetHTML(inputSet) {
    var anionName = inputSet.anion !== undefined ? inputSet.anion.label : " ";
    var electrodeName = inputSet.electrode !== undefined ? inputSet.electrode.label : " ";
    var cationName = inputSet.cation !== undefined ? inputSet.cation.label : " ";
    
    var inputPanelText = document.getElementById("input-panel-text-" + inputSet.id);
    inputPanelText.innerHTML = formatInput(anionName, cationName, electrodeName);
}

function formatInput(anionName, cationName, electrodeName) {
    return anionName + ' - ' + electrodeName + ' - ' + cationName;
}

function calculateVoltageSteps(min, max, numSteps) {
    var step = (max - min) / (numSteps - 1);
    var steps = [];
    for (var i = 0; i < numSteps; i++) {
        steps.push(Number(min + step * i).toFixed(1));
    }

    return steps;
};