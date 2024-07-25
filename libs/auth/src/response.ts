export type VestidoResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      data?: T;
      success: false;
      error: object;
    };
