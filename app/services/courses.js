/**
 * Created by Q on 6/14/2015.
 */
'use strict';

angular.module('taskowl.Courses',[]).
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

        var CourseTasks =  $resource(APIURL+'/courses/:id/tasks',
            {id:'@id'},
            {
                'get': {method: 'GET', isArray:true},
                'create': {method: 'POST'}
            }
        );


        service.getCourse = function(courseId){
            return Courses.get({id:courseId});
        };

        service.getCourses = function(){
            return Courses.query();
        };

        service.getCourseTasks = function(courseId){
            return CourseTasks.get({id:courseId});
        };

        service.createCourse = function(course){
            return Courses.create(course);
        };

        service.createMasterTask = function(courseId,task){
            return CourseTasks.create({id:courseId},task);
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