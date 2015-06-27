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
    .controller('SignUpCtrl',['$scope','Users',function($scope,Users){
        $scope.user = {};

        $scope.signUp = function(user){
            //TODO check if user exists
            //TODO check if passwords match
            $scope.user =  Users.createUser(user);
            $scope.user.$promise.then(
                function(user){
                    $scope.user = user;
                }, function(error){
                    console.log("Boom"+error);
                }
            )

        }
    }]);