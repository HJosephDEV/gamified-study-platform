export type ModuleProps = {
  id: number;
  name: string;
  description: string;
};

export type ModulesSectionProps = {
  sectionTitle: string;
  modules: ModuleProps[];
};
