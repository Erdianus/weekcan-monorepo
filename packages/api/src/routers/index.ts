import { dehydrate, HydrationBoundary, QueryClient, useMutationState, useQueryClient } from '@tanstack/react-query';
import { inferData, inferError, inferFnData, inferVariables } from 'react-query-kit';

import client from './client';
import company from './company';
import project from './project';
import role from './role';
import user from './user';
import venue from './venue';

const k = {
  project,
  user,
  company,
  role,
  venue,
  client,
};

export { k, QueryClient, dehydrate, HydrationBoundary, useQueryClient, useMutationState };
export type { inferData, inferFnData, inferVariables, inferError };

export default k;
