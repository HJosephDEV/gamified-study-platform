<template>
  <div class="activities-register-form__draggable">
    <div
      v-for="(answer, index) in fields.answers"
      :key="`answer-${index}`"
      class="activities-register-form__draggable-container"
    >
      <span v-if="!answer.valid">{{ answer.feedback }}</span>
      <div
        class="activities-register-form__photo-area"
        @click="handleClickInputFile(index)"
      >
        <img :src="answer.value" />
      </div>
      <div
        class="activities-register-form__container-buttons-fields"
        :style="`padding-bottom: ${!answer.valid ? '11px' : '0'}`"
      >
        <AppButton
          v-if="index === fields.answers.length - 1 && fields.answers.length < 4"
          @click="addAnswer"
          >+
        </AppButton>
        <AppButton
          v-if="fields.answers.length > 2"
          @click="removeAnswer(index)"
          >-
        </AppButton>
      </div>

      <input
        :id="`inputFile${index}`"
        class="activities-register-form__input-file"
        type="file"
        accept="image/*"
        @change="onChangeFileUpload($event, index)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from "@/components/app-button/AppButton.vue";
import { useRegisterActivitiesStore } from "@/stores/RegisterActivitiesStore";
import { storeToRefs } from "pinia";
import { getBase64 } from "@/utils";
import { onMounted } from "vue";

const registerActivitiesStore = useRegisterActivitiesStore();
const { fields } = storeToRefs(registerActivitiesStore);

const addAnswer = () => {
  fields.value.answers = [
    ...fields.value.answers,
    {
      value: ""
    }
  ];
};

const handleClickInputFile = (index: number) => {
  document.getElementById(`inputFile${index}`)?.click();
};

const onChangeFileUpload = async (event: Event, index: number) => {
  // @ts-ignore
  const file = event!.target!.files[0];
  const base64 = await getBase64(file);
  // @ts-ignore
  fields.value.answers[index].value = base64;
};

const removeAnswer = (index: number) => {
  fields.value.answers.splice(index, 1);
  fields.value.correctAnswerIndex = 0;
};

onMounted(() => {
  fields.value.answers = fields.value.answers.length
    ? [...fields.value.answers]
    : [{ value: "" }, { value: "" }];
});
</script>

<style lang="scss" scoped>
.activities-register-form__draggable {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 36px;

  .activities-register-form__draggable-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    .activities-register-form__photo-area {
      background: #fff;
      min-height: 200px;
      width: 320px;
      cursor: pointer;

      img {
        max-width: 100%;
        object-fit: cover;
      }
    }

    .activities-register-form__container-buttons-fields {
      display: flex;
      gap: 8px;

      button {
        height: 34px;
      }
    }
  }

  .activities-register-form__input-file {
    opacity: 0;
    position: absolute;
    left: -100vw;
    top: -100vh;
  }
}
</style>
