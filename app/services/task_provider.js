/**
 * Created by Q on 6/12/2015.
 */
'use strict';


angular.module('taskminder.Tasks',[]).
    factory('Tasks',['$resource','APIURL', function( $resource, APIURL ){
            var service = {};

        var Tasks = $resource(APIURL+'/users/:userId/tasks/:id',
                {userId:'@userId', id:'@id'},
                {
                    'get': {method: 'GET', isArray:true},
                    'delete': {method: 'DELETE'},
                    'update': {method: 'PUT'},
                    'create': {method: 'POST'}
                }
            );


            service.getTasks = function(userId){
                return Tasks.get({userId:userId});
            };

            service.getTask = function(userId, taskId){
                return Tasks.get({userId:userId,id:taskId});
            };

            service.createTask = function(userId, task){
                return Tasks.create({userId:userId},task);
            };

            service.deleteTask = function(userId, taskId){
                return Tasks.delete({userId:userId,id:taskId});
            };

            service.updateTask = function(userId, task){
                return Tasks.update({userId:userId,id:task.id},task);
            };

            return service;
    }]);