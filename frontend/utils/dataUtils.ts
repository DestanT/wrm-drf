import 'core-js/stable/atob'; // Required for atob to work in React Native
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  profile_image: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  id: number; // NOTE: Repeat of user_id
}

// This function checks if the "session" access token is expired
export function tokenExpired(token: string): boolean {
  const decodedToken = jwtDecode<DecodedToken>(token);
  const tokenExpiration = decodedToken.exp;
  const currentTime = Date.now() / 1000;
  return tokenExpiration < currentTime;
}
