"use strict";

angular.module("component").component("auth", {
  templateUrl: "components/auth/auth.template.html",
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

      ctrl.init = function (settings) {
        ctrl.settings = settings;
      };

      ctrl.logout = function () {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("full_name");
        localStorage.removeItem("user_type_id");
        localStorage.removeItem("user_type_name");
        UserService.logout().then(
          function successCallback(response) {
            $location.path("/auth/signin");
          },
          function errorCallback(response) {}
        );
      };

      ctrl.login = function () {
        ctrl.errors = {};
        // window.location.href = config.APP_URL + '#!/dashboard';
        UserService.login(ctrl.user).then(
          function successCallback(response) {
            console.log(response.data);
            // UserService.setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = config.APP_URL + '#!/group';

            // localStorage.setItem("full_name", response.data.user.name);
            // localStorage.setItem("user_type_id", response.data.user.user_type_id);
            // localStorage.setItem("user_id", response.data.user.id);
              // localStorage.setItem("user_type_name", response.data.user.user_type_name);
              // console.log(response);

          },
          function errorCallback(response) {
            if (response.status == 400) {
              ctrl.errors = response.data.error;
              console.log(ctrl.errors);
            }
            //appAlert('', 'An unexpected error has occured. Please contact site administrator.', 'error');
          }
        );
      };
    },
  ],
});
