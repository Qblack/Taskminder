/**
 * Created by Q on 6/7/2015.
 */
'use strict';
angular.module('taskowl.navbar', [ 'ui.bootstrap'])
    .controller('NavBarCtrl', ['$scope','$cookies','Authentication','$window',function ($scope,$cookies,Authentication,$window) {

        $scope.username = $cookies.get('username');

        $scope.isLoggedIn = function(){
            $scope.username = $cookies.get('username');
            return $scope.username!=null;
        };

        $scope.logout = function(){

            var user_id = $cookies.get('user_id');
            Authentication.logout(user_id);
            $window.localStorage.token = null;
            $cookies.remove('username');
            $cookies.remove('user_id');
            $scope.username = null;
            $window.location.href='#/home';
        };

    }]);
