import type {
  inferData,
  inferError,
  inferFnData,
  inferVariables,
} from "react-query-kit";

import attendance from "./attendance";
import client from "./client";
import company from "./company";
import inventory from "./inventory";
import jobType from "./job-type";
import project from "./project";
import role from "./role";
import user from "./user";
import venue from "./venue";

const k = {
  project,
  attendance,
  inventory,
  user,
  company,
  role,
  venue,
  client,
  jobType,
};

export { k };
export type { inferData, inferFnData, inferVariables, inferError };
