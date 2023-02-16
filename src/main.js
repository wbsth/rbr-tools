import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./main.css";

import VueApexCharts from "vue3-apexcharts";
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
app.use(VueApexCharts)

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");
