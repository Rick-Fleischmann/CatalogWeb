
(function() {

    var appVar = angular.module("app");

    var MoviesController = function ($scope, $http) {

        $http({
            method: 'GET',
            url: 'http://vince.zapto.org//webAPI/api/movies'
        })
         .success(function (data) {
             console.log(data);
             $scope.movies = data;
         })
         .error(function (data, status) {
             console.log(data);
             window.alert('error');
         });
    };

    var  HomeController = function ($scope) {
    }

    var ErrorCtrl = function ($scope) {
    };

    appVar.controller("MoviesController", ["$scope", "$http", MoviesController]);
    appVar.controller("HomeController",  ["$scope", HomeController]);
    appVar.controller("ErrorCtrl",  ["$scope",ErrorCtrl]);

}());