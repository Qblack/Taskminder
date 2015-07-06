/**
 * Created by Q on 7/5/2015.
 */
'use strict';
/**
 * Created by Q on 6/14/2015.
 */
'use strict';

angular.module('taskminder.Enrollments',[]).
    factory('Enrollments',['$resource','APIURL', function( $resource, APIURL ){
        var service = {};

        var Enrollments = $resource(APIURL+'/enrollments/:id',
            {id:'@id'},
            {
                'get': {method: 'GET'},
                'delete': {method: 'DELETE'},
                'update': {method: 'PUT'},
                'create': {method: 'POST'}
            }
        );

        service.getEnrollment = function(enrollId){
            return Enrollments.get({id:enrollId});
        };

        service.getUserEnrollments = function(userId){
            var UserEnrollments = $resource(APIURL+'/users/:id/enrollments',
                {id:'@id'},
                {'get':{method:'GET', isArray:true}});
            return UserEnrollments.get({id:userId});
        };

        service.getEnrollments = function(){
            return Enrollments.query();
        };

        service.createEnrollment = function(enroll){
            return Enrollments.create(enroll);
        };

        service.deleteEnrollment = function(enrollId){
            return Enrollments.delete({id:enrollId});
        };

        service.updateEnrollment = function(enrollId, enroll){
            return Enrollments.create({id:enrollId},enroll);
        };

        service.filterEnrollments = function(query){
            return Enrollments.query(query);
        };

        return service;
}]);