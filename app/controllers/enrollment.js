/**
 * Created by Q on 7/3/2015.
 */
'use strict';


var enrollment = angular.module('taskowl.enrollment',[]);

enrollment.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/enroll',{
        templateUrl: 'views/enroll.html',
        controller: 'EnrollCtrl'
    });
}]);

enrollment.controller('EnrollCtrl',['$scope', 'Courses','Schools', 'Enrollments', '$modal', '$cookies',
    function($scope, Courses, Schools, Enrollments, $modal, $cookies){
        $scope.years = [];
        $scope.semesters = [];
        $scope.sections = [];
        $scope.course_names = [];
        $scope.courses = [];
        $scope.course = null;
        $scope.success = null;
        $scope.message = null;

        $scope.id_school = null;
        $scope.year = null;
        $scope.semester = null;
        $scope.section = null;
        $scope.course_name = null;

        $scope.schools = Schools.getSchools();
        $scope.schools.$promise.then(
            function(success){
                $scope.schools = success;
            },function(error){
                console.log(error);
            }
        );

        $scope.getFilteredCourses = function(query){
            $scope.courses = Courses.filterCourses(query);
            $scope.courses.$promise.then(function(result) {
                $scope.courses = result;
                $scope.courses.forEach(function (course) {
                    var name = course.name;
                    var year = course.year;
                    var semester = course.semester;
                    var section = course.section;
                    if ($scope.course_names.indexOf(name) == -1) {
                        $scope.course_names.push(name);
                    }
                    if($scope.years.indexOf(year)==-1){
                        $scope.years.push(year);
                    }
                    if($scope.semesters.indexOf(semester)==-1){
                        $scope.semesters.push(semester);
                    }
                    if($scope.sections.indexOf(section)==-1){
                        $scope.sections.push(section);
                    }
                });
            })
        };

        $scope.$watch("id_school", function(newValue, oldValue) {
            if($scope.id_school!=null){
                $scope.year = null;
                $scope.semester = null;
                $scope.course_name = null;
                $scope.section = null;
                $scope.course = null;

                var query = {'id_school':$scope.id_school};
                $scope.getFilteredCourses(query);
            }
        });

        $scope.$watch("year", function(newValue, oldValue) {
            if($scope.year!=null){
                $scope.semesters = [];
                $scope.semester = null;
                $scope.course_name = null;
                $scope.section = null;
                $scope.course = null;
                var query = {'id_school':$scope.id_school, 'year':$scope.year};
                $scope.getFilteredCourses(query);
            }
        });

        $scope.$watch("semester", function(newValue, oldValue) {
            if($scope.semester!=null){
                $scope.course_names = [];
                $scope.course_name = null;
                $scope.section = null;
                $scope.course = null;

                var query = {'id_school':$scope.id_school, 'year':$scope.year, 'semester':$scope.semester};
                $scope.getFilteredCourses(query);
            }
        });

        $scope.$watch("course_name", function(newValue, oldValue) {
            if($scope.course_name!=null){
                $scope.sections = [];
                $scope.section = null;
                $scope.course = null;

                var query = {'id_school':$scope.id_school, 'year':$scope.year, 'semester':$scope.semester,
                    'name':$scope.course_name};
                $scope.getFilteredCourses(query);
            }
        });

        $scope.$watch("section", function(newValue, oldValue) {
            if($scope.section!=null){
                $scope.course = null;
                var query = {'id_school':$scope.id_school, 'year':$scope.year, 'semester':$scope.semester,
                    'name':$scope.course_name, 'section':$scope.section};
                $scope.getFilteredCourses(query);
            }
        });

        $scope.$watch("courses.$resolved", function(newValue, oldValue) {
            if($scope.section && $scope.courses.$resolved==true
                && $scope.courses.length==1){
                $scope.course = $scope.courses[0];
                $scope.open($scope.course);
            }
        });


        $scope.enroll = function(course){
            var enrollment = {};
            enrollment.id_course = course.id;
            enrollment.id_user = $cookies.get('user_id');
            Enrollments.createEnrollment(enrollment).$promise.then(
                function(success){
                    $scope.success = true;
                    $scope.message = "Successfully enrolled in "+$scope.course.name;
                    $scope.course = null;
                    $scope.id_school = null;
                    $scope.year = null;
                    $scope.semester = null;
                    $scope.section = null;
                    $scope.course_name = null;
                }, function(error){
                    $scope.success = false;
                    $scope.message = "Could not enroll in course, already enrolled";
                }
            );
        };

        $scope.open = function (course, size) {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'course.html',
                controller: 'EnrollModalInstanceCtrl',
                size:size,
                resolve: {
                    course: function () {
                        return course;
                    }
                }
            });

            modalInstance.result.then(function (course) {
                $scope.enroll(course);
            });
        };



    }]);

angular.module('taskowl.task_table').controller('EnrollModalInstanceCtrl',
    function ($scope,  $modalInstance, course) {
        $scope.course = course;

        $scope.ok = function () {
            $modalInstance.close(course);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });