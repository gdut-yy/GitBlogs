<template>
  <div class="article">
    <div id="toolbox">
      <div id="upload">
        <svg
          t="1546918477124"
          class="icon"
          style="
            width: 24px;
            height: 24px;
            vertical-align: middle;
            fill: currentColor;
            overflow: hidden;
          "
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9448"
        >
          <path
            d="M819.2 420.26666666c-32-147.2-153.6-256-307.2-256-121.6 0-224 70.4-275.2 172.8-128 19.2-224 121.6-224 256 0 140.8 115.2 256 249.6 256h537.6c115.2 0 204.8-96 204.8-211.2 6.4-115.2-83.2-211.2-185.6-217.6m-224 128v172.8H428.8V548.26666666H307.2L512 337.06666666l204.8 211.2H595.2z m0 0"
            fill="#1ABC9C"
            p-id="9449"
            data-spm-anchor-id="a313x.7781069.0.i5"
          ></path>
        </svg>
        Upload JMH json file
        <input
          id="json_file"
          type="file"
          v-on:change="uploadFile($event)"
          accept=".json"
        />
      </div>
      <div
        id="switch_hv"
        v-on:click="switch_hv()"
        title="switch horizontal or vertial chart"
      >
        <svg
          t="1546925698883"
          class="icon"
          style="
            width: 24px;
            height: 24px;
            vertical-align: middle;
            fill: currentColor;
            overflow: hidden;
          "
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="12338"
          data-spm-anchor-id="a313x.7781069.0.i7"
        >
          <path
            d="M512 926C283.7 926 98 740.3 98 512S283.7 98 512 98s414 185.7 414 414-185.7 414-414 414z m0-793.5c-209.3 0-379.5 170.2-379.5 379.5S302.7 891.5 512 891.5 891.5 721.3 891.5 512 721.3 132.5 512 132.5z"
            p-id="12339"
          ></path>
          <path
            d="M597.2 266.3c-8-5.1-18.7-2.8-23.8 5.3-5.1 8-2.8 18.7 5.3 23.8l85.4 54.5H339.4c-28.5 0-51.7 23.2-51.7 51.7v155.3c0 9.5 7.7 17.2 17.2 17.2s17.2-7.7 17.2-17.2V401.5c0-9.5 7.7-17.2 17.2-17.2h381.9c9.5 0 17.2-7.7 17.2-17.2 0-4.8-7.1-10.7-12.5-16.8-11.5-13.1-128.7-84-128.7-84zM426.8 757.7c8 5.1 18.7 2.8 23.8-5.3 5.1-8 2.8-18.7-5.3-23.8L360 674.2h324.5c28.5 0 51.7-23.2 51.7-51.7V467.1c0-9.5-7.7-17.2-17.2-17.2s-17.2 7.7-17.2 17.2v155.3c0 9.5-7.7 17.2-17.2 17.2H302.7c-9.5 0-17.2 7.7-17.2 17.2 0 4.8 7.1 10.7 12.5 16.8 11.6 13.2 128.8 84.1 128.8 84.1z"
            p-id="12340"
          ></path>
        </svg>
      </div>
    </div>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "echarts",
  data() {
    return {
      event: null,
      myChart: null,
      current_data: null,
      show_direction: "horizontal",
      default_option: {
        title: {
          text: "JMH Visual Chart",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: "PNG",
            },
          },
        },
      },
    };
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    uploadFile(event) {
      let input = event.target;
      if (!input.files[0]) return undefined;
      let file = input.files[0];
      input.value = ""; // clear value, due to trigger onChange
      let reader = new FileReader();
      let that = this;
      reader.onload = function () {
        that.current_data = JSON.parse(reader.result);
        console.log(that.current_data);
        that.analysis(that.current_data);
      };
      reader.readAsText(file);
    },

    switch_hv() {
      this.show_direction =
        this.show_direction === "horizontal" ? "vertical" : "horizontal";
      this.analysis(this.current_data);
    },

    analysis(current_data1) {
      console.log("analysis" + current_data1);

      if (!current_data1) return;
      var option = this.convert(
        current_data1,
        this.show_direction === "horizontal"
      );
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.clear();
      this.myChart.setOption({ ...this.default_option, ...option });
    },

    convert(jmh_json, horizontal) {
      var legengd_data = [];
      var xAxis_data = [];
      var xAxis_name = "";
      var yAxis_name = "";
      var method_param_to_data = new Map();

      jmh_json.forEach((element) => {
        // method
        var method = element.benchmark.substring(
          element.benchmark.lastIndexOf(".") + 1
        );
        if (-1 == legengd_data.indexOf(method)) legengd_data.push(method);

        // yAxis_name
        if (yAxis_name === "") yAxis_name = element.primaryMetric.scoreUnit;

        var xAxis_value = "";
        if (element.params) {
          if (xAxis_name === "") {
            for (let key in element.params) {
              xAxis_name = xAxis_name + key + ":";
            }
            xAxis_name = xAxis_name.substring(0, xAxis_name.length - 1);
          }
          for (let key in element.params) {
            xAxis_value = xAxis_value + element.params[key] + ":";
          }
          xAxis_value = xAxis_value.substring(0, xAxis_value.length - 1);

          if (-1 == xAxis_data.indexOf(xAxis_value))
            xAxis_data.push(xAxis_value);
        } else {
          xAxis_name = "Param";
          xAxis_data = ["default"];
          xAxis_value = "default";
        }

        // map
        method_param_to_data.set(
          method + xAxis_value,
          yAxis_name.indexOf("ops/") == 0
            ? Math.floor(element.primaryMetric.score)
            : element.primaryMetric.score
        );
      });

      var seriesData = [];
      var seriesLabel = {
        normal: {
          show: true,
          textBorderColor: "#333",
          textBorderWidth: 2,
          position: horizontal ? "top" : "right",
        },
      };

      legengd_data.forEach((ele) => {
        var paramData = [];
        xAxis_data.forEach((item) => {
          paramData.push(method_param_to_data.get(ele + item));
        });

        seriesData.push({
          name: ele,
          type: "bar",
          label: seriesLabel,
          data: paramData,
        });
      });
      return horizontal
        ? {
            legend: {
              data: legengd_data,
            },
            grid: {},
            xAxis: [
              {
                type: "category",
                data: xAxis_data,
                name: xAxis_name,
              },
            ],
            yAxis: [
              {
                type: "value",
                name: yAxis_name,
              },
            ],
            series: seriesData,
          }
        : {
            legend: {
              data: legengd_data,
            },
            grid: {},
            xAxis: {
              type: "value",
              name: yAxis_name,
            },
            yAxis: {
              type: "category",
              data: xAxis_data,
              name: xAxis_name,
            },
            series: seriesData,
          };
    },

    echartsInit() {
      this.myChart = echarts.init(
        document.getElementById("main"),
        "default" === this.getParameterByName("theme") ? "default" : "dark"
      );
    },
  },
};
</script>

<style scoped>
#upload {
  display: inline-block;
  position: relative;
  font-size: 12px;
  color: #1abc9c;
  text-decoration: none;
}
#upload:hover {
  cursor: pointer;
}

#toolbox {
  height: 38px;
  border-bottom: 1px solid #ddd;
}

#json_file {
  cursor: pointer;
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

#switch_hv {
  float: right;
  font-size: 12px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

#main {
  width: 100%;
  height: 720px;
  margin: 0 auto;
  padding-top: 24px;
}
</style>