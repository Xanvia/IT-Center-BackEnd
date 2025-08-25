import * as crypto from 'crypto';

export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function generateResetToken(): string {
  return generateSecureToken(32);
}

export function isTokenExpired(expirationDate: Date): boolean {
  return new Date() > expirationDate;
}
