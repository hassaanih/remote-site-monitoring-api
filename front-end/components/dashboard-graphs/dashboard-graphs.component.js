"use strict";

angular.module("component").component("dashboardGraph", {
  templateUrl: "components/dashboard-graphs/dashboard-graphs.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    "$rootScope",
    // "RevenueService",
    "$interval",
    "DashboardService",
    "UserService",
    "Constant",
    function DashboardGraphController(
      $scope,
      $location,
      $routeParams,
      $rootScope,
      // RevenueService,
      $interval,
      DashboardService,
      UserService,
      Constant
    ) {
      var ctrl = this;

      // ctrl.myInterval = $interval(function() {
      //   // Code to be executed periodically
      //   console.log('Interval is running...');
      //   ctrl.initDashboardSection1Data();
      //   ctrl.initDashboardSection2Data();
      // }, 3000); // Runs every 1000 milliseconds (1 second)
    
      // Detect when the view is destroyed
      $scope.$on('$destroy', function() {
        // Clear the interval when the view is changed or destroyed
        $interval.cancel(ctrl.myInterval);
      });
      ctrl.barGraphRps1;
      ctrl.barGraphRps2;
      ctrl.barGraphRps3;
      ctrl.guageGraphRps1;
      ctrl.guageGraphRps1;
      ctrl.guageGraphRps1;
      ctrl.authUser;
      ctrl.$onInit = function () {
        ctrl.authUser = JSON.parse(localStorage.getItem("user"));
        console.log(ctrl.authUser);
        ctrl.initBarGraph();
        ctrl.initGuageGraph();
        ctrl.initDashboardSection1Data();
        ctrl.initDashboardSection2Data();
        window.addEventListener("resize", function () {
          ctrl.barGraphRps1.resize();
          ctrl.barGraphRps2.resize();
          ctrl.barGraphRps3.resize();
          ctrl.guageGraphRps1.resize();
          ctrl.guageGraphRps2.resize();
          ctrl.guageGraphRps3.resize();
        });
        
      };

      ctrl.initBarGraph = function () {
        ctrl.barGraphRps1 = echarts.init(document.getElementById("bar-rps-1"));

        ctrl.barGraphRps1.setOption({
          // title: {
          //   text: "ECharts Getting Started Example",
          // },
          tooltip: {},
          xAxis: {
            data: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
          },
          yAxis: {
            data: ['25K', "50K", '75K', "100K", '125K', '150K',  "175K", '200K', '250K']
          },
          series: [
            {
              name: "Total Daily Production",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        });
        ctrl.barGraphRps2 = echarts.init(document.getElementById("bar-rps-2"));

        ctrl.barGraphRps2.setOption({
          // title: {
          //   text: "ECharts Getting Started Example",
          // },
          tooltip: {},
          xAxis: {
            data: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
          },
          yAxis: {
            data: [0 , 3960 , 6600, 11800,  15840, 20000]
          },
          series: [
            {
              name: "Total Daily Production",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        });

        ctrl.barGraphRps3 = echarts.init(document.getElementById("bar-rps-3"));

        ctrl.barGraphRps3.setOption({
          // title: {
          //   text: "ECharts Getting Started Example",
          // },
          tooltip: {},
          xAxis: {
            data: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
          },
          yAxis: {
            data: [0 , 3960 , 6600, 11800,  15840, 20000]
          },
          series: [
            {
              name: "Total Daily Production",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
            },
          ],
        });
      };

      ctrl.initGuageGraph = function () {
        ctrl.guageGraphRps1 = echarts.init(
          document.getElementById("guage-rps-1")
        );

        ctrl.guageGraphRps1.setOption({
          series: [
            {
              type: "gauge",
              axisLine: {
                lineStyle: {
                  width: 10,
                  color: [
                    [0.2, "#E50E0E"],
                    [0.3, "#D1BF09"],
                    [0.7, "#719415"],
                    [0.8, "#D1BF09"],
                    [1, "#E50E0E"],
                  ],
                },
              },
              
              max: 20000,
              splitNumber: 6,
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              axisTick: {
                distance: -10,
                length: 10,
                lineStyle: {
                  color: "#fff",
                  width: 1,
                },
              },
              splitLine: {
                distance: -10,
                length: 20,
                lineStyle: {
                  color: "#fff",
                  width: 2,
                },
              },
              axisLabel: {
                color: "inherit",
                distance: -45,
                fontSize: 15,
                formatter: function (value) {
                  return value.toFixed(0); // Set the labels to have 2 decimal places
                },
                
              },
              detail: {
                valueAnimation: true,
                formatter: "{value} G/h",
                fontSize: 30,
                color: "inherit",
                offsetCenter: [0, "125%"],
              },
              data: [
                {
                  value: 0,
                },
              ],
            },
          ],
        });

        ctrl.guageGraphRps2 = echarts.init(
          document.getElementById("guage-rps-2")
        );

        ctrl.guageGraphRps2.setOption({
          series: [
            {
              type: "gauge",
              axisLine: {
                lineStyle: {
                  width: 10,
                  color: [
                    [0.2, "#E50E0E"],
                    [0.3, "#D1BF09"],
                    [0.7, "#719415"],
                    [0.8, "#D1BF09"],
                    [1, "#E50E0E"],
                  ],
                },
              },
              
              max: 20000,
              splitNumber: 6,
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              axisTick: {
                distance: -10,
                length: 10,
                lineStyle: {
                  color: "#fff",
                  width: 1,
                },
              },
              splitLine: {
                distance: -10,
                length: 20,
                lineStyle: {
                  color: "#fff",
                  width: 2,
                },
              },
              axisLabel: {
                color: "inherit",
                distance: -45,
                fontSize: 15,
                formatter: function (value) {
                  return value.toFixed(0); // Set the labels to have 2 decimal places
                },
                
              },
              detail: {
                valueAnimation: true,
                formatter: "{value} G/h",
                fontSize: 30,
                color: "inherit",
                offsetCenter: [0, "125%"],
              },
              data: [
                {
                  value: 0,
                },
              ],
            },
          ],
        });

        ctrl.guageGraphRps3 = echarts.init(
          document.getElementById("guage-rps-3")
        );

        ctrl.guageGraphRps3.setOption({
          series: [
            {
              type: "gauge",
              axisLine: {
                lineStyle: {
                  width: 10,
                  color: [
                    [0.2, "#E50E0E"],
                    [0.3, "#D1BF09"],
                    [0.7, "#719415"],
                    [0.8, "#D1BF09"],
                    [1, "#E50E0E"],
                  ],
                },
              },
              
              max: 20000,
              splitNumber: 6,
              pointer: {
                itemStyle: {
                  color: "auto",
                },
              },
              axisTick: {
                distance: -10,
                length: 10,
                lineStyle: {
                  color: "#fff",
                  width: 1,
                },
              },
              splitLine: {
                distance: -10,
                length: 20,
                lineStyle: {
                  color: "#fff",
                  width: 2,
                },
              },
              axisLabel: {
                color: "inherit",
                distance: -45,
                fontSize: 15,
                formatter: function (value) {
                  return value.toFixed(0); // Set the labels to have 2 decimal places
                },
                
              },
              detail: {
                valueAnimation: true,
                formatter: "{value} G/h",
                fontSize: 30,
                color: "inherit",
                offsetCenter: [0, "125%"],
              },
              data: [
                {
                  value: 0,
                },
              ],
            },
          ],
        });
      };

      ctrl.initDashboardSection1Data = function(){
        DashboardService.getFlowRate1().then(
          function success(response){
            console.log(response.data.latestflowRate1);
            let flow_rate_value = response.data.latestflowRate1.toFixed(2) ;
            ctrl.guageGraphRps1.setOption({
              series: [
                {
                  data: [{ value: flow_rate_value }],
                },
              ],
            })
          },
          function error(response){
            console.log(response);
          }
        )

        DashboardService.totalFt101hr().then(
          function success(response){
            console.log(response)
            let barGraph1values = Object.values(response.data.result);
            ctrl.barGraphRps1.setOption({
              series: {
                data: barGraph1values
              }
            })
          },
          function error(response){
            console.log(response);
          }
        )
      }

      ctrl.initDashboardSection2Data = function(){
        DashboardService.getFlowRate2().then(
          function success(response){
            console.log(response.data.latestflowRate1);
            let flow_rate_value = response.data.latestflowRate2.toFixed(2) ;
            ctrl.guageGraphRps1.setOption({
              series: [
                {
                  data: [{ value: flow_rate_value }],
                },
              ],
            })
          },
          function error(response){
            console.log(response);
          }
        )

        DashboardService.totalFt102hr().then(
          function success(response){
            console.log(response.data.result);
            let barData = [];
            let barGraph2values = Object.values(response.data.result);
            ctrl.barGraphRps2.setOption({
              series: {
                data: barGraph2values
              }
            })
          },
          function error(response){
            console.log(response);
          }
        )
      }
    },
  ],
});
