/**
 * Created by Q on 6/8/2015.
 */
'use strict';


angular.module('taskowl.signup',[])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/signup',{
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        });

    }])
    .controller('SignUpCtrl',['$scope','Users','Authentication', '$window', function($scope,Users,Auth, $window){
        $scope.user = {};
        $scope.success = null;
        $scope.message = null;
        $scope.emails = [];
        $scope.usernames = [];
        $scope.messages = {};

        $scope.users = Users.getIdentifiers();
        $scope.users.$promise.then(
            function(success){
                $scope.users = success;
                $scope.users.forEach(function(pair){
                    $scope.emails.push(pair.email.toLocaleLowerCase());
                    $scope.usernames.push(pair.username.toLocaleLowerCase())
                })
            }
        );

        $scope.isEmailTaken = function(email){
            //TODO MAKE EFFICIENT
            var index = $scope.emails.indexOf(email.toLocaleLowerCase());
            if(index!=-1){
                $scope.messages['email'] = "Email already in use";
            }else{
                $scope.messages['email'] = null;
            }
            return index!=-1;
        };

        $scope.usernameExists = function(username){
            //TODO MAKE EFFICIENT
            var index = $scope.usernames.indexOf(username.toLocaleLowerCase());
            if(index!=-1){
                $scope.messages['username'] = "Username already taken";
            }else{
                $scope.messages['username'] = null;
            }
            return index!=-1;
        };

        $scope.passwordsMatch = function(pwd1, pwd2){
            var match = pwd1==pwd2;
            if(!match){
                $scope.messages['confirm'] = "Passwords do not match";
            }else{
                $scope.messages['confirm'] = null;
            }
            return pwd1==pwd2;
        };


        $scope.signUp = function(user){
            var username_success = !$scope.usernameExists(user.username);
            var password_match = $scope.passwordsMatch(user.password,user.confirm);
            var email_success = !$scope.isEmailTaken(user.login);
            if(username_success && password_match && email_success){
                $scope.usercall =  Users.createUser(user);
                $scope.usercall.$promise.then(
                    function(user){
                        $scope.success = true;
                        Auth.createSession($scope.user.login, $scope.user.password);
                    }, function(error){
                        $scope.success = "danger";
                        $scope.message = error;
                    }
                );
            }else{
                $scope.message="Please ensure your information is acceptable";
                $scope.success = "danger";

            }
        }
    }]);