/**
 * Created by Q on 6/14/2015.
 */
'use strict';

angular.module('taskowl.Schools',[]).
    factory('Schools',['$resource','APIURL', function( $resource, APIURL ){
        var service = {};

        var Schools = $resource(APIURL+'/schools/:id',
            {id:'@id'},
            {
                'get': {method: 'GET'},
                'delete': {method: 'DELETE'},
                'update': {method: 'PUT'},
                'create': {method: 'POST'}
            }
        );

        var allSchools = $resource(APIURL+'/schools');

        service.getSchools = function(){
            return allSchools.query();
        };
        service.getSchool = function(schoolId){
            return Schools.get({id:schoolId});
        };

        service.createSchool = function(school){
            return Schools.create(school);
        };

        service.deleteSchool = function(schoolId){
            return Schools.delete({id:schoolId});
        };

        service.updateSchool = function(schoolId, school){
            return Schools.create({id:schoolId},school);
        };

        return service;
    }]);