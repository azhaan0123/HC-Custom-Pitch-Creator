declare module 'qrcodegen' {
  export namespace qrcodegen {
    export class QrCode {
      static Ecc: {
        LOW: any;
        MEDIUM: any;
        QUARTILE: any;
        HIGH: any;
      };
      static encodeText(text: string, ecc: any): QrCode;
      size: number;
      getModule(x: number, y: number): boolean;
    }
  }
}
