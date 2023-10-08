'use strict';

function DashboardService($rootScope, $http, API_URL) {
  return {
    getFlowRate1: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/flowRate1'
      });
    },

    getFlowRate2: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/flowRate2'
      });
    },

    electricityStatus: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/electricityStatus'
      });
    },

    roEnabled: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/roEnabled'
      });
    },

    totalFt101hr: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/totalFt101hr'
      });
    },

    totalFt102hr: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/totalFt102hr'
      });
    },
    
  };
}

angular.module('core').factory('DashboardService', DashboardService);