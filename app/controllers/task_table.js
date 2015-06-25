/**
 * Created by Q on 6/6/2015.
 */
'use strict';

angular.module('taskminder.task_table',['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/tasks',{
            templateUrl: 'views/task_table.html',
            controller: 'TaskTableCtrl'
        });
    }])
    .controller("TaskTableCtrl",['$scope','Tasks','$cookies','Courses',function($scope,Tasks,$cookies,Courses){
        $scope.show_all = false;
        $scope.user_id = 1;// $cookies.get('user_id');

        //The shows
        $scope.show = {
            assignment:true,
            test:true,
            reading:true
        };

        $scope.courses = Courses.getCourses();
        $scope.courses.$promise.then(function(courses){
            $scope.courses=courses;
        });

        $scope.tasks = Tasks.getTasks($scope.user_id);
        $scope.tasks.$promise.then(function(tasks){
            $scope.tasks=tasks;
            console.log(tasks);
        });

        $scope.getCourseCode = function(course_id){
            //Just iterating for now because I want to only search the user's courses eventually
            var found = false;
            var i =0;
            var code = '';
            while(found==false){
                if( course_id == $scope.courses[i].id){
                    found =true;
                    code = $scope.courses[i].code;
                }
                i++;
            }
            return code;
        };

        $scope.toggleShowAll = function(){
            $scope.show_all = !$scope.show_all;
        };
        $scope.toggleShowAssignments = function(){
            $scope.show.assignment = !$scope.show.assignment;
        };
        $scope.toggleShowTests = function(){
            $scope.show.test = !$scope.show.test;
        };
        $scope.toggleShowReadings = function(){
            $scope.show.reading = !$scope.show.reading;
        };

        $scope.showTask = function(type){
            var string_type =type.trim().toLowerCase().toString();
            return $scope.show[string_type];
        };

        $scope.updateTask =function(task){
          Tasks.updateTask($scope.user_id, task).$promise.then(
              function(result){
                  console.log(result);
            },function(error){
                console.log(error);
            }
          );
        };

        $scope.completeTask = function(task){
            task.complete = !task.complete;
            $scope.updateTask(task);
        };

      
    }]);