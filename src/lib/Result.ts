export type Result<T, E = Error> =
  | { "Ok": string; }
  | { "Ok": string; value: T }
  | { "Error": string; error: E };