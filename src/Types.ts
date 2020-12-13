export interface PassportInfo {
  headshot: string;
  vaxRecord: string; // JSONized VaxRecord
}
type Encrypted<T> = {
  readonly [P in keyof T]: T[P] extends string ? Buffer : T[P];
};

export type EncryptedPassportInfo = Encrypted<PassportInfo>;
