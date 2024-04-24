import {
  inferData,
  inferError,
  inferFnData,
  inferVariables,
} from "react-query-kit";
import user from "./user";
import company from "./company";
import role from "./role";
import { HydrationBoundary, QueryClient, dehydrate,useQueryClient } from "@tanstack/react-query";

const k = {
  user,
  company,
  role
};

export { k, QueryClient, dehydrate, HydrationBoundary, useQueryClient };
export type { inferData, inferFnData, inferVariables, inferError };

export default k;
