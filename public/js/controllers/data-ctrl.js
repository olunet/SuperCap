angular.module('SuperCap').controller('DataCtrl', function ($scope, DataService) {
    $scope.myCas = '';
    //All possible line colors
    $scope.colors = ["#ff0000", "#00ff00", "#0000ff", "#111111", "#ff6600", "#aa00aa", "#00aaaa"];
    //List for storing multiple input sets
    $scope.inputSets = [];
    //Currently active input set
    $scope.activeInputSet;
    //Number of subdivisions on the X axis
    var numSteps = 100 + 1;
    //Minimum voltage on the X axis
    var min = -20;
    //Maximum voltage on the X axis
    var max = 20;
    //Calculate the size of 1 step on the X axis, equal to u1s
    var voltages = calculateVoltageSteps(min, max, numSteps);
    initializeChart($scope, voltages);
    //Add a new empty input set as the currently active input set.
    addNewInputSet();
    DataService.getLiquids().then(function (response) {
        $scope.liquids = response.data;
    });
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
    };
    $scope.anionChanged = function () {
        if ($scope.selectedAnion) {
            if($scope.activeInputSet.anion === undefined) {
                $scope.activeInputSet.a0Anion = $scope.selectedAnion.a0;
                $scope.activeInputSet.gammaAnion = $scope.selectedAnion.gamma;
                $scope.updateAnionSliders($scope.activeInputSet);
            }
            try {
                loadAnion($scope.selectedAnion.xyz);
            } catch (err) {

            }
        };
        $scope.activeInputSet.anion = $scope.selectedAnion;
        updateInputSetHTML($scope.activeInputSet);
        $scope.updateGraph();
    };
    $scope.cationChanged = function () {
        if ($scope.selectedCation) {
            if($scope.activeInputSet.cation === undefined) {
                $scope.activeInputSet.a0Cation = $scope.selectedCation.a0;
                $scope.activeInputSet.gammaCation = $scope.selectedCation.gamma;
                $scope.updateCationSliders($scope.activeInputSet);
            }
            try {
                loadCation($scope.selectedCation.xyz);
            } catch (err) {

            }
            ;
        }
        $scope.activeInputSet.cation = $scope.selectedCation;
        updateInputSetHTML($scope.activeInputSet);
        $scope.updateGraph();
    };
    $scope.emptifyCas = function () {
        $scope.myCas = '';
    };
    $scope.$watch('myCas', function (val, old) {
        if (angular.isObject(val)) {
            $scope.selectedLiquid = val;
            $scope.casChanged();
        } else {
            $scope.selectedLiquid = val;
        }
    }
    );
    $scope.casChanged = function () {
        if ($scope.selectedLiquid) {
            var foundAnion = false;
            var foundCation = false;
            var casanion = '';
            var cascation = '';
            for (var i = 0; i < $scope.anions.length; i++) {
                if ($scope.anions[i].label === $scope.selectedLiquid.anionlabel) {
                    foundAnion = true;
                    casanion = $scope.anions[i];
                    break;
                }
            }
            for (var i = 0; i < $scope.cations.length; i++) {
                if ($scope.cations[i].label === $scope.selectedLiquid.cationlabel) {
                    foundCation = true;
                    cascation = $scope.cations[i];
                    break;
                }
            }
            if ((foundCation === false) || (foundAnion === false)) {
                console.log("Selected CAS-number does not match with anion/cation dataset");
            } else {
                $scope.selectedAnion = casanion;
                $scope.selectedCation = cascation;
                $scope.anionChanged();
                $scope.cationChanged();
                $scope.needToGenerateData();
            }
        }
    };
    $scope.electrodeChanged = function () {
        $scope.activeInputSet.electrode = $scope.selectedElectrode;
        updateInputSetHTML($scope.activeInputSet);
        $scope.updateGraph();
    };
    try {
        load3Dmodels();
    } catch (err) {

    }

    $scope.needToGenerateData = function () {
        if ($scope.selectedAnion && $scope.selectedCation
                && $scope.selectedElectrode) {
            var need = true;
            for (var i = 0; i < $scope.liquids.length; i++) {
                if ($scope.selectedCation.label === $scope.liquids[i].cationlabel
                        && $scope.selectedAnion.label === $scope.liquids[i].anionlabel
                        && $scope.liquids[i].e !== undefined) {

                    try {
                        $scope.liquids[i].e === 1.6;
                    } catch (err) {

                    }
                    need = false;
                    break;
                }
            }
            if (need === true) {
                BootstrapDialog.show({
                    message: 'There is no data for the given cation/anion pair in the database.',
                    buttons: [{
                            icon: 'glyphicon glyphicon-send',
                            label: 'Simulate fake calculating process.',
                            cssClass: 'btn-primary',
                            autospin: true,
                            action: function (dialogRef) {
                                var $button = this;
                                $button.disable();
                                dialogRef.setClosable(true);
                                dialogRef.getModalBody().html('Data will be calculated in 5 minutes.');
                                setTimeout(function () {
                                    dialogRef.close();
                                }, 5000 * 12 * 5);
                            }
                        }, {
                            label: 'Abort calculations',
                            action: function (dialogRef) {
                                dialogRef.close();
                            }
                        }]
                });
            }
        }
    };


    //Slider handling
    $("#epsilonSlider").on("input", function () {
        document.getElementById("epsilonValue").innerHTML = this.value;
        $scope.activeInputSet.e = this.value;
        $scope.updateGraph();
    });
    $("#a0AnionSlider").on("input", function () {
        document.getElementById("a0AnionValue").innerHTML = this.value;
        if($scope.activeInputSet) {
            $scope.activeInputSet.a0Anion = this.value;
        }
        $scope.updateGraph();
    });
    $("#a0CationSlider").on("input", function () {
        document.getElementById("a0CationValue").innerHTML = this.value;
        if($scope.activeInputSet) {
            $scope.activeInputSet.a0Cation = this.value;
        }
        $scope.updateGraph();
    });
    $("#gammaAnionSlider").on("input", function () {
        document.getElementById("gammaAnionValue").innerHTML = this.value;
        if($scope.activeInputSet) {
            $scope.activeInputSet.gammaAnion = this.value;
        }
        $scope.updateGraph();
    });
    $("#gammaCationSlider").on("input", function () {
        document.getElementById("gammaCationValue").innerHTML = this.value;
        if($scope.activeInputSet) {
            $scope.activeInputSet.gammaCation = this.value;
        }
        $scope.updateGraph();
    });
    
    $scope.updateAnionSliders = function(inputSet) {
        document.getElementById("a0AnionSlider").value = inputSet.a0Anion;
        document.getElementById("a0AnionValue").innerHTML = inputSet.a0Anion;
        document.getElementById("gammaAnionSlider").value = inputSet.gammaAnion;
        document.getElementById("gammaAnionValue").innerHTML = inputSet.gammaAnion; 
    }
    
    $scope.updateCationSliders = function(inputSet) {
        document.getElementById("a0CationSlider").value = inputSet.a0Cation;
        document.getElementById("a0CationValue").innerHTML = inputSet.a0Cation;
        document.getElementById("gammaCationSlider").value = inputSet.gammaCation;
        document.getElementById("gammaCationValue").innerHTML = inputSet.gammaCation; 
    }
    
    $scope.updateGraph = function () {
        if ($scope.activeInputSet && $scope.selectedAnion && $scope.selectedCation && $scope.selectedElectrode) {
            updateCalculations($scope.activeInputSet, voltages);
            updateChartInputSet($scope, $scope.activeInputSet);
        }
    };
    $scope.addNewInputSet = function () {
        addNewInputSet();
    };
    function addNewInputSet() {
        $scope.myCas = '';
        var inputSet = new InputSet($scope.selectedAnion, $scope.selectedCation, $scope.selectedElectrode, 1.6);
        if($scope.activeInputSet) {
            inputSet.a0Anion = $scope.activeInputSet.a0Anion;
            inputSet.a0Cation = $scope.activeInputSet.a0Cation;
            inputSet.gammaAnion = $scope.activeInputSet.gammaAnion;
            inputSet.gammaCation = $scope.activeInputSet.gammaCation;
        }
        $scope.inputSets.push(inputSet);
        addNewInputSetHTML(inputSet);
        $("#input-panel-" + inputSet.id).click(function () {
            switchToInputSet(inputSet);
        });
        $("#input-panel-remove-" + inputSet.id).click(function (event) {
            event.stopPropagation();
            removeInputSet(inputSet);
        });
        setActiveInputSet(inputSet);
        return inputSet;
    }

    function switchToInputSet(inputSet) {
        setActiveInputSet(inputSet);
        $scope.selectedAnion = inputSet.anion;
        $scope.selectedCation = inputSet.cation;
        $scope.selectedElectrode = inputSet.electrode;
        $scope.updateAnionSliders(inputSet);
        $scope.updateCationSliders(inputSet);
        if (inputSet.anion) {
            try {
                loadAnion($scope.selectedAnion.xyz);
            } catch (err) {

            }
            ;
        }
        if (inputSet.cation) {
            try {
                loadCation($scope.selectedCation.xyz);
            } catch (err) {

            }
            ;
        }
        document.getElementById("epsilonSlider").value = inputSet.e;
        document.getElementById("epsilonValue").innerHTML = inputSet.e; 
        
    }

    function removeInputSet(inputSet) {
        if ($scope.inputSets.length <= 1) {
            //Don't allow removal if it's the last input set left.
            return;
        }
        //Remove the HTML element
        removeInputSetHTML(inputSet);

        //Remove it from input sets array
        var index = $scope.inputSets.indexOf(inputSet);
        if (index > -1) {
            $scope.inputSets.splice(index, 1);
        }

        //Remove it from the chart
        removeInputSetFromChart($scope, inputSet)

        //Switch active inputset to the first inputset
        console.log($scope.inputSets[0]);
        switchToInputSet($scope.inputSets[0]);
    }

    function setActiveInputSet(inputSet) {
        if ($scope.activeInputSet) {
            $("#input-panel-" + $scope.activeInputSet.id).toggleClass("input-panel-active");
        }
        $scope.activeInputSet = inputSet;
        $("#input-panel-" + inputSet.id).toggleClass("input-panel-active");
    }

    $scope.printInputSets = function () {
        try {
            var html = '<div class="container">';
            for (var i = 0; i < $scope.inputSets.length; i++) {
                var inputSet = $scope.inputSets[i];
                // console.log(inputSet);
                var anion = inputSet.anion.label;
                var cation = inputSet.cation.label;
                var electrode = inputSet.electrode.label;
                var a0Anion = inputSet.a0Anion;
                var a0Cation = inputSet.a0Cation;
                var gammaAnion = inputSet.gammaAnion;
                var gammaCation = inputSet.gammaCation;
                var epsilon = inputSet.e;
                var htmlInputSet = '<div class="col-xs-12">' +
                        '<div id="printingInfo-'
                        + i +
                        '" class="printingInfo">' +
                        '<div>' +
                        '<div class = "panel panel-default col-xs-2 col-md-2">' +
                        '<table class = "table" style="font-size:70%">' +
                        '<tr>' +
                        '<td>Anion: ' + anion + '</td>' +
                        '<td>Cation: ' + cation + '</td>' +
                        '<td>Electorde: ' + electrode + '</td>' +
                        '<td>E: ' + epsilon + '</td>' +
                        '<td>a0 anion: ' + a0Anion + '</td>' +
                        '<td>a0 cation: ' + a0Cation + '</td>' +
                        '<td>y0 anion: ' + gammaAnion + '</td>' +
                        '<td>y0 cation: ' + gammaCation + '</td>' +
                        '</tr>' +
                        '</table>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="clear-fix"></div>';
                html += htmlInputSet;
            }
            html += '</div>';
            $("#printingInfo").empty();
            $("#printingInfo").append(html);
            window.print();
        } catch (err) {
            alert("Please select anion, cation and electrode or insert CAS-number.");
        }
    };

    $scope.exportPDF = function () {
        var html = '<div class="container">';
        for (var i = 0; i < $scope.inputSets.length; i++) {
            var inputSet = $scope.inputSets[i];
            var anion = inputSet.anion.label;
            var cation = inputSet.cation.label;
            var electrode = inputSet.electrode.label;
            var a0Anion = inputSet.a0Anion;
            var a0Cation = inputSet.a0Cation;
            var gammaAnion = inputSet.gammaAnion;
            var gammaCation = inputSet.gammaCation;
            var epsilon = inputSet.e;
            var htmlInputSet = '<div class="col-xs-12">' +
                    '<div id="printingInfo-'
                    + i +
                    '" class="printingInfo">' +
                    '<div>' +
                    '<div class = "panel panel-default col-xs-2 col-md-2">' +
                    '<table class = "table" style="font-size:70%">' +
                    '<tr>' +
                    '<td>Anion: ' + anion + '</td>' +
                    '<td>Cation: ' + cation + '</td>' +
                    '<td>Electorde: ' + electrode + '</td>' +
                    '<td>E: ' + epsilon + '</td>' +
                    '<td>a0 anion: ' + a0Anion + '</td>' +
                    '<td>a0 cation: ' + a0Cation + '</td>' +
                    '<td>y0 anion: ' + gammaAnion + '</td>' +
                    '<td>y0 cation: ' + gammaCation + '</td>' +
                    '</tr>' +
                    '</table>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="clear-fix"></div>';
            html += htmlInputSet;
        }
        html += '</div>';

        $("#exportInfo").append(html);
        $("#exportParent").removeClass("hidden");
        $("#sidebar-wrapper").addClass("hidden");
        $("#inputContainer").addClass("hidden");
        $("#slidersContainer").addClass("hidden");
        //$("#anionParent").addClass("hidden");  
        //$("#cationParent").addClass("hidden");

        html2canvas(document.body, {
            onrendered: function (canvas) {
                var dataURL = canvas.toDataURL();
                var link = document.createElement('a');
                link.download = "SuperCap";
                link.href = dataURL;
                link.click();
            },
        });

        $("#exportInfo").empty();
        $("#sidebar-wrapper").removeClass("hidden");
        $("#inputContainer").removeClass("hidden");
        //$("#anionMol_src").addClass("hidden");
        //$("#cationMol_src").addClass("hidden");
        // $("#cationParent").removeClass("hidden");
        //$("#anionParent").removeClass("hidden");
        $("#slidersContainer").removeClass("hidden");
        $("#exportParent").addClass("hidden");

    };
});


