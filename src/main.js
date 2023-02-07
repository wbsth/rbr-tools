import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./main.css";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { faXmark } from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faXmark);

const app = createApp(App);

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");
