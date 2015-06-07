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
        $scope.tasks = {
            task1:
                { title: "First Test",
                  course_code : 'BU472',
                    type:'assignment',
                    due_date : 'Soon',
                    due_date_time : '4',
                    completed : true
        }};
    }]);