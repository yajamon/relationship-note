export type Ok<T> = {
  isError: false;
  ok: T;
};

export type Err<E> = {
  isError: true;
  error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export const ok: <T>(value: T) => Ok<T> = (v) => ({ isError: false, ok: v });
export const err: <E>(error: E) => Err<E> = (e) => ({ isError: true, error: e });
