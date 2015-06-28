/**
 * Created by Q on 6/7/2015.
 */
'use strict';
angular.module('taskminder.navbar', [ 'ui.bootstrap'])
    .controller('NavBarCtrl', ['$scope','$cookies','Authentication','$window',function ($scope,$cookies,Authentication,$window) {

        $scope.username = $cookies.get('username');

        $scope.logout = function(){
            var session = $cookies.get('session');
            var user_id = $cookies.get('user_id');
            Authentication.logout(user_id, session);
            $cookies.remove('session');
            $cookies.remove('username');
            $cookies.remove('user_id');
            $scope.username = null;
            $window.location.href='#/home';

        };

    }]);
