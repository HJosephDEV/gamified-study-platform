import { ref } from "vue";
import { defineStore } from "pinia";

import type { TaskProps } from "@/@types/views/Task";

export const useRegisterActivitiesStore = defineStore("registerActivitiesStore", () => {
  const showActivities = ref(true);
  const showForm = ref(false);
  const selectedActivity = ref({} as TaskProps);

  const $resetRegisterActivities = () => {
    showActivities.value = true;
    showForm.value = false;
    selectedActivity.value = {} as TaskProps;
  };

  const handleShow = (card?: string) => {
    if (!card) return $resetRegisterActivities();

    showActivities.value = card === "modules";
    showForm.value = card === "form";
  };

  return { showActivities, showForm, selectedActivity, handleShow, $resetRegisterActivities };
});
