/**
 * Created by Q on 6/10/2015.
 */
'use strict';
angular.module('taskminder.addSchool',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/add_school',{
            templateUrl: 'views/add_school.html',
            controller: 'AddSchoolCtrl'
        });

    }])
    .controller('AddSchoolCtrl',['$scope',function($scope){
        $scope.school = {};
        $scope.add = function(school){};
        $scope.existing_schools = ['Starwars Academy', 'Owl School', 'Bubbles','School1','SDCI','WLU','Another School', 'Yet Another School']; //TODO get existing schools

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
