angular.module('SuperCap').controller('DataCtrl', function ($scope, DataService) {

    DataService.getAnions().then(function (response) {
        $scope.anions = response.data;
    });

    DataService.getCations().then(function (response) {
        $scope.cations = response.data;
    });

    DataService.getElectrolytes().then(function (response) {
        $scope.electrolytes = response.data;
    });


    $scope.inputChanged = function() {
        if($scope.selectedAnion && $scope.selectedCation && $scope.selectedElectrolyte) {
            refreshChart($scope.selectedAnion, $scope.selectedCation, $scope.selectedElectrolyte);
        }
    };


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
});