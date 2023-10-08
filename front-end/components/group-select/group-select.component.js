"use strict";

angular.module("component").component("groupSelect", {
  templateUrl: "components/group-select/group-select.template.html",
  controller: [
    "$rootScope",
    "UserService",
    "$location",
    "$routeParams",

    function AuthController(
      $rootScope, 
      UserService, 
      $location, 
      $routeParams) {
      var ctrl = this;
      ctrl.user = {};
      ctrl.errors = {};

      ctrl.$onInit = function () {
        if ($routeParams.action == "logout") ctrl.logout();
      };

      
    },
  ],
});
