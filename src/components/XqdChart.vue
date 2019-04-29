<template>
  <div :id="id"></div>
</template>
<script>
/*eslint-disable*/
import HighCharts from "highcharts";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
  // 验证类型
  props: {
    id: {
      type: String
    }
  },

  data() {
    return {
      chart: null,
      chartData: null,
      option: {
        chart: {
          type: "areaspline",
          panning: true,
          panKey: "shift"
        },
        title: {
          text: "七日年化收益"
        },
        subtitle: {
          text: null
        }
      }
    };
  },
  methods: {
    initChart_xqd(arr, typ) {
      var _max = Math.ceil(Math.max.apply(null, arr[1]) * 10) / 10;
      var _min = Math.floor(Math.min.apply(null, arr[1]) * 10) / 10;

      var options = {
        chart: {
          type: "areaspline",
          panning: true,
          panKey: "shift"
        },
        title: {
          text: typ == "y" ? "七日年化收益" : "万份收益"
        },
        subtitle: {
          text: null
        },
        xAxis: {
          gridLineColor: "eee",
          gridLineDashStyle: "Dash",
          lineColor: "#eee",
          lineWidth: 1,
          gridLineWidth: 1,
          labels: {
            formatter: function() {
              return arr[0][this.value].length > 5
                ? arr[0][this.value].substr(5)
                : arr[0][this.value];
            },
            rotation: 0
          },
          tickInterval: 1,
          tickWidth: 1,
          tickLength: 5,
          startOnTick: false,
          minPadding: 0
        },
        yAxis: {
          max: _max,
          min: _min,
          tickInterval: 0.25,
          title: {
            text: null
          },
          labels: {
            formatter: function() {
              return HighCharts.numberFormat(this.value, 2);
            }
          },
          gridLineDashStyle: "Dash"
        },
        legend: {
          enabled: false
        },
        tooltip: {
          shared: true,
          crosshairs: true,
          formatter: function() {
            var s = arr[0][this.x];
            for(let obj of this.points){
                s += '<br />' + obj.series.name + ':<b>' + obj.y + ((typ=='y')?'%':'') + '</b>';
            }
            return s;
          }
        },
        plotOptions: {
          areaspline: {
            color: "#fde8dd",
            lineWidth: 0.8,
            lineColor: "#ff8c00",
            fillOpacity: 0.7,
            states: {
              hover: {
                enabled: true,
                lineWidth: 0.8
              }
            },
            marker: {
              radius: 2,
              lineColor: "#fba845",
              fillColor: "#fba845"
            }
          }
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: typ == "y" ? "年化收益" : "万份收益",
            data: arr[1] || []
          }
        ]
      };

      this.option = options;
      this.chart = HighCharts.chart(this.id, this.option);
    },

    init() {
      // axios
      //   .get("/api/mobile/indexV201804/getChartData4XiaoQianDai", {
      //     params: { type: "y" }
      //   })
      //   .then(res => {
      //     this.chartData = res.data.resultData.chartData;
      //     this.initChart_xqd(this.chartData, "y");
      //   });

      this.$httpGet("/index/getChartData4XiaoQianDai", { type: "y" }).then(
        res => {
          this.chartData= res.chartData;
          this.initChart_xqd(this.chartData, "y");

          
          // _chartData 
        }
      ).catch((e)=>{
          //console.log(e)
        }
      )

    }
  },
  mounted() {
    this.init();
  }
};
</script>