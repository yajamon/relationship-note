import { Thing } from "./domain/thing";

export type Association = {
  thing: Thing;
  label: string;
  description: string;
};
