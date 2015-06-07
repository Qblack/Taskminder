/**
 * Created by Q on 6/7/2015.
 */
'use strict';
angular.module('taskminder.navbar', [ 'ui.bootstrap'])
    .controller('NavBarCtrl', ['$scope',function ($scope) {
        $scope.username = "QB";
    }]);
