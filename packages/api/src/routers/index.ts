import type {
  inferData,
  inferError,
  inferFnData,
  inferVariables,
} from "react-query-kit";

import client from "./client";
import company from "./company";
import jobType from "./job-type";
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
  jobType,
};

export { k };
export type { inferData, inferFnData, inferVariables, inferError };
