import {
  inferData,
  inferError,
  inferFnData,
  inferVariables,
} from "react-query-kit";
import user from "./user";
import company from "./company";
import role from "./role";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import venue from "./venue";
import client from "./client";
import project from "./project";

const k = {
  project,
  user,
  company,
  role,
  venue,
  client,
};

export {
  k,
  QueryClient,
  dehydrate,
  HydrationBoundary,
  useQueryClient,
  useMutationState,
};
export type { inferData, inferFnData, inferVariables, inferError };

export default k;
