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
    .controller("HomeCtrl",['$scope','Users',function($scope,Users){
        $scope.user = {};

        $scope.login = function(user){
            Users.login(user.login, user.password);
        }
    }]);