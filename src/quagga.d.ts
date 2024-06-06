declare module 'quagga' {
  interface QuaggaStatic {
    init(config: any, callback: (err: any) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (data: any) => void): void;
  }

  const Quagga: QuaggaStatic;
  export default Quagga;
}