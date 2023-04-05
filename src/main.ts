import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./main.css";
import myTheme from "./data/highchartsTheme";

import HighchartsVue from "highcharts-vue";
import * as Highcharts from "highcharts";

import * as VueResize from "vue3-resize";
import "vue3-resize/dist/vue3-resize.css";

Highcharts.setOptions(myTheme as any);

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import {
  faEye,
  faXmark,
  faBars,
  faCheck,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faXmark, faEye, faBars, faCheck, faQuestion);

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(HighchartsVue as any);
app.use(VueResize);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
