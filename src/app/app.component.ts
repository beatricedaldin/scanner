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
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "upc_reader",
            "upc_e_reader",
            "code_93_reader",
          ],
          // debug: {
          //   drawBoundingBox: true,
          //   showFrequency: true,
          //   drawScanline: true,
          //   showPattern: true,
          //   showCanvas: true,
          //   showPatches: true,
          //   showFoundPatches: true,
          //   showSkeleton: true,
          //   showLabels: true,
          //   showPatchLabels: true,
          //   showRemainingPatchLabels: true,
          //   boxFromPatches: {
          //     showTransformed: true,
          //     showTransformedBox: true,
          //     showBB: true,
          //   },
          // },
          halfSample: true,
          patchSize: "x-large",
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
