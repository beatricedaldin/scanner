import { Component, OnDestroy, OnInit } from "@angular/core";
import Quagga from "quagga";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  scannedCodes: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.startScanner();
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  startScanner() {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // Utilizza la fotocamera posteriore
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "upc_reader",
            "upc_e_reader",
            "code_93_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      console.log("Codice a barre rilevato:", data.codeResult.code);
      // Puoi gestire il risultato qui
      const lastElement = this.scannedCodes[this.scannedCodes.length - 1];
      if (lastElement !== data.codeResult.code) {
        this.scannedCodes.push(data.codeResult.code);
      }
    });
  }

  stopScanner() {
    Quagga.stop();
  }
}
