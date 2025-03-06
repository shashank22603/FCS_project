import CryptoJS from 'crypto-js';

export class CryptoService {
  private static readonly KEY_SIZE = 256;
  private static readonly ITERATION_COUNT = 100000;

  static generateKeyPair(): { publicKey: string; privateKey: string } {
    // In a real implementation, this would use the Web Crypto API
    // For demo purposes, we're using a simplified version
    const privateKey = CryptoJS.lib.WordArray.random(32).toString();
    const publicKey = CryptoJS.SHA256(privateKey).toString();
    
    return { publicKey, privateKey };
  }

  static encryptMessage(message: string, publicKey: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(publicKey, salt, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATION_COUNT,
    });

    const encrypted = CryptoJS.AES.encrypt(message, key.toString());
    return salt.toString() + '::' + encrypted.toString();
  }

  static decryptMessage(encryptedMessage: string, privateKey: string): string {
    const [salt, encrypted] = encryptedMessage.split('::');
    
    const key = CryptoJS.PBKDF2(privateKey, salt, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATION_COUNT,
    });

    const decrypted = CryptoJS.AES.decrypt(encrypted, key.toString());
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  static hashPassword(password: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATION_COUNT,
    });

    return salt.toString() + '::' + hash.toString();
  }

  static verifyPassword(password: string, hashedPassword: string): boolean {
    const [salt, hash] = hashedPassword.split('::');
    const verifyHash = CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_SIZE / 32,
      iterations: this.ITERATION_COUNT,
    }).toString();

    return hash === verifyHash;
  }
}