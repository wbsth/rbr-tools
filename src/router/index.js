import { createRouter, createWebHistory } from "vue-router";
import ExtractorView from "../views/ExtractorView.vue";
import ReplacerView from "../views/ReplacerView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "extractor",
      component: ExtractorView,
    },
    {
      path: "/replacer",
      name: "replacer",
      component: ReplacerView,
    },
  ],
});

export default router;
