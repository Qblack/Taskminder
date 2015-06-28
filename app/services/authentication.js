/**
 * Created by Q on 6/27/2015.
 */
'use strict';


angular.module('taskminder.Authentication',[]).
    factory('Authentication',['$cookies', '$resource','APIURL','$window', function($cookies, $resource, APIURL,$window){
        var service = {};

        var Authentication = $resource(APIURL+'/authenticate',null,
            {
                'post':{method:'POST'},
                'delete': {method: 'DELETE'}
            });


        service.login =function(email, password){
            return Authentication.post({email:email, password:password})
        };

        service.logout = function(user_id){
            return Authentication.delete({user_id:user_id, token:service.getToken()})
        };

        service.isLoggedIn = function(){
            var username = $cookies.get('username');
            return username!=null;
        };

        service.getToken = function(){
            return $window.sessionStorage.token;
        };


        return service;
    }]);