export function isTokenExpired(tokenExpired: string): boolean {
  const now = new Date(Date.parse(new Date().toISOString()));
  const expires = new Date(Date.parse(tokenExpired));
  return now > expires;
}
