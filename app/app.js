/**
 * Created by Q on 6/6/2015.
 */
'use strict';

angular.module('taskminder',[
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'taskminder.home'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

}]);


