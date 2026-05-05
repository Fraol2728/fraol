import type { SchemaTypeDefinition } from "sanity";
import { about } from "./about";
import { post } from "./post";
import { project } from "./project";
import { service } from "./service";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, post, service, about],
};
