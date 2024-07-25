import useSWRMutation from 'swr/mutation';

import { LoginSWRKeys } from '../keys';
import { login } from './service';
import { LoginRequest, LoginResponse } from './types';

export function useLogin() {
  const key = [LoginSWRKeys.LOGIN];

  return useSWRMutation<LoginResponse, Error, string[] | null, LoginRequest>(
    key,
    (_, { arg }) => login({ ...arg }),
  );
}
