export type InputProps = {
  inputLabel: string;
  inputValue: string | number | null;
  inputFeedback?: string;
  inputStatus?: boolean;
  inputPlaceholder?: string;
};

export type EmitsProps = {
  (e: "update:inputValue", value: HTMLInputElement["value"]): HTMLInputElement["value"];
};
