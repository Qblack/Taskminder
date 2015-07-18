/**
 * Created by Q on 6/6/2015.
 */
'use strict';

var taskowl = angular.module('taskowl',[
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'taskowl.Tasks',
    'taskowl.Schools',
    'taskowl.Courses',
    'taskowl.Users',
    'taskowl.Authentication',
    'taskowl.Enrollments',
    'taskowl.task_table',
    'taskowl.home',
    'taskowl.navbar',
    'taskowl.enrollment',
    'taskowl.signup',
    'taskowl.addTask',
    'taskowl.addSchool',
    'taskowl.addCourse'



]);

taskowl.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

}]);

taskowl.factory('authInterceptor', function($rootScope, $q, $window){
   return {
       request: function(config){
           config.headers = config.headers || {};
           if ($window.localStorage.token){
               config.headers.Authorization='Bearer ' + $window.localStorage.token;
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


taskowl.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

taskowl.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);


taskowl.constant("APIURL", "https://floating-lowlands-9476.herokuapp.com/api");
//taskowl.constant("APIURL", "http://localhost:1337/api");
taskowl.constant("TYPES", ['Reading','Assignment','Test', 'Presentation', 'Meeting', 'Misc']);

