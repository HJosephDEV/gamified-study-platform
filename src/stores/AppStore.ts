import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { ModalInfosProps } from "@/@types/stores/AppStore";

export const useAppStore = defineStore("appStore", () => {
  const showLoading = ref(false);
  const showModal = ref(false);
  const modalInfos: Ref<ModalInfosProps> = ref({
    title: "",
    subtitle: "",
    text: "",
    textGreenButton: "",
    textRedButton: "",
    eventGreenButton: () => {},
    eventRedButton: () => {}
  });

  const handleModal = (params: ModalInfosProps) => {
    modalInfos.value = {
      ...params,
      eventGreenButton: params?.eventGreenButton || (() => {}),
      eventRedButton: params?.eventRedButton || (() => {})
    };
  };

  const handleLoading = (value: boolean) => {
    showLoading.value = value;
  };

  const $reset = () => {
    showLoading.value = false;
  };

  return { handleLoading, showLoading, handleModal, showModal, modalInfos, $reset };
});
