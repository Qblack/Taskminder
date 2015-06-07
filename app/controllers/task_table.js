/**
 * Created by Q on 6/6/2015.
 */
'use strict';

angular.module('taskminder.task_table',['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/tasks',{
            templateUrl: 'views/task_table.html',
            controller: 'TaskTableCtrl'
        });
    }])
    .controller("TaskTableCtrl",['$scope',function($scope){

    }]);