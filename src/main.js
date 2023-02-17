import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./main.css";

import HighchartsVue from 'highcharts-vue'
import Highcharts from "highcharts";

Highcharts.theme = 
{
    "colors": ["#F92672", "#66D9EF", "#A6E22E", "#A6E22E"],
    "chart": {
      "backgroundColor": "#272822",
      "style": {
        "fontFamily": "Inconsolata",
        "color": "#A2A39C"
      }
    },
    "title": {
      "style": {
        "color": "#A2A39C"
      },
      "align": "left"
    },
    "subtitle": {
      "style": {
        "color": "#A2A39C"
      },
      "align": "left"
    },
    "legend": {
      "align": "right",
      "verticalAlign": "bottom",
      "itemStyle": {
        "fontWeight": "normal",
        "color": "#A2A39C"
      }
    },
    "xAxis": {
      "gridLineDashStyle": "Dot",
      "gridLineWidth": 1,
      "gridLineColor": "#A2A39C",
      "lineColor": "#A2A39C",
      "minorGridLineColor": "#A2A39C",
      "tickColor": "#A2A39C",
      "tickWidth": 1
    },
    "yAxis": {
      "gridLineDashStyle": "Dot",
      "gridLineColor": "#A2A39C",
      "lineColor": "#A2A39C",
      "minorGridLineColor": "#A2A39C",
      "tickColor": "#A2A39C",
      "tickWidth": 1
    }
  };

  Highcharts.setOptions(Highcharts.theme);

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faXmark, faEye);

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(HighchartsVue)

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");
