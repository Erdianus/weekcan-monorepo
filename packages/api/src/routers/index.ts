import type {
  inferData,
  inferError,
  inferFnData,
  inferVariables,
} from "react-query-kit";

import client from "./client";
import company from "./company";
import project from "./project";
import role from "./role";
import user from "./user";
import venue from "./venue";

const k = {
  project,
  user,
  company,
  role,
  venue,
  client,
};

export { k };
export type { inferData, inferFnData, inferVariables, inferError };
