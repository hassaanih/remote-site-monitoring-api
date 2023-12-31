"use strict";

angular.module("component").component("site", {
  templateUrl: "components/site-component/site-component.template.html",
  controller: [
    "$scope",
    "$location",
    "$routeParams",
    "$rootScope",
    // "RevenueService",
    // "DashboardService",
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
      // DashboardService,
      $interval,
      DashboardService,
      UserService,
      Constant
    ) {
      var ctrl = this;

      // ctrl.myInterval = $interval(function () {
      //   // Code to be executed periodically
      //   console.log("Interval is running...");
      //   ctrl.initDashboardSection1Data();
      //   ctrl.initDashboardSection2Data();
      // }, 1000); // Runs every 1000 milliseconds (1 second)

      // Detect when the view is destroyed
      $scope.$on("$destroy", function () {
        // Clear the interval when the view is changed or destroyed
        $interval.cancel(ctrl.myInterval);
      });
      ctrl.barGraphRps1;
      ctrl.barGraphRps2;
      ctrl.barGraphRps3;
      ctrl.flow_rate_value1;
      ctrl.flow_rate_value2;
      ctrl.guageGraphRps1;
      ctrl.guageGraphRps1;
      ctrl.guageGraphRps1;
      ctrl.lineGraphSkid1;
      ctrl.lineGraphSkid2;
      ctrl.lineGraphSkid3;
      ctrl.indicators = [
        {
          state: 0, // Indicator state (0, 1, or 2)
          position: { x: 0.065, y: 0.29 }, // Relative position (values between 0 and 1)
        },
        {
          state: 1,
          position: { x: 0.07, y: 0.49 },
        },
        {
          state: 2,
          position: { x: 0.065, y: 0.085 },
        },

        {
          state: 2,
          position: { x: 0.3167, y: 0.096 },
        },
        {
          state: 0, // Indicator state (0, 1, or 2)
          position: { x: 0.316, y: 0.29 }, // Relative position (values between 0 and 1)
        },
        {
          state: 1,
          position: { x: 0.317, y: 0.495 },
        },
        {
          state: 0, // Indicator state (0, 1, or 2)
          position: { x: 0.041, y: 0.9 }, // Relative position (values between 0 and 1)
        },
        {
          state: 1,
          position: { x: 0.072, y: 0.9 },
        },
        {
          state: 2,
          position: { x: 0.102, y: 0.9 },
        },
        {
          state: 0, // Indicator state (0, 1, or 2)
          position: { x: 0.134, y: 0.9 }, // Relative position (values between 0 and 1)
        },
        {
          state: 3, // Indicator state (0, 1, or 2)
          position: { x: 0.825, y: 0.049 }, // Relative position (values between 0 and 1)
        },
        {
          state: 3, // Indicator state (0, 1, or 2)
          position: { x: 0.825, y: 0.26 }, // Relative position (values between 0 and 1)
        },
      ];
      ctrl.$onInit = function () {
        ctrl.authUser = JSON.parse(localStorage.getItem("user"));
        ctrl.initBarGraph();
        ctrl.initGuageGraph();
        ctrl.initLineGraph();
        console.log(ctrl.indicators);
        ctrl.initSiteImage();
        ctrl.initDashboardSection1Data();
        ctrl.initDashboardSection2Data();
        window.addEventListener("resize", function () {
          ctrl.barGraphRps1.resize();
          ctrl.barGraphRps2.resize();
          ctrl.barGraphRps3.resize();
          ctrl.guageGraphRps1.resize();
          ctrl.guageGraphRps2.resize();
          ctrl.guageGraphRps3.resize();
          ctrl.lineGraphSkid1.resize();
          ctrl.lineGraphSkid2.resize();
          ctrl.lineGraphSkid3.resize();
        });
      };

      ctrl.initBarGraph = function () {
        ctrl.barGraphRps1 = echarts.init(document.getElementById("bar-skid-1"));

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
              name: "avg",
              type: "bar",
              data: [0, 0, 0, 0, 0, 0],
            },
          ],
        });
        ctrl.barGraphRps2 = echarts.init(document.getElementById("bar-skid-2"));

        ctrl.barGraphRps2.setOption({
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
              name: "avg",
              type: "bar",
              data: [0, 0, 0, 0, 0, 0],
            },
          ],
        });

        ctrl.barGraphRps3 = echarts.init(document.getElementById("bar-skid-3"));

        ctrl.barGraphRps3.setOption({
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
              name: "avg",
              type: "bar",
              data: [0, 0, 0, 0, 0, 0],
            },
          ],
        });
      };

      ctrl.initGuageGraph = function () {
        ctrl.guageGraphRps1 = echarts.init(
          document.getElementById("guage-skid-1")
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
          document.getElementById("guage-skid-2")
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
          document.getElementById("guage-skid-3")
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

      ctrl.initSiteImage = function () {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");

        var img = new Image();
        img.src = config.APP_URL + "/assets/img/site-image.png";

        img.onload = function () {
          // Set canvas size based on container dimensions
          canvas.width = canvas.parentElement.clientWidth;
          canvas.height = canvas.parentElement.clientHeight;

          // Calculate the aspect ratio for relative positions
          var aspectRatio = canvas.width / img.width;

          // Draw the image onto the canvas
          context.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Draw the indicators
          ctrl.indicators.forEach(function (indicator) {
            var x = indicator.position.x * canvas.width;
            var y = indicator.position.y * canvas.height;

            if (indicator.state == 3) {
              context.font = "30px Arial";
              context.fillStyle = "blue";
              context.textAlign = "center";
              context.textBaseline = "middle";
              context.fillText("abc", indicator.x, indicator.y);
              return;
            } else {
              context.beginPath();
              context.arc(x, y, 8 * aspectRatio, 0, 2 * Math.PI);
              context.fillStyle =
                indicator.state === 0
                  ? "red"
                  : indicator.state === 1
                  ? "green"
                  : "grey";
              context.fill();
              context.closePath();
            }

            // Customize indicator styles based on indicator.state
          });
        };
      };

      ctrl.initLineGraph = function () {
        const hoursInDay = Array.from({ length: 24 }, (_, index) => {
          const hour = index % 12 || 12; // Convert 0 to 12 for AM/PM
          const period = index < 12 ? "AM" : "PM";
          return `${hour}:00 ${period}`;
        });
        let value = [0, 1];
        ctrl.lineGraphSkid1 = echarts.init(
          document.getElementById("line-skid-1")
        );

        ctrl.lineGraphSkid1.setOption({
          xAxis: {
            type: "category",
            data: hoursInDay,
          },
          yAxis: {
            type: "category",
            data: ["0", "1"],
          },
          series: [
            {
              data: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
              type: "line",
            },
          ],
        });

        ctrl.lineGraphSkid3 = echarts.init(
          document.getElementById("line-skid-3")
        );

        ctrl.lineGraphSkid3.setOption({
          xAxis: {
            type: "category",
            data: hoursInDay,
          },
          yAxis: {
            type: "category",
            data: ["0", "1"],
          },
          series: [
            {
              data: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
              type: "line",
            },
          ],
        });

        ctrl.lineGraphSkid2 = echarts.init(
          document.getElementById("line-skid-2")
        );

        ctrl.lineGraphSkid2.setOption({
          xAxis: {
            type: "category",
            data: hoursInDay,
          },
          yAxis: {
            type: "category",
            data: ["0", "1"],
          },
          series: [
            {
              data: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
              type: "line",
            },
          ],
        });
      };

      ctrl.initDashboardSection1Data = function () {
        DashboardService.getFlowRate1().then(
          function success(response) {
            console.log(response.data.latestflowRate1);
            ctrl.flow_rate_value1 = response.data.latestflowRate1.toFixed(2);
            ctrl.guageGraphRps1.setOption({
              series: [
                {
                  data: [{ value: ctrl.flow_rate_value1 }],
                },
              ],
            });
          },
          function error(response) {
            console.log(response);
          }
        );

        DashboardService.totalFt101hr().then(
          function success(response) {
            console.log(response);
            let barGraph1values = Object.values(response.data.result);
            ctrl.barGraphRps1.setOption({
              series: {
                data: barGraph1values,
              },
            });
          },
          function error(response) {
            console.log(response);
          }
        );
      };

      ctrl.initDashboardSection2Data = function () {
        DashboardService.getFlowRate2().then(
          function success(response) {
            console.log(response.data.latestflowRate2);
            ctrl.flow_rate_value2 = response.data.latestflowRate2.toFixed(2);
            ctrl.guageGraphRps2.setOption({
              series: [
                {
                  data: [{ value: ctrl.flow_rate_value2 }],
                },
              ],
            });
          },
          function error(response) {
            console.log(response);
          }
        );

        DashboardService.totalFt102hr().then(
          function success(response) {
            console.log(response.data.result);
            let barData = [];
            let barGraph2values = Object.values(response.data.result);
            ctrl.barGraphRps2.setOption({
              series: {
                data: barGraph2values,
              },
            });
          },
          function error(response) {
            console.log(response);
          }
        );
      };
    },
  ],
});
