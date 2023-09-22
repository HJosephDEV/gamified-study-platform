<template>
  <div class="form-input__container">
    <label>{{ inputLabel }}</label>
    <input
      :class="[{ 'is-invalid': !inputStatus }]"
      :value="inputValue"
      :placeholder="inputPlaceholder"
      @input="updateInputValue"
    />
    <span v-if="!inputStatus">{{ inputFeedback }}</span>
  </div>
</template>

<script lang="ts" setup>
import { type InputProps, type EmitsProps } from "@/@types/components/FormInput";

const { inputLabel, inputValue, inputFeedback, inputStatus, inputPlaceholder } = withDefaults(
  defineProps<InputProps>(),
  {
    inputStatus: true
  }
);

const emit = defineEmits<EmitsProps>();

const updateInputValue = (e: Event) => {
  emit("update:inputValue", (e.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
.form-input__container {
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    color: #fff;
    font-size: 10px;
    font-weight: 400;
  }

  input {
    width: 100%;
    padding: 6px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid #fff;
    color: #212121;
    font-size: 9px;
    font-weight: 600;
    outline: none;
    margin-top: 4px;

    &::placeholder {
      color: #a8a8a8;
    }
    &.is-invalid {
      border-color: #ff6363;
    }
  }

  span {
    color: #ff6363;
    font-size: 7px;
    font-weight: 400;
    margin-top: 4px;
  }
}
</style>
