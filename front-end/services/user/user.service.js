'use strict';

function UserService($http, API_URL) {
  var user;

  return {
    login: function (auth) {
      return $http({
        method: 'POST',
        url: config.API_URL+'/auth/login',
        data: auth
      });
    },
    authenticate: function(){
      return localStorage.getItem('auth_token') ? true : false;
    },
    setUser: function(authUser){
      user = authUser;
    },
    getUser: function(){
      return user;
    },
    logout: function () {
      return $http({
        method: 'GET',
        url: API_URL+'/user/signout'
      });
    },

    activateAccount: function (id) {
      return $http.get(API_URL + "/user/activateaccount/" + id);
    },

    inactivateAccount: function (id) {
      return $http.get(API_URL + "/user/inactivateaccount/" + id);
    },

    list: function (){
      return $http({
        method: "POST",
        url: API_URL + '/values/allusers'
      })
    },
    create: function (data){
      return $http({
        method: "POST",
        url: API_URL + '/user/register',
        data: data
      })
    },
    update: function (data){
      return $http({
        method: "POST",
        url: API_URL + '/user/update',
        data: data
      })
    },
    find: function (id){
      return $http({
        method: "GET",
        url: API_URL + '/user/find/' + id
      })
    },
    addCredit: function (data){
      return $http({
        method: "POST",
        url: API_URL + '/user/add/credit',
        data: data
      }) 
    }
  };
}

angular.module('core').factory('UserService', UserService);