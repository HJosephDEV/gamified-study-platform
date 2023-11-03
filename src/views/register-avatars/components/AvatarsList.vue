<template>
  <div class="avatars-list__container">
    <div class="avatars-list__card-header">
      <AppButton @click="handleShow('form')">Cadastrar</AppButton>
    </div>

    <h2 v-if="avatarsList.length === 0">Não há avatares cadastrados!</h2>
    <div
      v-else
      class="avatars-list__avatars"
    >
      <AvatarItem
        v-for="avatar in avatarsList"
        :id="avatar.id"
        :key="`avatar-${avatar.id}`"
        :src="avatar.src"
        :required-level="avatar.requiredLevel"
        @click="deleteAvatar(avatar.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from "vue";

import { useAppStore } from "@/stores/AppStore";
import { useRegisterAvatarsStore } from "@/stores/RegisterAvatarsStore";

import AppButton from "@/components/app-button/AppButton.vue";
import { deleteAvatarService, getAvatarsService } from "@/services/avatar/service";
import AvatarItem from "./AvatarItem.vue";
import type { AvatarListProps } from "@/@types/views/RegisterAvatars";

const appStore = useAppStore();
const registerAvatarsStore = useRegisterAvatarsStore();
const { handleLoading, handleModal } = appStore;
const { handleShow } = registerAvatarsStore;

const avatarsList: Ref<AvatarListProps> = ref([]);

const getAvatars = async () => {
  handleLoading(true);
  try {
    const response = await getAvatarsService();
    const replacedList = response.data.map((avatar) => ({
      id: avatar.id,
      src: avatar.url,
      requiredLevel: avatar.level_req
    }));

    avatarsList.value = [...replacedList];
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const deleteAvatar = async (id: number) => {
  const params = {
    id
  };

  handleLoading(true);

  try {
    await deleteAvatarService(params);
    await getAvatars();
  } catch (error) {
    // @ts-ignore
    error.response.status === 403 &&
      handleModal({
        active: true,
        title: "Alerta!",
        text: "Existem usuários utilizando este avatar!",
        timeClose: 3000
      });
    console.error(error);
    handleLoading(false);
  }
};

onMounted(() => {
  getAvatars();
});
</script>

<style lang="scss" scoped>
.avatars-list__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  .avatars-list__card-header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .avatars-list__avatars {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 48px;
  }
}

@media (max-width: 720px) {
  .avatars-list__container {
    .avatars-list__avatars {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}

@media (max-width: 560px) {
  .avatars-list__container {
    .avatars-list__avatars {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
