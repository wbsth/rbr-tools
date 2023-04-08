import { defineStore } from "pinia";
import { ref } from "vue";

export const appSettingsStore = defineStore("appSettingsStore", () => {
  const wideViewEnabled = ref(false);
  return {
    wideViewEnabled,
  };
});
