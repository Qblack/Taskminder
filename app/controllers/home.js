/**
 * Created by Q on 6/6/2015.
 */
'use strict';

angular.module('taskminder.home',['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        });
        $routeProvider.when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        });
    }])
    .controller("HomeCtrl",['$scope','Authentication','$window','$cookies',function($scope,Authentication,$window,$cookies){
        $scope.user = {};

        $scope.login = function(user){
            //TODO move this somehow
            Authentication.login(user.login, user.password).$promise.then(
                function(success){
                    $cookies.put('username',success.username);
                    $window.sessionStorage.token = success.token;
                    $cookies.put('user_id',success.id);
                    $window.location.href = '#/tasks';
                },function(err){
                    console.log(err);
                }
            );
        };

        $scope.isLoggedIn = Authentication.isLoggedIn();

    }]);