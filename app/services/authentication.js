/**
 * Created by Q on 6/7/2015.
 */
'use strict';

angular.module('taskminder.authentication',[]).
    factory('authentication',['$cookies', function($cookies){
        var service = {};

        service.login =function(email, password){
            $cookies.put('username',email);
        };

        service.logout = function(){
            $cookies.remove('username');
        };

        return service;
    }]);