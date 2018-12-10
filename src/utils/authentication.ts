import jwtDecode from "jwt-decode";

interface Authority {
  [position: number]: string;
}

export interface Token {
  user_id: number;
  sub: number;
  authorization: Array<string>;
  type: string;
  exp: number;
}

const localStorageTokenName: string = process.env.REACT_APP_TOKEN_STORAGE_NAME;

export function setAuthorizationToken(token: string): void {
  return localStorage.setItem(localStorageTokenName, token);
}

export function getAuthorizationToken(): string {
  const token: string = localStorage.getItem(localStorageTokenName);
  return token || null;
}

export function userIsLoggedIn(token?: string): boolean {
  const encryptedToken: string =
    typeof token === "undefined" ? getAuthorizationToken() : token;
  let isAuthorized: boolean = false;
  try {
    isAuthorized = authorizationTokenIsEffective(encryptedToken);
  } catch (e) {
    isAuthorized = false;
  }
  console.log("triggered!", isAuthorized);
  return isAuthorized;
}

export function authorizationTokenIsEffective(
  encryptedToken?: string
): boolean {
  let isEffective: boolean = false;
  try {
    const decodedToken: Token = jwtDecode(encryptedToken);
    const currentTime = new Date().getTime() / 1000;
    console.log("HERE YA FUCK", decodedToken);
    if (currentTime < decodedToken.exp) {
      return true;
    }
  } catch (e) {
    isEffective = false;
  }
  return isEffective;
}

export function getUserAuthority(token?: string): Authority {
  const authorityString =
    typeof token === "undefined" ? getAuthorizationToken() : token;
  let authority: Array<string> = [];
  try {
    const decodedToken: Token = jwtDecode(authorityString);
    authority = decodedToken.authorization;
  } catch (e) {
    authority = [];
  }
  return authority;
}
