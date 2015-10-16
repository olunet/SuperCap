angular.module('SuperCap').controller('DataCtrl', function ($scope, DataService) {
    // List for storing multiple inputs
    $scope.inputs = [];
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
        $scope.updateGraph();
    };
    $scope.cationChanged = function () {
        if ($scope.selectedCation) {
            $("#a0CationSlider").value = $scope.selectedCation.a0;
            document.getElementById("a0CationValue").innerHTML = $scope.selectedCation.a0;
            $("#gammaCationSlider").value = $scope.selectedCation.gamma;
            document.getElementById("gammaCationValue").innerHTML = $scope.selectedCation.gamma;
        }
        $scope.updateGraph();
    };
    $scope.electrodeChanged = function () {
        $scope.updateGraph();
    };
    var inputsList = [];
    $(document).ready(function () {
        $('#add-input-set').click(function () {

            $scope.existingInputToSidebar(inputsList.length, inputsList);
            inputsList.push(inputsList.length);
        });
    });
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
    }

    $scope.existingInputToSidebar = function (id, list) {
        console.log($scope.selectedCation === undefined);
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

            var html = '<div id="input-panel-'
                    + id +
                    '" class="input-panel">' +
                    '<span id="input-panel-delete-'
                    + id + '" class="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>' +
                    '<a href="">' +
                    '<div>' +
                    '<div class="btn btn-default btn-lg center-block">' +
                    anion + ' - ' + cation + ' - ' + electrode
                    + '</div>' +
                    '</div>' +
                    '</a>' +
                    '</div>';
            $("#input-panels").append(html);
            $("#input-panel-delete-" + id).click(function () {
                $("#input-panel-" + id).remove();
                list.splice(id, 1);
                console.log("Removing id " + id);

                // Remove from inputs.
                for (var i = id; i < $scope.inputs.length; i++) {
                    if ((($scope.inputs[i])[0]) === id) {
                        ($scope.inputs).splice(i, 1);
                    }
                }

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
calculateVoltageSteps = function (min, max, numSteps) {
    var step = (max - min) / (numSteps - 1);
    var steps = [];
    for (var i = 0; i < numSteps; i++) {
        steps.push(Number(min + step * i).toFixed(1));
    }

    return steps;
}

function load3Dmodel() {
    var glmol = new GLmol('glmol', true);
    glmol.defineRepresentation = function () {
        var all = this.getAllAtoms();
        var hetatm = this.removeSolvents(this.getHetatms(all));
        this.colorByAtom(all, {});
        this.colorByChain(all);
        var asu = new THREE.Object3D();
        this.drawBondsAsStick(asu, hetatm, this.cylinderRadius, this.cylinderRadius);
        this.drawBondsAsStick(asu, this.getResiduesById(this.getSidechains(this.getChain(all, ['A'])), [58, 87]), this.cylinderRadius, this.cylinderRadius);
        this.drawBondsAsStick(asu, this.getResiduesById(this.getSidechains(this.getChain(all, ['B'])), [63, 92]), this.cylinderRadius, this.cylinderRadius);
        this.drawCartoon(asu, all, this.curveWidth, this.thickness);
        this.drawSymmetryMates2(this.modelGroup, asu, this.protein.biomtMatrices);
        this.modelGroup.add(asu);
    };
    $.get("molecule.xyz", function (ret) {
        $("#glmol_src").val(ret);
        glmol.loadMolecule();
    });
    window.addEventListener('resize', function () {
        //console.log($("#inputContainer").height());
    }, true);
}
