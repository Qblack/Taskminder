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
    'taskminder.task_table',
    'taskminder.home',
    'taskminder.navbar',
    'taskminder.signup',
    'taskminder.addTask',
    'taskminder.addSchool',
    'taskminder.addCourse'



]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

}]).config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);


taskminder.constant("APIURL", "http://127.0.0.1:1337");