var inputSetIdCounter = 0;
var InputSet = function (anion, cation, electrode, e) {
    this.id = inputSetIdCounter++;
    this.anion = anion;
    this.cation = cation;
    this.electrode = electrode;
    this.a0Anion;
    this.gammaAnion;
    this.a0Cation;
    this.gammaCation;
    this.e = e;
    return this;
};
function addNewInputSetHTML(inputSet) {
    var anionName = inputSet.anion !== undefined ? inputSet.anion.label : " ";
    var electrodeName = inputSet.electrode !== undefined ? inputSet.electrode.label : " ";
    var cationName = inputSet.cation !== undefined ? inputSet.cation.label : " ";
    var html = '<div id="input-panel-'
            + inputSet.id +
            '" class="input-panel">' +
            '<span id="input-panel-remove-'
            + inputSet.id + '" class="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>' +
            '<div class="text-center">' +
            '<h4 id="input-panel-text-' + inputSet.id + '">' +
            formatInput(anionName, cationName, electrodeName) +
            '</h4>' +
            '</div>' +
            '</div>';
    $("#input-panels").append(html);
}
;
function updateInputSetHTML(inputSet) {
    var anionName = inputSet.anion !== undefined ? inputSet.anion.label : " ";
    var electrodeName = inputSet.electrode !== undefined ? inputSet.electrode.label : " ";
    var cationName = inputSet.cation !== undefined ? inputSet.cation.label : " ";
    var inputPanelText = document.getElementById("input-panel-text-" + inputSet.id);
    inputPanelText.innerHTML = formatInput(anionName, cationName, electrodeName);
}

function removeInputSetHTML(inputSet) {
    var element = document.getElementById('input-panel-' + inputSet.id);
    element.parentElement.removeChild(element);
}

function toggleHighlightOnInputSet(inputSet) {
    var panel = document.getElementById("input-panel" + inputSet.id);
    $("#input-panel-" + inputSet.id).toggleClass("input-panel-active");
}


function formatInput(anionName, cationName, electrodeName) {
    return anionName + ' - ' + electrodeName + ' - ' + cationName;
}

function calculateVoltageSteps(min, max, numSteps) {
    var step = (max - min) / (numSteps - 1);
    var steps = [];
    for (var i = 0; i < numSteps; i++) {
        steps.push(Number(min + step * i));
    }

    return steps;
}
;