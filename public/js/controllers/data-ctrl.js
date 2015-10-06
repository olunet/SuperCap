angular.module('SuperCap').controller('DataCtrl', function ($scope, DataService) {

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
        if ($scope.selectedAnion && $scope.selectedCation && $scope.selectedElectrode) {
            updateCalculations($scope.selectedAnion, $scope.selectedCation, $scope.selectedElectrode);
        }
    };
    
    var inputsList = [];
    $(document).ready(function() {
        $('#add-input-set').click(function() {
            addNewInputSet(inputsList.length, inputsList);
            inputsList.push(inputsList.length);
        });
    });

//    $scope.save = function(book) {
//        BookService.editBook(book).then(function(response) {
//            book = response.data;
//        })
//    }
//    $scope.createBook = function(newbook) {
//        BookService.addBook(newbook).then(function(response) {
//            $scope.books.push(newbook);
//        })
//    }

    createChart();
    load3Dmodel();
    
    //Slider handling
     $("#epsilonSlider").on("input", function(){
         document.getElementById("epsilonValue").innerHTML = this.value;
     });
     $("#a0AnionSlider").on("input", function(){
         document.getElementById("a0AnionValue").innerHTML = this.value;
     });
     $("#a0CationSlider").on("input", function(){
         document.getElementById("a0CationValue").innerHTML = this.value;
     });
     $("#gammaAnionSlider").on("input", function(){
         document.getElementById("gammaAnionValue").innerHTML = this.value;
     });
     $("#gammaCationSlider").on("input", function(){
         document.getElementById("gammaCationValue").innerHTML = this.value;
     });

     
    
});

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
       
}

function addNewInputSet(id, list) {
    var html = '<div id="input-panel-' + id + '" class="input-panel">' +
               'Si - Hg - BMIm' +
                '<span id="input-panel-delete-' + id + '" class="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>' +
            '</div>';
    $("#input-panels").append(html);
    $("#input-panel-delete-" + id).click(function(){
        $("#input-panel-" + id).remove();
        list.splice(id, 1);
        console.log("Removing id " + id);
        for(var i = id; i < list.length; i++) {
            console.log("Reducing " + list[i] + " by 1");
            $("#input-panel-" + id).attr('id', "input-panel-" + (i - 1));
            list[i] = list[i] - 1;
        }
    });
}