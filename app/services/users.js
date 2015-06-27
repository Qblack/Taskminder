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

        var Authentication = $resource(APIURL+'/users/login',null,
            {
                'post':{method:'POST'}
            });


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
            Authentication.post({email:email, password:password}).$promise.then(
                function(success){
                    console.log(success);
                    $cookies.put('email',email);
                    $cookies.put('session',success.session);
                    $cookies.put('user_id',success.id);
                },function(err){
                    console.log("boom"+err)
            });
        };

        service.logout = function(){
            $cookies.remove('email');
            $cookies.remove('session');
            $cookies.remove('user_id');
        };

        return service;
    }]);