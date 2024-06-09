import { IdentityError } from './identity-error';

export interface IdentityResult {
  success: boolean;
  errors: IdentityError[];
}
