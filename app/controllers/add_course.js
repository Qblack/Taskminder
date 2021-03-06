/**
 * Created by Q on 6/12/2015.
 */
'use strict';

angular.module('taskowl.addCourse',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/add_course',{
            templateUrl: 'views/add_course.html',
            controller: 'AddCourseCtrl'
        });

    }])
    .controller('AddCourseCtrl',['$scope','Schools','Courses','Enrollments', '$cookies',function($scope,Schools,Courses,Enrollments, $cookies){
        $scope.course = {};
        $scope.success = null;
        $scope.message = null;
        $scope.enroll = true;
        $scope.userId = $cookies.get('user_id');

        $scope.add = function(course){
            Courses.createCourse(course).$promise.then(
                function(course) {
                    $scope.success = true;
                    $scope.message = $scope.course.name + " has been successfully added";
                    var enrollment = Enrollments.formatEnrollment($scope.userId,course);
                    Enrollments.createEnrollment(enrollment);
                    $scope.course = {};
                }, function(error){
                    $scope.success = false;
                    $scope.message = "A course with that name, section, and time period already exists.";
                });
        };

        $scope.schools = Schools.getSchools();
        $scope.schools.$promise.then(
            function(schools) {
                $scope.existing_schools = schools;
            }
        );

        $scope.existing_courses = Courses.getCourses();
        $scope.existing_courses.$promise.then(
            function(courses) {
                $scope.existing_courses = courses;
            }
        );


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
