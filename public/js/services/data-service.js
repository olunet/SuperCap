angular.module('SuperCap').service('DataService', function($http) {
    
    this.getAnions = function() {
        return $http({method:'GET', url:'/api/anions'});
    };
    
    this.getCations = function() {
        return $http({method:'GET', url:'/api/cations'});
    };
    
    this.getElectrolytes = function() {
        return $http({method:'GET', url:'/api/electrolytes'});
    };
    
//        this.editBook = function(book) {
//        return $http({method:'PUT', url:'/api/books/'+book._id, data:book});
//    }
//    this.addBook = function(book) {
//        return $http({method:'POST', url:'/api/books/', data:book});
//    }
    
});