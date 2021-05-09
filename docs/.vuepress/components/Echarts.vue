<template>
  <div class="echarts" ref="dom"></div>
</template>

<script>
import * as echarts from "echarts";
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
      this.myCharts.setOption(this.option, true);
    },
  },
  mounted() {
    let that = this;
    window.onresize = function () {
      that.echartsResize();
    };
  },
  created() {
    this.getData("/options/" + this.options + ".json");
    this.$nextTick(() => {
      this.echartsInit();
    });
  },
  methods: {
    echartsInit() {
      this.myCharts = echarts.init(this.$refs.dom, "dark");
    },
    echartsResize() {
      console.log("resize");
      this.myCharts.resize;
      // this.myCharts = echarts.init(this.$refs.dom, "dark");
      // this.myCharts.setOption({ ...this.option, ...this.defaultOption }, true);
    },
    getData(url) {
      axios
        .get(url)
        .then((resp) => {
          if (resp) {
            // console.log(JSON.stringify(resp.data));
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
  /* width: 1125px; */
  /* height: 750px; */
  width: 100%;
  height: 720px;
  margin: 0 auto;
  border: 2px solid;
  border-radius: 8px;
}
</style>