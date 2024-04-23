import {
  inferData,
  inferError,
  inferFnData,
  inferVariables,
} from "react-query-kit";
import user from "./user";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const k = {
  user,
};

export { k, QueryClient, dehydrate, HydrationBoundary };
export type { inferData, inferFnData, inferVariables, inferError };

export default k;
