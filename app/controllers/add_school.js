/**
 * Created by Q on 6/10/2015.
 */
'use strict';
angular.module('taskowl.addSchool',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/add_school',{
            templateUrl: 'views/add_school.html',
            controller: 'AddSchoolCtrl'
        });

    }])
    .controller('AddSchoolCtrl',['$scope','Schools',function($scope,Schools){
        $scope.school = {};
        $scope.success = false;


        $scope.existing_schools = [{name:'No existing schools'}];
        $scope.loadSchools = function(){
            $scope.existing_schools = Schools.getSchools();

            $scope.existing_schools.$promise.then(
                function(schools) {
                    console.log(schools);
                    if(schools.length!=0){
                        $scope.existing_schools = schools;
                    }else{
                        $scope.existing_schools = [{name:'No existing schools'}];
                    }
                },
                function(error){
                    $scope.existing_schools = [{name:'Trouble finding existing schools'}]
                }
            );
        };

        $scope.loadSchools();
        $scope.add = function(school){
            Schools.createSchool(school).$promise.then(
                function(course){
                    console.log(course.id);
                    $scope.loadSchools();
                    $scope.success = true;
                },
                function(error){
                    console.log(error);
                }
            );
        };


        $scope.getFakeSchool = function () {
            var fake_schools = [
                'Monsters University',
                'Springfield University',
                'Faber College',
                'Starfleet Academy',
                'Greendale Community College',
                'Gotham University',
                'South Harmon Institute of Technology',
                'Smogon University'
            ];
            var index = Math.floor(Math.random()*fake_schools.length);
            return fake_schools[index];
        };
        $scope.fake_school = $scope.getFakeSchool();

    }]);
