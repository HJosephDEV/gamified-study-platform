/* eslint-disable no-unused-vars */
export type InputProps = {
  inputLabel: string;
  inputValue: string | number | null;
  inputFeedback?: string;
  inputStatus?: boolean;
};

export type EmitsProps = {
  (e: "update:inputValue", value: HTMLInputElement["value"]): HTMLInputElement["value"];
};
