(function(){


    var baseService = function () {

        //returns the index of an element (keyName) where the keyValue is found
        var GetIndexFromObjectElement = function (obj, keyName, keyValue) {
            var newIndex = null;
            angular.forEach(obj, function (key, index) {
                if (key[keyName] === keyValue) newIndex = index;
            });
            return newIndex;
        };
    };

    var module = angular.module("app");

    module.factory("baseService", baseService);

}());