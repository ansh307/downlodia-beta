export const ADMIN_SECRET_COOKIE = "admin_secret";

export function getAdminSecretFromCookieString(cookieString: string) {
  const cookie = cookieString
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SECRET_COOKIE}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(ADMIN_SECRET_COOKIE.length + 1));
}

export function getAdminSecretFromDocument() {
  if (typeof document === "undefined") {
    return null;
  }

  return getAdminSecretFromCookieString(document.cookie);
}

export function setAdminSecretCookie(secret: string) {
  document.cookie = `${ADMIN_SECRET_COOKIE}=${encodeURIComponent(secret)}; path=/; SameSite=Lax`;
}
