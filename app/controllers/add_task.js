/**
 * Created by Q on 6/10/2015.
 */
'use strict';


angular.module('taskminder.addTask',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/add_task',{
            templateUrl: 'views/add_task.html',
            controller: 'AddTaskCtrl'
        });

    }])
    .controller('AddTaskCtrl',['$scope','Tasks',function($scope,Tasks){
        $scope.task = {};
        $scope.courses = [{id:1,code:'BU440'},{id:2,code:'BU472'},{id:3,code:'BU491'}]; //TODO get actual courses
        $scope.types = ['reading','assignment','test']; // TODO get types

        $scope.add = function(task){
            console.log(task);
            task.course_id = task.course[0];
            task.type = task.type[0];
            task.complete = false;

            $scope.task = task;
            Tasks.createTask(1,task);
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
            console.log('Time changed to: ' + $scope.task.due_time );
        };

    }]);