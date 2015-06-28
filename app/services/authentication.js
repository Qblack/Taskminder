/**
 * Created by Q on 6/27/2015.
 */
'use strict';


angular.module('taskminder.Authentication',[]).
    factory('Authentication',['$cookies', '$resource','APIURL', function($cookies, $resource, APIURL){
        var service = {};

        var Authentication = $resource(APIURL+'/users/login',null,
            {
                'post':{method:'POST'},
                'delete': {method: 'DELETE'}
            });


        service.login =function(email, password){
            return Authentication.post({email:email, password:password})
        };

        service.logout = function(user_id, session){
            return Authentication.delete({user_id:user_id, session:session})
        };


        return service;
    }]);