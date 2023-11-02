<template>
  <div class="register-step-two__container">
    <CharactersModal
      v-if="opennedCharacterModal"
      :profile-list="profileList"
      @selec-profile-event="selectProfile"
      @close="handleCharacterModal('close')"
    />

    <BackButton
      class="register-step-two__back-button"
      @click="backToStepOne"
    >
      voltar
    </BackButton>

    <h1 class="register-step-two__title">Escolha seu avatar</h1>

    <div class="register-step-two__buttons-container">
      <div
        class="register-step-two__photo-button"
        @click="handleCharacterModal('open')"
      >
        <img
          :src="selectedProfile?.src"
          alt="Foto de perfil"
        />
      </div>

      <AppButton
        is-full
        @click="register"
      >
        Cadastrar
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, computed, nextTick, onMounted, type Ref } from "vue";
import { storeToRefs } from "pinia";

import type { ProfileProps } from "@/@types/components/CharacterModal";
import type { ProviderAppProps } from "@/@types/providers/App";

import { useUserStore } from "@/stores/UserStore";
import { useAppStore } from "@/stores/AppStore";
import { useRegisterStore } from "@/stores/RegisterStore";
import type { UserProps } from "@/@types/services/UserService";
import { getAvatarsService } from "@/services/avatar/service";
import { loginUserService, registerUserService } from "@/services/user/service";

import CharactersModal from "@/components/characters-modal/CharactersModal.vue";
import AppButton from "@/components/app-button/AppButton.vue";
import BackButton from "@/components/back-button/BackButton.vue";

const { $router } = inject<ProviderAppProps>("app") || ({} as ProviderAppProps);

const registerStore = useRegisterStore();
const userStore = useUserStore();
const appStore = useAppStore();

const { changeStep, registerFields } = registerStore;
const { userData } = storeToRefs(userStore);
const { handleLoading } = appStore;

const backToStepOne = () => changeStep(1);

const opennedCharacterModal = ref(false);
const handleCharacterModal = (action: string) => {
  opennedCharacterModal.value = action === "open";
};

const profileList: Ref<ProfileProps[]> = ref([]);

const getAvatars = async () => {
  handleLoading(true);
  try {
    const response = await getAvatarsService();
    const replacedList = response.data.map((avatar) => ({
      id: avatar.id,
      src: avatar.url,
      selected: avatar.selecionado,
      blocked: avatar.desbloqueado
    }));
    profileList.value = [...replacedList];
    profileList.value[0].selected = true;
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const selectProfile = (id: number | string) => {
  profileList.value.forEach((profile) => {
    profile.selected = profile.id === id;
  });
};

const selectedProfile = computed(() => profileList.value.find((profile) => profile.selected));

const saveUserData = (infos: UserProps | undefined) => {
  if (!infos) return;

  userData.value = {
    id: infos.id,
    firstname: infos.nome,
    lastname: infos.sobrenome,
    username: infos.login,
    email: infos.email,
    userLevel: infos.user_level,
    userExp: infos.user_exp,
    userNextLevelExp: infos.user_next_level_exp,
    blocked: infos.bloqueado,
    lifes: infos.vidas,
    avatarId: infos.id_avatar,
    avatarSrc: infos.url_avatar,
    isAdmin: infos.is_admin,
    token: infos.token
  };

  localStorage.setItem("token", infos.token);
};

const login = async () => {
  const payload = {
    login: registerFields.email.value,
    senha: registerFields.password.value
  };

  try {
    const response = await loginUserService(payload);
    saveUserData(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
    nextTick(() => $router.push({ name: "dashboard" }));
  }
};

const register = async () => {
  const payload = {
    nome: registerFields.firstname.value,
    sobrenome: registerFields.lastname.value,
    login: registerFields.username.value,
    email: registerFields.email.value,
    senha: registerFields.password.value,
    id_avatar: selectedProfile.value!.id,
    is_admin: false
  };

  handleLoading(true);
  try {
    await registerUserService(payload);
  } catch (error) {
    console.error(error);
  } finally {
    login();
  }
};

onMounted(() => {
  getAvatars();
});
</script>

<style lang="scss">
.register-step-two__container {
  .register-step-two__back-button {
    align-self: flex-start;
  }
}
</style>

<style lang="scss" scoped>
.register-step-two__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .register-step-two__title {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    margin: 36px 0;
    text-align: center;
  }

  .register-step-two__buttons-container {
    margin-bottom: 36px;
    display: flex;
    flex-direction: column;
    gap: 36px;

    .register-step-two__photo-button {
      display: flex;
      border: 3px solid #ffe500;
      height: 128px;
      width: 128px;
      cursor: pointer;

      img {
        max-width: 100%;
      }
    }
  }
}
</style>
