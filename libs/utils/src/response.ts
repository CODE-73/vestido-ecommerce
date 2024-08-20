export type VestidoResponse<T> =
  | {
      success: true;
      data: T;
      error: undefined;
    }
  | {
      data: undefined;
      success: false;
      error: object;
    };
