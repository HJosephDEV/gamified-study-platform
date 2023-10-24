import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", () => {
  const showLoading = ref(false);

  const handleLoading = (value: boolean) => {
    showLoading.value = value;
  };

  const $reset = () => {
    showLoading.value = false;
  };

  return { handleLoading, showLoading, $reset };
});
