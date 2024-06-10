import { Component, OnInit } from "@angular/core";
import { NgxBarcodeScannerService } from "@eisberg-labs/ngx-barcode-scanner";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  value: string = "";
  scannedValues: string[] = [];
  isError: boolean = false;
  quaggaConfig = {
    inputStream: {
      name: "Live",
      constraints: {
        width: 640,
        height: 480,
        facingMode: "environment",
        deviceId: "7832475934759384534",
      },
      area: {
        // defines rectangle of the detection/localization area
        top: "0%", // top offset
        right: "0%", // right offset
        left: "0%", // left offset
        bottom: "0%", // bottom offset
      },
      singleChannel: false,
    },
    locate: false,
    readers: [
      {
        format: "ean_reader",
        config: {
          supplements: ["ean_13_reader"],
        },
      },
    ],
  };
  constructor(private service: NgxBarcodeScannerService) {}
  ngOnInit(): void {}

  onStartButtonPress() {
    this.service.start(this.quaggaConfig, 0.1);
  }

  onValueChanges(detectedValue: string) {
    console.log("Found this: " + detectedValue);
    this.scannedValues.push(detectedValue);
  }

  onStopButtonPress() {
    this.service.stop();
  }
  onError(error: any) {
    console.error(error);
    this.isError = true;
  }

  // startScanner() {
  //   Quagga.init(
  //     {
  //       inputStream: {
  //         type: "LiveStream",
  //         constraints: {
  //           width: 390,
  //           height: 390,
  //           facingMode: "environment", // Utilizza la fotocamera posteriore
  //         },
  //         area: {
  //           // defines rectangle of the detection/localization area
  //           top: "0%", // top offset
  //           right: "0%", // right offset
  //           left: "0%", // left offset
  //           bottom: "0%", // bottom offset
  //         },
  //       },
  //       decoder: {
  //         readers: [{
  //           format: "ean_reader",
  //           config: {
  //               supplements: [
  //                   'ean_13_reader'
  //               ]
  //           }
  //       }
  //         ],
  //         // debug: {
  //         //   drawBoundingBox: true,
  //         //   showFrequency: true,
  //         //   drawScanline: true,
  //         //   showPattern: true,
  //         //   showCanvas: true,
  //         //   showPatches: true,
  //         //   showFoundPatches: true,
  //         //   showSkeleton: true,
  //         //   showLabels: true,
  //         //   showPatchLabels: true,
  //         //   showRemainingPatchLabels: true,
  //         //   boxFromPatches: {
  //         //     showTransformed: true,
  //         //     showTransformedBox: true,
  //         //     showBB: true,
  //         //   },
  //         // },
  //         // halfSample: true,
  //         // patchSize: "x-large",
  //       },
  //     },
  //     (err: any) => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //       Quagga.start();
  //     }
  //   );

  //   Quagga.onDetected((data: any) => {
  //     console.log("Codice a barre rilevato:", data.codeResult.code);
  //     // Puoi gestire il risultato qui
  //     const lastElement = this.scannedCodes[this.scannedCodes.length - 1];
  //     if (lastElement !== data.codeResult.code) {
  //       this.scannedCodes.push(
  //         data.codeResult.code + " " + data.codeResult.format
  //       );
  //     }
  //   });
  // }

  // stopScanner() {
  //   Quagga.stop();
  // }
}
