/* global expect */
describe("DataService tests", function () {
    var DataService, httpBackend;

    beforeEach(module("SuperCap"));
    beforeEach(inject(function (_DataService_, $httpBackend) {
        DataService = _DataService_;
        httpBackend = $httpBackend;
    }));

    it("getAnions() should make GET-request", function () {
        httpBackend.whenGET("/api/anions").respond({mockAnion: "mockResponce"});
        var responseData;
        DataService.getAnions()
                .then(function (data) {
                    responseData = data;
                });

        httpBackend.flush();
        expect(responseData.status).toEqual(200);
    });
    
    it("getCations() should make GET-request", function () {
        httpBackend.whenGET("/api/cations").respond({mockCation: "mockResponce"});
        var responseData;
        DataService.getCations()
                .then(function (data) {
                    responseData = data;
                });

        httpBackend.flush();
        expect(responseData.status).toEqual(200);
    });
    
    it("getElectrodes() should make GET-request", function () {
        httpBackend.whenGET("/api/electrodes").respond({mockElectrode: "mockResponce"});
        var responseData;
        DataService.getElectrodes()
                .then(function (data) {
                    responseData = data;
                });

        httpBackend.flush();
        expect(responseData.status).toEqual(200);
    });
    
    it("getLiquids() should make GET-request", function () {
        httpBackend.whenGET("/api/liquids").respond({mockLiquid: "mockResponce"});
        var responseData;
        DataService.getLiquids()
                .then(function (data) {
                    responseData = data;
                });

        httpBackend.flush();
        expect(responseData.status).toEqual(200);
    });
});