import useSWRMutation from 'swr/mutation';

import { OtpSWRKeys } from '../keys';
import { sendOtp } from './service';
import { SendOtpRequest, SendOtpResponse } from './types';

export function useSendOTP() {
  const key = [OtpSWRKeys.OTP, OtpSWRKeys.SEND];

  return useSWRMutation<
    SendOtpResponse,
    Error,
    string[] | null,
    SendOtpRequest
  >(key, (_, { arg }) => sendOtp({ ...arg }));
}
