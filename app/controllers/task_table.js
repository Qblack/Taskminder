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
    .controller("TaskTableCtrl",['$scope','Tasks','$cookies','Courses',function($scope,Tasks,$cookies,Courses){
        $scope.show_all = false;
        $scope.user_id = 1;// $cookies.get('user_id');

        $scope.courses = Courses.getCourses();
        $scope.courses.$promise.then(function(courses){
            $scope.courses=courses;
            console.log(courses);
        });

        $scope.tasks = Tasks.getTasks($scope.user_id);
        $scope.tasks.$promise.then(function(tasks){
            $scope.tasks=tasks;
        });

        $scope.getCourseCode = function(course_id){
            //Just iterating for now because I want to only search the user's courses eventually
            var found = false;
            var i =0;
            var code = '';
            while(found==false){
                if( course_id = $scope.courses[i].id){
                    found =true;
                    code = $scope.courses[i].code;
                }
                i++;
            }
            return code;
        };

        $scope.toggleShowAll = function(){
            $scope.show_all = !$scope.show_all;
            console.log($scope.show_all);
        }


    }]);