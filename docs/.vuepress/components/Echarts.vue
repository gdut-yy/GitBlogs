<template>
  <div class="echarts" ref="dom"></div>
</template>

<script>
import * as echarts from "echarts/core";
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);
import axios from "axios";

export default {
  name: "echarts",
  props: ["options"],
  data() {
    return {
      dom: null,
      myCharts: null,
      option: {},
      defaultOption: {
        title: {
          text:
            "Deserialization of various payloads size - ops/s (higher is better)",
          left: "1%",
          top: "2%",
          textStyle: {
            fontSize: 24,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          orient: "vertical",
          align: "left",
          top: "10%",
          x: "right",
          y: "top",
        },
        grid: {
          top: "12%",
          right: "12%",
          bottom: "12%",
        },
        yAxis: {},
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 40,
          },
        },
        series: [
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
        ],
      },
    };
  },
  watch: {
    option: function () {
      this.myCharts.setOption({ ...this.defaultOption, ...this.option });
    },
  },
  mounted() {
    let that = this;
    window.addEventListener("resize", function () {
      that.echartsResize();
    });
  },
  created() {
    this.getData("../../options/" + this.options);
    this.$nextTick(() => {
      this.echartsInit();
    });
  },
  methods: {
    echartsInit() {
      if (this.$refs.dom) {
        this.myCharts = echarts.init(this.$refs.dom, "dark");
      }
    },
    echartsResize() {
      this.myCharts.resize();
    },
    getData(url) {
      axios
        .get(url)
        .then((resp) => {
          if (resp) {
            this.option = resp.data;
          }
        })
        .catch((e) => {
          this.option = {};
        });
    },
  },
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 72vh;
  margin: 0 auto;
  border: 2px solid;
  border-radius: 8px;
}
</style>