<template>
  <div class="avatars-register-form__container">
    <div class="avatars-register-form__card-header">
      <BackButton @click="handleShow()">Voltar para avatares</BackButton>
    </div>

    <div class="avatars-register-form__form">
      <div class="avatars-register-form__level-wrapper">
        <span>Level</span>
        <div class="avatars-register-form__level-container">
          <MinusIcon
            class="avatars-register-form__level-icon"
            @click="handleRequiredLevel('minus')"
          />
          <span>{{ requiredLevel }}</span>
          <PlusIcon
            class="avatars-register-form__level-icon"
            @click="handleRequiredLevel('plus')"
          />
        </div>
      </div>
      <div class="avatars-register-form__photo-area-container">
        <img :src="imageFile" />
      </div>
      <AppButton @click="handleClickInputFile">Adicionar</AppButton>

      <input
        ref="inputFile"
        class="avatars-register-form__input-file"
        type="file"
        accept="image/*"
        @change="onChangeFileUpload"
      />
    </div>

    <AppButton
      is-full
      @click="saveAvatar"
    >
      Salvar
    </AppButton>
  </div>
</template>

<script lang="ts" setup>
import { MinusIcon, PlusIcon } from "lucide-vue-next";
import { ref, type Ref } from "vue";

import AppButton from "@/components/app-button/AppButton.vue";
import BackButton from "@/components/back-button/BackButton.vue";

import { useAppStore } from "@/stores/AppStore";
import { useRegisterAvatarsStore } from "@/stores/RegisterAvatarsStore";
import { createAvatarService } from "@/services/avatar/service";

const registerAvatarsStore = useRegisterAvatarsStore();
const appStore = useAppStore();
const { handleLoading, handleModal } = appStore;
const { handleShow } = registerAvatarsStore;

const inputFile: Ref<HTMLInputElement | null> = ref(null);
const imageFile = ref("");
const requiredLevel = ref(1);

const handleRequiredLevel = (button: "minus" | "plus") => {
  if (button === "minus" && requiredLevel.value === 1) return;

  if (button === "minus") {
    requiredLevel.value--;
    return;
  }

  requiredLevel.value++;
};

const handleClickInputFile = () => {
  inputFile.value?.click();
};

const onChangeFileUpload = async (event: Event) => {
  // @ts-ignore
  const file = event!.target!.files[0];
  const base64 = await getBase64(file);
  // @ts-ignore
  imageFile.value = base64;
};

const getBase64 = async (file: File) =>
  await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // @ts-ignore
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const saveAvatar = async () => {
  if (!imageFile.value)
    return handleModal({
      active: true,
      title: "Alerta!",
      text: "Insira uma imagem!",
      timeClose: 2000
    });

  const payload = {
    url: imageFile.value,
    level_req: requiredLevel.value
  };

  handleLoading(true);

  try {
    await createAvatarService(payload);
    handleShow();
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};
</script>

<style lang="scss">
.avatars-register-form__level-icon {
  height: 32px;
  width: 32px;
  border: 2px solid #fee500;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    path {
      color: #fee500;
    }
  }
}
</style>

<style lang="scss" scoped>
.avatars-register-form__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 36px;

  .avatars-register-form__card-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }

  .avatars-register-form__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .avatars-register-form__input-file {
      opacity: 0;
      position: absolute;
      left: -100vw;
      top: -100vh;
    }

    .avatars-register-form__photo-area-container {
      height: 128px;
      width: 128px;
      background: #fff;
      border: 2px solid #fff;

      img {
        max-width: 100%;
        max-height: 100%;
        background-size: cover;
      }
    }

    .avatars-register-form__level-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      .avatars-register-form__level-container {
        display: flex;
        align-items: center;
        gap: 12px;
        user-select: none;
      }
    }
  }
}
</style>
