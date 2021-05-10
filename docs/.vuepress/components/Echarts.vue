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
      defaultOption: {},
    };
  },
  watch: {
    option: function () {
      this.myCharts.setOption(this.option);
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
  height: 720px;
  margin: 0 auto;
  border: 2px solid;
  border-radius: 8px;
}
</style>