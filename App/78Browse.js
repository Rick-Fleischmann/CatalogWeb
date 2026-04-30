

(function() {

    var appVar = angular.module("app");
 
    appVar.controller("78BrowseController", ["$scope", "$http", function ($scope, $http) {

        $scope.GetIndexFromObjectElement = function (obj, keyName, keyValue) {
            var newIndex = null;
            angular.forEach(obj, function (key, index) {
                if (key[keyName] === keyValue) newIndex = index;
            });
            return newIndex;
        };

        $scope.SORT_BY = 'TITLE'; // set the default sort type
        $scope.row_start = 1;
        $scope.row_display_end = 0;
        $scope.total_rows = 0;

        $scope.sortFields = ['TITLE', 'CATNUM', 'PERFORMERS1', 'PERFORMERS2', 'COMPANY', 'COMPOSERS1', 'PRODTITLE', 'LYRICISTS1', 'PUBLISHER', 'COMPOSERS2', 'COMPOSERS3', 'COMPOSERS4'];

        $scope.filterValues = {
            TITLE: '',
            CATNUM: '',
            COMP_LYR: '',
            PERFORMER: '',
            PUBLISHER: '',
            ARRANGTYPE: '',
            PRODTYPE: '',
            PRODTITLE: '',
            NOTES: '',
            COMPANY: '',
            RECDAY: '',
            RECMONTH: '',
            RECYEAR: '',
            LOCATION: '',
            PICTURE: '',
            SEARCHBOX: ''
        };

        $scope.SORT_BY = 'TITLE'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order


        $scope.ClearFilter = function () {
            angular.forEach($scope.filterValues, function (value, key) {
                $scope.filterValues[key] = '';
            });
            $scope.FilterSet = false;
            $scope.row_start = 0;
        };

        $scope.ClearFilterAndRequery = function () {
            $scope.ClearFilter();
            $scope.GetTitleBySubstring();
        }

        $scope.ClearFilter();

        $scope.PrepForAPI = function () {
            angular.forEach($scope.filterValues, function (value, key) {
                if ($scope.filterValues[key] === '') {
                    $scope.filterValues[key] = '{}';
                }
            });

            if ($scope.row_start == 0) {
                $scope.row_start = 1;
            }
        };

        $scope.PrepAfterAPI = function () {
            angular.forEach($scope.filterValues, function (value, key) {

                if ($scope.filterValues[key] === '{}') {
                    $scope.filterValues[key] = '';
                }
            });
        };


        $scope.GetTitleBySubstring = function () {

            if ($scope.SearchBox == '' || angular.isUndefined($scope.SearchBox) ) {
                $scope.filterValues.SEARCHBOX = ''
            } else {
                $scope.filterValues.SEARCHBOX = $scope.SearchBox
            }

            // sets empty filter values to {}
            $scope.PrepForAPI();

            console.log($scope.filterValues);

            if (angular.isUndefined($scope.row_start)) {
                $scope.row_start = 1;
            }
            //onsole.log($scope.row_start);

            var uri = '?';

            // prepare uri for GET
            angular.forEach($scope.filterValues, function (value, key) {
                uri += key + '=' + value + '&';
            });

            // add ROW_START and SORT_TYPE
            uri += 'ROW_START=' + $scope.row_start + '&SORT_BY=' + $scope.SORT_BY;

            console.log(uri);

            $http({
                method: 'GET',
                url: 'http://vince.zapto.org/CatalogWebAPI/api/C78' + uri
            })
            .success(function (data) {
                $scope.C78 = data;

                if ($scope.isEmpty($scope.C78)) {
                    //onsole.log('empty');
                    $scope.row_start = 0;
                    $scope.row_display_end = 0;
                    $scope.total_rows = 0;
                    return;
                }


                $scope.total_rows = $scope.C78[0].TOTAL_ROWS;
                $scope.row_start = $scope.C78[0].ROW_NUM


                if ($scope.row_start + 19 < $scope.total_rows) {
                    $scope.row_display_end = $scope.row_start + 19;
                }
                else if ($scope.row_start + 19 >= $scope.total_rows) {
                    $scope.row_display_end = $scope.total_rows;
                }

                //onsole.log($scope.orchestrations);
            })
            .error(function (data, status) {
                window.alert('error');
            });

            // sets {} filter values to empty
            $scope.PrepAfterAPI();

        };

        $scope.GetTitleBySubstring();

        $scope.SortChange = function () {
            $scope.SearchBox = '';
            $scope.row_start = 1;
            $scope.GetTitleBySubstring();
        };

        $scope.NextPage = function () {

            $scope.row_start += 20;
            $scope.GetTitleBySubstring();
        };

        $scope.PreviousPage = function () {

            $scope.row_start -= 20;
            $scope.GetTitleBySubstring();
        };

        $scope.isEmpty = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };

        $scope.FilterChange = function () {
            $scope.FilterSet = false;
            angular.forEach($scope.filterValues, function (value, key) {
                if (value != '') {
                    $scope.FilterSet = true;
                }
            });
            console.log($scope.FilterSet);

            $scope.SearchBox = '';
            $scope.row_start = 1;
        }

        $scope.ChangedSearchBoxSearch = function () {
            $scope.row_start = 1;
            $scope.GetTitleBySubstring();
        };
        $scope.FilterModal = function () {
            $('#FilterModal').modal();
        };

        $scope.DetailModal = function (id) {
            $scope.detailData = $scope.C78[$scope.GetIndexFromObjectElement($scope.C78, 'ID_78', id)];
            $('#DetailModal').modal();
        };

    }]);

}());