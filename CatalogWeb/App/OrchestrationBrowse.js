(function () {
    var appVar = angular.module("app");

    appVar.controller("OrchestrationBrowseController", ["$scope", "$http", function ($scope, $http) {

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

        $scope.SORT_BY = 'TITLE';
        $scope.sortReverse = false;
        $scope.SearchBox = '';
        $scope.row_start = 1;
        $scope.row_display_end = 0;
        $scope.total_rows = 0;
        $scope.FilterSet = false;
        $scope.showDetail = false;

        $scope.filterValues = {
            TITLE: '', COMP_LYR: '', ARRANGER: '', CATNUM: '', PUBLISHER: '',
            TITLEYEAR: '', ARRANGYEAR: '', ARRANGTYPE: '', KEY: '', PRODTYPE: '',
            PRODTITLE: '', ID: '', NOTES: '', PLATE_NUMBER: '', PCN: '',
            PICTURE: '', LARGE: '', SEARCHBOX: ''
        };

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
        };

        $scope.ClearFilter();

        $scope.PrepForAPI = function () {
            angular.forEach($scope.filterValues, function (value, key) {
                if ($scope.filterValues[key] === '') $scope.filterValues[key] = '{}';
            });
            if ($scope.row_start === 0) $scope.row_start = 1;
        };

        $scope.PrepAfterAPI = function () {
            angular.forEach($scope.filterValues, function (value, key) {
                if ($scope.filterValues[key] === '{}') $scope.filterValues[key] = '';
            });
        };

        $scope.GetTitleBySubstring = function () {
            // Wait until config is loaded before running
            if (!apiBaseUrl) return;

            $scope.filterValues.SEARCHBOX = ($scope.SearchBox === '') ? '' : $scope.SearchBox;
            $scope.PrepForAPI();

            var uri = '?';
            angular.forEach($scope.filterValues, function (value, key) {
                // Use encodeURIComponent to prevent search terms from breaking the URL
                uri += key + '=' + encodeURIComponent(value) + '&';
            });

            uri += 'ROW_START=' + $scope.row_start + '&SORT_BY=' + $scope.SORT_BY;

            // Build dynamic URL from config
            var urlroot = apiBaseUrl + 'orchestrations';

            console.log("urlroot + uri: " + urlroot + uri);

            $http({
                method: 'GET',
                url: urlroot + uri
            })
                .success(function (data) {
                    $scope.orchestrations = data;
                    if ($scope.isEmpty($scope.orchestrations)) {
                        $scope.row_start = 0;
                        $scope.row_display_end = 0;
                        $scope.total_rows = 0;
                        return;
                    }
                    $scope.total_rows = $scope.orchestrations[0].TOTAL_ROWS;
                    $scope.row_start = $scope.orchestrations[0].ROW_NUM;
                    $scope.row_display_end = Math.min($scope.row_start + 19, $scope.total_rows);
                })
                .error(function (data, status) {
                    window.alert('Error fetching data from API');
                });

            $scope.PrepAfterAPI();
        };

        // Initialize configuration first
        initializeConfig();

        // --- Helper Methods ---
        $scope.SortChange = function () { $scope.SearchBox = ''; $scope.row_start = 1; $scope.GetTitleBySubstring(); };
        $scope.NextPage = function () { $scope.row_start += 20; $scope.GetTitleBySubstring(); };
        $scope.PreviousPage = function () { $scope.row_start -= 20; $scope.GetTitleBySubstring(); };
        $scope.isEmpty = function (obj) { for (var prop in obj) { if (obj.hasOwnProperty(prop)) return false; } return true; };
        $scope.FilterChange = function () {
            $scope.FilterSet = false;
            angular.forEach($scope.filterValues, function (value, key) { if (value !== '') $scope.FilterSet = true; });
            $scope.SearchBox = '';
            $scope.row_start = 1;
        };
        $scope.ChangedSearchBoxSearch = function () { $scope.row_start = 1; $scope.GetTitleBySubstring(); };
        $scope.FilterModal = function () { $('#FilterModal').modal(); };
        $scope.ShowDetail = function (id) {
            $scope.detailData = $scope.orchestrations[$scope.GetIndexFromObjectElement($scope.orchestrations, 'ID_JAZZ', id)];
            $scope.showDetail = true;
            window.scrollTo(0, 0);
        };
        $scope.HideDetail = function () {
            $scope.showDetail = false;
            $scope.detailData = {};
        };
    }]);
}());
