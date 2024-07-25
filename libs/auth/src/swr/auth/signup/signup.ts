import useSWRMutation from 'swr/mutation';

import { SignupSWRKeys } from '../keys';
import { signup } from './service';
import { SignUpRequest, SignUpResponse } from './types';

export function useSignup() {
  const key = [SignupSWRKeys.SIGNUP];

  return useSWRMutation<SignUpResponse, Error, string[] | null, SignUpRequest>(
    key,
    (_, { arg }) => signup({ ...arg }),
  );
}
