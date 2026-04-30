/// <reference path="template/_shared/ContractWidget.html" />
var baseDirective = angular.module('baseDirective', []);

//Used to sort any object, great for table headers.
//<th class="leftBorder" sort by="order" reverse="reverse" order="'ACCOUNT'">ACCOUNT</th>
//<tr ng-repeat="row in Invoices | orderBy:order:reverse">
baseDirective.directive("sort", function () {
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