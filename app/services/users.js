/**
 * Created by Q on 6/7/2015.
 */
'use strict';

angular.module('taskminder.Users',[]).
    factory('Users',['$cookies', '$resource','APIURL', function($cookies, $resource,APIURL){
        var service = {};

        var Users = $resource(APIURL+'/users/:id',
            {id:'@id'},
            {
                'get': {method: 'GET'},
                'delete': {method: 'DELETE'},
                'update': {method: 'PUT'},
                'create': {method: 'POST'}
            }
        );


        service.getUser = function(userId){
            return Users.get({id:userId});
        };

        service.getUsers = function(){
            return Users.query();
        };

        service.createUser = function(user){
            return Users.create(user);
        };

        service.deleteUser = function(userId){
            return Users.delete({id:userId});
        };

        service.updateUser = function(userId, user){
            return Users.create({id:userId},user);
        };

        service.login =function(email, password){
            $cookies.put('username',email);
            $cookies.put('user_id',1);
        };

        service.logout = function(){
            $cookies.remove('username');
        };

        return service;
    }]);