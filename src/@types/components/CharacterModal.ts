export type ProfileProps = {
  id: number;
  src: string;
  selected: boolean;
};

export type CharacterModalProps = {
  profileList: Array<ProfileProps>;
};

export type CharacterModalEmitProps = {
  (e: "close"): void;
  (e: "selecProfileEvent", value: number | string): number | string;
};
