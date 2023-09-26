export const hasEspecialCaracter = (string: string): boolean => {
  const regex = /[^a-zA-Z0-9]/g;
  return regex.test(string);
};

export const isEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm;
  return regex.test(email);
};
