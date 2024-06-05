export type VestidoResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: object;
    };
