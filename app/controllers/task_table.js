/**
 * Created by Q on 6/6/2015.
 */
'use strict';

angular.module('taskowl.task_table',['ngRoute','ui.bootstrap']);
angular.module('taskowl.task_table').config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/tasks',{
            templateUrl: 'views/task_table.html',
            controller: 'TaskTableCtrl'
        });
    }]);

angular.module('taskowl.task_table').controller("TaskTableCtrl",
    ['$scope','Tasks','$cookies','Courses','$modal','$log','Enrollments',
        function($scope,Tasks,$cookies,Courses,$modal,$log, Enrollments){
        $scope.user_id = $cookies.get('user_id');
        $scope.username = $cookies.get('username');
        $scope.animationsEnabled = true;
        $scope.loaded = false;
        $scope.tasks = null;
        $scope.success = null;
        $scope.message = null;

            //The shows
        $scope.show = {
            assignment:false,
            test:false,
            reading:false,
            presentation: false,
            misc: false,
            meeting : false,
            show_all : true
        };

        $scope.courses = Enrollments.getUserEnrollments($scope.user_id);
        $scope.courses.$promise.then(function(courses){
            $scope.courses=courses;
        });

        $scope.refreshTasks = function(){
            Tasks.getTasks($scope.user_id).$promise.then(function(tasks){
                $scope.tasks=tasks;
                $scope.loaded = true;
            });
        };
        $scope.refreshTasks();

        $scope.getCourseCode = function(course_id){
            //Just iterating for now because I want to only search the user's courses eventually
            var found = false;
            var i =0;
            var code = '';
            while(found==false && i<$scope.courses.length){
                if( course_id == $scope.courses[i].id){
                    found =true;
                    code = $scope.courses[i].code;
                }
                i++;
            }
            return code;
        };


        $scope.showTask = function(type){
            var string_type =type.trim().toLowerCase().toString();
            return !$scope.show[string_type];
        };

        $scope.updateTask =function(task){
          Tasks.updateTask($scope.user_id, task).$promise.then(
              function(success) {
                  $scope.success = true;
                  $scope.message = "Task was successfully changed.";
                  if(task.share==true){
                      Courses.createMasterTask(task.id_course, task);
                  }
              },function(error) {
                  $scope.message = error.data.message;
                  $scope.success = false;
              }
          );
        };

        $scope.deleteTask = function(task){
            Tasks.deleteTask($scope.user_id, task.id).$promise.then(
                function(success) {
                    $scope.success = true;
                    $scope.message = success.message;
                    $scope.remove(task);
                },function(error) {
                    $scope.message = error.data.message;
                    console.log(error);
                    $scope.success = false;
                }
            );
        };

        $scope.remove = function(item) {
            var index = $scope.tasks.indexOf(item);
            $scope.tasks.splice(index, 1);
        };


        $scope.addTask =function(task){
            //TODO remove duplication
            task.complete = false;
            $scope.task = task;
            $scope.task.type = $scope.task.type.trim();
            Tasks.createTask($scope.user_id,task).$promise.then(
                function(success) {
                    $scope.success = true;
                    $scope.message = "Task was successfully added.";
                    if(task.share==true){
                        Courses.createMasterTask(task.id_course, task);
                    }
                    $scope.refreshTasks();
                },function(error) {
                    $scope.message = error.data.message;
                    $scope.success = false;
                }
            );
        };

        $scope.completeTask = function(task){
            task.complete = !task.complete;
            $scope.updateTask(task);
        };

        $scope.openModal = function (task, title, size) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'edit_task.html',
                controller: 'TaskModalInstanceCtrl',
                size:size,
                resolve: {
                    task: function () {
                        return task;
                    },
                    courses: function(){
                        return $scope.courses;
                    },
                    page_title: function(){
                        return title;
                    }

                }
            });

            modalInstance.result.then(function (data) {

                if(data.is_new){
                    $scope.addTask(data.task);
                }else{
                    $scope.updateTask(data.task);
                }

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };
}]);

angular.module('taskowl.task_table').controller('TaskModalInstanceCtrl',
    function ($scope,  $modalInstance, task, courses, TYPES, page_title) {
        $scope.types = TYPES;
        $scope.courses = courses;
        $scope.page_title = page_title;
        $scope.is_modal = true;
        $scope.openend = false;

        if(task != null){
            $scope.task = task;
            task.type = task.type.trim();
            $scope.is_new = false;
        }else{
            $scope.task = {
                in_class : true,
                due_date : new Date(),
                due_time : new Date()
            };
            $scope.is_new = true;
        }

        $scope.submitTask = function (isValid) {
            if(isValid){
                var data = {is_new: $scope.is_new, task:$scope.task};
                $modalInstance.close(data);
            }

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.today = function() {
            $scope.task.due_date = new Date();
        };

        $scope.clear = function () {
            $scope.task.due_date = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events =
            [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        };

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.changed = function () {
        };


    });