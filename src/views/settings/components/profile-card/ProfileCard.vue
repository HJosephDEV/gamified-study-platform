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
            Joseph Haase Joseph Haase Joseph Haase
          </span>
          <span class="profile-card__profile-username text-ellipsis">haasedevv</span>
          <span class="profile-card__profile-level text-ellipsis">Level 30</span>
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
      @selec-profile-event="selectProfile"
      @close="handleCharacterModal('close')"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import AppButton from "@/components/app-button/AppButton.vue";
import CharactersModal from "@/components/characters-modal/CharactersModal.vue";

const opennedCharacterModal = ref(false);
const handleCharacterModal = (action: string) => {
  if (action === "open") {
    opennedCharacterModal.value = true;
    return;
  }

  opennedCharacterModal.value = false;
};

const profileList = ref([
  { id: 1, src: "/src/assets/images/poro.png", selected: true },
  { id: 2, src: "/src/assets/images/poro.png", selected: false },
  { id: 3, src: "/src/assets/images/poro.png", selected: false },
  { id: 4, src: "/src/assets/images/poro.png", selected: false },
  { id: 5, src: "/src/assets/images/poro.png", selected: false },
  { id: 6, src: "/src/assets/images/poro.png", selected: false },
  { id: 7, src: "/src/assets/images/poro.png", selected: false },
  { id: 8, src: "/src/assets/images/poro.png", selected: false }
]);

const selectProfile = (id: number | string) => {
  profileList.value.forEach((profile) => {
    profile.selected = profile.id === id;
  });
};

const selectedProfile = computed(() => profileList.value.find((profile) => profile.selected)?.src);
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
