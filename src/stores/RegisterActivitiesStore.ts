import { type Ref, ref } from "vue";
import { defineStore } from "pinia";

import type { TaskProps } from "@/@types/views/Task";
import type { RegisterActivitiesFieldsProps } from "@/@types/stores/RegisterActivitiesStore";

export const useRegisterActivitiesStore = defineStore("registerActivitiesStore", () => {
  const showActivities = ref(true);
  const showForm = ref(false);
  const selectedActivity = ref({} as TaskProps);
  const selectedModule: Ref<number | null> = ref(null);

  const fields: Ref<RegisterActivitiesFieldsProps> = ref({
    type: 0,
    name: {
      label: "Nome da atividade",
      value: "",
      type: "text",
      placeholder: "Digite aqui"
    },
    exp: {
      label: "Quantidade de exp",
      value: 1,
      type: "number",
      placeholder: "Digite aqui"
    },
    content: {
      label: "Conteúdo da atividade",
      value: "",
      type: "text",
      placeholder: "Digite aqui"
    },
    answers: [],
    correctAnswerIndex: 0
  });

  const checkRequiredField = (validations: any, key: string) => {
    const status = !!fields.value[key].value;
    validations[key].valid = status;
    validations[key].feedback = status ? "" : "Campo obrigatório";

    return status;
  };

  const validations = ref({
    type: {
      valid: true,
      feedback: "",
      validation: () => fields.value.type !== null
    },
    name: {
      valid: true,
      feedback: "",
      validation: () => checkRequiredField(validations.value, "name")
    },
    exp: {
      valid: true,
      feedback: "",
      validation: () => {
        const isValid = fields.value.exp.value > 0;
        validations.value.exp.valid = isValid;
        validations.value.exp.feedback = isValid ? "" : "Campo obrigatório";

        return isValid;
      }
    },
    content: {
      valid: true,
      feedback: "",
      validation: () => {
        if (fields.value.type === 0) {
          return checkRequiredField(validations.value, "content");
        }

        return true;
      }
    },
    answers: {
      valid: true,
      feedback: "",
      validation: () => {
        if (!fields.value.answers.length) return false;

        let isValid = true;

        fields.value.answers.forEach((answer, i) => {
          const status = !!answer.value;
          fields.value.answers[i].valid = status;
          fields.value.answers[i].feedback = status ? "" : "Campo obrigatório";

          if (isValid && !status) {
            isValid = false;
          }
        });

        return isValid;
      }
    },
    correctAnswerIndex: {
      valid: true,
      feedback: "",
      validation: () => fields.value.correctAnswerIndex !== null
    }
  });

  const $resetRegisterActivities = () => {
    showActivities.value = true;
    showForm.value = false;
    selectedActivity.value = {} as TaskProps;
    fields.value = {
      type: 0,
      name: {
        label: "Nome da atividade",
        value: "",
        type: "text",
        placeholder: "Digite aqui"
      },
      exp: {
        label: "Quantidade de exp",
        value: 1,
        type: "number",
        placeholder: "Digite aqui"
      },
      content: {
        label: "Conteúdo da atividade",
        value: "",
        type: "text",
        placeholder: "Digite aqui"
      },
      answers: [],
      correctAnswerIndex: 0
    };
    validations.value = {
      type: {
        valid: true,
        feedback: "",
        validation: () => fields.value.type !== null
      },
      name: {
        valid: true,
        feedback: "",
        validation: () => checkRequiredField(validations.value, "name")
      },
      exp: {
        valid: true,
        feedback: "",
        validation: () => {
          const isValid = fields.value.exp.value > 0;
          validations.value.exp.valid = isValid;
          validations.value.exp.feedback = isValid ? "" : "Campo obrigatório";

          return isValid;
        }
      },
      content: {
        valid: true,
        feedback: "",
        validation: () => {
          if (fields.value.type === 0) {
            return checkRequiredField(validations.value, "content");
          }

          return true;
        }
      },
      answers: {
        valid: true,
        feedback: "",
        validation: () => {
          if (!fields.value.answers.length) return false;

          let isValid = true;

          fields.value.answers.forEach((answer, i) => {
            const status = !!answer.value;
            fields.value.answers[i].valid = status;
            fields.value.answers[i].feedback = status ? "" : "Campo obrigatório";

            if (isValid && !status) {
              isValid = false;
            }
          });

          return isValid;
        }
      },
      correctAnswerIndex: {
        valid: true,
        feedback: "",
        validation: () => fields.value.correctAnswerIndex !== null
      }
    };
  };

  const cleanContentAndAnswers = () => {
    fields.value = {
      ...fields.value,
      content: {
        label: "Conteúdo da atividade",
        value: "",
        type: "text",
        placeholder: "Digite aqui"
      },
      answers: [],
      correctAnswerIndex: 0
    };

    validations.value = {
      ...validations.value,
      content: {
        valid: true,
        feedback: "",
        validation: () => {
          if (fields.value.type === 0) {
            return checkRequiredField(validations.value, "content");
          }

          return true;
        }
      },
      answers: {
        valid: true,
        feedback: "",
        validation: () => {
          if (!fields.value.answers.length) return false;

          let isValid = true;

          fields.value.answers.forEach((answer, i) => {
            const status = !!answer.value;
            fields.value.answers[i].valid = status;
            fields.value.answers[i].feedback = status ? "" : "Campo obrigatório";

            if (isValid && !status) {
              isValid = false;
            }
          });

          return isValid;
        }
      },
      correctAnswerIndex: {
        valid: true,
        feedback: "",
        validation: () => fields.value.correctAnswerIndex !== null
      }
    };
  };

  const handleShow = (card?: string) => {
    if (!card) return $resetRegisterActivities();

    showActivities.value = card === "modules";
    showForm.value = card === "form";
  };

  return {
    fields,
    validations,
    showActivities,
    showForm,
    selectedActivity,
    selectedModule,
    handleShow,
    cleanContentAndAnswers,
    $resetRegisterActivities
  };
});
