angular.module('VirtualBook').service('BookService', function($http) {
    this.getBooks = function() {
        return $http({method:'GET', url:'/api/books'});
    }
    this.editBook = function(book) {
        return $http({method:'PUT', url:'/api/books/'+book._id, data:book});
    }
    this.addBook = function(book) {
        return $http({method:'POST', url:'/api/books/', data:book});
    }
});