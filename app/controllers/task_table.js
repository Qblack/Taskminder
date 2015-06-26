/**
 * Created by Q on 6/6/2015.
 */
'use strict';

angular.module('taskminder.task_table',['ngRoute','ui.bootstrap']);
angular.module('taskminder.task_table').config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/tasks',{
            templateUrl: 'views/task_table.html',
            controller: 'TaskTableCtrl'
        });
    }]);

angular.module('taskminder.task_table').controller("TaskTableCtrl",
    ['$scope','Tasks','$cookies','Courses','$modal','$log',
        function($scope,Tasks,$cookies,Courses,$modal,$log){
        $scope.show_all = false;
        $scope.user_id = 1;// $cookies.get('user_id');
        $scope.animationsEnabled = true;

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

        $scope.openEdit = function (task,size) {

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
                    }
                }
            });

            modalInstance.result.then(function (task) {
                $scope.updateTask(task);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };


}]);

angular.module('taskminder.task_table').controller('TaskModalInstanceCtrl',
    function ($scope,  $modalInstance, task, courses, TYPES) {
        console.log(task);
        $scope.types = TYPES;
        $scope.courses = courses;

        task.type = task.type.trim();
        $scope.task = task;

        $scope.ok = function () {
            $modalInstance.close($scope.task);
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

        $scope.task.due_time = new Date();
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