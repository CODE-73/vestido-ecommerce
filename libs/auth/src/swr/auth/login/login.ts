import useSWRMutation from 'swr/mutation';
import { login } from './service';
import { LoginRequest, LoginResponse } from './types';
import { LoginSWRKeys } from '../keys';

export function useLogin() {
  const key = [LoginSWRKeys.LOGIN];

  return useSWRMutation<LoginResponse, Error, string[] | null, LoginRequest>(
    key,
    (_, { arg }) => login({ ...arg })
  );
}
