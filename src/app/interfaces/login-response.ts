import { IdentityResult } from './identity-result';

export interface LoginResponse {
  result: IdentityResult;
  token: string;
}
