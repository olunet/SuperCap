angular.module('SuperCap').controller('DataCtrl', function ($scope, DataService) {
    $scope.myCas = '';
    //All possible line colors
    $scope.colors = ["#ff0000", "#00ff00", "#0000ff", "#111111", "#ff6600", "#aa00aa", "#00aaaa"];
    $scope.colorNames = ["Red", "Green", "Blue", "Black", "Orange", "Purple", "Cyan"];
    //List for storing multiple input sets
    $scope.inputSets = [];
    //Currently active input set
    $scope.activeInputSet;
    //Number of subdivisions on the X axis
    var numSteps = 300 + 1;
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
        $scope.ionicliquids = response.data;
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
            $scope.activeInputSet.a0Anion = $scope.selectedAnion.a0;
            $scope.activeInputSet.gammaAnion = $scope.selectedAnion.gamma;
            $scope.updateAnionSliders($scope.activeInputSet);
            try {
                loadAnion($scope.selectedAnion.xyz);
            } catch (err) {

            }
        }
        $scope.activeInputSet.anion = $scope.selectedAnion;
        updateInputSetHTML($scope.activeInputSet);
        $scope.updateGraph();
    };
    $scope.cationChanged = function () {
        if ($scope.selectedCation) {
            if ($scope.activeInputSet.cation === undefined) {
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
                if ($scope.anions[i].label === $scope.selectedLiquid.anionname) {
                    foundAnion = true;
                    casanion = $scope.anions[i];
                    break;
                }
            }
            for (var i = 0; i < $scope.cations.length; i++) {
                if ($scope.cations[i].label === $scope.selectedLiquid.cationname) {
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
            for (var i = 0; i < $scope.ionicliquids.length; i++) {
                if ($scope.selectedCation.label === $scope.ionicliquids[i].cationlabel
                        && $scope.selectedAnion.label === $scope.ionicliquids[i].anionlabel
                        && $scope.ionicliquids[i].e !== undefined) {

                    try {
                        $scope.ionicliquids[i].e === 1.6;
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
    document.getElementById("epsilonValue").innerHTML = Number(Math.pow(Math.E, 0.5)).toFixed(3);

    $("#epsilonSlider").on("input", function () {
        document.getElementById("epsilonValue").innerHTML = Number(Math.pow(Math.E, this.value / 4)).toFixed(3);
        
        $scope.activeInputSet.e = Math.pow(Math.E, this.value / 4);
        $scope.updateGraph();
    });
    $("#a0AnionSlider").on("input", function () {
        document.getElementById("a0AnionValue").innerHTML = this.value;
        if ($scope.activeInputSet) {
            $scope.activeInputSet.a0Anion = this.value;
        }
        $scope.updateGraph();
    });
    $("#a0CationSlider").on("input", function () {
        document.getElementById("a0CationValue").innerHTML = this.value;
        if ($scope.activeInputSet) {
            $scope.activeInputSet.a0Cation = this.value;
        }
        $scope.updateGraph();
    });
    $("#gammaAnionSlider").on("input", function () {
        document.getElementById("gammaAnionValue").innerHTML = this.value;
        if ($scope.activeInputSet) {
            $scope.activeInputSet.gammaAnion = this.value;
        }
        $scope.updateGraph();
    });
    $("#gammaCationSlider").on("input", function () {
        document.getElementById("gammaCationValue").innerHTML = this.value;
        if ($scope.activeInputSet) {
            $scope.activeInputSet.gammaCation = this.value;
        }
        $scope.updateGraph();
    });

    $scope.updateAnionSliders = function (inputSet) {
        document.getElementById("a0AnionSlider").value = inputSet.a0Anion;
        document.getElementById("a0AnionValue").innerHTML = inputSet.a0Anion;
        document.getElementById("gammaAnionSlider").value = inputSet.gammaAnion;
        document.getElementById("gammaAnionValue").innerHTML = inputSet.gammaAnion;
    }

    $scope.updateCationSliders = function (inputSet) {
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
        var inputSet = new InputSet($scope.selectedAnion, $scope.selectedCation, $scope.selectedElectrode, 1.649);
        if ($scope.activeInputSet) {
            inputSet.a0Anion = $scope.activeInputSet.a0Anion;
            inputSet.a0Cation = $scope.activeInputSet.a0Cation;
            inputSet.gammaAnion = $scope.activeInputSet.gammaAnion;
            inputSet.gammaCation = $scope.activeInputSet.gammaCation;
        }
        inputSet.color = $scope.colors[inputSet.id % $scope.colors.length];
        $scope.inputSets.push(inputSet);
        addNewInputSetHTML(inputSet);
        $("#input-panel-" + inputSet.id).click(function () {
            $scope.switchToInputSet(inputSet);
        });
        $("#input-panel-remove-" + inputSet.id).click(function (event) {
            event.stopPropagation();
            $scope.removeInputSet(inputSet);
        });
        $("#input-panel-toggle-" + inputSet.id).click(function (event) {
            event.stopPropagation();
            $scope.toggleInputSet(inputSet);
        });
        setActiveInputSet(inputSet);
        return inputSet;
    }

    $scope.switchToInputSet = function (inputSet) {
        switchToInputSet(inputSet);
    };
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
        document.getElementById("epsilonValue").innerHTML = Number(inputSet.e).toFixed(3);

        var phase = $scope.$root.$$phase;
        if (phase !== '$apply' && phase !== '$digest') {
            $scope.$apply();
        }
    }

    $scope.toggleInputSet = function(inputSet) {
        toggleInputSet(inputSet);
    };
    
    function toggleInputSet(inputSet) {
        var glyphiconElement = $("#input-panel-toggle-" + inputSet.id);
        
        if(glyphiconElement.hasClass("glyphicon-eye-open")) {
            //Hiding the input set
            hideInputSet(inputSet);
        } else {
            //Unhiding the input set
            unhideInputSet(inputSet);
        }
        
        glyphiconElement.toggleClass("glyphicon-eye-open");
        glyphiconElement.toggleClass("glyphicon-eye-close");
        
    }

    function hideInputSet(inputSet) {
        inputSet.hidden = true;
        removeInputSetFromChart($scope, inputSet);
    }
    
    function unhideInputSet(inputSet) {
        inputSet.hidden = false;
        updateChartInputSet($scope, inputSet);
    }


    $scope.removeInputSet = function (inputSet) {
        removeInputSet(inputSet);
    };
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
        removeInputSetFromChart($scope, inputSet);

        //Switch active inputset to the first inputset
        console.log($scope.inputSets[0]);
        $scope.switchToInputSet($scope.inputSets[0]);
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
                if(inputSet.hidden) {
                    continue;
                }
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
                        '" class="printingInfo col-xs-12">' +
                        '<div>' +
                        '<div class = "panel panel-default col-xs-8 col-md-8">' +
                        '<table class = "table" style="font-size:70%">' +
                        '<tr>' +
                        '<td>Anion: ' + anion + '</td>' +
                        '<td>Cation: ' + cation + '</td>' +
                        '<td>Electrode: ' + electrode + '</td>' +
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
    
    $scope.export = function () {
        
        var name = "";
        var data = "";
        var printSeparator = false;
        
        for (var i = 0; i < $scope.inputSets.length; i++) {
                var inputSet = $scope.inputSets[i];
                if(inputSet.hidden) {
                    continue;
                }
                
                if(printSeparator) {
                    name += "_|_";
                    data += "\r\n";
                }
                printSeparator = true;
                
                name += inputSet.cation.label + "_";
                name += inputSet.anion.label + "_";
                name += inputSet.electrode.label;
                data += "Color: " + $scope.colorNames[i % $scope.colorNames.length] + "\r\n";
                data += "Cation: " + inputSet.cation.label + "\r\n";   
                data += "Anion: " + inputSet.anion.label + "\r\n";                   
                data += "Electrode: " + inputSet.electrode.label + "\r\n";
                data += "a0Cation: " + inputSet.a0Cation + "\r\n";
                data += "a0Anion: " + inputSet.a0Anion + "\r\n";         
                data += "gammaCation: " + inputSet.gammaCation + "\r\n";
                data += "gammaAnion: " + inputSet.gammaAnion + "\r\n";
                data += "e: " + inputSet.e + "\r\n";
        }
        
        $("svg").attr({version: '1.1', xmlns: "http://www.w3.org/2000/svg"});
        saveAs(new Blob([$("svg")[0].parentNode.innerHTML], {type:"image/svg+xml"}), name + ".svg");
        
        name += "_data";
        saveAs(new Blob([data], {type:"text/plain;charset=utf-8"}), name + ".txt")      
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
            '<span id="input-panel-toggle-' + inputSet.id + '" class="glyphicon glyphicon-eye-open pull-right" aria-hidden="true"></span>' +
            '<div class="text-center">' +
            '<div class="legend-color-indicator" style="background-color:' + inputSet.color + ';"></div>' +
            '<h5 id="input-panel-text-' + inputSet.id + '">' +
            formatInput(anionName, cationName, electrodeName) +
            '</h5>' +
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
    return cationName + ' - ' + anionName + ' - ' + electrodeName;
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