/**
 * Created by Q on 6/8/2015.
 */
'use strict';


angular.module('taskminder.signup',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/signup',{
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        });

    }])
    .controller('SignUpCtrl',['$scope',function($scope){
        $scope.user = {};

        $scope.signup = function(user){
            //TODO check if user exists
            //TODO check if passwords match
            //TODO create user
        }
    }]);