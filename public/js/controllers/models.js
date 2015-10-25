

/* global THREE */

var anion;
var cation;

function load3Dmodels() {
    
    anion = new GLmol('anionMol', true);
    
    anion.defineRepresentation = function () {
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
    
    cation = new GLmol('cationMol', true);
    
    cation.defineRepresentation = function () {
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
}

function loadAnion(xyz) {
    console.log(xyz);
    $("#anionMol_src").val(xyz);
    anion.loadMolecule();    
}

function loadCation(xyz) {
    $("#cationMol_src").val(xyz);
    cation.loadMolecule();
}
