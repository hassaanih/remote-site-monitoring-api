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

      ctrl.myInterval = $interval(function() {
        // Code to be executed periodically
        console.log('Interval is running...');
        ctrl.initDashboardData();
      }, 1000); // Runs every 1000 milliseconds (1 second)
    
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
          position: { x: 0.070, y: 0.49 },
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
      ];
      ctrl.$onInit = function () {
        ctrl.authUser = JSON.parse(localStorage.getItem("user"));
        ctrl.initBarGraph();
        ctrl.initGuageGraph();
        ctrl.initLineGraph();
        console.log(ctrl.indicators);
        ctrl.initSiteImage();
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
            data: [0, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
          },
          series: [
            {
              name: "sales",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
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
            data: [0, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
          },
          series: [
            {
              name: "sales",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
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
            data: [0, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
          },
          series: [
            {
              name: "sales",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20],
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
                    [0.5, "#719415"],
                    [0.9, "#D1BF09"],
                    [1, "#E50E0E"],
                  ],
                },
              },
              
              max: 200,
              splitNumber: 2,
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
                  width: 2,
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
                distance: -40,
                fontSize: 15,
              },
              detail: {
                valueAnimation: true,
                formatter: "{value} \u33A5",
                fontSize: 30,
                color: "inherit",
                offsetCenter: [0, "125%"],
              },
              data: [
                {
                  value: 70,
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
                    [0.5, "#719415"],
                    [0.9, "#D1BF09"],
                    [1, "#E50E0E"],
                  ],
                },
              },
              
              max: 200,
              splitNumber: 2,
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
                  width: 2,
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
                distance: -40,
                fontSize: 15,
              },
              detail: {
                valueAnimation: true,
                formatter: "{value} \u33A5",
                fontSize: 30,
                color: "inherit",
                offsetCenter: [0, "125%"],
              },
              data: [
                {
                  value: 70,
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
                    [0.5, "#719415"],
                    [0.9, "#D1BF09"],
                    [1, "#E50E0E"],
                  ],
                },
              },
              
              max: 200,
              splitNumber: 2,
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
                  width: 2,
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
                distance: -40,
                fontSize: 15,
              },
              detail: {
                valueAnimation: true,
                formatter: "{value} \u33A5",
                fontSize: 30,
                color: "inherit",
                offsetCenter: [0, "125%"],
              },
              data: [
                {
                  value: 70,
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

            // Customize indicator styles based on indicator.state
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
            data: ['0', '1'],
          },
          series: [
            {
              data: [false, true],
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
            data: ['0', '1'],
          },
          series: [
            {
              data: [false, true],
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
            data: ['0', '1'],
          },
          series: [
            {
              data: [false, true],
              type: "line",
            },
          ],
        });
      };

      ctrl.initDashboardData = function(){
        DashboardService.getFlowRate1().then(
          function success(response){
            console.log(response.data[response.data.length - 1].value);
            let flow_rate_value = response.data[response.data.length - 1].value.toFixed(2) ;
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

        DashboardService.getFlowRate2().then(
          function success(response){
            console.log(response.data[response.data.length - 1].value);
            let flow_rate_value = response.data[response.data.length - 1].value.toFixed(2) ;
            ctrl.guageGraphRps2.setOption({
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
      }
    },
  ],
});
