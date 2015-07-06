/**
 * Created by Q on 6/6/2015.
 */
'use strict';

var taskminder = angular.module('taskminder',[
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'taskminder.Tasks',
    'taskminder.Schools',
    'taskminder.Courses',
    'taskminder.Users',
    'taskminder.Authentication',
    'taskminder.Enrollments',
    'taskminder.task_table',
    'taskminder.home',
    'taskminder.navbar',
    'taskminder.enrollment',
    'taskminder.signup',
    'taskminder.addTask',
    'taskminder.addSchool',
    'taskminder.addCourse'



]);

taskminder.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

}]);

taskminder.factory('authInterceptor', function($rootScope, $q, $window){
   return {
       request: function(config){
           config.headers = config.headers || {};
           if ($window.sessionStorage.token){
               config.headers.Authorization='Bearer ' + $window.sessionStorage.token;
           }
           return config;
       }
       ,
       response: function(response){
           if(response.status == 401){
               //TODO handle the case where the user is not authenticated
           }
           return response || $q.when(response);
       }
   };
});


taskminder.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

taskminder.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);


//taskminder.constant("APIURL", "https://floating-lowlands-9476.herokuapp.com/api");
taskminder.constant("APIURL", "http://192.168.0.18:1337/api");
taskminder.constant("TYPES", ['Reading','Assignment','Test', 'Presentation', 'Meeting', 'Misc']);

