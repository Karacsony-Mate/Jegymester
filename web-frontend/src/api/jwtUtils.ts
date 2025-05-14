import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(token: string): number | null {
  try {
    const decoded: any = jwtDecode(token);
    // Próbáljuk a leggyakoribb claim neveket
    return decoded["nameid"] || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
  } catch {
    return null;
  }
}
