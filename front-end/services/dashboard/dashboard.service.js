'use strict';

function DashboardService($rootScope, $http, API_URL) {
  return {
    getFlowRate1: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/latestflowRate1'
      });
    },

    getFlowRate2: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/latestflowRate2'
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
        url: API_URL + '/values/avgflowRate1'
      });
    },

    totalFt102hr: function () {
      return $http({
        method: 'POST',
        url: API_URL + '/values/avgflowRate2'
      });
    },

    totalFlowRate: function (){
      return $http({
        method: 'POST',
        url: API_URL + '/values/sumflowrates'
      })
    }
    
  };
}

angular.module('core').factory('DashboardService', DashboardService);