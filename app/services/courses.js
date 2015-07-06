/**
 * Created by Q on 6/14/2015.
 */
'use strict';

angular.module('taskminder.Courses',[]).
    factory('Courses',['$resource','APIURL', function( $resource, APIURL ){
        var service = {};

        var Courses = $resource(APIURL+'/courses/:id',
            {id:'@id'},
            {
                'get': {method: 'GET'},
                'delete': {method: 'DELETE'},
                'update': {method: 'PUT'},
                'create': {method: 'POST'}
            }
        );

        service.getCourse = function(courseId){
            return Courses.get({id:courseId});
        };

        service.getCourses = function(){
            return Courses.query();
        };

        service.createCourse = function(course){
            return Courses.create(course);
        };

        service.deleteCourse = function(courseId){
            return Courses.delete({id:courseId});
        };

        service.updateCourse = function(courseId, course){
            return Courses.create({id:courseId},course);
        };


        service.filterCourses = function(query){
            return Courses.query(query);
        };

        return service;
    }]);