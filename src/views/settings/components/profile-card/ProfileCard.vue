<template>
  <div class="profile-card__wrapper">
    <div class="profile-card__container">
      <div class="profile-card__profile-photo">
        <img
          :src="selectedProfile"
          alt="Foto do perfil"
        />
      </div>
      <div class="profile-card__right-container">
        <div class="profile-card__profile-infos">
          <span class="profile-card__profile-name text-ellipsis">
            {{ userData.firstname }} {{ userData.lastname }}
          </span>
          <span class="profile-card__profile-username text-ellipsis">{{ userData.username }}</span>
          <span class="profile-card__profile-level text-ellipsis"
            >Level {{ userData.userLevel }}</span
          >
        </div>
      </div>
    </div>

    <AppButton
      is-full
      @click="handleCharacterModal('open')"
    >
      Trocar avatar
    </AppButton>

    <CharactersModal
      v-if="opennedCharacterModal"
      :profile-list="profileList"
      @selec-profile-event="selectAvatar"
      @close="handleCharacterModal('close')"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, type Ref } from "vue";
import type { ProfileProps } from "@/@types/components/CharacterModal";
import AppButton from "@/components/app-button/AppButton.vue";
import CharactersModal from "@/components/characters-modal/CharactersModal.vue";
import { useUserStore } from "@/stores/UserStore";
import { getAvatarsService } from "@/services/avatar/service";
import { useAppStore } from "@/stores/AppStore";
import { changeAvatarUserService } from "@/services/user/service";

const appStore = useAppStore();
const userStore = useUserStore();
const { userData } = userStore;
const { handleLoading } = appStore;

const opennedCharacterModal = ref(false);
const handleCharacterModal = (action: string) => {
  if (action === "open") {
    opennedCharacterModal.value = true;
    return;
  }

  opennedCharacterModal.value = false;
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
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const selectAvatar = async (id: number) => {
  const payload = {
    id_avatar: id
  };

  handleLoading(true);
  try {
    await changeAvatarUserService(payload);
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

const selectedProfile = computed(() => profileList.value.find((profile) => profile.selected)?.src);

onMounted(() => {
  getAvatars();
});
</script>

<style lang="scss" scoped>
.text-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.profile-card__wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .profile-card__container {
    display: flex;
    gap: 24px;
    .profile-card__profile-photo {
      min-width: 108px;
      min-width: 108px;
      height: 108px;
      height: 108px;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .profile-card__right-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .profile-card__profile-infos {
        display: flex;
        flex-direction: column;

        .profile-card__profile-name,
        .profile-card__profile-username,
        .profile-card__profile-level {
          color: #ffe500;
          font-weight: 600;
          line-height: normal;
        }

        .profile-card__profile-name {
          font-size: 12px;
        }
        .profile-card__profile-username {
          font-size: 12px;
        }
        .profile-card__profile-level {
          font-size: 10px;
        }
      }
    }
  }
}

@media (max-width: 550px) {
  .profile-card__container {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .profile-card__profile-photo {
      width: 108px;
      height: 108px;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .profile-card__right-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 12px;
      .profile-card__profile-infos {
        display: flex;
        flex-direction: column;

        .profile-card__profile-name,
        .profile-card__profile-username,
        .profile-card__profile-level {
          color: #ffe500;
          font-weight: 600;
          line-height: normal;
        }

        .profile-card__profile-name {
          font-size: 12px;
        }
        .profile-card__profile-username {
          font-size: 12px;
        }
        .profile-card__profile-level {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
