

(function() {

    var appVar = angular.module("app");
 
    appVar.controller("PrpBrowseController", ["$scope", "$http", function ($scope, $http) {

        // --- DYNAMIC CONFIGURATION LOGIC ---
        var apiBaseUrl = "";

        function initializeConfig() {

            var root = "";

            // 1. Check if we are on localhost
            if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
                root = "http://localhost:44301/"; // Your local backend port
            } else {
                // 2. We are in Production! 
                // Use the actual domain where your API is hosted
                root = "http://vince.zapto.org/CatalogWebAPI/"
            }

            var configUrl = root + '/api/config';
            console.log("Fetching config from: " + configUrl);

            // This calls your new C# bridge endpoint
            return $http.get(configUrl).then(function (response) {
                apiBaseUrl = response.data.apiBaseUrl;
                if (apiBaseUrl && apiBaseUrl.slice(-1) !== '/') apiBaseUrl += '/';

                $scope.GetTitleBySubstring();
            }, function (error) {
                console.error("Failed to load API configuration from backend", error);
            });
        }

        $scope.GetIndexFromObjectElement = function (obj, keyName, keyValue) {
            var newIndex = null;
            angular.forEach(obj, function (key, index) {
                if (key[keyName] === keyValue) newIndex = index;
            });
            return newIndex;
        };

        $scope.SORT_BY = 'TITLE'; // set the default sort type
        $scope.SearchBox = '';
        $scope.row_start = 1;
        $scope.row_display_end = 0;
        $scope.total_rows = 0;
        $scope.FilterSet = false;

        $scope.sortFields = ['TITLE', 'COMPANY', 'MEDIACAT', 'TITLEYEAR', 'PERFORMERS1', 'COMPOSERS1', 'COMPOSERS2', 'COMPOSERS3', 'COMPOSERS4'];

        $scope.filterValues = {
            TITLE: '',
            COMP_LYR: '',
            PERFORMER: '',
            PUBLISHER: '',
            TITLEYEAR: '',
            ARRANGYEAR: '',
            ARRANGTYPE: '',
            PRODTYPE: '',
            PRODTITLE: '',
            NOTES: '',
            COMPANY: '',
            PICTURE: '',
            LARGE: '',
            MEDIACAT: '',
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

             if ($scope.SearchBox == '') {
                $scope.filterValues.SEARCHBOX = ''
            } else {
                $scope.filterValues.SEARCHBOX = $scope.SearchBox
            }

            // sets empty filter values to {}
            $scope.PrepForAPI();

            //onsole.log($scope.filterValues);

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

            // Build dynamic URL from config
            var urlroot = apiBaseUrl + 'Prp';

            console.log("urlroot + uri: " + urlroot + uri);

            $http({
                method: 'GET',
                url: urlroot + uri
            })
            .success(function (data) {
                $scope.Prp = data;
                
                if ($scope.isEmpty($scope.Prp)) {
                    //onsole.log('empty');
                    $scope.row_start = 0;
                    $scope.row_display_end = 0;
                    $scope.total_rows = 0;
                    return;
                }


                 $scope.total_rows = $scope.Prp[0].TOTAL_ROWS;
                 $scope.row_start = $scope.Prp[0].ROW_NUM

 
                if ($scope.row_start+19<$scope.total_rows) {
                    $scope.row_display_end = $scope.row_start + 19;
                }
                else if ($scope.row_start + 19>=$scope.total_rows) {
                    $scope.row_display_end = $scope.total_rows;
                }
                
                //onsole.log($scope.Prp);
            })
            .error(function (data, status) {
                window.alert('error');
            });

            // sets {} filter values to empty
            $scope.PrepAfterAPI();

        };
 

        // Initialize configuration first
        initializeConfig();

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


        $scope.ShowDetail = function (id) {
            $scope.detailData = $scope.Prp[$scope.GetIndexFromObjectElement($scope.Prp, 'ID_PRP', id)];
            $scope.showDetail = true;
            window.scrollTo(0, 0);
        };
        $scope.HideDetail = function () {
            $scope.showDetail = false;
            $scope.detailData = {};
        };
 
    }]);

}());