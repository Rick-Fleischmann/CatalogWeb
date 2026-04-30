'use strict';
// Code goes here
(function() {

// Declares how the application should be bootstrapped. See: http://docs.angularjs.org/guide/module
    var appVar = angular.module('app', ['ui.router']);

    appVar.config(['$stateProvider',
        function ($stateProvider) {
            // our routers
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: './View/Home.html',
                    controller: 'HomeController'
                })
                .state('orchestrationbrowse', {
                   url: '/OrchestrationBrowse',
                   templateUrl: './View/OrchestrationBrowse.html',
                   controller: 'OrchestrationBrowseController'
                })
               .state('sheetmusbrowse', {
                   url: '/SheetMusBrowse',
                   templateUrl: './View/SheetMusBrowse.html',
                   controller: 'SheetMusBrowseController'
               })
              .state('solosbrowse', {
                    url: '/SolosBrowse',
                    templateUrl: './View/SolosBrowse.html',
                    controller: 'SolosBrowseController'
              })
              .state('silentbrowse', {
                  url: '/SilentBrowse',
                  templateUrl: './View/SilentBrowse.html',
                  controller: 'SilentBrowseController'
              })
              .state('pianorolbrowse', {
                  url: '/PianorolBrowse',
                  templateUrl: './View/PianorolBrowse.html',
                  controller: 'PianorolBrowseController'
              })
              .state('prpbrowse', {
                  url: '/PrpBrowse',
                  templateUrl: './View/PrpBrowse.html',
                  controller: 'PrpBrowseController'
              })
             .state('trakcsbrowse', {
                 url: '/TracksBrowse',
                 templateUrl: './View/TracksBrowse.html',
                 controller: 'TracksBrowseController'
             })
              .state('78browse', {
                  url: '/78Browse',
                  templateUrl: './View/78Browse.html',
                  controller: '78BrowseController'
              })
                .state('otherwise', {
                    url: '*path',
                    templateUrl: '/View/Home.html',
                    controller: 'HomeController'
        });
    }]);

    //appVar.config(['$httpProvider', function ($httpProvider) {
    //    //Reset headers to avoid OPTIONS request (aka preflight)
    //    $httpProvider.defaults.headers.common = {};
    //    $httpProvider.defaults.headers.post = {};
    //    $httpProvider.defaults.headers.put = {};
    //    $httpProvider.defaults.headers.patch = {};
    //}]);

    appVar.directive("sort", function () {
        return {
            restrict: 'A',
            transclude: true,
            template:
              '<a class="table-header-sort" ng-click="onClick()">' +
                '<span ng-transclude></span>' +
                ' <i class="fa" ng-class="{\'fa-caret-down\' : order === by && !reverse,  \'fa-caret-up\' : order===by && reverse}"></i>' +
              '</a>',
            scope: {
                order: '=',
                by: '=',
                reverse: '='
            },
            link: function (scope, element, attrs) {
                scope.onClick = function () {
                    if (scope.order === scope.by) {
                        scope.reverse = !scope.reverse
                    } else {
                        scope.by = scope.order;
                        scope.reverse = false;
                    }
                }
            }
        }
    });

}());