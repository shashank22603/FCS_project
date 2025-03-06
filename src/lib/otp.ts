import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export class OTPService {
  private static readonly APP_NAME = 'SecureMarketplace';

  static generateSecret(): string {
    return authenticator.generateSecret();
  }

  static async generateQRCode(username: string, secret: string): Promise<string> {
    const otpAuth = authenticator.keyuri(
      username,
      this.APP_NAME,
      secret
    );
    
    return QRCode.toDataURL(otpAuth);
  }

  static verifyToken(token: string, secret: string): boolean {
    return authenticator.verify({ token, secret });
  }

  static generateToken(secret: string): string {
    return authenticator.generate(secret);
  }
}