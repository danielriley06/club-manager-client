import JwtDecode from "jwt-decode";

export interface IToken {
  user_id: number;
  sub: number;
  authorization: string[];
  type: string;
  exp: number;
}

const localStorageTokenName: string =
  process.env.REACT_APP_TOKEN_STORAGE_NAME || "club-manager";

export function setAuthorizationToken(token: string): void {
  return localStorage.setItem(localStorageTokenName, token);
}

export function removeAuthorizationToken(): void {
  return localStorage.removeItem(localStorageTokenName);
}

export function getAuthorizationToken(): string | undefined {
  const token = localStorage.getItem(localStorageTokenName) || undefined;
  return token;
}

export function userIsLoggedIn(): boolean {
  const encryptedToken: string | undefined = getAuthorizationToken();
  let isAuthorized: boolean = false;
  try {
    isAuthorized = authorizationTokenIsEffective(encryptedToken);
  } catch (e) {
    isAuthorized = false;
  }
  return isAuthorized;
}

export function authorizationTokenIsEffective(token?: string): boolean {
  let isEffective: boolean = false;
  if (typeof token === "undefined") {
    return isEffective;
  }
  try {
    const decodedToken: IToken = JwtDecode(token);
    const currentTime = new Date().getTime() / 1000;
    if (currentTime < decodedToken.exp) {
      return true;
    }
  } catch (e) {
    isEffective = false;
  }
  return isEffective;
}
