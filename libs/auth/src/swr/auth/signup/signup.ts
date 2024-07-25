import useSWRMutation from 'swr/mutation';
import { signup } from './service';
import { SignUpRequest, SignUpResponse } from './types';
import { SignupSWRKeys } from '../keys';

export function useSignup() {
  const key = [SignupSWRKeys.SIGNUP];

  return useSWRMutation<SignUpResponse, Error, string[] | null, SignUpRequest>(
    key,
    (_, { arg }) => signup({ ...arg }),
  );
}
