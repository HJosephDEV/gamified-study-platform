import { ref } from "vue";
import { defineStore } from "pinia";

export const useRegisterModulesStore = defineStore("registerModulesStore", () => {
  const showModules = ref(true);
  const showForm = ref(false);

  const $resetRegisterModules = () => {
    showModules.value = true;
    showForm.value = false;
  };

  const handleShow = (card?: string) => {
    if (!card) return $resetRegisterModules();

    showModules.value = card === "modules";
    showForm.value = card === "form";
  };

  return { showModules, showForm, handleShow, $resetRegisterModules };
});
