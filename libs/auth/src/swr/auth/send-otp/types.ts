export type SendOtpRequest = {
  mobile: string;
};

export type SendOtpResponse = {
  success: boolean;
  data: {
    userExists: boolean;
  };
};
