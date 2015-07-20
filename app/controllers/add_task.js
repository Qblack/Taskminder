/**
 * Created by Q on 6/10/2015.
 */
'use strict';


angular.module('taskowl.addTask',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/add_task',{
            templateUrl: 'views/add_task.html',
            controller: 'AddTaskCtrl'
        });

    }])
    .controller('AddTaskCtrl',['$scope','Tasks','Schools','Enrollments' , 'TYPES','$cookies', 'Courses',function($scope,Tasks, Schools, Enrollments, TYPES, $cookies, Courses){
        $scope.task = {};
        $scope.page_title = 'Create Task';
        $scope.is_modal = false;

        $scope.user_id = $cookies.get('user_id');
        $scope.task.in_class = true;
        $scope.success = null;
        $scope.message = null;

        $scope.courses = Enrollments.getUserEnrollments($scope.user_id);
        $scope.courses.$promise.then(
            function(courses) {
                $scope.courses = courses;
            }
        );

        $scope.types = TYPES ;

        $scope.submitTask = function(isValid){
            if(isValid){
                $scope.task.complete = false;
                $scope.task.type = $scope.task.type.trim();
                Tasks.createTask($scope.user_id,$scope.task).$promise.then(
                    function(success) {
                        $scope.success = true;
                        $scope.message = "Task was successfully added.";
                        if($scope.task.share==true){
                            Courses.createMasterTask($scope.task.id_course, $scope.task);
                        }
                        $scope.task ={};
                    },function(error) {
                        $scope.message = error.data.message;
                        $scope.success = false;
                    }
                );
            }

        };

        $scope.today = function() {
            $scope.task.due_date = new Date();
        };
        $scope.today();

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

    }]);