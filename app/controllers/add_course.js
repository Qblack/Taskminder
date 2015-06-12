/**
 * Created by Q on 6/12/2015.
 */
'use strict';

angular.module('taskminder.addCourse',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/add_course',{
            templateUrl: 'views/add_course.html',
            controller: 'AddCourseCtrl'
        });

    }])
    .controller('AddCourseCtrl',['$scope',function($scope){
        $scope.course = {};
        $scope.add = function(course){};

        //TODO get existing courses
        //TODO get existing schools
        

        $scope.getFakeCourse = function () {
            var fake_courses = [
                'Basket Weaving 101',
                'Pokemon Training',
                'Swordplay 101',
                'Being a Superhero 425',
                'Emu Ranching',
                'Comics and Heroes'
            ];
            var index = Math.floor(Math.random()*fake_courses.length);
            return fake_courses[index];
        };

        $scope.getFakeProfessors = function () {
            var fake_profs = [
                'Professor Xavier',
                'Professor Oak',
                'Ms.Krabappel',
                'Ms.Honey',
                'Dr.Jones'
            ];
            var index = Math.floor(Math.random()*fake_profs.length);
            return fake_profs[index];
        };


        $scope.fake_course = $scope.getFakeCourse();
        $scope.fake_professor = $scope.getFakeProfessors();


    }]);
