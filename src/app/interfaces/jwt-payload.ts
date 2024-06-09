export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  exp: number;
  iss: string;
  aud: string;
}
