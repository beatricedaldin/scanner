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
            width: 390,
            height: 390,
            facingMode: "environment", // Utilizza la fotocamera posteriore
          },
          area: {
            // defines rectangle of the detection/localization area
            top: "0%", // top offset
            right: "0%", // right offset
            left: "0%", // left offset
            bottom: "0%", // bottom offset
          },
        },
        decoder: {
          readers: [
            // "code_128_reader",
            "ean_reader",
            // "ean_8_reader",
            // "code_39_reader",
            // "upc_reader",
            // "upc_e_reader",
            // "code_93_reader",
          ],
          debug: {
            drawBoundingBox: false,
            showFrequency: false,
            drawScanline: false,
            showPattern: false,
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false,
            },
          },
          halfSample: true,
          patchSize: "medium",
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
      if (
        lastElement !== data.codeResult.code &&
        data.codeResult.format == "ean"
      ) {
        this.scannedCodes.push(data.codeResult.code);
      }
    });
  }

  stopScanner() {
    Quagga.stop();
  }
}
