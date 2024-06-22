export type SendOtpRequest = {
  mobile: string;
};

export type SendOtpResponse = {
  success: boolean;
  otp: string;
  userExists: boolean;
};
